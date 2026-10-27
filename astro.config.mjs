// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from GitHub Pages as a project site, so every route and asset
// lives under /portfolio.me/. Build links with `withBase()` from src/lib/paths.ts.
export default defineConfig({
  site: 'https://ai-mlguru.github.io',
  base: '/portfolio.me',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
