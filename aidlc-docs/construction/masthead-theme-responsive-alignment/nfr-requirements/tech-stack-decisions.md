# Technology Stack Decisions - U-02 Masthead, Theme, and Responsive Alignment

## Decision Summary

U-02 retains the existing React 19, strict TypeScript, Vite, CSS Modules, semantic HTML, Vitest, Testing Library, and `fast-check` stack. It adds no runtime dependency, backend, browser service, telemetry, external font, or runtime request. Rendered review uses capability-detected local browser automation or an equivalent deterministic local process; any new development dependency requires separate Code Generation approval.

## TS-001 - React and Controlled Shell Composition

### Decision

Retain the current React component tree and controlled `PortfolioExperience` theme owner. Extend `SpecimenMasthead` through typed props and callbacks rather than adding context, a state library, or a parallel shell.

### Rationale

- Preserves approved navigation, progress, Journal, contact, and section composition.
- Keeps theme behavior testable and prevents split state.
- Matches the Functional Design's single semantic order across layouts.

### Constraints

- No new global state library.
- No viewport-specific component duplication.
- No raw U-01 path or unreviewed source import.
- Optional resume action accepts only the validated U-01 capability.

## TS-002 - Semantic HTML and Shared Hidden Summary

### Decision

Use one typed `SemanticSummary` component backed by a pure projector. Render relationships and sequences as labelled lists and counts as a labelled description list inside the existing robust visually-hidden primitive.

### Rationale

- Preserves meaning without visible table duplication.
- Prevents each domain from inventing its own inaccessible hiding pattern.
- Enables exact membership/order properties and DOM assertions.

### Constraints

- No `display: none`, `visibility: hidden`, zero-size text, or large off-screen positioning.
- No visual `<table>` replacement.
- No relationship inference inside React.
- Invalid input fails before rendering.

### Rejected Alternatives

- Collapsible visible tables: conflicts with the approved removal request.
- ARIA-only prose assembled in JSX: harder to validate and easy to drift from reviewed rows.
- Deleting the summary: violates NFR-004 and US-008.

## TS-003 - CSS Modules and Semantic Tokens

### Decision

Retain CSS Modules for domain ownership and existing shared token files for cross-domain spacing, measures, action size, and decorative opacity. Use bounded CSS Grid/Flexbox, `minmax(0, ...)`, logical properties, and progressive enhancement.

### Rationale

- Matches the feature-first architecture.
- Fixes geometry without runtime viewport logic.
- Keeps domain visual identity while centralizing only truly shared decisions.

### Constraints

- Primary content cannot depend on absolute positioning or fixed heights.
- No manual screenshot-specific line breaks.
- No routine `!important`.
- Navigation is the only approved local horizontal scrolling region.
- Base styles precede optional `color-mix`, backdrop, balance, and motion enhancements.

### Rejected Alternatives

- CSS-in-JS dependency: unnecessary runtime and bundle cost.
- Tailwind/component framework reintroduction: conflicts with existing shell boundaries.
- One global domain stylesheet: weak ownership and regression isolation.

## TS-004 - Theme Implementation

### Decision

Retain the existing root `data-theme` attribute, `ThemeState`, hook/controller, and local preference behavior. Move only the control's rendering into the masthead action cluster and change its label to the next action.

### Rationale

- Meets FR-002 and FR-003 without behavior migration.
- Preserves deterministic fallback and current tests.
- Avoids duplicate theme trees or hydration-sensitive membership.

### Constraints

- Toggle callback fires exactly once per activation.
- Storage failure does not block the in-session change.
- Iconography is supplemental and hidden from assistive technology.
- Both themes preserve identical content and action order.

## TS-005 - Accessibility Verification

### Decision

Use layered evidence:

- semantic and component tests with Testing Library;
- existing/focused contrast, token, and CSS contract checks;
- automated accessibility analysis only where already available or separately approved;
- deterministic keyboard and focus tests;
- local rendered review for viewport, theme, zoom, spacing, reduced motion, and forced colors.

### Rationale

No single scanner can verify layout, focus visibility, relationship equivalence, zoom, or reading order. Layered evidence directly maps to NFR-001 and the approved matrix.

### Dependency Policy

No accessibility or browser package is installed during NFR Requirements/NFR Design. The Code Generation plan must first probe current local/browser capabilities. A proposed dev dependency must come from the official registry, be exact/locked, receive license/vulnerability/Node review, and be explicitly approved.

## TS-006 - Rendered Review Approach

### Decision

Use a deterministic local candidate build and capability-detected browser automation, or an equivalent local browser capture process, to record the required 80 base viewport/theme cases plus zoom/text-spacing/accessibility-preference cases.

### Required Evidence

- browser engine and version;
- exact viewport, theme, route/hash, zoom, spacing, and preference state;
- named component/section under review;
- overflow, overlap, clipping, focus, and logical-order result;
- screenshot only when it materially supports the finding;
- no private values, absolute user paths, or raw source filenames.

### Rejected Alternatives

- Third-party visual-regression SaaS: violates local-only/privacy and adds an external dependency.
- Pixel snapshots as the sole gate: brittle and insufficient for semantics/accessibility.
- Manual ad hoc screenshots without state metadata: not reproducible.

## TS-007 - Property-Based Testing

### Decision

Reuse exact `fast-check` 4.10.2 with Vitest and the U-01 reproducibility conventions. Add U-02-specific constrained generators for semantic sources and bounded layout constraints.

### Configuration

- At least 100 cases per applicable property by default.
- Shrinking enabled.
- Fixed CI seed or captured failure seed and replay path.
- No retry wrapper.
- Reference projector/threshold oracle for U02-P01 through U02-P08 where applicable.
- Concrete DOM, accessibility, storage, and style examples remain separate.

### PBT-06 Decision

Stateful model testing is N/A because U-02's business transformations are immutable. Theme controller DOM/storage behavior remains deterministic example/integration coverage.

## TS-008 - Performance Measurement

### Decision

Reuse Vite production manifests and current portfolio measurement tooling for before/candidate/active initial JS/CSS bytes and chunk attribution. Add rendered CLS/interaction evidence through the selected local browser capability.

### Budgets

- No runtime dependency or request.
- Target no more than 8 KiB uncompressed initial JS growth.
- Target no more than 12 KiB uncompressed initial CSS growth.
- Candidate CLS no more than 0.1.
- No unexpected U-02 interaction shift above 0.01.
- Any exceedance requires measured explanation and explicit approval before activation.

## TS-009 - Browser and CSS Compatibility

### Decision

Support current stable Chromium, Firefox, and Safari engines, including representative iOS Safari. Use standards-based semantic HTML, CSS Grid/Flexbox, logical properties, and feature-safe enhancement fallbacks.

### Constraints

- No user-agent sniffing.
- No browser-specific content/component tree.
- Unsupported decoration falls back to readable base tokens.
- Forced colors and reduced motion are explicit review modes.
- Node 20 remains the CI reference even when local development uses a newer Node version.

## TS-010 - Recovery and Candidate Isolation

### Decision

Reuse the repository-local recovery/evidence pattern and existing isolated candidate-build conventions. Capture U-02 target hashes/content before mutation; do not change the active entry until candidate approval.

### Constraints

- Restore within 30 minutes in a compatible checkout.
- Rehearse restoration away from active files.
- Activation is atomic and separately approved.
- Any failed gate retains the current presentation.
- No Git reset, destructive cleanup, or reliance on editor undo.

## TS-011 - Security and Privacy

### Decision

U-02 adds no authentication, API, server, analytics, telemetry, or external data source. It consumes U-01 typed capabilities and repeats privacy/source/bundle verification after candidate build and activation.

### Misuse Cases

- Malicious or control-character labels must render only as text and cannot become markup/URLs.
- A raw or invalid resume/media string cannot become an action.
- Broken semantic endpoints cannot disappear as an empty summary.
- A candidate cannot bypass recovery, privacy, accessibility, or rendered-review gates.
- Storage failure cannot reveal payload/internal diagnostics.

## TS-012 - Documentation and Evidence Format

### Decision

Use Markdown for human instructions and canonical JSON for machine measurements/findings. Store timestamps in run evidence rather than deterministic content. Use repository-relative safe targets.

### Constraints

- No private marker, absolute user path, stack trace, or unreviewed source filename.
- Stable schema/version for machine evidence.
- Commands and replay steps are explicit.
- Rendered cases use deterministic identifiers.

## Security Baseline Compliance

- **SECURITY-09**: Compliant through generic failures, supported stack, and no sample/unused runtime surface.
- **SECURITY-10**: Compliant through no new runtime dependency, existing lockfile, official-registry policy, measurement/CI gates, and U-06 audit/SBOM ownership.
- **SECURITY-11**: Compliant through separated capability/projection/layout ownership, layered validation, and explicit misuse cases. Rate limiting is N/A because no API exists.
- **SECURITY-13**: Compliant through typed U-01 capabilities, production manifest verification, and no external CDN/runtime resource.
- **SECURITY-15**: Compliant through safe storage/CSS degradation, typed blocking findings, candidate retention, and recovery.
- **SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, SECURITY-14**: N/A to U-02 for the reasons documented in the NFR requirements.
- **SECURITY-04**: Deferred to U-06 Infrastructure Design.
- **Blocking findings**: None.

## PBT Compliance

- PBT-01 is satisfied by the ten approved U-02 properties.
- PBT-03 through PBT-05 and PBT-07 through PBT-10 are fully incorporated.
- PBT-02 is conditional on a new codec; it must be implemented if one appears, otherwise marked N/A in Code Generation.
- PBT-06 is N/A for the immutable business core.
- PBT-09 remains satisfied by the approved exact framework version.
- No property test replaces concrete DOM, accessibility, storage, CSS, browser, or rendered review.
- **Blocking findings**: None.
