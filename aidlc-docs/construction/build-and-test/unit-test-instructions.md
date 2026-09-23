# Unit Test Instructions

## Complete Suite

```bash
npm test
```

Verified result: 59 files and 204 tests pass. The first resource-heavy concurrent attempt caused two unrelated legacy template timeouts; an independent rerun passed all 204 tests.

Coverage instrumentation is not configured, so no coverage percentage is claimed.

## Portfolio Suite

```bash
npm run test:portfolio
```

Verified result: 51 files and 158 tests pass.

## Focused Unit Suites

| Area                   | Command                        | Verified responsibility                                                                |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------------------------- |
| Scientific shell       | `npm run test:shell`           | Registry, section resolution, navigation, theme, and shell behavior                    |
| Identity and questions | `npm run test:identity`        | Hero identity, image framing, question bodies, and shell integration                   |
| Research and data      | `npm run test:research`        | Projects, data stories, research facts, and boundary presentation                      |
| Academic and evidence  | `npm run test:academic`        | Trajectory, evidence archive, asset metadata, and shell integration                    |
| Tools and fieldwork    | `npm run test:tools-fieldwork` | Capability map, impact/fieldwork content, and responsive structures                    |
| Contact and Journal    | `npm run test:contact-journal` | 14 files and 39 tests for validation, encoding, routing, lazy states, and note content |

## Failure Workflow

1. Run the smallest focused command that reproduces the failure.
2. Fix the source unless an approved requirement changed.
3. Rerun the focused suite.
4. Run `npm run test:portfolio`.
5. Run `npm test` independently so worker contention does not mask the result.
6. Run `npm run lint` and `npm run build` before handoff.

Do not update expected facts, routes, or asset hashes merely to make a failing test pass; reconcile them with the approved requirements and evidence first.
