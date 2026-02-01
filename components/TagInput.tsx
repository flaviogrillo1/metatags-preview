"use client";

import { MetaTags } from "@/types/meta";

interface TagInputProps {
  metaTags: MetaTags;
  onChange: (updates: Partial<MetaTags>) => void;
}

export function TagInput({ metaTags, onChange }: TagInputProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Manual Meta Tags
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={metaTags.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Your page title"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            value={metaTags.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="A brief description of your page"
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Image URL
          </label>
          <input
            type="url"
            value={metaTags.image}
            onChange={(e) => onChange({ image: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Site Name
            </label>
            <input
              type="text"
              value={metaTags.siteName}
              onChange={(e) => onChange({ siteName: e.target.value })}
              placeholder="Your Site"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Twitter Card
            </label>
            <select
              value={metaTags.twitterCard}
              onChange={(e) => onChange({ 
                twitterCard: e.target.value as MetaTags["twitterCard"] 
              })}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            >
              <option value="summary">Summary</option>
              <option value="summary_large_image">Large Image</option>
              <option value="player">Player</option>
              <option value="app">App</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            URL
          </label>
          <input
            type="url"
            value={metaTags.url}
            onChange={(e) => onChange({ url: e.target.value })}
            placeholder="https://example.com/page"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>
    </div>
  );
}
