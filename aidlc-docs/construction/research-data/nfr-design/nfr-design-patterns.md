# NFR Design Patterns - U-04 Research and Data

## Design Objective

U-04 must activate three visually distinct, evidence-grounded research bodies without weakening the verified-content boundary, exceeding cumulative budgets, fetching more than 12 MB of below-viewport evidence eagerly, exposing former-owner writing, or coupling later domains. Required content fails closed before accepted rendering; optional evidence and figure failures degrade locally while verified text remains complete.

## Pattern P-01 - Typed Required and Optional Failure Partition

### Intent

Separate factual validity from recoverable evidence availability.

### Structure

- One pure assembler selects exactly one verified project per owned domain.
- Required question, context, contribution disclosure, methods, tools, time, and relationship endpoints produce stable blocking findings when invalid.
- Optional missing evidence produces typed non-blocking findings and removes only its action.
- Figure request/decode failure is presentation-local state and cannot mutate the accepted project model.
- Accepted and rejected results are closed immutable unions, not partially populated objects.

### Retry policy

Deterministic source selection, mapping, and endpoint validation are never retried. Repeating identical input produces identical output. Native asset loading is not wrapped in timers or application retries.

### Supports

U04-NFR-AVL-001, U04-NFR-REL-001, U04-NFR-MNT-001, U04-NFR-EVD-001.

## Pattern P-02 - Indexed Linear Research Assembly

### Intent

Support doubled content volume without nested rescans or render-time classification.

### Structure

1. Index verified projects by branded identifier and closed domain kind.
2. Index published evidence and every method, tool, and time endpoint once.
3. Traverse projects in stable domain order.
4. Emit normalized unique relationships in source order.
5. Derive project view models, visual values, and semantic rows from the indexed collections.
6. Verify exact endpoint and identifier equality.

The algorithm is linear in projects plus endpoints plus relationships. Six projects and at least 36 relationships use the same path and contracts as production.

### Supports

U04-NFR-SCL-001, U04-NFR-REL-001, U04-NFR-REL-002, U04-NFR-MNT-001.

## Pattern P-03 - Manifest-Backed Media Capabilities

### Intent

Centralize evidence publication, rendering capability, and request classification without creating a runtime service.

### Structure

- A pure evidence adapter accepts an approved evidence identifier and published manifest.
- Image records become typed figure capabilities with source, intrinsic or reserved geometry, alternative text, lazy loading, and async decoding.
- PDF records become typed document capabilities with purpose label, file type, and same-origin native URL.
- Unsupported, unpublished, malformed, or raw-source entries do not produce a capability.
- Components cannot construct paths, infer media type, or import asset directories.

The adapter carries no browser, filesystem, fetch, cache, or retry logic.

### Supports

U04-NFR-PER-003, U04-NFR-PER-004, U04-NFR-AVL-001, U04-NFR-SEC-001.

## Pattern P-04 - Native Deferred Evidence

### Intent

Keep 1,251,556 bytes of figures and 11,244,477 bytes of documents outside the first viewport request set.

### Structure

- Figures appear below the identity viewport and use native lazy loading, async decoding, and reserved geometry.
- Documents are native purpose-labeled anchors and have no preload, prefetch, embed, object, iframe, or programmatic request.
- Image failure replaces only the failed figure with local status text.
- Emitted asset inventory and initial request inventory are recorded separately.
- No observer, custom image loader, remote transform, service worker, or download manager is added.

### Supports

U04-NFR-PER-003 through U04-NFR-PER-005, U04-NFR-AVL-001, U04-NFR-SEC-001.

## Pattern P-05 - Closed Destination Allowlist

### Intent

Prevent unsafe URLs, unverified external writing, and premature journal routes from entering the rendered tree.

### Structure

- Evidence destinations exist only as manifest-resolved same-origin capabilities.
- Future research-note destinations use a branded local-journal hash type.
- Current destination collection is frozen and empty.
- Every other scheme, remote URL, arbitrary string, and former-owner record is rejected before view-model acceptance.
- Non-interactive publication status uses semantic text and cannot masquerade as a link.

### Supports

U04-NFR-SEC-001, U04-NFR-REL-003, U04-NFR-MNT-002.

## Pattern P-06 - Shared Relationship Projection

### Intent

Keep domain visuals and accessible alternatives exactly equivalent.

### Structure

- One normalized collection represents project-to-method, project-to-tool, project-to-time, and project-to-evidence relationships.
- Domain-specific projectors transform those relationships into pipeline, bench, or signal-sheet values.
- A shared semantic projector creates ordered rows from the same collection.
- Identifier-set, endpoint, uniqueness, order, and repeated-run checks are blocking.
- Text labels, sequence, markers, and line styles communicate meaning in addition to color.

### Supports

U04-NFR-REL-002, U04-NFR-USE-001, U04-NFR-USE-002, U04-NFR-MNT-001.

## Pattern P-07 - Behavior Reuse, Geometry Separation

### Intent

Share safe behavior without reducing three approved structures to one generic project template.

### Structure

- Shared primitives own evidence actions, figure failure, contribution disclosure, publication status, and semantic summaries.
- Computational Pipeline owns ordered processing geometry and evidence terminals.
- Laboratory Bench owns specimen, assay stations, and prototype boundary geometry.
- Analytical Signal Sheet owns staged analytical fields and publication status geometry.
- No component accepts a visual-mode switch that transforms one generic DOM into all domains.

### Supports

U04-NFR-MNT-002, U04-NFR-USE-002, U04-NFR-UNI-001.

## Pattern P-08 - Minimal Transient State

### Intent

Keep static research facts deterministic and continuously available.

### Structure

- Immutable view models remain props.
- One figure may own one local failure boolean.
- A domain body may own one optional emphasized relationship identifier.
- Emphasis never filters, hides, sorts, or changes semantic output.
- No store, reducer, provider, carousel, accordion, pagination, drag state, or persisted preference is added.

### Supports

U04-NFR-PER-005, U04-NFR-AVL-001, U04-NFR-REL-002, U04-NFR-USE-001.

## Pattern P-09 - Headroom-Preserving Native Composition

### Intent

Implement three unique domains within strict cumulative code budgets.

### Controls

- Strict TypeScript selectors and native React components add no third-party runtime.
- Native HTML, CSS Grid/Flexbox, and bounded passive SVG replace charting and UI libraries.
- One CSS Module owns U-04 geometry while existing tokens own theme values.
- View models are assembled once outside child render loops.
- Candidate manifest evaluation enforces 250,000-byte JavaScript, 12-percent JavaScript growth, and 30,720-byte CSS limits.
- Reserved media geometry and minimal state support LCP, CLS, and 200-millisecond interaction targets.

### Supports

U04-NFR-PER-001 through U04-NFR-PER-005, U04-NFR-MNT-001.

## Pattern P-10 - Immutable Composed Body Registry

### Intent

Activate U-04 without changing shell-controller or prior-unit ownership.

### Structure

- U-04 exports an immutable registry containing exactly its three body factories.
- An integration composition combines the approved U-03 registry with U-04 entries and rejects duplicate keys.
- The existing resolver continues selecting a registered body or unchanged temporary fallback.
- A ten-slot test requires five finished bodies and five temporary bodies in registry order.
- Shell navigation, progress, theme, focus transfer, history, and observation remain unchanged.

### Supports

U04-NFR-AVL-001, U04-NFR-MNT-002, U04-NFR-UNI-001, U04-NFR-EVD-001.

## Pattern P-11 - Layered Accessibility and Responsive Evidence

### Intent

Prove that custom scientific geometry preserves complete access.

### Layers

1. Pure tests prove content allocation, relationship equality, role disclosure, and former-owner exclusion.
2. Semantic component tests verify headings, lists/tables, images, statuses, and links by role and name.
3. Token calculations verify text, control, focus, and meaningful-graphic contrast.
4. Failure tests cover missing evidence, figure loss, unavailable emphasis, and stylesheet/SVG degradation.
5. Keyboard, visible focus, reduced motion, target size, and text-spacing reviews cover interaction.
6. The 320, 768, 1280, and 1440 CSS-pixel light/dark matrix plus 200-percent zoom covers transformation, wrapping, overlap, and overflow.

### Supports

U04-NFR-AVL-001, U04-NFR-REL-002, U04-NFR-USE-001/002, U04-NFR-CMP-001.

## Pattern P-12 - Guarded Candidate, Recovery, and Evidence

### Automated candidate phase

- Capture active-entry, dependency, shell, U-03 identity, evidence, asset, and recovery baselines.
- Build only in a temporary candidate directory.
- Run strict types, lint, focused/full tests, boundaries, recovery, capacity, failure, former-owner exclusion, relationship equivalence, and ownership checks.
- Measure code, emitted assets, and initial request classification.
- Any P0 failure leaves the live registry unchanged.

### Rendered review phase

- Review the eight width/theme states, keyboard and focus, figure failure, reduced motion, text spacing, zoom, overflow, semantic alternatives, and uniqueness.
- Record available browser versions and mobile-profile performance; classify unavailable P1 evidence honestly.
- Require explicit user approval before the minimal live registry switch.
- Capture exact pre-switch content and restore it with a recoverable patch if post-activation P0 acceptance fails.

### Supports

All U-04 NFRs, especially U04-NFR-MNT-001/002, U04-NFR-UNI-001, and U04-NFR-EVD-001.

## Static Observability and Infrastructure Decision

Runtime queues, caches, circuit breakers, workers, monitoring agents, remote logging, APIs, databases, remote media processors, and retry services are not applicable. Observability consists of typed findings, automated test output, boundary reports, manifest measurements, request classifications, rendered review evidence, user decision, and recovery hashes. These development-time components never enter the browser bundle.

## Pattern Traceability

| NFR family | Primary patterns |
| --- | --- |
| U04-NFR-SCL | P-02 |
| U04-NFR-PER | P-03, P-04, P-08, P-09, P-12 |
| U04-NFR-AVL | P-01, P-03, P-04, P-08 |
| U04-NFR-SEC | P-03, P-05 |
| U04-NFR-REL | P-01, P-02, P-05, P-06 |
| U04-NFR-MNT | P-02, P-07, P-09, P-10, P-12 |
| U04-NFR-USE/CMP | P-06, P-07, P-08, P-11 |
| U04-NFR-UNI | P-07, P-10, P-12 |
| U04-NFR-EVD | P-12 |

## Extension Compliance

- Security Baseline: disabled and not loaded; P-03 and P-05 implement the approved product-specific controls.
- Property-Based Testing: disabled and not loaded; P-02 uses deterministic capacity and repeat-run fixtures.
