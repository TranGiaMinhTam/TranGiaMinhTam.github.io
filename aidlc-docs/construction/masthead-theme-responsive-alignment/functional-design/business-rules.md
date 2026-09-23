# U-02 Business Rules

## Masthead and Action Rules

- **U02-BR-001**: The masthead is one header landmark and appears before sticky section navigation.
- **U02-BR-002**: Identity is the primary visual element; scientific context, status, and actions remain subordinate.
- **U02-BR-003**: The top action cluster occupies the upper-right region in expanded layouts and follows identity/context in compact DOM order.
- **U02-BR-004**: The theme action must be present, keyboard operable, and labelled with the next state.
- **U02-BR-005**: Theme iconography is decorative. Color or icon shape cannot be the only state cue.
- **U02-BR-006**: Theme state remains controlled by the existing shell controller. U-02 cannot add independent state or a new storage key.
- **U02-BR-007**: A resume action may render only from U-01's validated local PDF capability. Until supplied by the approved composition owner, the slot must be absent rather than disabled.
- **U02-BR-008**: The action group must wrap without overlaying identity, status, navigation, or viewport edges.
- **U02-BR-009**: Decorative marks must be non-semantic and must not reduce text/control contrast.

## Semantic Summary Rules

- **U02-BR-010**: Visible relationship-summary tables must not remain in active sighted layouts.
- **U02-BR-011**: Every removed table must retain equivalent reviewed meaning through `SemanticSummary` or an equally robust hidden semantic structure.
- **U02-BR-012**: Hidden summaries must remain in the accessibility tree and use the shared visually-hidden primitive; `display: none`, `visibility: hidden`, zero font size, and off-screen widths that create overflow are prohibited.
- **U02-BR-013**: Hidden summaries consume no normal layout space and never become horizontally scrollable.
- **U02-BR-014**: The projector preserves exact membership, identifiers, labels, and order. It cannot infer facts from diagrams or style.
- **U02-BR-015**: Duplicate identifiers, unresolved endpoints, invalid counts, or missing required labels are blocking findings.
- **U02-BR-016**: An intentionally empty reviewed source renders no summary. A malformed source cannot masquerade as empty.
- **U02-BR-017**: Concise visible captions may explain a diagram, but they cannot duplicate the complete hidden row set for sighted users.

## Alignment and Reflow Rules

- **U02-BR-018**: Primary layout tracks use bounded flexible sizing such as `minmax(0, ...)`; children that may shrink must have an explicit shrink path.
- **U02-BR-019**: Primary content cannot depend on absolute coordinates, fixed card height, transform offsets, or manual line breaks tied to one viewport.
- **U02-BR-020**: The six supplied defect components retain one semantic source order in every layout variant.
- **U02-BR-021**: Expanded repeated components align to shared grid lines; compact layouts collapse to one logical reading order.
- **U02-BR-022**: Headings use content-aware maximum measures and natural or balanced wrapping without changing factual wording.
- **U02-BR-023**: A single-word final line is improved where reasonable through measure and track changes, but correctness and readability take priority over forced line counts.
- **U02-BR-024**: No component may cause document-level horizontal overflow at the supported viewport, zoom, or text-spacing states.
- **U02-BR-025**: Intentional local horizontal scrolling remains allowed only for the existing section-navigation strip, not for removed relationship summaries or main content.
- **U02-BR-026**: Minimum interactive target and focus-indicator behavior follows WCAG 2.2 AA targets defined by NFR-001.

## Responsive Variant Rules

- **U02-BR-027**: `compact`, `intermediate`, and `expanded` are presentation variants of the same content tree.
- **U02-BR-028**: Variant selection is deterministic for equal constraints.
- **U02-BR-029**: With accessibility constraints unchanged, increasing inline size cannot select a more constrained variant.
- **U02-BR-030**: At 320 CSS pixels, every masthead action and section control remains reachable without document-level horizontal scrolling.
- **U02-BR-031**: At 200-percent zoom and increased text spacing, no content or control is clipped, overlapped, or hidden merely to preserve desktop geometry.
- **U02-BR-032**: Unsupported `text-wrap: balance`, decorative gradients, or grid enhancements degrade to readable natural flow.

## Theme, Motion, and Color Rules

- **U02-BR-033**: Both themes use the same semantic structure and action order.
- **U02-BR-034**: Theme changes affect tokens/root state, not domain data or component membership.
- **U02-BR-035**: Focus remains visible in both themes and forced-colors mode.
- **U02-BR-036**: Reduced-motion preference removes non-essential transitions from the masthead, theme action, progress indicator, and supplied-defect layouts.
- **U02-BR-037**: Decorative background imagery cannot be required to understand grouping, status, or action availability.

## Validation and Activation Rules

- **U02-BR-038**: Every supplied defect receives a named regression example plus rendered review evidence.
- **U02-BR-039**: All ten active sections must be reviewed at 320, 768, 1280, and 1440 CSS pixels in light and dark themes.
- **U02-BR-040**: Representative zoom, text-spacing, keyboard, reduced-motion, and forced-colors states must be reviewed before activation.
- **U02-BR-041**: Focused tests, full tests, strict TypeScript, ESLint, production build, overflow/bundle checks, and U-01 privacy/source boundaries must pass before candidate approval is offered.
- **U02-BR-042**: Candidate approval is separate from Code Generation approval. No visible activation occurs implicitly.
- **U02-BR-043**: Any blocking validation, security, PBT, accessibility, or source-integrity finding retains the prior active presentation.
- **U02-BR-044**: User-visible failure text is generic and contains no stack trace, local path, framework version, hash, raw filename, or private value.

## Edge Scenarios

- **Missing resume capability**: render only the theme action; do not render a placeholder control.
- **Theme persistence failure**: retain the selected in-session theme and suppress internal storage details.
- **Empty reviewed summary**: render no hidden container and no empty table.
- **Broken semantic source**: block candidate activation and identify the owning domain record through non-sensitive development evidence.
- **Long translated or user-scaled labels**: wrap within the control or label track; do not clip or reduce below the established scale.
- **Unsupported modern CSS**: retain readable base surface, rule, order, and spacing.
- **Late-loading fonts**: layout must tolerate metric change without overlapping controls.

## Security Baseline Compliance

- **Compliant**: SECURITY-09 through generic visitor errors and removal of unused visual table behavior; SECURITY-11 through separation of theme, source capability, semantic projection, and view layout plus explicit misuse cases; SECURITY-13 through consumption of typed U-01 capabilities and reviewed semantic models; SECURITY-15 through fail-closed validation and retained active presentation.
- **Inherited/compliant**: SECURITY-10 remains covered by the lockfile and U-01 dependency controls; U-02 Functional Design introduces no dependency.
- **N/A**: SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 because U-02 introduces no persistence store, intermediary, backend logger, API, IAM/network policy, protected endpoint, authentication, credential, or server monitoring boundary.
- **Deferred**: SECURITY-04 belongs to U-06 Infrastructure Design because U-02 cannot control GitHub Pages response headers.
- **Finding status**: No blocking U-02 Functional Design security finding remains.

## Property-Based Testing Compliance

- **PBT-01**: Compliant; ten named U02-P01 through U02-P10 properties are defined in the business logic model.
- **PBT-02**: Applicable to summary normalization/serialization only if Code Generation introduces a codec; otherwise N/A with confirmation in its plan.
- **PBT-03**: Applicable to membership, order, rejection, count safety, layout selection, theme, and optional-action invariants.
- **PBT-04**: Applicable to summary normalization idempotence.
- **PBT-05**: Applicable through a simple reference projection and layout-threshold oracle.
- **PBT-06**: N/A; the designed business core is immutable and stateless.
- **PBT-07**: Applicable; generators must create valid/invalid semantic sources and bounded layout constraints, not arbitrary CSS strings.
- **PBT-08**: Applicable; shrinking, fixed seed/path replay, and no silent retry are required.
- **PBT-09**: Compliant through U-01's approved exact `fast-check` integration.
- **PBT-10**: Applicable; concrete DOM, accessibility, storage, CSS, and screenshot regressions remain mandatory alongside properties.
- **Finding status**: No blocking U-02 Functional Design PBT finding remains.
