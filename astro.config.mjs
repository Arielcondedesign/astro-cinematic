import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

export default defineConfig({
  integrations: [tailwind(), compress()],
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "es", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale:true
    }
  },
  vite: {
    build: {
      minify: 'terser',
    },
  },
  output: 'static',
  site: 'https://lajeteefilms.com', // Reemplaza con tu dominio real
});
