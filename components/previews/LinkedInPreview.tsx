"use client";

import { MetaTags } from "@/types/meta";

interface LinkedInPreviewProps {
  metaTags: MetaTags;
}

export function LinkedInPreview({ metaTags }: LinkedInPreviewProps) {
  const { title, description, image, url, siteName } = metaTags;

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-md">
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {siteName || "Website"}
            </p>
            <p className="text-xs text-slate-500">
              {url ? new URL(url).hostname : "example.com"}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          {title || "Untitled Page"}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {description || "No description provided."}
        </p>

        {image ? (
          <div className="rounded overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : (
          <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
