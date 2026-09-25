# Functional Design Plan - U-06 Security, Delivery, and Integrated Acceptance

> **Status: Complete; explicit completion approval pending.** This plan is the single source of truth for U-06 Functional Design.

## Unit Context

- **Primary stories**: US-018 and US-020.
- **Primary requirements**: FR-036 through FR-038; PBT-R09 and PBT-R10; SEC-R01, SEC-R03 through SEC-R05, and SEC-R07; integrated verification of all approved functional and non-functional requirements.
- **Consumes**: Every approved U-01 through U-05 application, test, recovery, performance, accessibility, privacy, and browser-review artifact plus the current GitHub Pages workflow.
- **Provides**: A deterministic integrated release decision, verifiable security and supply-chain evidence, exact recovery evidence, and an honest host-compliance assessment.
- **Boundary**: U-06 may design and verify delivery controls. It must not deploy, change DNS, migrate hosting, publish a release, remove dependencies, or mutate production infrastructure without the later plan approval and any additional authority required by the selected option.

## Functional Design Steps

- [x] Step 1 - Load the approved U-06 unit definition, dependencies, stories, requirements, prior unit outputs, and enabled extension configuration.
- [x] Step 2 - Assess business logic, release-decision rules, evidence contracts, failure states, recovery behavior, and external boundaries.
- [x] Step 3 - Create complete decision questions for host-header truthfulness, candidate activation, supply-chain evidence, CI integrity, recovery, release blocking, and PBT regression handling.
- [x] Step 4 - Save this plan and pause for explicit answers before generating design artifacts.
- [x] Step 5 - Validate all answers and create clarification questions if any answer is missing, invalid, ambiguous, or contradictory. Recorded Option A for all nine decisions; the set is complete, valid, mutually consistent, fail-closed, and requires no clarification file.
- [x] Step 6 - Generate `business-logic-model.md`, `business-rules.md`, and `domain-entities.md` under `aidlc-docs/construction/security-delivery-integrated-acceptance/functional-design/`. Defined the integrated check registry, fail-closed decision flow, header/supply-chain/CI/recovery models, immutable evidence contracts, and explicit deployment exclusion.
- [x] Step 7 - Document testable properties by PBT category and explicit N/A rationales as required by PBT-01. Identified invariant, commutativity, idempotence, oracle, round-trip, and easy-verification properties with later generator/test obligations; stateful PBT remains conditional on a pure activation reducer.
- [x] Step 8 - Evaluate SECURITY-01 through SECURITY-15 and PBT-01 compliance, resolve every applicable blocking finding, update AI-DLC state/audit records, and present the standardized Functional Design completion gate. All fifteen security rules have explicit compliant or boundary-based N/A statuses, PBT-01 is satisfied through component-level property identification, Markdown and table structure validate, and no blocking Functional Design finding remains.

## Decision Questions

### Question 1
What should U-06 do when the current GitHub Pages response cannot provide every required security header?

A) Record the current host as non-compliant for those headers, design a compliant alternative, and block any deploy recommendation until a later explicit hosting decision
B) Treat HTML meta tags as equivalent to all missing HTTP response headers
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 2
How should the integrated release candidate be activated?

A) Build and verify an isolated candidate first, then require a separate two-option approval before any reversible active-code promotion; never deploy in U-06
B) Verify only the currently active build without a separate candidate or activation gate
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 3
What supply-chain evidence should the final gate produce?

A) Lockfile integrity, vulnerability results, direct and transitive dependency inventory, unused-dependency review, registry-source checks, and a machine-readable SBOM
B) Vulnerability results and lockfile presence only
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 4
How should unused or risky dependencies discovered during U-06 be handled?

A) Report and classify them first; remove or replace a dependency only through the approved Code Generation plan with regression and lockfile verification
B) Remove every flagged dependency immediately during analysis
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 5
What CI integrity policy should the design enforce for GitHub Actions?

A) Require immutable commit-SHA pinning for third-party actions, explicit least-privilege permissions, deterministic install/build/test commands, and artifact evidence; classify any gap as release-blocking until resolved
B) Accept mutable major-version tags when the action publisher is well known
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 6
How should integrated acceptance failures affect the release decision?

A) Fail closed: any applicable high-risk security, privacy, accessibility, integrity, recovery, route, or performance finding blocks the deploy recommendation and names the failed requirement
B) Allow a positive release recommendation when only one applicable control fails
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 7
What recovery evidence should U-06 require before candidate activation?

A) Capture exact pre-unit hashes and absence states, rehearse restoration in isolation, verify source originals remain intact, and repeat recovery verification after any active promotion
B) Rely on Git history without an isolated recovery rehearsal
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 8
How should property-based failures be converted into permanent coverage?

A) Use fixed or logged seeds with shrinking enabled, record the minimal counterexample, and add a focused example regression before closing the finding
B) Rerun a failed property until it passes without retaining the counterexample
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

### Question 9
How should U-06 treat controls that do not apply to this static, public, no-backend portfolio?

A) Mark each control N/A with a concrete boundary-based rationale and reevaluate it only if the approved infrastructure design introduces the relevant component
B) Mark all controls compliant without implementation because the site is static
C) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Testable Property Candidates

- Integrated requirement evaluation preserves the complete requirement set and produces exactly one terminal status per requirement - invariant.
- Reordering independent evidence checks does not change the final release decision - commutativity.
- Re-evaluating an unchanged evidence bundle produces the same decision and report - idempotence.
- Release decision aggregation matches a simple fail-closed reference model - oracle.
- Recovery manifest serialization and parsing preserve governed paths, hashes, and absence states - round trip.
- Any generated check sequence containing one applicable blocking failure always produces a blocked release decision - easy verification.

## Extension Applicability at Planning

- **Security Baseline**: SECURITY-04, SECURITY-09 through SECURITY-11, SECURITY-13, and SECURITY-15 are applicable. SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 remain candidate N/A items unless Infrastructure Design introduces a relevant store, intermediary, API, identity boundary, or monitoring service.
- **Property-Based Testing**: PBT-01 is applicable during Functional Design. PBT-02 through PBT-10 are carried forward for detailed applicability and later implementation; no property test replaces a critical example-based acceptance check.
