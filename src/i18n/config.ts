export const languages = ['fr', 'es', 'en'] as const;
export const defaultLanguage = 'fr' as const;
export type Language = (typeof languages)[number];

// Type for translations
export type TranslationType = {
  site: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    apropos: string;
    films: string;
    longMetrages: string;
    courtMetrages: string;
    installations: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  films: {
    heading: {
      title: string;
      subtitle: string;
    };
    team: {
      title: string;
      members: Array<{
        name: string;
        role: string;
        description: string;
        image: string;
      }>;
    };
    entries: Array<{
      title: string;
      year: string;
      description: string;
      image: string;
    }>;
  };
  cookies: {
    message: string;
    learnMore: string;
    essentialOnly: string;
    acceptAll: string;
    customize: string;
    preferences: string;
    save: string;
    essential: string;
    essentialDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
  };
};

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (languages.includes(lang as Language)) return lang as Language;
  return defaultLanguage;
}

export function useTranslations(lang: Language) {
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      let result: any = translations[lang];
      for (const k of keys) {
        result = result?.[k];
      }
      return result ?? key;
    },
    lang,
  };
}

export function getLocalizedPath(path: string, lang: Language = defaultLanguage): string {
  // Remove leading and trailing slashes
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  // If path already has a language prefix, remove it
  const pathWithoutLang = cleanPath.replace(/^(fr|es|en)\//, '');
  
  // If it's the home page and default language, return /
  if (pathWithoutLang === '' && lang === defaultLanguage) {
    return '/';
  }
  
  // For default language on other pages, add prefix
  if (lang === defaultLanguage) {
    return `/${lang}/${pathWithoutLang}`;
  }
  
  // For other languages, always add prefix
  return `/${lang}/${pathWithoutLang}`;
}

import fr from './translations/fr.json';
import en from './translations/en.json';
import es from './translations/es.json';

export const translations: Record<Language, TranslationType> = { fr, en, es };
