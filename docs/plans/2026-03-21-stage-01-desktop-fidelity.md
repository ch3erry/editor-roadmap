# Stage 1 Desktop Fidelity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the Stage 1 React task-board UI with the approved desktop `.pen` design using measured layout, spacing, and typography values.

**Architecture:** The existing component contracts stay unchanged. The fidelity pass focuses on CSS and small JSX structure adjustments so the desktop implementation matches the approved `.pen` screen more closely. Because the project does not have a visual regression harness, verification uses measured design values plus a clean production build.

**Tech Stack:** React, TypeScript, CSS, Pencil design assets

---

### Task 1: Document the approved desktop fidelity pass

**Files:**
- Create: `docs/plans/2026-03-21-stage-01-desktop-fidelity-design.md`
- Create: `docs/plans/2026-03-21-stage-01-desktop-fidelity.md`

**Step 1: Record the approved scope**

Write down the measured `.pen` values, the source of truth files, the chosen implementation approach, and the validation strategy.

**Step 2: Verify the plan files exist**

Run: `rg --files docs/plans`
Expected: both desktop fidelity plan files appear

### Task 2: Apply measured desktop values

**Files:**
- Modify: `stage-01-react-pages/app/src/App.css`
- Modify: `stage-01-react-pages/app/src/index.css`
- Modify as needed: `stage-01-react-pages/app/src/components/*.tsx`

**Step 1: Align page-level geometry**

Match desktop page width, outer padding, panel radius, panel border, and section gaps to the `.pen` values.

**Step 2: Align section internals**

Adjust header, summary cards, filter shell, task section, task item padding, and typography so they follow the measured `.pen` values.

**Step 3: Keep component contracts unchanged**

Do not introduce new props or new behavior while doing the fidelity pass.

### Task 3: Write the dev log

**Files:**
- Create: `stage-01-react-pages/docs/dev_log/Loop1-高保真实战.md`

**Step 1: Explain the changes**

Document the measured design values, what changed in CSS, and what trade-offs remain.

**Step 2: Explain the development advice**

Record how to use `.pen` measurements in future high-fidelity tasks and what should be prioritized first.

### Task 4: Verify the result

**Files:**
- Verify only

**Step 1: Run the production build**

Run: `npm run build`
Expected: TypeScript and Vite build succeed with no errors

**Step 2: Inspect the modified files**

Run: `git diff -- stage-01-react-pages/app/src`
Expected: only the intended fidelity changes appear
