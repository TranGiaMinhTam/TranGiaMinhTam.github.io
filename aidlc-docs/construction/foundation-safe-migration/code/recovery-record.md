# U-01 Recovery Record

## Outcome

The rejected Research Atlas application state was captured and successfully restored in an isolated local clone before any U-01 foundation source was created. The fixed payload is stored outside the deployable application tree at `.aidlc-recovery/research-atlas-pre-u01/` and is ignored by Git.

## Capture

- Source revision: `3d8dd530e375f6b93a22ce834a5602d822175384`
- Capture time: `2026-09-13T16:26:00Z`
- Binary tracked patch: 192,145 bytes
- Untracked archive: 35,461,155 compressed bytes; 19 members; 37,233,523 uncompressed bytes
- Raw source evidence protected in place: 104 files; 270,120,878 bytes
- Active AI-DLC documentation and machine-readable evidence were excluded from the rejected-application archive.

## Verification

Restoration was rehearsed in `/private/tmp/aidlc-u01-recovery.neMJGz/verification-workspace`, a fresh local clone created with `--no-hardlinks`. The binary patch applied cleanly, the archive extracted cleanly, and the normalized application inventory matched the source workspace. The rehearsal completed in 6.1 seconds, within the 1,800-second recovery objective. The verification workspace was retained.

## Recovery Procedure

1. Clone revision `3d8dd530e375f6b93a22ce834a5602d822175384` into a fresh workspace with `git clone --no-hardlinks`.
2. Run `git apply --binary tracked-application.patch` from the fresh workspace.
3. Extract `untracked-application.tar.gz` at the fresh workspace root.
4. Verify the two payload hashes in `SHA256SUMS` and compare the normalized application inventory.
5. Preserve `src/assets/minh-tam/source/` separately in place; it is protected user evidence and is intentionally absent from the archive.

The machine-readable manifest and verification result are in `artifacts/portfolio/u01/`.
