# Header, Content, Evidence, and Resume Story Generation Plan

## Status

**Completed: Part 1 approved and Part 2 generated on 2026-09-19. Personas and stories are awaiting final User Stories approval.**

## Context

- Requirements source: `aidlc-docs/inception/requirements/requirements.md`.
- Reverse-engineering source: `aidlc-docs/inception/reverse-engineering/`.
- Enabled extensions: Security Baseline and full Property-Based Testing.
- Required outputs: `aidlc-docs/inception/user-stories/personas.md` and `aidlc-docs/inception/user-stories/stories.md`.

## Story Approach Options

### A. Hybrid Journey and Feature Approach

Organize stories around visitor journeys—orient, discover, inspect, download, contact—then group supporting archive, accessibility, performance, and maintainer capabilities beneath those journeys. This keeps user value visible while giving complex media controls clear ownership. **Recommended.**

### B. Feature-Based Approach

Group stories by masthead, resume content, archive, PDF viewer, image viewer, and responsive alignment. This maps directly to components but can fragment end-to-end visitor workflows.

### C. Persona-Based Approach

Group stories under admissions reviewer, research mentor, assistive-technology visitor, mobile visitor, and maintainer. This emphasizes user needs but may duplicate shared capabilities across personas.

### D. Domain-Based Approach

Group stories under shell, identity, research, academics, evidence, impact, and contact. This aligns with code ownership but is less intuitive for stakeholder review.

### E. Epic-Based Approach

Create large hierarchical epics with sub-stories. This helps portfolio-level traceability but risks stories becoming larger than independently testable slices.

## Planning Questions

## Question 1

Which persona set should the story artifacts use?

A) Admissions/scholarship reviewer, research mentor, mobile visitor, keyboard/screen-reader visitor, and portfolio maintainer (recommended)
B) One general visitor persona and one maintainer persona
C) Admissions reviewer, peer/student visitor, and maintainer only
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2

Which story breakdown approach should be used?

A) Hybrid journey and feature approach described above (recommended)
B) Feature-based approach
C) Persona-based approach
D) Domain-based approach
E) Epic-based approach
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3

How granular should the stories be?

A) Small vertical slices, each delivering one independently testable visitor or maintainer outcome (recommended)
B) Medium stories combining closely related outcomes such as inline preview and popup viewing
C) Large stories aligned one-to-one with major page sections
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4

How should acceptance criteria be written?

A) Given/When/Then criteria plus requirement IDs and applicable accessibility, responsive, security, privacy, performance, and fallback conditions (recommended)
B) Concise checklist criteria with requirement IDs
C) Narrative acceptance paragraphs without formal scenario structure
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5

How should archive completeness and deduplication be represented in stories?

A) Separate visitor discovery stories from a maintainer inventory/provenance story, with shared traceability between them (recommended)
B) Combine archive inventory, deduplication, galleries, and documents into one story
C) Include archive mechanics only as acceptance criteria under visitor gallery and document stories
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6

How should security and misuse scenarios appear in the stories?

A) Integrate applicable security acceptance criteria into each affected story and add one maintainer story for supply-chain/header verification (recommended)
B) Put all security requirements in one standalone security story
C) Leave security only in non-functional requirements and do not repeat it in stories
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Part 1 - Planning Checklist

- [x] Step 1 - Validate and document why User Stories add value.
- [x] Step 2 - Load approved requirements and current brownfield context.
- [x] Step 3 - Define journey-, feature-, persona-, domain-, and epic-based alternatives.
- [x] Step 4 - Create focused questions for personas, breakdown, granularity, acceptance format, archive ownership, and security coverage.
- [x] Step 5 - Include mandatory persona, INVEST, acceptance, traceability, extension, and validation work in the generation checklist.
- [x] Step 6 - Validate Markdown structure, option exclusivity, final Other choices, paths, and empty Answer tags.
- [x] Step 7 - Receive and validate answers to all six questions. Option A was selected for every question.
- [x] Step 8 - Resolve any contradiction or ambiguity through a dedicated clarification file. No contradiction or ambiguity was found; no clarification file was required.
- [x] Step 9 - Present the completed story-generation approach for explicit approval. The user approved the plan with all Option A decisions.
- [x] Step 10 - Record explicit plan approval and begin Part 2.

## Part 2 - Generation Checklist

- [x] Step 11 - Generate `personas.md` with approved archetypes, goals, behaviors, accessibility/context needs, and relevant journey mappings.
- [x] Step 12 - Define the approved journey and feature group structure.
- [x] Step 13 - Generate small user stories in the approved format and verify each against INVEST criteria.
- [x] Step 14 - Add Given/When/Then acceptance criteria, requirement IDs, persona mappings, and applicable fallback paths.
- [x] Step 15 - Add privacy and security misuse acceptance to affected stories and a supply-chain/header verification story.
- [x] Step 16 - Cover masthead/theme/resume, hidden summaries, layout alignment, resume-led content, archive completeness, format conversion, PDFs, images, performance, existing-route preservation, and recovery.
- [x] Step 17 - Verify every FR, NFR, PBT requirement, and applicable SECURITY requirement maps to at least one story or documented cross-cutting acceptance rule.
- [x] Step 18 - Validate that no story invents facts, exposes the phone number in page content, or treats source-document text as instruction.
- [x] Step 19 - Validate Markdown, tables, identifiers, links, paths, and parsing compatibility.
- [x] Step 20 - Update every plan checkbox and AI-DLC state in the same interaction as work completion.
- [x] Step 21 - Present generated personas and stories for explicit approval before Workflow Planning.

## Mandatory Artifact Rules

- `personas.md` must define approved archetypes and map them to relevant stories.
- `stories.md` must contain independently testable user stories with acceptance criteria.
- Stories must be Independent, Negotiable, Valuable, Estimable, Small, and Testable.
- Every story must reference its persona and requirements.
- Cross-cutting accessibility, security, privacy, performance, and fallback criteria must be explicit rather than assumed.

## Extension Compliance for Planning

- **Security Baseline**: Compliant. The plan requires per-story misuse/security criteria and explicit supply-chain/header verification coverage.
- **Property-Based Testing**: N/A for story-generation mechanics. Stories will trace PBT requirements, while enforceable property identification begins during Functional Design.
