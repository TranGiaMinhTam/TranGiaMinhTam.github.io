# NFR Requirements - U-05 PDF and Image Detail Viewers

## Scope and Quality Objective

U-05 provides one dependency-free, interaction-loaded review experience for approved PDFs and images in the static portfolio. The viewer must preserve the existing initial-load envelope, remain operable with keyboard, touch, screen readers, zoom, and text spacing, and fail independently without making the surrounding portfolio unusable.

The first computational project is a single-image group containing only `IMG_4208.JPG`, captioned "The research team with the molecular docking poster at the 2026 pharmacy conference." Both navigation directions are disabled for that group. The other four governed Protein Docking photographs remain in the Scientific Research archive group.

## Accessibility and Usability

| ID | Requirement | Acceptance measure |
| --- | --- | --- |
| U05-NFR-A01 | Meet WCAG 2.2 AA behavior for viewer controls and content. | Automated semantics/contrast checks plus concrete keyboard, focus, screen-reader-name, reduced-motion, zoom, and text-spacing cases pass with no blocking finding. |
| U05-NFR-A02 | Use one browser-native `<dialog>` host opened with `showModal()` and provide a tested fallback when native behavior is unavailable. | Exactly one modal host exists; every open state has an accessible name, description, and visible Close action. |
| U05-NFR-A03 | Prevent background operation while a viewer is open. | Pointer and keyboard interaction cannot reach background controls; scroll locking and inertness are removed on every close, replacement, failure, and unmount path. |
| U05-NFR-A04 | Keep focus inside the open dialog and restore it precisely. | Tab and Shift+Tab cycle within the dialog; Close, Escape, and backdrop dismissal restore the exact connected trigger or a documented safe landmark if the trigger was removed. |
| U05-NFR-A05 | Preserve touch and zoom operability. | Every interactive target is at least 44 by 44 CSS pixels; at 200-percent zoom and increased text spacing, no title, action, status, or control is clipped or overlaps. |
| U05-NFR-A06 | Communicate image position and boundaries without relying on color or icons. | A polite status announces `Image n of m`; disabled Previous/Next state is programmatic and visible. A one-item group announces `Image 1 of 1`. |

## Responsive Layout and Media Presentation

| ID | Requirement | Acceptance measure |
| --- | --- | --- |
| U05-NFR-L01 | Support 320, 768, 1280, and 1440 CSS-pixel widths in light and dark themes. | Automated Chrome matrix reports zero document-level horizontal overflow and zero clipped viewer controls at all eight width/theme combinations. |
| U05-NFR-L02 | Keep cards aligned despite mixed source dimensions. | Image thumbnails use bounded `4 / 3` frames with centered `cover`; PDF previews use bounded `3 / 4` frames with `contain`; repeated tracks share grid lines. |
| U05-NFR-L03 | Preserve full media in detail. | Detail images use declared intrinsic geometry and `contain`; PDFs use the available media region without cropping document pages. |
| U05-NFR-L04 | Bound the dialog to usable viewport space. | Desktop uses a centered clamped dialog; narrow screens use a safe-area-aware near-full-viewport sheet; only the media/content region scrolls. |
| U05-NFR-L05 | Prevent long content from changing component width. | Titles, captions, action labels, and safe filenames wrap or truncate within their regions and never increase document width. |

## Performance and Capacity

| ID | Requirement | Acceptance measure |
| --- | --- | --- |
| U05-NFR-P01 | Preserve the approved initial JavaScript and CSS ceilings. | Initial JavaScript remains at or below 327,680 raw bytes, CSS at or below 61,440 raw bytes, and the initial request count remains three unless a later approval changes these values. |
| U05-NFR-P02 | Defer viewer implementation until interaction. | PDF and image viewer bodies are Vite dynamic imports; neither body nor any full PDF/original image appears in the initial request set. |
| U05-NFR-P03 | Bound interaction code. | Each interaction-loaded viewer JavaScript chunk is at or below 65,536 raw bytes. |
| U05-NFR-P04 | Keep archive groups independently lazy. | Opening one archive activity loads only that group's module and requested thumbnails; other groups remain absent from the request set. |
| U05-NFR-P05 | Avoid layout shift from unknown media geometry. | Every preview and image capability provides dimensions or an aspect ratio before media completion. |
| U05-NFR-P06 | Bound embedded large media. | Full PDFs at or below 64 MiB and images at or below 16 MiB may be embedded after explicit activation; larger media retains reviewed metadata and validated Download/Open actions without automatic embedding. |

## Reliability and Failure Isolation

| ID | Requirement | Acceptance measure |
| --- | --- | --- |
| U05-NFR-R01 | Preserve static-host reliability without a runtime media service. | Capability resolution is deterministic and local; no viewer path requires a proxy, API, remote conversion, or application server. |
| U05-NFR-R02 | Isolate media failures. | A preview, image, PDF embed, or lazy-import failure affects only its current media body; the surrounding portfolio and other media capabilities remain usable. |
| U05-NFR-R03 | Fail closed while retaining recovery actions. | Rejected or failed media never opens an unsafe URL and retains only centrally validated Download/Open actions plus Close. |
| U05-NFR-R04 | Make repeated and rapid interaction deterministic. | Repeated open/close, replacement-open, rapid Previous/Next, and boundary commands produce valid reducer states with no stale lock, focus, or listener. |
| U05-NFR-R05 | Avoid an artificial availability promise. | No separate viewer service-level objective is defined; availability inherits the static portfolio host while client failures use the documented fallback behavior. |

## Security and Privacy

| ID | Requirement | Acceptance measure |
| --- | --- | --- |
| U05-NFR-S01 | Admit only centrally validated media sources. | Bundled URLs and explicitly approved HTTPS URLs are allowed; `javascript:`, `file:`, document-bearing `data:`, malformed, and unowned sources are rejected before state changes. |
| U05-NFR-S02 | Prevent visitor-facing information disclosure. | Failure text contains no stack, framework version, repository path, filesystem path, raw filename, source/resume distinction, or private source text. |
| U05-NFR-S03 | Keep metadata rendering injection-safe. | Titles, captions, descriptions, status, and URLs use React text/attribute rendering; no unsafe HTML injection is introduced. |
| U05-NFR-S04 | Keep embed behavior same-origin by default. | Browser-native PDF embedding uses an admitted same-origin URL. Restrictive CSP and response-header enforcement remain U-06 delivery gates. |
| U05-NFR-S05 | Preserve source integrity and privacy. | No source media is uploaded, remotely transformed, or transmitted to an external conversion/viewer service. |

## Maintainability and Verification

| ID | Requirement | Acceptance measure |
| --- | --- | --- |
| U05-NFR-M01 | Keep viewer concerns in focused modules. | Reducer, source admission, dialog effects, PDF body, image body, preview adapters, and tests have explicit ownership under `src/portfolio/media-viewer/` or their existing typed integration seam. |
| U05-NFR-M02 | Reuse the current platform. | React, TypeScript, Vite, CSS modules/tokens, Vitest, Testing Library, fast-check, boundary/integrity scripts, and headless Chrome are used; no modal or PDF-rendering dependency is added. |
| U05-NFR-M03 | Combine concrete regression tests with PBT. | Critical mouse, keyboard, focus, failure, one-image, multi-image, PDF fallback, and layout cases have example tests; navigation/reducer properties have separate PBT files. |
| U05-NFR-M04 | Make PBT failures reproducible. | fast-check shrinking remains enabled; seeds and shrunk counterexamples are printed on failure and replayable in CI/local instructions. |
| U05-NFR-M05 | Preserve deterministic data boundaries. | Viewer groups use immutable catalog order; reducers and navigation helpers are pure and do not mutate, drop, duplicate, or reorder items. |

## Browser and Review Matrix

- Compatibility target: current evergreen Chrome, Firefox, desktop Safari, and iOS Safari.
- Required automated browser: Google Chrome headless.
- Required automated widths: 320, 768, 1280, and 1440 CSS pixels.
- Required themes: light and dark.
- Required additional modes: 200-percent zoom, increased text spacing, reduced motion, keyboard-only operation, and a forced-colors representative case where supported.
- Browsers unavailable in the execution environment must be recorded as `unavailable-not-run`; they cannot be reported as passing.

## Security Baseline Compliance

| Rule | Status | Rationale |
| --- | --- | --- |
| SECURITY-01 | N/A | U-05 adds no persistence store or data movement service. |
| SECURITY-02 | N/A | U-05 adds no load balancer, gateway, or CDN. |
| SECURITY-03 | N/A | U-05 adds no deployed service or centralized logging surface. |
| SECURITY-04 | N/A in U-05 | CSP and HTTP response headers are an explicit U-06 delivery gate. U-05 defines the same-origin embed requirement consumed by that stage. |
| SECURITY-05 | N/A | No API or server input surface is introduced. |
| SECURITY-06 | N/A | No IAM policy or role is introduced. |
| SECURITY-07 | N/A | No network or firewall configuration is introduced. |
| SECURITY-08 | N/A | The static public viewer has no protected resource or authenticated endpoint. |
| SECURITY-09 | Compliant | Generic failures prohibit internal details; viewer code adds no default/sample surface. |
| SECURITY-10 | N/A in U-05 | No dependency is added; vulnerability scanning and SBOM remain U-06 delivery gates. |
| SECURITY-11 | Compliant | Malformed/oversized media, rapid interaction, repeated events, trigger removal, and load failures are explicit misuse cases. |
| SECURITY-12 | N/A | No authentication, credentials, or sessions are introduced. |
| SECURITY-13 | Compliant | Admitted bundled/approved media and immutable catalogs provide the applicable integrity boundary; no external script or unsafe deserialization is introduced. |
| SECURITY-14 | N/A | No security-event or centralized monitoring surface exists in this static viewer unit. |
| SECURITY-15 | Compliant | Admission fails closed, failures retain safe actions, and cleanup is required for every exceptional exit path. |

No applicable blocking Security Baseline finding remains.

## Property-Based Testing Compliance

| Rule | Status | Rationale |
| --- | --- | --- |
| PBT-01 | Compliant | Functional Design identifies navigation bounds, deterministic oracle comparison, item preservation, stateful dialog sequences, Close behavior, failure downgrade, and layout ranges. |
| PBT-02 | N/A | The unit defines no serialization, encoding, parsing, or inverse pair. |
| PBT-03 | Applicable for Code Generation | Bounds, item preservation, safe failure, and layout ranges require generated invariant tests. |
| PBT-04 | N/A | No operation is specified as idempotent. |
| PBT-05 | Applicable for Code Generation | A simple clamped-index/reference-state model is the oracle for navigation and reducer behavior. |
| PBT-06 | Applicable for Code Generation | The dialog reducer is a state machine and requires generated command sequences checked after every event. |
| PBT-07 | Applicable for Code Generation | Reusable constrained media-group, capability, index, viewport, and event-sequence generators are required. |
| PBT-08 | Applicable for Code Generation and Build/Test | Shrinking and replayable seeds are mandatory. |
| PBT-09 | Compliant | fast-check 4.10.2 is installed, locked, documented, and integrated with Vitest. |
| PBT-10 | Applicable for Code Generation | PBT complements, and does not replace, concrete accessibility and regression cases. |

No applicable blocking PBT finding remains at the NFR Requirements stage.

## Traceability

| Source requirement | U-05 NFR requirements |
| --- | --- |
| NFR-001 through NFR-003 | U05-NFR-A01 through U05-NFR-A06 |
| NFR-005 through NFR-007 | U05-NFR-L01 through U05-NFR-L05 |
| NFR-008 through NFR-012 | U05-NFR-P01 through U05-NFR-P06 |
| NFR-018 through NFR-020 | U05-NFR-M01 through U05-NFR-M05 |
| PBT-R07 | U05-NFR-A06, U05-NFR-R04, and the PBT compliance requirements |
| SEC-R02, SEC-R06, SEC-R07, SEC-R08 | U05-NFR-R02 through U05-NFR-R04 and U05-NFR-S01 through U05-NFR-S05 |

