# NFR Requirements Plan - U-03 Resume-Led Content Integration

> **Status: all fourteen decisions approved with Option A; NFR artifacts generated and awaiting review. This plan creates NFR documentation only and does not authorize application-code, content, asset, dependency, or deployment changes.**

## Unit Context

- **Approved Functional Design**: immutable reviewed claim ledger, field-level reconciliation, one canonical primary mapping, ten-section view models, shared dual-location native resume capability, fail-closed privacy/integrity validation, and ten testable properties.
- **Primary NFR**: NFR-015, prohibiting inferred claims and unsupported outcomes.
- **Inherited constraints**: WCAG-focused behavior, static hosting, U-01 source/privacy/integrity contracts, U-02 responsive shell, fixed section registry, existing Journal/contact behavior, and explicit candidate approval.
- **Active performance baseline**: 297,057 initial JavaScript bytes, 50,665 initial CSS bytes, and three initial requests after U-02.
- **Approved resume fact**: U-03 Code Generation Question 1 selected the newly supplied 113,775-byte PDF with SHA-256 `8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282`; the prior 169,191-byte protected copy remains recoverable from the U-03 preflight package.
- **Excluded**: archive-group loading, PDF/image viewers, backend services, runtime extraction, authentication, infrastructure, and deployment.

## NFR Category Assessment

- **Scalability**: Applies to claim/evidence volumes and deterministic linear reconciliation; distributed scaling is not applicable.
- **Performance**: Applies to bundle growth, initial requests, content rendering, layout stability, and native download behavior.
- **Availability**: Applies to static-build compatibility, safe retained activation, and graceful browser capability failure; server SLA/failover is deferred.
- **Security/privacy**: Applies to local-only reviewed inputs, phone exclusion, safe sources, generic diagnostics, integrity, and fail-closed activation.
- **Tech stack**: Applies to retained TypeScript/React/CSS/Vitest/Testing Library/fast-check and local candidate review; framework replacement is out of scope.
- **Reliability**: Applies to completeness, determinism, conflicts, immutable inputs, stable downloads, recovery, and regression behavior.
- **Maintainability**: Applies to one source of truth, domain ownership, complexity, typed findings, traceability, and documentation.
- **Usability/accessibility**: Applies to readable dense content, authority labels, two discoverable downloads, keyboard/focus, zoom, text spacing, and responsive layouts.

## NFR Decision Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Content Capacity and Complexity

What capacity and algorithmic constraint should the reconciliation/mapping core meet?

A) Support at least 250 reviewed claims and 500 evidence/provenance references in deterministic linear or near-linear processing, with no architecture change and no duplicate visible output; larger inputs trigger measurement and review (recommended)
B) Support only the exact initial resume claim count
C) Introduce a backend database to scale claim processing
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Initial JavaScript Budget

What post-U-03 JavaScript budget should preserve room for later units?

A) Keep initial JavaScript at or below 320 KiB and no more than 8 percent above the 297,057-byte U-02 baseline; any increase must be attributable and explicitly reviewed (recommended)
B) Allow initial JavaScript to grow to 500 KiB
C) Do not measure JavaScript growth
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - CSS and Initial Request Budget

What CSS and request boundary should apply?

A) Keep initial CSS at or below 60 KiB and no more than 12 percent above the 50,665-byte baseline; retain three initial requests and ensure the resume PDF is not fetched before explicit activation (recommended)
B) Permit 100 KiB CSS and preload the resume PDF
C) Do not measure CSS or requests
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Download Responsiveness and Integrity

What quality target should apply to both resume actions?

A) Use native anchors with no JavaScript loading state, identical href/filename/label semantics, and a bundled PDF matching the approved byte size and SHA-256 before candidate activation (recommended)
B) Fetch and reconstruct the PDF after the visitor clicks
C) Permit separate files or filenames at the two action locations
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Accessibility Conformance

What accessibility gate should resume-led content meet?

A) Require WCAG 2.2 AA-oriented semantic/component checks plus keyboard, focus, contrast, 200-percent zoom, increased text spacing, reduced-motion, forced-colors, and assistive-label review; automated scanning alone is insufficient (recommended)
B) Require only an automated accessibility scan
C) Use visual desktop review only
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Responsive and Browser Matrix

Which rendered compatibility matrix should block activation?

A) Review all ten sections and both downloads at 320, 768, 1280, and 1440 CSS pixels in both themes on current Chromium, Firefox, and Safari engines with representative iOS Safari; unavailable engines remain honestly manual-pending (recommended)
B) Review Identity only in Chromium at desktop and mobile widths
C) Skip rendered review if unit tests pass
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Content Correctness and Authority

Which accuracy threshold should apply?

A) Require 100 percent category and eligible-claim primary-mapping coverage, zero invented facts, zero silently resolved conflicts, zero unsupported authority labels, and zero duplicate visible primary statements (recommended)
B) Permit minor omissions and inferred wording if the page reads better
C) Spot-check a representative sample only
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Privacy Verification

How should the phone and document-only boundary be verified?

A) Use an approved non-echoing local marker scan across source, build output, DOM, metadata, fixtures, snapshots, logs, and generated evidence; allow a match only inside the approved PDF bytes and block on every other match (recommended)
B) Search visible page text manually
C) Retain the phone in models and rely on CSS hiding
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Security and Safe Failure

Which security behavior should U-03 enforce?

A) Accept only typed reviewed claims and validated local PDF capability, render no unsafe HTML/raw path, expose generic stable findings, preserve the last verified composition, and add no network, telemetry, authentication, or runtime document parser (recommended)
B) Permit raw extracted strings and local paths during candidate review
C) Add remote analytics and PDF parsing to observe downloads
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Reliability and Recovery

What recovery objective should candidate activation meet?

A) Capture a target-specific recovery baseline before mutation, rehearse isolated restoration, keep the current active composition until approval, fail closed on blockers, and restore U-03 changes within 30 minutes from repository-local evidence (recommended)
B) Depend on editor undo without a recovery package
C) Activate incrementally before validation is complete
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - Testing and PBT Quality

What executable quality gate should apply?

A) Retain strict TypeScript, ESLint, Vitest, Testing Library, boundary/style checks, and fast-check; run each U03-P01 through U03-P10 property at least 100 cases with shrinking, fixed/logged seed, no silent retry, reference oracle, and complementary examples (recommended)
B) Use property tests only and remove example/component tests
C) Use examples only and defer PBT-R08
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - Maintainability and Ownership

How should resume-led logic be structured?

A) Keep claim/reconciliation/mapping logic pure and centralized in the resume boundary, keep domain rendering in existing folders, reuse one download capability, use stable typed findings, and prohibit duplicated source facts or cross-domain private-field access (recommended)
B) Copy resume facts and mapping logic into each component
C) Centralize all domain components and styles into one new global module
X) Other (describe after the answer tag)

[Answer]: A

## Question 13 - Graceful Degradation and Availability

Which availability behavior belongs to U-03?

A) Require static-build operation, semantic content without enhancement-dependent hiding, native download fallback, safe retained activation, and honest browser limitations; mark server uptime, failover, monitoring, and disaster recovery N/A or U-06-owned (recommended)
B) Define a 99.99-percent backend SLA and add a service
C) Assume all browser capabilities always work
X) Other (describe after the answer tag)

[Answer]: A

## Question 14 - Activation Evidence

What evidence package should be required before approval?

A) Include source/resume hashes, mapping and category counts, conflict/privacy reports, focused/full tests, PBT seed/results, exact bundles/requests, rendered matrix/screenshots, accessibility checks, browser status, boundary scans, recovery verification, and `git diff --check` (recommended)
B) Provide screenshots and a successful production build only
C) Rely on reviewer intuition without a structured report
X) Other (describe after the answer tag)

[Answer]: A

## Execution Checklist

- [x] Read the approved U-03 Functional Design, unit/story/requirement map, U-01/U-02 contracts, current production measurements, Security Baseline, and full PBT rules.
- [x] Evaluate scalability, performance, availability, security, tech stack, reliability, maintainability, and usability categories.
- [x] Create measurable context-specific questions for capacity, budgets, requests, download integrity, accessibility, browsers, correctness, privacy, security, recovery, testing, ownership, availability, and evidence.
- [x] Receive and validate answers to all fourteen questions. All answers are Option A.
- [x] Resolve every ambiguity or contradiction through a dedicated clarification file if required. The approved answers are complete and mutually consistent; no clarification file is required.
- [x] Generate and validate `nfr-requirements.md` and `tech-stack-decisions.md`. The two Markdown artifacts parse cleanly and define 27 measurable requirements with no diagram syntax.
- [x] Map measurable requirements to stories, Functional Design rules/properties, and applicable SECURITY/PBT rules. All five stories, seven functional requirements, NFR-015, PBT-R08, U03-BR01 through U03-BR26, U03-P01 through U03-P10, SECURITY-01 through SECURITY-15, and PBT-01 through PBT-10 are accounted for.
- [x] Present the standardized NFR Requirements completion gate and wait for explicit approval.

## Required Artifacts

- `aidlc-docs/construction/resume-led-content-integration/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/resume-led-content-integration/nfr-requirements/tech-stack-decisions.md`

Approval of later NFR artifacts authorizes documentation progression only. It does not authorize resume extraction, claim transcription, application-code mutation, candidate activation, dependency installation, archive browsing, media dialogs, infrastructure, deployment, source deletion, or unrelated refactoring.
