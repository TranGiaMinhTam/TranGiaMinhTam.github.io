# Technology Stack Decisions - U-06 Security, Delivery, and Integrated Acceptance

## Decision Summary

U-06 retains the existing TypeScript/React/Vite/npm/Vitest stack and adds verification tooling as repository-local Node.js modules and scripts. No runtime dependency, backend, database, analytics service, authentication service, remote conversion service, or deployment provider is introduced at NFR Requirements.

## Runtime and Build

| Area | Decision | Rationale |
| --- | --- | --- |
| Application runtime | React 19.2.x and React DOM 19.2.x | Existing active runtime; U-06 adds no visitor-facing feature framework. |
| Language | TypeScript 5.9.x in strict project builds | Existing typed boundaries and verification modules. |
| Bundler | Vite 7.x with the current SWC React plugin and path plugin | Preserves production behavior, manifest generation, base-path support, and lazy chunks. |
| Package manager | npm with committed `package-lock.json` and `npm ci` | Deterministic install and official-registry metadata. |
| CI runtime | Node.js 20 | Matches the current workflow and a supported LTS line; later design must pin action implementations immutably. |

## Verification Stack

| Capability | Decision | Rationale |
| --- | --- | --- |
| Example tests | Vitest 4.1.9, Testing Library React, jest-dom, jsdom | Existing executable behavior and DOM contracts. |
| Property tests | `fast-check` 4.10.2 with Vitest | Already exact-pinned and supports generators, shrinking, seeds, and stateful/model checks. |
| Type quality | TypeScript project build | Existing strict compile gate. |
| Static quality | ESLint 9 with current TypeScript/React plugins | Existing source and hook gate. |
| Browser review | Repository-local Chrome DevTools Protocol scripts | Existing no-new-dependency matrix, screenshots, focus, request, and overflow evidence. |
| Boundary/privacy/integrity | Repository-local Node.js ESM scripts | Keeps checks reviewable, deterministic, and independent from visitor runtime. |

## SBOM Decision

U-06 will generate SPDX 2.3 JSON from `package-lock.json` using a focused repository-local Node.js ESM generator or an equivalently deterministic approved tool. The output must include package names, versions, package URLs or equivalent identifiers, dependency relationships, and resolved source information.

- No runtime dependency is added.
- Any proposed development dependency requires supply-chain review and Code Generation plan approval.
- Output validation must reject incomplete lockfile traversal, duplicate package identities, unexpected source protocols, and unsupported schemas.

## Vulnerability and Dependency Review

- `npm audit --omit=dev --json` is the primary production-vulnerability evidence source.
- A network/tool failure is recorded as unavailable and blocks a positive result; it is never translated to zero vulnerabilities.
- Development dependencies receive a separate audit classification because they participate in build and CI integrity.
- Unused-dependency assessment combines static module/config/script/CSS references with an explicit allowlist of justified build and retained-legacy uses.
- No automated tool is authorized to remove packages.

## CI Integrity

- Third-party GitHub Actions must use reviewed full commit SHAs rather than mutable `vN` tags.
- Workflow/job permissions must be explicit; build and deploy permissions remain separable.
- Installation uses `npm ci`.
- Verification commands must include strict TypeScript, ESLint, example and PBT suites, security/boundary/privacy/integrity checks, build, SBOM, request/budget checks, and recovery.
- Fixed or logged PBT seeds and artifact/report locations must be visible in CI evidence.
- No silent retry is permitted for a failing required gate.

## Header Verification

A repository-local Node.js HTTPS verifier will assess the final endpoint and redirect chain. It records raw observed required-header values and evaluates them against the approved policy. Local Vite headers and HTML meta tags are excluded from production compliance evidence.

Infrastructure Design remains provider-neutral. If GitHub Pages cannot meet the complete contract, the later design compares a compliant static host or edge-header layer without selecting, provisioning, or deploying it automatically.

## Performance and Request Measurement

Existing Vite manifest-based measurement remains authoritative for built JavaScript/CSS and lazy chunks. Browser resource entries supplement manifest evidence for eager-request detection. U-06 preserves the approved byte/request ceilings and may not raise them without explicit approval.

## Accessibility Verification

Accessibility uses layered evidence:

- Semantic and interaction assertions in Vitest/Testing Library.
- Browser checks for focus, inertness, keyboard paths, overflow, zoom, text spacing, reduced motion, and forced colors.
- Selected screenshot inspection at approved widths/themes.
- Honest reporting of browsers unavailable in the execution environment.

No new accessibility dependency is selected at this stage. NFR Design may propose one only if it materially improves coverage and passes supply-chain review.

## Evidence Format and Location

- Machine-readable evidence: schema-versioned JSON.
- SBOM: SPDX 2.3 JSON or explicitly approved equivalent.
- Visual evidence: selected PNG screenshots plus one JSON matrix index.
- Documentation: Markdown summaries under the U-06 AI-DLC documentation directory.
- Generated evidence root: `artifacts/portfolio/u06-security-delivery/`.
- Paths inside reports: repository-relative only.

## Hosting and Availability

GitHub Pages remains the observed current baseline, not an assumed compliant target. No uptime SLA is invented. The application remains static and stateless; availability and scaling are provider responsibilities whose capabilities must be evidenced during Infrastructure Design.

## Rejected Alternatives

- Treating HTML meta tags as response-header evidence.
- Raising performance budgets preemptively.
- Floating CI action tags, Node versions, or package installs.
- Replacing concrete regression tests with PBT.
- Automatically deleting dependency candidates.
- Adding a backend, analytics, authentication, remote media service, or monitoring platform.
- Selecting or deploying a new host before Infrastructure Design approval and separate deployment authority.

## PBT Framework Decision

`fast-check` 4.10.2 remains selected because it is already exact-pinned, integrates with Vitest, provides reusable arbitraries, automatic shrinking, reproducible seeds, and model/stateful capabilities. This satisfies PBT-09. PBT runs remain clearly separated from example tests and are included in the integrated CI gate.
