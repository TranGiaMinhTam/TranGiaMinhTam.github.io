# Unit of Work Plan: Header, Content, Evidence, and Resume Refinement

> **Status: Part 2 complete; explicit Units Generation approval required. No Construction work is authorized.**

## Purpose

Decompose the approved single-package React/Vite enhancement into manageable logical units. The units must preserve the approved Application Design boundaries, assign all 21 stories exactly once, carry every applicable requirement and extension obligation, support focused visual review, and maintain safe dependency direction in the uncommitted brownfield workspace.

## Decomposition Context

- The application remains one static deployable artifact; units are logical development modules, not services.
- The approved execution plan proposes six preliminary units: source governance, masthead/alignment, resume-led content, archive discovery, media viewers, and security/integrated acceptance.
- The architecture adds shared archive, resume, media-viewer, semantic-summary, preprocessing, delivery-security, and property-testing boundaries while retaining the current ten-section shell.
- The work includes 38 functional, 20 non-functional, 10 PBT, and 8 security requirements plus 21 user stories.
- Security Baseline and full Property-Based Testing enforcement are enabled.
- Each unit will pass its applicable Functional Design, NFR Requirements, NFR Design, Infrastructure Design, Code Generation planning, implementation, and review gates.

## Decomposition Category Assessment

| Category | Applicability | Reason |
| --- | --- | --- |
| Story grouping | Applicable | The 21 stories span shell, content, archive, viewers, and maintainer verification journeys. |
| Dependencies | Applicable | Generated facts, shared models, shell slots, lazy catalogs, viewer capabilities, and release gates require ordered contracts. |
| Team alignment | Applicable | A single primary contributor still needs explicit ownership and review handoffs to avoid cross-domain coupling. |
| Technical considerations | Applicable | Units have distinct preprocessing, runtime, lazy-loading, accessibility, property-test, and deployment-security concerns. |
| Business domain | Applicable | Visitor journeys cross the ten sections, while archive and viewer capabilities are shared bounded contexts. |
| Code organization | N/A as a separate question | This is brownfield and single-deployment; the approved Application Design already fixes feature-first folders and shared boundaries. |

## Decomposition Questions

Please answer every question by placing the selected letter after its `[Answer]:` tag. The recommended choice is listed first.

## Question 1 - Story Grouping

How should the approved work be grouped into implementation units?

A) Use the six capability units proposed in Workflow Planning, with one primary story owner and explicit downstream verification obligations
B) Combine the work into three large units: data foundation, all presentation, and final verification
C) Create one unit for each of the 21 user stories
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Foundation Ownership

Where should inventory, hashes, canonical identities, resume-source records, safe-media policy, derivative contracts, privacy controls, and shared property-test generators be owned?

A) Own them in U-01 Source Governance and Safe Foundation as stable contracts consumed by all later units
B) Distribute each contract into the first visible feature that uses it
C) Defer these contracts until final integration after the visible units are built
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Dependency Sequence

How should implementation dependencies be sequenced?

A) Use the directed order U-01 foundation, U-02 masthead/alignment, U-03 resume content, U-04 archive discovery, U-05 viewers, and U-06 security/integrated acceptance; later units may amend earlier contracts only through explicit impact review
B) Start U-02 through U-05 in parallel before U-01 contracts stabilize, then reconcile during U-06
C) Allow any later unit to change earlier shared contracts without reopening affected design or regression checks
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Team Alignment

What ownership model should the unit definitions assume?

A) Optimize for one primary contributor working sequentially with explicit folder ownership, shared-contract ownership, review handoffs, and no reverse presentation imports
B) Optimize for six independent teams working concurrently with duplicated local contracts
C) Avoid documenting ownership because the current project has one primary contributor
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Technical Deployment Boundary

How should unit boundaries relate to deployment?

A) Keep all six as logical modules inside one Vite build and static deployment, using preprocessing and lazy runtime chunks only where the approved design requires them
B) Make archive and viewer units independently deployed frontend applications
C) Introduce a backend media service so archive and viewer units can deploy separately
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Business Capability Boundaries

How should the ten portfolio sections and shared archive/viewer capabilities map to units?

A) Let U-02 own shell and cross-section alignment, U-03 own resume-led domain content, U-04 own complete archive discovery, and U-05 own shared PDF/image inspection while retaining domain folder ownership
B) Split one unit per each of the ten sections and duplicate archive/viewer behaviors where needed
C) Put all content, archive, and viewer work into the Evidence Library unit
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Visual Review Cadence

How should visible work be reviewed before activation?

A) Require focused rendered approval after U-02, U-03, U-04, and U-05, with each slice complete enough to review without unfinished later behavior
B) Defer all browser review until U-06 after every visible change is integrated
C) Review only screenshots generated by tests and skip interactive browser review
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Cross-Cutting Obligations

How should accessibility, privacy, performance, security, recovery, and property testing be allocated?

A) Give each obligation a primary owning unit and require every affected downstream unit to pass explicit inherited checks; U-06 performs the final integrated gate
B) Assign all cross-cutting obligations only to U-06
C) Duplicate independent implementations of every cross-cutting control in all six units
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Shared Contract Changes

How should a later unit handle a necessary change to an approved upstream contract?

A) Record the change in that unit's Functional Design and Code Generation plan, name affected earlier units, preserve dependency direction, and run focused regression checks before approval
B) Apply the contract change during implementation and document it at the end
C) Copy the upstream contract into the later unit to avoid affecting approved work
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Unit Completion Boundary

What makes a unit ready for its post-generation approval?

A) Its owned capability, tests, extension obligations, accessibility behavior, responsive states, safe failures, dependency checks, recovery evidence, and rendered review where applicable are complete without relying on unfinished later units
B) Its new files compile even if interactions, tests, responsive behavior, and safeguards remain incomplete
C) No unit can be reviewed until all six units are implemented
X) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Execution Checklist

### Part 1 - Planning and Approval

- [x] Load approved requirements, stories, personas, workflow plan, and Application Design artifacts.
- [x] Assess story grouping, dependencies, team alignment, technical considerations, business boundaries, and code-organization applicability.
- [x] Create ten context-specific decomposition questions with recommended choices and mandatory Other options.
- [x] Receive answers to all ten decomposition questions.
- [x] Analyze answers for ambiguity, contradictions, combined choices, and missing decision rules.
- [x] Complete ambiguity review; all Option A decisions are compatible and require no follow-up questions.
- [x] Obtain explicit approval of the completed unit-of-work plan through the user's `approve all A` instruction.

### Part 2 - Units Generation

- [x] Read the complete approved unit-of-work plan and select the first incomplete generation step.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work.md` with definitions, responsibilities, ownership, entry/exit criteria, design-stage applicability, and review boundaries.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-dependency.md` with dependency matrix, sequencing, communication boundaries, validated diagrams, and text alternatives.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-story-map.md` mapping all 21 stories, 38 functional requirements, 20 non-functional requirements, 10 PBT requirements, and 8 security requirements.
- [x] Validate single-deployment boundaries, dependency direction, shared-contract ownership, and the six reviewable outcomes.
- [x] Verify every story has exactly one primary owner and all applicable cross-cutting obligations are inherited downstream.
- [x] Verify every requirement has at least one primary owner and no enabled extension obligation is dropped.
- [x] Validate Markdown, Mermaid syntax, tables, links, paths, and text alternatives.
- [x] Present completed Units Generation artifacts for explicit approval before Construction.

## Mandatory Artifacts

- [x] `aidlc-docs/inception/application-design/unit-of-work.md`
- [x] `aidlc-docs/inception/application-design/unit-of-work-dependency.md`
- [x] `aidlc-docs/inception/application-design/unit-of-work-story-map.md`

## Boundary

- This plan does not authorize source-code changes, dependency installation, derivative generation, file deletion, asset relocation, deployment changes, or Construction work.
- Existing artifacts at the mandatory paths are historical and will be replaced only after this plan is answered and explicitly approved.
- Every later unit remains subject to the approval sequence in the active execution plan.
