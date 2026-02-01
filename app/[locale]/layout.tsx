import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const seoData = {
  en: {
    title: "Meta Tags Preview Tool - Free Open Graph & Twitter Card Generator",
    description: "Preview and validate Open Graph and Twitter Card meta tags for any URL. Free tool to see how your links appear on Facebook, Twitter, LinkedIn, and more. Boost SEO and click-through rates.",
    keywords: "meta tags preview, open graph preview, twitter card preview, social media preview tool, meta tag tester, open graph debugger, twitter card validator, link preview generator, facebook link preview, linkedin preview, seo meta tags, social media optimization, og tag tester"
  },
  es: {
    title: "Herramienta Vista Previa Meta Tags - Generador Open Graph y Twitter Card",
    description: "Previsualiza y valida los meta tags Open Graph y Twitter Cards de cualquier URL. Herramienta gratuita para ver cómo aparecen tus enlaces en Facebook, Twitter, LinkedIn y más. Mejora el SEO y la tasa de clics.",
    keywords: "vista previa meta tags, previsualizar open graph, twitter card preview, herramienta vista previa redes sociales, comprobador meta tags, depurador open graph, validador twitter card, meta tags seo, optimizacion redes sociales"
  },
  pt: {
    title: "Ferramenta Visualização Meta Tags - Gerador Open Graph e Twitter Card",
    description: "Visualize e valide meta tags Open Graph e Twitter Cards de qualquer URL. Ferramenta gratuita para ver como seus links aparecem no Facebook, Twitter, LinkedIn e mais. Melhore o SEO e a taxa de cliques.",
    keywords: "visualização meta tags, preview open graph, twitter card preview, ferramenta visualização redes sociais, testador meta tags, meta tags seo, otimização redes sociais"
  },
  fr: {
    title: "Outil Aperçu Meta Tags - Générateur Open Graph et Twitter Card",
    description: "Prévisualisez et validez les méta-tags Open Graph et Twitter Cards pour任何 URL. Outil gratuit pour voir comment vos liens apparaissent sur Facebook, Twitter, LinkedIn et plus. Améliorez le SEO et les taux de clic.",
    keywords: "aperçu méta-tags, prévisualisation open graph, twitter card preview, outil aperçu réseaux sociaux, testeur méta-tags, méta-tags seo, optimisation réseaux sociaux"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seo = seoData[locale as keyof typeof seoData] || seoData.en;
  const canonicalUrl = locale === 'en' 
    ? 'https://metatags-preview.vercel.app'
    : `https://metatags-preview.vercel.app/${locale}`;
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Meta Tags Preview" }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: "Meta Tags Preview",
      locale: locale,
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
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        locales.map(l => [
          l,
          l === 'en' ? 'https://metatags-preview.vercel.app' : `https://metatags-preview.vercel.app/${l}`
        ])
      ),
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Ensure the locale is set for static rendering and server components.
  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
