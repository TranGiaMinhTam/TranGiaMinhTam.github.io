# U-04 Business Rules

## Project Selection and Integrity

| Rule | Requirement |
| --- | --- |
| RES-001 | Exactly one verified computational project, one laboratory project, and one data story must be selected. |
| RES-002 | Molecular docking belongs only to Computational Projects, cashew testa only to Laboratory Research, and SIM-LSE analytics only to Data Stories. |
| RES-003 | A project may not be repeated across U-04 sections. |
| RES-004 | Questions, summaries, methods, tools, time context, provenance, and evidence identifiers must originate from the verified source. |
| RES-005 | Repositories, metrics, findings, target identities, affiliations, authorship, and external links may not be inferred. |
| RES-006 | Required project records with empty question, summary, method, tool, or time fields fail closed. |

## Contribution and Claim Boundaries

| Rule | Requirement |
| --- | --- |
| CLM-001 | Molecular docking and cashew testa must display `Role not specified in verified source`. |
| CLM-002 | SIM-LSE may display `Team-led project` because that wording is supported by the approved abstract. |
| CLM-003 | Listed methods describe project workflow and do not prove sole execution, expertise, or authorship. |
| CLM-004 | The cashew skincare cream must be labeled as a prototype, not a validated product or result. |
| CLM-005 | Data-story structures may not display invented chart values, KPIs, rankings, trends, or recommendations. |
| CLM-006 | Publication evidence describes an available supporting document and does not independently establish authorship. |

## Data Stories and Routing

| Rule | Requirement |
| --- | --- |
| DAT-001 | The verified SIM-LSE project is the only U-04 Data Stories item. |
| DAT-002 | Existing local journal and WordPress records are former-owner content and must not be selected, relabeled, rewritten, or linked. |
| DAT-003 | With no verified student-authored writing destination, U-04 must display `Research notes are being prepared` as plain publication status. |
| DAT-004 | U-04 may provide a typed future local-note destination contract but must not implement U-07 detail routing. |
| DAT-005 | A publication status without a verified destination must never be focusable or styled as an active link. |

## Evidence

| Rule | Requirement |
| --- | --- |
| EVD-001 | Evidence must resolve by stable identifier through the published manifest. |
| EVD-002 | Project figures load lazily with intrinsic geometry and accurate alternative text. |
| EVD-003 | Full images and PDFs open only through native user-initiated actions; embedding, preload, prefetch, and runtime fetch are prohibited. |
| EVD-004 | Evidence labels must identify purpose and document type before activation. |
| EVD-005 | Missing optional evidence removes only its action or image; verified project text remains. |
| EVD-006 | Raw source directories and unpublished personal documents cannot enter the component or build graph. |

## Relationships and Visual Meaning

| Rule | Requirement |
| --- | --- |
| REL-001 | Method, tool, time, and evidence relationships must use unique stable identifiers and valid endpoints. |
| REL-002 | Visual tracks and semantic alternatives must derive from the same normalized relationship collection. |
| REL-003 | Order, text labels, markers, and line styles must carry relationship meaning without color. |
| REL-004 | Missing or duplicate required endpoints are blocking findings; runtime guessing is prohibited. |
| REL-005 | Emphasis may change presentation only and must never reveal otherwise-hidden facts. |

## Composition and Ownership

| Rule | Requirement |
| --- | --- |
| CMP-001 | Computational Projects uses a pipeline, not a project card or U-03 constellation. |
| CMP-002 | Laboratory Research uses a specimen-to-assay bench sequence, not the computational pipeline with relabeled colors. |
| CMP-003 | Data Stories uses an analytical signal sheet, not a journal list, article grid, or decorative dashboard. |
| CMP-004 | U-04 registers exactly three bodies: `computational-projects`, `laboratory-research`, and `data-stories`. |
| CMP-005 | U-04 cannot import identity, academic, evidence-library, impact, contact, or journal presentation components. |
| CMP-006 | Academic Trajectory, Evidence Library, Tools, Fieldwork and Leadership, and Contact remain temporary. |

## Accessibility, Responsive, and Resilience

| Rule | Requirement |
| --- | --- |
| A11Y-001 | Every core project fact remains in semantic DOM reading order without interaction. |
| A11Y-002 | Every informational visual has an adjacent ordered-list or table equivalent. |
| A11Y-003 | Evidence actions are native anchors with visible focus and purpose-based accessible names. |
| A11Y-004 | Hover-only, pointer-only, auto-advancing, and drag-only information is prohibited. |
| RSP-001 | All three wide compositions become a single intentional column at narrow widths. |
| RSP-002 | Local overflow may be used for a labeled semantic table, but document-level horizontal overflow is prohibited. |
| RSP-003 | Evidence actions wrap without collision and maintain usable targets at zoom and increased text spacing. |
| ERR-001 | Optional evidence or image failure cannot erase a verified project. |
| ERR-002 | Invalid required content produces deterministic ordered findings and no fabricated fallback. |

## Acceptance Invariants

- The three verified projects appear exactly once.
- Computational, laboratory, and data practice remain visually and semantically distinct.
- Former-owner writing remains absent.
- Unknown roles are disclosed rather than inferred.
- All evidence is published, typed, purpose-labeled, and user initiated.
- Visual and semantic relationship identifier sets match exactly.
- Exactly three U-04 bodies are registered and five later bodies remain temporary.
