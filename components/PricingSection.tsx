"use client";

import { useState } from "react";
import { Check, Zap } from "lucide-react";

interface PricingSectionProps {
  isPro: boolean;
  customerId: string | null;
  onUpgrade: (customerId: string) => void;
}

export function PricingSection({ isPro, customerId, onUpgrade }: PricingSectionProps) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          customerId: customerId || undefined,
          returnUrl: window.location.href,
        }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const data = await response.json();
      
      // Store customer ID if this is a new customer
      if (data.customerId) {
        onUpgrade(data.customerId);
        localStorage.setItem('stripe_customer_id', data.customerId);
      }
      
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("Failed to process upgrade. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPro) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          Upgrade to Pro
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Get unlimited previews and API access
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-500">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={24} />
              <span className="font-semibold text-lg">PRO PLAN</span>
            </div>
            <div className="text-5xl font-bold mb-2">$9</div>
            <div className="text-purple-100">per month</div>
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
                  <strong>API access</strong> for automation
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>Priority</strong> support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>No daily limits</strong>
                </span>
              </li>
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                "Upgrade Now"
              )}
            </button>

            <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
              Secure payment via Stripe. Cancel anytime from the customer portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
