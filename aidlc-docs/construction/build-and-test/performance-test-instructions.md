# Performance Test Instructions

## Static Bundle Gate

Build first:

```bash
npm run build
```

Then run the final U-07 measurement contract:

```bash
node scripts/portfolio/measure-build.mjs \
  --dist dist \
  --baseline artifacts/portfolio/u07/measurement-baseline.json \
  --javascript-budget 296000 \
  --css-budget 51200 \
  --javascript-regression-percent 6 \
  --css-regression-percent none \
  --lazy-entry JournalRouteEntry \
  --lazy-javascript-budget 18432 \
  --lazy-css-budget 6144 \
  --evidence-growth-budget 0 \
  --output artifacts/portfolio/u07/active.json
```

## Verified Production Result

| Metric                  |        Actual |                            Ceiling | Result |
| ----------------------- | ------------: | ---------------------------------: | ------ |
| Initial JavaScript      | 295,847 bytes | 296,000 bytes and 6-percent growth | Pass   |
| Initial CSS             |  50,935 bytes |                       51,200 bytes | Pass   |
| Lazy Journal JavaScript |   3,213 bytes |                       18,432 bytes | Pass   |
| Lazy Journal CSS        |   3,693 bytes |                        6,144 bytes | Pass   |
| U-07 evidence growth    |       0 bytes |                            0 bytes | Pass   |

The manifest confirms `JournalRouteEntry.tsx` is not in the initial static closure.

## Browser Timing Procedure

No controlled browser timing was available during the approved implementation, so no Lighthouse, Largest Contentful Paint, Interaction to Next Paint, or Cumulative Layout Shift result is claimed.

For a future browser performance run:

1. Run `npm run build` and `npm run preview`.
2. Use a fixed browser version, viewport, CPU profile, and network profile.
3. Run at least three Lighthouse passes against the production preview.
4. Record the median values and the exact environment.
5. Treat new failures or visible loading regressions as release findings; do not replace the byte gates with a single Lighthouse score.

## Not Applicable

Load, stress, throughput, database, cache, queue, and autoscaling tests are not applicable to this static site because it has no runtime application server.
