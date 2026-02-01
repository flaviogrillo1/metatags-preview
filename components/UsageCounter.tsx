"use client";

interface UsageCounterProps {
  count: number;
  limit: number;
  isPro: boolean;
}

export function UsageCounter({ count, limit, isPro }: UsageCounterProps) {
  if (isPro) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-4 mb-8">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="font-semibold">Pro Plan Active</span>
          </div>
          <span className="text-sm">Unlimited previews</span>
        </div>
      </div>
    );
  }

  const remaining = limit - count;
  const percentage = (count / limit) * 100;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Free Plan Usage
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {count} / {limit} previews today
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all ${
            percentage >= 90
              ? "bg-red-500"
              : percentage >= 70
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      {remaining <= 2 && (
        <p className="mt-2 text-sm text-orange-600 dark:text-orange-400">
          {remaining === 0
            ? "You've reached the daily limit. Upgrade to Pro for unlimited previews!"
            : `Only ${remaining} preview${remaining > 1 ? "s" : ""} remaining today.`}
        </p>
      )}
    </div>
  );
}
