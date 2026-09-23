# NFR Requirements - U-06 Tools and Fieldwork

## Scope and Acceptance Semantics

These requirements apply to tool and activity selectors, the closed Tool Linking Table, normalized relationships, view models, Methods and Tools, Fieldwork and Leadership, semantic summaries, styles, two-body registration, candidate output, and the active production artifact. A P0 failure blocks activation or completion. A P1 target requires evidence or an explicit tooling limitation.

## NFR Summary

| ID | Category | Priority | Measurable target |
| --- | --- | --- | --- |
| U06-NFR-SCL-001 | Capacity | P1 | Process thirty-two tool records and eight fieldwork/leadership records using indexed linear passes and deterministic output. |
| U06-NFR-PER-001 | JavaScript | P0 | Initial JavaScript is at most 285,000 bytes and no more than 8% above the 268,491-byte U-05 baseline. |
| U06-NFR-PER-002 | CSS | P0 | Initial CSS is at most 46,080 bytes. |
| U06-NFR-PER-003 | Evidence assets | P0 | Zero evidence bytes are requested, embedded, or preloaded; any future manifest addition reuses the existing on-demand PDF or lazy-image behavior. |
| U06-NFR-PER-004 | Rendered performance | P1 | Mobile-profile LCP is at most 2.5 seconds, CLS at most 0.10, and interaction latency at most 200 milliseconds. |
| U06-NFR-AVL-001 | Availability | P0 | An unmapped tool or broken context-link target produces a stable finding without removing unaffected content. |
| U06-NFR-SEC-001 | Static security | P0 | No external request, unsafe scheme, unsafe markup, or external SVG reference is introduced; context links resolve only to existing same-origin section anchors. |
| U06-NFR-REL-001 | Classification integrity | P0 | Every tool's demonstrated/interest classification and linked context come only from the closed Tool Linking Table. |
| U06-NFR-REL-002 | Activity integrity | P0 | Fieldwork and Leadership groups and records match the already-approved U-01 kind classification and verified facts exactly. |
| U06-NFR-REL-003 | Semantic equivalence | P0 | Visual category/group presentation and semantic summary lists have identical identifiers, order, and values. |
| U06-NFR-MNT-001 | Quality gate | P0 | Strict types, lint, focused/full tests, builds, boundaries, deterministic fixtures, and measurements pass. |
| U06-NFR-MNT-002 | Ownership | P0 | U-06 owns exactly two body keys and does not import `src/data/skills.ts`, `src/data/experience.ts`, or other units' presentation directly from components. |
| U06-NFR-USE-001 | Accessibility | P0 | WCAG 2.2 AA-oriented semantic, keyboard, focus, contrast, status, alternative, zoom, and reflow checks pass. |
| U06-NFR-USE-002 | Responsive usability | P0 | Eight width/theme states have no clipping, overlap, hidden metadata, or document-level horizontal overflow. |
| U06-NFR-CMP-001 | Compatibility | P1 | Latest two stable evergreen desktop majors plus current iOS Safari and Android Chrome are targeted. |
| U06-NFR-UNI-001 | Structural uniqueness | P0 | A relationship-based capability map and a two-group kind-based activity layout are present; prohibited matrix, rating, log, timeline, and ledger patterns are absent. |
| U06-NFR-EVD-001 | Acceptance evidence | P0 | Scope, versions, commands, budgets, findings, measurements, limitations, review, activation, and recovery are recorded. |

## Scalability and Capacity

### U06-NFR-SCL-001 - Doubled Tool and Activity Volume

- Selection, validation, classification lookup, grouping, relationship generation, and semantic projection must handle thirty-two tool records across eight categories and eight fieldwork/leadership records across the two kinds without schema or component changes.
- Processing remains linear in tool and activity record counts. Nested full-collection rescans inside item loops are prohibited.
- Identifiers, findings, group order, item order, and view models are identical across repeated runs with identical input.
- Synthetic capacity fixtures are test-only and cannot enter the published application.

## Performance

### U06-NFR-PER-001 - JavaScript Budget

- Minified JavaScript reachable from the active entry is at most 285,000 bytes.
- Growth from the 268,491-byte U-05 production baseline is at most 8 percent; exceeding either threshold blocks activation.
- No rating widget, gauge, timeline, gallery, carousel, state-management, remote-content, or animation runtime is added.

### U06-NFR-PER-002 - CSS Budget

- Active initial CSS is at most 46,080 bytes.
- One U-06 CSS Module may share semantic tokens while preserving two distinct geometries and one DOM per section.
- No legacy global stylesheet, duplicated theme tree, generated utility framework, or routine `!important` enters the active graph.

### U06-NFR-PER-003 - Evidence Asset Behavior

- U-06 emits zero evidence bytes in the current build; `evidenceManifest.ts` contains no tool, fieldwork, or leadership entry.
- No preload, prefetch, iframe, object, embed, canvas rasterization, runtime fetch, or automatic request is permitted regardless of asset count.
- If a future plan-approved manifest addition supplies a matching id, the resulting action must reuse the existing on-demand PDF or lazy-image behavior with no new loading strategy.

### U06-NFR-PER-004 - Rendered Performance

- A documented representative mobile profile targets LCP at or below 2.5 seconds and CLS at or below 0.10.
- Hash navigation, category/group navigation, and context-link activation target at most 200 milliseconds.
- Browser, version, platform, viewport, throttle, cache, samples, and aggregation are recorded.
- Missing browser automation is a P1 limitation, never an inferred pass.

## Availability, Security, and Reliability

### U06-NFR-AVL-001 - Classification Continuity

An unmapped tool (absent from the Tool Linking Table) produces a stable blocking finding; it cannot silently default to `interest`. A linked context target that no longer resolves omits only that context link with a finding while the tool's verified facts and classification remain visible. Verified tool categories and both activity groups remain available when an unrelated record fails. No retry loop, remote fallback, blank registered section, or uncaught error is allowed.

### U06-NFR-SEC-001 - Static Publication Boundary

- Context links resolve only to existing same-origin section anchors already defined in `sectionRegistry.ts`.
- Reject `javascript:`, `data:`, arbitrary remote URLs, external SVG references, unsafe HTML, and dynamic execution.
- Any future evidence action must resolve only through published manifest records with safe same-origin build URLs, reusing the U-04/U-05 rule.
- U-06 adds no fetch client, storage, analytics, tracking, authentication, form, secret, service worker, or cross-origin request.

### U06-NFR-REL-001 - Tool Classification Integrity

Every one of the sixteen verified tool records resolves to exactly one Tool Linking Table entry specifying `demonstrated` or `interest` and, when demonstrated, one linked section id. No classification or link may be computed by runtime label matching, substring search, or inference. Code Generation may not add, remove, or reassign a table entry without a new approved functional design change.

### U06-NFR-REL-002 - Activity Classification Integrity

Fieldwork and Leadership group membership follows only the already-approved U-01 `kind` field (`fieldwork` or `leadership`). Role/title, organization, period, and description text are reproduced unmodified from `verifiedPortfolioSource.ts`. No participation is presented as leadership, and no leadership record is presented with an unverified title.

### U06-NFR-REL-003 - Semantic Equivalence

- The Methods and Tools category/classification visual and Fieldwork/Leadership group visual each derive their semantic summary list from the same accepted collection used by the visual presentation.
- Group/category identifiers, labels, order, item membership, and counts match exactly between visual and semantic forms.
- Re-rendering identical input produces identical names, order, destinations, and accessible content.
- Color, CSS, or SVG success cannot be required to understand classification or group meaning.

## Maintainability

### U06-NFR-MNT-001 - Automated Quality Gate

Before activation, strict TypeScript, ESLint, focused model/component/registry tests, the full regression suite, candidate and production builds, exact bundle/measurement checks, boundary checks, capacity fixtures, repeat equality, unmapped-tool and broken-link cases, semantic equivalence, and accessibility assertions pass. Tests use semantic roles and stable purpose-based test identifiers rather than hashed classes or fragile DOM depth.

### U06-NFR-MNT-002 - Unit Ownership

- U-06 source stays inside `src/portfolio/impact/` except minimal public export, registry composition, scripts, and tests approved in Code Generation planning.
- Components receive immutable view models and cannot import `src/data/skills.ts`, `src/data/experience.ts`, raw asset directories, or other units' presentation.
- U-06 registers exactly `tools` and `fieldwork-leadership`.
- The seven completed U-01 through U-05 bodies and the final temporary Contact/Journal body remain unchanged until guarded activation.
- `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` remain untouched; U-06 does not read, import, adopt, or delete them.

## Usability, Accessibility, and Responsive Behavior

### U06-NFR-USE-001 - WCAG 2.2 AA-Oriented Acceptance

Evidence covers logical headings and landmarks; textual classification and group-kind labeling; native context links with purpose-specific names and unobscured focus; 4.5:1 normal-text and 3:1 large-text, focus, control, and meaningful-graphic contrast; non-color demonstrated/interest and Fieldwork/Leadership cues; exact semantic summary alternatives; usable targets; reduced motion; increased text spacing; 200-percent zoom; and 320-pixel reflow in both themes.

### U06-NFR-USE-002 - Responsive Matrix

- Review 320, 768, 1280, and 1440 CSS pixels in light and dark modes.
- Verify category/group stacking, long description text, classification markers, context-link wrapping, text spacing, and zoom.
- No document-level horizontal overflow, clipped focus, overlapping label, obscured target, hidden metadata, or scroll-dependent core meaning is permitted.

## Compatibility and Structural Uniqueness

### U06-NFR-CMP-001 - Browser Policy

Target the latest two stable major releases available at verification time for Chrome, Edge, Firefox, and Safari, plus current iOS Safari and Android Chrome. Native HTML, CSS, and passive SVG are the functional baseline; unavailable platforms receive a P1 limitation.

### U06-NFR-UNI-001 - Two-Body Acceptance

Methods and Tools must read as a relationship-based capability map with four category clusters, per-tool classification, and context links. Fieldwork and Leadership must read as two labeled kind-based groups with full role/organization/period/description text. Blocking patterns include proficiency matrices, star/bar ratings, tag clouds without classification, activity logs, chronological timelines, ledgers, carousels, accordions, modal-only metadata, or relabeled copies of earlier-unit structures.

## Acceptance Evidence

### U06-NFR-EVD-001 - Reproducible Package

The Code Generation plan records exact scope, hashes, recovery state, test and tool versions, commands, bundle inventories, initial-request classification, capacity and failure cases, semantic equality, responsive/theme review, accessibility observations, browser-performance evidence or limitations, user candidate decision, guarded activation, and post-activation recovery outcome.

## Extension Compliance

- Security Baseline is disabled and not loaded; U06-NFR-SEC-001 remains independently mandatory.
- Property-Based Testing is disabled and not loaded; deterministic malformed tables, doubled-volume fixtures, and repeat-run tests remain mandatory.
