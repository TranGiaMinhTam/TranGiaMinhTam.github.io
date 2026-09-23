# NFR Requirements Plan - U-01 Foundation and Safe Migration

> **Status: Approved on 2026-09-13 using all option A decisions.**

## Purpose

Define measurable quality requirements and technology choices for the U-01 foundation. The assessment covers growth, performance budgets, recovery, product privacy, deterministic reliability, maintainability, accessibility, usability, compatibility, and release evidence without introducing infrastructure or runtime services.

## Unit Context

- U-01 owns canonical content contracts, the evidence publication boundary, semantic foundations, visualization accessibility contracts, recovery guarantees, validation safeguards, and the performance baseline.
- U-01 does not switch the application entry or implement the visible shell and domains.
- The portfolio remains a static React and Vite application deployed through GitHub Pages.
- Security Baseline and Property-Based Testing extensions remain disabled; approved product privacy and integrity requirements still apply.

## NFR Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Scalability | Applicable | Content, evidence, relationship, and validation growth must remain manageable without architectural expansion. |
| Performance | Applicable | The redesign has a strict initial-bundle reduction and asset-loading requirements. |
| Availability | Applicable | Static delivery is externally hosted, while recovery and optional-resource continuity remain product concerns. |
| Security | Applicable within approved product scope | The site must not ship private evidence, secrets, unsafe links, or persist visitor data despite the extension being disabled. |
| Tech stack | Applicable | The new active boundary must choose a lean, supported frontend and testing stack. |
| Reliability | Applicable | Identical inputs, missing optional assets, conflicts, and failed builds require deterministic behavior. |
| Maintainability | Applicable | The foundation replaces overlapping styles and establishes stable contracts used by six later units. |
| Usability | Applicable | WCAG 2.2 AA, responsive reflow, nonvisual equivalents, and understandable errors are blocking. |

## Questions

## Question 1 - Content and Evidence Growth

What scalability target should the static foundation support?

A) Support at least twice the approved launch counts of content records, relationships, and published evidence without changing architecture, while using curation and build-time validation rather than new services when limits are approached
B) Optimize only for the exact launch record counts and redesign the model for every addition
C) Introduce a database and API now to accommodate unlimited growth
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2 - Performance Budgets

Which measurable performance budget should guide this redesign?

A) Target final initial JavaScript at no more than 450 KiB minified, initial CSS at no more than 75 KiB, exclude full PDFs and high-resolution evidence from the initial graph, and require explicit review for any greater-than-10-percent regression from the latest approved measurement
B) Require only that JavaScript is below the approximate 893 kB current result, with no CSS or asset-graph budgets
C) Set no numerical budget until after all implementation is complete
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3 - Recovery and Continuity

What recovery objective should the U-01 snapshot satisfy?

A) Provide a verified, documented restoration path that can reconstruct the captured rejected-attempt state in a compatible checkout within 30 minutes, without relying on editor history or external services
B) Preserve filenames only, with no restoration verification or time objective
C) Depend on an external backup provider not currently part of the repository workflow
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4 - Product Security and Privacy Boundary

Which security and privacy posture should apply despite the optional Security Baseline extension remaining disabled?

A) Enforce the approved static-site boundary: no secrets, tokens, runtime APIs, user-data persistence, raw private evidence, unsafe URL schemes, or opener access from new-tab links; validate dependencies and published assets during delivery
B) Apply no security or privacy checks because the extension is disabled
C) Add authentication and authorization for all portfolio visitors
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5 - Technology Stack

Which active foundation stack should later Code Generation target?

A) Retain React 19, TypeScript, Vite, Vitest, and Testing Library; use semantic native HTML/SVG, CSS Modules, and CSS custom-property tokens; add no UI framework and keep Chakra outside the new active portfolio boundary
B) Keep Chakra UI as the active component and responsive-layout foundation
C) Replace React and Vite with a new framework during U-01
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6 - Reliability and Validation Coverage

How strong should deterministic validation coverage be?

A) Test every documented blocking and warning rule family, stable finding ordering, safe optional omissions, and representative invalid relationships; any uncaught validation exception or nondeterministic result blocks approval
B) Test only successful canonical content and published evidence paths
C) Depend on manual review without automated validation coverage
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 7 - Maintainability Gate

What maintainability criteria should block U-01 approval?

A) Require strict TypeScript, lint, focused tests, documented public contracts, one-way imports, local style ownership, no routine `!important`, no active rejected-design imports, and no unexplained warnings in new foundation code
B) Require only that the production build completes
C) Permit duplicate models and temporary cross-domain imports until final cleanup
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 8 - Accessibility and Usability Targets

Which measurable accessibility targets should the foundation enforce?

A) Treat WCAG 2.2 AA as blocking, including keyboard operation, visible and unobscured focus, semantic alternatives, 4.5:1 normal-text contrast, 3:1 large-text and meaningful-graphic contrast, 200-percent zoom, 320-CSS-pixel reflow, reduced motion, and at least 24-by-24-CSS-pixel pointer targets where applicable
B) Require keyboard access and alternative text but defer contrast, reflow, focus, and target-size checks
C) Treat automated accessibility scans as sufficient without manual semantic or keyboard review
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 9 - Browser Compatibility

Which compatibility target should U-01 contracts and later verification use?

A) Support the latest two stable major versions of Chrome, Edge, Firefox, and Safari plus current iOS Safari and Android Chrome, with system-font, no-storage, no-motion, and no-IntersectionObserver fallbacks where the owning feature needs them
B) Support only the maintainer's current desktop Chrome version
C) Add legacy Internet Explorer support
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 10 - Evidence for NFR Acceptance

What evidence should be required before U-01 passes its post-generation review?

A) Record exact commands, tool versions, focused results, rule coverage, accessibility checks, recovery verification, bundle and asset measurements, and any warnings with dispositions in the U-01 code summary
B) Report only whether the production build succeeded
C) Defer all evidence collection to final Build and Test
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read all U-01 Functional Design artifacts and approved cross-cutting requirements.
- [x] Evaluate scalability, performance, availability, security, tech stack, reliability, maintainability, and usability.
- [x] Create context-specific questions with measurable recommended choices.
- [x] Receive answers to all ten NFR questions.
- [x] Analyze answers for ambiguity, contradictions, combined choices, and undefined terms.
- [x] Add and resolve follow-up questions when needed; all option A decisions are compatible and require none.
- [x] Record explicit approval of the completed NFR Requirements plan.

### Requirements Generation

- [x] Generate `nfr-requirements.md` with measurable U-01 quality requirements, priorities, acceptance methods, and traceability.
- [x] Generate `tech-stack-decisions.md` with selected technologies, rationale, constraints, alternatives, and version policy.
- [x] Validate both artifacts against approved answers, U-01 Functional Design, and project-level NFRs.
- [x] Validate Markdown, tables, links, and any diagrams with text alternatives.
- [x] Present completed NFR Requirements for explicit approval before NFR Design.

## Required Artifacts

- [x] `aidlc-docs/construction/foundation-safe-migration/nfr-requirements/nfr-requirements.md`
- [x] `aidlc-docs/construction/foundation-safe-migration/nfr-requirements/tech-stack-decisions.md`

## Boundary

- Approval of this plan authorizes NFR documentation only.
- It does not authorize code generation, dependency installation or removal, snapshot creation, asset transformation, entry switching, cleanup, or deletion.
- Infrastructure Design remains skipped because the deployment architecture is unchanged.
