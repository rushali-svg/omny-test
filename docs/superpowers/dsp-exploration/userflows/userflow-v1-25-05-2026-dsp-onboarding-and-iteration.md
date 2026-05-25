---
artifact_id: DSP-USERFLOW-001
module: DSP
artifact_type: userflow
version: 1
status: draft
owner: unassigned
created_on: 25-05-2026
last_updated: 25-05-2026
linked_prototype_paths:
  - src/prototypes/dsp/iter-01-dsp-discovery
related_artifacts:
  - DSP-BRIEF-001
  - DSP-SITEMAP-001
---

# DSP Userflow (v1)

## Entry Points

- User enters DSP through `Advertising > DSP reporting`.
- Primary user intent is analytical: review DSP campaign performance, identify what is working, and decide what needs optimization.
- Users can start from any tab, but the expected default analytical sequence starts from `Overview` and then drills into funnel-phase tabs.

## Global Context Setup Flow

1. Open `Advertising > DSP reporting`.
2. Confirm global context in the shared shell:
   - seller
   - marketplace
   - product
3. Set currency selector to ensure performance interpretation uses the expected monetary context.
4. Set period granularity (`WTD`, `MTD`, `QTD`, `YTD`) and comparison granularity before interpreting trends.
5. Choose an entry tab:
   - `Overview` for top-down read
   - `Conversion`, `Consideration`, `Loyalty` for phase-specific read
   - `Awareness` only as a shell-level checkpoint until data becomes available

## Primary Analytical Flow

1. Start with `Overview` to read consolidation by funnel phase.
2. Validate objective-first interpretation:
   - check phase objective first
   - then check optimization KPI for that phase
3. Read top summary/recap, then read evolution table, then read breakdown views.
4. Use timeframe and comparison controls to test if the same pattern holds across periods.
5. Drill down into the relevant phase tab (`Conversion`, `Consideration`, or `Loyalty`) based on where the signal or issue appears.
6. In the phase tab, read objective -> efficiency -> business results -> supporting signals -> control KPIs.
7. Loop between `Overview` and phase tabs until the user reaches a decision-ready interpretation or identifies a data gap.

## Tab-Specific Flow Branches

### Overview

1. Enter `Overview`.
2. Read consolidation table per funnel phase.
3. Check objective and optimization KPI pairing for each phase.
4. Read summary/recap at top.
5. Read evolution table.
6. Read breakdown sections.
7. Use objective hover/breakdown behavior to understand what contributes to objective values.
8. Use timeframe selector because side-by-side timeframe layout is not available in this view.

### Conversion

1. Enter `Conversion`.
2. Read objective column first (`new customer` outcome).
3. Read purchase split (single purchases vs subscribe-and-save) to understand contribution balance.
4. Read efficiency with retained `ROAS vs target` treatment and cost-per-action context.
5. Read business results:
   - assisted sales vs spend
   - units sold
   - `% of assisted sales`
6. Read consideration signals, treating `ATC clicks` as a strong but lower-volume signal.
7. Read delivery quality with awareness that `eCPM` and visibility-rate placement was intentionally switched.
8. Read control KPIs as internal monitoring signals, not primary client-facing performance outcomes.

### Consideration

1. Enter `Consideration`.
2. Read objective column first (awareness/consideration-stage goal context, not purchase-first evaluation).
3. Read grouped consideration signals (fewer columns than conversion).
4. Interpret `DPVR` using the retained `ROAS vs target` visual treatment.
5. Read delivery quality with switched `eCPM` and `VTR` placement.
6. If consideration signals are strong but conversion outcomes are weak, branch to `Conversion` for lower-funnel interpretation.

### Awareness

1. Enter `Awareness` tab as part of full module navigation.
2. Confirm shell-level availability of tab and controls.
3. Stop KPI-level interpretation because awareness data content is pending.
4. Branch to `Overview` or another phase tab for actionable analysis.

### Loyalty

1. Enter `Loyalty`.
2. Read objective column first (`repurchase` framing).
3. Follow the same structural reading sequence as conversion:
   - efficiency
   - business results
   - supporting signals
   - control KPIs
4. Retain interpretation of `ROAS vs target` and switched delivery-quality placement (`eCPM`, `VTR`) as in other supported tabs.
5. Compare with conversion patterns when deciding whether an issue is acquisition-specific or repeat-purchase-specific.

## Interpretation Nuances from Client Inputs

- Objective-first reading is mandatory across phases, because users otherwise over-focus on ROAS in isolation.
- The target experience is intentionally a mix of current dashboard behavior and mini-app learning, not a direct copy of one source.
- `ROAS vs target` is retained where requested and should be interpreted as a primary efficiency checkpoint.
- `% assisted sales` is retained and should be read alongside assisted sales vs spend and units sold.
- `eCPM` and `VTR/visibility` position-switches are intentional; users should not treat placement change as a metric-definition change.
- `ATC clicks` can be low-volume but still high-signal for interpretation.
- Control KPIs are mainly for internal monitoring and campaign setup checks.
- `Overview` should be read in sequence: recap -> evolution -> breakdown.
- Objective hover/breakdown in overview helps users connect rollups to underlying KPI contributions.
- Overview timeframe selector is required because all timeframe comparisons cannot be displayed side by side in that layout.
- `Awareness` and future audience section remain constrained by unavailable audience data.

## Exit Paths

- Decision-ready:
  - user can state which funnel phase is underperforming
  - user can identify whether the issue is objective attainment, efficiency, business result, or delivery quality
  - user can propose campaign optimization direction based on phase evidence
- Needs follow-up:
  - pattern is visible but attribution is unclear
  - user needs deeper breakdown review or internal-team validation using control KPIs
- Blocked by unavailable data:
  - user needs awareness/audience insight not yet present in current data surface
  - user records dependency and continues with available phase analysis

## Visual Flow Map

```text
Advertising > DSP reporting
|
+-- Global context setup
|   +-- Set seller / marketplace / product
|   +-- Set currency
|   +-- Set period + comparison granularity
|   +-- Choose tab
|
+-- Overview (default analytical start)
|   +-- Read objective + optimization KPI by phase
|   +-- Read recap -> evolution -> breakdown
|   +-- Use timeframe selector + objective breakdown
|   +-- Branch by detected signal
|
+-- Conversion
|   +-- Objective first (new customer)
|   +-- Efficiency (ROAS vs target, cost/action)
|   +-- Business results (% assisted sales, units sold)
|   +-- Supporting signals (ATC clicks, delivery quality)
|   +-- Control KPI check
|
+-- Consideration
|   +-- Objective first
|   +-- Grouped consideration signals
|   +-- DPVR with ROAS-vs-target treatment
|   +-- Delivery quality check
|
+-- Awareness
|   +-- Shell only
|   +-- KPI content pending audience data
|
+-- Loyalty
|   +-- Objective first (repurchase)
|   +-- Conversion-like structure
|   +-- Efficiency + business results + signals + control checks
|
+-- Exit
    +-- Decision-ready
    +-- Needs follow-up
    +-- Blocked by unavailable data
```
