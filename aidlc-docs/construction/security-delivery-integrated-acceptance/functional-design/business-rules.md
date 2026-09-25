# Business Rules - U-06 Security, Delivery, and Integrated Acceptance

## Release and Evidence Rules

- **BR-U06-001 Complete coverage**: All 38 functional requirements, 20 non-functional requirements, 10 PBT requirements, eight security requirements, and 21 stories must resolve to exactly one terminal status.
- **BR-U06-002 Fail closed**: Any applicable blocking security, privacy, accessibility, integrity, recovery, route, performance, or behavior finding makes the release decision `blocked`.
- **BR-U06-003 Evidence required**: A pass without a machine-readable or human-reviewable evidence locator is invalid.
- **BR-U06-004 Honest N/A**: A not-applicable result requires a concrete boundary-based rationale and must be reevaluated if Infrastructure Design adds the missing component.
- **BR-U06-005 No silent skip**: An unavailable tool or unexecuted required check is a blocking failure, not a pass or N/A.
- **BR-U06-006 Stable ordering**: Reports sort results and findings by requirement, severity, and stable code without changing membership.
- **BR-U06-007 Separate authority**: Candidate readiness, active-code activation, and production deployment are distinct decisions. U-06 does not authorize deployment.

## Candidate and Recovery Rules

- **BR-U06-008 Candidate first**: Integrated verification runs against an isolated candidate before any active composition mutation.
- **BR-U06-009 Explicit activation**: Active-code promotion requires a separate two-option approval after candidate evidence is presented.
- **BR-U06-010 Exact baseline**: Recovery captures hashes and absence states for every governed target before mutation.
- **BR-U06-011 Isolated rehearsal**: Recovery must succeed outside the workspace before candidate activation and repeat after active promotion.
- **BR-U06-012 Preserve originals**: Canonical Minh Tam source files, the supplied resume, and retained originals are never overwritten or deleted by U-06.

## Header and Hosting Rules

- **BR-U06-013 Response truth**: Only observed HTTP response headers satisfy SECURITY-04; HTML meta tags are not substitutes for CSP, HSTS, `nosniff`, frame policy, or referrer-policy headers.
- **BR-U06-014 Required values**: CSP must be restrictive and avoid undocumented `unsafe-inline` or `unsafe-eval`; HSTS must include at least one year and `includeSubDomains`; `nosniff`, `DENY` or justified `SAMEORIGIN`, and `strict-origin-when-cross-origin` are required.
- **BR-U06-015 Host limitation**: Missing GitHub Pages header support is recorded as non-compliance and blocks a deploy recommendation.
- **BR-U06-016 Alternative only**: A compliant hosting or edge option may be designed and compared, but no migration or deployment occurs without a later explicit decision.

## Supply-Chain and CI Rules

- **BR-U06-017 Lockfile integrity**: `package-lock.json` must exist, remain internally consistent, and change only through an approved dependency operation.
- **BR-U06-018 Trusted sources**: Dependencies must resolve from official or explicitly reviewed registries; unexpected source protocols are blocking.
- **BR-U06-019 Vulnerability evidence**: The audit result records tool version, timestamp, severity counts, and unresolved advisories without hiding network/tool failure.
- **BR-U06-020 Unused dependencies**: Findings are classified before removal; remediation requires the approved Code Generation plan and complete regression evidence.
- **BR-U06-021 SBOM**: A machine-readable production SBOM must include direct and transitive packages plus identifiers and versions.
- **BR-U06-022 Immutable actions**: Third-party GitHub Actions use full commit-SHA references. Mutable tags are blocking even when published by a known vendor.
- **BR-U06-023 Least privilege**: Workflow permissions are explicit and limited to the job need; deployment permissions remain isolated from build verification.
- **BR-U06-024 Deterministic pipeline**: CI installs with the lockfile and runs the approved type, lint, example, PBT, boundary, privacy, security, build, request, budget, and recovery gates without silent retry.

## PBT and Regression Rules

- **BR-U06-025 Domain generators**: Requirement results, findings, header maps, recovery entries, and evidence bundles use reusable constrained generators rather than raw primitives.
- **BR-U06-026 Reproducibility**: Every property run uses a fixed or logged seed and retains shrinking.
- **BR-U06-027 Permanent regressions**: A discovered minimal counterexample becomes an example-based regression before the finding closes.
- **BR-U06-028 Complementary coverage**: Property tests never replace explicit examples for release blocking, missing headers, recovery mismatch, unsafe sources, and CI pin violations.

## Security Baseline Compliance

| Rule | Functional Design status | Rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | No persistence store is introduced. |
| SECURITY-02 | N/A | No project-controlled network intermediary is approved; reevaluate if Infrastructure Design selects one. |
| SECURITY-03 | N/A | No deployed application service or centralized telemetry is introduced. |
| SECURITY-04 | Compliant by design | BR-U06-013 through BR-U06-016 require observed response-header evidence and prohibit false compliance. |
| SECURITY-05 | N/A | No API endpoint exists; client contact validation remains local and sends nothing to this site. |
| SECURITY-06 | N/A | No IAM policy is introduced at Functional Design; Infrastructure Design must reevaluate provider permissions. |
| SECURITY-07 | N/A | No network configuration is introduced at Functional Design. |
| SECURITY-08 | N/A | The portfolio is public and has no protected resource endpoint. |
| SECURITY-09 | Compliant by design | Minimal static output, safe visitor failures, and supported runtimes are mandatory integrated checks. |
| SECURITY-10 | Compliant by design | BR-U06-017 through BR-U06-024 cover lockfile, audit, unused dependencies, trusted sources, SBOM, and CI integrity. |
| SECURITY-11 | Compliant by design | Security verification is isolated, layered, fail-closed, and includes misuse cases. Rate limiting is N/A without a project-controlled API. |
| SECURITY-12 | N/A | No authentication, credentials, or sessions exist. |
| SECURITY-13 | Compliant by design | Local/integrity-verified resources, immutable CI pins, lockfile integrity, and audited pipeline changes are required. |
| SECURITY-14 | N/A | No authentication, authorization, backend, or application security-event stream exists. |
| SECURITY-15 | Compliant by design | Tool, network, build, media, and recovery failures become blocking typed results with bounded cleanup and safe output. |

No blocking Functional Design security finding remains. Infrastructure Design must reevaluate SECURITY-02, SECURITY-06, and SECURITY-07 if it introduces an edge or alternate host.

## PBT Compliance

- **PBT-01**: Compliant. The business logic model identifies invariant, commutativity, idempotence, oracle, round-trip, and easy-verification properties per component.
- **PBT-02 through PBT-08**: Carried forward where the identified operations apply; Code Generation must implement the documented properties with reusable generators, shrinking, and seeds.
- **PBT-09**: Existing `fast-check` with Vitest remains the selected framework; NFR Requirements must confirm version and CI integration.
- **PBT-10**: Compliant by design through BR-U06-027 and BR-U06-028.

No blocking Functional Design PBT finding remains.
