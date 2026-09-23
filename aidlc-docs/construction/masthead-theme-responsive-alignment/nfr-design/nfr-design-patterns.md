# U-02 NFR Design Patterns

## Purpose and Boundary

These patterns convert the approved U-02 quality requirements into a client/build design. They govern a static React presentation, local build tooling, and repository-local evidence. They introduce no API, database, queue, cache, load balancer, circuit breaker, authentication system, telemetry stream, or server monitoring component.

## 1. Isolated Candidate and Atomic Promotion

The candidate uses a separate Vite entry/configuration that composes the proposed masthead, semantic summaries, and six layout corrections against the same approved immutable models used by the active application.

The active entry and all mutation targets are hashed before work begins. Candidate CSS and composition remain unreachable from the active entry graph until review approval. Promotion changes the smallest possible composition/import boundary, then repeats all blocking checks. A failed candidate or post-promotion check retains or restores the prior active presentation.

This pattern satisfies U02-NFR-AVL-003, U02-NFR-SEC-006, and U02-NFR-CMP-004. It also provides the primary fail-safe behavior for SECURITY-15.

## 2. Controlled Theme with Storage Isolation

Theme state remains owned by the existing `PortfolioExperience` controller. The masthead receives the valid current state and one stable callback. It derives the next action without local state.

Preference reads and writes stay behind the existing controller boundary:

- valid stored preference wins;
- otherwise the valid system preference is used;
- otherwise light is the deterministic fallback;
- write failure does not reverse the in-memory selection;
- failure details do not enter visitor text or production diagnostics.

One activation produces one callback and one root-state transition. Repeated rapid activations remain ordinary sequential state transitions; no retry, debounce, request, or background task is introduced.

This pattern satisfies U02-NFR-PER-004, U02-NFR-AVL-002, U02-NFR-REL-004, and U02-NFR-CMP-003.

## 3. Base-First Progressive CSS

Every affected component defines readable base behavior before optional enhancements:

1. semantic source order;
2. base surface and text colors;
3. visible borders and focus;
4. natural wrapping and bounded measures;
5. compact single-column flow;
6. wider grid tracks when space permits;
7. decorative grid/color mixing/backdrop/balanced wrapping only as enhancements;
8. non-essential transitions only outside reduced-motion mode.

Unsupported enhancements cannot remove content, actions, labels, borders, or focus. Forced-colors rules restore system colors and visible outlines where authored decoration becomes unavailable. CSS container/media queries change layout only; they do not select different content trees.

This pattern satisfies U02-NFR-AVL-001, U02-NFR-CMP-002, U02-NFR-USE-007 through U02-NFR-USE-009, and SECURITY-09.

## 4. Pure Linear Semantic Projection

One shared pure projector receives a discriminated relationship, count, or sequence source. Kind-specific validators execute in one pass using bounded sets/maps for uniqueness and endpoint checks. Successful output is immutable and preserves exact membership/order. Invalid input yields normalized blocking findings; intentional emptiness yields a distinct empty result.

The projector never:

- reads DOM/CSS geometry;
- derives facts from color or position;
- resolves raw URLs/paths;
- mutates domain inputs;
- truncates entries;
- emits partial success alongside blocking findings.

The renderer receives only a successful model and selects a semantic list or description structure. This separates correctness from presentation and supports 200 entries within the approved 50 ms/16 MiB focused bounds.

This pattern satisfies U02-NFR-SCL-001, U02-NFR-REL-001, U02-NFR-REL-002, U02-NFR-USE-004, U02-NFR-MNT-001, and U02-P01 through U02-P06.

## 5. Shared Tokens with Domain-Owned Grids

Shared tokens own only cross-domain purposes:

- masthead/action padding and target size;
- compact/intermediate/expanded gaps;
- label-track minimum/maximum bounds;
- heading/body readable measures;
- rule strength and decorative opacity;
- focus-ring width/offset.

Each domain CSS Module owns its component-specific grid and visual language. The six affected components consume the tokens, declare shrinkable tracks through `minmax(0, ...)`, and collapse the same DOM order under their content-appropriate breakpoint. Primary content uses no absolute positioning, fixed content height, transform offset, or manual screenshot-specific break.

This pattern satisfies U02-NFR-MNT-002, U02-NFR-USE-006, U02-NFR-USE-009, and FR-010 through FR-012.

## 6. CSS-First Performance and Stable Membership

Layout changes occur through CSS rather than JavaScript viewport listeners. Component membership is independent of viewport and hydration. The masthead reserves its action region from initial render; optional resume membership is determined by the validated composition model, not inserted asynchronously by U-02.

The unit adds no runtime dependency, request, font, or eager media. Pure projectors remain compact and tree-shakeable. Obsolete visible-table CSS is removed when consumers migrate. The design targets no more than 8 KiB uncompressed initial JS and 12 KiB uncompressed initial CSS growth, candidate CLS at or below 0.1, and no unexpected U-02 interaction shift above 0.01.

This pattern satisfies U02-NFR-PER-001 through U02-NFR-PER-005.

## 7. Layered Accessibility Evidence

Accessibility evidence has independent layers:

- type/pure tests verify semantic membership and rejection;
- component tests verify landmarks, names, actions, DOM order, and hidden structures;
- CSS/token checks verify focus, target, contrast, motion, forced colors, and no hidden-summary overflow rules;
- keyboard tests verify tab order and activation;
- browser cases verify rendered geometry, zoom, spacing, themes, and preferences;
- manual inspection covers behavior an automated engine cannot prove.

The 80 base cases are generated as the Cartesian product of ten sections, four viewports, and two themes. Additional canonical cases cover 200-percent zoom, increased text spacing, reduced motion, forced colors, keyboard focus, and long labels. A pass requires no overlap, clipping, obscured action, lost meaning, or document-level overflow.

This pattern satisfies U02-NFR-USE-001 through U02-NFR-USE-009 and NFR-019.

## 8. Capability-Detected Local Browser Review

A browser adapter exposes capability rather than assuming installation. Each adapter reports engine and version, accepts a canonical case, opens only the local candidate/preview, applies theme and preference state, records metrics, and optionally captures a screenshot.

Unavailable engines produce an honest incomplete outcome. The maintainer may complete that engine's cases through a documented equivalent local manual process, but evidence must identify the manual method and may not claim automation. No source or screenshot is uploaded to a hosted service.

This pattern satisfies U02-NFR-CMP-001, U02-NFR-MNT-005, U02-NFR-SEC-005, and SECURITY-11.

## 9. Before/Candidate/Active Measurement

The evidence collector captures:

- exact initial JS/CSS bytes and chunk ownership from Vite output;
- request graph and absence of new runtime/external requests;
- candidate CLS and U-02 interaction shifts;
- viewport/theme/accessibility case outcomes;
- contrast and target-size measurements;
- test/PBT results and replay data;
- privacy/source/recovery/boundary outcomes.

Measurements are compared at three explicit states: before mutation, isolated candidate, and post-activation. Budget decisions use exact bytes rather than formatted build labels. Any breach becomes a blocking finding unless explicitly reviewed and approved.

This pattern satisfies U02-NFR-PER-002, U02-NFR-PER-003, U02-NFR-PER-005, and U02-NFR-MNT-005.

## 10. Defense-in-Depth Presentation Boundary

The design layers controls:

1. TypeScript accepts only discriminated reviewed models and U-01 capabilities.
2. Pure validators reject malformed, duplicate, unresolved, or unsafe input.
3. React renders labels as text and no unsafe HTML or dynamic execution exists.
4. Static boundary scans reject raw source/tool imports, unsafe rendering, runtime network surfaces, and private-field patterns.
5. Production request/bundle inspection verifies no hidden activation.
6. The U-01 non-echoing privacy scan verifies the final text-bearing candidate/active output.
7. The composite gate denies promotion on any blocker.

Findings use safe codes and repository-relative component/record identifiers. Visitor text never exposes internal failure detail.

This pattern satisfies U02-NFR-SEC-001 through U02-NFR-SEC-007 and SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15.

## 11. Target-Specific Recovery

Before mutation, the recovery preflight records target existence, bytes/hash, current active-entry hash, relevant tracked diff, new-target absence, protected archive hashes, and the bundled/external resume integrity facts inherited from U-01. Payload creation never modifies protected sources.

Restoration is rehearsed in an isolated temporary target. Recovery verification runs before candidate generation and immediately before promotion. Restoration never uses a broad reset and never alters unrelated dirty-worktree changes. The measured rehearsal must remain within 30 minutes.

This pattern satisfies U02-NFR-AVL-004 and SECURITY-15.

## 12. Canonical Evidence and Safe Diagnostics

Machine evidence uses schema-versioned canonical JSON with stable key/record ordering. Deterministic content excludes timestamps; run envelopes may contain timestamps separately. Human review uses Markdown summaries. Blocking commands return non-zero status.

Evidence excludes private markers, absolute user paths, stack traces, storage payloads, unreviewed filenames, and screenshots that reveal content outside the approved page. Error families use stable safe codes.

This pattern satisfies U02-NFR-SEC-004, U02-NFR-REL-002, U02-NFR-MNT-005, and SECURITY-09/15.

## 13. Reused Reproducible PBT Harness

U-02 reuses the U-01 Vitest/`fast-check` configuration and safe generator conventions. New generators create bounded valid/invalid semantic sources, counts, sequences, layout constraints, and optional-action states. A simple reference projector and threshold oracle provide independent comparisons.

Each applicable property runs at least 100 cases under a fixed default seed; shrinking and replay path remain enabled; no test retries. Business-critical shrunk counterexamples become permanent examples. DOM, CSS, storage, and browser behavior remain separate tests.

PBT-02 applies only if Code Generation introduces a codec. PBT-06 is N/A because the modeled core is immutable/stateless.

## 14. Composite Fail-Closed Activation Gate

Promotion requires passing evidence from every owner:

- recovery preflight and rehearsal;
- semantic and masthead validation;
- focused examples and U02-P01 through U02-P10;
- strict TypeScript and ESLint;
- full regression suite;
- accessibility, contrast, focus, target, keyboard, and hidden-summary checks;
- complete rendered-review matrix and supported-engine evidence;
- exact bundle/request/CLS/interaction budgets;
- U-01 privacy, source-integrity, resume-integrity, and browser/tool boundaries;
- explicit candidate approval.

Gate aggregation is conjunctive: `canProceed` is true only when all required gates are complete and have zero blocking findings. Warnings cannot conceal an incomplete required gate. Failure retains the active presentation.

## Infrastructure Pattern Applicability

- **Queues and asynchronous workers**: N/A; all work is local build/test or synchronous UI behavior.
- **Caches**: N/A; theme preference remains the existing local choice, not a cache tier.
- **Circuit breakers and network retries**: N/A; U-02 performs no runtime network call.
- **Database/object storage**: N/A; no persistence service is introduced.
- **Load balancing/autoscaling**: N/A; this is a static client unit.
- **Centralized runtime logging/monitoring**: N/A; U-02 creates local review evidence only. U-06 owns delivery/operational decisions.

## Security and PBT Compliance

All applicable Security Baseline and full PBT rules are incorporated by the patterns above. SECURITY-01 through SECURITY-08, SECURITY-12, and SECURITY-14 are N/A to this unit except SECURITY-04, which is deferred to U-06 hosting design. PBT-06 is N/A; PBT-02 is conditional on a codec. No blocking design finding remains.
