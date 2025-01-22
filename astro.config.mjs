import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

export default defineConfig({
  // Elimina la sección experimental si estás usando Astro v5.0
  integrations: [tailwind(), compress()],
  
  // Si necesitas view transitions, ahora es un comportamiento predeterminado
  view: {
    transitions: true
  }
});