# Execution Plan - Tran Gia Minh Tam CV Customization

> **Status: Approved on 2026-09-09 with theme refresh added.** Application implementation is now authorized within the scope below.

## Intent Analysis

- **User request**: Customize the existing student portfolio template using the supplied CV.
- **Request type**: Brownfield content customization.
- **Scope**: Existing portfolio data modules and their current rendered sections.
- **Complexity**: Low to moderate; the existing typed data model already covers the requested content, with no new route or component required.
- **Temporary-content constraint**: Update only person-specific text and structured content that can be represented by the current site. Leave profile imagery, project/gallery imagery, blogs, journal posts, YouTube/video content, certificates, and unrelated template assets unchanged.
- **Visual direction**: Refresh the shared theme around a research-and-sustainability identity: deep indigo for trust and academic structure, cyan for computational research, chlorophyll green for biology and conservation, and warm paper tones for readable light mode. Keep the current dark/light toggle and all interaction states.

## Proposed Content Mapping

1. `src/data/profile.ts`
   - Replace the name, slug, role, location, email, summary, hero headline, badges, stats, and stack highlights with a high-school student, science-research, data-analytics, and sustainability-oriented profile.
   - Preserve the existing profile-image and resume imports because no replacement asset was supplied.
   - Avoid inventing GitHub or LinkedIn URLs. Preserve the current link structure only if the implementation cannot safely hide unavailable links; otherwise retain email as the sole verified contact channel.
   - The supplied phone number will be documented as a scope note unless the existing profile type and contact component are intentionally extended to render phone numbers.

2. `src/data/about.ts` and `src/data/sectionContent.ts`
   - Replace placeholder and former-owner copy with concise first-person copy based on biology, chemistry, mathematics, computational research, innovation, leadership, conservation, and mentoring.
   - Keep all existing section IDs and layout contracts.

3. `src/data/education.ts`
   - Replace the prior university history with the supplied Vinschool Central Park entry, AS & A-level subjects, GPA/grade context, IELTS score, and current-study period.
   - Reuse the existing logo field only as a temporary unchanged asset because no school logo was supplied.

4. `src/data/experience.ts`
   - Use the existing timeline surface for leadership, mentoring, and extracurricular activities: Kyoto SDGs Youth Summit, TIV science research/content leadership, free mathematics mentoring, and conservation/volunteer programs.
   - Preserve the component and type; represent each activity with factual dates and CV-grounded descriptions.

5. `src/data/awards.ts`
   - Replace the old awards with the CV's honors, competitions, scholarships, school awards, sports medals, and debate result.
   - Preserve the existing optional logo behavior and use text-based marks where no verified image exists.

6. `src/data/projects.ts`
   - Replace project titles, descriptions, technologies, and action metadata with the molecular docking model and cashew testa polyphenol research projects, plus the data analytics challenge where appropriate.
   - Leave existing project image imports unchanged because images are explicitly out of scope; do not present those assets as newly supplied CV media.

7. `src/data/skills.ts`
   - Replace the prior engineering skill matrix with CV-grounded technical, laboratory, language, and interest categories.
   - Use existing logo keys only where they remain semantically appropriate; otherwise use stable text marks without adding image assets.

8. `src/data/navigation.ts` and section visibility
   - Keep the current navigation and section IDs unchanged. Do not add a new section for sports or extracurriculars; place those details in the existing awards and experience surfaces.

9. `src/index.css` and `src/App.css`
   - Replace the generic blue/cyan token system with the approved research-and-sustainability palette in both light and dark modes.
   - Preserve token names, layout selectors, animation behavior, focus states, responsive rules, and component contracts so the theme change remains presentation-only.

## Explicitly Out Of Scope

- Profile picture replacement or image editing.
- Project covers, gallery images, certificate files, logos, or other image assets.
- Blogs, journal posts, writing content, and YouTube/video entries.
- New routes, components, dependencies, layout changes, or deployment configuration.
- Claims not supported by the supplied CV, including missing social URLs, unprovided phone rendering, or guessed dates.

## AI-DLC Workflow

### Inception

- [x] Workspace Detection: Brownfield React/Vite site and existing AI-DLC artifacts confirmed.
- [x] Reverse Engineering: Reuse current architecture and component documentation.
- [x] Requirements Analysis: Minimal depth; the CV and scope constraints are sufficiently explicit.
- [x] User Stories: Skip; this is a single-person content replacement with direct acceptance criteria.
- [ ] Workflow Planning: This proposed plan is awaiting user review.
- [ ] Application Design: Skip; no new component, service, route, or data-model boundary is proposed.
- [ ] Units Generation: Skip; one cohesive portfolio-content unit is sufficient.

### Construction

- [ ] Functional Design: Skip; no new business logic or schema is needed.
- [ ] NFR Requirements: Skip; existing static-site accessibility and typing checks are sufficient.
- [ ] NFR Design: Skip; existing rendering and validation patterns remain authoritative.
- [ ] Infrastructure Design: Skip; deployment and hosting are unchanged.
- [ ] Code Generation: After approval, update only the scoped data modules and add or adjust focused content assertions if needed.
- [ ] Build and Test: Run focused portfolio tests, the complete Vitest suite, lint, and production build.

## Quality Gates

- No stale prior-owner identity, role, contact email, social URL, education, award, project description, or skill label remains in the in-scope content modules.
- Every updated record satisfies the existing TypeScript data contracts.
- The site continues to render with unchanged routes, navigation, layout modes, and untouched media/blog/video surfaces.
- Existing tests pass, with focused assertions added only for stable CV-specific facts that are important to prevent accidental regression.
- No unsupported facts are invented where the CV uses `N/A`, `?/10`, or provides no URL/asset.
- Both color modes remain readable and the theme refresh does not alter section navigation, layout switching, form submission, external links, or responsive behavior.

## Proposed Change Sequence

1. Record the completed approval answers and the added theme scope in the AI-DLC audit.
2. Update the person-specific data modules and shared theme tokens in two focused implementation slices.
3. Run targeted tests and repair only local content/type or contrast failures.
4. Run the full test suite, lint, and production build.
5. Report changed files, preserved out-of-scope surfaces, and any CV details intentionally not rendered by the current schema.
