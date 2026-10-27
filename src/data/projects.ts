import type { Discipline, Project, Status } from './schema';
import { assertValidCatalog } from './validate';

/**
 * The 13-project first-release catalog — the single source of truth for project copy.
 *
 * Wording follows the claim boundaries in PROJECT_AUDIT.md. Before changing a record,
 * check the audit: only add a link, metric, or capability that it records as evidenced.
 * Absorbed, excluded, and deferred entries (Alphaweb, idqore-py-engine, Vyce-test,
 * project-grid-ml) are intentionally absent.
 */
export const projects: readonly Project[] = [
  {
    slug: 'koda',
    title: 'KODA',
    tagline: 'Multi-tenant digital menu and QR-access platform',
    summary:
      'Restaurants build and publish digital menus that guests open from table or counter QR codes. Each merchant’s data is isolated, and access is enforced against an operator-managed subscription end date.',
    status: 'launched',
    disciplines: ['backend', 'web'],
    role: 'Built the platform as a modular monolith, including the subscription expiry and access-enforcement layer.',
    highlights: [
      'Menu creation and publication with public menu and QR-code resolution.',
      'Tenant isolation enforced in the API and backed by database constraints.',
      'Expiry-based access control: an operator-managed paid-through date locks the merchant API and the public menu and QR routes when it lapses.',
      'Subscription-state endpoint, audit trail, and scheduled expiry notice jobs.',
    ],
    evidence: [
      {
        kind: 'tests',
        label: '146 passing',
        detail:
          'Eight focused API suites run against an isolated PostgreSQL 16 database, covering menus, public QR resolution, tenant isolation, and expiry gating.',
      },
      {
        kind: 'tests',
        label: '14 passing',
        detail: 'Expiry, timezone, and reminder policy boundaries.',
      },
      {
        kind: 'live',
        label: 'Public site responding',
        detail: 'The public homepage is reachable at koda.paxalphaltd.com.',
      },
    ],
    boundaries: [
      'Not a billing product: there are no payment providers, plans, renewals, or invoices yet. Subscriptions control access dates only.',
      'Menu infrastructure only. There is no ordering or delivery.',
    ],
    stack: ['Python', 'TypeScript', 'React', 'PostgreSQL'],
    links: [{ kind: 'site', href: 'https://koda.paxalphaltd.com' }],
    featured: 1,
  },
  {
    slug: 'ajo-savings-circle',
    title: 'Ajo Savings Circle',
    tagline: 'Savings-circle demo with a fact-grounded assistant',
    summary:
      'A hackathon demo of a rotating savings circle (ajo). Its assistant explains contributions and payouts using only verified circle facts, and a deterministic evaluation suite checks it does.',
    status: 'hackathon',
    disciplines: ['ai-ml', 'backend'],
    context: 'Team hackathon project',
    role: 'Backend and AI-assistant engineering: grounding the assistant in circle data and building its reliability evaluation.',
    highlights: [
      'Assistant answers are grounded in circle financial facts instead of free-form generation.',
      'Payout and approval explanations are gated on eligibility evidence.',
      'Role-aware next steps for members and organisers.',
      'Authenticated end-to-end smoke checks for the demo flow.',
    ],
    evidence: [
      {
        kind: 'tests',
        label: '18 passing',
        detail:
          '15 deterministic assistant-evaluation cases plus demo-cycle tests covering fact grounding, payout states, and authorization and privacy boundaries.',
      },
      {
        kind: 'source',
        label: 'Contribution traced in Git',
        detail: 'Grounding, evaluation, next-step, and smoke-test changes map to authored commits.',
      },
    ],
    boundaries: [
      'Contributions and payouts are simulated. No real money moves and no payment provider is connected.',
      'The assistant is deterministic engineering, not a trained or deployed ML model.',
    ],
    stack: ['Python', 'Flutter', 'Dart', 'SQLite', 'pytest'],
    links: [
      {
        kind: 'team-repo',
        href: 'https://github.com/olowolayemogoodness-crypto/ajo-hackathon-bmoni',
      },
    ],
    featured: 2,
  },
  {
    slug: 'build',
    title: 'BUILD',
    tagline: 'Multi-tenant academic catalogue and computer-based testing platform',
    summary:
      'A learning product made up of a backend, a separate AI service, and a mobile app. The AI service provides tenant-scoped retrieval behind a bounded agent registry and a pluggable model-provider layer.',
    status: 'in-development',
    disciplines: ['ai-ml', 'agentic', 'backend'],
    role: 'Built the core backend and the separate AI service.',
    highlights: [
      'Backend foundation for a multi-tenant academic catalogue and computer-based tests (CBT).',
      'Hybrid retrieval in the AI service: dense vector search alongside BM25 lexical search, both scoped to a tenant.',
      'Bounded agent registry and a model-provider abstraction, so models can be swapped without touching callers.',
      'Durable storage interface defined up front, with unimplemented operations failing loudly instead of silently.',
    ],
    evidence: [
      {
        kind: 'tests',
        label: '3 passing',
        detail:
          'Focused retrieval tests for dense search, BM25 lexical search, and tenant-context validation.',
      },
    ],
    boundaries: [
      'Retrieval currently runs in memory. Durable pgvector storage and full document ingestion are not built yet.',
      'An end-to-end workflow across the backend, AI service, and mobile app has not been verified.',
      'Private and under active development, so no source link.',
    ],
    stack: ['Python', 'TypeScript', 'Expo', 'React Native'],
    links: [],
    featured: 3,
  },
  {
    slug: 'ihcpro-data-analytics',
    title: 'IHcPro Data Analytics',
    tagline: 'Regulatory-risk and workload-prioritisation prototype for healthcare',
    summary:
      'A data-science interview project: a web app for monthly document intake with a predictive pipeline that ranks regulatory risk, monitors drift, and explains its predictions.',
    status: 'prototype',
    disciplines: ['ai-ml', 'data', 'backend', 'web'],
    context: 'Data-science interview project',
    role: 'Data-science and ML engineering, plus the supporting web application.',
    highlights: [
      'Gradient-boosted classification pipeline (scikit-learn HistGradientBoosting) with time-ordered train, validation, and test splits to avoid leaking the future into training.',
      'Risk banding, population-stability (PSI) drift monitoring, per-prediction explanations, and monitoring alerts.',
      'FastAPI backend with a Next.js front end for monthly intake and insights.',
    ],
    evidence: [
      {
        kind: 'tests',
        label: '5 passing',
        detail:
          'Unit tests for risk bands, PSI drift calculation, prediction explanations, and monitoring alerts.',
      },
      {
        kind: 'source',
        label: 'Pipeline inspected',
        detail:
          'Temporal fold construction and metric calculation confirmed in the training pipeline.',
      },
    ],
    boundaries: [
      'Model performance metrics are not published here because they have not been independently reproduced.',
      'Company data and data-derived results are excluded.',
    ],
    stack: ['Python', 'scikit-learn', 'FastAPI', 'Next.js', 'TypeScript'],
    links: [],
    featured: 4,
  },
  {
    slug: 'paxli',
    title: 'PaxLI',
    tagline: 'Identity-verification platform, foundation stage',
    summary:
      'The foundation of an identity-verification service: a decision and evidence architecture with tenant isolation and adapter interfaces for document and biometric checks.',
    status: 'in-development',
    disciplines: ['backend', 'ai-ml'],
    role: 'Designed and built the system.',
    highlights: [
      'FastAPI service built around explicit verification decisions and the evidence behind them.',
      'Tenant isolation covered by contract tests.',
      'Adapter interfaces for document and biometric providers, with database migrations.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Foundation inspected',
        detail:
          'Decision, evidence, adapter, and migration code reviewed. The project documents itself as foundation stage.',
      },
    ],
    boundaries: [
      'Document OCR is a deterministic stand-in for now, and production biometric models are not yet integrated.',
      'Security-sensitive implementation details are intentionally not described here.',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    links: [{ kind: 'repo', href: 'https://github.com/AI-MLGuru/PaxLI' }],
  },
  {
    slug: 'koraspace',
    title: 'KoraSpace',
    tagline: 'AI-enabled social workspace with a governed agent loop',
    summary:
      'A workspace where an AI agent plans and carries out actions for the user. The loop validates each plan, limits how far it can go, asks for approval, and stops rather than guessing when context is missing.',
    status: 'prototype',
    disciplines: ['agentic', 'ai-ml', 'web'],
    role: 'Built the agentic AI and intelligence workflow.',
    highlights: [
      'Plan validation before any step runs, with a hard limit on step count.',
      'Governed tool execution with an approval checkpoint.',
      'Fails closed: when governed memory context cannot be resolved, the run stops.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Action loop inspected',
        detail:
          'Plan validation, step limits, approval, and fail-closed behaviour confirmed in the autonomy code path.',
      },
    ],
    boundaries: [
      'Some domain actions are simulated in memory, so not every listed integration is live.',
      'No particular model provider is claimed.',
    ],
    stack: ['TypeScript', 'Next.js'],
    links: [],
  },
  {
    slug: 'spirt',
    title: 'SPIRT',
    tagline: 'Athlete-to-student mentorship matching',
    summary:
      'A sports-performance intelligence tool that matches students with athlete mentors. Its ranker blends semantic profile similarity with rating and experience signals.',
    status: 'in-development',
    disciplines: ['ai-ml', 'backend'],
    context: 'Team project in a Black AI-UK mentorship programme',
    role: 'Built the AI/ML matching algorithm.',
    highlights: [
      'Embeds athlete and mentor profiles and ranks by a weighted score: 70% semantic similarity, 20% rating, 10% experience.',
      'An LLM-backed matching path that falls back to keyword matching when no model provider is configured.',
      'Recommendations exposed through an API.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Ranker inspected',
        detail:
          'Embedding ranking service, weighting formula, and recommendations endpoint confirmed in source.',
      },
    ],
    boundaries: ['No match-quality metrics are claimed.'],
    stack: ['Python', 'TypeScript', 'Embeddings'],
    links: [],
  },
  {
    slug: 'easybirth',
    title: 'Easybirth',
    tagline: 'Maternal-health app with an ML risk pipeline',
    summary:
      'A hackathon maternal-health app. The ML side is a scikit-learn training pipeline and model factory, built and exercised on synthetic data.',
    status: 'hackathon',
    disciplines: ['ai-ml', 'mobile'],
    context: 'Team project, CouchaAfrica 2026 hackathon',
    role: 'ML contribution: the training pipeline and model work.',
    highlights: [
      'scikit-learn training pipeline with a model factory for swapping estimators.',
      'Logistic-regression baseline trained on a generated synthetic dataset.',
      'Flutter mobile app with a Python backend.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Pipeline inspected',
        detail: 'Training pipeline and model factory confirmed in the canonical source.',
      },
    ],
    boundaries: [
      'Trained on synthetic data only. No clinical validity or real-world outcome is claimed.',
      'The in-app risk service is still a placeholder and does not yet serve the trained model.',
    ],
    stack: ['Python', 'scikit-learn', 'Flutter', 'Dart'],
    links: [{ kind: 'team-repo', href: 'https://github.com/MI-TECHDLIN/easybirth' }],
  },
  {
    slug: 'fraud-reporting-platform',
    title: 'Fraud Reporting Platform',
    tagline: 'Community reporting for fraud-linked accounts',
    summary:
      'An MVP for reporting accounts linked to fraud and looking them up before paying. Reports feed a heuristic risk score that weighs report volume, velocity, and connected-account clusters.',
    status: 'prototype',
    disciplines: ['backend', 'web', 'data'],
    role: 'Built the website.',
    highlights: [
      'Complaint submission and account lookup.',
      'Heuristic risk scoring from report counts and reporting velocity.',
      'Graph clustering to surface accounts connected through shared reports.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Scoring inspected',
        detail: 'Submission, lookup, and threshold and graph scoring paths confirmed in source.',
      },
    ],
    boundaries: [
      'Scoring is rule-based, not a predictive ML model.',
      'No complaint data is shown here.',
    ],
    stack: ['Python', 'JavaScript', 'Docker'],
    links: [],
  },
  {
    slug: 'hustle',
    title: 'Hustle',
    tagline: 'Marketplace matching informal workers with jobs',
    summary:
      'A hackathon marketplace for informal workers. The ML engineering work added feature scoring and a model-inference path to worker matching. The team later moved to a rule-based matcher.',
    status: 'hackathon',
    disciplines: ['ai-ml', 'backend', 'mobile'],
    context: 'Team project, GTBank hackathon, May 2026',
    role: 'ML engineer.',
    highlights: [
      'Feature engineering and scoring modules for worker–job matching.',
      'Model loading and prediction path integrated into the matching service, with tests.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Traced in Git history',
        detail:
          'The ML scoring and inference work maps to an authored commit in the project history.',
      },
    ],
    boundaries: [
      'Historical contribution: the current version ranks with rules (distance, skills, experience, rating), not ML.',
    ],
    stack: ['Python', 'Flutter', 'Dart'],
    links: [{ kind: 'team-repo', href: 'https://github.com/olowolayemogoodness-crypto/hustle' }],
  },
  {
    slug: 'alphakolect',
    title: 'AlphaKolect',
    tagline: 'Savings, loans, and wallet platform, rebuild in progress',
    summary:
      'A phased rebuild of a savings, loans, and wallet platform as a modular TypeScript monorepo. The existing production system serves as the behavioural reference, so rebuilt features can be checked against it.',
    status: 'in-development',
    disciplines: ['backend', 'web'],
    role: 'Leading the rebuild.',
    highlights: [
      'TypeScript monorepo with separate application and package workspaces, plus CI.',
      'Phased delivery against the legacy system’s behaviour.',
      'API contract-conformance tests.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Workspace inspected',
        detail:
          'Monorepo structure, CI workflow, and the separation between rebuild and legacy reference confirmed.',
      },
    ],
    boundaries: [
      'The rebuild is not deployed yet. Production traffic still runs on the legacy system.',
      'Later phases on the roadmap are planned, not built.',
    ],
    stack: ['TypeScript', 'Node.js'],
    links: [],
  },
  {
    slug: 'build-waitlist',
    title: 'BUILD Waitlist',
    tagline: 'Verified-email waitlist for BUILD',
    summary:
      'The waitlist site for BUILD, separate from the core product. Signups are stored in PostgreSQL and confirmed by email, with duplicate handling and bot protection.',
    status: 'in-development',
    disciplines: ['web', 'backend'],
    role: 'Built the waitlist end to end.',
    highlights: [
      'PostgreSQL-backed signup with an email-verification flow.',
      'Clear verification, duplicate, and error states in the form.',
      'Honeypot bot protection and attribution analytics.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Flow inspected',
        detail:
          'Signup form, verification path, and authored verification and email commits confirmed.',
      },
    ],
    boundaries: ['The public URL is not listed until its deployment is confirmed.'],
    stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL'],
    links: [],
  },
  {
    slug: 'uchedav-industries',
    title: 'Uchedav Industries',
    tagline: 'Investor-facing company website',
    summary:
      'The website for an early-stage startup co-founded with a friend. It presents the company and its product line to investors, with each product honestly labelled as prototype, alpha, or concept.',
    status: 'in-development',
    disciplines: ['web'],
    context: 'Co-founded startup',
    role: 'Built the website.',
    highlights: [
      'Next.js, React, and TypeScript company site.',
      'Product catalogue with explicit maturity labels: prototype, alpha, or concept.',
    ],
    evidence: [
      {
        kind: 'source',
        label: 'Site inspected',
        detail: 'Project structure and product data confirmed in source.',
      },
    ],
    boundaries: ['The company name may change.', 'No product launch or customer claims.'],
    stack: ['Next.js', 'React', 'TypeScript'],
    links: [],
  },
];

assertValidCatalog(projects);

export const featuredProjects: readonly Project[] = projects
  .filter((project) => project.featured !== undefined)
  .sort((a, b) => (a.featured ?? 0) - (b.featured ?? 0));

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectsWithDiscipline(discipline: Discipline): readonly Project[] {
  return projects.filter((project) => project.disciplines.includes(discipline));
}

export function countByStatus(status: Status): number {
  return projects.filter((project) => project.status === status).length;
}
