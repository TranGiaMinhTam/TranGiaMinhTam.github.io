# U-03 Frontend Components - Resume-Led Content Integration

## Component Structure

The existing application and ten-section shell remain the composition boundary. U-03 supplies validated data and focused presentation components:

- `PortfolioApp` composes the existing domain registry with the validated resume-led models.
- `PortfolioExperience` passes one masthead resume action and existing theme state into the shell.
- `ObservatoryShell` retains navigation, progress, and section order.
- `SpecimenMasthead` renders the optional validated resume action beside the theme control.
- `ResumeAction` renders the same capability in the Identity section.
- Existing domain section bodies consume their U-03 section view models.
- Existing evidence actions remain in place; no viewer or archive host is added.

## Component Contracts

### ResumeAction

Inputs: validated local PDF href, fixed download filename, visible label, and optional style variant. It renders a native anchor and owns no state. It performs no fetch, analytics, source repair, or new-tab substitution.

### ResumeAuthorityLabel

Input is only `evidence-backed` or `resume-sourced`. It renders the approved visible phrase and optional assistive description. It cannot accept `conflicted`; conflicted content never reaches presentation.

### ResumeContentGroup

Inputs are a section-owned heading and immutable ordered records. It renders semantic heading/list or article structures with concise summary, facts, authority, and existing safe evidence actions. Core content is visible without an accordion.

### Domain Section Bodies

- Identity: profile, current study, location, languages, interests, portrait, Identity resume action, and existing contact entry.
- Questions: current inquiry records only; no duplicated research results.
- Computational, Laboratory, and Data: accurate projects, dates, quantities, outcomes, and contribution boundaries.
- Academic: education, grades, subjects, IELTS, scholarships, and recognition.
- Evidence: current evidence collection references only; full archive remains U-04.
- Methods: technical, laboratory, communication, language, and transferable capabilities linked by claim ID.
- Fieldwork/Leadership: summits, competitions, mentoring, conservation, volunteering, debate, soccer, and badminton as one record per activity.
- Contact: unchanged local contact handoff and research-note route.

## Interaction Flows

### Resume download

1. Visitor reaches masthead or Identity action in logical focus order.
2. Anchor exposes `Download resume` and the same local PDF href/filename.
3. Browser performs native download; U-03 creates no runtime request client or tracking event.

### Evidence action

1. Visitor activates an existing evidence link on a resume-led record.
2. The existing validated action handles the canonical evidence source.
3. U-03 does not intercept it with a temporary modal; U-05 later supplies reviewed dialog behavior.

There are no forms, mutations, API calls, or component-owned business state in U-03.

## Accessibility and Responsive Rules

- Preserve one logical DOM sequence matching the canonical ten-section order.
- Use native headings, lists/articles, links, and download anchors.
- Authority cannot be communicated by color alone.
- Both actions have visible focus and at least the inherited 44 by 44 CSS-pixel target where their layout permits.
- Content groups reflow without reordering at 320, 768, 1280, and 1440 CSS pixels.
- At 200-percent zoom and increased text spacing, no claim, label, action, or evidence link overlaps, clips, or creates document-level horizontal scrolling.
- Decorative masthead marks remain hidden from assistive technology; semantic summaries remain unchanged from U-02.

## Failure Presentation

Data integrity failures do not produce partially rendered new content. The last verified active composition remains in place. Candidate diagnostics use stable generic codes outside the visitor layout. An invalid resume capability renders neither download action; it never renders an unsafe, disabled, or filesystem-backed link.

## Candidate Review Contract

The isolated candidate covers all ten sections and both resume actions in both themes at 320, 768, 1280, and 1440 CSS pixels. Review includes keyboard order, focus, 200-percent zoom, increased text spacing, overflow, category completeness, authority labels, evidence links, download identity, public privacy, U-04/U-05 absence, and representative screenshots. Examples, U03-P01 through U03-P10, source integrity, and recovery must pass before explicit activation approval.

## Requirement and Story Traceability

| Outcome | Components/rules |
| --- | --- |
| US-003 / FR-004, FR-005, FR-015, FR-016 | Shared DownloadableResume, two ResumeAction locations, privacy exclusion |
| US-004 / FR-013 through FR-017 | Identity and Methods groups, canonical mapping, authority labels |
| US-005 / FR-013, FR-014, FR-017 | Academic groups and field-level evidence reconciliation |
| US-006 / FR-013, FR-014, FR-017 | Computational/Laboratory/Data groups and non-invention rules |
| US-007 / FR-013, FR-014, FR-017 | Fieldwork/Leadership groups and one-record-per-activity rule |
| NFR-015 | Blocking unsupported-role/result/contribution validation |
| PBT-R08 | U03-P01 through U03-P10 plus complementary examples |

