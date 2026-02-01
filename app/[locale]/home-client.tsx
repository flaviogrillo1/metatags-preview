"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { MetaPreview } from "@/components/MetaPreview";
import { UrlInput } from "@/components/UrlInput";
import { TagInput } from "@/components/TagInput";
import { ValidationSummary } from "@/components/ValidationSummary";
import { ExportButton } from "@/components/ExportButton";
import { PricingSection } from "@/components/PricingSection";
import { UsageCounter } from "@/components/UsageCounter";
import { Modal } from "@/components/Modal";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import type { MetaTags, ValidationResult } from "@/types/meta";

interface HomePageProps {
  locale?: string;
}

export function HomePage({ locale = 'en' }: HomePageProps) {
  const t = useTranslations('home');
  const tModal = useTranslations('modal');
  
  const { isPro, expiresAt, loading: subLoading, unlockDay, hoursRemaining } = useStripeSubscription();
  
  const [url, setUrl] = useState("");
  const [metaTags, setMetaTags] = useState<MetaTags>({
    title: "",
    description: "",
    image: "",
    url: "",
    siteName: "",
    type: "website",
    twitterCard: "summary_large_image",
  });
  const [validation, setValidation] = useState<ValidationResult>({
    isValid: true,
    warnings: [],
    errors: [],
  });
  const [loading, setLoading] = useState(false);
  
  const [usageCount, setUsageCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('metatags_usage_count');
    const savedDate = localStorage.getItem('metatags_usage_date');
    const today = new Date().toDateString();
    
    if (savedDate && savedDate !== today) {
      localStorage.removeItem('metatags_usage_count');
      localStorage.removeItem('metatags_usage_date');
      return 0;
    }
    
    return saved ? parseInt(saved, 10) : 0;
  });

  const FREE_LIMIT = 5;

  // Modals
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateUsageCount = (newCount: number) => {
    setUsageCount(newCount);
    if (typeof window !== 'undefined') {
      localStorage.setItem('metatags_usage_count', newCount.toString());
      localStorage.setItem('metatags_usage_date', new Date().toDateString());
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIntent = params.get('payment_intent');
    const redirectStatus = params.get('redirect_status');
    
    if (paymentIntent === 'succeeded' && redirectStatus === 'succeeded') {
      unlockDay();
      window.history.replaceState({}, '', window.location.pathname);
      setShowSuccessModal(true);
    }
  }, []);

  const handleFetchMeta = async (targetUrl: string) => {
    if (!isPro && usageCount >= FREE_LIMIT) {
      setShowLimitModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/fetch-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch meta tags");
      }

      const data = await response.json();
      setMetaTags(data.metaTags);
      setValidation(data.validation);
      setUrl(targetUrl);
      
      if (!isPro) {
        updateUsageCount(usageCount + 1);
      }
    } catch (error) {
      console.error("Error fetching meta tags:", error);
      setErrorMessage(tModal('fetchErrorMessage'));
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleMetaChange = (updates: Partial<MetaTags>) => {
    setMetaTags(prev => ({ ...prev, ...updates }));
  };

  const handleUnlock = async () => {
    // Don't unlock directly - user needs to pay via PricingSection
    setShowLimitModal(false);
    // Scroll to pricing section
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaymentError = (title: string, message: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-12">
          <div className="flex justify-end mb-3 sm:mb-4">
            <a 
              href="help" 
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">{t('help')}</span>
              <span className="sm:hidden">{t('helpShort') || t('help')}</span>
            </a>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-2">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto px-4">
            {t('subtitle')}
          </p>
        </header>

        {/* Usage Counter */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
          <UsageCounter count={usageCount} limit={FREE_LIMIT} isPro={isPro} />
          {isPro && hoursRemaining > 0 && (
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg px-3 sm:px-4 py-1 text-white text-xs sm:text-sm">
              ⏰ {t('hoursRemaining', { hours: hoursRemaining })}
            </div>
          )}
          {!isPro && usageCount > 0 && (
            <button
              onClick={() => {
                setShowResetModal(true);
              }}
              className="px-3 py-1 text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors"
              title="Reset usage counter"
            >
              {t('reset')}
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 sm:mb-12">
          <div className="space-y-4 sm:space-y-6">
            <UrlInput 
              onSubmit={handleFetchMeta} 
              loading={loading}
            />
            
            <TagInput 
              metaTags={metaTags}
              onChange={handleMetaChange}
            />

            <ValidationSummary validation={validation} />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <MetaPreview metaTags={metaTags} />
            
            <ExportButton 
              metaTags={metaTags}
              onError={handlePaymentError}
            />
          </div>
        </div>

        <div id="pricing-section">
          <PricingSection 
            isPro={isPro}
            hoursRemaining={hoursRemaining}
            onUnlock={() => handleUnlock()}
            onError={handlePaymentError}
          />
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        title={tModal('limitReached')}
        message={tModal('limitMessage')}
        type="pricing"
      />

      <Modal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title={errorTitle || tModal('fetchError')}
        message={errorMessage}
        type="error"
      />

      <Modal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={tModal('paymentSuccess')}
        message={tModal('paymentSuccessMessage')}
        type="success"
      />

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title={t('reset')}
        message={t('resetConfirm') || t('reset') + '?'}
        type="warning"
        onConfirm={() => {
          updateUsageCount(0);
          setShowResetModal(false);
        }}
        confirmText={t('reset')}
        cancelText="Cancel"
      />
    </div>
  );
}
