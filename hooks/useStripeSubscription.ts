import { useState, useEffect } from 'react';

interface DailyAccess {
  isPro: boolean;
  expiresAt: number | null;
  loading: boolean;
  error: string | null;
  hoursRemaining: number;
}

export function useStripeSubscription() {
  const [state, setState] = useState<DailyAccess>({
    isPro: false,
    expiresAt: null,
    loading: true,
    error: null,
    hoursRemaining: 0,
  });

  // Check if daily access is still valid by verifying with Stripe
  useEffect(() => {
    const checkDailyAccess = async () => {
      try {
        // First check localStorage for cached expiry
        const expiresAt = localStorage.getItem('metatags_pro_expires_at');
        const paymentId = localStorage.getItem('metatags_pro_payment_id');
        const now = Date.now();

        // If we have a payment ID and it's not expired, verify with Stripe
        if (paymentId && expiresAt && parseInt(expiresAt, 10) > now) {
          try {
            const response = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentIntentId: paymentId }),
            });

            if (response.ok) {
              const data = await response.json();
              if (data.isValid) {
                setState({
                  isPro: data.isPro,
                  expiresAt: data.expiresAt,
                  loading: false,
                  error: null,
                  hoursRemaining: data.hoursRemaining,
                });
                return;
              }
            }
          } catch (error) {
            console.error('Error verifying payment with Stripe:', error);
            // If verification fails, fall through to localStorage check
          }
        }

        // Fallback to localStorage only check
        if (expiresAt && parseInt(expiresAt, 10) > now) {
          // Still valid (but not verified with Stripe)
          setState({
            isPro: true,
            expiresAt: parseInt(expiresAt, 10),
            loading: false,
            error: null,
            hoursRemaining: Math.floor((parseInt(expiresAt, 10) - now) / (1000 * 60 * 60)),
          });
        } else {
          // Expired or not set
          localStorage.removeItem('metatags_pro_expires_at');
          localStorage.removeItem('metatags_pro_payment_id');
          setState({
            isPro: false,
            expiresAt: null,
            loading: false,
            error: null,
            hoursRemaining: 0,
          });
        }
      } catch (error) {
        console.error('Error checking daily access:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to check access',
        }));
      }
    };

    checkDailyAccess();

    // Check every 5 minutes
    const interval = setInterval(checkDailyAccess, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const unlockDay = () => {
    const tomorrow = Date.now() + (24 * 60 * 60 * 1000); // 24 hours from now
    localStorage.setItem('metatags_pro_expires_at', tomorrow.toString());

    setState({
      isPro: true,
      expiresAt: tomorrow,
      loading: false,
      error: null,
      hoursRemaining: 24,
    });
  };

  return {
    ...state,
    unlockDay,
  };
}
