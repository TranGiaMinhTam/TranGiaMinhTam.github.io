# Build Instructions

## Purpose

Produce the final static portfolio bundle with the same locked dependencies and checks used for the approved U-01 through U-07 implementation.

## Prerequisites

| Requirement                  | Project value                                                |
| ---------------------------- | ------------------------------------------------------------ |
| Runtime                      | Node.js 20.19 or newer; verified locally with Node.js 24.0.0 |
| Package manager              | npm; verified locally with npm 11.3.0                        |
| Build tools                  | TypeScript 5.9.3 and Vite 7.3.0 through package scripts      |
| Required secrets or services | None                                                         |
| Optional configuration       | `VITE_BASE_PATH` for a non-root GitHub Pages path            |
| Output                       | `dist/`, including `dist/.vite/manifest.json`                |

The repository's GitHub Pages workflow derives `VITE_BASE_PATH`. A local build without it uses `/`.

## Reproducible Build

Run from the repository root:

```bash
npm ci
npm run lint
npm test
npm run build
```

`npm run build` performs the TypeScript project build before Vite creates the production output.

For a project-site base path, use the same value the deployment workflow derives:

```bash
VITE_BASE_PATH=/TranGiaMinhTam.github.io/ npm run build
```

## Required Result

- Every command exits with status zero.
- `dist/index.html`, `dist/assets/`, and `dist/.vite/manifest.json` exist.
- The manifest lists `JournalRouteEntry.tsx` outside the initial static dependency closure.
- The active boundary and U-07 verifier remain clean:

```bash
npm run check:portfolio
npm run check:contact-journal:active
npm run verify:contact-journal:active
npm run verify:recovery
```

## Preview

```bash
npm run preview
```

Open the local URL printed by Vite. Confirm the continuous portfolio loads, Data Stories opens the Research Note route, returning restores the portfolio, and the Contact form only creates the approved local `mailto:` handoff.

## Build Artifacts

| Artifact                   | Responsibility                                        |
| -------------------------- | ----------------------------------------------------- |
| `dist/index.html`          | Static entry document                                 |
| `dist/assets/index-*.js`   | Initial application JavaScript                        |
| `dist/assets/index-*.css`  | Initial shared styling                                |
| Journal-named assets       | Lazy Research Note JavaScript and CSS                 |
| `dist/.vite/manifest.json` | Entry, dependency, and lazy-route classification      |
| Copied evidence files      | Verified local portfolio evidence available on demand |

Do not commit `dist/` unless the repository's publishing policy is intentionally changed.

## Troubleshooting

### Dependency or native binding failure

Confirm the Node version, remove only this repository's `node_modules` if necessary, and rerun `npm ci`. Do not regenerate `package-lock.json` unless changing dependencies intentionally.

### TypeScript, lint, or test failure

Fix the first reported error, rerun its focused command, then rerun the complete sequence. Never accept a build by bypassing TypeScript, lint, boundary, or verifier failures.

### Built assets fail under GitHub Pages

Confirm the build received `/` for a root Pages repository or `/<repository>/` for a project repository. See `DEPLOYMENT.md` and `.github/workflows/deploy.yml`.

### Bundle budget failure

Use the exact measurement command in `performance-test-instructions.md`. Inspect the manifest before changing budgets; budget increases require a deliberate review rather than silently changing the ceiling.
