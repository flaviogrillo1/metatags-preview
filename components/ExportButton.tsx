"use client";

import { MetaTags } from "@/types/meta";
import { Download } from "lucide-react";
import { useRef } from "react";

interface ExportButtonProps {
  metaTags: MetaTags;
}

export function ExportButton({ metaTags }: ExportButtonProps) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!previewRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `metatags-preview-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Error exporting preview:", error);
      alert("Failed to export preview. Please try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Export Preview
      </h3>
      
      {/* Hidden preview for export */}
      <div className="hidden">
        <div ref={previewRef} className="bg-white p-8 rounded-lg" style={{ width: "600px" }}>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            {metaTags.image && (
              <img
                src={metaTags.image}
                alt={metaTags.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/1200x630?text=No+Image";
                }}
              />
            )}
            <div className="p-4">
              <p className="text-xs text-slate-500 uppercase mb-1">{metaTags.siteName || metaTags.url}</p>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {metaTags.title || "Untitled Page"}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {metaTags.description || "No description provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleExport}
        className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Download size={20} />
        Export as PNG
      </button>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 text-center">
        Download the preview as an image to share with your team
      </p>
    </div>
  );
}
