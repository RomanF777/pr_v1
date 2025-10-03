<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class StripeController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            
            $request->validate([
                'amount' => 'required|integer|min:50',
                'product_name' => 'required|string'
            ]);

            $user = Auth::user();

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount,
                'currency' => 'eur',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
                'metadata' => [
                    'user_id' => $user->id,
                    'product' => $request->product_name,
                    'license_type' => 'monthly_subscription' // или 'lifetime'
                ],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret
            ]);

        } catch (ApiErrorException $e) {
            \Log::error('Stripe API Error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Stripe error: ' . $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Stripe Controller Error: ' . $e->getMessage());
            return response()->json([
                'error' => 'Internal server error'
            ], 500);
        }
    }

    /**
     * Обработка успешного платежа (вебхук)
     */
    public function handleWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $endpoint_secret = config('services.stripe.webhook_secret');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload, $sig_header, $endpoint_secret
            );
        } catch(\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch(\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        // Обрабатываем успешный платеж
        if ($event->type == 'payment_intent.succeeded') {
            $paymentIntent = $event->data->object;
            
            $user = \App\Models\User::find($paymentIntent->metadata->user_id);
            
            if ($user) {
                // Активируем подписку на 1 месяц
                $user->activateSubscription(1);
                
                \Log::info('Subscription activated via webhook', [
                    'user_id' => $user->id,
                    'payment_intent_id' => $paymentIntent->id
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }
}