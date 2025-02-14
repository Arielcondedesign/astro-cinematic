import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpine from '@astrojs/alpinejs';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://lajeteefilms.com',
  integrations: [
    tailwind(),
    alpine(),
    compress(),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  },
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'es', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  }
});