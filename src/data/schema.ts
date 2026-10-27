/**
 * Typed schema for the project catalog.
 *
 * Every public claim about a project lives in one record that follows this schema.
 * PROJECT_AUDIT.md is the evidence boundary: anything not supported there stays out.
 */

export const DISCIPLINES = ['ai-ml', 'agentic', 'backend', 'data', 'web', 'mobile'] as const;
export type Discipline = (typeof DISCIPLINES)[number];

export const DISCIPLINE_LABELS: Record<Discipline, string> = {
  'ai-ml': 'AI & ML',
  agentic: 'Agentic systems',
  backend: 'Backend',
  data: 'Data',
  web: 'Web',
  mobile: 'Mobile',
};

export const STATUSES = ['launched', 'in-development', 'prototype', 'hackathon'] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABELS: Record<Status, string> = {
  launched: 'Launched',
  'in-development': 'In development',
  prototype: 'Prototype',
  hackathon: 'Hackathon build',
};

/**
 * How a piece of evidence was established.
 * - `tests`: a focused test run was executed and its result recorded in the audit.
 * - `source`: the behaviour was confirmed by reading the source or Git history.
 * - `live`: a public URL was fetched and responded.
 */
export const EVIDENCE_KINDS = ['tests', 'source', 'live'] as const;
export type EvidenceKind = (typeof EVIDENCE_KINDS)[number];

export interface Evidence {
  kind: EvidenceKind;
  /** Short headline, e.g. "146 passing". */
  label: string;
  /** What the evidence covers — and, implicitly, what it does not. */
  detail: string;
}

export const LINK_KINDS = ['site', 'repo', 'team-repo'] as const;
export type LinkKind = (typeof LINK_KINDS)[number];

export const LINK_LABELS: Record<LinkKind, string> = {
  site: 'Visit site',
  repo: 'Source on GitHub',
  'team-repo': 'Team repository',
};

export interface ProjectLink {
  kind: LinkKind;
  href: string;
}

export interface Project {
  /** URL-safe, unique identifier used for the detail route. */
  slug: string;
  title: string;
  /** One line: what the product is. */
  tagline: string;
  /** Two or three sentences for cards and page descriptions. */
  summary: string;
  status: Status;
  disciplines: readonly Discipline[];
  /** Where the work happened, e.g. a hackathon or mentorship programme. */
  context?: string;
  /** Olamide's role, stated no more broadly than the audit supports. */
  role: string;
  /** What is built, as observed in source. */
  highlights: readonly string[];
  /** How the highlights were checked. */
  evidence: readonly Evidence[];
  /** What the project does not do or claim yet. Shown publicly. */
  boundaries: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
  /** Position on the home page; omitted for directory-only entries. */
  featured?: number;
}
