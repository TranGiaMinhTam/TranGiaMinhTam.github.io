# Story and Requirement Map: Header, Content, Evidence, and Resume Refinement

## Mapping Rules

- Every one of the 21 approved stories has exactly one primary unit.
- Every functional, non-functional, PBT, and security requirement has one primary unit and may have downstream verification obligations.
- A downstream verification obligation is not duplicate ownership.
- No requirement or story is deferred solely to final Build and Test.
- U-06 verifies integrated evidence but does not erase earlier unit accountability.

## Primary Story Map

| Story | Outcome | Primary unit | Ownership rationale |
| --- | --- | --- | --- |
| US-001 | Recognize Minh Tam from a distinctive masthead | U-02 | Owns masthead hierarchy and scientific treatment. |
| US-002 | Change theme from the top of the page | U-02 | Owns relocated control and shell theme integration. |
| US-003 | Download the supplied resume without exposing extra contact data | U-03 | Owns public resume actions and content privacy behavior. |
| US-004 | Understand identity, languages, skills, and interests | U-03 | Owns resume-led identity and skills mapping. |
| US-005 | Review education, grades, scholarships, and recognition | U-03 | Owns academic resume reconciliation. |
| US-006 | Review research, analytics, honors, and contribution boundaries | U-03 | Owns research/data claim mapping and authority labels. |
| US-007 | Review leadership, volunteering, mentoring, debate, and sports | U-03 | Owns activity and impact content mapping. |
| US-008 | Receive relationship meaning without visible duplicate tables | U-02 | Owns removal and hidden semantic-summary behavior. |
| US-009 | Read consistently aligned sections at every supported width | U-02 | Owns responsive alignment system and defect corrections. |
| US-010 | Inventory every physical Minh Tam file | U-01 | Owns physical source enumeration and hashing. |
| US-011 | Consolidate duplicates without losing provenance | U-01 | Owns canonicalization and provenance membership. |
| US-012 | Preserve unsupported HEIC and DOCX evidence | U-01 | Owns derivative and honest-fallback pipeline. |
| US-013 | Browse every canonical archive item by meaningful group | U-04 | Owns group summaries, loaders, and archive exploration. |
| US-014 | Preview every canonical PDF inline | U-05 | Owns PDF preview capabilities and fallbacks. |
| US-015 | Review a PDF in an accessible popup | U-05 | Owns PDF viewer and shared dialog accessibility. |
| US-016 | Explore image groups in an accessible detail viewer | U-05 | Owns image viewer and grouped navigation. |
| US-017 | Load the large archive only when needed | U-04 | Owns archive lazy boundaries and request evidence. |
| US-018 | Preserve navigation, contact, Journal, and recovery behavior | U-06 | Owns final integrated regression and recovery proof. |
| US-019 | Fail safely for malformed, unsafe, or unavailable media | U-05 | Owns runtime viewer failure behavior using U-01 policy. |
| US-020 | Verify supply chain, security headers, and production integrity | U-06 | Owns delivery and release-security evidence. |
| US-021 | Verify transformation properties reproducibly | U-01 | Owns PBT framework/generators and core reproducibility contract. |

## Primary Story Ownership Summary

| Unit | Count | Stories |
| --- | ---: | --- |
| U-01 Source Governance and Safe Foundation | 4 | US-010, US-011, US-012, US-021 |
| U-02 Masthead, Theme, and Responsive Alignment | 4 | US-001, US-002, US-008, US-009 |
| U-03 Resume-Led Content Integration | 5 | US-003, US-004, US-005, US-006, US-007 |
| U-04 Complete Archive Discovery | 2 | US-013, US-017 |
| U-05 PDF and Image Detail Viewers | 4 | US-014, US-015, US-016, US-019 |
| U-06 Security, Delivery, and Integrated Acceptance | 2 | US-018, US-020 |
| **Total** | **21** | **US-001 through US-021 exactly once** |

## Functional Requirement Ownership

| Unit | Primary functional requirements | Primary responsibility |
| --- | --- | --- |
| U-01 | FR-006, FR-018, FR-019, FR-022, FR-023, FR-024, FR-025 | Resume asset boundary, inventory, canonicalization, derivatives, fallbacks, and normalized metadata contract. |
| U-02 | FR-001, FR-002, FR-003, FR-007, FR-008, FR-009, FR-010, FR-011, FR-012 | Masthead, theme placement, hidden summaries, six defects, and full responsive alignment. |
| U-03 | FR-004, FR-005, FR-013, FR-014, FR-015, FR-016, FR-017 | Resume actions, complete content mapping, factual integrity, privacy, and reconciliation. |
| U-04 | FR-020, FR-021, FR-032 | Complete grouped publication, on-demand discovery, and lazy image cards. |
| U-05 | FR-026, FR-027, FR-028, FR-029, FR-030, FR-031, FR-033, FR-034, FR-035 | PDF previews, shared accessible dialog, PDF/image detail, navigation, and safe media failures. |
| U-06 | FR-036, FR-037, FR-038 | Existing behavior, static/no-backend boundary, and recoverability. |

### Functional Coverage Check

- FR-001 through FR-038 are assigned exactly once as primary requirements.
- U-06 reruns integrated acceptance for every FR but does not become their duplicate primary owner.

## Non-Functional Requirement Ownership

| Unit | Primary non-functional requirements | Primary responsibility |
| --- | --- | --- |
| U-01 | NFR-013, NFR-014, NFR-016, NFR-017, NFR-018, NFR-020 | Privacy, local-only source handling, safe provenance, focused model/module boundaries, pure immutable transformations, and PBT foundation. |
| U-02 | NFR-001, NFR-003, NFR-004, NFR-005, NFR-006, NFR-007, NFR-019 | Global accessibility/layout foundation, hidden meaning, viewport matrix, grid/reflow, overflow, and visual regressions. |
| U-03 | NFR-015 | No inferred claims or unsupported outcomes. |
| U-04 | NFR-008, NFR-009, NFR-010, NFR-011, NFR-012 | Lazy loading, initial request boundary, budgets, splitting, and media dimensions. |
| U-05 | NFR-002 | Dialog accessibility, including naming, background inertness, and focus restoration. |
| U-06 | Integrated verification of NFR-001 through NFR-020 | Final evidence and release blocking, not duplicate primary ownership. |

### Non-Functional Coverage Check

- NFR-001 through NFR-020 each have one primary owner.
- Accessibility, responsive, privacy, performance, and maintainability obligations are inherited by every unit whose output exhibits that behavior.

## Property-Based Testing Requirement Ownership

| Requirement | Primary unit | Downstream verification |
| --- | --- | --- |
| PBT-R01 | U-01 | U-06 verifies approved `fast-check`/Vitest dependency and CI integration. |
| PBT-R02 | U-01 | U-03 through U-05 extend central domain generators without duplication. |
| PBT-R03 | U-01 | U-06 reruns canonicalization idempotence and provenance preservation. |
| PBT-R04 | U-01 | U-04 verifies public entries still preserve catalog membership. |
| PBT-R05 | U-04 | U-06 reruns deterministic grouping/order properties. |
| PBT-R06 | U-01 | U-06 reruns manifest round trips if serialization is implemented. |
| PBT-R07 | U-05 | U-06 reruns viewer bounds/state properties. |
| PBT-R08 | U-03 | U-06 reruns resume mapping completeness/non-invention/privacy properties. |
| PBT-R09 | U-06 | Captures shrunk cases as permanent example regressions. |
| PBT-R10 | U-06 | Verifies PBT complements critical example scenarios and logs reproducible seeds. |

All PBT-R01 through PBT-R10 have one primary owner. PBT-01 property-category analysis occurs in every applicable unit's Functional Design.

## Security Requirement Ownership

| Requirement | Primary unit | Downstream verification |
| --- | --- | --- |
| SEC-R01 | U-06 | Infrastructure Design and deployed-candidate header verification. |
| SEC-R02 | U-05 | U-06 scans visitor failures for path, stack, and framework disclosure. |
| SEC-R03 | U-06 | Dependency audit, unused-package review, SBOM, lockfile, and CI integrity. |
| SEC-R04 | U-01 | U-05 tests unsafe schemes/dialog abuse; U-06 verifies complete misuse coverage. |
| SEC-R05 | U-01 | U-04/U-05 consume local or approved-HTTPS capabilities only; U-06 verifies build output. |
| SEC-R06 | U-05 | U-06 validates conversion/import/preview safe-failure evidence. |
| SEC-R07 | U-01 | U-04/U-05 cannot bypass central media-source admission. |
| SEC-R08 | U-05 | U-06 verifies no unsafe HTML and safe attribute rendering. |

All SEC-R01 through SEC-R08 have one primary owner. Applicable underlying SECURITY-01 through SECURITY-15 rules are reevaluated at every unit stage.

## Security Baseline Rule Routing

| Baseline rule | Units Generation status | Primary routing or N/A rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | No database, object store, cache, or private persistence is introduced. |
| SECURITY-02 | N/A at current boundary | No project-controlled intermediary exists; reevaluate in U-06 if Infrastructure Design selects an edge/CDN. |
| SECURITY-03 | N/A | No deployed server application or centralized logging service is introduced. |
| SECURITY-04 | Assigned | U-06 owns actual HTML response-header design and verification. |
| SECURITY-05 | N/A | No API endpoint is introduced. |
| SECURITY-06 | N/A | No IAM policy or role is introduced. |
| SECURITY-07 | N/A | No network/firewall boundary is introduced. |
| SECURITY-08 | N/A | The portfolio is public and has no protected endpoint. |
| SECURITY-09 | Assigned | U-01 defines safe paths/sources; U-05 owns visitor-safe runtime failures; U-06 verifies production behavior. |
| SECURITY-10 | Assigned | U-06 owns lockfile, vulnerability, unused dependency, trusted source, SBOM, and CI integrity gates. |
| SECURITY-11 | Assigned | U-01 owns policy separation and misuse inputs; U-05 owns dialog/media abuse cases; U-06 verifies coverage. |
| SECURITY-12 | N/A | No authentication, credentials, or session is introduced. |
| SECURITY-13 | Assigned | U-01 owns hashes/local integrity; U-06 verifies build and CI integrity. |
| SECURITY-14 | N/A at current boundary | No authentication/authorization event stream exists; reevaluate if U-06 introduces an applicable intermediary. |
| SECURITY-15 | Assigned | U-01 owns transformation failures, U-05 runtime safe defaults, and U-06 integrated recovery/release gating. |

No blocking Security Baseline finding remains at Units Generation.

## Cross-Cutting Verification Map

The following are inherited verification duties, not duplicate primary assignments.

| Unit | Accessibility | Privacy/integrity | Performance | Security | PBT/reliability | Recovery |
| --- | --- | --- | --- | --- | --- | --- |
| U-01 | Accessible findings/docs | No phone/absolute paths; complete provenance | Tool outputs do not enter runtime | Path/scheme allowlist and local processing | Canonicalization, manifest, generators, seeds | Baseline hashes and source preservation |
| U-02 | Landmarks, focus, hidden summaries, zoom/text spacing | Existing facts unchanged | Shell budgets and no media expansion | Resume slot accepts validated local capability | Layout examples and upstream regressions | Candidate patch and shell restoration |
| U-03 | Heading/order/action semantics | Authority, conflict, phone, non-invention | Content does not eagerly import archive | Safe local download only | Mapping properties plus examples | Content model and registry restoration |
| U-04 | Group navigation, loading/status, image alt | All canonical items and safe provenance | Lazy groups/thumbnails/originals and budgets | Media triggers use safe capabilities | Group/order properties plus examples | Catalog/UI registration restoration |
| U-05 | Dialog semantics, focus, keyboard, zoom | Safe titles/provenance and no path disclosure | Viewer/body/original interaction loading | Fail-closed URLs and safe errors | State/bounds properties plus interaction examples | Viewer registration and focus cleanup |
| U-06 | Integrated WCAG-focused checks | Full privacy/source/integrity scan | Build/request/bundle gates | Headers, supply chain, SBOM, CI, misuse | All PBT with seeds and regression capture | Exact integrated recovery proof |

## Persona Coverage

| Unit | Primary personas served | Supporting persona |
| --- | --- | --- |
| U-01 | P-05 Portfolio Maintainer | P-01 through P-04 benefit from integrity and safety. |
| U-02 | P-03 Mobile Visitor, P-04 Keyboard and Screen-Reader Visitor | P-01 and P-02 benefit from hierarchy. |
| U-03 | P-01 Admissions and Scholarship Reviewer, P-02 Research Mentor | P-03 and P-04 consume the same content. |
| U-04 | P-01, P-02, P-03 | P-04 receives semantic group navigation; P-05 maintains it. |
| U-05 | P-02, P-04 | P-01 and P-03 inspect selected media; P-05 verifies. |
| U-06 | P-05 | All visitor personas depend on preserved safe behavior. |

## Review Boundary Map

| Unit | Focused review artifact | Required approval evidence |
| --- | --- | --- |
| U-01 | Generated inventory/catalog/conversion/PBT reports | Counts, hashes, provenance, privacy, transformations, recovery |
| U-02 | Rendered masthead and ten-section alignment matrix | Both themes, four widths, zoom, text spacing, keyboard, screenshots |
| U-03 | Rendered resume-led content across ten sections | Source authority, all categories, privacy scan, both download actions |
| U-04 | Rendered archive summaries and lazy groups | Completeness/counts, navigation, thumbnail behavior, request manifest |
| U-05 | Rendered PDF/image previews and dialogs | Focus, keyboard/touch, responsive modal, safe failures, bounded navigation |
| U-06 | Integrated release candidate report | Full tests, audits, SBOM, headers, budgets, routes, recovery |

## Completeness Validation

- US-001 through US-021 appear exactly once in the primary story table.
- FR-001 through FR-038 each have one primary unit.
- NFR-001 through NFR-020 each have one primary unit, with U-06 integrated verification.
- PBT-R01 through PBT-R10 each have one primary unit and downstream verification where applicable.
- SEC-R01 through SEC-R08 each have one primary unit and downstream verification where applicable.
- All five personas and six visitor/maintainer journeys are covered.
- Each unit has a reviewable output that does not depend on unfinished later behavior.
- No story or requirement is assigned to a backend, separate runtime service, analytics system, or unauthorized deployment.

## Extension Compliance

- **Security Baseline**: Compliant. Security ownership and inherited checks are explicit, and the only Infrastructure Design obligation is assigned to U-06.
- **Property-Based Testing**: Compliant. Framework/generator, transformation, mapping, ordering, state, shrinking, seed, and complementary-example responsibilities are assigned.
- **Blocking findings**: None at Units Generation.
