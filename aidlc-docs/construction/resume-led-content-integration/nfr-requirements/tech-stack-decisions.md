# U-03 Tech Stack Decisions - Resume-Led Content Integration

## Decision Summary

U-03 retains the existing static React/TypeScript/Vite application and its established CSS and test tooling. No runtime or development dependency is approved by this stage. Content reconciliation remains pure build-time/source-authored logic; the browser receives validated immutable models and a native local-PDF download capability.

## Retained Technologies

| Concern | Decision | Rationale |
| --- | --- | --- |
| Language | Strict TypeScript and TSX | Closed categories, discriminated results, immutable inputs, and typed findings prevent invalid presentation states. |
| UI | Existing React 19 composition | Preserves the ten-section shell, Journal route, contact workflow, and U-02 action slot. |
| Build | Existing Vite configuration | Supports hashed local PDF asset emission and exact manifest measurement without a new service. |
| Styling | Existing CSS Modules and semantic tokens | Keeps domain visual ownership, both-theme behavior, logical properties, and responsive contracts. |
| Example/component tests | Vitest and Testing Library | Pins story scenarios, DOM semantics, privacy absence, and shared download behavior. |
| Property testing | Existing fast-check integration with Vitest | Supplies constrained generators, shrinking, seed replay, oracles, permutations, and at least 100 cases/property. |
| Static quality | Strict TypeScript, ESLint, source/boundary/style checks | Detects ownership violations, unsafe patterns, and regression before rendering. |
| Rendered review | Existing capability-detected local browser review | Measures widths/themes/zoom/text spacing/overflow/CLS/requests without introducing a hosted visual service. |
| Integrity | Existing SHA-256 and recovery tooling | Proves the bundled resume and protected sources remain byte-identical and recoverable. |

## Content and Data Decisions

- Claims are authored as reviewed typed data; raw PDF text is not parsed at runtime.
- Any local extraction is transient, non-echoing, and outside runtime/build artifacts until facts are manually reviewed.
- Pure functions perform claim admission, field-level reconciliation, closed-map section assignment, ordering, projection, and validation.
- Runtime React components accept only ready view models; blocking/conflicted models cannot be rendered.
- The resume uses the existing local safe-media type and one immutable capability shared by masthead and Identity.
- Existing evidence actions are retained. U-03 adds no PDF embed, dialog, archive loader, image navigation, or remote origin.

## Accessibility and Browser Decisions

- Native headings, lists/articles, links, and download anchors are preferred over custom widgets.
- One DOM structure serves both themes and all supported viewports.
- CSS enhancements must degrade to readable source order and visible actions.
- Chromium automation supplies local repeatable evidence; Firefox, Safari, and iOS Safari results are reported only when actually reviewed. Missing capability is manual-pending, not a pass.

## Security and Privacy Decisions

- No `dangerouslySetInnerHTML`, dynamic code evaluation, runtime document deserialization, raw path rendering, telemetry, analytics, or remote extraction.
- A non-echoing privacy verifier accepts the sensitive marker only through approved ephemeral local input and reports codes/counts without printing the value.
- The U-03-approved canonical PDF (113,775 bytes; SHA-256 `8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282`) and local capability are verified before candidate composition; the replaced protected version remains in targeted recovery.
- Errors are discriminated safe findings. Invalid data fails closed and cannot create a partial active composition.
- U-06 retains response-header, vulnerability audit, SBOM, CI integrity, and deployment verification ownership; U-03 must not weaken those boundaries.

## Property-Test Configuration

- Framework: existing fast-check with Vitest.
- Minimum: 100 runs for each U03-P01 through U03-P10.
- Reproducibility: fixed or explicitly logged seed and replay path.
- Shrinking: enabled without suppression.
- Generators: centralized constrained claim, category, evidence, conflict, privacy-class, Unicode, boundary-volume, and permutation arbitraries.
- Oracles: simple closed category map and direct reference checks.
- Complement: example/component tests remain mandatory for all five stories, privacy, conflict, downloads, safe failure, and boundary preservation.

## Dependency Policy

No package installation or version change is selected. Any later implementation need that cannot be satisfied by the existing stack requires a separate decision, package/lockfile diff, trusted-source review, vulnerability assessment, bundle impact, and explicit approval before installation.

## Rejected Alternatives

- Runtime PDF parsing: unnecessary, privacy-sensitive, and larger than reviewed typed content.
- Backend/database: no runtime persistence or distributed scale is required.
- Remote analytics or hosted visual regression: introduces unapproved network/privacy boundaries.
- CSS-hidden private fields: fails structural privacy requirements.
- Duplicated domain claim stores: causes authority drift and undermines deterministic mapping.
- Custom JavaScript download handling: adds failure states without benefit over native anchors.
- U-03 media dialog or archive browser: violates the approved U-04/U-05 boundaries.

## Compliance Mapping

| Rules | Status |
| --- | --- |
| SECURITY-09, 11, 13, 15 | Applicable; satisfied by typed inputs, isolated policy boundaries, integrity verification, safe diagnostics, and fail-closed composition. |
| SECURITY-10 | Applicable inherited boundary; lockfile, trusted sources, vulnerability/SBOM/CI evidence remains U-06-owned and no dependency change is approved. |
| SECURITY-04 | Deferred to U-06 response-header design. |
| SECURITY-01-03, 05-08, 12, 14 | N/A for this static unit with no server, store, API, IAM/network/authentication, or event stream. |
| PBT-01, 03-05, 07-10 | Applicable and specified through U03-P01 through U03-P10 plus retained fast-check configuration. |
| PBT-02 | N/A because U-03 introduces no inverse/serialization pair. |
| PBT-06 | N/A because U-03 business state is immutable and stateless. |
