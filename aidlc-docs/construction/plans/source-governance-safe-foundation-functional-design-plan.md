# Functional Design Plan: U-01 Source Governance and Safe Foundation

> **Status: Functional Design complete; explicit approval required. No source, asset, package, or build mutation is authorized.**

## Purpose

Define the detailed, technology-agnostic business logic for physical inventory, stable identity, hash canonicalization, curated publication metadata, resume copying/privacy, derivative outcomes, safe media admission, recovery evidence, validation severity, and property-based verification. U-01 produces stable contracts only and does not activate visible presentation.

## Unit Context

- **Primary stories**: US-010, US-011, US-012, US-021.
- **Primary functional requirements**: FR-006, FR-018, FR-019, FR-022 through FR-025.
- **Primary non-functional requirements**: NFR-013, NFR-014, NFR-016 through NFR-018, NFR-020.
- **Primary PBT requirements**: PBT-R01 through PBT-R06.
- **Security ownership**: SEC-R04, SEC-R05, and SEC-R07, plus applicable SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15 controls.
- **Inputs**: External supplied resume, 122-file `src/assets/minh-tam/` archive, current evidence records, approved Inception artifacts, and uncommitted recovery context.
- **Outputs**: Validated inventory/canonical catalog contracts, curated metadata contract, derivative manifest and fallbacks, safe source policy, resume asset capability, reusable generators, and recovery facts.
- **Exclusions**: Masthead/layout activation, resume prose integration, archive UI, media dialogs, infrastructure, backend services, analytics, destructive cleanup, and deployment.

## Question Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Business logic modeling | Applicable | Inventory, canonicalization, metadata joining, conversion disposition, privacy, and recovery are the core workflows. |
| Domain model | Applicable | Physical assets, hashes, canonical entries, aliases, metadata, derivatives, sources, findings, and recovery facts require exact relationships. |
| Business rules | Applicable | Publication eligibility, safe schemes, privacy exclusions, validation severity, and non-destructive guarantees are blocking. |
| Data flow | Applicable | Local files transform into generated facts and validated runtime capabilities without runtime persistence. |
| Integration points | Applicable | Filesystem reads, hashing, local converters, Vite assets, and approved HTTPS sources are explicit boundaries; no runtime API exists. |
| Error handling | Applicable | Unreadable files, path escape, collisions, conflicts, conversion failure, unsafe URLs, and privacy leaks need deterministic outcomes. |
| Business scenarios | Applicable | Exact duplicates, curated equivalents, malformed names, unsupported formats, oversized media, and changed sources are material cases. |
| Frontend components | Limited but applicable | U-01 defines safe capability and failure contracts consumed by later UI, but renders no new visible feature. |

## Design Questions

Please answer each question by placing the selected letter after its `[Answer]:` tag. The recommended choice is listed first.

## Question 1 - Physical Asset Identity

How should a physical source file receive a stable identity?

A) Derive its physical ID from a normalized repository-relative path, store SHA-256 separately as content identity, and treat any path/hash change as a new inventory fact requiring review
B) Use only the filename, allowing identical names in different folders to collide
C) Use an incrementing number assigned by current scan order
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Inventory Scope

What should the inventory workflow include?

A) Recursively inventory every regular source file under the explicitly approved archive root, keep generated derivatives in a separate managed root, and reject path or symbolic-link escape
B) Inventory only files already referenced by the application
C) Inventory only PDFs and browser-supported images
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Canonical Equivalence

How should duplicates and equivalent curated/source representations resolve to one canonical item?

A) Automatically group only exact SHA-256 matches; require an explicit reviewed equivalence/alias record for non-identical representations and prohibit filename or visual heuristics
B) Treat matching filenames as duplicates even when hashes differ
C) Use file size and approximate names to merge likely equivalents automatically
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Canonical Identity and Ordering

How should canonical IDs and ordering remain deterministic?

A) Use a stable reviewed canonical ID independent of scan order, retain the content hash and every physical member, and order by explicit curated order with canonical ID as a tie-breaker
B) Use the first source path encountered as the canonical ID and filesystem enumeration order for display
C) Regenerate sequential canonical IDs during every scan
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Metadata and Publication Eligibility

What should happen when an inventoried canonical item lacks complete reviewed metadata or a publication disposition?

A) Keep it in the internal inventory with a blocking review finding and do not expose an interactive public capability until title, category, accessibility treatment, authority, and disposition are approved
B) Publish it using its raw filename and guessed category
C) Drop it from generated outputs without a finding
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Supplied Resume Boundary

How should the supplied resume enter the application asset boundary?

A) Copy it without altering bytes, verify source and copied SHA-256 equality, assign the stable download filename, and prohibit extracted phone data from all generated public models and metadata
B) Re-export or edit the PDF to remove the phone number before copying it
C) Link directly to the absolute external filesystem path
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Derivative Ownership

Where should generated HEIC, DOCX, PDF-preview, and image-thumbnail outputs live?

A) Use a separate plan-managed derivative root with deterministic content-linked names and a manifest mapping every output to its original; never write beside or overwrite source files
B) Replace each unsupported original with its converted output
C) Store derivatives beside originals using ad hoc names chosen by each converter
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Conversion Failure

How should a failed or unavailable conversion affect the catalog?

A) Preserve the original and metadata, record a typed unavailable outcome and honest fallback disposition, and block only when no approved safe public representation remains
B) Remove the item from inventory and continue silently
C) Retry indefinitely until the converter succeeds
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Media Source Admission

Which sources may become interactive preview, download, or new-tab capabilities?

A) Allow validated bundled local assets and explicitly approved HTTPS origins only; reject malformed, `javascript:`, `file:`, document-bearing `data:`, and unapproved sources before presentation
B) Allow every URL stored in local metadata because the file is trusted
C) Allow any browser-supported scheme and rely on the browser to reject unsafe values
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Validation Severity

How should U-01 classify validation outcomes?

A) Use deterministic blocking and non-blocking findings: integrity, privacy, unsafe source, path escape, lost provenance, ID collision, and required-disposition failures block; an approved optional preview limitation may degrade with a warning and fallback
B) Treat all findings as warnings and always emit runtime capabilities
C) Treat every missing optional derivative as fatal even when a reviewed safe fallback exists
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Privacy Verification

What should the phone-number privacy check cover?

A) Scan generated/runtime source, public metadata, tests/fixtures, diagnostics, rendered markup, and production build text while explicitly allowing the unchanged bytes only inside the approved downloadable resume PDF
B) Check only visible browser text manually
C) Allow the phone number in hidden markup and generated metadata as long as CSS conceals it
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12 - Recovery Evidence

What recovery guarantee must exist before U-01 implementation mutates workspace files?

A) Capture current revision, relevant diffs, untracked-file inventory/hashes, source/target hashes, exact planned writes, and tested restoration instructions; prohibit cleanup and source deletion
B) Rely on editor undo and the current Git branch
C) Copy only the final generated manifest and assume source files remain recoverable
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 13 - Property-Based Design

Which U-01 properties must Functional Design carry into Code Generation?

A) Require manifest round trips when serialization exists; membership/order/privacy/safe-source invariants; canonicalization idempotence; equivalence to a simple hash-group oracle; domain generators with edge cases; shrinking and seed replay; and complementary concrete regressions
B) Add randomized primitive-input tests without documenting invariants or generators
C) Use only example-based tests for the catalog transformations
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 14 - Frontend Boundary

How much visible frontend behavior should U-01 implement?

A) Define typed safe media/download/failure capabilities and test seams only; defer all new visible components and interactions to U-02 through U-05
B) Build the complete archive explorer and dialogs in U-01
C) Render raw inventory tables as the public Evidence Library
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Planning and Approval

- [x] Read the approved U-01 definition, story/requirement map, Application Design, dependencies, and enabled extension rules.
- [x] Evaluate business logic, domain model, rules, data flow, integrations, failures, scenarios, and frontend applicability.
- [x] Create fourteen context-specific questions with recommended options and mandatory Other choices.
- [x] Receive answers to all fourteen questions.
- [x] Analyze every answer for ambiguity, contradictions, combined choices, and missing decision rules.
- [x] Complete ambiguity review; all Option A decisions are compatible and require no follow-up questions.
- [x] Obtain explicit approval of the completed Functional Design plan through the user's `approve all A` instruction.

### Design Generation

- [x] Generate `business-logic-model.md` covering inventory, canonicalization, metadata join, resume copy/privacy, derivatives, media admission, recovery, and validation workflows.
- [x] Generate `business-rules.md` with deterministic identities, eligibility, severity, safety, privacy, fallback, and edge-case rules.
- [x] Generate `domain-entities.md` with entities, value objects, relationships, invariants, and lifecycle states.
- [x] Generate `frontend-components.md` with typed capability/failure contracts, no-visible-UI boundary, and downstream interaction seams.
- [x] Include a Testable Properties section that satisfies PBT-01 and routes every selected property into Code Generation planning.
- [x] Validate all four artifacts against U-01 stories, requirements, dependencies, security controls, and approved answers.
- [x] Validate Markdown, Mermaid syntax where used, code signatures, tables, links, paths, and text alternatives.
- [x] Present the completed Functional Design using the required two-option completion message.

## Required Artifacts

- [x] `aidlc-docs/construction/source-governance-safe-foundation/functional-design/business-logic-model.md`
- [x] `aidlc-docs/construction/source-governance-safe-foundation/functional-design/business-rules.md`
- [x] `aidlc-docs/construction/source-governance-safe-foundation/functional-design/domain-entities.md`
- [x] `aidlc-docs/construction/source-governance-safe-foundation/functional-design/frontend-components.md`

## Boundary

- Approval of this plan authorizes Functional Design documentation only.
- It does not authorize source-code edits, package installation, resume copying, inventory execution, hashing, asset conversion, derivative output, build changes, cleanup, deletion, or deployment.
- Infrastructure Design is N/A for U-01 and remains reserved for U-06.
