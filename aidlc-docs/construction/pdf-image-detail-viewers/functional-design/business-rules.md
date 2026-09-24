# Business Rules - U-05 PDF and Image Detail Viewers

## Publication and Source Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-01 | Only catalog-eligible PDFs, the approved resume, and reviewed images may receive viewer capabilities. |
| U05-BR-02 | Every preview, embed, download, new-tab, and original action must use a source admitted by the central media-source policy. |
| U05-BR-03 | Local bundled URLs and explicitly approved HTTPS URLs are allowed. `javascript:`, `file:`, document-bearing `data:`, malformed, unowned, and unapproved URLs are rejected. |
| U05-BR-04 | Titles, descriptions, and activity/project context come from reviewed public metadata. Raw filenames, source folders, local paths, source/resume distinctions, and technical provenance are not visitor copy. |
| U05-BR-05 | React text and attributes are the only rendering path for metadata. Unsafe HTML injection is prohibited. |

## Preview and Loading Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-06 | Every published canonical PDF plus the resume has a first-page preview capability or an honest fallback state. |
| U05-BR-07 | Card rendering may request a dimensioned first-page derivative or lazy thumbnail but must not request a full PDF or original image. |
| U05-BR-08 | Full PDFs and full-resolution images load only after explicit detail, download, or new-tab interaction. |
| U05-BR-09 | A preview failure retains reviewed metadata and safe actions; it does not remove the card or silently substitute another file. |
| U05-BR-10 | Browser-native PDF embedding is attempted inside the detail viewer. Unsupported or failed embedding keeps the viewer operable with Download and Open in new tab. |

## Margin, Alignment, Sizing, and Crop Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-11 | Viewer and preview components use the existing spacing tokens and shared geometry policy; independent arbitrary margins and fixed viewport-breaking dimensions are prohibited. |
| U05-BR-12 | Wide layouts align repeated cards and actions to common grid tracks. Narrow layouts collapse to one logical reading order. |
| U05-BR-13 | Interactive controls have a minimum target size of 44 by 44 CSS pixels and remain visible at 200-percent zoom and increased text spacing. |
| U05-BR-14 | Image card previews use a consistent `4 / 3` frame with `object-fit: cover`. Center cropping is permitted only in the thumbnail surface. |
| U05-BR-15 | PDF first-page previews use a consistent `3 / 4` frame with `object-fit: contain`; document content is never cropped. |
| U05-BR-16 | Full image detail uses `object-fit: contain`, preserves the complete image, declares intrinsic dimensions or aspect ratio, and never stretches the media. |
| U05-BR-17 | Dialog width, height, padding, and gutters are clamped to available viewport space and safe-area insets. No component may create document-level horizontal overflow. |
| U05-BR-18 | Long titles, email-like text, filenames used only in download attributes, and action labels wrap or truncate accessibly within their own region; they do not widen the layout. |

## Dialog and Focus Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-19 | Exactly one shared media dialog host is mounted for the portfolio experience. Section components request state changes through typed callbacks. |
| U05-BR-20 | Every open dialog has an accessible name and description and exposes a visible Close control. |
| U05-BR-21 | Opening makes background content inoperable and prevents background scrolling without hiding the dialog from assistive technology. |
| U05-BR-22 | Initial focus enters the dialog, Tab and Shift+Tab remain contained, and Close, Escape, or an unambiguous backdrop action dismisses it. |
| U05-BR-23 | Closing removes every inert/scroll-lock side effect and restores focus to the exact connected trigger; a safe landmark is used only when that trigger no longer exists. |
| U05-BR-24 | Opening and closing media does not change canonical section hashes or create browser-history entries. |
| U05-BR-25 | Reduced-motion preference disables non-essential dialog and media transitions. |

## PDF Detail Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-26 | A PDF detail view presents title, description, browser-native full-height viewer or safe fallback, Download, Open in new tab, and Close. |
| U05-BR-27 | Download uses an approved stable filename where one exists; new-tab actions include safe relationship attributes. |
| U05-BR-28 | Desktop PDF detail uses a bounded centered dialog. Narrow detail uses a safe-area-aware near-full-viewport sheet with stable header/actions and a scrollable media region. |

## Image Detail and Navigation Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-29 | Image detail presents the uncropped selected image, title, caption, activity/project context, position, original-file access, bounded Previous/Next, and Close. |
| U05-BR-30 | Navigation stays within the validated current gallery/activity group and follows deterministic catalog order. Narrative project galleries are independent groups. |
| U05-BR-31 | Previous is disabled at index zero and Next is disabled at the final index. Navigation never wraps. |
| U05-BR-32 | Disabled boundary controls remain understandable, and current position is announced as human-readable status such as `Image 2 of 5`. |
| U05-BR-33 | Empty groups cannot open. A single-item group opens with both navigation directions disabled. |

## Failure and Misuse Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-34 | Malformed capabilities, unsafe schemes, missing assets, unsupported formats, oversized media, repeated open/close events, rapid navigation, and trigger removal are explicit misuse or failure scenarios. |
| U05-BR-35 | Expected failures return discriminated results and generic visitor-safe messages; no stack, framework detail, repository path, filesystem path, or private source text is rendered. |
| U05-BR-36 | Failure state remains named, focus-contained, dismissible, and limited to already validated actions. It never fails open to an unvalidated URL. |
| U05-BR-37 | Effect cleanup runs on every close, replacement-open, failure, and unmount path. |

## Verification Rules

| Rule | Requirement |
| --- | --- |
| U05-BR-38 | Mouse, keyboard, touch-sized controls, screen-reader names/descriptions, Escape, backdrop, focus containment, and trigger restoration receive concrete example tests. |
| U05-BR-39 | Layout is reviewed at 320, 768, 1280, and 1440 CSS pixels in both themes, plus 200-percent zoom and increased text spacing. |
| U05-BR-40 | Tests verify thumbnail crop versus full-detail containment, declared dimensions, stable card alignment, safe-area geometry, and zero document overflow. |
| U05-BR-41 | PBT verifies reducer bounds, deterministic order, state sequences, close behavior, failure downgrade, item preservation, and layout-policy ranges with domain generators, shrinking, and reproducible seeds. |
| U05-BR-42 | Initial and interaction request evidence proves that viewer code and full media stay deferred until approved actions. Any budget increase requires separate approval. |

## Security Baseline Applicability

| Rule | Status | U-05 rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | No persistence or data store is introduced. |
| SECURITY-02 | N/A | No load balancer, gateway, or CDN is introduced. |
| SECURITY-03 | N/A | No deployed service or centralized logging surface is introduced. |
| SECURITY-04 | N/A | Response-header verification remains owned by U-06. |
| SECURITY-05 | N/A | No API endpoint or server input surface is introduced. |
| SECURITY-06 | N/A | No IAM role or permission policy is introduced. |
| SECURITY-07 | N/A | No network or firewall configuration is introduced. |
| SECURITY-08 | N/A | The public static viewer has no authenticated endpoint or protected resource authorization. |
| SECURITY-09 | Compliant | Generic visitor failures prohibit internal paths, stacks, framework details, and default content. |
| SECURITY-10 | N/A | Supply-chain scanning and SBOM remain owned by U-06; U-05 authorizes no dependency addition. |
| SECURITY-11 | Compliant | Unsafe sources, malformed/oversized media, rapid interaction, repeated events, and trigger removal are explicit misuse cases. |
| SECURITY-12 | N/A | No authentication, credentials, or session management is introduced. |
| SECURITY-13 | Compliant | Only bundled or explicitly integrity-approved media can enter a viewer; unsafe deserialization and external scripts are prohibited. |
| SECURITY-14 | N/A | No authentication/authorization events or operational monitoring surface is introduced. |
| SECURITY-15 | Compliant | Admission fails closed, failure states remain operable, and cleanup is mandatory on failure, close, replacement, and unmount. |

No applicable blocking Security Baseline finding remains in this design.

## Requirement Traceability

| Requirement | Design rules |
| --- | --- |
| FR-026 and FR-027 | U05-BR-06 through U05-BR-10 |
| FR-028 through FR-031 | U05-BR-19 through U05-BR-28 and U05-BR-34 through U05-BR-37 |
| FR-032 through FR-035 | U05-BR-14, U05-BR-16, and U05-BR-29 through U05-BR-36 |
| NFR-001 through NFR-003 | U05-BR-13 and U05-BR-19 through U05-BR-25 |
| NFR-005 through NFR-007 | U05-BR-11 through U05-BR-18 and U05-BR-39 through U05-BR-40 |
| NFR-008 through NFR-012 | U05-BR-06 through U05-BR-10, U05-BR-16, and U05-BR-42 |
| NFR-018 through NFR-020 | U05-BR-19 and U05-BR-38 through U05-BR-42 |
| PBT-R07 | U05-BR-30 through U05-BR-33 and U05-BR-41 |
| SEC-R02, SEC-R06, SEC-R07, and SEC-R08 | U05-BR-01 through U05-BR-05 and U05-BR-34 through U05-BR-37 |
