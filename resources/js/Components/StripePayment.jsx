import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { router } from '@inertiajs/react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function CheckoutForm({ amount, product, onClose, clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!stripe || !elements) {
            setError('Payment system not loaded');
            setIsLoading(false);
            return;
        }

        try {
            const { error: stripeError } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
                redirect: 'if_required',
            });

            if (stripeError) {
                setError(stripeError.message);
            } else {
                setPaymentSuccess(true);
                setTimeout(() => {
                    onClose();
                    router.visit('/download');
                }, 2000);
            }
        } catch (err) {
            setError('Unexpected payment error');
            console.error('Payment error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    if (paymentSuccess) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Redirecting to download page...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            <div className="border border-gray-200 rounded-lg p-4">
                <PaymentElement />
            </div>

            <button
                type="submit"
                disabled={!stripe || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-bold transition duration-200 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                    </>
                ) : (
                    `Pay ${(amount / 100).toFixed(2)} €`
                )}
            </button>

            <div className="text-center text-sm text-gray-500">
                <p>Secure payment by Stripe</p>
                <div className="flex justify-center items-center gap-2 mt-2">
                    <div className="flex space-x-1">
                        {['4242', '4242', '4242', '4242'].map((num, idx) => (
                            <div key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                {num}
                            </div>
                        ))}
                    </div>
                    <span className="text-xs">- test card</span>
                </div>
            </div>
        </form>
    );
}

export default function StripePayment({ amount, product, isOpen, onClose }) {
    const [clientSecret, setClientSecret] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && amount && !clientSecret) {
            setLoading(true);
            setError('');

            fetch('/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({
                    amount: amount,
                    product_name: product.name,
                }),
            })
            .then(async (response) => {
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error || 'Server error');
                }
                
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    throw new Error('Failed to create payment');
                }
            })
            .catch((error) => {
                console.error('Error creating payment intent:', error);
                setError(error.message || 'Payment creation failed');
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [isOpen, amount, product.name, clientSecret]);

    useEffect(() => {
        if (!isOpen) {
            setClientSecret(null);
            setError('');
            setLoading(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition duration-200"
                        disabled={loading}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Payment for {product.name}</h3>
                    
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Amount to pay:</span>
                            <span className="text-xl font-bold text-blue-900">{(amount / 100).toFixed(2)} €</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <p className="text-red-700 text-sm">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Preparing payment form...</p>
                        </div>
                    )}

                    {clientSecret && (
                        <Elements
                            stripe={stripePromise}
                            options={{
                                clientSecret,
                                appearance: {
                                    theme: 'stripe',
                                    variables: {
                                        colorPrimary: '#2563eb',
                                    },
                                },
                            }}
                        >
                            <CheckoutForm 
                                amount={amount} 
                                product={product} 
                                onClose={onClose}
                                clientSecret={clientSecret}
                            />
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}