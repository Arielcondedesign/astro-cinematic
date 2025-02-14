import { getLangFromUrl, useTranslations } from '../i18n/config';

export function useI18n(lang: string) {
  const t = useTranslations(lang);
  const translatePath = (path: string) => `/${lang}${path === '/' ? '' : path}`;
  return { t, translatePath };
}