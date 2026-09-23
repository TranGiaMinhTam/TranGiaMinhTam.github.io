# U-03 Legacy Asset Deletion Clarification

> **Status: Option A approved on 2026-09-23. Preserve the legacy-asset deletions and isolate only unreachable former-owner test/import fixtures.**

## Verified Situation

- The complete suite passed earlier in this U-03 run with 72 files and 256 tests.
- After candidate visual correction, 27 tracked legacy/former-owner assets outside `src/assets/minh-tam/` were deleted by a concurrent workspace change.
- Four legacy suites now fail during import because `src/data/journalPosts.ts` still references deleted `src/assets/photo_8.jpg`.
- The active portfolio production baseline, isolated candidate build, 29 focused U-03 tests, TypeScript, lint, privacy, integrity, recovery, boundaries, exact performance limits, and all 89 rendered cases pass.
- The U-03 candidate has zero rendered findings, but the approved final gate requires the complete test suite to pass before activation.
- Two protected in-scope files that also disappeared were restored from approved exact bytes: `src/assets/minh-tam/profile.png` at 77,650 bytes with SHA-256 `d6e6398b821168498d4dd7179c92354f57d7160ddbe8ec842d6cc70a3defeb54`, and inactive `src/assets/documents/resume.pdf` at 103,033 bytes with SHA-256 `7ca0d97a208bbb9fd0e026ae51a164792e2efa6b2388c303141c1466853874dd`.

## Question 1 - Legacy Asset Boundary

How should the concurrent deletion of the 27 tracked legacy/former-owner assets be handled?

A) Preserve the deletions and authorize the smallest test/legacy-fixture cleanup needed to remove unreachable former-owner imports from the complete suite, then rerun every U-03 gate before candidate activation review (recommended)
B) Restore all 27 deleted legacy assets byte-for-byte from Git, then rerun every U-03 gate
C) Leave the concurrent deletions and failing legacy suites unchanged; stop U-03 before candidate activation review
X) Other (describe after the answer tag)

[Answer]: A

## Authorization Boundary

Option A authorizes only removal or isolation of unreachable former-owner test/import fixtures required to make the complete suite represent the active Minh Tam portfolio. It does not authorize changes to active Minh Tam content, deployment, U-04 archive discovery, U-05 media dialogs, or unrelated redesign.
