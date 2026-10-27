import { DISCIPLINES, EVIDENCE_KINDS, LINK_KINDS, STATUSES, type Project } from './schema';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isBlank(value: unknown): boolean {
  return typeof value !== 'string' || value.trim().length === 0;
}

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Returns every problem found in the catalog. An empty array means the catalog is valid.
 * Checks run on plain data so they also catch mistakes that slip past the type checker
 * (casts, `any`, or JSON imported later).
 */
export function validateCatalog(projects: readonly Project[]): string[] {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const featuredPositions = new Set<number>();

  projects.forEach((project, index) => {
    const at = `project[${index}]${isBlank(project.slug) ? '' : ` "${project.slug}"`}`;

    for (const field of ['slug', 'title', 'tagline', 'summary', 'role'] as const) {
      if (isBlank(project[field])) errors.push(`${at}: "${field}" is required`);
    }

    if (!isBlank(project.slug)) {
      if (!SLUG_PATTERN.test(project.slug)) errors.push(`${at}: slug must be kebab-case`);
      if (slugs.has(project.slug)) errors.push(`${at}: duplicate slug`);
      slugs.add(project.slug);
    }

    if (!(STATUSES as readonly string[]).includes(project.status)) {
      errors.push(`${at}: unknown status "${String(project.status)}"`);
    }

    if (!Array.isArray(project.disciplines) || project.disciplines.length === 0) {
      errors.push(`${at}: at least one discipline is required`);
    } else {
      for (const discipline of project.disciplines) {
        if (!(DISCIPLINES as readonly string[]).includes(discipline)) {
          errors.push(`${at}: unknown discipline "${String(discipline)}"`);
        }
      }
    }

    for (const list of ['highlights', 'stack'] as const) {
      const items = project[list];
      if (!Array.isArray(items) || items.length === 0) {
        errors.push(`${at}: "${list}" needs at least one entry`);
      } else if (items.some(isBlank)) {
        errors.push(`${at}: "${list}" contains an empty entry`);
      }
    }

    // A record with no evidence would be an unsupported claim.
    if (!Array.isArray(project.evidence) || project.evidence.length === 0) {
      errors.push(`${at}: at least one evidence entry is required`);
    } else {
      for (const item of project.evidence) {
        if (!(EVIDENCE_KINDS as readonly string[]).includes(item.kind)) {
          errors.push(`${at}: unknown evidence kind "${String(item.kind)}"`);
        }
        if (isBlank(item.label) || isBlank(item.detail)) {
          errors.push(`${at}: evidence entries need a label and detail`);
        }
      }
    }

    if (!Array.isArray(project.boundaries) || project.boundaries.some(isBlank)) {
      errors.push(`${at}: "boundaries" must be a list of non-empty strings`);
    }

    for (const link of project.links ?? []) {
      if (!(LINK_KINDS as readonly string[]).includes(link.kind)) {
        errors.push(`${at}: unknown link kind "${String(link.kind)}"`);
      }
      if (!isHttpsUrl(link.href)) errors.push(`${at}: link "${link.href}" must be an https URL`);
    }

    if (project.featured !== undefined) {
      if (!Number.isInteger(project.featured) || project.featured < 1) {
        errors.push(`${at}: "featured" must be a positive integer`);
      } else if (featuredPositions.has(project.featured)) {
        errors.push(`${at}: featured position ${project.featured} is already taken`);
      } else {
        featuredPositions.add(project.featured);
      }
    }
  });

  return errors;
}

/** Throws with every problem listed, so a bad record fails the build instead of disappearing. */
export function assertValidCatalog(projects: readonly Project[]): void {
  const errors = validateCatalog(projects);
  if (errors.length > 0) {
    throw new Error(`Project catalog is invalid:\n  - ${errors.join('\n  - ')}`);
  }
}
