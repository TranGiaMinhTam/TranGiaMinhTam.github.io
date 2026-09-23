# U-02 Logical Components

## Design Intent

The components below are logical owners, not a mandate for one file per item. Code Generation may consolidate trivial wrappers, but it must preserve single ownership, one-way dependencies, safe failure behavior, and the approved evidence gates.

## Runtime Presentation Components

### LC-01 Masthead Presentation Builder

- **Responsibility**: Validate public identity/status labels, derive next-theme semantics, and combine the optional validated resume capability into one immutable presentation model.
- **Inputs**: Reviewed masthead identity, controlled theme state/callback, optional U-01 resume capability.
- **Outputs**: Ready presentation or normalized blocking findings.
- **Dependencies**: U-01 capability types and shell theme types only.
- **Failure owner**: Composition/candidate gate; invalid input cannot render partially.
- **NFRs**: U02-NFR-SEC-001, U02-NFR-REL-004, U02-NFR-MNT-001.

### LC-02 Specimen Masthead View

- **Responsibility**: Render the header landmark, identity hierarchy, scientific context/status, decorative marks, and wrap-safe top action cluster.
- **Inputs**: Validated masthead presentation and stable callbacks.
- **Outputs**: Semantic React tree with stable test identifiers.
- **State**: None.
- **Failure behavior**: Decoration degrades; required invalid model is blocked upstream.
- **NFRs**: U02-NFR-PER-005, U02-NFR-USE-002, U02-NFR-USE-003, U02-NFR-USE-009.

### LC-03 Controlled Theme Action

- **Responsibility**: Label the next theme action, provide visible focus/target geometry, and invoke the existing controller once.
- **Inputs**: Valid current theme and `onToggle`.
- **Outputs**: Native button activation.
- **State**: None; preference handling remains in the controller.
- **Failure behavior**: Storage failure is absorbed by the existing boundary; session state remains active.
- **NFRs**: U02-NFR-PER-004, U02-NFR-AVL-002, U02-NFR-REL-004, U02-NFR-CMP-003.

### LC-04 Semantic Summary Projector

- **Responsibility**: Validate and project relationship/count/sequence sources in one deterministic linear pass.
- **Inputs**: Discriminated reviewed domain source.
- **Outputs**: `ready`, `empty`, or `blocked` result.
- **Data structures**: Bounded sets/maps for unique identifiers and endpoint membership.
- **State/concurrency**: Pure, immutable, synchronous, and reentrant.
- **Failure behavior**: No partial success; stable safe findings.
- **NFRs**: U02-NFR-SCL-001, U02-NFR-REL-001 through REL-003, U02-NFR-USE-004.

### LC-05 Hidden Semantic Renderer

- **Responsibility**: Render labelled list/description semantics through the shared visually-hidden primitive.
- **Inputs**: Successful semantic summary model only.
- **Outputs**: Accessibility-tree content with no visible table/normal-flow footprint.
- **State**: None.
- **Failure behavior**: `empty` produces no view; `blocked` cannot reach the renderer.
- **NFRs**: U02-NFR-USE-004, U02-NFR-MNT-001.

### LC-06 Shared Layout Token Contract

- **Responsibility**: Own purpose-named masthead/action gaps, measures, target sizes, rule/focus geometry, and decorative opacity.
- **Inputs**: Light/dark root tokens and accessibility media states.
- **Outputs**: CSS custom properties consumed by shell/domain modules.
- **Constraint**: Does not own domain color identity or component grids.
- **NFRs**: U02-NFR-MNT-002, U02-NFR-USE-002, U02-NFR-USE-003.

### LC-07 Domain Alignment Adapters

- **Responsibility**: Apply the approved shared constraints within the six existing domain components while preserving source order and visual identity.
- **Owners**: Laboratory stations, computational header, question introduction, data signal sheet, academic header, and evidence spectrum.
- **Inputs**: Existing validated view models and shared tokens.
- **Outputs**: Domain-specific bounded grids with compact fallbacks.
- **State**: None beyond existing supplemental emphasis interactions.
- **NFRs**: U02-NFR-USE-005 through USE-009, U02-NFR-CMP-002.

## Build and Review Components

### LC-08 Recovery Preflight

- **Responsibility**: Capture/reconcile U-02 target states, active-entry hash, dirty-worktree payload, protected sources, and restoration instructions before mutation.
- **Outputs**: Manifest, payload, source hashes, and rehearsal evidence.
- **Failure behavior**: Any incomplete/unverified recovery state blocks all mutation.
- **NFRs**: U02-NFR-AVL-004.

### LC-09 Candidate Composition

- **Responsibility**: Compose proposed U-02 runtime components and CSS in an isolated Vite entry without changing the active entry graph.
- **Inputs**: Same approved domain models/registries as the active app.
- **Outputs**: Candidate build and local preview.
- **Constraint**: Cannot import raw archive sources or Node governance tooling.
- **NFRs**: U02-NFR-AVL-003, U02-NFR-SEC-006.

### LC-10 Render Case Generator

- **Responsibility**: Produce canonical cases from section, viewport, theme, zoom, text-spacing, motion, forced-colors, focus, and label-fixture dimensions.
- **Outputs**: Stable case identifiers and ordered case records.
- **State**: Pure and deterministic.
- **Scale**: At least 80 base cases plus named accessibility variants.
- **NFRs**: U02-NFR-USE-001, U02-NFR-USE-005 through USE-009.

### LC-11 Local Browser Adapter

- **Responsibility**: Probe engine/version, apply one render case to the local candidate, collect geometry/CLS/focus/overflow results, and optionally capture a necessary screenshot.
- **Inputs**: Local preview URL and canonical case.
- **Outputs**: Ready, unavailable, or failed safe result.
- **Concurrency**: Code Generation defines a bounded local job count; correctness cannot depend on execution order.
- **Failure behavior**: Engine absence is honest/incomplete, never a false pass. Manual equivalent evidence is separately identified.
- **NFRs**: U02-NFR-CMP-001, U02-NFR-MNT-005.

### LC-12 Accessibility Evidence Collector

- **Responsibility**: Join semantic/component, keyboard, contrast, focus, target-size, motion, forced-colors, zoom, spacing, and rendered evidence by stable requirement ID.
- **Outputs**: Complete/incomplete/blocked result with safe findings.
- **Constraint**: Automated scans cannot mark manual/rendered-only checks complete.
- **NFRs**: U02-NFR-USE-001 through USE-009.

### LC-13 Bundle and Request Measurer

- **Responsibility**: Measure exact initial JS/CSS bytes, chunk attribution, local/external request graph, and before/candidate/active deltas.
- **Inputs**: Vite manifests/build outputs and candidate case network evidence.
- **Outputs**: Canonical measurements and budget findings.
- **Failure behavior**: Missing baseline or unexplained breach blocks promotion.
- **NFRs**: U02-NFR-PER-001 through PER-003.

### LC-14 Layout Stability Measurer

- **Responsibility**: Record candidate CLS and theme/action interaction shifts using the local browser adapter.
- **Thresholds**: CLS at or below 0.1; unexpected U-02 interaction shift at or below 0.01.
- **Failure behavior**: Missing measurement or threshold breach blocks promotion unless explicitly reviewed under the NFR process.
- **NFRs**: U02-NFR-PER-005.

### LC-15 Boundary and Privacy Verifier

- **Responsibility**: Extend/reuse scans for unsafe rendering, network APIs, raw source/tool imports, private marker leakage, production text, initial bundle isolation, and U-01 source/resume integrity.
- **Outputs**: Safe normalized findings only.
- **Constraint**: Private marker remains ephemeral and non-echoing.
- **NFRs**: U02-NFR-SEC-001 through SEC-007.

### LC-16 U-02 PBT Harness

- **Responsibility**: Provide constrained semantic/layout/action generators, reference projectors/oracles, fixed seed, at least 100 runs, shrinking, replay, and no retry for U02-P01 through U02-P10.
- **Dependencies**: Reuses exact U-01 Vitest/`fast-check` configuration.
- **Failure behavior**: Property failure is blocking and records only non-sensitive replay data.
- **NFRs**: U02-NFR-REL-001 through REL-006.

### LC-17 Canonical Evidence Writer

- **Responsibility**: Write schema-versioned deterministic JSON and human Markdown review summaries using safe repository-relative identifiers.
- **Inputs**: Results from review/measurement/verifier components.
- **Outputs**: Atomic evidence artifacts and non-zero blocking exit state.
- **Failure behavior**: Incomplete write or invalid schema blocks promotion and retains prior evidence/active output.
- **NFRs**: U02-NFR-SEC-004, U02-NFR-MNT-005.

### LC-18 Composite Activation Gate

- **Responsibility**: Require every mandatory gate, zero blocking findings, and explicit candidate approval before allowing one reversible activation change.
- **Inputs**: Recovery, focused/PBT/full tests, TypeScript/lint, accessibility, rendered matrix, compatibility, budgets, privacy/source/boundary evidence, and approval record.
- **Outputs**: `canProceed` plus stable finding summary.
- **Failure behavior**: Missing evidence is blocking; no partial activation.
- **NFRs**: U02-NFR-AVL-003, U02-NFR-SEC-006, U02-NFR-MNT-003.

## Dependency Direction

The dependency order is one-way:

1. Existing reviewed domain models and U-01 capabilities.
2. Pure masthead/semantic presentation contracts.
3. Runtime views and domain alignment CSS.
4. Candidate composition.
5. Independent test/review/measurement adapters.
6. Canonical evidence writer.
7. Composite activation gate.

Runtime browser code cannot import recovery, filesystem, measurement, browser-orchestration, privacy-scan, or PBT generator modules. Review tooling cannot mutate protected sources. The activation gate consumes evidence; evidence tools cannot self-authorize activation.

## State and Concurrency Boundaries

- Theme state remains the only U-02 runtime state and is controlled by the existing hook.
- Semantic projection, layout-case generation, and gate aggregation are pure/immutable.
- CSS owns responsive physical layout; no resize listener or viewport store is introduced.
- Browser-review jobs may be bounded and parallelized later, but evidence ordering is canonical and execution order cannot affect results.
- No background worker, timer retry, queue, cache, or circuit breaker exists.

## Failure Ownership

- Invalid masthead/capability: LC-01, blocks candidate composition.
- Invalid semantic source: LC-04, blocks affected candidate and activation.
- CSS/browser enhancement unavailable: LC-07/LC-11, readable fallback plus explicit evidence status.
- Storage failure: existing theme controller, in-session success with safe suppression.
- Budget/CLS breach: LC-13/LC-14, blocks promotion pending explicit NFR deviation approval.
- Accessibility/rendered case failure: LC-12, blocks promotion.
- Privacy/source/boundary failure: LC-15, blocks promotion.
- Evidence write/schema failure: LC-17, blocks promotion.
- Missing approval or gate: LC-18, retains active presentation.

## Acceptance Gate Mapping

- **Recovery gate**: LC-08.
- **Functional correctness gate**: LC-01, LC-04, LC-16 plus focused examples.
- **Presentation/accessibility gate**: LC-02, LC-03, LC-05 through LC-07, LC-10 through LC-12.
- **Performance gate**: LC-13 and LC-14.
- **Security/privacy/integrity gate**: LC-15.
- **Evidence gate**: LC-17.
- **Promotion gate**: LC-18.

## Infrastructure Components Marked N/A

No queue, cache, circuit breaker, database, object store, load balancer, autoscaling group, API gateway, IAM role, private network, centralized runtime logger, alert, or monitoring dashboard is introduced. These would add unrelated operational surface to a static client layout unit. U-06 remains responsible for response headers and delivery/operations design.

## Security Baseline Compliance

- SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are satisfied by LC-01, LC-04, LC-08, LC-09, LC-13, LC-15, LC-17, and LC-18.
- SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 are N/A because their infrastructure/authentication boundaries do not exist.
- SECURITY-04 is deferred to U-06 Infrastructure Design.
- No blocking security design finding remains.

## Property-Based Testing Compliance

- PBT-01 through PBT-05 and PBT-07 through PBT-10 are owned by LC-04, LC-10, and LC-16.
- PBT-02 becomes applicable only if a codec appears in Code Generation; otherwise it remains explicitly N/A.
- PBT-06 is N/A because the business core is immutable and stateless.
- Example/component/style/browser tests remain independent and mandatory.
- No blocking PBT design finding remains.
