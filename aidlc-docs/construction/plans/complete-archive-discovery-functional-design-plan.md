# Functional Design Plan - U-04 Complete Archive Discovery

> **Status: All fourteen Option A decisions are approved and Functional Design artifacts are complete.** This plan governs Functional Design for U-04 only. It does not authorize archive implementation, PDF or image dialogs, deployment changes, or source-file deletion.

## User Amendment - 2026-09-23

- [x] Record the requested personal-portfolio Contact copy and action-layout correction as a bounded cross-unit regression requirement.
- [x] Inventory `src/assets/minh-tam/source/` and verify that all 104 non-system source files are represented in the governed manifest: 85 JPG images, three HEIC images, two PNG images, 13 PDFs, and one DOCX file, with zero missing source members.
- [x] Require every publishable certificate and picture to remain reachable through a relevant showcase, gallery, document collection, narrative placement, or explicit safe original action after canonical duplicate handling.
- [x] Resolve the archive interaction and Contact presentation decisions below before generating Functional Design artifacts; all fourteen decisions are approved as Option A.

The archive may consolidate byte-identical source files into one canonical public entry, but it must preserve internal membership for every physical source file. System metadata such as `.DS_Store` is excluded from visitor content. The academic transcript remains unpublished under the user's earlier explicit instruction; complete discovery applies to approved public material, not private or explicitly excluded records.

## Unit Context

- **Primary stories**: US-013 and US-017.
- **Primary requirements**: FR-020, FR-021, FR-032; NFR-008 through NFR-012; PBT-R05.
- **Consumes**: U-01 canonical catalog, derivative, provenance, recovery, and media-source policies; U-02 responsive shell; U-03 narrative and evidence reconciliation.
- **Provides**: Complete grouped archive discovery and safe media triggers for U-05.
- **Current governed inventory**: 128 physical files represented by 110 canonical items, with 96 image thumbnails, 13 PDF first-page derivatives, four web-display derivatives, and one honest document-preview fallback.
- **Infrastructure**: N/A. U-04 remains inside the existing static React/Vite application.

## Functional Design Checklist

- [x] Analyze the approved unit, stories, functional and non-functional requirements, application design, current archive model, generated manifest, Evidence Library, extension configuration, and downstream viewer boundary.
- [x] Define the Functional Design scope, artifact set, decision questions, security evaluation, and PBT-01 property-analysis boundary.
- [x] Create and content-validate this question plan using the required answer format.
- [x] Collect and validate every answer; all fourteen answers are Option A and introduce no ambiguity or contradiction.
- [x] Generate `business-logic-model.md` covering summary projection, group activation, group loading, item disposition, safe failure, and complete-discovery checks.
- [x] Generate `business-rules.md` covering completeness, ordering, counts, lazy boundaries, source admission, accessible interaction, and U-05 exclusions.
- [x] Generate `domain-entities.md` covering group summaries, public archive items, capabilities, loading results, findings, and immutable selections.
- [x] Generate `frontend-components.md` covering Archive Explorer, group summaries, loaded groups, cards, loading/error/empty states, and responsive interactions.
- [x] Document PBT-01 properties and their categories for U-04, including deterministic grouping/order and catalog-membership preservation.
- [x] Evaluate SECURITY-01 through SECURITY-15 and PBT-01 compliance, update AI-DLC state/audit artifacts, and present the standardized Functional Design completion gate.

## Design Questions

Option A is recommended for every question because it follows the approved unit boundaries and the current validated archive foundation.

## Question 1 - Visitor-Facing Group Taxonomy

How should the 110 canonical items, including every certificate and picture from the source folders, be grouped for visitors?

A) Preserve complete canonical membership while presenting natural activity-based showcases and galleries for scientific research, academic competitions, volunteering, scholarships, academic records, public speaking, sport, featured projects, identity material, and the complete archive action; keep technical provenance internal (recommended)
B) Merge the ten canonical groups into fewer broad categories and maintain a separate mapping from every canonical item to its display category
C) Present one ungrouped archive ordered by canonical item order
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Initial Archive State

What should appear before a visitor opens any archive group?

A) Show compact group summaries with labels, descriptions, and counts; keep every group body closed and load no archive originals (recommended)
B) Automatically open the first group while keeping the remaining groups closed
C) Render every group body immediately but rely on native image lazy loading
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Group Activation Behavior

How should visitors open and switch archive groups?

A) Use real buttons on the group summaries, allow one expanded group at a time, and retain already loaded data in memory for the session (recommended)
B) Use anchor navigation and automatically load a group when its summary nears the viewport
C) Allow every group to remain expanded simultaneously after activation
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Evidence Library Integration

Where should complete archive discovery live?

A) Replace the current limited Evidence Library body with the Archive Explorer while retaining the Evidence Library section identity and its concise header (recommended)
B) Append the Archive Explorer after the current Evidence Library content, retaining both interfaces
C) Add a separate eleventh portfolio section for the archive
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Item Presentation Before U-05

What capabilities should U-04 expose before the later viewer unit is implemented?

A) Render lazy, dimensioned image thumbnails and compact document/original cards with safe native open or download actions; provide typed viewer triggers for U-05 without implementing dialogs (recommended)
B) Render metadata-only rows for every item and defer all thumbnails and file actions to U-05
C) Implement full PDF and image popup viewers inside U-04
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Ordering and Counts

How should archive order and counts be derived?

A) Derive counts from validated canonical membership and order groups/items deterministically by curated order with stable ID tie-breaking; block activation on mismatch (recommended)
B) Maintain displayed counts and order manually in React components
C) Sort titles alphabetically at render time and omit displayed counts
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Loading and Failure States

How should unknown groups, loading failures, empty groups, and thumbnail failures behave?

A) Fail closed with concise visitor-safe messages, preserve available metadata and safe file actions, offer Retry for recoverable group-load failure, and never reveal paths or technical details (recommended)
B) Hide failed or empty content without explanation
C) Show raw exception text and source paths to aid troubleshooting
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Public Source Language

How should source authority and provenance appear in the archive UI?

A) Use natural titles and captions only; keep authority, source paths, hashes, and resume/evidence distinctions in internal validation data (recommended)
B) Show a provenance badge and source category on every card
C) Show repository-relative source paths below every item
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Lazy Module Boundary

How should archive code and media be split?

A) Keep eager group summaries in the Evidence Library entry module, dynamically import one approved group module on activation, load only dimensioned thumbnails in the group, and defer full originals to explicit actions (recommended)
B) Use one dynamically imported module containing all group records and thumbnails
C) Bundle the complete archive and every original into the initial page module
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Performance Gate

What should block U-04 activation?

A) Preserve the current approved initial JavaScript, CSS, and request ceilings; require no archive original on initial load, measure each group activation, and require explicit approval for any ceiling increase (recommended)
B) Permit up to 25 percent initial bundle growth if all groups become discoverable
C) Evaluate performance visually without numeric request or bundle evidence
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 11 - Property-Based Testing Scope

Which Functional Design properties should be carried into Code Generation?

A) Require generated tests for complete single-group membership, count consistency, deterministic ordering, projection idempotence, safe unknown-group rejection, and preservation of catalog membership, plus complementary examples (recommended)
B) Test deterministic ordering only and use examples for all other behavior
C) Defer all property identification until Build and Test
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 12 - Candidate Review Boundary

How should the completed U-04 interface be approved before activation?

A) Use an isolated candidate with responsive/light-dark/keyboard/loading/failure checks, request tracing, bundle measurements, representative screenshots, and explicit approval before the active composition changes (recommended)
B) Activate after unit tests and inspect the live composition afterward
C) Skip rendered review because U-05 will later add viewers
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 13 - Contact Section Voice

Which wording direction should replace the research-only Contact introduction?

A) Use inclusive personal-portfolio language for collaborations, projects, opportunities, and general enquiries, while keeping the local email-app privacy explanation concise (recommended)
B) Keep the current research mentorship and academic opportunities emphasis but shorten the paragraph
C) Reduce the section to the email address and remove the introductory invitation
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 14 - Contact Action Layout

How should the current Prepare email draft action be presented?

A) Rename it to Open email draft, place the explanatory note and button in one balanced full-width action row, right-align the bounded button on wide screens, and stack it full-width on narrow screens (recommended)
B) Keep the existing label and make the button span the full form width at every breakpoint
C) Replace the composer action with only a direct email link
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Extension Applicability at This Stage

### Security Baseline

- **Applicable**: SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15 for visitor-safe failures, misuse-resistant group resolution, central safe-source admission, and fail-closed validation.
- **Deferred to later units**: SECURITY-04 and SECURITY-10 delivery verification belong to U-06, while U-04 preserves their existing foundations.
- **N/A to this static client-only design**: SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 because U-04 introduces no database, API, identity, network intermediary, credential, or monitoring service.

### Property-Based Testing

- **Applicable**: PBT-01 requires documented property identification during Functional Design.
- **Carried forward**: PBT-03 through PBT-05, PBT-07, PBT-08, and PBT-10 are expected to apply during Code Generation based on the recommended properties.
- **Potentially N/A**: PBT-02 if no inverse pair is designed and PBT-06 if the group loader remains immutable data plus ordinary UI state rather than a business state machine. Final applicability depends on the approved design.
- **Already established**: PBT-09 uses the existing `fast-check` and Vitest integration.
