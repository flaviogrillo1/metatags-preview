"use client";

import { MetaTags } from "@/types/meta";
import { Download } from "lucide-react";

interface ExportButtonProps {
  metaTags: MetaTags;
}

export function ExportButton({ metaTags }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      
      // Create a temporary container for export
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "600px";
      container.style.backgroundColor = "white";
      container.style.padding = "32px";
      document.body.appendChild(container);

      // Build preview HTML
      container.innerHTML = `
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          ${metaTags.image ? `<img src="${metaTags.image}" alt="${metaTags.title}" style="width: 100%; height: 256px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/1200x630?text=No+Image'" crossorigin="anonymous" />` : ''}
          <div style="padding: 16px;">
            <p style="font-size: 12px; color: #64748b; text-transform: uppercase; margin-bottom: 4px;">${metaTags.siteName || metaTags.url || 'example.com'}</p>
            <h3 style="font-size: 20px; font-weight: 600; color: #1e293b; margin-bottom: 8px;">${metaTags.title || 'Untitled Page'}</h3>
            <p style="font-size: 14px; color: #64748b; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${metaTags.description || 'No description provided'}</p>
          </div>
        </div>
      `;

      // Wait for images to load
      const images = container.querySelectorAll("img");
      const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve(true);
          } else {
            img.onload = () => resolve(true);
            img.onerror = () => resolve(true);
          }
        });
      });
      await Promise.all(imagePromises);

      const canvas = await html2canvas(container, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      document.body.removeChild(container);

      const link = document.createElement("a");
      link.download = `metatags-preview-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error("Error exporting preview:", error);
      alert("Failed to export preview. If images are missing, it may be due to CORS restrictions. Try using different image URLs.");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Export Preview
      </h3>

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
      
      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p className="text-xs text-yellow-800 dark:text-yellow-200">
          <strong>⚠️ Note:</strong> Some images may not export due to CORS restrictions. See the <a href="/help" className="underline">Help page</a> for details.
        </p>
      </div>
    </div>
  );
}
