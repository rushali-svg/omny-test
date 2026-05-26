---
artifact_id: DSP-CHANGELOG-001
module: DSP
artifact_type: change-log
version: 1
status: draft
owner: unassigned
created_on: 26-05-2026
last_updated: 26-05-2026
last_extended: 26-05-2026 (section 4 / section F)
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

### 4) feat: in-page version switcher, v2 Budget Cockpit dashboard, and floating comment widget

What was implemented (all inside `src/prototypes/dsp/iter-01-dsp-discovery/DspPrototype.tsx`):

- **In-page version switcher.** Added a client-side `useState` toggle inside `DspPrototype` that swaps the rendered design between two versions without changing routes. A `VERSIONS` const declares the available versions and which one carries the `latest` flag. The existing prototype is wrapped in a `version === "v1"` branch; the new design lives in a `version === "v2"` branch.
- **Floating switcher pill.** A compact `VersionSwitcher` component renders as a fixed pill anchored to the bottom-center of the viewport. Active state uses dark fill, inactive is muted, and the `latest` option carries a peach badge. Default landing version is v2.
- **v2 Budget Cockpit dashboard.** Added a complete second design (`DashboardV2`) that visually replicates an exported Budget Cockpit screen:
  - Dark left rail with main nav and utility icon groups.
  - Top header bar with `Dashboard` title, three filter chips (with leading swatches/flag and purple count badges), and a currency control.
  - Tab bar: Performance / Advertising / Listing / Profit / Budget Cockpit (active).
  - Revenue strip: four cards (Yesterday, WTD, MTD, YTD) with primary value plus two comparison rows each.
  - Evolution panel: grouped column headers (Performance / Supply / Listing / Advertising) underlined in their group color, eight data rows with progress bars, heat-mapped CTR/CVR cells, blue PPC bars, green/red buybox dots, and TACOS pills.
  - Docked Breakdown panel: Seller/Marketplace/Product tabs, date range pill, five product rows with thumbnails, plus a TOTAL row at the bottom.
  - A small set of v2-only cell primitives (`CellBar`, `DaysBar`, `LostRevCell`, `HeatCell`, `PpcCell`, `BuyboxCell`, `TacosPill`, `AsinSoldCell`, `SelectButton`) and inline SVG icons (`DashIcon`, `Caret`, `InfoIcon`, `DownloadIcon`, `ChartLineIcon`, `MagnifierIcon`, `CalendarIcon`, `MinIcon`, `SwapIcon`, `ExpandIcon`).
- **Keyboard-triggered comment widget (v2 only).** Added `CommentWidget` mounted inside `DashboardV2`. Three-state machine controlled by keyboard and clicks:
  - Pressing `C` toggles the widget between hidden and visible.
  - Visible state renders a purple chat-bubble FAB in the bottom-right.
  - Hovering the FAB reveals a small `×` that removes the widget entirely.
  - Clicking the FAB opens a comment card with a `from rishabh` note explaining v2's provenance (PDF export → AI rebuild).
  - The card's `×` collapses back to the FAB without removing it.
  - The `keydown` listener is mounted via `useEffect` and ignores keypresses when focus is on an `INPUT`, `TEXTAREA`, or contenteditable element. Because the widget is mounted inside `DashboardV2`, it unmounts cleanly when the user switches back to v1, so the `C` shortcut is automatically scoped to v2.
- Added `useEffect` to the `react` import to support the keyboard listener.

Why it matters:

- Enables side-by-side iteration on the DSP design without forking routes or files. v1 stays as a stable reference while v2 explores a different layout direction (Budget Cockpit).
- The bottom-anchored switcher keeps version selection out of the way of the design itself.
- The keyboard-summoned comment widget gives the design a built-in authorship/intent note that is invisible by default and easy to surface, so the prototype documents itself when shared.

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

### F) Design versioning and in-design annotation

- Added an in-page version switcher (v1 / v2) backed by client state inside `DspPrototype`, so versions can coexist without routing changes.
- Added a second design version (`DashboardV2`) implementing a Budget Cockpit dashboard reference, with grouped-column evolution table and a docked breakdown panel.
- Added a keyboard-triggered (`C`) floating comment widget that surfaces a "from rishabh" provenance note over v2. The widget is scoped to v2 by being mounted inside the v2 component subtree.

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
- `docs/superpowers/dsp-exploration/change-logs/change-log-v1-26-05-2026-dsp-exploration-to-main.md` (extended with section 4 and section F)
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/prototypes/dsp/iter-01-dsp-discovery/DspPrototype.tsx` (added version switcher, `DashboardV2`, and `CommentWidget`)

### Tooling snapshot artifacts also present in branch history

- `.playwright-mcp/*` logs and snapshots generated during local browser verification steps.

## Verification Status

The current implementation line has been verified in-session with:

- `npm run lint`
- `npm run build`
- local route checks for all DSP tabs on localhost

