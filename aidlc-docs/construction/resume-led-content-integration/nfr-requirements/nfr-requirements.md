# U-03 NFR Requirements - Resume-Led Content Integration

## Scope and Measurement Baseline

These requirements govern the static resume-led content and dual download capability defined by U-03 Functional Design. They inherit the U-01 source/privacy boundary and U-02 responsive shell. They do not define archive loading, media dialogs, backend services, infrastructure, or deployment.

Baseline after U-02: 297,057 initial JavaScript bytes, 50,665 initial CSS bytes, and three initial requests. U-03 Code Generation Question 1 approved the newly supplied resume as authority; the canonical copy is 113,775 bytes with SHA-256 `8de5fc42ca8c443a7dcad6daa2766d7cd5f3a596369a463e54a74b101ec49282`. The prior protected copy remains recoverable from the U-03 preflight package.

## Scalability and Processing

| ID | Priority | Requirement | Verification |
| --- | --- | --- | --- |
| U03-NFR-01 | Must | Reconciliation and mapping shall support at least 250 reviewed claims and 500 evidence/provenance references without architecture change or duplicate visible output. | Generated-capacity examples and property tests. |
| U03-NFR-02 | Must | Core transformations shall be deterministic and linear or near-linear in admitted claims plus references. | Complexity review and capacity measurement; no nested full-set scan in the primary path. |
| U03-NFR-03 | Must | Input order shall not affect canonical ordered output. | U03-P06 with shuffled claim, record, and evidence inputs. |

Inputs above the approved capacity require measurement and review; they do not justify an implicit backend.

## Performance and Loading

| ID | Priority | Requirement | Verification |
| --- | --- | --- | --- |
| U03-NFR-04 | Must | Initial JavaScript shall be at most 320 KiB and no more than 8 percent above 297,057 bytes. Both constraints apply. | Exact production manifest comparison. |
| U03-NFR-05 | Must | Initial CSS shall be at most 60 KiB and no more than 12 percent above 50,665 bytes. Both constraints apply. | Exact production manifest comparison. |
| U03-NFR-06 | Must | Initial requests shall remain three; the resume PDF shall not be requested until a visitor activates a resume action. | Browser request manifest before and after activation. |
| U03-NFR-07 | Must | Both downloads shall use native anchors with no JavaScript loading state or reconstruction step. | DOM contract and interaction review. |
| U03-NFR-08 | Must | U-03 shall introduce no avoidable layout shift from late content/action insertion or unsized media. | Rendered CLS evidence against the inherited 0.1 ceiling. |

## Content Integrity and Reliability

| ID | Priority | Requirement | Verification |
| --- | --- | --- | --- |
| U03-NFR-09 | Must | Category coverage and eligible-claim primary mapping shall each be 100 percent. | Coverage report over approved input and output IDs. |
| U03-NFR-10 | Must | Invented facts, silently resolved conflicts, unsupported authority labels, and duplicate visible primary statements shall each be zero. | Selector findings, reference-oracle PBT, and rendered scan. |
| U03-NFR-11 | Must | Both actions shall share identical href, filename `Tran-Gia-Minh-Tam-Resume.pdf`, and label semantics, backed by the approved PDF size/hash. | Capability identity and cryptographic integrity checks. |
| U03-NFR-12 | Must | Any blocking finding shall retain the last verified active composition; no partial U-03 candidate may activate. | Negative examples and candidate boundary test. |
| U03-NFR-13 | Must | Target-specific recovery shall be captured and restoration rehearsed before mutation; U-03 changes shall be restorable within 30 minutes. | Isolated recovery rehearsal and verifier report. |

## Privacy and Security

| ID | Priority | Requirement | Verification |
| --- | --- | --- | --- |
| U03-NFR-14 | Must | Phone/document-only values shall produce zero matches in public source, build output, DOM, metadata, fixtures, snapshots, logs, and generated evidence; only the approved PDF bytes are exempt. | Approved non-echoing local marker scan with safe counts/codes only. |
| U03-NFR-15 | Must | Runtime inputs shall be typed reviewed records and a validated local PDF capability; raw extraction, unsafe HTML, raw paths, and unapproved URLs are prohibited. | Static boundary scan, unit tests, and candidate DOM inspection. |
| U03-NFR-16 | Must | Diagnostics shall use stable generic codes and safe target IDs without private values, source values, stack traces, or absolute paths. | Adversarial examples and artifact scan. |
| U03-NFR-17 | Must | U-03 shall add no remote request, analytics, telemetry, authentication, runtime PDF parser, or new origin. | Source/dependency/request-manifest comparison. |

Security Baseline status: SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are applicable and blocking. SECURITY-04 remains U-06-owned. SECURITY-01 through 03, 05 through 08, 12, and 14 are N/A because U-03 adds no persistence, server/API, IAM/network/authentication, or security-event stream.

## Accessibility, Usability, and Compatibility

| ID | Priority | Requirement | Verification |
| --- | --- | --- | --- |
| U03-NFR-18 | Must | Content and actions shall meet WCAG 2.2 AA-oriented semantic, keyboard, focus, contrast, naming, reading-order, reduced-motion, and forced-colors checks. Automated scanning alone is insufficient. | Component tests, automated checks where supported, and manual/rendered review. |
| U03-NFR-19 | Must | All ten sections and both actions shall pass at 320, 768, 1280, and 1440 CSS pixels in both themes, including representative 200-percent zoom and increased text spacing, without overlap, clipping, or document-level overflow. | Canonical rendered matrix and screenshots. |
| U03-NFR-20 | Must | `Evidence-backed` and `Resume-sourced` meaning shall be available without relying on color alone. | Semantic and visual inspection. |
| U03-NFR-21 | Must | Current stable Chromium, Firefox, and Safari plus representative iOS Safari shall be supported. Unavailable local engines shall be recorded as manual-pending rather than claimed. | Capability report and engine-specific/manual evidence. |
| U03-NFR-22 | Must | Semantic content and native downloads shall remain usable when optional styling/enhancements are unavailable. | Progressive-enhancement and forced-colors review. |

## Maintainability and Testability

| ID | Priority | Requirement | Verification |
| --- | --- | --- | --- |
| U03-NFR-23 | Must | Claim, reconciliation, mapping, and typed findings shall have one source of truth in the resume boundary; domain folders own rendering only. | Import/boundary scan and component review. |
| U03-NFR-24 | Must | The same immutable download capability shall serve both action locations; resume facts and private-field logic shall not be duplicated across domains. | Identity/reference assertions and source scan. |
| U03-NFR-25 | Must | Strict TypeScript, ESLint, Vitest, Testing Library, boundary/style checks, and fast-check shall remain the verification stack with no silently added dependency. | Lockfile/package diff and complete commands. |
| U03-NFR-26 | Must | U03-P01 through U03-P10 shall each run at least 100 cases with shrinking enabled, fixed or logged seed/replay data, no silent retry, and complementary critical examples. | PBT execution report and example-test inventory. |
| U03-NFR-27 | Must | Activation evidence shall include source/resume hashes, mapping/category counts, conflict/privacy reports, focused/full tests, seed/results, exact bundles/requests, rendered matrix/screenshots, accessibility/browser status, boundary scans, recovery verification, and `git diff --check`. | Schema-validated candidate review report. |

## Availability and Operational Scope

Availability means a deterministic static build, readable semantic content, native browser download behavior, fail-closed candidate activation, and recoverability. Backend uptime, server failover, disaster recovery, centralized monitoring, and response-header delivery are N/A in U-03 and remain assigned to U-06 where applicable.

## Traceability Summary

- US-003 and FR-004/005/015/016: U03-NFR-06/07/11/14/18/21/22.
- US-004 through US-007 and FR-013/014/017: U03-NFR-01 through 03, 09/10, 18 through 20, and 23/24.
- NFR-015: U03-NFR-09/10/15/16.
- PBT-R08: U03-NFR-01 through 03, 09/10, and 26.
- U03-BR01 through U03-BR26 and U03-P01 through U03-P10 are measurable through the requirements above.

No blocking NFR, Security Baseline, or PBT finding remains at this stage.
