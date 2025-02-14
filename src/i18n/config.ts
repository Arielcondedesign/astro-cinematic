export const defaultLanguage = 'fr';
export const languages = ['fr', 'en', 'es'] as const;
export type Language = typeof languages[number];

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang as Language)) return lang as Language;
  return defaultLanguage;
}

export function useTranslations(lang: Language) {
  return function t(key: string) {
    try {
      const translations = {
        fr: () => import('./translations/fr.json'),
        en: () => import('./translations/en.json'),
        es: () => import('./translations/es.json')
      };
      
      const translation = translations[lang]();
      return key.split('.').reduce((obj, key) => obj?.[key], translation) || key;
    } catch (error) {
      console.error(`Translation error for key ${key} in language ${lang}:`, error);
      return key;
    }
  };
}