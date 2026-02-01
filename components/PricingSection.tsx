"use client";

import { useState } from "react";
import { Check, Zap, Clock } from "lucide-react";

interface PricingSectionProps {
  isPro: boolean;
  hoursRemaining: number;
  onUnlock: () => void;
}

export function PricingSection({ isPro, hoursRemaining, onUnlock }: PricingSectionProps) {
  const [processing, setProcessing] = useState(false);

  const handleUnlock = async () => {
    setProcessing(true);
    try {
      // Create payment intent
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          returnUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      if (!response.ok) throw new Error("Failed to create payment");

      const { clientSecret, amount, currency } = await response.json();
      
      // Use Stripe.js to complete payment
      const stripe = (await import("@stripe/stripe-js")).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
      );
      
      const { error } = await (await stripe).confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: typeof window !== 'undefined' ? window.location.href + '?payment_intent=succeeded&redirect_status=succeeded' : '',
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      // Payment successful - unlock day
      onUnlock();
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  if (isPro) {
    return (
      <div className="mt-16">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 text-white text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Zap size={32} className="text-yellow-300" />
                <span className="font-bold text-2xl">UNLOCKED</span>
              </div>
              
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-3 text-3xl font-bold">
                  <Clock size={28} />
                  <span>{hoursRemaining}h</span>
                </div>
                <p className="text-sm text-purple-100 mt-2">of unlimited access remaining</p>
              </div>

              <div className="text-sm space-y-1">
                <p>✨ Unlimited meta tag previews</p>
                <p>🚀 No daily limits</p>
                <p>💎 Priority support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Unlock Unlimited Access
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Get 24 hours of unlimited previews for just €0.99
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-500">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={24} />
              <span className="font-semibold text-lg">DAILY PASS</span>
            </div>
            <div className="text-5xl font-bold mb-2">€0.99</div>
            <div className="text-purple-100">for 24 hours</div>
          </div>

          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>Unlimited</strong> meta tag previews
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>24 hour</strong> access
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>No registration</strong> required
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>Cancel anytime</strong> (one-time payment)
                </span>
              </li>
            </ul>

            <button
              onClick={handleUnlock}
              disabled={processing}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                "Unlock Now"
              )}
            </button>

            <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
              Secure payment via Stripe. One-time payment, no subscription.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
