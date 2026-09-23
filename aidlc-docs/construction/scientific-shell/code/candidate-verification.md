# Candidate Verification - U-02 Scientific Shell

## Result

The inactive scientific-shell candidate passes its automated pre-review gate. The current application entry remains byte-for-byte identical to the recorded pre-switch state. Activation is not authorized until the rendered candidate review is completed and explicitly approved.

## Quality Results

| Check | Result |
| --- | --- |
| Strict TypeScript build check | Passed |
| ESLint | Passed |
| Focused shell suite | 11 files and 36 tests passed |
| Portfolio suite | 19 files and 54 tests passed |
| Complete suite | 27 files and 99 tests passed |
| Candidate source boundary | Passed with zero findings |
| Shell verification | Passed with zero findings |
| U-01 recovery verification | Passed with both payload hashes intact |
| Protected raw source | 104 files; inventory unchanged |
| Dependency lockfile | Unchanged |

## Candidate Build

- Command: `npm run build:shell-candidate`.
- Vite: 7.3.0.
- Transformed modules: 47.
- Output: dedicated `/private/tmp/portfolio-u02-candidate-dist`; deployable `dist/` was not used.
- Initial JavaScript: 206,635 bytes against a 307,200-byte limit.
- Initial CSS: 9,200 bytes against a 51,200-byte limit.
- Other initial bytes: 531.
- Candidate deployable bytes: 216,551.
- Change from current entry: JavaScript decreased 76.8701 percent and CSS decreased 86.5844 percent.

## Boundary Results

The candidate entry reaches React, U-01 tokens/contracts, and the U-02 shell. Source and manifest checks found no Chakra component, Tailwind presentation, rejected template, legacy layout hook, raw evidence, runtime network surface, or later-domain presentation in the candidate graph.

## Interaction and Reliability Results

- Deliberate navigation state is checked under the 100-millisecond local threshold.
- Progress selection and derivation are synchronous and remain within the 200-millisecond settlement contract.
- The geometry fallback schedules one evaluation per animation frame regardless of repeated events.
- One observer or one constant-listener fallback controller owns all registered targets.
- Rapid, identical, malformed, reserved-journal, storage-failure, target-missing, tie, and stale-sequence cases are deterministic.
- Listener, observer, media, and frame cleanup paths are covered.

## Remaining Gate

The 320, 768, 1280, and 1440 CSS-pixel light/dark rendered review, keyboard/focus walkthrough, zoom/reflow review, and explicit candidate approval remain open. A failure or requested change leaves the original application entry untouched.
