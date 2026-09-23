# Units of Work: Header, Content, Evidence, and Resume Refinement

## Decomposition Strategy

The portfolio remains one React application, one Vite build, and one static deployment. The six units below are sequential logical modules, not independently deployed services. Each unit has one reviewable capability boundary, owns a defined set of stories and requirements, and inherits cross-cutting checks from approved upstream contracts.

Every unit completes its applicable Functional Design, NFR Requirements, NFR Design, Infrastructure Design, Code Generation planning, implementation, verification, and approval gates before the next unit begins. Visible units U-02 through U-05 require focused rendered review before activation.

## Unit Sequence

| Order | Unit | Review outcome | Primary stories | Depends on |
| --- | --- | --- | --- | --- |
| U-01 | Source Governance and Safe Foundation | Complete validated source/canonicalization foundation | US-010, US-011, US-012, US-021 | Approved Inception artifacts |
| U-02 | Masthead, Theme, and Responsive Alignment | Polished shell and corrected layouts | US-001, US-002, US-008, US-009 | U-01 |
| U-03 | Resume-Led Content Integration | Complete, accurate, privacy-safe personal content | US-003 through US-007 | U-01, U-02 |
| U-04 | Complete Archive Discovery | Discoverable grouped canonical archive | US-013, US-017 | U-01 through U-03 |
| U-05 | PDF and Image Detail Viewers | Accessible inline and modal media review | US-014, US-015, US-016, US-019 | U-01 through U-04 |
| U-06 | Security, Delivery, and Integrated Acceptance | Preserved behavior and release evidence | US-018, US-020 | U-01 through U-05 |

All 21 stories have exactly one primary owner.

## Construction Stage Applicability

| Unit | Functional Design | NFR Requirements | NFR Design | Infrastructure Design | Code Generation |
| --- | --- | --- | --- | --- | --- |
| U-01 | Execute | Execute | Execute | N/A | Execute |
| U-02 | Execute | Execute | Execute | N/A | Execute |
| U-03 | Execute | Execute | Execute | N/A | Execute |
| U-04 | Execute | Execute | Execute | N/A | Execute |
| U-05 | Execute | Execute | Execute | N/A | Execute |
| U-06 | Execute | Execute | Execute | Execute | Execute |

Infrastructure Design is N/A for U-01 through U-05 because those units remain inside the existing local build and client runtime. It is mandatory for U-06 because actual HTTP response-header delivery may require an approved hosting or edge change.

## U-01 - Source Governance and Safe Foundation

- **Review outcome**: Deterministic, privacy-safe catalog and transformation foundation without changing the active visual presentation.
- **Primary stories**: US-010, US-011, US-012, US-021.
- **Primary requirements**: FR-006, FR-018, FR-019, FR-022 through FR-025; NFR-013, NFR-014, NFR-016 through NFR-018, NFR-020; PBT-R01 through PBT-R06.
- **Owns**: `src/portfolio/archive/` model contracts, `src/portfolio/resume/` source contracts, central media-source policy, inventory/canonicalization/conversion manifest types, shared PBT generators, source/recovery scripts, and approved derivative output boundaries.
- **Consumes**: Approved requirements, stories, Application Design, external resume source, current evidence model, and `src/assets/minh-tam/`.
- **Provides**: Stable generated facts, canonical identities, curated-overlay contract, safe source capabilities, conversion outcomes, resume asset capability, property-test seams, and recovery baseline.

### Responsibilities

- Capture exact recovery facts before mutation.
- Inventory every approved source file with stable ID, repository-relative locator, detected media type, bytes, and SHA-256.
- Copy the supplied resume into the application asset boundary without modifying the external original.
- Canonicalize duplicate content while preserving every physical source membership.
- Define the curated metadata overlay and reject raw-filename factual inference.
- Generate or stage deterministic HEIC, DOCX, PDF-preview, and image-thumbnail derivatives under explicit output roots; preserve originals and record honest failures.
- Centralize local/approved-HTTPS source validation and visitor-safe error codes.
- Establish `fast-check` with Vitest only after its NFR and Code Generation approvals, then create reusable domain generators.
- Prove phone data cannot enter public models or generated metadata.

### Entry Criteria

- Units Generation is approved.
- U-01 Functional Design, NFR Requirements, NFR Design, and Code Generation Part 1 are separately approved.
- Recovery and source roots are resolved with explicit paths.

### Exit Criteria

- All 122 physical archive files plus the supplied resume copy are accounted for by the approved inventory boundary.
- Hash canonicalization preserves complete source membership and produces no duplicate canonical identities.
- Each reviewed unique item has a metadata/disposition path or explicit blocking finding.
- HEIC/DOCX and preview transformations have deterministic success/fallback records; originals are unchanged.
- Unsafe schemes, path escape, absolute-path publication, and phone leakage fail closed.
- Example tests and required PBT pass with shrinking and reproducible seed evidence.
- No application entry, visible section, or deployment is activated by this unit.

### Exclusions

- No masthead/layout changes, resume prose integration, archive UI, dialogs, or hosting changes.
- No destructive cleanup of source assets or retained recovery files.

## U-02 - Masthead, Theme, and Responsive Alignment

- **Review outcome**: A polished masthead and all six supplied alignment defects corrected across supported widths and themes.
- **Primary stories**: US-001, US-002, US-008, US-009.
- **Primary requirements**: FR-001 through FR-003, FR-007 through FR-012; NFR-001, NFR-003 through NFR-007, NFR-019.
- **Owns**: `src/portfolio/shell/` masthead integration, theme-control placement, shared layout tokens, `SemanticSummary`, and alignment/style changes within affected domain components.
- **Consumes**: U-01 safe resume capability, source/privacy contracts, current shell controllers, and existing semantic row models.
- **Provides**: Enhanced shell, masthead action slots, hidden summary contract, corrected responsive geometry, and verified layout foundations for later content.

### Responsibilities

- Place the theme control in the masthead upper-right region above sticky navigation without moving theme state ownership.
- Add the restrained scientific panel treatment, clear hierarchy, status, and action layout.
- Remove visible relationship/count tables and render equivalent visually hidden semantic summaries.
- Correct laboratory stations, computational header, research-question introduction, data-story signal sheet, academic header, and evidence spectrum.
- Audit all ten sections at 320, 768, 1280, and 1440 CSS pixels in both themes.
- Validate 200-percent zoom, increased text spacing, focus visibility, logical reading order, reduced motion, and no horizontal document overflow.

### Entry Criteria

- U-01 is approved and its public capability contracts are stable.
- U-02 Functional Design, NFR Requirements, NFR Design, and Code Generation Part 1 are approved.

### Exit Criteria

- Masthead identity, status, theme action, and resume-action slot have a balanced responsive composition.
- Theme action announces the next state and persists the existing explicit preference.
- No visible relationship table remains, and equivalent meaning is available to assistive technology without consuming layout space.
- All six named screenshots and every active section pass the alignment matrix, themes, zoom, and text-spacing checks.
- Existing hashes, progress, Journal, and contact behavior pass focused regression tests.
- Candidate rendering is explicitly approved before activation.

### Exclusions

- No full resume-content replacement, archive browser, media modal, conversion logic, or hosting change.

## U-03 - Resume-Led Content Integration

- **Review outcome**: Every approved resume category appears accurately within the preserved ten-section structure.
- **Primary stories**: US-003, US-004, US-005, US-006, US-007.
- **Primary requirements**: FR-004, FR-005, FR-013 through FR-017; NFR-015; PBT-R08.
- **Owns**: Reviewed resume source records, reconciliation selectors, section mapping, public source-authority labels, masthead/Identity resume download capability, and resume-led view-model changes across domain folders.
- **Consumes**: U-01 source/provenance/privacy contracts and resume asset; U-02 shell, masthead slots, semantic summaries, and layout contracts.
- **Provides**: Complete resume-led domain view models and representative narrative links to canonical evidence.

### Responsibilities

- Reconcile resume statements with existing verified records and evidence.
- Preserve dates, organizations, award levels, quantitative context, and contribution wording.
- Surface conflicts for review; mark resume-only claims without implying independent verification.
- Map education, honors, leadership, analytics/FINO, recognition, projects, scholarships, activities, sports, skills, languages, and interests to the ten sections.
- Place a stable native resume download in the masthead and Identity section.
- Preserve the existing public email/local contact behavior while preventing the phone number from entering markup, structured data, tests, or diagnostics.
- Verify mapping completeness and non-invention through examples and property tests.

### Entry Criteria

- U-01 and U-02 are approved.
- U-03 Functional Design, NFR Requirements, NFR Design, and Code Generation Part 1 are approved.
- Resume extraction and source locators have been human-reviewed.

### Exit Criteria

- Every resume category has a valid section mapping and every published statement retains authority/provenance.
- Evidence conflicts are resolved or remain blocking; no selector silently chooses a contradiction.
- Both resume actions download the bundled PDF using the approved stable filename.
- Phone data is absent from all public artifacts outside the approved PDF bytes.
- Layout, accessibility, responsive, source-integrity, and existing-behavior checks pass.
- Candidate rendering is explicitly approved before activation.

### Exclusions

- No full archive browser, PDF/image dialog, remote content service, or deployment change.

## U-04 - Complete Archive Discovery

- **Review outcome**: Every canonical reviewed item is discoverable in a meaningful on-demand group without initial archive overload.
- **Primary stories**: US-013, US-017.
- **Primary requirements**: FR-020, FR-021, FR-032; NFR-008 through NFR-012; PBT-R05 as consumed verification.
- **Owns**: Archive group summaries, lazy group loaders, category navigation/filter behavior, `ArchiveExplorer`, `ArchiveGroup`, dimensioned lazy thumbnails, normalized titles/captions, and request/bundle checks for discovery.
- **Consumes**: U-01 catalog/source policy/derivative contracts, U-02 layout/semantic contracts, and U-03 narrative/evidence reconciliation.
- **Provides**: Complete canonical archive discovery and safe media triggers for U-05.

### Responsibilities

- Represent every eligible canonical item through narrative placement, gallery, document collection, or safe original access.
- Render eager group labels, descriptions, and counts without importing all group records or originals.
- Lazy-load an approved group and its dimensioned thumbnails only on visitor action or viewport eligibility.
- Preserve deterministic explicit ordering and meaningful category navigation.
- Retain accessible metadata and safe original access when a thumbnail fails.
- Verify the initial request set excludes all full originals and budget changes remain blocked without approval.

### Entry Criteria

- U-01 through U-03 are approved.
- U-04 Functional Design, NFR Requirements, NFR Design, and Code Generation Part 1 are approved.
- Canonical catalog and group metadata are complete enough for review.

### Exit Criteria

- Every canonical reviewed item appears in exactly one primary public disposition and remains discoverable.
- Group counts match catalog membership and order is deterministic.
- Initial rendering includes compact summaries only; group modules, thumbnails, and originals follow approved lazy boundaries.
- Images expose correct alternative treatment and declared dimensions/aspect ratios.
- Loading, empty, not-found, and failure states are accessible and visitor-safe.
- Candidate rendering and network/request evidence are explicitly approved before activation.

### Exclusions

- No PDF/image detail dialog implementation or infrastructure migration.

## U-05 - PDF and Image Detail Viewers

- **Review outcome**: Every eligible PDF and reviewed image can be inspected through accessible, secure, responsive inline/detail experiences.
- **Primary stories**: US-014, US-015, US-016, US-019.
- **Primary requirements**: FR-026 through FR-031, FR-033 through FR-035; NFR-002; PBT-R07; SEC-R02, SEC-R06, SEC-R08.
- **Owns**: `src/portfolio/media-viewer/`, PDF preview card, image trigger integration, media dialog reducer/controller/host, PDF and image bodies, viewer lazy boundaries, and dialog accessibility tests.
- **Consumes**: U-01 safe media capabilities, U-02 tokens/layout, U-03 resume capability, and U-04 validated groups/order.
- **Provides**: Shared validated media-review interactions for narrative and archive consumers.

### Responsibilities

- Give every canonical published PDF plus the resume a responsive first-page preview or honest browser fallback.
- Mount one dialog host with accessible naming/description, initial focus, focus containment, background inertness, Escape/backdrop dismissal, cleanup, and trigger restoration.
- Provide full-height PDF viewing with Download, Open in new tab, and Close.
- Provide grouped image detail with title, caption, safe provenance, bounded previous/next, original access, and Close.
- Fail safely for malformed, rejected, missing, unsupported, or failed media without exposing paths/stacks or leaving an inoperable overlay.
- Property-test reducer bounds and state sequences while retaining concrete keyboard/focus regression tests.

### Entry Criteria

- U-01 through U-04 are approved.
- U-05 Functional Design, NFR Requirements, NFR Design, and Code Generation Part 1 are approved.
- Media capabilities and group order are stable.

### Exit Criteria

- PDF previews and both viewer bodies operate with mouse, keyboard, touch, screen reader, zoom, and text spacing.
- Background content cannot be operated while the dialog is open and focus reliably returns on every close path.
- Image navigation never leaves valid bounds and communicates boundary state.
- Full media loads only after explicit approved interaction.
- Unsafe sources fail closed; user-facing failures retain safe metadata/actions and reveal no internal detail.
- Example tests, property tests, accessibility checks, responsive checks, and rendered review are explicitly approved before activation.

### Exclusions

- No hosting/edge decision, backend media proxy, remote conversion, or analytics.

## U-06 - Security, Delivery, and Integrated Acceptance

- **Review outcome**: The complete candidate preserves existing behavior and produces auditable release/security evidence.
- **Primary stories**: US-018, US-020.
- **Primary requirements**: FR-036 through FR-038; PBT-R09, PBT-R10; SEC-R01, SEC-R03 through SEC-R05, SEC-R07; final verification of all NFRs and inherited requirements.
- **Owns**: Infrastructure decision for response headers, integrated release gate, privacy/integrity scans, dependency audit, unused-dependency review, SBOM, CI pin review, request/bundle manifests, complete regression suite, header verifier, activation decision, and exact recovery evidence.
- **Consumes**: Every approved unit output and the active GitHub Pages workflow.
- **Provides**: One validated release candidate and an explicit deploy/no-deploy recommendation; it does not deploy without separate authority.

### Responsibilities

- Verify ten section hashes, progress, themes, contact, lazy Journal route, and base-path compatibility.
- Run strict TypeScript, ESLint, example tests, PBT with seed evidence, accessibility checks, boundary checks, archive verification, privacy scan, build, and request/bundle inspection.
- Audit dependencies, remove unused dependencies only through the approved plan, generate an SBOM, and assess CI action/tooling pinning.
- Verify actual deployed-candidate response headers for CSP, HSTS, `nosniff`, frame policy, and strict-origin referrer policy.
- If GitHub Pages cannot satisfy the header contract, document a compliant hosting/edge option and obtain explicit approval before any infrastructure mutation or deployment.
- Verify exact recovery to the pre-unit state and preserve all source originals.

### Entry Criteria

- U-01 through U-05 are approved.
- U-06 Functional Design, NFR Requirements, NFR Design, Infrastructure Design, and Code Generation Part 1 are approved.
- All prior candidate/activation evidence is available.

### Exit Criteria

- All 38 functional, 20 non-functional, 10 PBT, and 8 security requirements pass or carry an explicitly approved N/A rationale.
- All 21 stories pass their acceptance criteria.
- No high-risk unresolved dependency issue, privacy leak, unsafe source, archive omission, accessibility blocker, performance regression, header misrepresentation, or recovery failure remains.
- The production build and route/base-path behavior pass.
- The release report states whether the current host is compliant and does not deploy or migrate hosting without separate authority.
- Final Build and Test may begin only after U-06 post-generation approval.

### Exclusions

- No production deployment, DNS change, monitoring setup, or operations work without a separate explicit request.

## Shared Contract Change Protocol

If a later unit requires an upstream contract change, its Functional Design and Code Generation plan must:

1. Name the contract and owning unit.
2. Explain why the approved contract cannot satisfy the assigned requirement or story.
3. List affected source, generated artifacts, tests, security/PBT obligations, and rendered review slices.
4. Preserve dependency direction and avoid copying or reverse presentation imports.
5. Define focused regression checks for every affected approved unit.
6. Obtain the current stage approval before mutation.

## Global Unit Rules

- Only one unit is active in Construction at a time.
- Every plan step is checked off in the same interaction in which it completes.
- Visible application changes require candidate-first rendered review before activation.
- No unit deletes original archive/resume files.
- No unit publishes absolute local paths or the resume phone number.
- No unit introduces a backend, analytics, runtime upload, or remote conversion.
- Enabled Security Baseline and PBT obligations are blocking where applicable.
- Unit completion requires owned capability, tests, inherited checks, safe failures, dependency validation, recovery evidence, and focused review without relying on unfinished later units.
