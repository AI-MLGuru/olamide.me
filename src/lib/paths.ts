/**
 * The site is served from /portfolio.me/ on GitHub Pages, so internal links must carry
 * the base path. `withBase('/projects/')` → `/portfolio.me/projects/`.
 */
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

export function withBase(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function projectPath(slug: string): string {
  return withBase(`/projects/${slug}/`);
}

/** True when `current` is `target` or one of its sub-pages (for nav highlighting). */
export function isActivePath(current: string, target: string): boolean {
  const normalise = (p: string) => p.replace(/\/+$/, '') || '/';
  const c = normalise(current);
  const t = normalise(withBase(target));
  return t === normalise(withBase('/')) ? c === t : c === t || c.startsWith(`${t}/`);
}
