"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onSubmit(inputUrl.trim());
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Enter URL to Preview
      </h3>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !inputUrl.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Loading...
            </>
          ) : (
            <>
              <Search size={20} />
              Preview
            </>
          )}
        </button>
      </form>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Enter any URL to fetch and preview its Open Graph and Twitter Card meta tags
      </p>
    </div>
  );
}
