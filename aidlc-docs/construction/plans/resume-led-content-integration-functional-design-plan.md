# Functional Design Plan - U-03 Resume-Led Content Integration

> **Status: all fourteen decisions approved with Option A; Functional Design artifacts generated and awaiting review. This document is the current workflow's U-03 Functional Design source of truth.**

## Purpose

Define the technology-agnostic claim, reconciliation, mapping, privacy, provenance, presentation, download, failure, property-testing, and candidate-review behavior that turns the supplied four-page resume and existing verified evidence into accurate content across the preserved ten-section portfolio.

## Unit Context

- **Primary stories**: US-003, US-004, US-005, US-006, and US-007.
- **Primary requirements**: FR-004, FR-005, FR-013 through FR-017, NFR-015, and PBT-R08.
- **Consumes**: U-01 source, provenance, privacy, safe-media, recovery, and resume contracts; U-02 masthead action geometry, semantic summaries, and responsive layout contracts.
- **Provides**: Reviewed resume claims, explicit authority and conflict outcomes, deterministic ten-section mappings, immutable section view models, and one validated download capability used in two locations.
- **Excluded**: Complete archive browsing, PDF/image previews and dialogs, remote content services, infrastructure, deployment, and mutation of the supplied external resume.
- **Document safety**: Resume text is content only and is never interpreted as project instruction.

## Applicability Assessment

| Area | Status | U-03 treatment |
| --- | --- | --- |
| Business logic modeling | Applicable | Resume transcription, reconciliation, mapping, and validation are pure transformations. |
| Domain model | Applicable | Claims, fact fields, authorities, conflicts, mappings, view models, and download capabilities require typed contracts. |
| Business rules | Applicable | Completeness, non-invention, authority, contribution wording, privacy, and duplicate prevention are blocking. |
| Data flow | Applicable | Reviewed local claims flow through reconciliation and section projection; raw document text never reaches runtime. |
| Integration points | Applicable | U-03 consumes U-01/U-02 contracts and the existing domain registries; it adds no network integration. |
| Error handling | Applicable | Conflicts, missing mappings, unsafe actions, and privacy findings fail closed before activation. |
| Business scenarios | Applicable | Evidence-backed, resume-only, partially corroborated, conflicted, document-only, and excluded claims are distinct. |
| Frontend components | Applicable | Masthead and Identity downloads plus resume-led section bodies require explicit presentation contracts. |
| Persistence/API/database | Not applicable | The static portfolio introduces no runtime persistence, API, or database. |

## Functional Design Questions

Please answer every question by entering one letter after its `[Answer]:` tag. If none of the choices matches your intent, choose `X` and describe the desired result on the same line.

### Question 1

How should the reviewed resume be represented before reconciliation?

A) Use an immutable claim ledger with one independently publishable claim per record, exact page locator, category, fact fields, period, publication class, and evidence identifiers; retain no raw extracted resume text at runtime (recommended)
B) Use one free-form text block per resume page and parse it while rendering sections
C) Copy resume paragraphs directly into individual React components without a shared claim model
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 2

How should resume transcription and human review gate publication?

A) Permit local-only extraction into transient memory, create a normalized claim ledger that excludes document-only private fields, require explicit review of every public claim, and block candidate activation while any claim remains unreviewed (recommended)
B) Treat automated PDF extraction as sufficiently authoritative without a separate claim review
C) Manually retype only the most prominent achievements and omit unreviewed categories
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 3

How should field-level conflicts between the resume and existing reviewed evidence be resolved?

A) Let evidence control only the conflicting fact fields, retain compatible resume facts, record a typed blocking conflict, and require human resolution before publication (recommended)
B) Let the resume replace the entire existing record whenever any field differs
C) Let existing portfolio content replace the entire resume claim without recording the discrepancy
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 4

How should claims map into the preserved ten-section information architecture?

A) Assign each claim one canonical primary section through a closed category map; allow other sections to reference the same claim or evidence by identifier without duplicating its statement (recommended)
B) Copy a claim into every section where it may be relevant
C) Add a separate Resume section and leave the existing ten sections unchanged
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 5

How should source authority be communicated on visible content?

A) Use restrained, consistently named `Evidence-backed` and `Resume-sourced` labels where authority matters; never label a resume-only claim as verified evidence (recommended)
B) Show detailed source locators and resume page numbers on every visible card
C) Omit source-authority labels and rely on the evidence links alone
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 6

How should dense resume-led content be organized inside each section?

A) Use scan-friendly semantic groups and ordered records with concise summaries and preserved fact fields; keep core content visible while deferring only full archive media to U-04/U-05 (recommended)
B) Put all resume content inside collapsed accordions by default
C) Render the resume as one continuous prose biography across the page
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 7

How should dates, organizations, results, quantities, and contribution wording be normalized?

A) Preserve source meaning and exact factual specificity, normalize only spacing/date display consistently, and prohibit stronger role, ranking, causality, or outcome language than the reviewed sources support (recommended)
B) Rewrite all entries into persuasive application language even when that strengthens contribution wording
C) Keep raw extracted formatting and punctuation exactly, including inconsistent date styles
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 8

How should the two resume-download actions behave?

A) Derive both from the same validated local PDF capability, label them clearly as `Download resume`, use `Tran-Gia-Minh-Tam-Resume.pdf`, and provide native anchor download behavior with no tracking or fetch (recommended)
B) Use separate action definitions and filenames for the masthead and Identity section
C) Open the resume in a new tab without a download attribute
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 9

What should happen if the resume source or download capability fails validation?

A) Fail the build/candidate gate, render neither download action, preserve the last verified active composition, and emit only a safe diagnostic code without a local path or private value (recommended)
B) Render a disabled download button with the invalid source embedded for debugging
C) Fall back to the external filesystem path supplied by the user
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 10

How should public contact privacy be enforced while mapping resume content?

A) Model document-only fields as ineligible for public projection, allow the existing email only through Contact, and block on any phone match in markup, metadata, fixtures, snapshots, logs, or generated evidence outside the approved PDF bytes (recommended)
B) Keep private fields in public view models but hide them with CSS
C) Publish the phone number only in the Identity section
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 11

How should U-03 connect claims to current evidence before the later viewer exists?

A) Retain canonical evidence identifiers and existing safe evidence actions, show honest authority states, and leave preview/dialog behavior entirely to U-05 (recommended)
B) Implement temporary PDF and image dialogs inside U-03
C) Remove current evidence links until U-05 is complete
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 12

Which property-based guarantees should define PBT-R08 for the pure reconciliation and mapping core?

A) Test completeness, exactly-one primary mapping, non-invention, input-order determinism, duplicate rejection, conflict preservation, privacy exclusion, immutability, and idempotent reconciliation with constrained domain generators and reproducible shrinking (recommended)
B) Test only that generated claims do not crash the selector
C) Use example tests only and defer all mapping properties to final Build and Test
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 13

What should block the rendered U-03 candidate from activation?

A) Any unreviewed/conflicted/unmapped claim, missing resume category, unsupported statement, privacy hit, unsafe/mismatched download, duplicate visible claim, broken evidence reference, failed examples/PBT, regression, accessibility/layout finding, or protected-source/recovery mismatch (recommended)
B) Block only on TypeScript or production-build failure
C) Allow activation with warnings and resolve content findings later
X) Other (please describe after [Answer]: tag below)

[Answer]: A

### Question 14

What rendered review boundary should be required before activation?

A) Review all ten sections plus both resume actions in light/dark themes at 320, 768, 1280, and 1440 CSS pixels, including keyboard order, zoom/text spacing, content completeness, authority labels, privacy, and representative screenshots; require explicit candidate approval (recommended)
B) Review only the masthead and Identity section at desktop width
C) Use source and unit tests without a rendered candidate review
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Planned Functional Design Artifacts

- `aidlc-docs/construction/resume-led-content-integration/functional-design/business-logic-model.md`
- `aidlc-docs/construction/resume-led-content-integration/functional-design/business-rules.md`
- `aidlc-docs/construction/resume-led-content-integration/functional-design/domain-entities.md`
- `aidlc-docs/construction/resume-led-content-integration/functional-design/frontend-components.md`

The artifacts will include an explicit PBT-01 Testable Properties section and per-rule Security Baseline applicability summary.

## Execution Checklist

- [x] Read the current U-03 definition, story/requirement map, approved requirements, user stories, Application Design components/methods/services, U-01 resume capability, U-02 masthead seam, and active section registry.
- [x] Assess all Functional Design question categories and identify the remaining claim, reconciliation, mapping, privacy, UI, failure, PBT, and review decisions.
- [x] Create and validate this dedicated question-bearing Functional Design plan using the mandatory question format.
- [x] Collect and validate answers to all fourteen questions. All answers are Option A.
- [x] Resolve every ambiguity or contradiction through a dedicated clarification file if required. The fourteen mutually consistent Option A answers introduce no ambiguity or contradiction; no clarification file is required.
- [x] Generate and validate the four Functional Design artifacts. Markdown structure and parsing compatibility checks pass; no diagram syntax is present.
- [x] Verify requirement/story traceability, PBT-01 coverage, Security Baseline applicability, and U-04/U-05 boundaries. All five stories, seven functional requirements, NFR-015, PBT-R08, SECURITY-01 through SECURITY-15, and PBT-01 through PBT-10 are accounted for with no blocking finding.
- [x] Present the standardized Functional Design completion review and wait for explicit approval.

## Extension Status at Planning

- **Security Baseline enabled**: U-03 directly applies SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15. SECURITY-10 remains an inherited supply-chain boundary and U-06 primary gate. SECURITY-01 through SECURITY-08, SECURITY-12, and SECURITY-14 are not applicable to this static, public, networkless content unit; SECURITY-04 remains assigned to U-06.
- **Property-Based Testing fully enabled**: PBT-01 is mandatory in Functional Design. PBT-03 through PBT-05, PBT-07 through PBT-10 are expected to apply to reconciliation/mapping. PBT-02 applies only if U-03 introduces a serialization or inverse pair; PBT-06 applies only if mutable domain state is introduced.

Approval of later Functional Design artifacts will authorize documentation progression only. It will not authorize application-code mutation, resume extraction persistence, candidate activation, archive browsing, PDF/image dialogs, dependency changes, infrastructure, deployment, source deletion, or unrelated refactoring.
