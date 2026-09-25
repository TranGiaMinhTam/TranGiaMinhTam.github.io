# Code Generation Plan - U-06 Security, Delivery, and Integrated Acceptance

> **Status: Part 1 approved; Part 2 is in progress.** This document is the single source of truth for U-06 Code Generation.

## User-Directed Stage Routing

- [x] U-06 Functional Design approved on 2026-09-25.
- [x] U-06 NFR Requirements approved on 2026-09-25 with all twelve Option A decisions.
- [x] U-06 NFR Design skipped by explicit instruction to go straight to Code Generation.
- [x] U-06 Infrastructure Design skipped by the same instruction. The current host's response-header limitation remains a blocking release finding; no provider is selected, provisioned, migrated, or deployed.
- [x] Reasonable implementation defaults are documented in this plan instead of asking additional design questions.

## Unit Generation Context

- **Stories**: US-018 and US-020.
- **Primary functional requirements**: FR-036, FR-037, and FR-038.
- **Integrated requirements**: FR-001 through FR-038, NFR-001 through NFR-020, PBT-R01 through PBT-R10, SEC-R01 through SEC-R08, and U06-NFR-001 through U06-NFR-047.
- **Consumes**: The approved U-01 through U-05 active implementation, source-governance contracts, media-source policy, archive catalog, resume/content reconciliation, accessible viewer behavior, recovery tools, Vite manifests, and existing unit evidence.
- **Provides**: Typed acceptance results, deterministic release decisions, supply-chain/SBOM evidence, CI-integrity checks, observed-header evidence, complete traceability, integrated browser evidence, and exact recovery proof.
- **Brownfield boundary**: Existing application and workflow files are modified in place; no replacement copies are created.
- **Deployment boundary**: This unit may assess and harden the repository's delivery workflow, but it does not deploy, migrate hosting, modify DNS, select a provider, or claim header compliance that was not observed.

## Planned Application and Tooling Paths

### Create

- `src/portfolio/release/release.types.ts`
- `src/portfolio/release/releaseDecision.ts`
- `src/portfolio/release/headerAssessment.ts`
- `src/portfolio/release/evidenceBundle.ts`
- `src/portfolio/release/index.ts`
- Focused example and property-based tests beside the release modules.
- `scripts/portfolio/security-delivery/` for recovery, report schemas, integrated verification, SBOM generation/validation, dependency/source review, CI integrity, response-header assessment, artifact privacy, performance/request checks, and browser review.
- `scripts/portfolio/security-delivery-candidate/` for an isolated candidate entry/configuration only if the active runtime composition must be exercised independently.
- Schema-versioned evidence under `artifacts/portfolio/u06-security-delivery/`.
- `aidlc-docs/construction/security-delivery-integrated-acceptance/code/code-generation-summary.md`.

### Modify in place

- `package.json` to add explicit U-06 verification, SBOM, measurement, review, recovery, and integrated-gate scripts without adding a runtime dependency.
- `.github/workflows/deploy.yml` only after candidate approval, to use immutable action SHAs, explicit least-privilege permissions, `npm ci`, and the approved integrated quality gate.
- Existing shared test/configuration files only where required to register the focused release module or preserve deterministic execution.
- `src/App.tsx` only if isolated verification proves an active-composition change is necessary; the default assumption is no visitor-facing runtime change.

## Reasonable Defaults Adopted

- Retain React, TypeScript, Vite, npm, Vitest, Testing Library, jsdom, and exact-pinned `fast-check`; add no runtime package.
- Generate SPDX 2.3 JSON directly from `package-lock.json` with repository-local Node.js tooling.
- Treat unavailable required tools, browsers, network checks, and endpoint checks as typed failures rather than passes.
- Preserve the approved bundle ceilings: 360448 initial JavaScript bytes, 71680 initial CSS bytes, 32768 lazy viewer JavaScript bytes, and at most three initial requests.
- Keep GitHub Pages as the observed baseline only. Missing required HTTPS response headers force `deploy-not-authorized`; local headers and meta elements are not substitutes.
- Preserve the current source archive and resume byte-for-byte, record repository-relative evidence paths, and exclude secrets, phone data, visitor input, and absolute local paths from publishable artifacts.
- Keep concrete example tests alongside properties; use reusable generators, shrinking, and fixed or logged seeds.

## Layer Applicability

- Typed domain logic, validators, frontend-safe release types, repository-local verification scripts, tests, workflow configuration, browser evidence, recovery, and documentation: applicable.
- API, database/repository persistence, migrations, authentication, backend services, telemetry platforms, DNS, cloud provisioning, hosting migration, and deployment execution: N/A.
- Response-header delivery configuration: not implemented because Infrastructure Design was skipped and GitHub Pages cannot be assumed compliant; the observed gap remains an explicit release blocker.

## Part 1 Planning Steps

- [x] Step 1 - Read the approved Functional Design, NFR Requirements, unit/story map, requirements, existing package scripts, CI workflow, reverse-engineered code structure, and enabled extension rules.
- [x] Step 2 - Validate that U-06 is ready for Code Generation and identify the existing unit boundaries, dependencies, owned stories, and integrated verification obligations.
- [x] Step 3 - Define exact create/modify paths, exclusions, reasonable defaults, story traceability, and extension traceability for this brownfield unit.
- [x] Step 4 - Produce this executable, sequential plan with checkboxes as the single source of truth.
- [x] Step 5 - Summarize the plan and log the mandatory approval prompt.
- [x] Step 6 - Receive and record explicit approval of the complete plan before Part 2 begins. Approved with the exact response `approve` on 2026-09-25.

## Part 2 Execution Steps

- [x] Step 7 - Capture a U-06 recovery baseline containing hashes and absence states for every planned source, script, package, lockfile, workflow, configuration, and evidence target; rehearse exact restoration in an isolated directory and stop on mismatch. Captured 21 governed targets (eight existing files and 13 absence states), preserved dependency/lockfile hashes, and passed isolated restoration plus payload verification with zero findings.
- [x] Step 8 - Implement closed typed contracts and schema validators for requirement results, findings, evidence locators, integrated bundles, header assessments, dependency/CI assessments, recovery assessments, and release decisions. Added the focused `src/portfolio/release/` domain with closed statuses/severities/outcomes, safe locators, schema-versioned bundles, header/recovery contracts, parsers, and public exports.
- [x] Step 9 - Implement pure deterministic release-decision, completeness, deduplication, blocking-severity, header-policy, evidence-safety, and normalized-report logic with visitor-safe failure output. Added complete-result enforcement, fail-closed unavailable handling, deterministic normalization, blocking aggregation, exact-recovery gating, and honest `deploy-not-authorized` header behavior.
- [x] Step 10 - Add reusable `fast-check` generators and property tests for completeness, order independence, idempotent normalization, round trips, monotonic blocking findings, header-policy evaluation, evidence-path safety, release-decision oracle equivalence, shrinking, and reproducible seeds; retain focused examples for critical paths and fixed minimal counterexamples. Added reusable domain arbitraries and fixed-seed/shrinking properties alongside concrete examples. The first run shrank an order-dependence defect to two duplicate-ID results; fixed the tie-breaker and preserved that exact case as a regression. Strict TypeScript and nine focused tests now pass.
- [x] Step 11 - Implement repository-local dependency verification: lockfile traversal, trusted registry/source checks, production/development vulnerability classification, unused-dependency evidence with configuration/script/CSS reconciliation, and SPDX 2.3 JSON generation plus schema/integrity validation. Added full lock traversal, official-registry enforcement, reference scanning, separate production/all audits, explicit development reachability/remediation classification, and a validated 660-package SPDX 2.3 document. Compatible Vite 7.3.6 and Vitest 4.1.11 security patches removed all production high/critical findings; one production moderate and ten development high findings remain classified rather than hidden.
- [x] Step 12 - Implement CI-integrity verification for Node.js 20, `npm ci`, committed lockfile, explicit permissions, immutable third-party action SHAs, deterministic commands, visible property seeds, governed artifacts, and no silent retry. Added candidate/active workflow assessment and a candidate workflow using reviewed full SHAs for checkout, setup-node, and artifact upload with read-only permissions, exact install, bounded timeout, and no retry.
- [x] Step 13 - Implement observed HTTPS response-header verification for CSP, HSTS, `nosniff`, frame policy, and referrer policy across redirects. Record the current GitHub Pages result honestly and force `deploy-not-authorized` when the contract is unmet or unavailable. Live HTTPS assessment reached the portfolio with status 200 and recorded missing CSP, `nosniff`, frame policy, and referrer policy plus HSTS without the required `includeSubDomains`; the release effect is honestly `deploy-not-authorized`.
- [x] Step 14 - Implement the integrated evidence collector and traceability validator for every approved FR, NFR, PBT, security requirement, and owned story, requiring exactly one terminal result and one evidence locator or approved N/A rationale. The generated index covers 159 identifiers exactly once with zero missing or duplicate results and separates implementation blockers from the known external header blocker.
- [x] Step 15 - Add U-06 artifact privacy/integrity, source preservation, route/base-path, initial-request, lazy-media, bundle-budget, unsafe-source, visitor-safe-error, and duplicate/replacement-file checks. Added governed artifact scanning, 127 canonical-source hash checks, approved U-03 resume-bundle integrity, Vite-manifest entry/request/lazy-viewer budgets, eager-source and absolute-path rejection, root/base readiness, and duplicate replacement-file detection.
- [x] Step 16 - Add deterministic package scripts and an isolated candidate verification entry. Do not change the active deploy workflow or visitor-facing composition in this step. Added focused/full candidate scripts and the isolated immutable-action verification workflow under `scripts/`; `.github/workflows/deploy.yml` and `src/App.tsx` remain unchanged.
- [ ] Step 17 - Run focused tests, all existing unit/full tests, strict TypeScript, ESLint, source/boundary/privacy/integrity checks, production and isolated candidate builds, SBOM validation, dependency/CI checks, recovery, manifests, request/lazy checks, and approved performance budgets; resolve every applicable blocking implementation finding.
- [ ] Step 18 - Run the approved Chrome matrix at 320, 768, 1280, and 1440 CSS pixels in both themes plus keyboard, zoom, text spacing, reduced motion, forced colors where supported, modal cleanup, routes, and all ten section anchors. Record Firefox/Safari/iOS Safari as unavailable unless actually executed.
- [ ] Step 19 - Present the isolated U-06 candidate evidence and a dedicated two-option activation question covering the exact `.github/workflows/deploy.yml` change and any proven minimum active seam. Do not promote or deploy before explicit approval.
- [ ] Step 20 - After candidate approval, pin reviewed third-party actions to full commit SHAs, add the integrated quality gate and least-privilege permissions, and apply only the approved reversible active changes. Preserve a non-positive deployment decision while required production headers remain unmet.
- [ ] Step 21 - Repeat every applicable post-promotion quality, security, supply-chain, recovery, build, performance, response-header, accessibility, and responsive-browser gate. Resolve implementation findings and retain external header limitations as honest blockers rather than rewriting them as passes.
- [ ] Step 22 - Generate the U-06 Code Generation summary, verify no duplicate replacement files or dependency/source drift, close story/requirement/extension traceability, update workflow state/audit records, and present the standardized Code Generation completion gate.

## Story Traceability

| Story | Planned implementation | Verification |
| --- | --- | --- |
| US-018 | Integrated navigation, contact, Journal, media, route/base-path, privacy, recovery, and regression evidence | Steps 7 through 10, 14 through 18, 21 |
| US-020 | Headers, dependency audit, trusted sources, unused-package review, SBOM, lockfile, CI integrity, budgets, and release decision | Steps 8 through 17, 19 through 21 |

## Requirement and Extension Traceability

| Requirement or rule | Plan steps |
| --- | --- |
| FR-036 through FR-038 | 8, 9, 14 through 18, 21 |
| FR-001 through FR-035 integrated verification | 14, 15, 17, 18, 21 |
| NFR-001 through NFR-020 and U06-NFR-001 through U06-NFR-047 | 7 through 18, 21 |
| PBT-R01 through PBT-R10; PBT-01 through PBT-10 | 8 through 10, 14, 17, 21 |
| SEC-R01 through SEC-R08 | 8, 9, 11 through 17, 20, 21 |
| SECURITY-04, SECURITY-09 through SECURITY-11, SECURITY-13, SECURITY-15 | 8 through 17, 20, 21 |
| SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, SECURITY-14 | N/A unless the implementation introduces their persistence, intermediary, API, IAM, network, identity, or telemetry boundaries; Step 22 rechecks this assumption |

## Mandatory Gates

- Application code and executable tooling remain in the workspace root; only Markdown documentation enters `aidlc-docs/`.
- Every completed plan step is checked in this file in the same interaction.
- All interactive controls added by an unexpected minimum active seam receive stable role-based `data-testid` attributes; no new visitor control is currently planned.
- No dependency addition, source deletion, budget increase, hosting/DNS change, or deployment is authorized.
- No active workflow promotion occurs before recovery, complete candidate verification, browser review, and explicit candidate approval.
- Missing/unavailable header, audit, browser, build, recovery, or integrity checks cannot be translated into a pass.
- Security Baseline and full PBT rules remain blocking constraints wherever applicable; every N/A classification includes a boundary rationale.
