# Technology Stack Decisions - U-03 Identity and Questions

## Decision Summary

U-03 retains the active React 19, strict TypeScript, Vite, Vitest, and Testing Library toolchain. It consumes the U-01 verified content, evidence, and visualization contracts and enters the U-02 shell through the typed section-body seam. Native semantic HTML, inline presentational SVG, and locally owned CSS Modules create the two custom compositions without adding a charting, animation, image, state, or UI dependency.

## Selected Stack

| Concern | Selection | U-03 rationale and constraint |
| --- | --- | --- |
| Component runtime | React 19 | Retain function components and immutable typed props; local state is limited to portrait failure and transient visual emphasis. |
| Language | TypeScript 5.9 strict mode | Use exhaustive discipline identifiers, read-only view models, deterministic results, and unused-code checks. |
| Build and assets | Vite 7 static build | Retain GitHub Pages-compatible asset URLs and manifest measurement; transcript stays on demand. |
| Verified content | U-01 source, selectors, evidence manifest, and visualization contracts | One factual boundary; U-03 cannot import legacy `src/data` directly or duplicate verified strings. |
| Shell integration | U-02 section-body resolver seam | Replace only `identity` and `questions`; retain all shell controllers and eight temporary bodies. |
| Identity markup | Native headings, paragraphs, figure, list, and anchors | Strong reading order, progressive behavior, and no hero-component dependency. |
| Relationship graphic | Inline SVG generated from immutable relationships | Supports labelled paths and coordinates at low runtime cost; no charting library. |
| Relationship alternative | Native table or labelled list from the same relationships | Supplies complete accessible meaning and narrow-width readability. |
| Styling | CSS Modules plus U-01 tokens | Owns unique component geometry while retaining one light/dark semantic token system. |
| Motion | CSS transitions behind `prefers-reduced-motion` | Emphasis only; no animation library and no hidden information. |
| Testing | Vitest 4, jsdom, Testing Library 16, and jest-dom | Retain semantic queries, deterministic malformed fixtures, component failure tests, and resolver boundaries. |
| Static verification | Existing TypeScript, ESLint, Vite-manifest, recovery, and boundary tools | Extend narrowly for U-03 ownership, asset requests, relationship equivalence, and budgets. |
| Hosting | Existing GitHub Pages deployment | Unchanged; no Infrastructure Design or server component is needed. |

Declared-version ranges are not upgraded by this decision. Exact installed versions and the unchanged lockfile hash are recorded again during Code Generation.

## TS-001 - Verified View-Model Boundary

### Decision

Pure TypeScript selectors assemble `ResearchIdentityViewModel` and `ResearchQuestionsViewModel` from U-01 records before rendering.

### Constraints

- Components receive presentation-ready immutable values and cannot become factual sources.
- Scientific direction is derived only through a fixed supported-theme mapping.
- Question disciplines use the approved closed domain mapping; unknown input produces a blocking finding.
- Relationship visual values and semantic rows derive from one relationship collection.
- Error findings have stable codes and deterministic ordering.

### Rejected Alternatives

- Importing legacy content directly into components would bypass U-01 verification.
- Runtime natural-language classification could invent unsupported relationships.
- Maintaining separate SVG and table mappings could create inaccessible disagreement.

## TS-002 - React Component and State Strategy

### Decision

Use focused function components under the U-03 ownership boundary with immutable props. React local state is allowed only for a recoverable portrait load failure and transient relationship emphasis.

### Constraints

- Verified identity, questions, coordinates, and relationships are never copied into editable state.
- No context provider, global store, new navigation controller, or parallel theme tree is added.
- Native anchors remain valid when JavaScript enhancement fails.
- Repeated rendering of identical inputs produces identical semantic output.

### Rejected Alternatives

- Global state adds coordination cost for two static section bodies.
- A filter/selection controller conflicts with the always-present relationship requirement.
- Hard-coding U-03 markup in `ObservatoryShell` breaks unit ownership.

## TS-003 - Native Identity Composition

### Decision

Build the identity section from native text, figure, list, and anchor elements; use CSS Grid and logical properties for the wide specimen field and one DOM reading order for every viewport.

### Constraints

- The portrait uses a Vite-resolved published URL, intrinsic dimensions, reserved aspect ratio, and asynchronous decoding.
- A failed image removes only the visual aperture content, not the identity text or actions.
- The transcript anchor resolves from the manifest, uses the approved filename and truthful label, and does not preload the document.
- Responsive rearrangement uses CSS placement, not a separate mobile render tree.

### Rejected Alternatives

- A framework hero/profile-card component would recreate the rejected structure.
- CSS background delivery would weaken portrait alternative text and load/error behavior.
- Eager transcript fetching would impose a 6.8 MB initial transfer with no visitor intent.

## TS-004 - Inline SVG Relationship View

### Decision

Render a lightweight inline SVG using stable question, coordinate, and relationship values. Native SVG elements and local CSS provide paths, markers, labels, and emphasis.

### Constraints

- No scripts, foreign HTML, remote SVG, canvas, WebGL, or generated unsafe markup.
- Coordinates are deterministic presentation data, not research measurements.
- Meaning uses labels, marker/line variation, and spatial connections as well as color.
- The SVG carries a concise title and description; the adjacent native alternative contains the complete mapping.
- Focus and hover change emphasis only and honor reduced motion.

### Rejected Alternatives

- A charting library adds bundle and abstraction cost for six fixed coordinate types.
- Canvas and WebGL reduce native semantics and increase fallback complexity.
- A repeated question-card grid fails the approved relationship and uniqueness design.

## TS-005 - Semantic Relationship Alternative

### Decision

Generate a native table or labelled list from `semanticRows`, which are themselves derived from the relationship collection.

### Constraints

- Normalized visual and semantic relationship identifier sets must match exactly.
- DOM meaning remains complete when styles or SVG rendering are unavailable.
- Narrow styling may change table/list presentation but cannot omit labels or relationships.
- Tests query roles, headings, row/list structure, and names rather than implementation class names.

## TS-006 - CSS and Responsive Strategy

### Decision

Use U-03 CSS Modules with U-01 semantic tokens, CSS Grid/Flexbox, logical properties, aspect ratio, and focused media queries.

### Constraints

- The complete entry remains within 24,576 bytes of CSS and the inherited 51,200-byte ceiling.
- Light and dark modes share one DOM and rule structure; token values supply theme differences.
- Wide asymmetry becomes one mobile editorial sequence at content-driven breakpoints.
- No routine `!important`, generic card class, global layout override, generated utility string, sidebar, drawer, or duplicated responsive tree.
- Motion is optional emphasis, never a content carrier.

### Rejected Alternatives

- Chakra style props and Tailwind utility composition would reintroduce the rejected presentation layers.
- An animation library is unnecessary for bounded emphasis.
- Viewport-specific component trees risk semantic divergence.

## TS-007 - Asset and Download Strategy

### Decision

Use only manifest-resolved Vite asset URLs. The portrait may load in the first viewport; the academic transcript is referenced by a native user-initiated link and never preloaded.

### Constraints

- Initial portrait transfer is no greater than 77,650 bytes.
- The transcript's 6,817,646 bytes are excluded from initial network requests even though the build may emit the asset.
- No runtime image service, base64 embedding, remote CDN, directory enumeration, or arbitrary path construction is introduced.
- Source assets are not overwritten during U-03; any derivative requires exact Code Generation plan scope and provenance.

## TS-008 - Test and Measurement Strategy

### Automated layers

| Layer | Required evidence |
| --- | --- |
| Pure model | Identity cardinality, closed domain mapping, missing data, endpoint validation, duplicate rejection, ordering, and repeat-run equality. |
| Growth | At least six questions and twelve relationships with linear/shared derivation and no architecture change. |
| Components | Headings, text, status labels, figure behavior, portrait failure, native actions, question ledger, semantic relationships, and focus hooks. |
| Equivalence | Exact normalized relationship-set equality between SVG values and semantic rows. |
| Integration | Only `identity` and `questions` resolve to U-03; the other eight slots and U-02 controller behavior remain unchanged. |
| Boundary | No legacy data, rejected presentation, raw evidence, unsafe HTML/SVG, new network client, or prohibited dependency import. |
| Build | Exact initial JavaScript, CSS, portrait, transcript, and entry-request measurements. |

### Rendered layers

- Review 320, 768, 1280, and 1440 CSS pixels in light and dark themes.
- Inspect keyboard order, focus visibility, portrait fallback, relationship cues, semantic equivalence, reduced motion, 200-percent zoom, text spacing, and overflow.
- Record an available mobile-profile LCP, CLS, and interaction response run with full environment details.
- Record exact available browser versions and explicit P1 limitations for unavailable compatibility targets.
- Require an explicit rendered-candidate approval before U-03 completion.

## TS-009 - Security and Delivery Boundary

### Decision

Keep U-03 a same-origin static feature with no new runtime service or persisted state.

### Constraints

- Only manifest evidence URLs and the registered `questions` target enter action destinations.
- Verified strings render through React text semantics and SVG text nodes, never unsafe HTML.
- Inline SVG is passive and contains no external references or event-script attributes.
- The lockfile and dependency declarations remain unchanged.
- Build inventory and initial-request review distinguish emitted downloadable evidence from eagerly fetched content.

## Migration and Ownership Implications

1. U-03 source is generated behind the approved unit boundary and registered through the U-02 body seam.
2. Focused models and components are verified before any rendered-candidate approval request.
3. Only the two approved temporary bodies are replaced; shell controllers and eight later bodies remain intact.
4. The complete active manifest is measured against 256,000-byte JavaScript and 24,576-byte CSS checkpoints plus inherited ceilings.
5. A rendered candidate is reviewed across the required width/theme matrix for accessibility and structural uniqueness.
6. Failed P0 requirements block U-03 acceptance and require correction within approved scope or a new explicit plan amendment.

## Infrastructure, API, and Data Decisions

- Hosting remains the existing GitHub Pages workflow.
- No backend, API, database, CMS, authentication, analytics, monitoring agent, remote asset service, or runtime secret is introduced.
- No Infrastructure Design stage is required because deployment architecture is unchanged.
- U-03 persists no browser data; the inherited U-02 theme preference remains outside U-03 ownership.

## Extension Compliance

- Security Baseline: disabled and not loaded; the product-specific same-origin asset, safe-markup, and no-network boundary remains mandatory.
- Property-Based Testing: disabled and not loaded; deterministic tables, doubled-volume fixtures, and repeated-render checks remain mandatory.
