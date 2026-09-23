# User Stories: Header, Content, Evidence, and Resume Refinement

## Story Organization

Stories use the approved hybrid journey-and-feature approach. Each story is a small vertical slice with persona mapping, requirement traceability, Given/When/Then acceptance criteria, and applicable accessibility, privacy, security, fallback, or performance conditions.

## Cross-Cutting Acceptance Rules

Unless explicitly marked not applicable, every visible story must:

- Work at 320, 768, 1280, and 1440 CSS pixels in light and dark themes.
- Preserve logical DOM/reading order, visible focus, keyboard access, reduced motion, 200-percent zoom, and increased text spacing.
- Avoid document-level horizontal overflow and unsafe HTML.
- Use only approved local or `https:` media sources and disclose no local filesystem path.
- Preserve the resume phone number only inside the downloadable PDF, never page markup, tests, metadata, or logs.
- Show honest generic fallbacks when media cannot load.

## Journey 1: Orient, Navigate, and Download

### US-001 - Recognize Minh Tam from a distinctive masthead

**Persona**: P-01 Admissions Reviewer, P-02 Research Mentor, P-03 Mobile Visitor, P-04 Keyboard/Screen-Reader Visitor
**Requirements**: FR-001, FR-011, FR-012; NFR-001, NFR-003, NFR-005 through NFR-007

**Story**: As a visitor, I want a distinctive but restrained scientific masthead so that I can identify Minh Tam and the portfolio's focus immediately.

**Acceptance Criteria**:

1. Given the portfolio opens, when the masthead renders, then it presents Minh Tam, scientific focus, active status, subtle scientific decoration, and a stronger hierarchy without obscuring text.
2. Given either theme or a supported viewport, when the masthead reflows, then its identity, status, and action regions remain aligned and readable.
3. Given zoom or increased text spacing, when content wraps, then no masthead item overlaps, clips, or creates horizontal page overflow.

**INVEST**: Pass - one visible outcome, independently reviewable and testable.

### US-002 - Change theme from the top of the page

**Persona**: P-03, P-04
**Requirements**: FR-002, FR-003, FR-036; NFR-001, NFR-005

**Story**: As a visitor, I want the theme control in the masthead's upper-right area so that display preferences are available immediately without occupying the navigation rail.

**Acceptance Criteria**:

1. Given the masthead is visible, when I locate the upper-right actions, then the theme button is present above the sticky navigation.
2. Given either current theme, when I activate the button, then the theme changes, the explicit preference persists where storage is available, and the accessible name describes the next action.
3. Given local storage fails, when I change theme, then the current visit still updates and a safe non-sensitive fallback is used.

**INVEST**: Pass - isolated preference workflow with existing state contract.

### US-003 - Download the supplied resume without exposing extra contact data

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-004 through FR-006, FR-015, FR-016; NFR-013, NFR-014

**Story**: As a reviewer, I want a clearly named resume download in the masthead and Identity section so that I can retain the full application record.

**Acceptance Criteria**:

1. Given the masthead or Identity section, when I activate Download Resume, then the bundled four-page PDF downloads with a stable descriptive filename.
2. Given the page DOM and metadata are inspected, then the phone number is absent while the existing email remains available through Contact.
3. Given the downloaded PDF is opened, then it is the supplied resume copy and retains its original contact content without altering the external source.

**INVEST**: Pass - one download/privacy outcome with two discoverable entry points.

## Journey 2: Understand Complete Resume-Led Content

### US-004 - Understand identity, languages, skills, and interests

**Persona**: P-01, P-02
**Requirements**: FR-013 through FR-017

**Story**: As a reviewer, I want the Identity and Methods sections to reflect the resume so that I understand Minh Tam's current profile, languages, technical capabilities, laboratory methods, and interests.

**Acceptance Criteria**:

1. Given resume-led content is loaded, when I review Identity and Methods, then every applicable profile, language, skill, laboratory, and interest category is represented once.
2. Given a statement has no separate evidence item, when it is displayed, then it is presented as resume-sourced rather than independently document-verified.
3. Given existing verified content overlaps the resume, when content is reconciled, then evidence links are retained without duplicate claims.
4. Given generated valid resume entries, property tests verify that every supported category maps to one canonical section and no unsupported claim is created.

**INVEST**: Pass - bounded content slice across two related profile sections.

### US-005 - Review education, grades, scholarships, and recognition

**Persona**: P-01
**Requirements**: FR-013, FR-014, FR-017; NFR-015

**Story**: As an admissions or scholarship reviewer, I want a complete academic progression so that I can assess current study, results, language proficiency, scholarships, and school recognition.

**Acceptance Criteria**:

1. Given the resume and evidence catalogs, when Academic Trajectory renders, then education, grades, subjects, IELTS, scholarship offers, and merit recognition retain their dates and organizations.
2. Given a claim conflicts with documentary evidence, when reconciliation runs, then the evidence-backed value is retained and the discrepancy is flagged for review.
3. Given the academic layout reflows, when viewed at supported widths, then its heading, explanation, records, and evidence actions align without a conventional timeline requirement.

**INVEST**: Pass - one reviewer outcome with evidence reconciliation.

### US-006 - Review research, analytics, honors, and contribution boundaries

**Persona**: P-01, P-02
**Requirements**: FR-013, FR-014, FR-017; NFR-015

**Story**: As a reviewer, I want research projects and related honors placed in their relevant scientific sections so that I can connect achievements with methods while understanding contribution boundaries.

**Acceptance Criteria**:

1. Given computational, laboratory, and data records, when their sections render, then the resume's research projects, competitions, results, dates, and quantitative context are represented accurately.
2. Given a role or outcome is absent from approved sources, when the model is assembled, then no role, ranking, or result is inferred.
3. Given supporting evidence exists, when I choose it, then the canonical document or image entry opens through the approved evidence interaction.

**INVEST**: Pass - one research-review outcome spanning the three approved research domains.

### US-007 - Review leadership, volunteering, mentoring, debate, and sports

**Persona**: P-01, P-05
**Requirements**: FR-013, FR-014, FR-017

**Story**: As a reviewer, I want non-academic activities organized in Fieldwork and Leadership so that I can understand sustained responsibility, community work, communication, and sports participation.

**Acceptance Criteria**:

1. Given the resume, when Fieldwork and Leadership renders, then Kyoto, World Scholar's Cup, TIV, mentoring, conservation, agriculture, reforestation, debate, soccer, and badminton records are represented with their dates and roles.
2. Given multiple evidence images belong to one activity, when records are shown, then the activity appears once with a link to its grouped media rather than repeated activity copy.
3. Given a resume-only activity, when rendered, then it is labeled consistently as resume-sourced.

**INVEST**: Pass - one coherent activity-review outcome.

## Journey 3: Read Balanced, Accessible Layouts

### US-008 - Receive relationship meaning without visible duplicate tables

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-007 through FR-009; NFR-001, NFR-004

**Story**: As a visitor, I want repeated visual tables removed while preserving semantic meaning so that the page is cleaner without reducing accessibility.

**Acceptance Criteria**:

1. Given any active section, when sighted presentation is inspected, then no relationship-summary table or caption occupies visible layout space.
2. Given a screen reader follows the same section, when the relationships are reached, then equivalent source, relationship, and target meaning is available in an appropriately named hidden structure.
3. Given hidden summaries at any width, then they neither create scrolling nor receive unintended visual focus.

**INVEST**: Pass - one accessibility-preserving presentation change.

### US-009 - Read consistently aligned sections at every supported width

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-010 through FR-012; NFR-003, NFR-005 through NFR-007, NFR-019

**Story**: As a visitor, I want headings, cards, tracks, labels, and explanations aligned consistently so that scientific content is easy to scan.

**Acceptance Criteria**:

1. Given the six supplied examples, when reviewed at wide widths, then station cards, header columns, question introduction, signal rows, academic header, and evidence spectrum share intentional grid lines and baselines.
2. Given tablet or mobile widths, when the same content reflows, then it follows one logical reading order with no clipped labels, orphaned controls, or page overflow.
3. Given every active section, when the alignment audit runs, then related defects are covered by explicit source/style assertions and rendered-review checkpoints.

**INVEST**: Pass - one measurable cross-section quality outcome.

## Journey 4: Discover the Complete Archive

### US-010 - Inventory every physical Minh Tam file

**Persona**: P-05 Portfolio Maintainer
**Requirements**: FR-018, FR-038; NFR-016 through NFR-018

**Story**: As a maintainer, I want a deterministic inventory of every archive file so that completeness and provenance can be verified without guessing from filenames.

**Acceptance Criteria**:

1. Given `src/assets/minh-tam`, when inventory generation runs, then every physical file receives a stable identifier, normalized relative path, media type, byte size, cryptographic hash, category, and disposition.
2. Given the inventory repeats with unchanged files, when outputs are compared, then ordering and identifiers are identical.
3. Given a path is shown to visitors, then no machine-local absolute path is emitted.

**INVEST**: Pass - maintainer-only completeness outcome with deterministic evidence.

### US-011 - Consolidate duplicates without losing provenance

**Persona**: P-05
**Requirements**: FR-019, FR-020; NFR-016, NFR-017; PBT-R02 through PBT-R06

**Story**: As a maintainer, I want duplicate physical files consolidated into canonical entries so that visitors avoid repetition while provenance remains complete.

**Acceptance Criteria**:

1. Given identical content hashes, when canonicalization runs, then exactly one published item owns all matching source paths.
2. Given a curated and source representation are equivalent but not byte-identical, when a reviewed equivalence mapping exists, then one canonical item retains both provenances.
3. Given generated archive records, property tests verify idempotence, deterministic grouping, preserved source membership, shrinking, and reproducible seeds.

**INVEST**: Pass - pure catalog-transformation outcome.

### US-012 - Preserve unsupported HEIC and DOCX evidence

**Persona**: P-05, P-01, P-02
**Requirements**: FR-022 through FR-025; SEC-R02, SEC-R04 through SEC-R06

**Story**: As a visitor, I want unsupported source media converted or represented honestly so that archive completeness does not depend on browser-specific formats.

**Acceptance Criteria**:

1. Given a HEIC image, when conversion succeeds, then a web-compatible derivative is previewed and the original remains linked through provenance or download.
2. Given the DOCX source, when conversion succeeds, then a PDF derivative receives document-preview behavior and the original remains downloadable.
3. Given any conversion fails, when the archive renders, then metadata and original access remain available with a generic fallback and no invented preview.

**INVEST**: Pass - one format-compatibility outcome with failure path.

### US-013 - Browse every canonical archive item by meaningful group

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-020, FR-021, FR-025; NFR-001, NFR-008, NFR-009

**Story**: As a visitor, I want the complete archive organized by meaningful activity and evidence groups so that I can discover relevant material without scanning raw filenames.

**Acceptance Criteria**:

1. Given the canonical inventory, when I browse Evidence Library, then every reviewed canonical item is reachable through a narrative placement, grouped gallery, document collection, or explicit original-file entry.
2. Given group navigation, when I select a category, then labels, counts, and order match the canonical model and remain keyboard accessible.
3. Given the initial page load, then full originals outside critical identity media are not requested until their group or detail view requires them.

**INVEST**: Pass - visitor discovery outcome backed by canonical inventory.

## Journey 5: Inspect Documents and Images

### US-014 - Preview every canonical PDF inline

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-026, FR-027, FR-031; NFR-001, NFR-008, NFR-012

**Story**: As a reviewer, I want a first-page preview for every canonical published PDF and the resume so that I can judge relevance before opening detail.

**Acceptance Criteria**:

1. Given a canonical PDF card, when it enters the relevant loading boundary, then a responsive browser-native first-page preview is attempted with a clear title and description.
2. Given embedded PDF rendering is unsupported or fails, when the card renders, then a fallback offers detail, download, or new-tab access without an empty frame.
3. Given keyboard navigation, then the preview action is a real labeled control with visible focus and no pointer-only dependency.

**INVEST**: Pass - one preview decision outcome.

### US-015 - Review a PDF in an accessible popup

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-028 through FR-031; NFR-001 through NFR-003; SEC-R06 through SEC-R08

**Story**: As a reviewer, I want to enlarge a PDF without leaving the portfolio so that I can inspect it in context.

**Acceptance Criteria**:

1. Given a PDF preview, when I activate it, then a named modal opens with full-height viewer, title, description, Download, Open in new tab, and Close.
2. Given the modal is open, when I use Tab, Shift+Tab, Escape, or backdrop dismissal, then focus is contained, dismissal is predictable, background interaction is blocked, and focus returns to the trigger.
3. Given the embedded viewer fails, then the modal remains operable and exposes safe direct actions without a stack trace, absolute path, or unsafe URL.

**INVEST**: Pass - one detail-view workflow with accessible state boundary.

### US-016 - Explore image groups in an accessible detail viewer

**Persona**: P-01, P-02, P-03, P-04
**Requirements**: FR-032 through FR-035; NFR-001 through NFR-003, NFR-012; PBT-R07

**Story**: As a visitor, I want lazy image thumbnails and an accessible grouped detail viewer so that I can inspect activity evidence without loading all originals.

**Acceptance Criteria**:

1. Given an image group, when thumbnails render, then they lazy-load with dimensions, descriptive alternatives or documented decorative status, captions, and provenance.
2. Given a thumbnail is activated, when the dialog opens, then it provides image detail, caption, provenance, original access, previous/next controls, and Close with the same focus behavior as the PDF modal.
3. Given generated group sizes and indices, property tests prove navigation remains deterministic and within bounds, including empty, single-item, first, and last states.

**INVEST**: Pass - one grouped image-review workflow.

## Journey 6: Preserve Performance, Safety, and Existing Behavior

### US-017 - Load the large archive only when needed

**Persona**: P-03, P-05
**Requirements**: FR-021, FR-026, FR-032; NFR-008 through NFR-012

**Story**: As a mobile visitor, I want archive media loaded on demand so that the portfolio remains responsive despite the large source collection.

**Acceptance Criteria**:

1. Given the initial portfolio route, when requests are measured, then it does not request every original archive item.
2. Given archive groups or viewers are unused, then their full media and eligible interaction code remain deferred where practical.
3. Given production measurements exceed an approved JavaScript, CSS, request, or evidence ceiling, then activation is blocked until correction or explicit budget approval.

**INVEST**: Pass - measurable performance outcome independent of content copy.

### US-018 - Preserve navigation, contact, Journal, and recovery behavior

**Persona**: P-01, P-02, P-03, P-04, P-05
**Requirements**: FR-036 through FR-038

**Story**: As a returning visitor, I want existing portfolio routes and local interactions to keep working so that the expanded evidence experience does not break established workflows.

**Acceptance Criteria**:

1. Given any canonical section hash, theme choice, contact flow, or Journal hash route, when used after the change, then its existing supported behavior remains intact.
2. Given an unknown or failed lazy route, when recovery occurs, then a safe, accessible fallback returns the visitor to the portfolio.
3. Given a blocking post-activation failure, when recovery is invoked, then exact protected entry and configuration content can be restored without deleting source assets.

**INVEST**: Pass - regression-preservation outcome with recovery.

### US-019 - Fail safely for malformed, unsafe, or unavailable media

**Persona**: P-04, P-05
**Requirements**: NFR-013 through NFR-018; SEC-R02, SEC-R04 through SEC-R08

**Story**: As a visitor, I want malformed or unavailable media to fail safely so that I can continue using the portfolio without exposure to unsafe content or internal details.

**Acceptance Criteria**:

1. Given a media URL with a disallowed scheme or an ineligible source path, when publication selection runs, then the item is rejected from interactive viewing and a stable finding is recorded.
2. Given a missing, oversized, malformed, or unsupported asset, when its card renders, then metadata and eligible fallback actions remain usable without unsafe HTML or local path disclosure.
3. Given resume and archive content are searched, then the phone number appears only inside the downloadable PDF and no source-document text controls application behavior.

**INVEST**: Pass - security/failure outcome shared by both viewers.

### US-020 - Verify supply chain, security headers, and production integrity

**Persona**: P-05
**Requirements**: SEC-R01, SEC-R03, SEC-R05; NFR-020

**Story**: As a maintainer, I want production security and supply-chain evidence so that the static site is not claimed compliant without verifiable controls.

**Acceptance Criteria**:

1. Given the production endpoint, when headers are assessed, then CSP, HSTS, `nosniff`, frame policy, and referrer policy are recorded accurately; unsupported GitHub Pages controls produce an explicit deployment decision rather than a false pass.
2. Given dependencies and CI, when the security gate runs, then the lockfile is preserved, vulnerability results are recorded, unused runtime dependencies are reviewed, an SBOM is generated, and CI references meet the approved integrity policy.
3. Given any required applicable security control fails, then activation or deployment approval is blocked with its SECURITY identifier and remediation.

**INVEST**: Pass - maintainer security-verification outcome.

### US-021 - Verify transformation properties reproducibly

**Persona**: P-05
**Requirements**: PBT-R01 through PBT-R10; NFR-017, NFR-019, NFR-020

**Story**: As a maintainer, I want reproducible property-based verification alongside concrete regression tests so that catalog and viewer edge cases are found without weakening executable examples.

**Acceptance Criteria**:

1. Given the TypeScript/Vitest project, when the verification stack is configured, then `fast-check` supplies reusable domain generators, automatic shrinking, and seed-based reproduction.
2. Given generated archive, manifest, mapping, and navigation inputs, when properties run, then round trips, invariants, idempotence, deterministic ordering, provenance preservation, supported-category coverage, and viewer bounds are verified where applicable.
3. Given a property failure, when the suite reports it, then the seed and shrunk counterexample are visible and the minimal failure is added as an example-based regression when fixed.
4. Given CI or the complete local gate, when tests run, then property and example suites both execute without silent retry or exclusion.

**INVEST**: Pass - one bounded verification capability with explicit observable evidence.

## Requirement Coverage

| Requirement group | Stories |
| --- | --- |
| FR-001 through FR-006 | US-001 through US-003 |
| FR-007 through FR-012 | US-008, US-009 |
| FR-013 through FR-017 | US-004 through US-007 |
| FR-018 through FR-025 | US-010 through US-013 |
| FR-026 through FR-031 | US-014, US-015 |
| FR-032 through FR-035 | US-016 |
| FR-036 through FR-038 | US-018 |
| NFR-001 through NFR-007 | US-001, US-002, US-008, US-009, US-014 through US-016 |
| NFR-008 through NFR-012 | US-013, US-014, US-016, US-017 |
| NFR-013 through NFR-020 | US-003, US-009 through US-012, US-018 through US-020 |
| PBT-R01 through PBT-R10 | US-004, US-011, US-016, US-021 |
| SEC-R01 through SEC-R08 | US-012, US-015, US-019, US-020 |

## INVEST Verification

- **Independent**: Stories expose separable visitor or maintainer outcomes with explicit dependencies only where unavoidable.
- **Negotiable**: Stories specify user value and acceptance boundaries without prescribing final component internals.
- **Valuable**: Every story maps to at least one named persona and approved requirement.
- **Estimable**: Each story has bounded content, interaction, or verification scope.
- **Small**: No story attempts to implement the entire archive experience or page redesign alone.
- **Testable**: Every story contains concrete Given/When/Then outcomes and requirement identifiers.

## Security Compliance at User Stories

| Rule group | Status | Rationale |
| --- | --- | --- |
| SECURITY-01 through SECURITY-03 | N/A | No server-side persistence, intermediary, or centralized application logging is introduced. |
| SECURITY-04 | Compliant | US-020 covers required header assessment and honest platform limitation handling. |
| SECURITY-05 through SECURITY-08 | N/A | No application API, IAM, private network, authentication, or protected endpoint exists. |
| SECURITY-09 | Compliant | US-012, US-015, and US-019 require safe generic failures and no internal-path disclosure. |
| SECURITY-10 | Compliant | US-020 covers dependency, vulnerability, SBOM, unused-package, lockfile, and CI integrity evidence. |
| SECURITY-11 | Compliant | US-019 and US-020 include malformed media, unsafe schemes, oversized assets, and false-compliance misuse cases. |
| SECURITY-12 | N/A | No authentication or credentials exist. |
| SECURITY-13 | Compliant | US-019 and US-020 restrict media sources and require integrity evidence. |
| SECURITY-14 | N/A | No authentication, authorization, backend, or security event stream exists. |
| SECURITY-15 | Compliant | US-012, US-015, US-018, and US-019 cover fail-safe conversion, viewer, route, and recovery behavior. |

No blocking User Stories security finding remains.

## PBT Compliance at User Stories

- **PBT-01 through PBT-10**: N/A as direct User Stories-stage enforcement. The stories trace approved PBT outcomes for catalog canonicalization, deduplication, serialization, navigation, and resume mapping; formal property identification and framework enforcement occur in the required later design and construction stages.

No blocking User Stories PBT finding remains.
