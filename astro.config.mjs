// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const [owner = 'AI-MLGuru', repository = 'olamide.me'] = (
  process.env.GITHUB_REPOSITORY ?? 'AI-MLGuru/olamide.me'
).split('/');
const site = `https://${owner.toLowerCase()}.github.io`;
const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;
const base = isUserSite ? '/' : `/${repository}`;

// Project sites use the repository path; username.github.io sites live at the root.
// Use `withBase()` from src/lib/paths.ts for all internal links.
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
});
