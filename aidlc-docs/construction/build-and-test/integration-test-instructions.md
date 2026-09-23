# Integration Test Instructions

## Automated Integration Gate

Run the portfolio suite and active structural checks:

```bash
npm run test:portfolio
npm run check:portfolio
npm run check:shell:active
npm run check:research:active
npm run check:academic:active
npm run check:tools-fieldwork:active
npm run check:contact-journal:active
```

Then run the active semantic verifiers:

```bash
npm run verify:identity:active
npm run verify:research:active
npm run verify:academic:active
npm run verify:tools-fieldwork:active
npm run verify:contact-journal:active
npm run verify:recovery
```

## Required Cross-Unit Scenarios

| Scenario                    | Expected result                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Registry composition        | Exactly ten finished portfolio bodies resolve in order; no temporary body appears                                                    |
| Shell navigation            | Direct and sequential section navigation preserve one continuous portfolio experience                                                |
| Theme and responsive tokens | Shared colors, spacing, readable measures, and focus treatments apply consistently to U-01 through U-07                              |
| Data Stories projection     | The SIM-LSE discovery descriptor matches the canonical Research Note descriptor and route                                            |
| Journal route               | The canonical hash lazy-loads the note; loading, missing, failure, retry, and return paths remain bounded                            |
| Contact handoff             | Validated local fields create the exact encoded `mailto:` intent; invalid input focuses the first field and no false success appears |
| Evidence behavior           | Evidence references remain verified and on-demand rather than inflating the initial JavaScript/CSS closure                           |
| Recovery isolation          | Active code is separate from quarantined legacy files, and every protected recovery hash verifies                                    |

## Manual Integration Review

Using `npm run preview`, check at 320, 768, 1280, and 1440 CSS pixels in light and dark themes:

1. Navigate through all ten section bodies with keyboard and pointer input.
2. Confirm headings, reading order, borders, alignment, spacing, and overflow.
3. Open the SIM-LSE Research Note from Data Stories, exercise return navigation, and test an unknown note hash.
4. Submit empty, malformed, maximum-length, Unicode, and reserved-character Contact values.
5. Confirm no network request, persisted draft, analytics event, or in-page success claim occurs.
6. Review keyboard focus, 200-percent zoom, increased text spacing, and reduced motion.

The user approved the twelve-item rendered U-07 review. Dedicated browser automation is not installed; the manual review remains the release procedure for browser-level behavior.

## Non-Applicable Integration Types

- Service-to-service integration: no backend services exist.
- API contract testing: no application API exists.
- Database integration: no database exists.
