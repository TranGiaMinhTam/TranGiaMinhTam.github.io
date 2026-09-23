# NFR Design Plan - U-03 Resume-Led Content Integration

> **Status: all fourteen decisions approved with Option A; NFR Design artifacts generated and awaiting review. This plan creates design documentation only and does not authorize application-code, content, asset, dependency, candidate, or deployment changes.**

## Unit Context

- **Approved Functional Design**: reviewed immutable claims, field-level reconciliation, closed primary-section mapping, validated section view models, shared native resume capability, typed blocking findings, and U03-P01 through U03-P10.
- **Approved NFR Requirements**: 27 measurable capacity, performance, integrity, privacy, security, accessibility, browser, recovery, maintainability, testing, and evidence requirements.
- **Stack boundary**: existing React, strict TypeScript, Vite, CSS Modules, Vitest, Testing Library, fast-check, source/boundary checks, and local rendered-review tooling; no new dependency or service.
- **Infrastructure applicability**: databases, queues, caches, circuit breakers, load balancers, remote observability, and server retry/failover are N/A. U-03 requires logical source, validation, projection, privacy, evidence, candidate, recovery, and activation components only.

## NFR Design Category Assessment

- **Resilience**: Applicable to fail-closed admission, retained active composition, generic findings, no retries that hide deterministic failures, and rehearsed restoration.
- **Scalability**: Applicable to indexed linear reconciliation and bounded static content capacity; horizontal infrastructure scaling is N/A.
- **Performance**: Applicable to build-time validation, immutable precomputed view models, native downloads, no eager PDF request, exact bundle/request/CLS measurement, and CSS-first layout.
- **Security**: Applicable to privacy-by-construction, typed capabilities, safe React rendering, integrity hashes, non-echoing scans, boundary enforcement, and layered promotion gates.
- **Logical components**: Applicable to claim source, reconciliation engine, section mapper, projection validator, resume capability adapter, privacy/integrity verifier, candidate composition, rendered reviewer, evidence collector, recovery controller, and activation gate.

## NFR Design Questions

Complete every `[Answer]:` tag with one option letter. Option A is recommended.

## Question 1 - Candidate Isolation Pattern

How should U-03 remain separate from the active composition until approval?

A) Build an isolated candidate composition using the approved U-01/U-02 contracts and proposed U-03 models, hash-protect the active entry/registries, and promote through one small reversible composition change only after every gate and explicit rendered approval (recommended)
B) Modify active section data incrementally and rely on later rollback
C) Put incomplete content behind per-component runtime flags in production
X) Other (describe after the answer tag)

[Answer]: A

## Question 2 - Claim Admission and Failure Pattern

How should invalid or incomplete content flow through the system?

A) Use a staged pure validation pipeline returning discriminated `ready` or `blocked` results with normalized stable findings; never throw for expected content errors and never expose partial view models (recommended)
B) Let each React component ignore invalid fields independently
C) Throw on the first invalid claim and show the exception to the visitor
X) Other (describe after the answer tag)

[Answer]: A

## Question 3 - Scalable Reconciliation Pattern

How should U-03 meet the 250-claim/500-reference capacity target?

A) Build immutable ID-index maps once, reconcile supported fact keys in single passes, apply a constant-time closed category map, and sort only final bounded groups by explicit order and stable ID (recommended)
B) Scan every record/evidence collection repeatedly for every claim
C) Add a client-side database and cache
X) Other (describe after the answer tag)

[Answer]: A

## Question 4 - Runtime Performance Pattern

Where should reconciliation and validation execute?

A) Validate reviewed source models before candidate composition and ship only immutable ready view models; keep browser work to normal React rendering and native links, with no runtime PDF parsing, fetch, worker, or cache (recommended)
B) Parse the resume and reconcile all claims in the browser on every page load
C) Fetch preprocessed claims from a new API
X) Other (describe after the answer tag)

[Answer]: A

## Question 5 - Privacy-by-Construction Pattern

How should document-only fields be prevented from reaching public surfaces?

A) Separate public and document-only types at admission, project only from the public type, add compile/source boundary checks, and run a non-echoing marker scan across source/build/DOM/artifacts as a final independent control (recommended)
B) Keep all fields in one runtime object and hide private values with CSS
C) Remove the phone only from visible JSX strings
X) Other (describe after the answer tag)

[Answer]: A

## Question 6 - Resume Integrity and Capability Pattern

How should the two download actions receive their source?

A) Verify the bundled PDF bytes/hash once, create one immutable validated local capability, inject it into masthead and Identity, and require identity equality plus exact href/filename/label assertions (recommended)
B) Build separate action objects from raw strings in each component
C) Resolve the user's external filesystem path at runtime
X) Other (describe after the answer tag)

[Answer]: A

## Question 7 - Resilience and Retry Policy

What retry or fallback behavior should content failures use?

A) Do not retry deterministic validation, conflict, privacy, or integrity failures; retain the last verified active composition, report safe findings, and require corrected reviewed input plus a fresh candidate run (recommended)
B) Retry validation automatically until it passes
C) Publish valid sections while silently omitting failed claims
X) Other (describe after the answer tag)

[Answer]: A

## Question 8 - Rendered Review Architecture

How should the viewport/theme/accessibility/browser matrix be generated?

A) Generate canonical cases from ten sections, four widths, two themes, and focused zoom/text-spacing/keyboard variants; use capability-detected local adapters, deterministic metrics, necessary screenshots, and honest manual-pending engine status (recommended)
B) Capture ad hoc Identity screenshots only
C) Upload resume content and sources to a hosted review service
X) Other (describe after the answer tag)

[Answer]: A

## Question 9 - Performance and Request Evidence

How should the exact bundle/request/CLS budgets be enforced?

A) Capture the U-02 production baseline, build the isolated candidate, compare manifest bytes and initial request graph, probe delayed PDF loading and CLS locally, and block promotion on either absolute or percentage budget failure (recommended)
B) Inspect only the final total `dist` directory size
C) Measure after active promotion and accept regressions below one megabyte
X) Other (describe after the answer tag)

[Answer]: A

## Question 10 - Recovery Pattern

How should U-03 achieve the 30-minute restoration objective?

A) Capture target existence/content/hash plus active composition, registries, protected source/resume facts, and planned absence states; rehearse isolated restoration and verify the payload at candidate and activation gates without resetting unrelated work (recommended)
B) Write `.backup` siblings beside modified files
C) Depend on editor undo or a broad Git reset
X) Other (describe after the answer tag)

[Answer]: A

## Question 11 - Evidence and Diagnostics Components

How should validation and review output be represented?

A) Emit schema-versioned canonical JSON for counts, findings, hashes, measurements, browser status, and gates plus a concise Markdown review summary; normalize order, use safe relative targets, and exit non-zero on blockers (recommended)
B) Print console prose only
C) Send production telemetry to a remote dashboard
X) Other (describe after the answer tag)

[Answer]: A

## Question 12 - PBT and Example-Test Integration

How should U03-P01 through U03-P10 integrate with the existing test harness?

A) Reuse fast-check/Vitest and shared safe primitives, add constrained resume-domain arbitraries plus simple reference oracles, run at least 100 cases with fixed/logged seed, preserve shrinking/no-retry, and keep story/privacy/download examples separate (recommended)
B) Introduce a second random testing framework
C) Run property tests manually outside normal verification
X) Other (describe after the answer tag)

[Answer]: A

## Question 13 - Logical Infrastructure Boundary

Which additional infrastructure components should U-03 introduce?

A) None; use repository-local pure modules, static assets, build/test scripts, candidate output, and evidence files only—no queue, cache, database, API, circuit breaker, remote logger, or server process (recommended)
B) Add a client database and service worker cache for resume claims
C) Add a server API, queue, and monitoring stack
X) Other (describe after the answer tag)

[Answer]: A

## Question 14 - Final Activation Gate

Which components must agree before promotion?

A) Require source/resume integrity, recovery, claim/category/reference reports, zero conflicts/privacy hits, focused examples and U03-P01 through P10, strict TypeScript, lint, full tests, boundary/accessibility checks, complete rendered review, exact budgets/requests/CLS, documented browser status, `git diff --check`, and explicit candidate approval (recommended)
B) Promote after TypeScript and the production build pass
C) Let each domain activate independently after local tests
X) Other (describe after the answer tag)

[Answer]: A

## Execution Checklist

- [x] Read the approved U-03 Functional Design, NFR Requirements, Tech Stack Decisions, U-01/U-02 contracts, Security Baseline, and full PBT rules.
- [x] Evaluate resilience, scalability, performance, security, and logical-component categories, including explicit infrastructure N/A decisions.
- [x] Create pattern/component questions for candidate isolation, admission, indexed reconciliation, runtime performance, privacy, resume integrity, retries, rendered review, measurement, recovery, evidence, PBT, infrastructure, and activation.
- [x] Receive and validate answers to all fourteen questions. All answers are Option A.
- [x] Resolve every ambiguity or contradiction through a dedicated clarification file if required. The approved answers are complete and mutually consistent; no clarification file is required.
- [x] Generate and validate `nfr-design-patterns.md` and `logical-components.md`. The artifacts define twelve patterns and seventeen logical components, parse cleanly, and contain no diagram syntax.
- [x] Map patterns/components to U03-NFR-01 through U03-NFR-27 and applicable SECURITY/PBT rules. All NFRs, applicable SECURITY-09/10/11/13/15 controls, PBT-01/03/04/05/07/08/09/10 controls, and explicit N/A decisions are covered with no blocking finding.
- [x] Present the standardized NFR Design completion gate and wait for explicit approval.

## Required Artifacts

- `aidlc-docs/construction/resume-led-content-integration/nfr-design/nfr-design-patterns.md`
- `aidlc-docs/construction/resume-led-content-integration/nfr-design/logical-components.md`

Approval of later NFR Design artifacts authorizes documentation progression only. It does not authorize resume extraction, claim transcription, application-code mutation, dependency installation, candidate activation, archive browsing, media dialogs, infrastructure, deployment, source deletion, or unrelated refactoring.
