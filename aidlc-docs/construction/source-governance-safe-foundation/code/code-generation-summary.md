# U-01 Source Governance and Safe Foundation - Code Generation Summary

## Outcome

U-01 is complete and validated. It establishes a deterministic, privacy-safe source, catalog, derivative, resume, and test foundation without changing the visitor-facing page or activating work assigned to U-02 through U-05.

The governed archive contains 122 preserved physical files totaling 307,351,000 bytes. Exact SHA-256 grouping produces 104 canonical items while retaining every physical provenance member exactly once. Eighteen exact-content groups contain two physical members each. No non-identical alias was inferred.

## Created Application and Tooling Artifacts

- `src/portfolio/archive/` contains immutable archive types, manifest validation, safe media resolution, 104 neutral reviewed metadata records, an explicit empty reviewed-alias set, and the promoted generated manifest.
- `src/portfolio/resume/` contains the stable resume download capability and typed contract. No phone field exists.
- `scripts/portfolio/source-governance/` contains confined path handling, streaming hashing and inventory, recovery verification, exact canonicalization, metadata joining, deterministic evidence, bounded derivative adapters/scheduling, resume integrity, non-echoing privacy verification, candidate promotion, final validation, examples, shared arbitraries, and twelve property tests.
- `src/assets/documents/Tran-Gia-Minh-Tam-Resume.pdf` is a byte-identical copy of the supplied resume with the stable download filename.
- `src/assets/generated/minh-tam/` contains 107 validated visitor-facing derivative files outside the protected source root.
- `src/portfolio/sourceGovernanceBoundaries.test.ts` prevents premature browser activation.
- `artifacts/portfolio/source-governance/` contains non-public machine-readable review evidence.

## Modified Brownfield Files

- `package.json` and `package-lock.json` add exact `fast-check` 4.10.2, its resolved dependency, and focused generation/test/boundary commands.
- `.github/workflows/deploy.yml` runs the focused source-governance suite and browser-boundary check before the production build.
- `scripts/portfolio/check-boundaries.mjs` verifies that protected originals, Node tooling, generated manifest data, and PBT generators do not enter the deployable browser graph.
- `vite.config.ts` keeps Node-only source-governance tests in their dedicated Vitest project while the existing browser suite remains in jsdom.
- `src/portfolio/archive/archiveModel.ts` and `mediaSourcePolicy.ts` use explicit control-character checks compatible with the repository lint policy.

## Resume and Privacy Evidence

The supplied resume and bundled copy are both 169,191 bytes with SHA-256 `c9cca8a890cff3e0a6836539312b4eb8313732426aa207143a9f8f4d3179e8d6`.

The approved private phone comparison marker was extracted locally from the verified resume into process memory only. It was not echoed, persisted, logged, snapshotted, or included in evidence. The final post-build privacy scan inspected 334 text-bearing files and returned zero findings, warnings, or blockers. Only the byte-verified resume PDF receives the document exception.

## Derivative and Fallback Evidence

ImageMagick 7.1.1-43 and macOS `sips` 316 were available. LibreOffice was unavailable and was not installed automatically.

The bounded two-job scheduler produced and validated 107 outputs: 90 thumbnails, 13 PDF first-page previews, and four web-display conversions. The one DOCX preview request records `tool-unavailable` with an honest `original-download` fallback. The rerun reproduced the same semantic outcome set. All source files remain unchanged.

The manifest candidate was independently built twice and was byte-identical. The candidate and promoted manifest share SHA-256 `2d1503a1e20dd736db1a26b0d5247caf49430f222a37218f850d0448d5af238a`.

## Verification Results

- ESLint: passed.
- Strict TypeScript and Vite production build: passed.
- Focused source-governance tests: 9 files and 41 tests passed.
- Existing browser test suite: 63 files and 220 tests passed.
- Property suite: U01-P01 through U01-P12 passed with 100 runs per property, fixed seed `20260920`, shrinking enabled, replay support, and no silent retry.
- Inventory: 122 files and 307,351,000 bytes processed in 422 ms during final validation, within the 500-file and 1-GiB bounds.
- Source preservation: zero changed and zero missing protected source hashes.
- Resume equality: passed against the external source and bundled copy.
- Privacy: passed after the production build with zero findings.
- Browser/bundle isolation: passed with no premature U-01 catalog or tooling activation.
- Recovery manifest and isolated rehearsal: passed with zero findings and within the thirty-minute objective.
- Offline dependency audit: zero known cached vulnerabilities. The networked audit was intentionally not performed because policy rejected transmitting the dependency tree; the broader vulnerability and SBOM gate remains assigned to U-06.
- Whitespace/error check: `git diff --check` passed.

## Security Baseline Compliance

- SECURITY-09, SECURITY-10, SECURITY-11, SECURITY-13, and SECURITY-15 are compliant through generic diagnostics, an exact locked test dependency, layered validation, hash-linked local adapters, cleanup, recovery, and fail-closed promotion.
- SECURITY-01 through SECURITY-03, SECURITY-05 through SECURITY-08, SECURITY-12, and SECURITY-14 are N/A because U-01 introduces no persistence service, intermediary, server logging boundary, API, IAM/network configuration, authenticated resource, credential/session, or deployed monitoring stream.
- SECURITY-04 is N/A for U-01 and remains assigned to U-06 hosting and delivery design.
- No applicable blocking security finding remains.

## Property-Based Testing Compliance

- PBT-01 through PBT-05 and PBT-07 through PBT-10 are compliant. The implementation includes design-traced properties, round-trip and invariant checks, idempotence, a reference oracle, constrained domain generators, shrinking, fixed seed/replay behavior, exact `fast-check` integration, CI execution, and separate example tests.
- PBT-06 is N/A because the business core is immutable and stateless. Adapter lifecycle behavior is covered by deterministic integration examples.
- No applicable blocking PBT finding remains.

## Downstream Boundary

U-01 intentionally adds no visible components. U-02 may now restructure the header and place the resume download action at the top. U-03 through U-05 may consume the complete reviewed catalog, generated previews, safe PDF/original capabilities, and modal-ready media contracts only after their respective design and generation approvals.

The 104 neutral archive labels are deliberately non-inferential. Downstream presentation may replace them only with evidence-backed or owner-reviewed descriptive content; filenames must not be promoted into factual claims automatically.
