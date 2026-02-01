export default function manifest() {
  return {
    name: 'Meta Tags Preview Tool - Free Open Graph & Social Media Preview Generator',
    short_name: 'Meta Tags Preview',
    description: 'Preview and optimize your website meta tags, Open Graph tags, and Twitter Cards. Free tool to see how your links appear on Facebook, Twitter, LinkedIn, and all social media platforms.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    categories: ['productivity', 'tools', 'developer', 'seo', 'marketing'],
  };
}
