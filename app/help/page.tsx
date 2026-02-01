export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tool
          </a>
        </div>

        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Help & Documentation
        </h1>

        <div className="space-y-8">
          {/* Section 1: Getting Started */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🚀 Getting Started
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                The Meta Tags Preview Tool lets you see how your website links appear on social media platforms before you share them.
              </p>
              
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">How to Use:</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-600 dark:text-slate-300">
                <li>Enter any website URL in the input field</li>
                <li>Click "Preview" to fetch Open Graph and Twitter Card meta tags</li>
                <li>Edit tags manually to test different combinations</li>
                <li>See real-time previews for Facebook, Twitter, and LinkedIn</li>
                <li>Export previews as PNG images</li>
              </ol>
            </div>
          </section>

          {/* Section 2: URL Requirements */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🔗 URL Requirements
            </h2>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p><strong>Supported Protocols:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>https://</code> - Recommended, secure</li>
                <li><code>http://</code> - Supported (non-secure)</li>
              </ul>
              
              <p className="mt-4"><strong>Tips:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Include the full URL (e.g., https://example.com/page)</li>
                <li>Some sites may block automated fetchers</li>
                <li>HTTP sites may have mixed content warnings in previews</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Images Not Showing */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              🖼️ Images Not Showing?
            </h2>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p>If preview images don't appear, it's usually due to:</p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                <p className="font-semibold mb-2">CORS Restrictions</p>
                <p className="text-sm">
                  Many websites prevent their images from being embedded on other sites for security reasons. This is controlled by CORS (Cross-Origin Resource Sharing) policies.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-semibold mb-2">Solutions:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use manual input to specify image URLs</li>
                  <li>Try uploading the image to a public CDN or image host</li>
                  <li>Check if the original website has CORS restrictions</li>
                  <li>Use absolute URLs (starting with https:// or http://)</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4 rounded">
                <p className="font-semibold mb-2">Best Practices for Image URLs:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Use high-quality images (1200x630px recommended)</li>
                  <li>Ensure images are publicly accessible</li>
                  <li>Use HTTPS URLs when possible</li>
                  <li>Avoid hotlinking images from sites with strict CORS policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Meta Tags Best Practices */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              ✅ Meta Tags Best Practices
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Title Tag</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Ideal length: 50-60 characters</li>
                  <li>Make it descriptive and compelling</li>
                  <li>Include your brand name when relevant</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Description Tag</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Ideal length: 150-160 characters</li>
                  <li>Summarize your page content accurately</li>
                  <li>Include a call-to-action when appropriate</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">OG Image</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Recommended size: 1200x630 pixels</li>
                  <li>Use high-quality, relevant images</li>
                  <li>Keep text on images minimal and readable</li>
                  <li>Test on different platforms</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: Export PNG */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              📥 Exporting as PNG
            </h2>
            <div className="space-y-3 text-slate-600 dark:text-slate-300">
              <p>
                Click the "Export as PNG" button to download a screenshot of your preview. 
                This is useful for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Sharing with your team or clients</li>
                <li>Creating mockups and presentations</li>
                <li>Documentation and testing</li>
              </ul>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-400 p-4 rounded mt-4">
                <p className="font-semibold mb-2">Known Limitations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Images with CORS restrictions may not appear in export</li>
                  <li>Some dynamic content may not render correctly</li>
                  <li>Export quality depends on browser rendering</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Pricing */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              💰 Pricing
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Free Plan</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>5 meta tag previews per day</li>
                  <li>All preview platforms (FB, Twitter, LinkedIn)</li>
                  <li>Manual tag editing</li>
                  <li>Validation & warnings</li>
                  <li>Export as PNG</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100">Pro Plan - $9/month</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-300">
                  <li>Unlimited previews</li>
                  <li>API access (coming soon)</li>
                  <li>Priority support</li>
                  <li>No daily limits</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7: FAQ */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              ❓ FAQ
            </h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  Why don't images from some websites appear?
                </h3>
                <p className="text-sm">
                  Many websites configure CORS (Cross-Origin Resource Sharing) policies that prevent images from being embedded on other sites. This is a security feature. You can manually enter image URLs or use images from your own server.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  Can I use HTTP URLs?
                </h3>
                <p className="text-sm">
                  Yes! Both <code>http://</code> and <code>https://</code> URLs are supported. However, HTTPS is recommended for security.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  Why does the export PNG show broken images?
                </h3>
                <p className="text-sm">
                  This happens when images have CORS restrictions. The browser can display them but cannot export them to canvas. Try using a different image URL or hosting the image on a CORS-friendly server.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                  How accurate are the previews?
                </h3>
                <p className="text-sm">
                  The previews are based on official Open Graph and Twitter Card specifications and closely match how content appears on each platform. However, platforms may update their designs, so there may be slight variations.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">
              💬 Need More Help?
            </h2>
            <p className="mb-4">
              Have questions, suggestions, or found a bug? We'd love to hear from you!
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/flaviogrillo1/metatags-preview/issues" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub Issues
              </a>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tool
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
