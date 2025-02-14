import { defineMiddleware } from 'astro:middleware';
import type { MiddlewareResponseHandler } from 'astro';
import { defaultLanguage, languages, type Language } from './i18n/config';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const [, lang] = url.pathname.split('/');

  // If no language in URL, redirect to default language
  if (!lang) {
    return Response.redirect(`${url.origin}/${defaultLanguage}${url.pathname}`);
  }

  // If invalid language, redirect to default language
  if (!languages.includes(lang as Language)) {
    const newPath = url.pathname.replace(`/${lang}`, `/${defaultLanguage}`);
    return Response.redirect(`${url.origin}${newPath}`);
  }

  // Continue to next middleware or route handler
  return next();
});