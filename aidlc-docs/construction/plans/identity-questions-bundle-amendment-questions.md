# U-03 Bundle Scope-Amendment Question

## Context

The isolated U-03 candidate was built without changing the live `src/App.tsx` registration.

- Candidate JavaScript: 234,100 bytes, below the 256,000-byte absolute budget.
- Candidate CSS: 17,623 bytes, below the 24,576-byte absolute budget.
- U-02 JavaScript baseline: 206,703 bytes.
- Candidate JavaScript growth: 13.2543 percent, above the inherited 10-percent regression limit of 227,373 bytes.
- The current U-01 verified source and evidence manifest are cross-domain modules, so importing only Identity and Questions still emits unrelated project images and documents into the candidate artifact.
- The live page remains unchanged, and `src/App.tsx` plus `package-lock.json` still match their preflight hashes.

## Question 1 - Resolve the Blocking Candidate Boundary

How should U-03 address the failed inherited regression and unrelated evidence emission?

A) Approve a narrow canonical-data split: create a lightweight question/domain fact module consumed by the existing research data, create a U-01 identity/question projection containing only verified identity/questions plus portrait/transcript evidence, switch U-03 to that projection, preserve the full existing exports and facts, and rerun every gate without changing thresholds
B) Keep the monolithic imports, relax the JavaScript regression allowance to 15 percent, and accept unrelated evidence files in the emitted candidate because they are not initial browser requests
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Recommendation

Option A is recommended. It preserves the approved performance threshold, removes unrelated evidence from this unit's build reachability, establishes a reusable canonical projection boundary, and does not duplicate or rewrite verified factual content.

## Approval Boundary

- Option A authorizes only the five exact source/test areas listed in the approved Code Generation plan amendment.
- It does not authorize live activation, content rewriting, asset mutation, dependency changes, shell restructuring, later-domain work, or threshold relaxation.
- After the amended candidate passes, U-03 still pauses at the separate rendered-candidate approval gate.

## Decision

Option A was explicitly approved on 2026-09-15. The narrow canonical-data split was implemented without changing visible copy, assets, dependencies, the lockfile, the live entry, or approved thresholds.
