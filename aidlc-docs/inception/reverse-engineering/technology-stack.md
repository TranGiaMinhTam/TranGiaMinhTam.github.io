# Technology Stack

## Languages

- TypeScript 5.9.3 and TSX for application, models, scripts, and tests.
- CSS and CSS Modules for tokens, layout, theming, and responsive presentation.
- Markdown for workflow documentation and the fact-only research note.
- YAML for GitHub Actions and HTML for the Vite entry document.

## Runtime Libraries

- React 19.2.3 and React DOM 19.2.3.
- React Markdown 10.1.0 for the research note.
- Browser APIs for hashes, history, storage, scrolling, visibility, and email-client handoff.
- Chakra UI, Emotion, next-themes, React Icons, and Tailwind remain installed mainly for retained legacy presentation code or build configuration.

## Build and Quality Tools

- npm, Vite 7.3.0, SWC React plugin, TypeScript project references, and vite-tsconfig-paths.
- ESLint 9.39.2 and Prettier 3.7.4.
- Vitest 4.1.9, Testing Library React 16.3.2, jest-dom 6.9.1, and jsdom 29.1.1.

## Infrastructure

- GitHub repository, GitHub Actions, GitHub Pages, and Node.js 20 in CI.

## Latest Approved Evidence

- Strict TypeScript and ESLint passed.
- 204 tests across 59 files passed independently.
- Production build passed at 295,847 initial JavaScript bytes and 50,935 initial CSS bytes.
- Lazy Journal route measured 3,213 JavaScript bytes and 3,693 CSS bytes.
- This reverse-engineering refresh did not rerun verification commands.
