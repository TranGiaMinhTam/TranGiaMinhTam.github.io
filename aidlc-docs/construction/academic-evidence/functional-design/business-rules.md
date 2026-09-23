# U-05 Business Rules

## Academic Selection and Integrity

| Rule | Requirement |
| --- | --- |
| ACA-001 | Academic Trajectory must select exactly the verified AS & A-Level and IGCSE records. |
| ACA-002 | Program, institution, period, specialization, details, provenance, and source order must come from canonical verified records. |
| ACA-003 | The current AS & A-Level program must display `In progress`; completed results and current study must remain distinguishable. |
| ACA-004 | Exact GPA, grades, IELTS result and date, subject focus, institution, and period may appear only as supported by the verified record. |
| ACA-005 | U-05 may not infer predicted grades, class rank, admission outcome, scholarship acceptance, enrollment, or future qualification. |
| ACA-006 | Chronology must be understandable without a conventional timeline rail, ledger table, or date-only ordering cue. |

## Recognition and Academic Evidence

| Rule | Requirement |
| --- | --- |
| REC-001 | Borsworth and Worthgate must be labeled as scholarship offers using canonical evidence titles. |
| REC-002 | Scholarship markers and Evidence Library rows must reference the same canonical evidence identifiers and assets. |
| REC-003 | A scholarship marker cannot imply that an offer was accepted or used. |
| REC-004 | The academic transcript remains a transcript and must not be renamed or presented as the pending CV. |
| REC-005 | Missing optional transcript or scholarship evidence cannot erase verified academic text. |

## Evidence Eligibility and Publication Safety

| Rule | Requirement |
| --- | --- |
| EVD-001 | Only U-05-eligible records with `published` status and safe same-origin destinations may enter the library. |
| EVD-002 | Each accepted evidence identifier appears exactly once in the library. |
| EVD-003 | The U-03 portrait, former-owner writing, raw archives, private documents, malformed destinations, and later-unit-only evidence are excluded. |
| EVD-004 | The current library contains one transcript, two scholarship documents, four research-output documents, and three project images. |
| EVD-005 | Duplicate evidence identifiers are blocking because they make provenance and action targets ambiguous. |
| EVD-006 | Missing optional evidence produces a stable finding and accurate recomputed grouping; no placeholder claim is invented. |

## Preview and Action Behavior

| Rule | Requirement |
| --- | --- |
| PRV-001 | PDFs use text-first previews containing type, title, caption, provenance, format, and an explicit native open action. |
| PRV-002 | PDFs may not be embedded, rasterized at runtime, prefetched, preloaded, or fetched by application code. |
| PRV-003 | Approved images use lazy loading, asynchronous decoding, intrinsic dimensions, and meaningful alternative text. |
| PRV-004 | Full PDF and image resources open only after a native user action with destination context in the accessible name. |
| PRV-005 | Image failure replaces only the failed preview with a local accessible status and preserves metadata and actions. |
| PRV-006 | Evidence actions may not use unsafe schemes, cross-origin raw paths, or unpublished destinations. |

## Grouping and Semantic Equivalence

| Rule | Requirement |
| --- | --- |
| GRP-001 | Evidence groups are Academic Record, Scholarships, Research Outputs, and Project Visuals in that order. |
| GRP-002 | Group membership is determined by closed type and identifier rules, not caption keywords or runtime inference. |
| GRP-003 | Archive rows, evidence-spectrum marks, and semantic counts derive from the same accepted grouped collection. |
| GRP-004 | Visual and semantic group identifiers, labels, counts, and order must match exactly. |
| GRP-005 | Color cannot be the sole group cue; labels, markers, counts, and borders must remain sufficient. |

## Composition and Interaction

| Rule | Requirement |
| --- | --- |
| CMP-001 | Academic Trajectory uses a curriculum cross-section, not a ledger, conventional timeline, or repeated education cards. |
| CMP-002 | Evidence Library uses grouped asymmetric archive rows, not a uniform card grid. |
| CMP-003 | All academic facts and accepted evidence remain in the reading flow without filters, accordions, carousels, hover, or disclosure state. |
| CMP-004 | Optional category navigation uses native in-page anchors and never changes the accepted evidence collection. |
| CMP-005 | U-05 registers exactly `academic-trajectory` and `evidence-library`; Tools and later bodies remain temporary. |
| CMP-006 | U-05 cannot publish a CV or own Identity, Research, Tools, Fieldwork, Contact, or Journal presentation. |

## Accessibility, Responsive Behavior, and Failure

| Rule | Requirement |
| --- | --- |
| A11Y-001 | Program status, grades, evidence kind, provenance, and action purpose must be expressed in text. |
| A11Y-002 | Evidence-spectrum information must have an adjacent semantic count list sourced from identical values. |
| A11Y-003 | Native links require visible focus and stable purpose-based accessible names. |
| A11Y-004 | Heading hierarchy and group landmarks must remain valid inside the shell-provided section heading. |
| RSP-001 | Both bodies must reflow to one continuous reading sequence at narrow widths and 200-percent zoom. |
| RSP-002 | Metadata columns stack without document-level horizontal scrolling, clipping, or overlapping actions. |
| RSP-003 | Increased text spacing and long provenance labels must not obscure status or evidence actions. |
| ERR-001 | Invalid required academic content produces stable ordered findings and no inferred fallback. |
| ERR-002 | Optional evidence and preview failures remain local and cannot remove unrelated content. |

## Acceptance Invariants

- Two verified academic programs appear once with explicit completion state.
- Exact verified grades and language qualification remain distinguishable from current study.
- Transcript and scholarship relationships resolve to canonical evidence records without asset duplication.
- Ten eligible evidence records appear once when the approved manifest is intact.
- Every PDF is text-first and on demand; every image preview is lazy and locally recoverable.
- Archive group counts exactly match the semantic evidence summary.
- U-03 portrait, pending CV, raw assets, and former-owner content remain outside the U-05 library.
- Exactly two U-05 bodies are registered, producing seven finished and three temporary shell sections after activation.
