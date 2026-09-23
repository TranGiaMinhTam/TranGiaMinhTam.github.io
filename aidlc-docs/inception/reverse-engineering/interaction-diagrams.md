# Interaction Diagrams

## Theme Selection

```mermaid
sequenceDiagram
    participant Visitor
    participant Control as ThemeControl
    participant Hook as usePortfolioTheme
    participant Root as Document root
    participant Storage as Local storage
    Visitor->>Control: Activate theme button
    Control->>Hook: Toggle theme
    Hook->>Root: Set data-theme
    Hook->>Storage: Persist explicit preference
    Root-->>Visitor: Repaint tokenized interface
```

Text alternative: activating the theme button toggles the theme hook, updates the root theme attribute, persists the preference when possible, and repaints the tokenized interface.

## Section Navigation

```mermaid
sequenceDiagram
    participant Visitor
    participant Navigation as LocusNavigator
    participant Progress as useSectionProgress
    participant Browser
    participant Section
    Visitor->>Navigation: Choose a section
    Navigation->>Progress: Navigate by section identifier
    Progress->>Browser: Update hash and history
    Progress->>Section: Scroll and focus target
    Section-->>Progress: Report visibility
    Progress-->>Visitor: Update active marker and progress
```

Text alternative: choosing a section updates the browser hash, moves to the registered target, and uses visibility observations to refresh the active navigation marker and progress.

## Relationship Summary Rendering

```mermaid
sequenceDiagram
    participant Model as Domain model
    participant Visual as Primary visualization
    participant Summary as RelationshipSummary
    participant Visitor
    Model->>Visual: Supply verified relationships
    Model->>Summary: Supply equivalent semantic rows
    Visual-->>Visitor: Render primary content
    Summary-->>Visitor: Render table alternative
```

Text alternative: the domain model supplies the same relationships to primary visual content and a semantic table alternative. Both are currently visible.
