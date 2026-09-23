# U-07 Contact and Journal Business Rules

## Contact Rules

| Rule | Requirement |
| --- | --- |
| U07-CON-001 | Exactly one verified contact record must resolve to the Contact section. |
| U07-CON-002 | The recipient must be the verified email in the approved profile-backed record. |
| U07-CON-003 | Name is required after trimming and is limited to 100 Unicode code points. |
| U07-CON-004 | Visitor email is required, limited to 254 characters, and must pass the conservative email-shape check. |
| U07-CON-005 | Message is required after trimming and is limited to 5,000 Unicode code points. |
| U07-CON-006 | All invalid fields are reported in stable field order; focus moves to the first invalid control. |
| U07-CON-007 | A valid mailto draft uses subject `Portfolio opportunity enquiry` and the approved labeled body format. |
| U07-CON-008 | Mailto subject and body values are standards-encoded; raw string concatenation is prohibited. |
| U07-CON-009 | Submission opens the visitor's email client but never claims that delivery occurred. |
| U07-CON-010 | The draft is not cleared solely because a mailto handoff was attempted. |
| U07-CON-011 | A direct email action remains visible independently of JavaScript form submission. |
| U07-CON-012 | Contact values are never persisted, transmitted by the site, logged, analyzed, or placed in hidden requests. |

## Research Note Rules

| Rule | Requirement |
| --- | --- |
| U07-NOT-001 | The only initially approved local note slug is `sim-lse-data-analytics`. |
| U07-NOT-002 | The canonical title is `SIM-LSE Data Analytics: A Verified Project Note`. |
| U07-NOT-003 | Note content derives only from the verified SIM-LSE project, analytical allocation, and approved evidence relationships. |
| U07-NOT-004 | Note order is Question, Context, Contribution, Methods, Tools, Timeline, Evidence. |
| U07-NOT-005 | Former-owner prose and claims from legacy journal or blog sources are forbidden. |
| U07-NOT-006 | No result, finding, outcome, participant count, professional role, authorship claim, or reflection may be inferred. |
| U07-NOT-007 | `Team-led project` is the only allowed contribution disclosure for this note. |
| U07-NOT-008 | Missing optional evidence does not remove verified text. Missing required source facts blocks the note. |
| U07-NOT-009 | Full evidence remains user initiated and no large document loads with the note route. |
| U07-NOT-010 | Data Stories discovery and Journal resolution consume one canonical shared route descriptor. |

## Routing Rules

| Rule | Requirement |
| --- | --- |
| U07-ROU-001 | Only the existing `#/journal/{lowercase-kebab-slug}` namespace is accepted. |
| U07-ROU-002 | Non-journal hashes preserve the continuous portfolio route. |
| U07-ROU-003 | A known slug resolves to the lazy article presentation. |
| U07-ROU-004 | A syntactically valid unknown slug resolves to an accessible not-found presentation. |
| U07-ROU-005 | Malformed journal hashes use the existing shell invalid-hash recovery and do not reach the note selector. |
| U07-ROU-006 | Article and not-found headings receive focus after route-view entry. |
| U07-ROU-007 | Every journal state exposes a direct return to `#data-stories`. |
| U07-ROU-008 | No server route, second router, history loop, or runtime content discovery is introduced. |

## Presentation and Accessibility Rules

| Rule | Requirement |
| --- | --- |
| U07-UX-001 | Contact uses a correspondence-protocol composition, not the rejected contact card. |
| U07-UX-002 | Every control has a persistent programmatic label, associated description where useful, and visible focus. |
| U07-UX-003 | Error meaning is conveyed by text and programmatic relationships, never color alone. |
| U07-UX-004 | The privacy boundary is visible beside the composer before submission. |
| U07-UX-005 | The research note uses a field-note sheet with a restrained reading measure and semantic article headings. |
| U07-UX-006 | Contact source information precedes the composer in DOM order and stacks before it at narrow widths. |
| U07-UX-007 | Contact, article, and fallback remain usable at 320 CSS pixels, 200-percent zoom, and increased text spacing without document-level horizontal scrolling. |
| U07-UX-008 | Both theme token sets preserve content, validation, actions, and focus meaning. |
| U07-UX-009 | Reduced-motion preference disables nonessential transition or scroll animation. |

## Cleanup and Boundary Rules

| Rule | Requirement |
| --- | --- |
| U07-BND-001 | U-07 owns Contact and Journal presentation; it does not import rejected template presentations. |
| U07-BND-002 | A neutral typed note descriptor may be consumed by Data Stories and Journal without cross-importing presentation components. |
| U07-BND-003 | No hosted form, API, database, analytics, CMS, runtime Markdown discovery, or new dependency is permitted. |
| U07-BND-004 | Cleanup requires an exact path inventory, import proof, content hashes, recovery payload, and explicit Code Generation plan approval. |
| U07-BND-005 | Broad globs, pattern-based deletion, and deletion of ambiguous files are prohibited. |
| U07-BND-006 | Active U-01 through U-06 registries, content, evidence, shell controllers, and dependencies remain unchanged except for approved U-07 seams. |

## Finding Severity

- **Blocking**: invalid recipient, missing required contact source, invalid canonical note descriptor, missing required note source, route-catalog mismatch, legacy-claim reachability, unsafe mailto construction, network/persistence surface, duplicate registration, or dependency drift.
- **Localized**: optional evidence unavailable, email-client handoff unavailable, or one field validation failure. These conditions preserve all unrelated verified content and actions.
