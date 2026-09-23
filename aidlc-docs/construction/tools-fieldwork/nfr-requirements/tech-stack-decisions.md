# Technology Stack Decisions - U-06 Tools and Fieldwork

## Decision Summary

U-06 retains React 19, strict TypeScript, Vite, Vitest, Testing Library, native semantic HTML, optional passive inline SVG, and CSS Modules. It adds no runtime dependency, rating/gauge component, timeline framework, remote client, backend, or deployment component. Pure selectors project the already-approved `verifiedPortfolioSource.ts` records and the closed Tool Linking Table into two immutable view models before guarded shell registration.

## Selected Stack

| Concern | Selection | Constraint |
| --- | --- | --- |
| Runtime | React 19 function components | Static view-model rendering with no filter, carousel, or disclosure state |
| Language | TypeScript 5.9 strict mode | Closed classification, group, relationship, and finding types |
| Selection | Pure verified-source selectors | No `src/data/skills.ts`, `src/data/experience.ts`, or asset-directory import in components |
| Classification | Immutable, closed Tool Linking Table | No runtime label matching, substring search, or inference |
| Indexing | Immutable maps and ordered arrays | Linear assembly and deterministic doubled-volume behavior |
| Markup | Native headings, lists, and anchors | Keyboard and semantic baseline without widget runtime |
| Visuals | CSS geometry and passive inline SVG when useful | Classification/group marks only; no fabricated rating graphic |
| Styling | One U-06 CSS Module plus existing tokens | Two distinct geometries within the 46,080-byte ceiling |
| Evidence | No asset today; existing on-demand/lazy pattern reserved for future use | No new loading strategy if a manifest entry is later added |
| State | No local state beyond React defaults | No filter, carousel, disclosure, pagination, or global store |
| Integration | Existing duplicate-rejecting body registry | Exactly two new body keys after candidate approval |
| Testing | Vitest, jsdom, Testing Library, jest-dom | Semantic assertions, capacity, failures, links, ownership |
| Verification | TypeScript, ESLint, Vite manifest, boundary and recovery scripts | Exact budgets, findings, exclusions, activation |
| Hosting | Existing GitHub Pages workflow | No infrastructure or routing change |

No dependency version is upgraded. Code Generation must record installed versions and prove that dependency declarations and the lockfile remain unchanged.

## TS-001 - Verified Tool Projection and Closed Linking

Create an explicit U-06 projection from verified `tool`-kind records already produced by `verifiedPortfolioSource.ts`. The sixteen-entry Tool Linking Table (defined in the approved Functional Design) is the sole source of classification and linked-context truth. An unmapped tool produces a stable finding rather than a runtime-computed default. Components receive accepted immutable `ClassifiedTool` values only.

Rejected alternatives are runtime substring matching between tool labels and project `facts.tools`/`facts.methods` text, and presentation-time classification.

## TS-002 - Verified Activity Projection

Select the four verified `fieldwork`/`leadership` records by their already-approved `kind` field. Group into exactly two ordered groups (Fieldwork, Leadership) preserving verified source order. No theme-based, date-based, or keyword-based regrouping is introduced.

## TS-003 - Native Capability Map

Implement Methods and Tools with semantic HTML and locally owned CSS Grid/Flexbox geometry. One DOM supports wide category clusters and narrow continuous reading order. Classification, category, and linked context remain visible without a rating-widget package or custom interaction state.

## TS-004 - Native Activity Groups

Implement Fieldwork and Leadership as two semantic grouped sections with full-text records. No filtering, carousel, timeline package, or modal-only metadata is introduced.

## TS-005 - Evidence Action Reservation

- No evidence action renders anywhere in U-06 today because no matching manifest id exists.
- The shared `EvidenceAction` component (already used by U-04/U-05) is reserved for reuse if a future plan-approved manifest addition supplies a matching id; no new preview or loading component is created speculatively.
- No PDF.js, canvas rasterization, iframe, object, embed, remote thumbnail service, base64 copy, or runtime network client is allowed.

## TS-006 - Semantic Capability and Activity Summaries

Build classification and group summaries from the same accepted collections used by their visual presentation, then project both the compact visual form and an adjacent semantic list. Identifiers, labels, counts, and order are identical. CSS or passive SVG can express geometry, while labels and markers preserve non-color meaning.

## TS-007 - CSS and Theme Strategy

Use one locally owned U-06 CSS Module with existing semantic tokens, logical properties, content-driven media queries, visible focus, and reduced-motion handling. Both themes share one DOM and rule structure. No global override, duplicated mobile tree, legacy stylesheet, or routine `!important` is allowed.

## TS-008 - Test and Measurement Strategy

| Layer | Evidence |
| --- | --- |
| Tool selection | Exact sixteen-record set, category grouping, classification, linked-context resolution, and unmapped-tool findings |
| Activity selection | Exact four-record set, kind-based grouping, and verified field reproduction |
| Relationships | Valid context-link targets, stable order |
| Equivalence | Category/group and semantic identifiers/counts match exactly |
| Capacity | Thirty-two tool records, eight activity records, linear indexed assembly |
| Components | Headings, classification, group labels, link names, no evidence action rendered |
| Integration | Exactly two U-06 bodies added; Contact/Journal remains temporary |
| Security | No unsafe scheme, external request, or cross-origin link |
| Build | Exact JavaScript, CSS, and initial-request inventories with zero evidence bytes |

Rendered review covers four widths, two themes, keyboard order, focus, contrast, non-color cues, summary equivalence, reduced motion, zoom, text spacing, long description wrapping, and overflow. Browser timing is recorded when available and otherwise classified P1.

## TS-009 - Candidate and Activation Strategy

Build an isolated U-06 candidate by composing the approved U-01 through U-05 bodies with the two U-06 bodies. Keep the live registration unchanged until strict P0 gates and explicit rendered-candidate approval pass. Candidate output uses a temporary directory, activation touches only the registry composition seam, and post-activation P0 failure restores the exact pre-switch registration through a recoverable patch.

## Infrastructure, API, and Data Decisions

- No backend, endpoint, database, queue, cache, authentication, analytics, CMS, remote image service, document processor, runtime secret, or infrastructure change is introduced.
- GitHub Pages and Vite static asset semantics remain unchanged.
- Infrastructure Design is unnecessary unless a later approved requirement changes deployment architecture.
- U-06 persists no visitor data.
- `src/data/awards.ts`, `src/data/gallery.ts`, `src/data/videos.ts`, and `src/components/Awards.tsx` are not read, imported, adopted, or deleted by U-06.

## Extension Compliance

- Security Baseline is disabled and not loaded; same-origin, safe-markup, no-network, and publication-boundary controls remain mandatory.
- Property-Based Testing is disabled and not loaded; deterministic malformed tables, doubled-volume fixtures, and repeat-run checks remain mandatory.
