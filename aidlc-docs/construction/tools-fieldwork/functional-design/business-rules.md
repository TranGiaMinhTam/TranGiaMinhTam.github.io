# U-06 Business Rules

## Tool Selection and Classification

| Rule | Requirement |
| --- | --- |
| TOOL-001 | Methods and Tools must select exactly the sixteen verified `tool` records across Academic, Research & Data, Laboratory, and Languages & Interests. |
| TOOL-002 | Category, title, and facts must come from canonical verified records; no tool may be added, removed, or renamed. |
| TOOL-003 | Every tool's demonstrated-or-interest classification must come from the closed Tool Linking Table; runtime label matching or inference is prohibited. |
| TOOL-004 | U-06 may not invent a numeric rating, proficiency level, percentage, star count, or endorsement for any tool. |
| TOOL-005 | A demonstrated tool's linked context must resolve to an existing U-04 or U-05 section anchor; it may not point to a fabricated or removed target. |
| TOOL-006 | An unmapped tool (absent from the Tool Linking Table) is a blocking condition, not a silent default. |

## Fieldwork and Leadership Selection and Integrity

| Rule | Requirement |
| --- | --- |
| FLD-001 | Fieldwork and Leadership must select exactly the four verified records already classified by kind in `verifiedPortfolioSource.ts`: one `fieldwork` and three `leadership`. |
| FLD-002 | Role/title, organization, period, and description must come unmodified from canonical verified records. |
| FLD-003 | Grouping is by verified kind (Fieldwork, Leadership) only; U-06 may not regroup records by inferred theme, keyword, or date. |
| FLD-004 | U-06 may not overstate participation as leadership, or leadership as an organizational title the record does not verify. |
| FLD-005 | Group order is Fieldwork before Leadership; record order within each group follows verified source order. |

## Evidence Honesty

| Rule | Requirement |
| --- | --- |
| EVD-001 | A tool, fieldwork, or leadership record renders an evidence action only if its id appears in `evidenceManifest.ts`. |
| EVD-002 | No U-06 record may render a placeholder, synthesized, or borrowed evidence action when none exists. |
| EVD-003 | If a future plan-approved manifest addition supplies an evidence id for a U-06 record, only that action is added; unrelated presentation is unaffected. |

## Grouping and Semantic Equivalence

| Rule | Requirement |
| --- | --- |
| GRP-001 | Methods and Tools categories appear in the order Academic, Research & Data, Laboratory, Languages & Interests. |
| GRP-002 | Fieldwork and Leadership groups appear in the order Fieldwork, Leadership. |
| GRP-003 | Both bodies' semantic summary lists derive from the same accepted grouped collection used by the visual presentation. |
| GRP-004 | Visual and semantic group identifiers, labels, counts, and order must match exactly. |
| GRP-005 | Color cannot be the sole cue distinguishing demonstrated from interest, or Fieldwork from Leadership; labels and markers must remain sufficient. |

## Composition and Interaction

| Rule | Requirement |
| --- | --- |
| CMP-001 | Methods and Tools uses a relationship-based capability map, not a proficiency matrix, star rating, or repeated-row grid. |
| CMP-002 | Fieldwork and Leadership uses two labeled kind-based groups, not a chronological activity log, timeline, or ledger. |
| CMP-003 | All tool and fieldwork/leadership facts remain in the reading flow without filters, accordions, carousels, hover, or disclosure state. |
| CMP-004 | U-06 registers exactly `tools` and `fieldwork-leadership`; Contact and Journal remain temporary. |
| CMP-005 | U-06 cannot publish a CV or own Identity, Research, Academic, Contact, or Journal presentation. |
| CMP-006 | U-06 does not import U-04 or U-05 presentation components; it may link to their existing section anchors only. |

## Accessibility, Responsive Behavior, and Failure

| Rule | Requirement |
| --- | --- |
| A11Y-001 | Classification (demonstrated/interest), linked context, group kind, role, organization, and period must be expressed in text. |
| A11Y-002 | Both bodies' capability/activity visuals must have an adjacent semantic summary list sourced from identical values. |
| A11Y-003 | Context links have visible focus and stable purpose-based accessible names. |
| A11Y-004 | Heading hierarchy and group landmarks must remain valid inside the shell-provided section heading. |
| RSP-001 | Both bodies must reflow to one continuous reading sequence at narrow widths and 200-percent zoom. |
| RSP-002 | Role/organization/period columns stack without document-level horizontal scrolling or clipped text. |
| RSP-003 | Increased text spacing and long descriptions must not obscure classification, group labels, or links. |
| ERR-001 | Invalid required tool or fieldwork/leadership content produces stable ordered findings and no inferred fallback. |
| ERR-002 | An unmapped tool or a broken context link remains local and cannot remove unrelated content. |

## Acceptance Invariants

- Sixteen verified tools appear once, correctly categorized, with an exact demonstrated-or-interest classification from the closed Tool Linking Table.
- No numeric proficiency, rating, or endorsement appears anywhere in either body.
- Every demonstrated tool's linked context resolves to an existing U-04 or U-05 anchor.
- Exactly one Fieldwork record and three Leadership records appear once each, with exact role, organization, period, and description text.
- No evidence action renders for any U-06 record while `evidenceManifest.ts` contains no matching id.
- Visual capability/activity groupings and their semantic summaries match exactly.
- Exactly two U-06 bodies are registered, producing nine finished and one temporary shell section after activation.
