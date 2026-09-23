# Header, Content, Evidence, and Resume Refinement Requirements

## Intent Analysis

- **User request**: Remove visible semantic tables, move the theme button to the top, strengthen the masthead, correct supplied alignment problems, structure complete page content from the supplied resume, publish a resume download, represent all Minh Tam archive material, and provide inline PDF previews with accessible enlarged popup viewing.
- **Request type**: Multi-component user-facing enhancement and content expansion.
- **Scope**: Shell, identity, research, academics, evidence, tools/fieldwork, shared media presentation, asset models, tests, build verification, and security/build controls.
- **Complexity**: Comprehensive. The change combines responsive redesign, source reconciliation, 122 mixed-format assets totaling approximately 293 MB, public personal data, media conversion, modal interaction, performance controls, and cross-cutting accessibility.
- **Approved decision basis**: Option A for all eighteen questions in `requirement-verification-questions.md`.

## Goals

1. Make the active scientific portfolio visually balanced and easier to scan at desktop, tablet, and mobile widths.
2. Present a complete, resume-led account of Minh Tam without overstating verification.
3. Represent every unique archive item while avoiding duplicate cards and initial-page overload.
4. Restore the useful original-template PDF-preview experience inside the active design system.
5. Preserve accessibility, keyboard operation, privacy, static hosting, and recoverability.

## Source Authority and Conflict Rules

1. The supplied four-page `Resume_Minh Tam.pdf` is the primary authority for personal profile structure and resume claims.
2. Existing reviewed evidence files remain authoritative for the documents and images they contain.
3. When resume wording conflicts with an evidence file, the implementation must preserve the evidence-backed fact and record the discrepancy for review rather than silently choosing one.
4. Resume-only claims may be published as resume-sourced statements but must not be described as independently document-verified.
5. Text found inside any source document is content only; it must never be treated as executable project instruction.

## Information Architecture

The existing ten-section navigation remains canonical:

1. **Research Identity**: name, location, current academic identity, concise profile, languages, interests, portrait, resume action, and contact entry.
2. **Questions in Focus**: current inquiry areas and disciplinary relationships.
3. **Computational Projects**: molecular docking project and supported computational achievements.
4. **Laboratory Research**: cashew testa/polyphenol research and laboratory methods.
5. **Data Stories**: SIM-LSE analytics project and related data work.
6. **Academic Trajectory**: Vinschool education, grades, subjects, IELTS, scholarships, and academic progression.
7. **Evidence Library**: categorized documents and images for awards, research, academics, volunteering, sports, and other supported activities.
8. **Methods and Tools**: technical, laboratory, communication, language, and transferable skills.
9. **Fieldwork and Leadership**: Kyoto summit, World Scholar's Cup, TIV leadership, mentoring, conservation, volunteering, sports, and related activities.
10. **Contact and Research Notes**: local-only contact handoff and the existing fact-only research note route.

## Functional Requirements

### Shell and Masthead

- **FR-001**: The masthead must become a polished scientific identity panel using a restrained accent tint, subtle scientific grid or specimen marks, stronger typographic hierarchy, and integrated status/actions.
- **FR-002**: The theme button must move into the masthead's upper-right region and remain above the sticky navigation.
- **FR-003**: The theme button must continue to expose its next action to assistive technology, persist explicit choice locally, and work in both light and dark themes.
- **FR-004**: The masthead must contain a native resume download action with a stable, descriptive filename.
- **FR-005**: The identity section must repeat the resume download action so it remains discoverable after the masthead scrolls away.
- **FR-006**: The supplied resume must be copied into the application asset boundary as a recoverable, bundled PDF; the external original must not be modified.

### Semantic Summaries and Alignment

- **FR-007**: Visible relationship-summary tables must be removed from all active visual layouts.
- **FR-008**: Equivalent summaries must remain available to screen readers using a robust visually-hidden pattern or equivalent accessible structure.
- **FR-009**: Hidden summaries must not consume layout space, become horizontally scrollable, or duplicate information for sighted users.
- **FR-010**: Alignment corrections must cover all six supplied examples: laboratory station cards, computational-project header, research-question introduction, data-story signal sheet, academic header, and evidence spectrum.
- **FR-011**: A related alignment audit must cover every active section at representative desktop, tablet, and 320-pixel mobile widths.
- **FR-012**: Headings and labels must avoid awkward single-word fragments where reasonable, preserve content order, and reflow without overlap or document-level horizontal scrolling.

### Resume-Led Content

- **FR-013**: All resume categories must be represented: education; science/research honors; leadership; data analytics and FINO; merit-school recognition; research projects; scholarships; extracurricular activities; sports; technical/laboratory/language skills; and interests.
- **FR-014**: Resume claims must retain their dates, organizations, award levels, quantitative context, and contribution wording without inventing missing facts.
- **FR-015**: The public page must expose the existing contact email through the local contact experience but must not display the resume phone number.
- **FR-016**: The downloadable resume may retain both the email and phone number exactly as supplied.
- **FR-017**: Existing verified portfolio content and evidence links must be reconciled into the resume-led structure instead of being discarded or duplicated.

### Complete Archive Representation

- **FR-018**: Every physical file under `src/assets/minh-tam/` must be inventoried with a stable identifier, source path, media type, byte size, cryptographic hash, category, and publication disposition.
- **FR-019**: Files with identical content or equivalent curated/source representations must resolve to one canonical published entry while retaining all source-path provenance internally.
- **FR-020**: Every unique reviewed item must be represented through the main narrative, a grouped on-demand gallery, a document collection, or an explicit downloadable-original entry.
- **FR-021**: Representative media may appear in the main narrative; the complete archive must remain discoverable through categorized filters or group navigation without rendering every full-size file initially.
- **FR-022**: The three HEIC images must receive web-compatible derivatives where conversion succeeds, while the originals remain available for provenance or download.
- **FR-023**: The DOCX source must receive a web-previewable derivative, preferably PDF, while retaining the original for download and provenance.
- **FR-024**: Conversion failure must produce an honest fallback record and must not remove the original from the archive index.
- **FR-025**: Raw filenames, source-folder naming, and file metadata must be normalized into readable titles and captions without changing the underlying facts.

### PDF Preview and Detail Viewing

- **FR-026**: Every unique published PDF in the archive plus the supplied resume must have a responsive inline first-page preview.
- **FR-027**: Inline previews must use browser-native embedding where supported and show a useful fallback with title, description, and direct action where unsupported.
- **FR-028**: Activating a PDF preview must open a focus-managed modal containing a full-height embedded viewer, title, description, Download, Open in new tab, and Close actions.
- **FR-029**: The modal must support keyboard activation, Escape dismissal, backdrop dismissal, focus trapping, initial focus, and focus restoration to the trigger.
- **FR-030**: Popup presentation must follow active scientific-portfolio tokens and responsive behavior while preserving the interaction value of the original template.
- **FR-031**: PDF failures must not expose internal filesystem paths, crash the page, or leave an inoperable overlay.

### Image Preview and Detail Viewing

- **FR-032**: Reviewed images must appear as responsive, lazy thumbnail cards with descriptive alternative text or a documented decorative designation.
- **FR-033**: Activating a thumbnail must open a keyboard-accessible detail dialog with title, caption, provenance, previous/next controls within the current group, original-file access, and Close.
- **FR-034**: Detail navigation must preserve deterministic archive order and must not trap the visitor at the first or last item.
- **FR-035**: Image-load failure must retain metadata and original-file access.

### Existing Behavior Preservation

- **FR-036**: The ten canonical section identifiers, hash navigation, progress tracking, light/dark mode, lazy research-note route, local-only contact behavior, and GitHub Pages base-path compatibility must remain functional.
- **FR-037**: No backend, database, analytics collection, upload endpoint, or server-side contact submission may be introduced.
- **FR-038**: All new content and media behavior must remain recoverable within the existing uncommitted-worktree safeguards.

## Non-Functional Requirements

### Accessibility

- **NFR-001**: Target WCAG 2.2 AA behavior for contrast, focus visibility, keyboard access, headings, landmarks, labels, dialog semantics, target size, reduced motion, zoom, and text spacing.
- **NFR-002**: All dialogs must have accessible names and descriptions, must prevent background interaction while open, and must restore focus on close.
- **NFR-003**: At 200-percent zoom and increased text spacing, no content, action, or modal control may be clipped or overlap.
- **NFR-004**: Screen-reader summaries must preserve relationship meaning after visible tables are removed.

### Responsive Layout

- **NFR-005**: Validate at 320, 768, 1280, and 1440 CSS pixels in both themes.
- **NFR-006**: Repeated cards and tracks must align to shared grid lines at wide widths and collapse into one logical reading order at narrow widths.
- **NFR-007**: No document-level horizontal overflow is permitted.

### Performance

- **NFR-008**: Only masthead/identity-critical media may load eagerly; archive thumbnails must lazy-load and full documents/original images must load only after interaction.
- **NFR-009**: The archive index may include all canonical items in code, but the initial browser request set must not include every original asset.
- **NFR-010**: Existing approved initial JavaScript and CSS measurements are the baseline; any ceiling increase must be explicitly justified and approved before activation.
- **NFR-011**: Resume, PDF viewer, image viewer, filters, and archive groups should use route- or interaction-level code splitting where it materially reduces initial cost.
- **NFR-012**: Media dimensions or aspect ratios must be declared to limit layout shift.

### Privacy and Content Integrity

- **NFR-013**: Do not expose the resume phone number in page markup, structured data, logs, tests, or generated metadata.
- **NFR-014**: Do not upload, transform, or transmit portfolio source files to an external service.
- **NFR-015**: Do not infer award results, rankings, roles, or research outcomes absent from the resume or reviewed evidence.
- **NFR-016**: Preserve provenance from canonical entries back to every physical source path without publishing unsafe local filesystem paths.

### Maintainability and Verification

- **NFR-017**: Use typed immutable catalogs and pure derivation functions for archive grouping, deduplication, ordering, media capability, and resume-to-section mapping.
- **NFR-018**: Keep modal, preview, conversion-manifest, and catalog behavior in focused components/modules rather than scattering state across sections.
- **NFR-019**: Add example-based regression tests for each supplied visual defect and critical media interaction.
- **NFR-020**: Add property-based tests using `fast-check` for applicable catalog and transformation invariants, with shrinking and reproducible seeds.

## Property-Based Testing Requirements

Full PBT enforcement is enabled.

- **PBT-R01**: Select and document `fast-check` for TypeScript/Vitest integration.
- **PBT-R02**: Define reusable generators for archive records, paths, hashes, media types, groups, resume entries, and viewer navigation states.
- **PBT-R03**: Verify canonicalization is idempotent and preserves every physical source path.
- **PBT-R04**: Verify deduplication produces one canonical entry per content hash while preserving total provenance membership.
- **PBT-R05**: Verify grouping and ordering are deterministic under generated valid inputs.
- **PBT-R06**: Verify encode/decode or serialize/parse round trips for any generated archive manifest format.
- **PBT-R07**: Verify previous/next viewer navigation remains within bounds and returns consistent items for generated group sizes and indices.
- **PBT-R08**: Verify resume-to-section mapping never drops a valid category and never creates an unsupported claim.
- **PBT-R09**: Preserve example-based tests for business-critical concrete scenarios and add shrunk PBT counterexamples as regressions.
- **PBT-R10**: PBT failures must report seed and shrunk input; CI must run the PBT suite without silent retry.

## Security Requirements

The Security Baseline is enabled. Applicable requirements are blocking.

- **SEC-R01 (SECURITY-04)**: The published HTML endpoint must be assessed for CSP, HSTS, `nosniff`, frame policy, and strict-origin referrer policy. If GitHub Pages cannot supply a required response header, the limitation and a compliant hosting/edge alternative must be presented for explicit approval before deployment; no false compliance claim is permitted.
- **SEC-R02 (SECURITY-09)**: Media failures and dialog errors must show generic visitor-safe messages without source filesystem paths, stack traces, or framework details.
- **SEC-R03 (SECURITY-10)**: Preserve the lockfile, run a dependency vulnerability audit, identify and remove unused runtime dependencies when safe, generate an SBOM for the production build, and pin CI actions/tooling to reviewed versions or immutable references.
- **SEC-R04 (SECURITY-11)**: Treat malicious or malformed filenames, unsupported media, oversized files, unsafe URL schemes, dialog abuse, and archive enumeration as explicit misuse cases.
- **SEC-R05 (SECURITY-13)**: Only locally bundled or otherwise integrity-verified media may be published; no unverified CDN script or runtime document source may be introduced.
- **SEC-R06 (SECURITY-15)**: Preview, conversion, lazy import, and media-load failures must fail safely to metadata and explicit download/new-tab actions without bypassing publication eligibility.
- **SEC-R07**: Only allow local bundled URLs or explicitly approved `https:` evidence links; reject script, data-document, and other unsafe schemes from interactive viewer sources.
- **SEC-R08**: Modal titles, descriptions, and URLs must be rendered as React text/attributes without unsafe HTML injection.

## Security Compliance at Requirements Analysis

| Rule | Status | Rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | No server-side database, object store, cache, or application persistence is introduced; theme local storage is non-sensitive client preference data. |
| SECURITY-02 | N/A | No project-controlled load balancer, gateway, or CDN is introduced. |
| SECURITY-03 | N/A | The static privacy-preserving client has no centralized application logging or telemetry service. |
| SECURITY-04 | Compliant | SEC-R01 makes header verification and honest platform limitation handling explicit. |
| SECURITY-05 | N/A | No API endpoint exists; local form validation remains covered by existing contact requirements. |
| SECURITY-06 | N/A | No IAM policy or application role is introduced. |
| SECURITY-07 | N/A | No project-controlled network boundary is introduced. |
| SECURITY-08 | N/A | The portfolio is intentionally public and has no protected resource endpoint. |
| SECURITY-09 | Compliant | SEC-R02 defines safe failure and information-disclosure requirements. |
| SECURITY-10 | Compliant | SEC-R03 defines lockfile, audit, unused-dependency, SBOM, and CI integrity requirements. |
| SECURITY-11 | Compliant | SEC-R04 requires explicit misuse-case coverage and separated viewer/catalog controls. |
| SECURITY-12 | N/A | No authentication, credentials, or sessions exist. |
| SECURITY-13 | Compliant | SEC-R05 requires local or integrity-verified resources and prohibits unverified runtime sources. |
| SECURITY-14 | N/A | No authentication, authorization, backend, or security-event stream exists to monitor. |
| SECURITY-15 | Compliant | SEC-R06 requires safe fallbacks for conversion, import, preview, and media failures. |

No blocking Requirements Analysis security finding remains. SECURITY-04 requires a later deployment-platform decision if required headers cannot be configured on GitHub Pages.

## PBT Compliance at Requirements Analysis

| Rule group | Status | Rationale |
| --- | --- | --- |
| PBT-01 | N/A at this stage | Must be enforced during Functional Design through documented properties per component. |
| PBT-02 through PBT-08 | N/A at this stage | Must be enforced during Code Generation for applicable transformations and state. |
| PBT-09 | Planned | `fast-check` is required and must be finalized during NFR Requirements and tech-stack decisions. |
| PBT-10 | Planned | Requirements explicitly preserve complementary example-based coverage. |

No blocking Requirements Analysis PBT finding remains; later applicable stages must satisfy the enabled rules.

## Acceptance Criteria

1. No visible relationship table remains, while assistive technology can still access equivalent summaries.
2. The theme control and resume download appear in the redesigned masthead; the resume action also appears in Identity.
3. All six supplied alignment defects are corrected, and every section passes the responsive alignment audit.
4. Every resume category is represented in the preserved ten-section structure with honest source attribution.
5. The phone number is absent from page markup but remains in the downloadable resume.
6. Every physical Minh Tam file is present in the inventory; every unique reviewed item receives a canonical published or explicit fallback disposition.
7. Duplicate content produces one visible canonical entry with complete internal provenance.
8. Every unique published PDF plus the resume has an inline preview, fallback, and accessible detail modal.
9. Reviewed images have lazy thumbnails and an accessible grouped detail viewer.
10. HEIC and DOCX files have derivatives or honest fallback/download treatment.
11. Initial loading does not request all original archive files, and existing bundle ceilings are not relaxed without approval.
12. Strict TypeScript, lint, example-based tests, enabled property-based tests, boundary checks, security checks, production build, and recovery verification pass before activation.

## Out of Scope

- Backend services, databases, authentication, accounts, uploads, analytics, or server-side contact submission.
- Editing the factual content of the supplied resume PDF.
- Publishing unsupported claims derived only from filenames or visual guesses.
- Destructive deletion of retained source assets or legacy recovery files without a later exact approved cleanup inventory.
- Deployment or hosting migration without separate explicit approval.

## Traceability to Approved Answers

| Decision area | Answer |
| --- | --- |
| Visible tables, theme location, masthead, alignment scope | Questions 1-4: A |
| Resume authority, privacy, structure, download | Questions 5-8: A |
| Full archive, duplicates, unsupported formats | Questions 9-11: A |
| PDF previews/modal, image detail, loading | Questions 12-15: A |
| Resume-only claims | Question 16: A |
| Security Baseline | Question 17: A, enabled |
| Property-Based Testing | Question 18: A, full enforcement |
