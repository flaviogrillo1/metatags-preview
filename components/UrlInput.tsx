"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export function UrlInput({ onSubmit, loading }: UrlInputProps) {
  const [inputUrl, setInputUrl] = useState("");
  const [protocol, setProtocol] = useState<"https" | "http">("https");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      let fullUrl = inputUrl.trim();
      if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
        fullUrl = `${protocol}://${fullUrl}`;
      }
      onSubmit(fullUrl);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Enter URL to Preview
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex gap-2 flex-1">
            <select
              value={protocol}
              onChange={(e) => setProtocol(e.target.value as "https" | "http")}
              disabled={loading}
              className="px-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm font-medium shrink-0"
            >
              <option value="https">HTTPS</option>
              <option value="http">HTTP</option>
            </select>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="example.com"
              className="flex-1 min-w-0 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !inputUrl.trim()}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span className="hidden sm:inline">Loading...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span className="hidden sm:inline">Preview</span>
              </>
            )}
          </button>
        </div>
      </form>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Enter any URL to fetch and preview its Open Graph and Twitter Card meta tags
      </p>
    </div>
  );
}
