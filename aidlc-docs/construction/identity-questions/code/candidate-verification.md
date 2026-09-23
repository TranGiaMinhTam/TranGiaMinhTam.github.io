# U-03 Isolated Candidate Verification

## Outcome

Step 12 passes after the explicitly approved option A canonical-data split. The isolated Identity and Questions candidate stays within every applicable approved bundle checkpoint, emits only the portrait and academic transcript evidence, and leaves the live body registration unchanged.

## Automated Results

| Gate | Result | Evidence |
| --- | --- | --- |
| Focused U-03 tests | Pass | 7 files, 18 tests |
| Complete test suite | Pass | 34 files, 120 tests |
| Strict TypeScript | Pass | `npx tsc -b` |
| Lint | Pass | `npm run lint` |
| U-01 recovery | Pass | 104 protected files; no unsafe archive member |
| Active portfolio boundary | Pass | Zero findings |
| U-03 candidate boundary | Pass | Zero findings |
| U-02 active shell | Pass | Ten sections; zero findings |
| U-03 candidate verifier | Pass | Fourteen identity files, exactly two body keys, zero findings |
| Live-entry preservation | Pass | `src/App.tsx` SHA-256 remains `7ad11872db509a57395b65ab189f424a56c919551a0199d031f127e21378dd94` |
| Dependency preservation | Pass | `package-lock.json` SHA-256 remains `db382652e91d7bd4ab3c154cf79d53b6b26ecb4430efe5961273572ce25b9bb1` |

The generic U-02 pre-activation candidate mode was not applicable because U-02 is already active. Its expected active-entry warning was resolved by running the U-02 verifier in its correct `--phase active` mode, which passed with zero findings.

## Candidate Measurements

| Artifact | Bytes | Approved checkpoint | Result |
| --- | ---: | ---: | --- |
| Initial JavaScript | 223,881 | 256,000 | Pass |
| JavaScript growth from U-02 | 8.3105% | At most 10% | Pass |
| Initial CSS | 18,826 | 24,576 | Pass |
| Portrait | 77,650 | At most 77,650 | Pass |
| Academic transcript | 6,817,646 | User-initiated only | Pass |

The U-02 9,200-byte stylesheet describes an empty temporary shell and is not a comparable content-style baseline for the two custom U-03 bodies. The explicitly approved cumulative 24,576-byte CSS checkpoint therefore governs, and the corrected candidate uses 76.60 percent of that allowance.

## Visual Correction

The first rendered candidate received option B because it was hard to see and used inconsistent coloring. The corrected stylesheet increases essential label and metadata sizes, promotes important copy to the primary text role, places both custom compositions on solid shared surfaces, strengthens the portrait frame and action treatments, increases relationship-line opacity and weight, unifies every constellation relationship on the shared accent role, and gives the semantic table a consistent accent-backed header. No component structure, verified fact, dependency, asset, shell controller, or live entry changed.

After the user requested more main-content space, a candidate-aware shell seam was added. At desktop widths, only registered custom-body sections allocate 0.28 fraction to the section label and 1.72 fractions, or 86 percent of the two-column fraction, to main content. Their gap and side padding are also reduced. Below 48rem they retain the single-column flow. Tests prove the other eight temporary sections do not receive this marker.

The supplied review screenshot then exposed the global display-size section heading colliding with the widened main content. Only custom-section headings now use `clamp(1.5rem, 2.25vw, 2.75rem)`, with a 9-character measure and stable line wrapping. The primary identity name and content hierarchy are unchanged.

## Asset and Request Classification

The production manifest contains the entry HTML, one JavaScript file, one stylesheet, the portrait, and the academic transcript. It contains no project, gallery, certificate, award, raw-evidence, legacy-template, or later-unit asset.

Static entry inspection finds only the JavaScript and stylesheet references in HTML. The portrait is the first-viewport image with intrinsic `width` and `height`, reserved aspect ratio, and asynchronous decoding. The transcript is referenced only by its native download anchor: no preload, prefetch, embed, object, iframe, fetch client, or runtime request is present. Accordingly, the documented initial inventory is HTML, JavaScript, CSS, and portrait; the transcript is classified as a user-initiated download.

## Model and Presentation Integrity

- Identity and question facts project from the new lightweight canonical boundary without changing the existing `researchProjects` public output.
- The relationship projector groups endpoints in one pass and derives SVG values and semantic rows from the same immutable relationship collection.
- Required-data failure, doubled-volume capacity, repeat-run determinism, broken endpoint, duplicate relationship, portrait failure, and exact visual/semantic identifier-equivalence tests pass.
- The body registry owns exactly `identity` and `questions`; the other eight registered sections retain U-02 temporary bodies.
- Boundary inspection excludes rejected presentation, protected raw-source paths, later-domain presentation, unsafe HTML, external SVG references, and runtime network APIs.

## Commands

- `npm run test:identity`
- `npx tsc -b`
- `npm run lint`
- `npm test`
- `npm run verify:recovery`
- `npm run check:portfolio`
- `node scripts/portfolio/check-boundaries.mjs --mode identity-candidate`
- `npm run verify:shell -- --phase active`
- `npm run build:identity-candidate`
- `npm run measure:identity-candidate`
- `npm run verify:identity:candidate`

The candidate was produced by Node.js 24.0.0, npm 11.3.0, Vite 7.3.0, TypeScript 5.9.3, and Vitest 4.1.9 in `/private/tmp/portfolio-u03-candidate-dist`. Deployable `dist/` was not used.

## Limitations and Next Gate

This step establishes source, artifact, semantics, bundle, and structural request evidence. Browser-rendered visual, responsive, theme, focus, reflow, and performance observations belong to Step 13 and are not claimed here.

## Extension Compliance

- Security Baseline: disabled; skipped. The approved product-specific static security gates passed.
- Property-Based Testing: disabled; skipped. The approved deterministic capacity and repeat-run tests passed.
