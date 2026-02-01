import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '@/lib/i18n';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return {
    locale: locale as string,
    messages: (await import(`@/messages/${locale}.json`)).default
  };
});
