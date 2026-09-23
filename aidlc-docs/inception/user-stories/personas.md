# Personas: Header, Content, Evidence, and Resume Refinement

## P-01 Admissions and Scholarship Reviewer

- **Context**: Reviews many student profiles under time pressure, usually on a laptop.
- **Goals**: Understand Minh Tam's academic trajectory, achievements, research direction, and supporting evidence quickly.
- **Behaviors**: Scans headings first, downloads the resume, opens selected documents, and compares claims with evidence.
- **Needs**: Strong hierarchy, concise but complete facts, visible provenance, responsive PDF previews, and predictable navigation.
- **Risks**: Repetition, oversized headings, misaligned records, unsupported claims, or a slow archive can reduce trust.
- **Journeys**: Orient and download; review resume-led content; inspect evidence; contact.
- **Stories**: US-001 through US-006, US-008 through US-016, US-019, and US-020.

## P-02 Research Mentor

- **Context**: Evaluates scientific curiosity, methods, contribution boundaries, and evidence quality.
- **Goals**: Review research questions, computational and laboratory methods, data work, publications, posters, and project visuals.
- **Behaviors**: Follows research sections, examines detailed evidence, and looks for careful distinction between verified results and developing interests.
- **Needs**: Accurate method sequences, aligned scientific diagrams, honest contribution labels, detailed PDF/image viewing, and stable citations/provenance.
- **Risks**: Inferred outcomes, ambiguous roles, broken document viewing, or duplicated evidence undermine credibility.
- **Journeys**: Explore research; inspect documents and images; verify provenance; open research note.
- **Stories**: US-004 through US-016, US-019, and US-020.

## P-03 Mobile Visitor

- **Context**: Arrives from a shared link on a phone with limited bandwidth and a narrow viewport.
- **Goals**: Identify Minh Tam, scan major achievements, access the resume, and inspect a small number of relevant media items.
- **Behaviors**: Uses the sticky navigation, scrolls in one column, opens media on demand, and may switch theme.
- **Needs**: Compact masthead actions, readable wrapping, no horizontal overflow, lazy media, touch-sized controls, and dialogs that fit the viewport.
- **Risks**: All-at-once archive loading, wide tables, clipped headings, and fixed desktop modal dimensions can block use.
- **Journeys**: Orient; navigate; scan content; open media; resume after closing a dialog.
- **Stories**: US-001 through US-003, US-008, US-009, US-013 through US-019.

## P-04 Keyboard and Screen-Reader Visitor

- **Context**: Navigates with keyboard and/or assistive technology, possibly with zoom or increased text spacing.
- **Goals**: Understand the same relationships and evidence as sighted visitors, operate all actions, and maintain orientation through dialogs.
- **Behaviors**: Uses headings, landmarks, links, buttons, table/list semantics, focus order, Escape, and accessible names.
- **Needs**: Hidden semantic summaries, visible focus, correct dialog semantics, focus containment and restoration, labeled media, and useful failure messages.
- **Risks**: Removing visible tables without an equivalent, clickable non-buttons, focus loss, background interaction, or unlabeled previews makes content inaccessible.
- **Journeys**: Navigate structure; understand relationships; open and close documents/images; download; contact.
- **Stories**: US-001 through US-003, US-008, US-009, US-014 through US-020.

## P-05 Portfolio Maintainer

- **Context**: Maintains a static React/Vite site with a large uncommitted worktree and a 122-file evidence archive.
- **Goals**: Publish complete, accurate content without duplicates, unsafe paths, unsupported media, performance regressions, or unrecoverable changes.
- **Behaviors**: Reviews source authority, runs inventory/conversion scripts, validates catalogs, executes tests, inspects build output, and preserves recovery evidence.
- **Needs**: Typed immutable manifests, content hashes, canonical entries, conversion reports, property-based tests, security verification, deterministic builds, and exact recovery boundaries.
- **Risks**: Raw-filename inference, duplicate publication, phone-number leakage, unsupported HEIC/DOCX previews, unsafe URL schemes, missing headers, dependency vulnerabilities, and destructive cleanup.
- **Journeys**: Inventory; reconcile; convert; publish; verify; recover.
- **Stories**: US-007, US-010 through US-012, US-017 through US-021.

## Persona-to-Journey Map

| Journey | P-01 | P-02 | P-03 | P-04 | P-05 |
| --- | --- | --- | --- | --- | --- |
| Orient and navigate | Primary | Supporting | Primary | Primary | Supporting |
| Review resume-led content | Primary | Primary | Primary | Primary | Maintains |
| Browse complete archive | Primary | Primary | Primary | Primary | Owns |
| Inspect PDF and image detail | Primary | Primary | Primary | Primary | Verifies |
| Contact and research note | Primary | Primary | Supporting | Primary | Maintains |
| Inventory, security, and recovery | Informed | Informed | Informed | Informed | Primary |

## Persona Validation

- Each persona has distinct goals and constraints.
- Visitor personas cover admissions, research, mobile, and assistive-technology contexts.
- The maintainer persona owns non-visible completeness, security, provenance, and recovery outcomes.
- No persona requires publication of the resume phone number in page markup.

## Extension Compliance

- **Security Baseline**: Compliant. The maintainer and visitor personas explicitly cover privacy, unsafe media, secure failure, supply chain, and platform-header concerns.
- **Property-Based Testing**: N/A for persona definition; the maintainer's verification needs are carried into stories and later design stages.
