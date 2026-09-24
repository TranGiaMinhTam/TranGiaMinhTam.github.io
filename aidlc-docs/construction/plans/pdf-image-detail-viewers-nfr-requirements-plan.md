# NFR Requirements Plan - U-05 PDF and Image Detail Viewers

> **Status: Complete and approved on 2026-09-24.** This document is the single source of truth for U-05 NFR Requirements.

## Unit Context

- **Stories**: US-014, US-015, US-016, and US-019.
- **Requirements**: FR-026 through FR-035; NFR-001 through NFR-003, NFR-005 through NFR-012, and NFR-018 through NFR-020; PBT-R07; SEC-R02, SEC-R06, SEC-R07, and SEC-R08.
- **Functional design**: One shared accessible PDF/image dialog host, token-based bounded geometry, lazy full media, `4 / 3` cropped image cards, `3 / 4` contained PDF previews, uncropped detail images, bounded group navigation, safe failures, and exact focus restoration.
- **Active content amendment**: The first computational project has one image, `IMG_4208.JPG`; its single-item viewer group keeps Previous and Next disabled. The other four docking photographs belong to the Scientific Research archive group.
- **Boundaries**: Static React/Vite site; no backend, authentication, persistence, analytics, remote conversion, deployment migration, or unapproved dependency.

## Stage Plan

- [x] Step 1 - Read the approved U-05 Functional Design artifacts, unit responsibilities, requirements, active media/archive boundaries, and enabled Security Baseline and Property-Based Testing rules.
- [x] Step 2 - Create this NFR Requirements plan covering performance, accessibility, reliability, security, maintainability, browser support, and technology choices.
- [x] Step 3 - Generate nine decision questions for remaining NFR and technology ambiguities.
- [x] Step 4 - Collect all answers, validate letter choices, and resolve every contradiction or ambiguity in a dedicated clarification file if needed. All nine answers are Option A; they are complete, valid, mutually consistent, and require no clarification file.
- [x] Step 5 - Generate `nfr-requirements.md` with measurable accessibility, responsive, performance, reliability, security, maintainability, and verification targets.
- [x] Step 6 - Generate `tech-stack-decisions.md` with approved platform, dialog, PDF, lazy-loading, testing, and dependency decisions.
- [x] Step 7 - Validate Markdown/content syntax, requirement traceability, Security Baseline compliance, and PBT applicability; then present the standardized NFR Requirements completion gate. Both artifacts have valid Markdown structure, zero tabs, no unbalanced code fences, measurable requirement mappings, complete SECURITY-01 through SECURITY-15 dispositions, and PBT-09 framework compliance with downstream PBT obligations. No blocking finding remains.

## Question 1 - Dialog Platform

Which implementation should own modal semantics and focus behavior?

A) Use the browser-native `<dialog>` element through one React host, with `showModal()`, explicit focus management, inert/background cleanup, and a tested fallback for unsupported behavior (recommended)
B) Build a custom ARIA dialog container and implement every modal behavior without native `<dialog>`
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Viewer Code Loading

When should PDF/image viewer implementation code enter the browser?

A) Keep the shared host shell minimal and interaction-load viewer bodies with React/Vite dynamic imports; archive groups remain independently lazy (recommended)
B) Include all PDF and image viewer code in the initial application bundle
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Performance Budgets

What budget should govern this unit?

A) Do not increase the approved initial JavaScript/CSS ceilings; keep each interaction-loaded viewer JavaScript chunk at or below 64 KiB raw and preserve three initial requests (recommended)
B) Permit up to a 10-percent increase in the initial JavaScript and CSS ceilings to simplify implementation
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - PDF Rendering Strategy

How should full PDFs render after explicit activation?

A) Use the browser-native same-origin PDF viewer inside the dialog, retain Download and Open-in-new-tab actions, and fall back to those actions when embedding is unavailable (recommended)
B) Add a client-side PDF rendering library and render pages into application-managed canvases
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Large Media Policy

How should unusually large but approved media behave?

A) Use manifest byte metadata, load originals only after interaction, allow embedded PDF attempts up to 64 MiB and images up to 16 MiB, and otherwise retain metadata with Download/Open actions (recommended)
B) Attempt to embed every approved original regardless of byte size
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Browser and Accessibility Matrix

Which compatibility target should apply?

A) Support current evergreen Chrome, Firefox, desktop Safari, and iOS Safari; automate Chrome at 320/768/1280/1440 in both themes plus zoom/text-spacing checks, and record unavailable manual engines honestly (recommended)
B) Support and test current Chrome only
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Reliability and Availability

What reliability posture should a static portfolio viewer use?

A) Preserve static-host availability, require deterministic local capability resolution, fail each media body independently, and keep the surrounding page usable without a separate service-level objective (recommended)
B) Add a runtime media proxy/service with its own uptime and retry requirements
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Source and Embed Security

Which viewer-source boundary should be mandatory?

A) Allow only centrally validated bundled URLs and explicitly approved HTTPS URLs, reject unsafe schemes, keep metadata as React text/attributes, and apply restrictive same-origin embedding/CSP rules in U-06 (recommended)
B) Allow arbitrary external image and PDF URLs supplied by catalog records
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Verification Stack

Which quality stack should Code Generation use?

A) Reuse React, TypeScript, CSS modules/tokens, Vitest, Testing Library, fast-check, current boundary/integrity scripts, and headless Chrome without adding a viewer dependency (recommended)
B) Add a modal/viewer component library and replace the current test approach with that library's utilities
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Planned NFR Artifacts

- `aidlc-docs/construction/pdf-image-detail-viewers/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/pdf-image-detail-viewers/nfr-requirements/tech-stack-decisions.md`

## Applicable Extension Gates

- **Security Baseline**: SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15 are applicable to safe failures, misuse resistance, admitted media integrity, and cleanup. SECURITY-04 and SECURITY-10 remain U-06 delivery gates. All network, persistence, IAM, API, authentication, and monitoring-only rules are expected to be N/A unless the answers expand scope.
- **Property-Based Testing**: PBT rules covering invariants, oracle/model comparison, generators, shrinking, reproducible seeds, and stateful sequences apply to navigation, capability resolution, and the dialog reducer. Round-trip and idempotence remain N/A unless an inverse or idempotent transformation is introduced.
