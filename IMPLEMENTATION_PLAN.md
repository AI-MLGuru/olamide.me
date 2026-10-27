# Portfolio Website Rewrite — Implementation Plan

## Goal

Turn `portfolio.me` into a polished, credible, TypeScript-powered professional portfolio that presents Olamide Fadahunsi Victor's engineering work clearly, makes strong projects easy to explore, and works well on mobile, with a keyboard, and through search engines.

This is a plan, not a claim that the projects or their published results have already been independently verified. Project descriptions, status, contribution, screenshots, and metrics must be reviewed with the owner before publication, and the audit remains the authoritative evidence boundary for all public claims.

## What exists today

- The repository contains a single `index.html`, `profile.jpg`, and IDE metadata; it has no `package.json`, TypeScript setup, component system, test suite, or build pipeline.
- The current page already supplies a simple content outline (intro, about, projects, skills, contact) and a profile image that may be reusable after approval.
- The page includes personal details and a bio that may no longer be current. Reconfirm all public-facing copy and contact details; do not carry over the age statement or phone number without explicit approval.
- GitHub Pages serves the deployed project under its repository-name path. Derive Astro's production `base` from `GITHUB_REPOSITORY` so asset and route URLs match the actual deployed repository; keep `/portfolio.me/` as the local fallback.
- There is no application architecture or framework to preserve. Keep the existing Git history and selectively reuse approved content and assets.

## Audience and positioning

**Primary audience:** hiring managers, engineering teams, collaborators, and technical clients looking for evidence of practical software and AI/ML engineering.

**Owner-confirmed positioning:** AI/ML engineer working across data, algorithms, AI/ML engineering, backend systems, and agentic software. The site should use this as the central theme and substantiate it with specific verified project evidence rather than treating it as a claim that every project includes AI/ML.

The site should show evidence rather than make broad expertise claims. Clearly distinguish completed, in-progress, research, and learning projects. Avoid unsupported performance figures, customer claims, and production-readiness claims.

## Proposed experience

### Information architecture

1. **Home** — concise introduction, selected work, capabilities, and a clear contact/resume call to action.
2. **Projects** — complete project directory with useful category filters, clear status labels, and a featured subset; visitors can browse everything without treating every item as a full case study.
3. **Case studies** — dedicated detail pages for the strongest projects, describing context, role, architecture, decisions, implementation, verification, outcomes, and limitations.
4. **About** — current professional background, approach, and interests.
5. **Contact** — explicitly approved contact methods and relevant professional links.

Technical notes can be a later addition if there is a sustainable writing plan. Keep the primary navigation short.

### Visual and interaction direction

- Use [mitech.pages.dev](https://mitech.pages.dev) as the requested design reference: inspect its layout, typography, color, navigation, and motion when it is available. The URL returned HTTP 404 during this planning pass, so do not guess at its design; request a working URL or screenshots before translating specific visual patterns.
- Borrow useful design principles, not its branding, copy, or assets. Create an original visual identity for this portfolio.
- Aim for a confident, project-first presentation with clear typography, disciplined spacing, restrained colors, and project imagery or diagrams where they add evidence.
- Responsive layouts, visible focus states, semantic HTML, useful alt text, and reduced-motion support are requirements.
- Use motion only where it supports comprehension. Avoid making heavy animation or 3D a dependency for the initial release.
- Light/dark theme is optional and should be included only if it can be delivered accessibly without delaying the core work.

## Project inventory and presentation

The audit must account for **all 17 unique project entries** in the supplied Desktop and OneDrive project-folder listings. The first-release public catalog should contain **13 projects** after folding superseded `Alphaweb` into `AlphaKolect` and treating `idqore-py-engine` as an absorbed PaxLI reference rather than a standalone project, while excluding `Vyce-test` and the abandoned `project-grid-ml`. Keep Project Grid ML in the audit as deferred future work; do not include or further verify it for the initial release. `cbt_backend` and `GamerSpace` remain excluded as previously requested. A catalog project can be a compact directory card rather than a long case study; do not omit active projects because they are less polished. The home page should spotlight the strongest work, while the complete Projects directory includes all 13 first-release entries with honest status and evidence-appropriate depth.

| Project | Source location(s) | Initial treatment |
|---|---|---|
| `ai-sports` | OneDrive Projects | Audit README and implementation; classify scope and status. |
| `Alphaweb` | OneDrive Projects | Superseded original version; do not list separately. Treat only as predecessor/source context for the main `AlphaKolect` project if useful and approved. |
| **PaxLI** (local folder `Averiq`) | OneDrive Projects | Primary identity-verification project and catalog entry. Olamide reports building the system; verify feature claims and publication boundaries. |
| `Build` | OneDrive Projects | Treat as the BUILD product comprising `ai-service`, `build-backend`, and `mobile-app`; use this project, not `cbt_backend`. Candidate for a deep case study after implementation and evidence review. |
| `easybirth` | Both project folders | One catalog entry; owner selects OneDrive as canonical. Compare the Desktop Flutter snapshot only for unique work that may need to be carried forward. |
| `fraud-reporting-platform` | OneDrive Projects | README describes an MVP; verify current state and distinguish implemented reporting from planned scoring. |
| `hustle` | OneDrive Projects | Audit README and implementation; candidate for a deep product case study. |
| `idqore-py-engine` | OneDrive Projects | Preserve in source inventory as an owner-confirmed PaxLI reference/learning baseline; do not list as an independent active project. |
| `IHcPro-Data-Analytics` | OneDrive Projects | Include only content approved for public disclosure; verify project contribution and any metrics before use. |
| `koraspace.ai` | OneDrive Projects | Audit implemented versus planned capabilities and remove confidential integration details. |
| `project-grid-ml` | OneDrive Projects | Abandoned per owner; defer from the first-release catalog and further verification. Retain this source entry for possible future inclusion. |
| `Restaurant-menu-saas` / KODA | OneDrive Projects | Olamide clarified that subscription functionality means expiry/access enforcement only and reports KODA live in production at [koda.paxalphaltd.com](https://koda.paxalphaltd.com); the homepage returned HTTP 200 on 2026-10-26. Verify a representative menu/QR workflow before expanding feature or production-use claims. Billing, payment providers, renewal/invoice flow, and a Subscription page are not built; do not conflate expiry enforcement with billing. |
| `Uchedav-industries-website` | OneDrive project directory; also appears as a zero-byte file in Desktop Projects | One catalog entry; use the actual OneDrive project directory and disregard the Desktop placeholder. |
| `ajo-hackathon-bmoni` | Desktop Projects | Represent the owner-confirmed backend and deterministic AI-assistant evaluation/fact-grounding contribution. Do not describe it as trained/deployed ML; retain its synthetic demo and hackathon limits. |
| `alphakolect` | Desktop Projects | Main project; owner says it was created using useful material from the superseded Alphaweb version. Audit current implementation and claims. |
| `Build-waitlist` | Desktop Projects | Keep separate from `Build`; audit its purpose and current state before describing it. |
| `Vyce-test` | Desktop Projects | Excluded at the owner's direction; the provided folder contained no inspectable project source. Do not create a public catalog entry. |

`Alphaweb` is not a separate public project entry; its useful predecessor material is part of the `AlphaKolect` project story if appropriate. `idqore-py-engine` is retained in the audit inventory but absorbed as a reference/learning baseline under PaxLI, not shown as a standalone project. `Vyce-test`, `project-grid-ml` (deferred as abandoned for now), `cbt_backend`, and `GamerSpace` are excluded from the first-release catalog. The two `easybirth` checkouts are one product; OneDrive is the selected canonical snapshot. The Desktop `Uchedav-industries-website` placeholder is not a project directory and is not an extra portfolio entry.

The GitHub profile is an additional cross-check, not a substitute for the supplied local inventory. Reconcile public repositories against these projects, add genuine standalone work that is not already represented, and label learning repositories, forks, contributions to other people's projects, and portfolio examples accurately. Do not present course materials, third-party code, or client work as original personal projects.

### Project depth and content model

- Include all 13 first-release projects in a searchable/filterable directory with useful categories, technology tags, status, and links only when verified; keep the audit's source-folder disposition for absorbed, excluded, and deferred entries.
- Select the most substantial, well-evidenced projects for full case studies after auditing; Ajo is the strongest current draft candidate, while BUILD, IHcPro, KoraSpace, Hustle, Restaurant-menu-saas, AlphaKolect, and SPIRT remain candidates, not pre-approved featured work. Alphaweb is treated only as AlphaKolect's superseded predecessor; IDQore is not a separate case-study candidate.
- Include other projects as concise cards or shorter detail pages proportionate to their completeness. A starter, experiment, learning project, or waitlist should be labeled as such, not inflated into a production case study.
- Make the catalog the single source of truth: define a typed project schema and create one data record per in-scope project. Generate the directory, filters, featured sections, and project detail/case-study routes from these records rather than duplicating project copy across pages.
- At minimum, each record should include a stable ID/slug, title, concise summary, category, status, technologies, source reference, verified public links, contribution, and optional featured flag, approved assets, and long-form case-study content.
- Validate catalog records at build time so missing required fields, duplicate slugs, and invalid status/category values fail visibly instead of silently omitting projects.
- For full case studies, document the problem, role/contribution, approach, architecture, trade-offs, implementation evidence, tests/evaluation, results, and limitations.
- Do not invent metrics or imply that planned work is shipped. Get permission for client/proprietary projects and disclose only information explicitly approved for public release. Never copy secrets, private data, credentials, or proprietary source code into the site.
- Emphasize engineering judgment: explain consequential decisions, alternatives and trade-offs, and how behavior or results were tested. A technology list is supporting context, not the case study.

## Recommended technical approach

- **Astro with TypeScript**, rendered as a static site. This is a good fit for a content-led portfolio with index and case-study pages, strong page-level metadata, and no required backend.
- Use Astro components, TypeScript, CSS custom properties, and minimal client-side JavaScript. Use the typed local project catalog as the single source of project data and shared components/layouts for consistent presentation.
- Do not add a database, CMS, server API, animation framework, or live GitHub API dependency in the first release. Add dependencies only to meet a concrete requirement.
- Configure the static build for the GitHub Pages repository path from the start. Make internal links, images, canonical URLs, sitemap entries, and deployment artifacts base-path aware.
- Reassess framework choice before implementation only if the repository audit reveals a requirement that static Astro cannot meet.

## Delivery phases

### Phase 1 — Audit the complete inventory and confirm permissions

- Audit all 17 listed source entries and record their disposition; build the first-release catalog from the 13 projects after applying the confirmed Alphaweb, IDQore, Vyce, and Project Grid ML decisions. Audit all three `Build` components and reconcile same-name directories and public GitHub repositories.
- On 2026-10-26, Olamide reported that applicable publication permissions are approved and cleared for all 13 first-release projects. Record this as owner-confirmed in [`PROJECT_AUDIT.md`](./PROJECT_AUDIT.md); it is not independent evidence from collaborators/clients and does not clear sensitive data, secrets, or unreviewed assets.
- For each project, inspect source code, tests, documentation, Git history where useful, and a working demo when available. A README alone is not proof that a feature, metric, or deployment exists.
- For KODA, the focused menu creation/publication, QR resolution, tenant-isolation, and subscription-expiry integration tests passed (146 tests) on 2026-10-27 against an isolated disposable PostgreSQL 16 database; 206 warnings were retained in [`PROJECT_AUDIT.md`](./PROJECT_AUDIT.md). Do not point fixture-driven tests at the project's local development database.
- The 2026-10-27 follow-up pass found an outdated public GitHub Pages biography and phone number, a Build-waitlist homepage URL serving unrelated content, and multiple project-specific scope/attribution questions. Keep these out of the implementation until the owner confirms the final profile copy and public destinations.
- Record each active catalog project's identity, current status, Olamide's contribution, technologies, demo/repository links, test or evaluation evidence, limitations, and publication permissions.
- Maintain the structured, per-project evidence, first-release acceptance checklist, and six-field verification ledger in [`PROJECT_AUDIT.md`](./PROJECT_AUDIT.md), using the controlled statuses and evidence notes there; distinguish source observations, unverified documentation claims, and owner-confirmed facts.
- Inspect `mitech.pages.dev` once a working page or screenshots are available and translate relevant design principles into an original design brief.
- Confirm preferred professional title, biography, resume, approved contact links, photo usage, and whether to display a location.
- Select the full-case-study projects based on substance and evidence; retain an honest card/detail entry for every other in-scope project.
- Do not copy secrets, environment files, private data, or proprietary implementation details into this portfolio.

**Exit criteria:** all 17 source entries have a documented disposition, and every applicable item in the 13-project first-release acceptance checklist is closed with evidence or an explicit owner-approved limitation; source, tests, Git/demos, contribution, and disclosure boundaries are documented; featured-case-study selections and basic profile copy are approved. Project Grid ML is explicitly deferred, and IDQore is absorbed into PaxLI rather than counted as a standalone entry. Test-file presence alone does not satisfy verification.

### Phase 2 — Establish the foundation and deployment path

- Add Astro, TypeScript, package scripts, formatting/linting conventions, and a static production build.
- Configure the site URL, repository-specific base path, internal link and asset strategy, canonical URL generation, and sitemap behavior before building out pages.
- Define the typed project schema, create the initial records for all 13 first-release projects, and make catalog validation part of the build.
- Establish the initial design tokens and shared page shell; defer page-by-page visual polish until deployment and content generation are proven.
- Deploy a minimal production build to GitHub Pages and verify that routes, links, images, canonical URLs, and sitemap work under the deployed repository path.

**Exit criteria:** clean install and production build; all 13 first-release catalog records validate; a minimal page deploys and resolves links/assets correctly under the repository-derived GitHub Pages path.

### Phase 3 — Build the core pages and responsive design

- Implement shared navigation, footer, home page, complete 13-project first-release directory, about page, and contact section.
- Generate the project directory, featured sections, and project detail routes from the typed catalog; use reusable case-study templates without implying all work has equal scope or maturity.
- Add only the project filters and motion needed for a useful, accessible experience.

**Exit criteria:** all primary routes render from approved catalog/content at mobile, tablet, and desktop sizes; navigation works with keyboard and touch; no project content is duplicated across separate page implementations.

### Phase 4 — Write and evidence the case studies

- Publish the approved deep case studies from verified content records; the other in-scope projects remain represented in the complete directory.
- Support case-study claims with source, test, demo, or evaluation evidence from the audit. Explain key engineering decisions and trade-offs, not only the stack used.
- Add original diagrams, screenshots, or charts only when they clarify the work and can be safely published.
- Label project status and results accurately; note important limitations where relevant.

**Exit criteria:** every case study answers what the project does, what Olamide built, how it was validated, and what remains incomplete.

### Phase 5 — Quality, discoverability, and release

- Add per-page titles/descriptions, canonical URL strategy, social preview metadata, sitemap, and favicon.
- Check contrast, heading structure, alt text, focus behavior, reduced-motion behavior, and keyboard navigation.
- Check broken links, missing images, base-path behavior, production build output, and mobile layouts.
- Review the public site for personal information, secrets, unapproved project details, and unsupported claims.
- Deploy through GitHub Pages and verify the published URL.

**Exit criteria:** build and checks pass, no broken internal links/assets, no unapproved sensitive content, and the deployed site is usable on mobile and desktop.

## Acceptance criteria

- The existing GitHub Pages URL continues to work unless a new domain is agreed.
- The primary TypeScript app builds reproducibly from documented package scripts.
- The project directory and detail pages are generated from one typed catalog; catalog validation catches missing required fields and duplicate slugs.
- GitHub Pages base-path behavior is verified in a production build before investing in full visual polish, including internal routes, images, canonical URLs, and sitemap entries.
- A visitor can understand the professional focus and reach the complete Projects directory and selected project evidence in one or two interactions.
- Every first-release project is represented once in the 13-project catalog; Alphaweb is folded into AlphaKolect, IDQore is absorbed into PaxLI, duplicate folders are consolidated, and Vyce-test, deferred `project-grid-ml`, and the explicit exclusions are absent. All 17 supplied source entries still have a recorded disposition.
- Featured projects have accurate status, contribution, links, and source/test/demo evidence; no results are fabricated or based solely on README claims.
- Case studies explain meaningful engineering decisions and how they were verified, rather than relying on technology lists alone.
- Core content is readable and navigation usable at common mobile and desktop widths, with keyboard operation and reduced-motion support.
- Page metadata and social previews are present, and images have sensible sizing and alt text.
- No secrets, private source code, client information, or unapproved contact details are included.

## Decisions to settle before implementation

1. Confirm the professional title and final biography.
2. Confirm each project's current status and contribution, approve public-facing details, and select deep case studies from the complete inventory.
3. Provide a working `mitech.pages.dev` URL or screenshots so its visual design can be inspected.
4. Confirm whether to keep the GitHub Pages URL or use a custom domain.
5. Confirm which contact methods and resume link should be public.
6. Approve the visual direction and decide whether dark mode is part of the first release.

## Reference basis

- Current `portfolio.me` repository files: `index.html` and `profile.jpg`.
- Public GitHub profile and repositories: [AI-MLGuru](https://github.com/AI-MLGuru), including [PaxLI](https://github.com/AI-MLGuru/PaxLI), [Navigatr](https://github.com/AI-MLGuru/navigatr), [Fraud Mention Intelligence Engine](https://github.com/AI-MLGuru/Fraud_Mention_Intelligence_Engine), and [portfolio.me](https://github.com/AI-MLGuru/portfolio.me).
- Local project inventory taken from the two supplied folder listings; it consolidates `easybirth` and `Uchedav-industries-website` duplicates and excludes `cbt_backend` and `GamerSpace` as requested.
- Project README files and GitHub metadata are preliminary sources, not independent verification of implementation, metrics, authorship, or publication permission. The requested `mitech.pages.dev` reference returned HTTP 404 during this planning pass; request a working URL or screenshots before translating specific visual patterns.