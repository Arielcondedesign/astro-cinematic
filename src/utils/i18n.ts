import { translations } from '../i18n/config';
import type { Language } from '../i18n/config';

export function useI18n(lang: Language) {
  const t = (key: string) => {
    try {
      return key.split('.').reduce((obj, k) => obj?.[k], translations[lang]) ?? key;
    } catch (error) {
      console.error(`Translation error for key ${key} in language ${lang}:`, error);
      return key;
    }
  };

  const translatePath = (path: string) => `/${lang}${path === '/' ? '' : path}`;

  return { t, translatePath, lang };
}