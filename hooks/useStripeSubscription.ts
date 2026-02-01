import { useState, useEffect } from 'react';

interface DailyAccess {
  isPro: boolean;
  expiresAt: number | null;
  loading: boolean;
  error: string | null;
}

export function useStripeSubscription() {
  const [state, setState] = useState<DailyAccess>({
    isPro: false,
    expiresAt: null,
    loading: true,
    error: null,
  });

  // Check if daily access is still valid
  useEffect(() => {
    const checkDailyAccess = () => {
      try {
        const expiresAt = localStorage.getItem('metatags_pro_expires_at');
        const now = Date.now();
        
        if (expiresAt && parseInt(expiresAt, 10) > now) {
          // Still valid
          setState({
            isPro: true,
            expiresAt: parseInt(expiresAt, 10),
            loading: false,
            error: null,
          });
        } else {
          // Expired or not set
          localStorage.removeItem('metatags_pro_expires_at');
          setState({
            isPro: false,
            expiresAt: null,
            loading: false,
            error: null,
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
    
    // Check every minute
    const interval = setInterval(checkDailyAccess, 60000);
    
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
    });
  };

  const hoursRemaining = state.expiresAt 
    ? Math.max(0, Math.floor((state.expiresAt - Date.now()) / (1000 * 60 * 60)))
    : 0;

  return {
    ...state,
    unlockDay,
    hoursRemaining,
  };
}
