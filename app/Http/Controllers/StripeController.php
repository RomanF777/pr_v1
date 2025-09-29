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
                'amount' => 'required|integer|min:50', // минимум 0.50 €
                'product_name' => 'required|string'
            ]);

            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount, // в центах евро
                'currency' => 'eur', // ЕВРО!
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
                'metadata' => [
                    'user_id' => Auth::id(),
                    'product' => $request->product_name,
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
}