import { useState, useEffect } from 'react';

interface StripeSubscription {
  isPro: boolean;
  customerId: string | null;
  loading: boolean;
  error: string | null;
}

export function useStripeSubscription() {
  const [state, setState] = useState<StripeSubscription>({
    isPro: false,
    customerId: null,
    loading: true,
    error: null,
  });

  // Load subscription status from localStorage and verify with Stripe
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        // Check if we have a saved customer ID
        const savedCustomerId = localStorage.getItem('stripe_customer_id');
        
        if (!savedCustomerId) {
          setState(prev => ({ ...prev, loading: false }));
          return;
        }

        // Verify subscription status with Stripe via API
        const response = await fetch('/api/check-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId: savedCustomerId }),
        });

        if (!response.ok) {
          throw new Error('Failed to verify subscription');
        }

        const data = await response.json();
        
        setState({
          isPro: data.isPro || false,
          customerId: savedCustomerId,
          loading: false,
          error: null,
        });

        // Also update localStorage
        localStorage.setItem('metatags_is_pro', data.isPro ? 'true' : 'false');
      } catch (error) {
        console.error('Error loading subscription:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load subscription',
        }));
      }
    };

    loadSubscription();
  }, []);

  const setCustomerId = (customerId: string) => {
    localStorage.setItem('stripe_customer_id', customerId);
    setState(prev => ({ ...prev, customerId }));
  };

  const setProStatus = (isPro: boolean) => {
    localStorage.setItem('metatags_is_pro', isPro ? 'true' : 'false');
    setState(prev => ({ ...prev, isPro }));
  };

  return {
    ...state,
    setCustomerId,
    setProStatus,
  };
}
