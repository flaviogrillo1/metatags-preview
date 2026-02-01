"use client";

import { MetaTags } from "@/types/meta";

interface FacebookPreviewProps {
  metaTags: MetaTags;
}

export function FacebookPreview({ metaTags }: FacebookPreviewProps) {
  const { title, description, image, url, siteName } = metaTags;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-md">
      {image ? (
        <img
          src={image}
          alt={title || "Preview image"}
          className="w-full h-64 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      <div className="p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1 truncate">
          {siteName || url || "example.com"}
        </p>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
          {title || "Untitled Page"}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {description || "No description provided. Add meta description for better preview."}
        </p>
      </div>
    </div>
  );
}
