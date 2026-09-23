# NFR Requirements - U-02 Masthead, Theme, and Responsive Alignment

## Scope and Acceptance Semantics

These requirements govern U-02's masthead, top actions, theme presentation, hidden semantic summaries, six alignment corrections, shared layout contracts, and visible candidate activation. They do not govern resume-content reconciliation, archive discovery, media dialogs, backend services, or hosting response headers.

`P0` requirements are blocking. `P1` requirements are also blocking unless a measured deviation is documented and explicitly approved before activation.

## Scalability

### U02-NFR-SCL-001 - Semantic summary capacity

- **Priority**: P0.
- **Requirement**: A relationship, count, or sequence projection must support at least 200 reviewed entries in one deterministic linear pass without truncation, duplicate output identifiers, architecture change, or visible layout work.
- **Acceptance**: A generated capacity fixture preserves all identifiers and order, completes within 50 ms on the documented Node 20 CI reference, and adds no more than 16 MiB RSS during the focused process measurement.
- **Traceability**: US-008, NFR-004, U02-P01 through U02-P06.

### U02-NFR-SCL-002 - Static section capacity

- **Priority**: P1.
- **Requirement**: The shared shell/layout contract must continue to support the current ten active sections and at least twelve registered sections without a new navigation architecture, duplicated shell, or backend.
- **Acceptance**: A twelve-section fixture retains unique landmarks, stable order, reachable navigation targets, and no document-level overflow at required widths.

### U02-NFR-SCL-003 - Growth review trigger

- **Priority**: P1.
- **Requirement**: More than 200 entries in one summary, more than twelve sections, or a measured budget breach triggers explicit review; it never silently truncates content or authorizes a service migration.
- **Acceptance**: Boundary fixtures emit stable non-sensitive findings and documentation names the review path.

## Performance and Layout Stability

### U02-NFR-PER-001 - No new runtime surface

- **Priority**: P0.
- **Requirement**: U-02 adds no runtime dependency, eagerly loaded media, telemetry, fetch, external font/resource, or other runtime network request.
- **Acceptance**: Package diff, import-boundary scan, and production request/manifest inspection.
- **Security mapping**: SECURITY-10, SECURITY-11, SECURITY-13.

### U02-NFR-PER-002 - Initial JavaScript budget

- **Priority**: P1.
- **Requirement**: Capture a fresh production baseline immediately before U-02 mutation. U-02 should add no more than 8 KiB uncompressed initial JavaScript and must remain within the previously approved application ceiling. Any larger or ceiling-breaking increase blocks activation pending measured explanation and explicit approval.
- **Acceptance**: Before/candidate/active Vite manifest measurement with exact bytes, chunk attribution, and delta.

### U02-NFR-PER-003 - Initial CSS budget

- **Priority**: P1.
- **Requirement**: U-02 should add no more than 12 KiB uncompressed initial CSS and must remove obsolete visible-table rules where possible. Any larger increase blocks activation pending attribution and explicit approval.
- **Acceptance**: Before/candidate/active CSS byte report plus selector ownership review.

### U02-NFR-PER-004 - Immediate theme response

- **Priority**: P0.
- **Requirement**: Activating the theme control invokes the existing controller exactly once and updates the root theme state synchronously within that user interaction, without a loading state or runtime request.
- **Acceptance**: Component/integration tests verify callback count, root state, accessible next-action label, and storage-failure behavior.

### U02-NFR-PER-005 - Layout stability

- **Priority**: P0.
- **Requirement**: U-02 introduces no avoidable shift from late action insertion, unsized media, font-dependent fixed heights, or hydration-dependent component membership. Candidate lab CLS must remain at or below 0.1, and U-02-owned interactions must not produce an unexpected shift above 0.01.
- **Acceptance**: Rendered measurement plus inspection of action/media dimensions and candidate interaction evidence.

## Availability and Recovery

### U02-NFR-AVL-001 - Enhancement degradation

- **Priority**: P0.
- **Requirement**: If color mixing, decorative gradients, backdrop blur, balanced wrapping, or another optional CSS enhancement is unsupported, the page retains readable source order, actions, borders, focus, and base surfaces.
- **Acceptance**: CSS fallback inspection and representative browser/forced-feature review.

### U02-NFR-AVL-002 - Theme storage degradation

- **Priority**: P0.
- **Requirement**: Local preference read/write failure cannot prevent an in-session theme change or expose internal error details.
- **Acceptance**: Storage-throw examples verify the active state and generic behavior.

### U02-NFR-AVL-003 - Retained active presentation

- **Priority**: P0.
- **Requirement**: The current active presentation remains unchanged until the isolated candidate passes every blocking gate and receives explicit approval. Candidate failure cannot partially activate masthead or domain CSS.
- **Acceptance**: Entry/hash preflight, isolated candidate proof, and activation-gate evidence.

### U02-NFR-AVL-004 - Recovery objective

- **Priority**: P0.
- **Requirement**: Every U-02 mutation target must be restorable to its pre-unit content or absence state within 30 minutes using repository-local recovery evidence and without editor history.
- **Acceptance**: Target-specific recovery manifest and isolated restoration rehearsal.

Server uptime, multi-region failover, disaster recovery infrastructure, and deployment monitoring are N/A to this static client unit. U-06 owns hosting and delivery controls.

## Security and Privacy

### U02-NFR-SEC-001 - Typed presentation inputs

- **Priority**: P0.
- **Requirement**: Masthead actions and summaries accept only typed reviewed models and U-01 validated capabilities. Raw local paths, unreviewed filenames, arbitrary URLs, or unvalidated semantic rows cannot reach rendered attributes/content.
- **Acceptance**: Type/API inspection, negative examples, and import/source scans.
- **Security mapping**: SECURITY-11, SECURITY-13.

### U02-NFR-SEC-002 - No unsafe rendering

- **Priority**: P0.
- **Requirement**: U-02 uses normal React text rendering and safe attributes. It introduces no unsafe HTML injection, SVG foreign content, script-bearing URL, dynamic code execution, or external content embedding.
- **Acceptance**: Static boundary scan and component tests with adversarial labels/capabilities.
- **Security mapping**: SECURITY-09, SECURITY-11.

### U02-NFR-SEC-003 - Phone privacy inheritance

- **Priority**: P0.
- **Requirement**: The private phone marker remains absent from models, markup, structured data, CSS, tests, snapshots, diagnostics, and production text output. Only the byte-verified resume PDF may contain it.
- **Acceptance**: Final non-echoing U-01 privacy scan after candidate build and after activation.

### U02-NFR-SEC-004 - Generic findings and failures

- **Priority**: P0.
- **Requirement**: Visitor-facing and review findings never disclose stack traces, absolute paths, hashes, framework versions, raw source values, storage payloads, or private information.
- **Acceptance**: Failure-result content tests and evidence scan.
- **Security mapping**: SECURITY-09, SECURITY-15.

### U02-NFR-SEC-005 - No new network or collection

- **Priority**: P0.
- **Requirement**: Theme, resume-slot geometry, layout review, and semantic-summary behavior add no analytics, telemetry, API, upload, external converter, or cross-origin request.
- **Acceptance**: Dependency/source inspection and production request evidence.

### U02-NFR-SEC-006 - Fail-closed activation

- **Priority**: P0.
- **Requirement**: Invalid semantic input, source/privacy failure, boundary breach, accessibility failure, recovery failure, or incomplete rendered review denies activation and retains the prior active presentation.
- **Acceptance**: Failure-path examples and candidate gate report.
- **Security mapping**: SECURITY-11, SECURITY-15.

### U02-NFR-SEC-007 - Misuse-case coverage

- **Priority**: P0.
- **Requirement**: Tests cover unsafe labels/URLs, duplicate or broken semantic rows, negative/non-finite counts, oversized labels, missing optional actions, storage failure, unsupported enhancements, forced colors, reduced motion, rapid theme activation, and attempted direct candidate activation.
- **Acceptance**: Traceable example/PBT inventory with no applicable case omitted.
- **Security mapping**: SECURITY-11.

## Reliability and Determinism

### U02-NFR-REL-001 - Projection determinism

- **Priority**: P0.
- **Requirement**: Equal valid semantic input produces structurally equal summary output with identical membership and order.
- **Acceptance**: Examples and U02-P01 through U02-P04.

### U02-NFR-REL-002 - Invalid-input consistency

- **Priority**: P0.
- **Requirement**: Equivalent invalid input produces the same deduplicated blocking findings in stable code/target order and never a partial successful model.
- **Acceptance**: Example/property comparison across shuffled equivalent findings.

### U02-NFR-REL-003 - Layout selection determinism

- **Priority**: P0.
- **Requirement**: Equal bounded constraints select the same variant, and increasing inline size without stronger accessibility constraints never selects a more constrained variant.
- **Acceptance**: U02-P07 and U02-P08 against a simple threshold oracle.

### U02-NFR-REL-004 - Theme action correctness

- **Priority**: P0.
- **Requirement**: The next theme is always the opposite valid state; two successful toggles return to the original state; one activation invokes one callback.
- **Acceptance**: U02-P09 plus concrete DOM/storage examples.

### U02-NFR-REL-005 - Reproducible PBT

- **Priority**: P0.
- **Requirement**: Each applicable property runs at least 100 cases by default using constrained domain generators, shrinking, visible seed/path replay, and no silent retry. Business-critical shrunk counterexamples become permanent concrete regressions.
- **Acceptance**: Test configuration and deliberate replay evidence.

### U02-NFR-REL-006 - Complementary rendered evidence

- **Priority**: P0.
- **Requirement**: Property tests cannot replace DOM, accessibility, CSS-contract, storage-failure, browser, or rendered-review evidence.
- **Acceptance**: Test inventory distinguishes properties, examples, component tests, style checks, and rendered cases.

## Maintainability

### U02-NFR-MNT-001 - Single ownership

- **Priority**: P0.
- **Requirement**: Theme state remains owned by the existing controller; semantic projection has one shared owner; masthead/action composition has one typed contract; domain visuals retain their own CSS.
- **Acceptance**: Import/dependency review and duplicate-policy search.

### U02-NFR-MNT-002 - Shared semantic tokens

- **Priority**: P0.
- **Requirement**: Cross-domain gaps, label bounds, heading measures, masthead spacing, action sizes, and decoration opacity use purpose-named shared tokens. Component-specific visual identity remains locally scoped.
- **Acceptance**: Token/selector inventory with no unexplained repeated constants across the six fixes.

### U02-NFR-MNT-003 - Strict quality gate

- **Priority**: P0.
- **Requirement**: New/changed TypeScript passes strict compilation and ESLint with no unexplained warning; CSS passes focused contract checks and contains no routine `!important` or rejected presentation pattern.
- **Acceptance**: Exact command evidence and boundary report.

### U02-NFR-MNT-004 - Stable automation contracts

- **Priority**: P0.
- **Requirement**: Interactive elements use stable purpose-based test identifiers. IDs and accessible names cannot depend on viewport, index where identity is available, or generated layout state.
- **Acceptance**: Component/source review and focused tests.

### U02-NFR-MNT-005 - Actionable review documentation

- **Priority**: P1.
- **Requirement**: Commands, browser/runtime context, viewport/theme cases, zoom/text-spacing method, screenshots, measurements, PBT seed/path, fallback behavior, and recovery steps are documented without private data or absolute user paths.
- **Acceptance**: A maintainer can repeat the review from repository-relative instructions.

## Compatibility

### U02-NFR-CMP-001 - Runtime/browser baseline

- **Priority**: P0.
- **Requirement**: Production behavior supports current stable Chromium, Firefox, and Safari engines, including representative iOS Safari. CI remains Node 20 compatible.
- **Acceptance**: Documented engine/version evidence at review time and Node 20 CI results.

### U02-NFR-CMP-002 - Progressive CSS

- **Priority**: P0.
- **Requirement**: Optional CSS enhancements use feature-safe fallbacks. No browser-specific component tree, user-agent sniffing, or content omission is allowed.
- **Acceptance**: CSS inspection plus representative cross-engine rendering.

### U02-NFR-CMP-003 - Theme equivalence

- **Priority**: P0.
- **Requirement**: Light, dark, reduced-motion, and forced-colors states preserve the same content, action order, and relationship meaning.
- **Acceptance**: DOM equivalence tests and rendered review.

### U02-NFR-CMP-004 - Existing route and shell behavior

- **Priority**: P0.
- **Requirement**: Section hashes, progress, sticky navigation, Journal routing, contact actions, theme persistence, and GitHub Pages base-path behavior remain functional.
- **Acceptance**: Focused and full regression tests plus candidate route/hash review.

## Accessibility and Usability

### U02-NFR-USE-001 - WCAG evidence model

- **Priority**: P0.
- **Requirement**: Target WCAG 2.2 AA through combined semantic/component tests, automated checks where supported, keyboard review, numeric visual checks, and rendered review. No single automated score is sufficient.
- **Acceptance**: Evidence index maps each applicable behavior to at least one executable or recorded check.

### U02-NFR-USE-002 - Contrast thresholds

- **Priority**: P0.
- **Requirement**: Normal text reaches at least 4.5:1; large text and meaningful UI graphics reach at least 3:1; focus indicators meet applicable 3:1 adjacent-color contrast. Decorative non-semantic marks may be lower but cannot obscure content.
- **Acceptance**: Token and representative computed-color measurements in both themes.

### U02-NFR-USE-003 - Target size and keyboard

- **Priority**: P0.
- **Requirement**: Masthead actions meet WCAG 2.2 AA Target Size Minimum through at least 24 by 24 CSS pixels or sufficient spacing, retain larger existing sizing where practical, and are fully keyboard operable with no trap or obscured focus.
- **Acceptance**: Computed geometry, tab-order, Enter/Space, and focus-visibility evidence.

### U02-NFR-USE-004 - Hidden semantic equivalence

- **Priority**: P0.
- **Requirement**: Every removed visible relationship table retains equivalent membership, labels, relationships/counts, and order in a labelled hidden list or description structure that remains in the accessibility tree and consumes no visual layout space.
- **Acceptance**: DOM/accessibility-tree assertions and membership/order properties.

### U02-NFR-USE-005 - Required rendered matrix

- **Priority**: P0.
- **Requirement**: Review all ten active sections at 320, 768, 1280, and 1440 CSS pixels in both themes, producing at least 80 base cases. Add representative 200-percent zoom and increased-text-spacing cases.
- **Acceptance**: Every case records no overlap, clipping, obscured action, lost meaning, or document-level horizontal overflow.

### U02-NFR-USE-006 - Shared alignment and logical order

- **Priority**: P0.
- **Requirement**: Repeated components align to shared tracks at wide widths and collapse into the same logical source order at constrained widths.
- **Acceptance**: Named evidence for laboratory stations, computational header, question introduction, data signal sheet, academic header, and evidence spectrum.

### U02-NFR-USE-007 - Zoom and text spacing

- **Priority**: P0.
- **Requirement**: At 200-percent zoom and WCAG text-spacing overrides, no content/action is clipped, overlapped, hidden, or made unreachable; the document has no horizontal overflow.
- **Acceptance**: Representative rendered cases and overflow geometry checks.

### U02-NFR-USE-008 - Motion and forced colors

- **Priority**: P0.
- **Requirement**: Reduced motion removes non-essential transitions. Forced colors preserves identity hierarchy, borders, focus, status/action recognition, and content order without relying on decorative backgrounds.
- **Acceptance**: Media-query/style tests and rendered review.

### U02-NFR-USE-009 - Heading and label reflow

- **Priority**: P1.
- **Requirement**: Content-aware measures and natural/balanced wrapping avoid awkward fragments where reasonable without changing factual text, using manual screenshot-specific line breaks, or reducing text below the approved scale.
- **Acceptance**: Long-label fixtures and named rendered comparisons across the required widths.

## Security Baseline Compliance

- **Compliant/applicable**: SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are represented by generic failures, no new runtime/dependency surface, separated typed boundaries, source/capability integrity, misuse cases, and fail-closed activation/recovery.
- **N/A to U-02**: SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 because the unit adds no persistence service, intermediary, backend logging, API, IAM/network policy, protected endpoint, authentication/session, credential, or server monitoring stream.
- **Deferred**: SECURITY-04 is assigned to U-06 Infrastructure Design because static component work cannot guarantee hosting response headers.
- **Blocking findings**: None.

## Property-Based Testing Compliance

- **PBT-01**: Satisfied by U02-P01 through U02-P10 in approved Functional Design.
- **PBT-02**: Conditional; required if Code Generation introduces summary encode/decode or serialization, otherwise explicitly N/A.
- **PBT-03 through PBT-05**: Applicable to invariants, idempotence, and reference-oracle comparison.
- **PBT-06**: N/A because the business core is pure and stateless.
- **PBT-07 and PBT-08**: Applicable through constrained semantic/layout generators, 100-run minimum, shrinking, visible replay, and no retry.
- **PBT-09**: Satisfied by the exact `fast-check` 4.10.2 and Vitest integration approved in U-01.
- **PBT-10**: Applicable; examples, component tests, CSS checks, and rendered evidence remain mandatory.
- **Blocking findings**: None.
