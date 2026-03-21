# Stage 1 Desktop Fidelity Design

## Summary
This design documents a strict desktop-only fidelity pass for the Stage 1 task-board page. The goal is to align the React implementation with the approved `.pen` desktop screen as closely as possible without changing the product scope, component contracts, or data flow.

## Source of Truth
- Pencil file: `stage-01-react-pages/design_docs/task-board-ui.pen`
- Design note: `stage-01-react-pages/design_docs/2026-03-21-task-board-ui-design.md`
- Screenshot reference: `stage-01-react-pages/design_docs/2Re4m.png`

## Goal
Apply the measured values from the desktop `.pen` screen to the React implementation so the layout, spacing, typography, borders, and pills are much closer to the approved design.

## Non-Goals
- Add any new feature or interaction
- Change component contracts for future requirements
- Build a reusable design-token system beyond what this page needs
- Optimize mobile behavior beyond preventing obvious breakage

## Measured Desktop Values
The `.pen` document provides the target desktop geometry and styling cues:

- Page frame width: `1200`
- Page frame padding: `40`
- Main section gap: `24`
- Header panel padding: `28`
- Header corner radius: `16`
- Summary row gap: `16`
- Summary card padding: `24`
- Filter panel padding: `20`
- Filter shell gap: `4`
- Task section padding: `24`
- Task section gap: `16`
- Task item padding: `20`
- Task item gap: `24`
- Main border color: `#CBCCC9`
- Page background: `#F2F3F0`

Typography from the `.pen`:
- Eyebrow: `JetBrains Mono`, `13`, weight `500`
- Main title: `JetBrains Mono`, `36`, weight `600`
- Description: `Geist`, `15`
- Summary label: `Geist`, `14`, weight `500`
- Summary value: `JetBrains Mono`, `36`, weight `600`
- Summary note: `Geist`, `13`
- Filter text: `Geist`, `13`
- Filter tabs: `Geist`, `14`, weight `500`
- List title: `JetBrains Mono`, `24`, weight `600`
- Task title: `JetBrains Mono`, `18`, weight `600`
- Task description: `Geist`, `14`
- Status badge text: `JetBrains Mono`, `14`

## Implementation Approach
### Option A: Strict desktop fidelity
Use the measured `.pen` values directly in the page CSS and only make the smallest JSX structure adjustments required to match the screen hierarchy. This is the approved approach.

### Option B: Hybrid fidelity with more responsive flexibility
Keep some looser CSS values and favor more fluid scaling. This was rejected because the user explicitly wants to inspect what near pixel-matched code looks like.

## Affected Files
- Modify: `stage-01-react-pages/app/src/App.css`
- Modify: `stage-01-react-pages/app/src/index.css`
- Possibly modify: `stage-01-react-pages/app/src/components/*`
- Create: `stage-01-react-pages/docs/dev_log/Loop1-高保真实战.md`

## Validation Strategy
There is no existing visual regression harness in this project, so this task will be verified by:
- matching the measured `.pen` values in CSS
- comparing against the screenshot reference
- ensuring the app still builds cleanly with `npm run build`

