---
artifact_id: DSP-DESIGN-PLAN-001
module: DSP
artifact_type: design-plan
version: 1
status: draft
owner: unassigned
created_on: 26-05-2026
last_updated: 26-05-2026
linked_prototype_paths:
  - src/prototypes/dsp/iter-01-dsp-discovery
related_artifacts:
  - DSP-BRIEF-001
  - DSP-SITEMAP-001
  - DSP-USERFLOW-001
  - DSP-USECASE-EDGECASE-001
  - DSP-DESIGN-ITER-001
  - DSP-CHANGELOG-001
---

# DSP Prototype v1 Design Plan (Iteration 01)

This document captures the design plan for the first code-based DSP Reporting prototype. It is intended to be the stable context and starting point for future iterations (v2, v3, ...) so that each version can be traced back to explicit scope decisions and source-of-truth requirements.

## Goal (v1)

Build a first, navigable DSP Reporting surface that:

- anchors interpretation to **objective-first reading** (not ROAS-first)
- retains the explicitly required KPI treatments (`ROAS vs target`, `% of assisted sales`)
- provides a shared shell (filters, tabs, period/comparison controls) across tabs
- uses static mock data to validate layout, information hierarchy, and tooltip clarity

This v1 is a **design-direction prototype**, not a data-integrated product build.

## Inputs / Source of Truth

In-repo artifacts:

- Global brief: `docs/superpowers/dsp-exploration/briefs/brief-v1-25-05-2026-dsp-global-brief.md`
- Sitemap / IA: `docs/superpowers/dsp-exploration/sitemaps/sitemap-v1-25-05-2026-dsp-module-information-architecture.md`
- Userflow: `docs/superpowers/dsp-exploration/userflows/userflow-v1-25-05-2026-dsp-onboarding-and-iteration.md`
- Usecases & edgecases: `docs/superpowers/dsp-exploration/usecases-edgecases/usecase-edgecase-v1-25-05-2026-dsp-core-scenarios.md`
- Design iteration notes (historical): `docs/superpowers/dsp-exploration/design-iterations/design-iteration-v1-25-05-2026-dsp-prototype-direction.md`
- Change log (scope/implementation delta): `docs/superpowers/dsp-exploration/change-logs/change-log-v1-26-05-2026-dsp-exploration-to-main.md`

External (not stored in this repo):

- Notion: `DSP Reporting v2` (`https://www.notion.so/get-omny/DSP-Reporting-v2-364cf10473ea809e845ddc8a60c88915`)
- Provided conversion screen TS export (visual baseline): `C:\Users\LENOVO\Downloads\DSP 01\src\imports\DspReportingConversion\DspReportingConversion.tsx`

## Scope (v1)

Tabs included:

- `Overview`
- `Conversion`
- `Consideration`
- `Awareness` (shell only)
- `Loyalty`

Explicit exclusions (v1):

- Breakdown-by table designs (deferred)
- Any KPI sets not explicitly named in the brief/sitemap/usecases
- Mobile optimization (desktop-first prototype only)
- Live data wiring, persistence, backend integration

## Cross-Screen Rules (From Source Docs)

Objective-first reading discipline:

- The first analytical column and the first mental model on each screen should be **the objective** for the phase, to prevent ROAS-only reading.

Retained KPI treatments:

- Where requested, `ROAS vs target` must be shown using the retained target-marker bar treatment (not plain ROAS).
- Where requested, `% of assisted sales` must be retained as a column with the slim-bar visualization.

Metric placement switches:

- Where requested, `eCPM` and `visibility rate / VTR` switch positions. Only placement changes; KPI definition does not.

Global context defaults:

- Global filters are preselected for `Seller` and `Marketplace`.
- `Product` is set to `All products` (no product filtering applied).
- Currency selector is visible (default used in prototype is `EUR`).

## UI Direction (v1)

This v1 follows the existing Omny platform visual direction shown in the provided references:

- Compact, table-centric analytics layout
- Thin borders, light neutral surfaces, small-radius controls
- Figtree typography

Color rule:

- Omny primary color `#FEC9AA` is used only for the primary KPI emphasis (and key accents aligned with retained KPI treatments), not as a global brand wash.

## Interaction Notes

Tooltips:

- Include tooltips for non-obvious columns and retained treatments, especially:
  - Objective (and objective breakdown behavior on Overview)
  - `ROAS vs target` / `DPVR vs target`
  - `% of assisted sales`
  - Assisted sales vs spend
  - `ATC clicks` (low-volume but high-signal nuance)
  - Delivery quality KPIs (`eCPM`, `visibility rate`, `VTR`)
  - Control KPIs (explicitly secondary narrative)

Awareness:

- The Awareness tab must exist in IA/navigation but must not invent KPI content.
- Render an explicit "pending audience data" empty/shell state with guidance to branch to active tabs.

## Implementation Mapping (Current Prototype)

Routes:

- `src/app/dsp-reporting/[tab]/page.tsx` provides the tab routes and query parsing.
- `/` redirects to `/dsp-reporting/overview` via `src/app/page.tsx`.

Prototype module:

- UI composition: `src/prototypes/dsp/iter-01-dsp-discovery/DspPrototype.tsx`
- Typed screen configuration + mock data: `src/prototypes/dsp/iter-01-dsp-discovery/model.ts`
- Prototype context index: `src/prototypes/dsp/iter-01-dsp-discovery/README.md`

URL state (v1):

- `period` query param supports `WTD`, `MTD`, `QTD`, `YTD`.
- `comparison` query param controls comparison mode.
- `timeframe` query param is used on Overview where applicable.

## QA Checklist (v1)

Navigation:

- Each tab route resolves:
  - `/dsp-reporting/overview`
  - `/dsp-reporting/conversion`
  - `/dsp-reporting/consideration`
  - `/dsp-reporting/awareness`
  - `/dsp-reporting/loyalty`

Shell:

- Seller and Marketplace appear preselected.
- Product shows `All products`.
- Currency selector renders (default `EUR`).
- Period and comparison controls render consistently across tabs.

Retained visuals:

- `ROAS vs target` treatment is present where required.
- `% of assisted sales` visualization is present where required.
- Awareness displays shell-only pending-data messaging.

No scope creep:

- No breakdown-by tables appear in any tab.
- No additional KPI families beyond those explicitly named in the source docs.
