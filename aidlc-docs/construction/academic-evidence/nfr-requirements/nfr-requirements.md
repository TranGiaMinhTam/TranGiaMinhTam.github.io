# NFR Requirements - U-05 Academic and Evidence

## Scope and Acceptance Semantics

These requirements apply to academic and evidence selectors, normalized relationships, view models, Academic Trajectory, Evidence Library, previews, actions, semantic summaries, styles, two-body registration, candidate output, and the active production artifact. A P0 failure blocks activation or completion. A P1 target requires evidence or an explicit tooling limitation.

## NFR Summary

| ID | Category | Priority | Measurable target |
| --- | --- | --- | --- |
| U05-NFR-SCL-001 | Capacity | P1 | Process four programs, twenty evidence items, and at least eighty relationships using indexed linear passes and deterministic output. |
| U05-NFR-PER-001 | JavaScript | P0 | Initial JavaScript is at most 274,000 bytes and no more than 10% above the 249,238-byte U-04 baseline. |
| U05-NFR-PER-002 | CSS | P0 | Initial CSS is at most 43,008 bytes. |
| U05-NFR-PER-003 | Documents | P0 | Seven PDFs totaling 22,866,108 bytes remain outside the initial request set and open only after native action. |
| U05-NFR-PER-004 | Images | P0 | Three images totaling 1,251,556 bytes are lazy, async-decoded, intrinsically sized, and locally recoverable. |
| U05-NFR-PER-005 | Rendered performance | P1 | Mobile-profile LCP is at most 2.5 seconds, CLS at most 0.10, and interaction latency at most 200 milliseconds. |
| U05-NFR-AVL-001 | Availability | P0 | Optional evidence or preview failure preserves verified academics and all unaffected archive records. |
| U05-NFR-SEC-001 | Static security | P0 | Only published same-origin evidence is accepted; unsafe markup, URLs, runtime requests, private/raw files, portrait leakage, and false CV substitution are absent. |
| U05-NFR-REL-001 | Academic integrity | P0 | Required program facts fail closed with stable findings; current and completed study remain distinct. |
| U05-NFR-REL-002 | Evidence equivalence | P0 | Archive groups, spectrum entries, and semantic counts have identical identifiers, order, and values. |
| U05-NFR-REL-003 | Domain exclusion | P0 | Identity portrait, pending CV, former-owner writing, and later-unit-only evidence remain absent. |
| U05-NFR-MNT-001 | Quality gate | P0 | Strict types, lint, focused/full tests, builds, boundaries, deterministic fixtures, and measurements pass. |
| U05-NFR-MNT-002 | Ownership | P0 | U-05 owns exactly two body keys and does not import legacy data or other units' presentation. |
| U05-NFR-USE-001 | Accessibility | P0 | WCAG 2.2 AA-oriented semantic, keyboard, focus, contrast, status, alternative, zoom, and reflow checks pass. |
| U05-NFR-USE-002 | Responsive usability | P0 | Eight width/theme states have no clipping, overlap, hidden metadata, or document-level horizontal overflow. |
| U05-NFR-CMP-001 | Compatibility | P1 | Latest two stable evergreen desktop majors plus current iOS Safari and Android Chrome are targeted. |
| U05-NFR-UNI-001 | Structural uniqueness | P0 | Curriculum cross-section and archival index are present; prohibited timeline, ledger, card-grid, carousel, and embedded-viewer patterns are absent. |
| U05-NFR-EVD-001 | Acceptance evidence | P0 | Scope, versions, commands, assets, requests, measurements, limitations, review, activation, and recovery are recorded. |

## Scalability and Capacity

### U05-NFR-SCL-001 - Doubled Academic and Evidence Volume

- Selection, validation, endpoint indexing, grouping, relationship generation, spectrum projection, and semantic projection must handle four programs, twenty evidence items, and at least eighty relationships without schema or component changes.
- Processing remains linear in programs, evidence records, and relationships. Nested full-collection rescans inside item loops are prohibited.
- Identifiers, findings, group order, item order, relationship order, counts, and view models are identical across repeated runs with identical input.
- Synthetic capacity fixtures are test-only and cannot enter the published application.

## Performance

### U05-NFR-PER-001 - JavaScript Budget

- Minified JavaScript reachable from the active entry is at most 274,000 bytes.
- Growth from the 249,238-byte U-04 production baseline is at most 10 percent; exceeding either threshold blocks activation.
- No PDF viewer, charting, gallery, carousel, state-management, remote-content, or animation runtime is added.

### U05-NFR-PER-002 - CSS Budget

- Active initial CSS is at most 43,008 bytes.
- One U-05 CSS Module may share semantic tokens while preserving two distinct geometries and one DOM per section.
- No legacy global stylesheet, duplicated theme tree, generated utility framework, or routine `!important` enters the active graph.

### U05-NFR-PER-003 - PDF Delivery

| Document group | Count | Exact bytes |
| --- | ---: | ---: |
| Academic transcript | 1 | 6,817,646 |
| Scholarship offers | 2 | 1,704,751 |
| Research outputs | 4 | 14,343,711 |
| **Total** | **7** | **22,866,108** |

- PDFs may be emitted but are not requested during the initial view or section navigation.
- No preload, prefetch, iframe, object, embed, canvas rasterization, runtime fetch, or automatic viewer request is permitted.
- Each request begins only after its purpose-, type-, format-, and context-labeled native link is activated.

### U05-NFR-PER-004 - Image Delivery

| Image | Exact source bytes |
| --- | ---: |
| Molecular docking | 255,505 |
| Cashew polyphenol | 164,808 |
| Data analytics | 831,243 |
| **Total** | **1,251,556** |

- Images use canonical manifest URLs, intrinsic dimensions or reserved ratios, `loading="lazy"`, and `decoding="async"`.
- None enters the first-viewport request set.
- Preview failure remains local and leaves metadata plus the full-image action available.

### U05-NFR-PER-005 - Rendered Performance

- A documented representative mobile profile targets LCP at or below 2.5 seconds and CLS at or below 0.10.
- Hash navigation, category jumps, and evidence-action feedback target at most 200 milliseconds.
- Browser, version, platform, viewport, throttle, cache, samples, and aggregation are recorded.
- Missing browser automation is a P1 limitation, never an inferred pass.

## Availability, Security, and Reliability

### U05-NFR-AVL-001 - Text-First Continuity

Missing optional evidence removes only its marker, preview, or action. Image failure replaces only the preview with a local status. Group counts recompute from accepted evidence. Verified programs, results, language qualification, status, and unaffected archive rows remain available. No retry loop, remote fallback, blank registered section, or uncaught error is allowed.

### U05-NFR-SEC-001 - Static Publication Boundary

- Evidence resolves only through published manifest records with safe same-origin build URLs.
- Reject `javascript:`, `data:`, arbitrary remote URLs, external SVG references, unsafe HTML, dynamic execution, directory-derived publication, raw source paths, and private files.
- The U-03 portrait cannot enter U-05 selection, and the transcript cannot be substituted for the pending CV.
- U-05 adds no fetch client, storage, analytics, tracking, authentication, form, secret, service worker, or cross-origin request.

### U05-NFR-REL-001 - Academic Integrity

Stable blocking findings cover missing or duplicate programs, identifiers, institution, period, specialization, required facts, provenance, status, or required relationship endpoints. Accepted output contains exactly one current AS & A-Level and one completed IGCSE program. No predicted grade, rank, admission, acceptance, enrollment, scholarship-use, or future result is inferred.

### U05-NFR-REL-002 - Archive and Semantic Equivalence

- Archive groups, visual spectrum entries, and semantic counts derive from one accepted collection.
- Group identifiers, labels, order, item membership, and counts match exactly.
- Re-rendering identical input produces identical names, order, destinations, and accessible content.
- Color, CSS, SVG, or image success cannot be required to understand group or count meaning.

### U05-NFR-REL-003 - Domain Exclusion

Boundary checks exclude the Identity portrait, pending CV placeholder, former-owner local and WordPress writing, raw archive paths, private evidence, and U-06/U-07 content from source imports, selectors, presentation, candidate output, and active build reachability.

## Maintainability

### U05-NFR-MNT-001 - Automated Quality Gate

Before activation, strict TypeScript, ESLint, focused model/component/registry tests, the full regression suite, candidate and production builds, exact bundle/media/request measurements, boundary checks, capacity fixtures, repeat equality, malformed-record cases, evidence failure, semantic equivalence, and accessibility assertions pass. Tests use semantic roles and stable purpose-based test identifiers rather than hashed classes or fragile DOM depth.

### U05-NFR-MNT-002 - Unit Ownership

- U-05 source stays inside `src/portfolio/academics/` except minimal public export, registry composition, scripts, and tests approved in Code Generation planning.
- Components receive immutable view models and cannot import `src/data`, raw asset directories, or other units' presentation.
- U-05 registers exactly `academic-trajectory` and `evidence-library`.
- The first five completed bodies and final three temporary bodies remain unchanged until guarded activation.

## Usability, Accessibility, and Responsive Behavior

### U05-NFR-USE-001 - WCAG 2.2 AA-Oriented Acceptance

Evidence covers logical headings and landmarks; visible in-progress status; exact textual grades and evidence types; native links with purpose-specific names and unobscured focus; meaningful image alternatives and local failure status; 4.5:1 normal-text and 3:1 large-text, focus, control, and meaningful-graphic contrast; non-color group cues; exact semantic count alternatives; usable targets; reduced motion; increased text spacing; 200-percent zoom; and 320-pixel reflow in both themes.

### U05-NFR-USE-002 - Responsive Matrix

- Review 320, 768, 1280, and 1440 CSS pixels in light and dark modes.
- Verify long provenance, multi-line grades, status, archive-row stacking, category anchors, action wrapping, image failure, text spacing, and zoom.
- No document-level horizontal overflow, clipped focus, overlapping label, obscured target, hidden metadata, or scroll-dependent core meaning is permitted.

## Compatibility and Structural Uniqueness

### U05-NFR-CMP-001 - Browser Policy

Target the latest two stable major releases available at verification time for Chrome, Edge, Firefox, and Safari, plus current iOS Safari and Android Chrome. Native HTML, CSS, and passive SVG are the functional baseline; unavailable platforms receive a P1 limitation.

### U05-NFR-UNI-001 - Two-Body Acceptance

Academic Trajectory must read as a curriculum cross-section with learning strata, institution anchors, subject/result clusters, status, recognition, and evidence. Evidence Library must read as a grouped full-width archival index with asymmetric metadata rows. Blocking patterns include ledgers, conventional timelines, repeated education cards, uniform evidence grids, carousels, accordions, modal-only metadata, embedded PDF viewers, or relabeled copies of earlier-unit structures.

## Acceptance Evidence

### U05-NFR-EVD-001 - Reproducible Package

The Code Generation plan records exact scope, hashes, recovery state, test and tool versions, commands, bundle and evidence inventories, initial-request classification, capacity and failure cases, semantic equality, responsive/theme review, accessibility observations, browser-performance evidence or limitations, user candidate decision, guarded activation, and post-activation recovery outcome.

## Extension Compliance

- Security Baseline is disabled and not loaded; U05-NFR-SEC-001 remains independently mandatory.
- Property-Based Testing is disabled and not loaded; deterministic malformed tables, doubled-volume fixtures, and repeat-run tests remain mandatory.
