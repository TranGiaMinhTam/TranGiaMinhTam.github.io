# NFR Requirements - U-03 Identity and Questions

## Scope and Acceptance Semantics

These requirements apply to the Research Identity and Questions I Explore view models, components, relationship visualization, semantic alternative, published portrait and academic-record actions, and the two-body shell integration. `P0` requirements block U-03 acceptance when unmet. `P1` requirements require recorded evidence and an explicit disposition when the local environment cannot perform a target-browser measurement. U-01 and U-02 requirements remain inherited and cannot be weakened.

## NFR Summary

| ID | Category | Priority | Measurable target |
| --- | --- | --- | --- |
| U03-NFR-SCL-001 | Scalability | P1 | Process at least six questions and twelve relationships with linear derivation and unchanged architecture. |
| U03-NFR-PER-001 | JavaScript | P0 | Complete active initial JavaScript is at most 250 KiB, or 256,000 bytes. |
| U03-NFR-PER-002 | CSS | P0 | Complete active initial CSS is at most 24 KiB, or 24,576 bytes. |
| U03-NFR-PER-003 | Asset loading | P0 | Portrait transfer is at most 77,650 bytes; the 6,817,646-byte transcript is absent from initial network fetches. |
| U03-NFR-PER-004 | Rendered experience | P1 | Local mobile-profile LCP is at most 2.5 s, CLS at most 0.10, and interaction response at most 200 ms. |
| U03-NFR-AVL-001 | Availability | P0 | Core text, relationships, and native actions remain usable when each optional visual or enhancement fails independently. |
| U03-NFR-SEC-001 | Static security | P0 | Only manifest-owned same-origin assets and registered section targets are accepted; no new sensitive runtime surface. |
| U03-NFR-REL-001 | Content integrity | P0 | Required verified data fails closed; no fabricated fallback or silent omission. |
| U03-NFR-REL-002 | Relationship equivalence | P0 | Visual and semantic relationship identifiers are exactly equal, with no duplicates or broken endpoints. |
| U03-NFR-MNT-001 | Quality gate | P0 | Strict types, lint, focused/full tests, build, boundaries, deterministic fixtures, and ownership checks pass. |
| U03-NFR-MNT-002 | Ownership | P0 | Only `identity` and `questions` bodies change; shell controllers and eight later bodies remain unchanged. |
| U03-NFR-USE-001 | Accessibility | P0 | Applicable WCAG 2.2 AA identity, action, relationship, focus, contrast, motion, zoom, and reflow checks pass. |
| U03-NFR-USE-002 | Responsive usability | P0 | Four review widths in both themes have no page overflow, overlap, clipping, hidden meaning, or inaccessible action. |
| U03-NFR-CMP-001 | Browser compatibility | P1 | Latest two stable desktop evergreen majors plus current iOS Safari and Android Chrome are targeted. |
| U03-NFR-UNI-001 | Visual uniqueness | P0 | Required custom compositions are present and prohibited original/rejected patterns are absent. |
| U03-NFR-EVD-001 | Review evidence | P0 | Exact versions, commands, measurements, results, matrix review, warning dispositions, and changed scope are recorded. |

## Scalability Requirements

### U03-NFR-SCL-001 - Bounded Question Growth

- Pure selection, domain mapping, relationship creation, visualization-value creation, and semantic-row creation must accept a fixture with at least six questions and twelve relationships without schema or component changes.
- Processing remains linear in the number of questions plus relationships. Identifier resolution uses keyed lookup rather than nested search inside render loops.
- The constellation and semantic alternative derive from one immutable relationship collection; growth cannot introduce a second handwritten mapping.
- Source order remains stable, relationship identifiers remain deterministic, and no new global controller or store is introduced.
- This test capacity validates design headroom and does not authorize publishing unverified questions.

**Acceptance method**: doubled-volume fixtures, deterministic repeat-run equality, endpoint validation, relationship-set equality, and source inspection.

## Performance Requirements

### U03-NFR-PER-001 - JavaScript Headroom

- After U-03 activation, all minified JavaScript reachable from the initial Vite entry must total no more than 256,000 bytes.
- The measurement includes React, U-01 foundation, U-02 shell, U-03 selectors, view-model assembly, identity, questions, and eager dependencies.
- The inherited U-02 maximum of 307,200 bytes and applicable 10-percent comparable-baseline regression rule remain additional gates.
- No charting, animation, state-management, image, or UI dependency may be added.

**Acceptance method**: production Vite manifest traversal with exact emitted bytes and deterministic gzip as supplemental evidence.

### U03-NFR-PER-002 - CSS Headroom

- Initial CSS must total no more than 24,576 bytes after U-03 activation.
- Identity, portrait, spectrum, question ledger, constellation, relationship alternative, and responsive rules use locally owned CSS Modules and existing semantic tokens.
- The inherited U-02 maximum of 51,200 bytes remains an absolute ceiling.
- No rejected global stylesheet, Chakra styling runtime, Tailwind utility composition, duplicate theme tree, or generic card layer may enter the active graph.

**Acceptance method**: exact emitted CSS bytes, manifest inspection, active style-boundary checks, and selector review.

### U03-NFR-PER-003 - Portrait and Transcript Delivery

- The first-viewport portrait transfer must not exceed the verified source size of 77,650 bytes.
- The image reserves its aspect-ratio space before decoding, declares intrinsic dimensions, and uses asynchronous decoding to avoid layout shifts and main-thread blocking.
- The portrait remains eligible for first-viewport loading; implementation must not force delayed visibility that harms LCP.
- The 6,817,646-byte academic transcript may exist in the deployed artifact but must not be fetched during initial navigation. It is requested only after the visitor activates the academic-record link.
- No raw source archive or unrelated evidence enters the initial request graph.

**Acceptance method**: source and emitted asset byte checks, DOM attribute assertions, production manifest review, and a cold initial-load network request inventory.

### U03-NFR-PER-004 - Rendered Experience

- Under a documented repeatable local mobile-profile run, Largest Contentful Paint targets at most 2.5 seconds and Cumulative Layout Shift targets at most 0.10.
- Activating the questions action or applying relationship emphasis targets a response within 200 ms.
- Measurements record browser and version, machine, viewport, throttling profile, warm/cold cache state, sample count, and aggregation method.
- If the available environment cannot run a required browser measurement, structural safeguards and any available measurement still run; the limitation is recorded as P1 and cannot be represented as a pass.

**Acceptance method**: available browser performance capture plus deterministic tests for immediate state and reserved media geometry.

## Availability Requirements

### U03-NFR-AVL-001 - Progressive Content Availability

The following independent failures cannot remove the complete text identity, verified questions, semantic relationship mapping, or native actions:

- portrait request or decode failure;
- SVG styling or optional emphasis failure;
- enhanced shell navigation failure;
- unavailable reduced-motion query;
- unsupported download enhancement.

The native `#questions` anchor and academic-record URL remain operable. Missing required verified records are validation failures before accepted rendering, not availability fallbacks. No failure may yield an empty registered section or uncaught rendering error.

**Acceptance method**: injected image-error rendering, enhancement-absence fixtures, semantic DOM assertions, native anchor inspection, and required-data failure matrices.

## Product Security and Privacy Requirements

The optional Security Baseline extension remains disabled. These controls come from the approved static-site boundary.

### U03-NFR-SEC-001 - Asset, Markup, and Target Boundary

- Portrait and transcript URLs resolve only from the U-01 published evidence manifest and must remain same-origin build assets.
- The questions action accepts only the registered `questions` target.
- U-03 adds no runtime network client, tracking, analytics, secret, authentication, authorization, personal-data persistence, service worker, unsafe HTML, arbitrary DOM selector construction, dynamic code execution, or active SVG script.
- Verified strings render as text content and SVG labels; they are never interpolated into HTML markup, executable attributes, or arbitrary URLs.
- The deployable inventory confirms the intended portrait and academic transcript paths and rejects raw evidence or unrelated private material.

**Acceptance method**: source/import and unsafe-pattern scans, manifest resolution tests, build inventory, runtime request review, and unchanged dependency/lockfile evidence.

## Reliability and Integrity Requirements

### U03-NFR-REL-001 - Fail-Closed Verified Assembly

Blocking findings must be deterministic for:

- zero or multiple identity records;
- missing or unpublished academic transcript;
- an absent or empty verified question;
- an unknown approved-domain mapping input;
- a relationship with an unknown question or coordinate endpoint;
- a duplicate relationship identifier.

The accepted view contains exactly one identity and the three approved questions in stable order. Findings never invent or substitute biography, research questions, disciplines, evidence, results, or credentials.

**Acceptance method**: table-driven malformed fixtures, stable finding-code and order assertions, repeat-run equality, and content snapshot comparison against U-01 records.

### U03-NFR-REL-002 - Visual and Semantic Equivalence

- The normalized set of question-coordinate relationship identifiers represented in the SVG must exactly equal the set exposed through the semantic relationship rows.
- Every endpoint resolves, every question has at least one coordinate, and duplicates are rejected.
- Hover and focus alter emphasis only; removing all styling still leaves the complete semantic mapping.
- Re-rendering identical data produces identical relationship identifiers, ordering, and accessible content.

**Acceptance method**: set-equality assertions, duplicate and broken-endpoint tests, repeated-render tests, stylesheet-disabled review, and semantic queries.

## Maintainability Requirements

### U03-NFR-MNT-001 - Automated Quality Gate

Before acceptance, all of these must pass:

- strict TypeScript project build and unused-code checks;
- ESLint with no new warning;
- focused selector, domain-mapper, relationship, component, action, failure, and resolver tests;
- full test-suite regression;
- production build and exact manifest measurement;
- prohibited-import, raw-evidence, unsafe-pattern, and ownership boundary checks;
- deterministic fixture and repeated-run assertions;
- accessible role, name, heading, list/table, link, and alternative-content assertions.

No test may depend on hashed CSS Module names, decorative DOM depth, pixel screenshots alone, or duplicated verified strings as an alternate content source.

### U03-NFR-MNT-002 - Unit Ownership

- U-03 owns a focused `src/portfolio/identity/` boundary and may add only the smallest typed shell-seam integration required by the approved design.
- It replaces only the `identity` and `questions` registered bodies.
- U-02 retains section order, shell headings, navigation, progress, theme, focus transfer, history, observation, and temporary fallback ownership.
- The eight later-domain bodies remain temporary and verifiably unchanged.
- U-03 source cannot import legacy `src/data` directly, rejected templates, Chakra, Tailwind presentation, or later-domain modules.

**Acceptance method**: exact changed-file allowlist, import graph, resolver fixture covering all ten slots, shell regression tests, and source ownership inspection.

## Usability and Accessibility Requirements

### U03-NFR-USE-001 - WCAG 2.2 AA Acceptance

Applicable automated and manual evidence must cover:

- one logical heading and reading order for each registered section;
- accurate portrait alternative text without redundant adjacent narration;
- truthful, purpose-specific accessible names for both actions;
- native keyboard operation and visible, unobscured focus for links and emphasized relationship entries;
- at least 4.5:1 contrast for normal text and 3:1 for large text, focus indicators, controls, and meaningful graphic elements;
- relationship cues using labels, line/marker treatment, and spatial connection in addition to color;
- exact information equivalence between the constellation and semantic list/table;
- no information gated by hover, focus, motion, SVG availability, or portrait rendering;
- minimum 24-by-24 CSS-pixel pointer targets or sufficient spacing under the applicable WCAG exception;
- reduced-motion behavior, 200-percent zoom, text spacing, and 320-CSS-pixel reflow in both themes.

**Acceptance method**: semantic component tests, relationship-set comparison, keyboard walkthrough, focus and contrast inspection, reduced-motion review, zoom/text-spacing check, and narrow reflow review.

### U03-NFR-USE-002 - Responsive Editorial Usability

- Review widths are 320, 768, 1280, and 1440 CSS pixels in light and dark themes.
- Identity transforms from wide asymmetry to one coherent mobile reading sequence without centering into a conventional profile card.
- Actions wrap within their local region and remain fully visible and operable.
- The question ledger remains continuous rather than tiled; constellation labels and paths do not collide beyond comprehension.
- The semantic relationship alternative remains vertically readable and complete at the narrowest width.
- No document-level horizontal overflow, overlap, clipped focus, obscured sticky target, or hidden relationship is allowed.

**Acceptance method**: eight-state structured visual matrix plus keyboard, zoom, and overflow checks.

## Compatibility Requirements

### U03-NFR-CMP-001 - Target Browser Policy

- Target the latest two stable major releases available at verification time for Chrome, Edge, Firefox, and Safari, plus current iOS Safari and Android Chrome.
- Record exact locally available browser and operating-system versions rather than asserting unexecuted coverage.
- Native HTML and SVG remain the functional baseline. Unsupported optional styling or enhancement must preserve semantic content and anchors.
- No browser-specific markup tree or separate mobile component tree is permitted.

**Acceptance method**: available cross-browser review, compatibility-oriented source inspection, capability failure tests, and explicit P1 disposition for unavailable targets.

## Visual Uniqueness Requirements

### U03-NFR-UNI-001 - Custom Component Acceptance

The rendered review must show all of these:

- asymmetric specimen-field identity composition;
- oversized identity typography and horizontal metadata sequence on wide layouts;
- microscopy-inspired editorial portrait aperture;
- labelled typographic `Fields in exploration` spectrum;
- non-card continuous question ledger;
- labelled question-discipline constellation;
- complete adjacent semantic relationship alternative;
- local action wrapping and intentional mobile reading sequence.

A centered hero, generic circular avatar, sidebar, drawer, layout selector, repeated generic-card grid, duplicated section panel, clipped relationship view, or palette-only reskin is blocking. The eight later slots must remain unchanged so U-03 does not disguise unauthorized scope expansion.

**Acceptance method**: structured phone and desktop review in both themes, prohibited-pattern checklist, DOM/source boundary inspection, and explicit candidate approval during Code Generation.

## Review Evidence Requirements

### U03-NFR-EVD-001 - Reproducible Acceptance Package

The U-03 Code Generation plan must require:

- exact changed-file scope and unchanged lockfile/dependency inventory;
- focused and full test output, lint, strict type check, and production build;
- entry-manifest JavaScript, CSS, portrait, transcript, and initial-request measurements;
- relationship equivalence, required-data failure, unsafe-pattern, raw-evidence, and ten-slot ownership results;
- four-width, two-theme rendered review with keyboard, focus, zoom, reduced motion, overflow, and uniqueness observations;
- available browser versions, performance profile, warnings, unavailable-target dispositions, and recovery status;
- a separate explicit rendered-candidate approval before U-03 is treated as complete.

**Acceptance method**: machine-readable measurements where practical, Markdown review summary, exact commands and versions, and completed plan checkboxes.

## Traceability

| Approved concern | NFR coverage |
| --- | --- |
| ST-001 / FR-004 Research Identity | Asset loading, availability, verified assembly, accessibility, responsive usability, and custom identity acceptance |
| ST-004 / FR-005 Questions I Explore | Growth, fail-closed question validation, responsive question ledger, and browser-compatible semantics |
| ST-014 / FR-013 Scientific relationships | Exact visual/semantic equivalence, non-color cues, SVG security, relationship reliability, and accessible alternative |
| FR-017 publication intent | Manifest-owned transcript, truthful native action, on-demand loading, deployable inventory, and same-origin boundary |
| Inherited performance safeguards | Cumulative JavaScript/CSS checkpoints, portrait size, initial-request inventory, LCP, CLS, and interaction targets |
| Inherited maintainability and resilience | Strict quality gate, typed ownership, deterministic failures, native fallbacks, unchanged shell controllers, and review evidence |

## Extension Compliance

- Security Baseline: disabled and not loaded; U03-NFR-SEC-001 still enforces the approved product-specific static boundary.
- Property-Based Testing: disabled and not loaded; table-driven malformed fixtures, doubled-volume cases, and deterministic repeat runs remain required.
