# Code Generation Summary - U-05 PDF and Image Detail Viewers

## Outcome

U-05 is implemented and active through one shared `MediaViewerProvider`. Portfolio PDFs open in an accessible native dialog with direct Open and Download fallbacks. Images open uncropped in the same host with deterministic, bounded group navigation. Existing cards retain stable cropped previews and direct-link behavior when the provider is absent.

The first computational project displays only the requested `IMG_4208.JPG` photograph of the research team with the molecular docking poster at the 2026 pharmacy conference. Its viewer reports `Image 1 of 1` with both navigation controls disabled. The other four docking photographs remain in the Scientific Research archive, where grouped navigation is available.

## Created Application Modules

- `src/portfolio/media-viewer/`: immutable viewer capabilities, source and size admission, reducer, controller/provider, one native dialog host, lazy PDF/image/failure bodies, shared actions, token-based responsive styling, example tests, property tests, and style regressions.
- `scripts/portfolio/pdf-image-detail-viewers-candidate/`: isolated full-portfolio candidate entry and Vite build.
- `scripts/portfolio/pdf-image-detail-viewers-review/`: recovery, boundary, integrity/request, privacy, performance, and responsive Chrome review tooling.
- `artifacts/portfolio/u05-media-viewers/`: schema-versioned recovery, boundary, privacy, integrity, request, measurement, browser reports, and screenshots.

## Modified Integration Seams

- Archive cards and groups now open document and deterministic image-group detail views while preserving lazy group loading and direct fallbacks.
- Academic document/image actions, research evidence/actions/figures, shared PDF actions, and resume actions now request the shared host when available.
- Identity retains the resume download and adds an explicit resume preview action.
- Image cards use stable `4 / 3` crops; document cards use contained `3 / 4` previews; full detail images use `object-fit: contain`.
- `src/App.tsx` mounts exactly one approved provider around the existing `PortfolioApp`; registries and content composition remain unchanged.
- The legacy active boundary now permits exactly `MediaViewerProvider` while continuing to reject other providers, retired styles, templates, and layout APIs.

## Behavior and Accessibility

- Accessible dialog name and description, initial Close focus, contained Tab order, inert background, document scroll lock, Escape/backdrop/Close dismissal, and connected-trigger focus restoration.
- Safe cleanup after rapid replacement, unmount, and removed triggers.
- PDF native embedding with 64 MiB admission limit and operable fallback actions.
- Image embedding with 16 MiB admission limit, uncropped containment, `Image n of m` announcements, and clamped Previous/Next navigation.
- Visitor-safe failures disclose no stack, local path, provenance distinction, or internal exception text.
- Narrow safe-area sheet geometry, 44-pixel controls, reduced-motion handling, long-text containment, visible focus, and no document-level overflow.

## Verification

- Complete regression: 291 tests across 79 files pass.
- Property verification: fixed seed `20260924`, 120 runs per property, shrinking enabled.
- Strict TypeScript and ESLint pass.
- General and U-05 active boundaries, dependency/recovery verification, privacy, Protein Docking allocation, Vite request/lazy-chunk integrity, and production build pass with zero findings.
- Active initial output: 326,548 bytes JavaScript, 63,517 bytes CSS, and three initial requests.
- Lazy viewer output: three chunks totaling 2,146 bytes JavaScript.
- Active Chrome review: 14 cases and 14 screenshots across 320, 768, 1280, and 1440 CSS pixels; both themes; text spacing; 200-percent zoom; reduced motion; forced colors; PDF, resume, single-image, and multi-image states; zero findings.
- Firefox, Safari, and iOS Safari were unavailable and were not represented as passes.

## Recovery and Scope

- The isolated recovery rehearsal and captured payload verification pass.
- `package-lock.json` and dependency declarations are unchanged.
- No duplicate `_modified`, `_new`, or replacement-copy application files were created.
- No backend, database, analytics, authentication, deployment, CSP/header, or U-06 delivery behavior was added.

## Story and Requirement Completion

- US-014: complete through on-demand PDF detail, Open/Download, native embedding, and oversized fallback.
- US-015: complete through shared accessible popup behavior and direct safe actions.
- US-016: complete through grouped image detail, bounded navigation, focus/inertness/dismissal behavior, and responsive containment.
- US-019: complete through central safe capability admission, generic failure states, source restrictions, and integrity/privacy gates.
- FR-026 through FR-035 and all applicable approved U-05 NFR, PBT, and security rules are implemented and verified.

## Extension Compliance

- Security Baseline: SECURITY-09, SECURITY-11, SECURITY-13, and SECURITY-15 are compliant; other rules remain N/A or deferred to U-06 as approved.
- Property-Based Testing: applicable invariant, oracle-equivalence, bounds, preservation, Close, and stateful sequence properties pass. PBT-02 and PBT-04 are N/A because U-05 adds no inverse pair or idempotent operation.
