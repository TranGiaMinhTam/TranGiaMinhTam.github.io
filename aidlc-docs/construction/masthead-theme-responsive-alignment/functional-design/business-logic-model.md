# U-02 Business Logic Model

## Purpose and Boundary

U-02 changes presentation and interaction geometry without changing verified portfolio facts, section order, theme-state ownership, archive membership, or resume content. It owns the masthead presentation model, top action arrangement, semantic-summary projection, responsive alignment selection, and the review gate for visible activation.

The unit consumes only validated inputs:

- existing `ThemeState` and toggle callback from `PortfolioExperience`;
- stable identity and status labels already used by the shell;
- the U-01 `DownloadableResume` capability when a composition owner supplies it;
- existing reviewed relationship, count, or sequence rows from domain models;
- ten stable section identifiers and current body registries.

It produces no new biographical, scientific, academic, or evidence claim.

## Masthead Composition Flow

1. The composition owner supplies identity, field label, active status, theme state, toggle callback, and an optional validated resume action.
2. `buildMastheadPresentation` validates non-empty public labels and accepts only the typed local resume capability.
3. The result fixes semantic order as identity, scientific context/status, then actions.
4. `SpecimenMasthead` renders one header landmark. Decorative grid/specimen marks are excluded from the accessibility tree.
5. The action cluster renders the theme action first. A resume action renders only when the validated capability is present; its absence never leaves a dead button or empty focus stop.
6. CSS changes visual placement at supported widths without changing the semantic or focus order.

Conceptual signature:

```ts
type MastheadPresentationResult =
  | Readonly<{ ok: true; value: MastheadPresentation }>
  | Readonly<{ ok: false; findings: readonly MastheadFinding[] }>;

function buildMastheadPresentation(
  identity: MastheadIdentity,
  actions: MastheadActions,
): MastheadPresentationResult;
```

## Theme Interaction Flow

1. The view derives `nextTheme` from the controlled current theme.
2. The button's accessible name and visible label describe the next action, not an ambiguous icon state.
3. Activation calls the existing `onToggleTheme` callback exactly once.
4. Existing controller logic remains responsible for the root `data-theme` attribute and explicit local preference.
5. Storage failure remains non-blocking: the active document theme changes even if persistence fails.
6. U-02 adds no alternative theme state, storage key, or parallel component tree.

## Semantic Summary Projection

`projectSemanticSummary` receives one already-reviewed domain semantic source. Supported kinds are relationships, counts, and sequences.

Projection rules:

1. Validate the summary label and every required entry label.
2. Preserve entry membership and relative order exactly.
3. For relationships, require unique relationship identifiers and already-resolved endpoints.
4. For counts, require stable identifiers and finite non-negative integer values.
5. For sequences, require stable identifiers and deterministic positive order.
6. Return `empty` for an intentionally empty reviewed source.
7. Return blocking findings for malformed, duplicate, unresolved, or partially labelled input.
8. Never derive a relationship, count, title, or conclusion from visual position, filenames, colors, or CSS.

The React component renders the successful model as a labelled hidden list or description group. It does not render a table, consume layout space, permit horizontal scrolling, or duplicate the complete summary visually.

## Responsive Alignment Selection

U-02 defines three semantic layout variants rather than device-specific content trees:

- `compact`: one logical column for constrained width, zoom, or increased text spacing;
- `intermediate`: bounded two-column arrangements where labels and content fit without compression;
- `expanded`: aligned grid lines and deliberate whitespace for wide viewports.

`selectLayoutVariant` is deterministic and monotonic for an ordered set of available inline sizes. Increasing available space may retain or advance a variant; it cannot move from an expanded variant to compact without a decrease in available space or a stronger accessibility constraint.

```ts
function selectLayoutVariant(
  input: Readonly<{
    availableInlineSize: number;
    textSpacingEnhanced: boolean;
    zoomConstraint: boolean;
  }>,
): LayoutVariant;
```

CSS container/media rules implement the selected behavior. JavaScript does not read viewport width to duplicate CSS responsibility. The pure selector exists to define review expectations and any component behavior that must be shared with tests; layout itself remains CSS-driven.

## Six Defect Correction Model

All affected components preserve one source order and use explicit bounded grids:

- **Laboratory station flow**: station number, method title, and supporting content align to shared internal tracks; the prototype boundary remains visually distinct without fixed card heights.
- **Computational project header**: eyebrow, research question, summary, and contribution note share one bounded content column instead of drifting across independent offsets.
- **Research-question introduction**: the introductory label, primary statement, and context note form a stable reading sequence with bounded measures.
- **Data-story signal sheet**: index, label, and signal indicator align on wide screens and stack in the same DOM order when constrained.
- **Academic header**: heading and supporting explanation align to shared shell tracks and collapse without a large empty middle region.
- **Evidence spectrum**: visual bars and semantic counts share identifiers and order; labels and counts align without fixed widths that clip at zoom.

The common rule is structural, not visual uniformity. Each domain keeps its distinct treatment while using `minmax(0, ...)`, bounded measures, shared gaps, and no absolute placement for primary content.

## Heading and Label Wrapping

The wording remains unchanged. The presentation may apply balanced wrapping when supported, but natural wrapping is the fallback. Headings receive content-appropriate maximum measures; labels receive bounded tracks that can wrap. Manual line breaks tied to one screenshot are prohibited. Font size cannot be reduced below the established accessible scale merely to avoid a wrap.

## Safe Failure Behavior

- Invalid masthead identity or status input produces a blocking design finding before activation.
- Missing optional resume capability omits the resume action without a dead control.
- Invalid semantic input blocks the affected candidate rather than hiding lost meaning.
- Unsupported decorative CSS degrades to the base surface and rules.
- Theme persistence failure preserves the in-session theme transition.
- Layout overflow, clipped controls, or failed accessibility checks blocks activation.
- Visitor-facing UI never displays stack traces, local paths, hashes, or private marker data.

## Candidate Activation Flow

1. Render U-02 in an isolated candidate entry using the current approved content and behavior.
2. Run focused logic, component, accessibility, style, and property tests.
3. Run strict TypeScript, ESLint, full regression tests, and production build checks.
4. Review all ten sections at 320, 768, 1280, and 1440 CSS pixels in both themes.
5. Review representative 200-percent zoom and increased-text-spacing states, keyboard focus, reduced motion, forced colors, and document-level overflow.
6. Capture named evidence for every supplied defect.
7. Re-run U-01 privacy, source-integrity, recovery, and browser-boundary checks.
8. Request explicit candidate approval.
9. Only after approval, switch the active presentation atomically and repeat validation.

Any blocking finding retains the current active presentation.

## Functional Properties

- **U02-P01 - Semantic membership preservation**: a successful projection contains exactly the input identifiers once.
- **U02-P02 - Semantic order preservation**: output order equals reviewed input order.
- **U02-P03 - Projection determinism**: the same valid source produces structurally equal output.
- **U02-P04 - Projection idempotence**: normalizing an already normalized summary does not change it.
- **U02-P05 - Invalid relationship rejection**: duplicate identifiers or unresolved endpoints never produce a successful model.
- **U02-P06 - Count safety**: negative, non-integer, or non-finite counts are always rejected.
- **U02-P07 - Layout selection determinism**: equal constraints always select the same variant.
- **U02-P08 - Layout monotonicity**: increasing available inline space without stronger accessibility constraints never selects a more constrained variant.
- **U02-P09 - Theme action involution**: selecting the next theme twice returns to the initial valid theme.
- **U02-P10 - Optional action safety**: removing the optional resume capability removes exactly that action and does not change theme semantics.

PBT-06 is N/A because these business transformations are pure and immutable. DOM focus, storage failure, CSS geometry, and rendered accessibility remain example/integration/rendered-review concerns.

## Traceability

- Masthead composition and decoration: US-001; FR-001, FR-011, FR-012.
- Theme placement and operation: US-002; FR-002, FR-003.
- Hidden semantic equivalence: US-008; FR-007 through FR-009; NFR-004.
- Six layouts and full audit: US-009; FR-010 through FR-012; NFR-003, NFR-005 through NFR-007, NFR-019.
- Accessibility applies across all flows through NFR-001.
