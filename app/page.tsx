"use client";

import { useState, useEffect } from "react";
import { MetaPreview } from "@/components/MetaPreview";
import { UrlInput } from "@/components/UrlInput";
import { TagInput } from "@/components/TagInput";
import { ValidationSummary } from "@/components/ValidationSummary";
import { ExportButton } from "@/components/ExportButton";
import { PricingSection } from "@/components/PricingSection";
import { UsageCounter } from "@/components/UsageCounter";
import { useStripeSubscription } from "@/hooks/useStripeSubscription";
import type { MetaTags, ValidationResult } from "@/types/meta";

export default function Home() {
  const { isPro, customerId, loading: subLoading, setCustomerId, setProStatus } = useStripeSubscription();
  
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
  
  // Load usage from localStorage on mount
  const [usageCount, setUsageCount] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem('metatags_usage_count');
    const savedDate = localStorage.getItem('metatags_usage_date');
    const today = new Date().toDateString();
    
    // Reset if it's a new day
    if (savedDate && savedDate !== today) {
      localStorage.removeItem('metatags_usage_count');
      localStorage.removeItem('metatags_usage_date');
      return 0;
    }
    
    return saved ? parseInt(saved, 10) : 0;
  });

  const FREE_LIMIT = 5;

  // Save usage to localStorage whenever it changes
  const updateUsageCount = (newCount: number) => {
    setUsageCount(newCount);
    if (typeof window !== 'undefined') {
      localStorage.setItem('metatags_usage_count', newCount.toString());
      localStorage.setItem('metatags_usage_date', new Date().toDateString());
    }
  };

  // Check URL parameters for successful checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    
    if (sessionId && params.get('success') === 'true') {
      // Successful payment - customer should be marked as pro
      setProStatus(true);
      
      // Clear URL params
      window.history.replaceState({}, '', window.location.pathname);
      
      // Show success message
      alert('🎉 Payment successful! You now have unlimited previews.');
    }
  }, []);

  const handleFetchMeta = async (targetUrl: string) => {
    if (!isPro && usageCount >= FREE_LIMIT) {
      alert("You've reached the free limit. Upgrade to Pro for unlimited previews!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/fetch-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      if (!response.ok) throw new Error("Failed to fetch meta tags");

      const data = await response.json();
      setMetaTags(data.metaTags);
      setValidation(data.validation);
      setUrl(targetUrl);
      
      if (!isPro) {
        updateUsageCount(usageCount + 1);
      }
    } catch (error) {
      console.error("Error fetching meta tags:", error);
      alert("Failed to fetch meta tags. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMetaChange = (updates: Partial<MetaTags>) => {
    setMetaTags(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <a 
              href="/help" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Help & Documentation
            </a>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meta Tags Preview Tool
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            See how your links look on Facebook, Twitter, LinkedIn, and more
          </p>
        </header>

        {/* Usage Counter */}
        <div className="flex justify-center gap-4 mb-8">
          <UsageCounter count={usageCount} limit={FREE_LIMIT} isPro={isPro} />
          {!isPro && usageCount > 0 && (
            <button
              onClick={() => {
                if (confirm('Reset your daily usage counter? This is useful for testing.')) {
                  updateUsageCount(0);
                }
              }}
              className="px-3 py-1 text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors"
              title="Reset usage counter (testing only)"
            >
              Reset
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Input */}
          <div className="space-y-6">
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

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <MetaPreview metaTags={metaTags} />
            
            <ExportButton metaTags={metaTags} />
          </div>
        </div>

        {/* Pricing Section */}
        <PricingSection 
          isPro={isPro}
          customerId={customerId}
          onUpgrade={(newCustomerId) => {
            setCustomerId(newCustomerId);
            setProStatus(true);
          }}
        />
      </div>
    </div>
  );
}
