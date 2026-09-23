# Technology Stack Decisions - U-01 Foundation and Safe Migration

## Decision Summary

U-01 retains the repository's React, TypeScript, Vite, Vitest, and Testing Library toolchain. The new `src/portfolio/` boundary uses semantic native HTML and SVG, CSS Modules, and CSS custom-property tokens. It adds no UI framework and does not import Chakra UI, Tailwind utilities, rejected template modules, or rejected global presentation CSS. Existing dependencies remain temporarily available to the rejected recoverable worktree until a later exact cleanup plan proves they are unused.

## Selected Stack

| Concern | Selection | Current declared version or policy | U-01 decision |
| --- | --- | --- | --- |
| UI runtime | React and React DOM | `^19.2.0` | Retain; use function components and typed props. |
| Language | TypeScript | `~5.9.3` | Retain strict mode and current unused/safety checks. |
| Build | Vite | `^7.2.4` | Retain static production build and base-path behavior. |
| React transform | `@vitejs/plugin-react-swc` | `^4.2.2` | Retain current Vite React integration. |
| Unit/component tests | Vitest | `^4.1.9` | Retain deterministic focused and repeat-run tests. |
| DOM test environment | jsdom | `^29.1.1` | Retain for component and semantic contract tests. |
| Component test utilities | Testing Library React and jest-dom | `^16.3.2`, `^6.9.1` | Retain; query semantic roles and names first. |
| Lint | ESLint and TypeScript ESLint | `^9.39.2`, `^8.51.0` | Retain current flat configuration and add only approved scoped rules/checks. |
| Styling | CSS Modules and CSS custom properties | Browser-native | Select for all new foundation and later domain styles. |
| Markup | Native semantic HTML | Browser-native | Select over framework primitives when native behavior is sufficient. |
| Graphics | Inline semantic SVG plus HTML list/table alternatives | Browser-native | Select for informational and decorative visualization contracts. |
| Assets | Vite static asset URLs and typed publication manifest | Build-time local | Select; full evidence remains on demand. |
| Content derivation | Pure TypeScript modules | Local deterministic | Select; no runtime data service or persistence. |
| Hosting | Existing GitHub Pages workflow | Unchanged | Retain; no Infrastructure Design. |

The Code Generation summary records exact installed versions from the lockfile and runtime environment. This document records declared constraints and policy, not an instruction to upgrade.

## TS-001 - React and Component Model

### Decision

Retain React 19 and React DOM for composition. New components use function components, typed immutable props, native controls, and explicit lazy boundaries only where approved.

### Rationale

- The application is already React-based and the redesign does not require a framework migration.
- React supports the approved continuous page, lazy journal detail, semantic SVG, and test seams.
- Retention avoids unrelated migration risk while every visible component is replaced.

### Constraints

- U-01 does not render the new visible shell or switch the entry.
- Model and validation modules cannot import React.
- Components cannot become factual sources or reshape canonical data during rendering.
- New active portfolio code cannot import rejected presentation components.

### Rejected Alternatives

- A new web framework would expand scope without solving a U-01 requirement.
- Multiple independently deployed frontends conflict with the approved single artifact.

## TS-002 - TypeScript and Contract Strictness

### Decision

Retain TypeScript with the repository's strict compiler configuration, including `strict`, unused checks, bundler resolution, side-effect import checks, and no emit from the application compiler.

### Rationale

- Branded IDs, discriminated record states, read-only collections, and deterministic findings benefit from compile-time constraints.
- Stable types support six downstream units and make invalid relationships harder to express.

### Constraints

- Public foundation contracts use explicit exported types.
- Unsafe escape hatches, unexplained type suppression, and implicit mutable outputs block the maintainability gate.
- TypeScript types supplement rather than replace runtime/build-time validation of content and assets.

## TS-003 - Vite and Static Delivery

### Decision

Retain Vite and the existing `VITE_BASE_PATH`-compatible static build.

### Rationale

- The target remains GitHub Pages with no server route.
- Vite provides static asset URLs, code splitting, and measurable emitted artifacts.

### Constraints

- U-01 records a reproducible baseline before changing the active entry.
- Full evidence and raw archives cannot enter the initial import graph.
- The journal detail becomes a lazy chunk only in its owning unit.
- No service worker, server-rendering layer, or remote asset processor is introduced.

## TS-004 - Styling System

### Decision

Use global semantic CSS custom-property tokens plus focused CSS Modules. Native media features handle reduced motion and responsive foundations.

### Rationale

- The approach supports distinct domain compositions without global selector coupling.
- Semantic tokens allow one light/dark system without component render branching.
- CSS Modules make ownership and prohibited cross-domain selectors testable.

### Constraints

- Global styles own tokens and safe document defaults only.
- Component geometry stays in the owning unit's CSS Module.
- No routine `!important`, rejected selectors, Tailwind utility composition, or Chakra style props appear in the new boundary.
- Remote fonts are not required for usable hierarchy.

### Rejected Alternatives

- Extending the current `business.css` stack violates the approved maintainability boundary.
- A generic component theme or utility framework would weaken unique local composition and add active bundle surface.

## TS-005 - Native HTML and SVG

### Decision

Use native semantic elements and inline SVG where they directly express the approved interaction or visualization.

### Rationale

- Native anchors, buttons, sections, headings, lists, and tables provide robust semantics with less runtime code.
- Inline SVG supports accessible titles/descriptions and verified relationship graphics without a visualization dependency.

### Constraints

- An informational SVG requires a semantic list/table alternative derived from the same model.
- A decorative SVG contains no unique meaning and is excluded from the accessibility tree.
- Native behavior is not replaced by custom interaction unless a later approved design demonstrates necessity and equivalent accessibility.

## TS-006 - Testing Stack

### Decision

Retain Vitest, jsdom, Testing Library React, and jest-dom. Use example-based deterministic tests because the Property-Based Testing extension is disabled.

### Test Responsibilities

- Pure unit tests for content normalization, IDs, relationships, evidence resolution, finding aggregation, and visualization models.
- Repeat-run tests for stable finding order.
- Component contract tests using roles, names, headings, list/table semantics, and limited purpose-based test IDs.
- Static source-boundary and prohibited-selector checks.
- Build artifact and manifest inspection through approved local scripts or test helpers.

### Constraints

- Tests cannot depend on generated CSS Module names or decorative DOM depth.
- Automated checks do not replace manual keyboard, focus, contrast, zoom, reflow, and semantic review.
- Adding a new accessibility or bundle-analysis package requires explicit Code Generation plan approval and must not add runtime weight.

## TS-007 - Evidence and Asset Publication

### Decision

Use a typed local manifest as the only publication allowlist. Vite-resolved optimized derivatives may be referenced by the model boundary; full evidence is opened only after visitor action.

### Rationale

- The repository already contains curated and large raw source materials that must not all ship.
- Explicit records provide provenance, accessibility context, and predictable loading.

### Constraints

- Domain components do not enumerate directories or construct asset paths.
- Preview generation is build-time and local; U-01 introduces no runtime image service.
- The Code Generation plan names exact asset transformations and never modifies source evidence in place.

## TS-008 - Local Validation and Measurement

### Decision

Implement validation and measurement as deterministic local TypeScript or narrowly scoped build/test scripts using the existing Node.js environment. Exact implementation is deferred to the Code Generation plan.

### Rationale

- Content integrity, manifest checks, import boundaries, and byte measurements need automation but no runtime service.
- Reusing the current toolchain keeps logic testable and avoids shipped code.

### Constraints

- Do not add a general-purpose script runtime dependency when Node.js and the existing test/build stack suffice.
- Build-time filesystem access is isolated from browser modules.
- Output includes stable rule codes and exact byte counts.

## Existing Dependencies During Migration

| Existing dependency or plugin | New active portfolio policy | Cleanup policy |
| --- | --- | --- |
| `@chakra-ui/react`, `@chakra-ui/icons`, Emotion | Prohibited in the new active boundary | Remain only while the rejected recoverable tree needs them; removal requires proof of no active imports and an approved later plan. |
| Tailwind CSS and Vite plugin | No utilities in the new boundary | Plugin/dependency removal is deferred until no approved path needs it and exact config edits are approved. |
| `next-themes` | Do not use in the new boundary; later theme logic uses the approved focused controller | Remove only after active import analysis and approval. |
| `react-icons` | Avoid in new semantic controls when local/native SVG is sufficient | Remove only when proven unused. |
| `react-markdown` | Reserved for the lazy local journal unit if its approved design retains it | Keep outside the initial bundle; decision finalized in U-07. |

Temporary installation is not architectural endorsement. No U-01 source module may import dependencies marked prohibited for the new boundary.

## Version and Upgrade Policy

- `package-lock.json` is authoritative for reproducible installed versions.
- U-01 does not perform framework, toolchain, or dependency upgrades unless its Code Generation plan names the exact change and necessity.
- Declared major-version movement requires compatibility review, focused tests, production build evidence, and explicit approval.
- The final browser matrix uses versions current at verification time and records exact tested versions.
- Dependency audit findings are recorded; remediation cannot silently broaden scope or change packages.

## Browser Capability Policy

- Baseline functionality targets the latest two stable major versions of Chrome, Edge, Firefox, and Safari, plus current iOS Safari and Android Chrome.
- CSS and SVG features must be supported by the target matrix or have a meaning-preserving fallback.
- System fonts are the usable fallback.
- Storage is not required by U-01.
- Later `IntersectionObserver` behavior requires a safe owning-unit fallback.
- Internet Explorer is not supported.

## Decision Traceability

| Decision | NFRs supported |
| --- | --- |
| Retain React/TypeScript/Vite | U01-NFR-MNT-001, U01-NFR-CMP-001 |
| Native semantic HTML/SVG | U01-NFR-USE-001, U01-NFR-PER-001 |
| CSS Modules and semantic tokens | U01-NFR-PER-002, U01-NFR-MNT-001, U01-NFR-USE-001 |
| Typed publication manifest | U01-NFR-SCL-001, U01-NFR-PER-003, U01-NFR-SEC-001, U01-NFR-REL-001 |
| Existing focused test stack | U01-NFR-REL-001, U01-NFR-MNT-001, U01-NFR-EVD-001 |
| No new runtime service or UI framework | U01-NFR-PER-001, U01-NFR-SEC-001, U01-NFR-MNT-001 |
| Lockfile and controlled upgrades | U01-NFR-REL-001, U01-NFR-CMP-001, U01-NFR-EVD-001 |

## Extension Compliance

- **Security Baseline**: Skipped because it is disabled; the approved product-specific static privacy boundary remains enforced.
- **Property-Based Testing**: Skipped because it is disabled; deterministic example-based tests are selected.
