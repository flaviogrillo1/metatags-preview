"use client";

import { useState } from "react";
import { Check, Zap, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';

interface PricingSectionProps {
  isPro: boolean;
  hoursRemaining: number;
  onUnlock: () => void;
  onError?: (title: string, message: string) => void;
}

export function PricingSection({ isPro, hoursRemaining, onUnlock, onError }: PricingSectionProps) {
  const t = useTranslations('pricing');
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
      const stripeInstance = await (await import("@stripe/stripe-js")).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
      );
      
      if (!stripeInstance) {
        throw new Error("Failed to load Stripe");
      }
      
      const { error } = await stripeInstance.confirmPayment({
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
      onError?.(
        "Payment Failed",
        error instanceof Error ? error.message : "Unknown error"
      );
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
                <span className="font-bold text-2xl">{t('unlocked')}</span>
              </div>
              
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-3 text-3xl font-bold">
                  <Clock size={28} />
                  <span>{hoursRemaining}h</span>
                </div>
                <p className="text-sm text-purple-100 mt-2">{t('ofUnlimitedAccess')}</p>
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
          {t('unlockAccess')}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          {t('subtitle')}
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-500">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={24} />
              <span className="font-semibold text-lg">{t('dailyPass')}</span>
            </div>
            <div className="text-5xl font-bold mb-2">€0.99</div>
            <div className="text-purple-100">{t('for24Hours')}</div>
          </div>

          <div className="p-6">
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>{t('feature1')}</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>{t('feature2')}</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>{t('feature3')}</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 dark:text-slate-300">
                  <strong>{t('feature4')}</strong>
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
                  {t('processing')}
                </>
              ) : (
                t('unlockNow')
              )}
            </button>

            <p className="mt-4 text-xs text-center text-slate-500 dark:text-slate-400">
              {t('securePayment')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
