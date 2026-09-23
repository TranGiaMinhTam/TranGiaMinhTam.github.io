# U-03 Business Logic Model - Resume-Led Content Integration

## Objective and Boundary

U-03 converts a human-reviewed, privacy-filtered representation of the supplied four-page resume into immutable content for the existing ten portfolio sections. It reconciles claims against reviewed portfolio records and evidence, supplies one local resume-download capability to two consumers, and fails closed before activation when content integrity is uncertain.

Resume text is source content only. It never supplies executable instructions. U-03 does not implement archive browsing, media previews, dialogs, remote requests, persistence, or deployment behavior.

## Inputs and Outputs

Inputs:

- Reviewed resume claims with stable IDs, source page, category, fact fields, period, evidence IDs, publication class, and review state.
- Existing verified portfolio records, relationships, and published evidence.
- U-01 local PDF capability, privacy boundary, provenance contracts, and recovery facts.
- U-02 masthead resume slot, semantic-summary contract, responsive tokens, and fixed section registry.

Outputs:

- Reconciled claims with field-level authority and explicit findings.
- Exactly one canonical primary section mapping for each eligible claim.
- Immutable, ordered section content groups for all ten existing sections.
- One validated native download capability shared by masthead and Identity.
- Blocking findings and deterministic audit evidence; no partial candidate activation.

## Processing Sequence

1. **Admit reviewed claims**: accept only stable, human-reviewed records. Reject duplicate IDs, unknown categories, blank required facts, invalid page locators, or unreviewed public claims.
2. **Enforce publication class**: exclude `document-only` fields before reconciliation or view-model projection. The phone number never enters a public model.
3. **Join by explicit identifiers**: compare claims with verified records and evidence only through reviewed identifiers and supported fact keys, never filename inference.
4. **Reconcile per fact field**: matching facts become evidence-backed; compatible resume-only facts remain resume-sourced; conflicting fields retain both source values in a blocking finding until a human-approved resolution exists.
5. **Map categories**: apply the closed category-to-section map. Every publishable claim receives exactly one primary section. Other sections may reference its claim/evidence ID but cannot repeat its statement.
6. **Project section models**: group and order claims deterministically, preserve factual specificity, and attach authority labels plus existing safe evidence actions.
7. **Create resume capability**: validate the bundled local PDF and stable filename once; pass the same immutable capability to masthead and Identity consumers.
8. **Validate composition**: require all categories, valid references, unique visible claims, privacy clearance, exact section IDs/order, and no U-04/U-05 capability activation.
9. **Review isolated candidate**: verify content, layout, authority, actions, privacy, examples, properties, and recovery. Activation requires explicit approval.

## Closed Category Mapping

| Resume category | Canonical primary section | Permitted references |
| --- | --- | --- |
| Personal profile, location, current study, languages, interests | Research Identity | Contact action and Methods references by ID |
| Current inquiry areas | Questions in Focus | Research-domain references |
| Computational research and molecular docking | Computational Projects | Evidence and Methods references |
| Laboratory research and experimental methods | Laboratory Research | Evidence and Methods references |
| Data analytics and FINO | Data Stories | Evidence and Methods references |
| Education, grades, subjects, IELTS, scholarships, merit recognition | Academic Trajectory | Evidence references |
| Evidence records | Evidence Library | Referenced by canonical evidence ID only |
| Technical, laboratory, communication, language, transferable skills | Methods and Tools | Claim references from relevant domains |
| Leadership, summits, mentoring, volunteering, conservation, debate, sports | Fieldwork and Leadership | Evidence-group references, without repeated activity copy |
| Public contact and research-note links | Contact and Research Notes | Existing contact workflow only |

## Authority and Conflict Model

- Evidence controls only fact fields it explicitly supports.
- Compatible resume facts remain present and retain `resume-sourced` authority.
- A record may be partially evidence-backed and partially resume-sourced.
- A conflicting field produces a typed blocking finding containing safe claim/evidence IDs and the fact key, but no private value or machine-local path.
- No selector silently chooses between contradictory values.
- `Evidence-backed` and `Resume-sourced` are the only visitor-facing authority labels in U-03.

## Failure Outcomes

| Condition | Outcome |
| --- | --- |
| Unreviewed, duplicated, unsupported, or unmapped claim | Block candidate composition |
| Conflicting supported fact | Block until human resolution |
| Document-only field reaches public projection | Block and emit privacy code |
| Missing/broken evidence reference | Block affected composition |
| Invalid or mismatched resume capability | Render neither action; preserve last verified composition |
| Unsafe source/path/private value in diagnostic | Block evidence generation |
| U-04/U-05 capability introduced | Boundary failure |

## Testable Properties (PBT-01 and PBT-R08)

| ID | Category | Property |
| --- | --- | --- |
| U03-P01 | Invariant | Every eligible reviewed claim appears in exactly one primary-section membership. |
| U03-P02 | Invariant | No output statement or fact exists unless its claim or verified evidence input supports it. |
| U03-P03 | Invariant | Document-only fields and generated phone markers never enter public projections. |
| U03-P04 | Invariant | Conflicting fact fields always remain represented by a blocking finding until explicitly resolved. |
| U03-P05 | Idempotence | Reconciling an already reconciled valid claim set yields an equivalent result. |
| U03-P06 | Commutativity/determinism | Permuting valid input claims, evidence, or verified records does not change canonical ordered output. |
| U03-P07 | Oracle | The optimized category mapper equals a simple closed-map reference implementation. |
| U03-P08 | Easy verification | Every evidence/provenance reference in output resolves to an admitted input identifier. |
| U03-P09 | Invariant | Duplicate IDs or duplicate visible primary statements produce blocking findings rather than duplicate output. |
| U03-P10 | Invariant | Input objects and arrays remain byte/structurally unchanged after reconciliation and mapping. |

Domain-specific generators cover reviewed/resume-only/document-only claims, all categories, supported and conflicting fact maps, evidence links, duplicate IDs, Unicode, empty/boundary collections, and input permutations. Shrinking stays enabled; a fixed or logged seed makes every run reproducible. Example tests separately pin the five user stories and critical privacy/download scenarios.

