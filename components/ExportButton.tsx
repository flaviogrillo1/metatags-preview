"use client";

import { MetaTags } from "@/types/meta";
import { Download } from "lucide-react";

interface ExportButtonProps {
  metaTags: MetaTags;
  onError?: (title: string, message: string) => void;
}

export function ExportButton({ metaTags, onError }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const html2canvas = (await import("html2canvas")).default;
      
      // Create a temporary container for export with improved styling
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "700px";
      container.style.backgroundColor = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      container.style.padding = "40px";
      container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";
      document.body.appendChild(container);

      // Build preview HTML with enhanced design
      container.innerHTML = `
        <div style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
          ${metaTags.image ? `
            <div style="position: relative; height: 340px; overflow: hidden;">
              <img 
                src="${metaTags.image}" 
                alt="${metaTags.title}" 
                style="width: 100%; height: 100%; object-fit: cover;" 
                crossorigin="anonymous" 
                onerror="this.parentElement.style.display='none'"
              />
              <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);"></div>
            </div>
          ` : `
            <div style="height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center; color: white;">
                <svg style="width: 64px; height: 64px; opacity: 0.5;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p style="margin-top: 12px; opacity: 0.7; font-size: 14px;">No image available</p>
              </div>
            </div>
          `}
          <div style="padding: 28px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                  <svg style="width: 18px; height: 18px; color: white;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                  </svg>
                </div>
                <span style="font-size: 11px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">Meta Preview</span>
              </div>
              <div style="font-size: 11px; color: #9ca3af; font-weight: 500;">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
            </div>
            
            <h2 style="font-size: 26px; font-weight: 700; color: #111827; margin-bottom: 12px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${metaTags.title || 'Untitled Page'}
            </h2>
            
            ${metaTags.siteName || metaTags.url ? `
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px;">
                <svg style="width: 14px; height: 14px; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
                <span style="font-size: 13px; color: #6b7280; font-weight: 500;">${metaTags.siteName || metaTags.url || 'example.com'}</span>
              </div>
            ` : ''}
            
            <p style="font-size: 15px; color: #6b7280; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              ${metaTags.description || 'No description provided'}
            </p>
            
            <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%;"></div>
                  <span style="font-size: 11px; color: #6b7280; font-weight: 500;">OG Valid</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
                  <span style="font-size: 11px; color: #6b7280; font-weight: 500;">Twitter</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%;"></div>
                  <span style="font-size: 11px; color: #6b7280; font-weight: 500;">LinkedIn</span>
                </div>
              </div>
              <div style="font-size: 10px; color: #9ca3af; font-weight: 500;">Generated by Meta Tags Preview</div>
            </div>
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
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      document.body.removeChild(container);

      const link = document.createElement("a");
      link.download = `metatags-preview-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Error exporting preview:", error);
      onError?.(
        "Export Failed",
        "Failed to export preview. If images are missing, it may be due to CORS restrictions. Try using different image URLs."
      );
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
          <strong>⚠️ Note:</strong> Some images may not export due to CORS restrictions. See the Help page for details.
        </p>
      </div>
    </div>
  );
}
