"use client";

import { MetaTags } from "@/types/meta";

interface TwitterPreviewProps {
  metaTags: MetaTags;
}

export function TwitterPreview({ metaTags }: TwitterPreviewProps) {
  const { title, description, image, url } = metaTags;
  const isLarge = metaTags.twitterCard === "summary_large_image";

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-md">
      {isLarge && image ? (
        <img
          src={image}
          alt={title || "Preview image"}
          className="w-full h-64 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ) : null}

      <div className={`flex ${isLarge ? "p-4" : "p-3"}`}>
        {!isLarge && image ? (
          <div className="flex-shrink-0 mr-3">
            <img
              src={image}
              alt={title}
              className="w-24 h-24 object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        ) : null}

        <div className={isLarge ? "" : "flex-1"}>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">
            {url || "example.com"}
          </p>
          <h3 className={`font-semibold text-slate-900 dark:text-slate-100 mb-1 ${
            isLarge ? "text-xl" : "text-base"
          } line-clamp-2`}>
            {title || "Untitled Page"}
          </h3>
          <p className={`text-slate-600 dark:text-slate-400 line-clamp-2 ${
            isLarge ? "text-base" : "text-sm"
          }`}>
            {description || "No description provided. Add meta description for better preview."}
          </p>
        </div>
      </div>

      {!isLarge && !image && (
        <div className="px-3 pb-3">
          <div className="w-full h-24 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center text-slate-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
