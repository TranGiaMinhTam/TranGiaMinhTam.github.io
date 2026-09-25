# NFR Requirements Plan - U-06 Security, Delivery, and Integrated Acceptance

> **Status: Complete and approved on 2026-09-25.** This plan is the single source of truth for U-06 NFR Requirements.

## Context

- U-06 Functional Design is approved.
- The site remains a static React/Vite application with no backend, database, authentication, analytics, or server-side contact submission.
- The current delivery baseline is GitHub Actions and GitHub Pages with Node.js 20.
- `fast-check` 4.10.2 and Vitest 4.1.9 are already selected and integrated.
- U-06 must define measurable quality thresholds without deploying, migrating hosting, or weakening prior budgets.

## Plan Steps

- [x] Step 1 - Load the approved Functional Design, all inherited NFR/security/PBT requirements, current technology stack, dependencies, and CI workflow.
- [x] Step 2 - Assess performance, scalability, availability, reliability, accessibility, security, maintainability, browser coverage, evidence retention, and technology decisions.
- [x] Step 3 - Generate complete NFR and technology-choice questions with measurable recommended options.
- [x] Step 4 - Save this plan and pause for explicit answers.
- [x] Step 5 - Validate all answers and resolve every ambiguity or contradiction. Recorded Option A for all twelve decisions; the set is complete, measurable, mutually consistent, and requires no clarification file.
- [x] Step 6 - Generate `nfr-requirements.md` and `tech-stack-decisions.md` under `aidlc-docs/construction/security-delivery-integrated-acceptance/nfr-requirements/`. Defined 47 measurable requirements and retained the existing runtime/build/test stack with repository-local verification, SPDX JSON, observed-header checks, immutable CI references, and no runtime dependency or provider selection.
- [x] Step 7 - Evaluate SECURITY-01 through SECURITY-15 and PBT-09 compliance, resolve applicable blocking findings, update AI-DLC state/audit records, and present the standardized completion gate. All fifteen security rules were classified with evidence, PBT-09 was satisfied by the installed `fast-check`/Vitest stack, no applicable blocking NFR finding remained, and the user explicitly directed the workflow to Code Generation.

## Decision Questions

### Question 1
What production bundle ceilings should U-06 enforce?

A) Preserve the current approved ceilings: 360448 initial JavaScript bytes, 71680 initial CSS bytes, 32768 lazy viewer JavaScript bytes, and no more than three initial requests unless a later explicit approval changes them
B) Increase every ceiling by 25 percent to create implementation headroom
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 2
What responsive and browser acceptance matrix should be required?

A) Automated Chrome review at 320, 768, 1280, and 1440 CSS pixels in light and dark themes, plus text spacing, 200-percent zoom, reduced motion, forced colors, keyboard interaction, and honest unavailable/not-run reporting for Firefox and Safari when they cannot be executed
B) Desktop Chrome at 1440 pixels only
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 3
What accessibility target should block release?

A) WCAG 2.2 AA-oriented acceptance: semantic landmarks, keyboard operation, visible focus, focus containment/restoration, accessible names, alternative text, reflow without document overflow, reduced motion, and automated plus rendered checks
B) Automated accessibility checks only, without keyboard or rendered review
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 4
How should availability and scalability be expressed for this static portfolio?

A) Do not invent an uptime SLA; require deterministic static builds, route/base-path compatibility, bounded lazy loading, host capability evidence, and a recovery rehearsal while treating horizontal application scaling as provider-managed and out of application scope
B) Claim 99.99 percent availability without provider evidence
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 5
What vulnerability threshold should block candidate readiness?

A) Block on any unresolved critical or high vulnerability in production dependencies; classify moderate/low and development-only findings with exploitability, reachability, and remediation evidence rather than silently ignoring them
B) Allow all vulnerabilities when the site builds successfully
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 6
What SBOM and dependency evidence format should be required?

A) Generate machine-readable CycloneDX JSON or standards-equivalent JSON from the lockfile, including direct and transitive packages, versions, package URLs or equivalent identifiers, and registry/source information without adding a runtime dependency
B) Produce only a human-written dependency list
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 7
How should unused dependencies be assessed?

A) Combine static import/config scanning with explicit review of build plugins, scripts, and retained legacy boundaries; treat tool output as evidence rather than automatic deletion authority
B) Delete every package not imported directly from application TSX files
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 8
What CI reproducibility standard should U-06 require?

A) Node.js 20, `npm ci`, committed lockfile, immutable third-party action SHAs, explicit workflow permissions, fixed or logged PBT seeds, deterministic verification commands, and no silent retry
B) Floating Node and action versions with `npm install`
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 9
How should header and hosting capability be evaluated?

A) Verify actual HTTPS response headers against the full required policy, record GitHub Pages gaps as failures, and carry a provider-neutral compliant edge/host requirement into Infrastructure Design without selecting or deploying a provider here
B) Accept local development headers or HTML meta tags as production evidence
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 10
How should verification evidence be retained and protected?

A) Store schema-versioned machine-readable reports and selected screenshots under governed artifact paths, exclude secrets and absolute user paths, include timestamps/tool versions/seeds, and preserve reproducible commands in documentation
B) Keep only terminal output from the current session
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 11
What reliability behavior should apply when a required tool or network-dependent check cannot run?

A) Fail closed with a typed unavailable result, preserve partial safe evidence, and block the positive release decision until the check succeeds or receives an explicitly approved N/A rationale
B) Treat an unavailable check as passed
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 12
How should example-based and property-based verification coexist in CI?

A) Run both suites; use reusable domain generators, shrinking, and fixed or logged seeds, while retaining concrete regression examples for every critical path and every fixed minimal counterexample
B) Replace example tests with property tests
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Extension Applicability at Planning

- **Security Baseline**: SECURITY-04, SECURITY-09 through SECURITY-11, SECURITY-13, and SECURITY-15 are directly applicable. Other rules remain boundary-based N/A unless Infrastructure Design introduces a relevant service, intermediary, identity, policy, or network.
- **Property-Based Testing**: PBT-09 is directly applicable at NFR Requirements. The selected stack remains `fast-check` with Vitest; CI seed and complementary-coverage requirements are explicit decisions above.
