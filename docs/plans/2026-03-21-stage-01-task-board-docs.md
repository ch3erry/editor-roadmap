# Stage 1 Task Board Docs Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Finalize the Stage 1 documentation so the learner can start REQ-01 from a clear, UX-backed React task-board spec.

**Architecture:** This work updates documentation only. The Stage 1 overview becomes the source of truth for the chosen task-board shape and recommended file layout, while the REQ-01 document becomes an implementation-ready requirement tied to the approved Pencil design.

**Tech Stack:** Markdown documentation, Vite, React, TypeScript, Pencil design assets

---

### Task 1: Record the Stage 1 documentation scope

**Files:**
- Create: `docs/plans/2026-03-21-stage-01-task-board-docs.md`

**Step 1: Capture the approved scope**

Record that Stage 1 uses the approved task-board UI and that REQ-01 starts from a zero-to-running Vite scaffold.

**Step 2: Verify the plan file exists**

Run: `rg --files docs/plans`
Expected: the new Stage 1 docs plan appears in the output

### Task 2: Update the Stage 1 overview

**Files:**
- Modify: `stage-01-react-pages/docs/stage-overview.md`

**Step 1: Replace open-ended placeholders with approved direction**

Document the chosen task-board product shape, the UX source files, the stage goals, and the recommended file structure.

**Step 2: Verify the overview is readable**

Run: `sed -n '1,260p' stage-01-react-pages/docs/stage-overview.md`
Expected: the file includes design references, recommended structure, and a concrete requirement sequence

### Task 3: Expand REQ-01 into a build-ready requirement

**Files:**
- Modify: `stage-01-react-pages/docs/requirements/REQ-01.md`

**Step 1: Add concrete startup and implementation details**

Turn REQ-01 into a requirement the learner can execute without guessing: startup commands, required components, static data boundaries, and acceptance criteria.

**Step 2: Verify the requirement spec**

Run: `sed -n '1,320p' stage-01-react-pages/docs/requirements/REQ-01.md`
Expected: the file includes startup steps, the exact UI sections, file boundaries, and non-goals

### Task 4: Final verification

**Files:**
- Verify only

**Step 1: Check repository status**

Run: `git status --short`
Expected: the new plan file and Stage 1 documentation changes are listed

**Step 2: Confirm the design assets are still referenced correctly**

Run: `find stage-01-react-pages/design_docs -maxdepth 2 -type f | sort`
Expected: the `.pen` file and its companion design note remain present

