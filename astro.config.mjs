// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const base = '/';

// The site is published at the root GitHub Pages domain for this account.
// Keep the base at '/' and use `withBase()` from src/lib/paths.ts for stable internal links.
export default defineConfig({
  site: 'https://olamide.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
