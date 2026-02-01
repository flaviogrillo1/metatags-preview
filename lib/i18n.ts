export const locales = ['en', 'es', 'pt', 'fr', 'de', 'it', 'nl', 'pl', 'ru', 'ja', 'zh', 'ko', 'ar', 'hi', 'tr'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];
