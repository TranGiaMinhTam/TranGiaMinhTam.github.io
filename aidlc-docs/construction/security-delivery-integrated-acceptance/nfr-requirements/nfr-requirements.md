# NFR Requirements - U-06 Security, Delivery, and Integrated Acceptance

## Scope

These requirements govern the final integrated candidate, release evidence, and delivery assessment. They do not authorize deployment, hosting migration, DNS changes, dependency removal, or production infrastructure mutation.

## Performance and Capacity

- **U06-NFR-001 Initial JavaScript**: Production initial JavaScript must not exceed 360448 bytes.
- **U06-NFR-002 Initial CSS**: Production initial CSS must not exceed 71680 bytes.
- **U06-NFR-003 Lazy viewer JavaScript**: Combined lazy viewer JavaScript must not exceed 32768 bytes.
- **U06-NFR-004 Initial requests**: The validated entry must retain no more than three initial application requests, excluding browser/platform behavior outside the build manifest.
- **U06-NFR-005 No eager archive originals**: Initial navigation must not request full archive images, complete PDFs, HEIC/DOCX originals, or lazy Journal/viewer chunks.
- **U06-NFR-006 Budget changes**: A budget increase is blocking unless explicitly approved with measured rationale; U-06 cannot silently rebaseline.
- **U06-NFR-007 Static capacity boundary**: Horizontal scaling is hosting-provider managed. The application must remain stateless, cacheable as static output, and free of a server-side capacity dependency.

## Responsive and Browser Acceptance

- **U06-NFR-008 Core widths**: Automated Chrome review must cover 320, 768, 1280, and 1440 CSS pixels.
- **U06-NFR-009 Theme coverage**: Light and dark themes must be reviewed at each core width.
- **U06-NFR-010 Stress modes**: The matrix must include text spacing, 200-percent zoom, reduced motion, forced colors where supported, keyboard interaction, modal focus/inertness/cleanup, and all ten section anchors.
- **U06-NFR-011 Layout integrity**: Every reviewed state must report zero document-level horizontal overflow and no clipped required control or unreadable long text.
- **U06-NFR-012 Browser truthfulness**: Firefox, Safari, and iOS Safari are recorded as passed only when executed. Unavailable engines must be reported as unavailable/not run.

## Accessibility and Usability

- **U06-NFR-013 Accessibility target**: The integrated candidate must satisfy the approved WCAG 2.2 AA-oriented acceptance set: semantic landmarks/headings, accessible names/descriptions, alternative text, meaningful source order, keyboard operation, visible focus, focus containment/restoration, reflow, contrast-compatible themes, reduced motion, and operable error/fallback states.
- **U06-NFR-014 Automated plus rendered evidence**: Component assertions and browser-evaluated checks must be supplemented by selected screenshot inspection and keyboard-flow evidence.
- **U06-NFR-015 Minimum control target**: Viewer and primary action controls must retain at least a 44 CSS-pixel target in applicable layouts.
- **U06-NFR-016 Assistive semantics**: Hidden relationship summaries remain available to assistive technology and do not reappear as visible tables.
- **U06-NFR-017 Contact behavior**: The form remains local-only, validates bounded input, opens the visitor's email application, and never claims submission, storage, or delivery.

## Reliability and Recovery

- **U06-NFR-018 Fail-closed tooling**: A required tool, browser, network, audit, or endpoint check that cannot run produces a typed unavailable failure and blocks a positive release decision unless an explicit approved N/A rationale applies.
- **U06-NFR-019 Complete result set**: Every approved FR, NFR, PBT requirement, security requirement, and story must have exactly one terminal result with evidence or N/A rationale.
- **U06-NFR-020 Recovery baseline**: Before mutation, U-06 must capture governed file hashes, absence states, dependency/lockfile hashes, active composition, and evidence paths.
- **U06-NFR-021 Isolated rehearsal**: Recovery must restore the baseline in an isolated location with exact hash and absence-state verification before candidate activation and after any active promotion.
- **U06-NFR-022 Source preservation**: Every canonical Minh Tam source file and the supplied resume must remain byte-identical unless a future explicit source-edit request says otherwise.
- **U06-NFR-023 No uptime invention**: No availability percentage is claimed without provider evidence. Reliability is expressed through deterministic build, compatible routes/base paths, bounded lazy loading, header evidence, and recovery proof.

## Security and Privacy

- **U06-NFR-024 Required headers**: The evaluated HTTPS HTML endpoint must provide a restrictive CSP, HSTS with at least `max-age=31536000; includeSubDomains`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` or justified `SAMEORIGIN`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **U06-NFR-025 Observed evidence only**: Local development headers and HTML meta elements cannot satisfy production response-header requirements.
- **U06-NFR-026 Host limitation**: Missing GitHub Pages headers are recorded as failures and block a deploy recommendation. Infrastructure Design must define a provider-neutral compliant delivery option without deploying it.
- **U06-NFR-027 Visitor privacy**: Page markup, bundles, reports intended for publication, screenshots, and user-facing errors must exclude the phone number, absolute user paths, stack traces, tokens, secrets, and internal provenance distinctions.
- **U06-NFR-028 Safe sources**: Interactive media must remain local bundled URLs or explicitly approved HTTPS sources; unsafe schemes and malformed paths fail closed.
- **U06-NFR-029 Vulnerability threshold**: Any unresolved critical or high vulnerability in production dependencies blocks candidate readiness. Moderate/low and development-only findings require reachability, exploitability, ownership, and remediation evidence.
- **U06-NFR-030 Trusted dependency sources**: Lockfile packages must resolve from official npm registry sources or an explicitly reviewed source; unexpected protocols or unreviewed registries are blocking.
- **U06-NFR-031 CI integrity**: Third-party actions use immutable commit SHAs, permissions are explicit and least privilege, install uses `npm ci`, and no required verification silently retries.

## Supply Chain and Maintainability

- **U06-NFR-032 Lockfile integrity**: `package-lock.json` remains committed, internally consistent, and unchanged except by an approved dependency operation.
- **U06-NFR-033 Vulnerability evidence**: The audit report records command, npm/Node versions, timestamp, severity counts, advisories, and tool/network failure honestly.
- **U06-NFR-034 SBOM**: The candidate must produce machine-readable SPDX 2.3 JSON or an approved equivalent from the lockfile, including direct/transitive packages, versions, identifiers, and sources without adding a runtime dependency.
- **U06-NFR-035 Unused dependency review**: Static import/config scanning must be reconciled with build plugins, scripts, CSS usage, and retained legacy boundaries. Tool output is evidence, not deletion authority.
- **U06-NFR-036 Deterministic reports**: Stable inputs produce substantively equivalent normalized reports; timestamps are excluded from equivalence.
- **U06-NFR-037 Artifact schemas**: Machine-readable evidence uses explicit schema versions and rejects unsupported versions.
- **U06-NFR-038 Documentation**: Reports include reproducible commands, tool versions, fixed/logged PBT seeds, known limitations, and exact evidence locations.

## Testing and Quality

- **U06-NFR-039 Complete quality gate**: Strict TypeScript, ESLint, all example tests, all property tests, boundary/privacy/source/integrity checks, production and candidate builds, manifests, request/lazy checks, performance budgets, response-header assessment, dependency audit, SBOM, CI integrity, recovery, and responsive browser review must pass or carry an approved N/A rationale.
- **U06-NFR-040 Property framework**: `fast-check` 4.10.2 with Vitest 4.1.9 remains the selected TypeScript property-testing stack.
- **U06-NFR-041 Generator quality**: Shared generators must produce valid requirement results, findings, header maps, recovery entries, evidence bundles, catalog records, resume entries, and viewer states with boundary cases.
- **U06-NFR-042 Shrinking and seeds**: Shrinking remains enabled; runs use fixed or logged seeds and never rely on silent retry.
- **U06-NFR-043 Complementary examples**: Each critical path retains example-based coverage, and every fixed minimal PBT counterexample becomes a permanent focused regression.
- **U06-NFR-044 Activation sequence**: Candidate validation and explicit activation approval precede any active-code promotion; all applicable gates repeat after promotion.

## Evidence Retention

- **U06-NFR-045 Governed artifacts**: Schema-versioned JSON reports and selected screenshots are retained under `artifacts/portfolio/u06-security-delivery/` or another approved U-06 artifact root.
- **U06-NFR-046 Safe content**: Artifacts contain repository-relative paths only and exclude secrets, tokens, absolute user paths, private visitor input, and raw source-document text.
- **U06-NFR-047 Traceability**: Each result maps to requirement/story identifiers and at least one evidence locator or N/A rationale.

## Acceptance Threshold

Candidate readiness requires every applicable requirement above to pass, zero unresolved blocking findings, successful isolated recovery, and a `deploy-not-authorized` outcome. U-06 may recommend a compliant delivery design but cannot deploy or migrate the portfolio.

## Security Baseline Compliance

| Rule | NFR status | Rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | No persistence store is introduced. |
| SECURITY-02 | N/A pending Infrastructure Design | No project-controlled intermediary exists yet; reevaluate if an edge/host is selected. |
| SECURITY-03 | N/A | No deployed application service or centralized logging is introduced. |
| SECURITY-04 | Compliant | U06-NFR-024 through U06-NFR-026 require actual response evidence and full header values. |
| SECURITY-05 | N/A | No API endpoint exists. |
| SECURITY-06 | N/A pending Infrastructure Design | No IAM policy is selected; reevaluate provider permissions later. |
| SECURITY-07 | N/A pending Infrastructure Design | No network resource is selected; reevaluate later. |
| SECURITY-08 | N/A | The portfolio is public and has no protected endpoint. |
| SECURITY-09 | Compliant | Safe errors, minimal output, current runtimes, and no directory/default content are integrated checks. |
| SECURITY-10 | Compliant | Audit, trusted sources, unused review, SBOM, lockfile, and immutable CI requirements are measurable. |
| SECURITY-11 | Compliant | Fail-closed layered checks and misuse coverage are required; API rate limiting is N/A. |
| SECURITY-12 | N/A | No authentication, credentials, or sessions exist. |
| SECURITY-13 | Compliant | Local resources, lockfile/source checks, immutable action pins, and reproducible artifacts are required. |
| SECURITY-14 | N/A | No application security-event stream exists. |
| SECURITY-15 | Compliant | Required-check unavailability, recovery mismatch, and runtime failures fail safely and block release. |

No blocking NFR Requirements security finding remains. SECURITY-02, SECURITY-06, and SECURITY-07 must be reevaluated in Infrastructure Design.

## PBT Compliance

- **PBT-09**: Compliant. `fast-check` 4.10.2 is selected, installed, and integrated with Vitest 4.1.9; it supports domain generators, shrinking, and seeds.
- **PBT-08**: Carried forward through U06-NFR-042 and CI reproducibility requirements.
- **PBT-10**: Carried forward through U06-NFR-043.

No blocking NFR Requirements PBT finding remains.
