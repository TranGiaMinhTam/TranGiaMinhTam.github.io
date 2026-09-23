# U-03 Business Rules

## Content Integrity

| Rule | Requirement |
| --- | --- |
| IDN-001 | Name, role, location, and summary must originate from the U-01 verified identity record. |
| IDN-002 | The `Currently exploring` statement may use only themes supported by the verified summary and must remain interest-oriented. |
| IDN-003 | `Fields in exploration` must remain visibly separate from completed work, methods, credentials, findings, and skills. |
| QST-001 | All three verified research questions must appear in approved order and retain exploratory meaning. |
| QST-002 | No question presentation may add a result, performance claim, publication, affiliation, or unsupported research status. |
| QST-003 | U-03 must consume the U-01 verified source and selectors rather than importing legacy `src/data` modules directly. |

## Evidence and Actions

| Rule | Requirement |
| --- | --- |
| EVD-001 | The portrait may render only from its published evidence-manifest record and must use accurate alternative text. |
| EVD-002 | A portrait loading failure must preserve the full text identity and must not expose a broken-image control. |
| EVD-003 | The document action must resolve the published academic transcript record and use its approved filename. |
| EVD-004 | Visible and accessible document labels must say `academic record`; the transcript must not be described as a résumé or CV. |
| EVD-005 | Missing required document evidence blocks acceptance; a fabricated link or silent replacement is prohibited. |
| ACT-001 | `Explore research questions` must target the registered `questions` locus and preserve a native anchor fallback. |

## Relationship Model

| Rule | Requirement |
| --- | --- |
| REL-001 | Discipline coordinates must come from the closed, documented mapping of approved question domains. |
| REL-002 | Unknown domains and broken relationship targets are blocking validation findings; runtime guessing is prohibited. |
| REL-003 | The constellation and semantic alternative must be generated from the identical relationship collection. |
| REL-004 | Every question and relationship must remain present without selection, filtering, disclosure, or hover. |
| REL-005 | Hover and focus may change emphasis only; color cannot be the sole relationship cue. |

## Composition and Integration

| Rule | Requirement |
| --- | --- |
| CMP-001 | Research Identity must use an asymmetric editorial specimen field, not a centered hero, boxed profile, sidebar, or generic card. |
| CMP-002 | Questions I Explore must use a relationship composition, not a repeated card or tile grid. |
| CMP-003 | U-03 may replace only the `identity` and `questions` bodies through the typed shell seam. |
| CMP-004 | U-02 section order, locus navigation, geometry, progress, header, and theme behavior must remain unchanged. |
| CMP-005 | The remaining eight section bodies must remain temporary until their owning units are approved. |

## Accessibility and Interaction

| Rule | Requirement |
| --- | --- |
| A11Y-001 | Identity content, action labels, question text, and relationship meaning must exist in semantic DOM reading order. |
| A11Y-002 | The visual relationship requires an adjacent semantic list or table containing equivalent question-coordinate information. |
| A11Y-003 | All controls must be native keyboard-operable elements with visible focus indication. |
| A11Y-004 | Decorative imagery and paths must not add duplicate or misleading screen-reader output. |
| A11Y-005 | Focus and hover styles must communicate the same emphasis; no information may depend on pointer hover. |
| A11Y-006 | Reduced-motion preference must disable tracing transitions and use the U-02 immediate-navigation behavior. |

## Responsive and Resilience Rules

| Rule | Requirement |
| --- | --- |
| RSP-001 | Desktop asymmetry must become one logical editorial sequence at narrow widths without horizontal page overflow. |
| RSP-002 | Identity actions must wrap locally and remain comfortably operable without creating a separate mobile navigation pattern. |
| RSP-003 | The relationship alternative must remain vertically readable when the constellation has limited width. |
| ERR-001 | Missing identity, required document, verified question, domain mapping, or relationship target blocks validation. |
| ERR-002 | Failure states must never invent substitute biography, evidence, disciplines, questions, or outcomes. |
| ERR-003 | A recoverable portrait failure must not prevent identity actions or text from rendering. |

## Acceptance Invariants

- Exactly one verified identity and exactly three verified questions are represented.
- Both views derive from U-01 contracts and enter U-02 through the registered seam.
- The academic transcript is described truthfully.
- The visualization and semantic alternative agree for every relationship.
- The first viewport and question section remain recognizably different from the rejected and original layouts.
- No new dependency, backend endpoint, later-domain implementation, or shell restructure is introduced.
