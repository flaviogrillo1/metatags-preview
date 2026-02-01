import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://metatags-preview.vercel.app';
  
  const homePages = locales.map((locale) => ({
    url: locale === 'en' ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map(l => [
          l,
          l === 'en' ? baseUrl : `${baseUrl}/${l}`
        ])
      ),
    },
  }));

  const helpPages = locales.map((locale) => ({
    url: locale === 'en' ? `${baseUrl}/help` : `${baseUrl}/${locale}/help`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map(l => [
          l,
          l === 'en' ? `${baseUrl}/help` : `${baseUrl}/${l}/help`
        ])
      ),
    },
  }));

  return [...homePages, ...helpPages];
}
