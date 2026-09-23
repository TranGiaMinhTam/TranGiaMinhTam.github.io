# U-04 Business Logic Model - Complete Archive Discovery

## Objective and Boundary

U-04 makes every approved public certificate, picture, and supporting archive item discoverable through the existing Evidence Library without loading the entire archive at page start. It consumes the U-01 canonical manifest, U-02 layout contracts, and U-03 narrative placements. It also carries one bounded Contact correction: personal-portfolio wording and a balanced email-draft action row.

U-04 does not implement PDF or image dialogs, change deployment infrastructure, parse source files in the browser, publish excluded academic transcripts, expose filesystem provenance, or delete source material. U-05 owns full media-detail viewers.

## Governed Inventory

- `src/assets/minh-tam/source/` contains 104 non-system source files: 85 JPG, three HEIC, two PNG, 13 PDF, and one DOCX.
- All 104 source files are represented in the governed manifest; missing source membership is zero.
- The complete manifest contains 128 physical files represented by 110 canonical items after exact duplicate consolidation.
- Generated capabilities currently include 96 image thumbnails, 13 PDF first-page derivatives, four web-display derivatives, and one honest document-preview fallback.
- `.DS_Store` files are system metadata and never become archive items.
- Both academic transcript records remain internally inventoried but are excluded from public selection by the user's explicit instruction.

## Processing Sequence

1. **Validate the canonical manifest**: require schema, counts, byte totals, unique canonical and physical IDs, safe repository-relative paths, valid hashes, consistent ownership, and valid derivative references.
2. **Apply publication eligibility**: classify every canonical item as narrative, gallery, document collection, safe original action, or explicitly excluded. An excluded item remains in internal coverage but cannot enter public summaries or group modules.
3. **Reconcile narrative placement**: items already used as identity or project narrative media keep one primary disposition and may be referenced from archive summaries without duplicating their public card.
4. **Project visitor taxonomy**: map eligible records into natural activity groups and reviewed subcollections. Technical folder names and source paths never become visitor copy by default.
5. **Build eager summaries**: emit only stable group ID, label, description, eligible count, order, and capability counts. Summaries contain no original-media imports.
6. **Resolve one group on demand**: accept only an ID in the approved summary set, dynamically import its data module, validate membership/count/order, and retain the result in an in-memory session cache.
7. **Project item capabilities**: image items receive dimensioned thumbnail capabilities; documents receive compact document/original actions. Every media URL passes the central U-01 admission policy.
8. **Render safe states**: unknown IDs fail closed; recoverable loader failures retain the summary and expose Retry; item failures retain natural metadata and any safe direct action.
9. **Verify complete discovery**: every eligible canonical item has exactly one primary public disposition, every source certificate/picture maps to an eligible canonical item or an explicit exclusion, and displayed counts equal membership.
10. **Review an isolated candidate**: test responsive layouts, keyboard behavior, loading/failure states, request boundaries, bundle budgets, both themes, and representative galleries before activation.

## Visitor Taxonomy

| Display group | Relevant subcollections | Primary content |
| --- | --- | --- |
| Scientific Research | 2026 Protein Docking, GYS 2025, WICO 2025, Science Research Project | Project photographs, posters, certificates, papers, and reviewed documents |
| Academic Competitions | FINO 2026, Kyoto Youth Summit 2026, SIM-LSE 2026, WSC 2024 | Competition photographs, certificates, presentations, and award material |
| Community and Conservation | Green Farm, IAM Volunteen, Nam Cat Tien, Nui Chua, volunteer certificates | Volunteer photographs and certificates |
| Scholarships | Bosworth and Worthgate | Approved two-page scholarship document capabilities |
| Public Speaking | Debate | Reviewed public-speaking image material |
| Sport | Badminton and soccer | Certificate and image material |
| Featured Project Visuals | Curated 2026 Protein Docking and other explicitly curated project media | Narrative-connected visual highlights |
| Identity Material | Profile portrait and biomedical mark | Narrative placement rather than duplicate gallery cards |

Academic Records remains an internal taxonomy slot but produces no public group while its only records are excluded transcripts. A technical group name such as `complete-archive` cannot create a literal archive download unless a real reviewed archive capability exists; the currently associated profile portrait is treated as Identity narrative media.

## Group Activation Model

The explorer starts with all group bodies closed. Each summary uses a real button with `aria-expanded` and `aria-controls`. Activating a summary selects one group at a time:

- `idle` to `loading` on first activation;
- `loading` to `ready` after validation;
- `loading` to `failure` on a recoverable import or validation failure;
- `failure` to `loading` on Retry;
- any valid summary may replace the current active group;
- successfully loaded immutable group data remains cached for the page session.

Selection state does not own or mutate catalog data. Closing or switching a group never removes the already loaded module from the in-memory cache.

## Contact Correction

The Contact section remains a local `mailto:` composer. Its presentation changes to personal-portfolio language:

- Heading: `Let us connect.`
- Introduction: `Have a project, collaboration, opportunity, or question in mind? Write a message here, then continue in your email app.`
- Composer label: `Email draft`
- Privacy note: `Nothing is submitted or stored by this site. Your message opens in your email app for review.`
- Action: `Open email draft`

The explanatory note and action share one full-width action row. The note occupies the flexible column and the bounded button aligns right on wide screens; on narrow screens they stack and the button spans the available width. Existing validation, focus-to-first-error, safe recipient selection, and encoded `mailto:` behavior remain unchanged.

## Failure Outcomes

| Condition | Outcome |
| --- | --- |
| Invalid manifest, duplicate membership, count mismatch, or unsafe source | Block candidate composition |
| Eligible item has no primary disposition | Block candidate composition |
| Excluded transcript enters a public model | Block with a safe exclusion finding |
| Unknown group ID | Return a visitor-safe not-found result; import nothing |
| Group module fails to load | Show safe failure with Retry; retain summary navigation |
| Thumbnail fails | Preserve title/caption and safe file action; no broken-image placeholder claim |
| Document derivative is unavailable | Show metadata and approved original action only |
| Performance ceiling or initial-original request is exceeded | Block activation pending correction or explicit approval |

## Testable Properties - PBT-01 and PBT-R05

| ID | Category | Property |
| --- | --- | --- |
| U04-P01 | Invariant | Every eligible canonical item belongs to exactly one primary public disposition. |
| U04-P02 | Invariant | Group summary counts equal the number of selected eligible members. |
| U04-P03 | Determinism | Permuting valid input records does not change canonical group or item order. |
| U04-P04 | Idempotence | Projecting an already projected valid public catalog produces an equivalent result. |
| U04-P05 | Oracle | Optimized group selection equals a simple filter-and-sort reference model. |
| U04-P06 | Easy verification | Every public item and capability resolves to admitted catalog and derivative identifiers. |
| U04-P07 | Invariant | Unknown or excluded group/item identifiers never trigger a module or media capability. |
| U04-P08 | Invariant | Source-folder certificate and picture membership is preserved through canonical duplicate consolidation. |
| U04-P09 | Invariant | Input catalog, metadata, derivatives, and group arrays remain structurally unchanged. |

Domain generators cover valid and excluded canonical items, group IDs, dispositions, duplicate physical memberships, derivative availability, Unicode titles, empty/single/many groups, equal order values, and input permutations. Shrinking remains enabled and every run uses a fixed or logged seed. Example tests separately pin source coverage, transcript exclusion, key showcases, Contact copy, keyboard activation, failure/retry, and initial-request behavior.
