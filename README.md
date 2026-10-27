# portfolio.me

Source for the portfolio of Olamide Fadahunsi (AI/ML & backend engineer).

Static site built with Astro and TypeScript, deployed to GitHub Pages by `.github/workflows/deploy.yml`. GitHub Actions derives the project base path from the repository name, so production assets and internal links match the deployed repository URL.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321/portfolio.me/
npm test           # catalog + glyph unit tests
npm run build      # astro check, then a static build into dist/
npm run preview    # serve the production build
npm run og         # regenerate public/og.png
```

Node 22.23.4 or newer.

## Where things live

| Path                                | What it is                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `src/data/projects.ts`              | The project catalog: the single source of truth for every project card and detail page. |
| `src/data/schema.ts`, `validate.ts` | Catalog types and build-time validation. A bad record fails the build.                  |
| `src/data/profile.ts`               | Name, title, and contact methods. Set `linkedin`, `x`, or `resume` to show them.        |
| `src/styles/global.css`             | Design tokens (light and dark) and base styles.                                         |
| `src/lib/paths.ts`                  | `withBase()`. Use it for every internal link so routes include Astro's configured base. |

## Content rules

Every public claim must be supported by [`PROJECT_AUDIT.md`](./PROJECT_AUDIT.md). In practice:

- Each project states Olamide's role, what's built, its evidence, and what it does **not** claim.
- Only link public repositories and verified live URLs. Private repos stay unlinked (a test enforces the known ones).
- No unsupported production, clinical, billing, or performance claims, and no sensitive client, security, or biometric details.

## Deploying

In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. Every push to `main` then tests, builds, and publishes.
