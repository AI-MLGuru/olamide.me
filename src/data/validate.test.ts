import { describe, expect, it } from 'vitest';
import type { Project } from './schema';
import { validateCatalog } from './validate';

const valid: Project = {
  slug: 'sample-project',
  title: 'Sample',
  tagline: 'A sample',
  summary: 'A sample project.',
  status: 'prototype',
  disciplines: ['backend'],
  role: 'Built it.',
  highlights: ['Does a thing.'],
  evidence: [{ kind: 'source', label: 'Inspected', detail: 'Read the code.' }],
  boundaries: [],
  stack: ['TypeScript'],
  links: [],
};

describe('validateCatalog', () => {
  it('accepts a well-formed record', () => {
    expect(validateCatalog([valid])).toEqual([]);
  });

  it('rejects duplicate slugs', () => {
    expect(validateCatalog([valid, { ...valid }])).toContainEqual(
      expect.stringContaining('duplicate slug'),
    );
  });

  it('rejects unknown statuses and disciplines', () => {
    const bad = { ...valid, status: 'shipped', disciplines: ['blockchain'] } as unknown as Project;
    const errors = validateCatalog([bad]);
    expect(errors).toContainEqual(expect.stringContaining('unknown status'));
    expect(errors).toContainEqual(expect.stringContaining('unknown discipline'));
  });

  it('rejects records without evidence', () => {
    expect(validateCatalog([{ ...valid, evidence: [] }])).toContainEqual(
      expect.stringContaining('evidence'),
    );
  });

  it('rejects missing required text and non-kebab slugs', () => {
    const errors = validateCatalog([{ ...valid, slug: 'Bad Slug', title: ' ' }]);
    expect(errors).toContainEqual(expect.stringContaining('kebab-case'));
    expect(errors).toContainEqual(expect.stringContaining('"title" is required'));
  });

  it('rejects non-https links', () => {
    const errors = validateCatalog([
      { ...valid, links: [{ kind: 'site', href: 'http://example.com' }] },
    ]);
    expect(errors).toContainEqual(expect.stringContaining('https'));
  });

  it('rejects clashing featured positions', () => {
    const errors = validateCatalog([
      { ...valid, featured: 1 },
      { ...valid, slug: 'other', featured: 1 },
    ]);
    expect(errors).toContainEqual(expect.stringContaining('already taken'));
  });
});
