# NFR Requirements - U-02 Scientific Shell

## Scope and Acceptance Semantics

These requirements apply to the new global shell, navigation/progress controller, root theme controller, responsive shell styles, and active-entry migration. `P0` requirements block the U-02 entry switch when unmet. `P1` requirements require evidence and an explicit disposition for any environmental limitation. U-01 requirements remain inherited and cannot be weakened.

## NFR Summary

| ID | Category | Priority | Measurable target |
| --- | --- | --- | --- |
| U02-NFR-SCL-001 | Scalability | P1 | Handle at least 2x approved shell metadata and event-fixture volume with one controller and linear processing. |
| U02-NFR-PER-001 | JavaScript | P0 | Initial minified JavaScript after shell activation is at most 300 KiB, or 307,200 bytes. |
| U02-NFR-PER-002 | CSS | P0 | Initial CSS after shell activation is at most 50 KiB, or 51,200 bytes. |
| U02-NFR-PER-003 | Interaction timing | P0 | Deliberate state changes within 100 ms; stable progress settles within 200 ms of normalized visibility input. |
| U02-NFR-PER-004 | Scheduling | P0 | At most one geometry fallback evaluation per animation frame and no per-section scroll listener. |
| U02-NFR-AVL-001 | Capability availability | P0 | Core shell remains usable when each browser capability is individually unavailable. |
| U02-NFR-AVL-002 | Migration continuity | P0 | Failed entry preconditions leave the prior recoverable state intact; verified rollback remains executable. |
| U02-NFR-SEC-001 | Static privacy | P0 | No network runtime, analytics, secrets, personal-data persistence, unsafe HTML, raw evidence, or unsafe destination. |
| U02-NFR-SEC-002 | Input boundaries | P0 | Only registered hashes and valid theme values affect shell state; storage contains only the theme string. |
| U02-NFR-SEC-003 | Dependency exposure | P0 | No new dependency; no Chakra or Tailwind presentation import in the active shell; active runtime imports are audited. |
| U02-NFR-REL-001 | Determinism | P0 | Repeated identical transitions produce identical state/history results without loops or races. |
| U02-NFR-REL-002 | Lifecycle safety | P0 | One observer/fallback lifecycle; all listeners, frames, and subscriptions are cleaned up. |
| U02-NFR-MNT-001 | Quality gate | P0 | Strict types, focused and full tests, lint, build, boundaries, and documented contracts pass. |
| U02-NFR-MNT-002 | Ownership | P0 | Shell owns navigation, progress, theme, and slots; later units cannot create parallel controllers. |
| U02-NFR-USE-001 | Accessibility | P0 | Applicable WCAG 2.2 AA shell checks pass automatically and manually in both themes. |
| U02-NFR-USE-002 | Responsive usability | P0 | No document overflow, hidden navigation, clipped focus, or obscured target at 320, 768, 1280, and 1440 CSS pixels. |
| U02-NFR-CMP-001 | Browser compatibility | P1 | Latest two stable Chrome, Edge, Firefox, and Safari majors plus current iOS Safari and Android Chrome. |
| U02-NFR-EVD-001 | Review evidence | P0 | Exact commands, versions, manifests, results, viewport/theme review, warnings, and rollback status are recorded. |

## Scalability Requirements

### U02-NFR-SCL-001 - Bounded Shell Growth

- Pure registry, navigation-model, visibility-winner, and progress derivation functions must accept at least twice the approved metadata count without schema changes.
- Test fixtures must simulate at least twice the normal navigation and visibility event sequence while retaining deterministic final state.
- Processing remains linear in section count per normalized observation batch; lookup of IDs remains keyed.
- The controller count remains one, listener count remains constant with respect to section count, and no per-section persistence is introduced.
- This target validates architecture rather than authorizing more than the approved ten visible sections.

**Acceptance method**: Doubled-volume structural fixtures, listener-count assertions, repeated-run equality, and source-boundary inspection.

## Performance Requirements

### U02-NFR-PER-001 - Shell JavaScript Headroom

- After the active entry renders the U-02 shell, all initial minified JavaScript must total no more than 307,200 bytes.
- This limit includes React, the entry, shell, navigation/progress, theme, temporary section slots, and all eager dependencies.
- It excludes only chunks confirmed absent from the initial Vite entry graph.
- The result must be below the U-01 baseline of 893,367 bytes and must not introduce a greater-than-10-percent regression against any later approved comparable baseline.

**Acceptance method**: Production Vite manifest traversal with exact emitted bytes and supplemental deterministic gzip values.

### U02-NFR-PER-002 - Shell CSS Headroom

- Initial CSS must total no more than 51,200 bytes after the active switch.
- The shell may consume U-01 tokens and foundation styles plus locally owned shell styles.
- Rejected global overrides, Chakra style runtime, Tailwind utility composition, and duplicate theme trees cannot enter the new active presentation.

**Acceptance method**: Exact emitted CSS bytes, source/style boundary inspection, and selector inventory.

### U02-NFR-PER-003 - Interaction Timing

- A deliberate section navigation or theme toggle must update shell state within 100 ms of the input event under an idle local browser profile.
- Progress must settle within 200 ms after the controller receives a stable normalized visibility batch.
- Hash parsing, progress derivation, theme resolution, and winner selection are synchronous pure operations; scrolling duration is not counted as state-response latency.
- Measurements record hardware, browser, mode, sample count, and percentile or worst-case method rather than claiming universal network latency.

**Acceptance method**: Fake-timer component tests plus a repeatable local rendered timing check in an available target browser.

### U02-NFR-PER-004 - Bounded Browser Work

- The geometry fallback schedules at most one read batch per animation frame.
- One observer instance or one fallback controller handles all registered targets.
- Passive state updates that do not change the winner produce no React state update or history write.
- Scroll and resize handlers are passive where appropriate and perform no layout writes during the measurement phase.

**Acceptance method**: Adapter-spy tests for scheduling, observer count, listener count, state update count, and cleanup.

## Availability and Continuity Requirements

### U02-NFR-AVL-001 - Capability Degradation

The shell must render its landmarks, ten real navigation links, theme control, progress text, and all section targets when any one of these is unavailable or throws:

- `IntersectionObserver`: use one throttled geometry fallback.
- Geometry measurement: retain the last valid section and native hash navigation.
- History API: use native hash behavior without synthetic push/replace control.
- `localStorage`: use in-memory theme state.
- `matchMedia`: use deterministic light fallback when no stored preference exists.
- Reduced-motion query: use conservative instant movement for restoration.

No capability failure may create a blank page or uncaught rendering error.

**Acceptance method**: Injected adapter failure tests and rendered fallback review.

### U02-NFR-AVL-002 - Migration Continuity and Rollback

- The entry switch cannot occur until recovery, focused tests, full tests, lint, build, boundaries, responsive/theme review, and manifest measurement pass.
- If an entry precondition fails, the current entry remains unchanged.
- After the switch, the U-01 recovery package and exact U-02 changed-file list remain sufficient to restore the captured state.
- U-02 performs no rejected-file deletion, dependency cleanup, or raw-evidence mutation.

**Acceptance method**: Pre-switch checklist, recovery verification, diff allowlist, post-switch build, and documented rollback rehearsal or command validation.

## Product Security and Privacy Requirements

The optional Security Baseline extension remains disabled. These controls derive from the approved static product boundary.

### U02-NFR-SEC-001 - No Sensitive Runtime Surface

- U-02 introduces no runtime network request, analytics, telemetry, authentication, authorization, secret, database, API client, unsafe HTML injection, service worker, form persistence, or browser-stored personal data.
- Raw source evidence, private assets, and full documents remain absent from U-02 imports.
- New-tab behavior, if added to global footer actions later, must prevent opener access.

**Acceptance method**: Source/import scan, runtime request inspection, deployable inventory, unsafe-pattern checks, and manual destination review.

### U02-NFR-SEC-002 - Hash, History, and Theme Boundaries

- Only exact registry-owned section hashes enter navigation state.
- The reserved `#/journal/{slug}` namespace passes to its route boundary and is never interpreted as a section.
- Invalid hashes are normalized without interpolation into HTML, selectors, styles, or arbitrary DOM queries.
- Only the exact string `light` or `dark` may be read from or written to the theme preference key.
- Storage exceptions and invalid values expose non-sensitive typed results, not raw exception details in visible output.

**Acceptance method**: Malformed-hash matrix, storage-value matrix, source review, and history-call assertions.

### U02-NFR-SEC-003 - Dependency and Active-Import Review

- No runtime or development dependency is added by U-02 without a revised, explicitly approved Code Generation plan.
- New shell source cannot import Chakra UI, Tailwind utilities, rejected templates, legacy layout-mode hooks, or raw assets.
- Existing dependency advisories are re-audited and their actual active-runtime reachability is documented before switching.
- A material unresolved issue in shipped active runtime code blocks entry acceptance; an installed but unreachable development/transitive package requires explicit disposition and a separately approved maintenance action.

**Acceptance method**: Unchanged lockfile check, active manifest/import graph, boundary tool, `npm ls`, and available registry audit.

## Reliability Requirements

### U02-NFR-REL-001 - Deterministic Transitions

- Identical normalized registry, hash, theme, visibility facts, and event sequence must produce identical state, history call sequence, and findings.
- Tests cover rapid repeated navigation, observer ties, adjacent-section oscillation, back/forward interruption, invalid hashes, target removal, storage exceptions, and capability absence.
- Passive synchronization cannot create history feedback loops or screen-reader announcement storms.
- Unexpected programmer errors remain visible to the test/check boundary; only anticipated capability failures degrade.

**Acceptance method**: Transition tables, repeat-run exact assertions, fake timers, and history/announcement spies.

### U02-NFR-REL-002 - Lifecycle Safety

- At most one observer or fallback controller is active for one shell.
- Event listeners, media-query subscriptions, observers, scheduled animation frames, and pending intent state are cleaned up on unmount.
- React Strict Mode double-invocation must not leave duplicate listeners or observers.
- Missing targets produce explicit findings and cannot silently mutate history.

**Acceptance method**: Mount/unmount/remount tests with adapter call counts and leak assertions.

## Maintainability Requirements

### U02-NFR-MNT-001 - Quality Gate

- Strict TypeScript, unused-code checks, ESLint, focused shell tests, full tests, production build, boundary checks, and recovery verification must pass.
- New public state and result contracts are read-only, documented, and stable.
- Shell styles are locally owned; semantic tokens remain U-01-owned.
- No unexplained suppression, routine `!important`, duplicated modified file, or rejected selector is introduced.
- Every U-02 rule family has at least one representative success and failure assertion.

**Acceptance method**: Exact commands and results recorded in U-02 evidence.

### U02-NFR-MNT-002 - Single Ownership

- One navigation/progress controller owns section activity and history.
- One theme controller owns the root attribute and optional preference.
- Later units receive registered slots and cannot add parallel global controllers or reorder hashes.
- Any amendment to U-01 registry or U-02 shell contracts identifies affected units and reruns their focused suites.

**Acceptance method**: Dependency-boundary tests, component inventory, and downstream contract documentation.

## Accessibility and Responsive Usability

### U02-NFR-USE-001 - WCAG 2.2 AA Shell Acceptance

The following applicable checks are P0 in light and dark modes:

- Focus-revealed skip link reaches the single main landmark.
- Primary navigation is named; all ten links are keyboard operable and expose current location.
- Heading and landmark order remains meaningful with temporary slots and later domain bodies.
- Progress exposes the active label and `section N of 10` without color, position, or excessive live updates.
- Normal text contrast is at least 4.5:1; large text and meaningful graphical/focus objects are at least 3:1.
- Focus remains visible and unobscured by sticky bands.
- Pointer targets are at least 24 by 24 CSS pixels or meet the spacing exception.
- Reduced motion removes smooth scrolling and nonessential progress transitions while preserving meaning.
- Content remains operable at 200-percent zoom and reflows at 320 CSS pixels without ordinary two-dimensional scrolling.

**Acceptance method**: Semantic tests, keyboard walkthrough, token calculation, rendered contrast inspection, reduced-motion test, zoom review, and reflow review. Automation alone is insufficient.

### U02-NFR-USE-002 - Responsive Shell Usability

- Review widths are 320, 768, 1280, and 1440 CSS pixels in both themes.
- The locus navigator may scroll horizontally inside its labelled region, but the document cannot overflow horizontally.
- No navigation item is hidden behind a drawer or hamburger menu.
- Controls wrap without collision, labels remain readable, and focus is not clipped.
- Wide layouts use whitespace and local track density rather than creating a sidebar.

**Acceptance method**: Structured screenshot or browser review matrix with document/client width checks and keyboard reachability.

## Compatibility Requirements

### U02-NFR-CMP-001 - Browser Matrix

- Target the latest two stable major versions available at final verification for Chrome, Edge, Firefox, and Safari, plus current iOS Safari and Android Chrome.
- Record exact versions actually tested and distinguish automated engines, manual devices, and inferred standards support.
- No Internet Explorer support is required.
- Modern API usage must remain behind the capability fallbacks defined in U02-NFR-AVL-001.

**Acceptance method**: Final browser matrix plus focused capability-adapter tests during U-02.

## Required Review Evidence

### U02-NFR-EVD-001 - Entry-Switch Evidence Package

Before approval, record:

1. Exact changed-file allowlist and confirmation of no rejected-file deletion.
2. U-01 recovery and protected-source verification.
3. Focused and full test, lint, TypeScript/build, boundary, and dependency results.
4. Baseline and post-shell Vite manifest classifications with exact JavaScript, CSS, other initial, evidence, and deployable bytes.
5. Navigation timing and scheduling results.
6. Keyboard, landmarks, current state, progress, focus, contrast, targets, reduced motion, zoom, and reflow evidence.
7. The 320/768/1280/1440 light/dark review matrix.
8. Available browser versions and capability-fallback results.
9. Every warning, inherited limitation, dependency advisory, and explicit disposition.
10. Entry-switch decision and verified rollback status.

## Traceability

| NFR area | Functional rules | Requirements and stories |
| --- | --- | --- |
| Growth and controller bounds | SHL-001/002, PRG-001 | FR-003, ST-002, ST-021 inheritance |
| Bundle and interaction performance | PRG-003/005, MIG-004 | NFR-002, ST-018 inheritance |
| Capability availability and recovery | NAV-005/008, PRG-006, THM-004, MIG-001/003 | NFR-005, ST-020/021 inheritance |
| Static security and dependencies | NAV-001/006, THM-001, MIG-002 | NFR-007, ST-013/021 inheritance |
| Deterministic reliability | NAV-003/004/007, PRG-002 | ST-002, ST-020 inheritance |
| Accessibility and responsive usability | A11Y-001 through A11Y-005, RSP-001 through RSP-004 | FR-002/015/016, ST-002/003/016/019 |
| Migration evidence | MIG-001 through MIG-005 | FR-001, AR-001/002, ST-021 inheritance |

## Extension Compliance

- Security Baseline: disabled in `aidlc-state.md`; skipped. Product-specific static security requirements above remain mandatory.
- Property-Based Testing: disabled in `aidlc-state.md`; skipped. Deterministic example, doubled-volume, and transition-matrix tests remain mandatory.
