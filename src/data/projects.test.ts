import { describe, expect, it } from 'vitest';
import { projects } from './projects';
import { validateCatalog } from './validate';

describe('project catalog', () => {
  it('ships exactly the 13 first-release projects', () => {
    expect(projects).toHaveLength(13);
  });

  it('is valid', () => {
    expect(validateCatalog(projects)).toEqual([]);
  });

  it('leaves out absorbed, excluded, and deferred entries', () => {
    const slugs = projects.map((p) => p.slug);
    for (const absent of ['alphaweb', 'idqore-py-engine', 'vyce-test', 'project-grid-ml']) {
      expect(slugs).not.toContain(absent);
    }
  });

  it('does not link the waitlist URL that serves unrelated content', () => {
    const hrefs = projects.flatMap((p) => p.links.map((l) => l.href));
    expect(hrefs.some((href) => href.includes('build-waitlist.vercel.app'))).toBe(false);
  });
});
