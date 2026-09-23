# Pre-Switch Record - U-02 Scientific Shell

## Decision

The inactive candidate may be generated. The active entry may not be switched until all plan preconditions and the separate rendered-candidate approval gate pass.

## Verified Starting Point

- Source revision: `3d8dd530e375f6b93a22ce834a5602d822175384`.
- The workspace has 93 existing status entries from the protected redesign workflow; their null-delimited status inventory is integrity-recorded in `pre-switch.json`.
- The exact pre-switch hashes of `src/App.tsx`, `src/main.tsx`, and `index.html` are recorded for a non-destructive rollback patch.
- `package-lock.json` matches the U-01 baseline SHA-256 value.
- U-01 recovery verification passed with both payload hashes intact, 19 archived members, and the protected 104-file raw-source inventory unchanged.
- Installed tools are Node v24.0.0, npm 11.3.0, Vite 7.3.0, and TypeScript 5.9.3.
- The pre-U-02 active graph remains 893,367 bytes of JavaScript and 68,577 bytes of CSS.

## Scope Control

U-02 is limited to the paths in the approved Code Generation plan. Existing unrelated and rejected-attempt changes remain untouched. No dependency, lockfile, raw-evidence, source deletion, deployment, backend, or active-entry mutation is authorized during inactive candidate generation.

## Rollback Boundary

The active switch is limited to `src/App.tsx`, `src/main.tsx`, and `index.html`. Their recorded hashes plus the verified U-01 recovery package provide the entry-switch recovery boundary. No destructive Git command is permitted.
