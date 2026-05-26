---
artifact_id: DSP-CHANGELOG-001
module: DSP
artifact_type: change-log
version: 1
status: draft
owner: unassigned
created_on: 26-05-2026
last_updated: 26-05-2026
source_branch: dsp-exploration
target_branch: main
---

# DSP Exploration to Main - Detailed Change Description (v1)

This document describes all implemented changes currently present on `dsp-exploration` compared to `main`.

## Commit-Level Summary

### 1) `0b6e0c4` - Add DSP exploration artifact system scaffold

What was introduced:

- Initial DSP exploration structure under `docs/superpowers/dsp-exploration/`.
- Artifact index and versioning workflow to track brief, sitemap, userflow, usecases/edgecases, and design iteration artifacts.
- Prototype workspace reference under `src/prototypes/dsp/iter-01-dsp-discovery/`.

Why it matters:

- Establishes the source-of-truth process for DSP discovery outputs and keeps artifact evolution traceable.

### 2) `cda3016` - docs: complete DSP exploration artifacts

What was updated:

- Finalized documentation content for:
  - global brief
  - sitemap
  - userflow
  - usecases and edgecases
  - design iteration notes
  - index metadata alignment
- Updated prototype README context to point to the completed DSP exploration artifact set.

Why it matters:

- Consolidates decision context used to drive the first DSP prototype implementation and keeps requirements source-grounded.

### 3) `05be00f` - style: update global styles and layout; redirect home page to DSP reporting overview

What was implemented:

- Added route-based DSP prototype entry point:
  - `src/app/dsp-reporting/[tab]/page.tsx`
- Added full DSP prototype implementation module:
  - `src/prototypes/dsp/iter-01-dsp-discovery/model.ts`
  - `src/prototypes/dsp/iter-01-dsp-discovery/DspPrototype.tsx`
- Updated root app behavior:
  - `/` now redirects to `/dsp-reporting/overview`.
- Updated global visual setup:
  - Figtree font integration in app layout.
  - Updated global styling tokens and base app shell styling.

Why it matters:

- Delivers the first code-based DSP screen set across tabs with shared shell behavior, typed configuration, and static mock-data driven UI states.

## Functional and UI Changes Implemented

### A) DSP navigation and routes

- Added deep-linkable tab routes for:
  - `overview`
  - `conversion`
  - `consideration`
  - `awareness`
  - `loyalty`
- Added typed route guard behavior so unknown tab slugs resolve to `notFound()`.

### B) Shared DSP shell

- Implemented a persistent DSP shell with:
  - left nav rail
  - module breadcrumb
  - global filters
  - currency control
  - DSP tab navigation row
- Filter defaults implemented in code:
  - Seller preselected
  - Marketplace preselected
  - Product set to `All products`

### C) Controls and comparison context

- Implemented period and comparison URL query state parsing and routing.
- Implemented timeframe selector behavior for Overview context.
- Implemented display controls and table header chrome around the evolution area.

### D) Screen content implementation

- Implemented table-driven screen configurations in typed model definitions.
- Implemented retained KPI patterns requested in DSP source docs:
  - target-based metric bar treatment for `ROAS vs target` / `DPVR vs target`
  - retained `% of assisted sales` slim-bar treatment
- Implemented Awareness as shell-only state with pending-data messaging.
- Implemented Objective-first row semantics and tooltip support for interpretation aid.

### E) Visual system updates

- Applied Figtree as the UI font.
- Updated shell and table styling to align with the provided DSP conversion visual direction.
- Restricted Omny primary color emphasis to relevant KPI treatments and key accents.

## Files Added / Modified in Scope

### Added

- `docs/superpowers/dsp-exploration/briefs/brief-v1-25-05-2026-dsp-global-brief.md`
- `docs/superpowers/dsp-exploration/design-iterations/design-iteration-v1-25-05-2026-dsp-prototype-direction.md`
- `docs/superpowers/dsp-exploration/format-review/format-review-v1-25-05-2026-nonstandard-artifact-stub.md`
- `docs/superpowers/dsp-exploration/sitemaps/sitemap-v1-25-05-2026-dsp-module-information-architecture.md`
- `docs/superpowers/dsp-exploration/usecases-edgecases/usecase-edgecase-v1-25-05-2026-dsp-core-scenarios.md`
- `docs/superpowers/dsp-exploration/userflows/userflow-v1-25-05-2026-dsp-onboarding-and-iteration.md`
- `docs/superpowers/dsp-exploration/change-logs/change-log-v1-26-05-2026-dsp-exploration-to-main.md`
- `src/app/dsp-reporting/[tab]/page.tsx`
- `src/prototypes/dsp/iter-01-dsp-discovery/DspPrototype.tsx`
- `src/prototypes/dsp/iter-01-dsp-discovery/model.ts`
- `src/prototypes/dsp/iter-01-dsp-discovery/README.md`

### Modified

- `docs/superpowers/dsp-exploration/index.md`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`

### Tooling snapshot artifacts also present in branch history

- `.playwright-mcp/*` logs and snapshots generated during local browser verification steps.

## Verification Status

The current implementation line has been verified in-session with:

- `npm run lint`
- `npm run build`
- local route checks for all DSP tabs on localhost

