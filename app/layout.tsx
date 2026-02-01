import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Tags Preview Tool - See How Your Links Look on Social Media",
  description: "Preview and validate Open Graph and Twitter Card meta tags for any URL. See how your content appears on Facebook, LinkedIn, Twitter, and more.",
  keywords: ["meta tags", "open graph", "twitter cards", "seo", "social media preview"],
  authors: [{ name: "Meta Tags Preview" }],
  openGraph: {
    title: "Meta Tags Preview Tool - See How Your Links Look on Social Media",
    description: "Preview and validate Open Graph and Twitter Card meta tags for any URL.",
    url: "https://metatags-preview.vercel.app",
    siteName: "Meta Tags Preview",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Meta Tags Preview Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meta Tags Preview Tool",
    description: "See how your links look on social media",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
