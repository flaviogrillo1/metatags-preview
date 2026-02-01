import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  // During build, locale might be undefined - handle gracefully
  if (!locale || !locales.includes(locale as Locale)) {
    return {
      locale: 'en',
      messages: (await import(`@/messages/en.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
