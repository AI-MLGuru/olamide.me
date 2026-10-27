// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = repository && !repository.endsWith('.github.io') ? `/${repository}` : '/portfolio.me';

// Served from GitHub Pages as a project site, so every route and asset
// lives under the repository path. Build links with `withBase()` from src/lib/paths.ts.
export default defineConfig({
  site: 'https://ai-mlguru.github.io',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
