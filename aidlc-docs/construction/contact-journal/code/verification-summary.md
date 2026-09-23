# U-07 Contact and Journal Verification Summary

## Acceptance Result

All current P0 checks pass. The active application has ten finished section bodies, no temporary body, and one separately lazy Journal route.

## Automated Evidence

| Verification                       | Result                   |
| ---------------------------------- | ------------------------ |
| Strict TypeScript                  | Pass                     |
| ESLint                             | Pass                     |
| Focused U-07 suite                 | 14 files, 39 tests pass  |
| Portfolio suite                    | 51 files, 158 tests pass |
| Full repository suite              | 59 files, 204 tests pass |
| Active U-07 boundary and verifier  | Pass                     |
| Active U-02 through U-06 verifiers | Pass                     |
| Recovery verifier                  | Pass                     |
| Production Vite build              | Pass                     |
| Retained-legacy hash verification  | 12 of 12 pass            |
| Dependency lockfile                | Unchanged                |

The first full-suite attempt was run concurrently with other worker-heavy checks. Two unrelated legacy template tests exceeded their five-second timeout. The suite was rerun independently and all 204 tests passed; this is recorded as resource contention rather than an application defect.

## Production Measurements

| Metric                  |        Actual |                            Ceiling | Result |
| ----------------------- | ------------: | ---------------------------------: | ------ |
| Initial JavaScript      | 295,847 bytes | 296,000 bytes and 6-percent growth | Pass   |
| Initial CSS             |  50,935 bytes |                       51,200 bytes | Pass   |
| Lazy Journal JavaScript |   3,213 bytes |                       18,432 bytes | Pass   |
| Lazy Journal CSS        |   3,693 bytes |                        6,144 bytes | Pass   |
| U-07 evidence growth    |       0 bytes |                            0 bytes | Pass   |

The Vite manifest confirms `JournalRouteEntry.tsx` is outside the initial static closure. Browser timing was unavailable, so no unmeasured timing claim is made.

## Behavioral Coverage

- Contact: exact recipient, field limits, normalization, conservative email validation, control-character rejection, finding order, first-invalid focus, encoding, Unicode/reserved characters, direct fallback, retained draft, and no false success.
- Journal: canonical article, valid unknown slug, malformed hash handoff, loading, local render failure, one manual retry, route focus, heading hierarchy, optional evidence omission, Data Stories return, and descriptor equivalence.
- Scale: sixteen descriptors and 112 ordered sections assemble deterministically while production remains one note.
- Publication: no storage, fetch, analytics, unsafe scheme, raw draft logging, dynamic HTML injection, former-owner claim, or new evidence asset.

## Rendered Review

The user approved Option A for all twelve review questions, covering Contact composition/readability/behavior, Data Stories discovery, Research Note composition/content, route states, 1280/1440 and 320/768 layouts, both themes, accessibility stress states, and activation.
