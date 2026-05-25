---
artifact_id: DSP-USECASE-EDGECASE-001
module: DSP
artifact_type: usecase-edgecase
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
  - DSP-USERFLOW-001
---

# DSP Usecases and Edgecases (v1)

## Core Usecases

### Scenario Schema

Every scenario below uses this structure:

- `ID`
- `User Goal`
- `Trigger`
- `Primary Path`
- `Decision/Interpretation Check`
- `Expected Outcome`
- `Related Tabs/Controls`
- `Prototype Priority`

### UC-01: Enter DSP and Set Global Analytical Context

- `ID`: `UC-01`
- `User Goal`: Enter DSP and set the correct business context before interpreting performance.
- `Trigger`: User opens `Advertising > DSP reporting`.
- `Primary Path`:
  1. Enter module from main navigation.
  2. Set seller, marketplace, and product filters.
  3. Set currency.
  4. Set period granularity and comparison granularity.
- `Decision/Interpretation Check`: User confirms they are reading the right scope and timeframe before KPI interpretation.
- `Expected Outcome`: Clean analytical context established for all tabs.
- `Related Tabs/Controls`: All tabs; seller, marketplace, product, currency, period granularity, comparison granularity.
- `Prototype Priority`: `P0`

### UC-02: Run Overview-First Health Check by Funnel Phase

- `ID`: `UC-02`
- `User Goal`: Get a top-down health snapshot before drilling down.
- `Trigger`: User lands on or navigates to `Overview`.
- `Primary Path`:
  1. Read consolidation by funnel phase.
  2. Read objective and optimization KPI for each phase.
  3. Read recap area, then evolution table, then breakdown views.
  4. Use timeframe selector to compare signal stability.
- `Decision/Interpretation Check`: Objective-first reading is respected instead of ROAS-only reading.
- `Expected Outcome`: User identifies which phase requires deeper investigation.
- `Related Tabs/Controls`: `Overview`, timeframe selector, comparison granularity, objective breakdown behavior.
- `Prototype Priority`: `P0`

### UC-03: Diagnose Conversion Performance and Efficiency

- `ID`: `UC-03`
- `User Goal`: Determine whether conversion performance issues are objective, efficiency, or business-result related.
- `Trigger`: Overview indicates conversion concern or user enters `Conversion` directly.
- `Primary Path`:
  1. Read objective column first.
  2. Read purchase split (single vs subscribe-and-save).
  3. Read `ROAS vs target` and cost-per-action.
  4. Read assisted sales vs spend, units sold, and `% assisted sales`.
  5. Read consideration signals including `ATC clicks`.
  6. Read delivery quality and control KPIs.
- `Decision/Interpretation Check`: User distinguishes high-signal low-volume behavior (`ATC clicks`) from weak/low-signal noise.
- `Expected Outcome`: Conversion diagnosis and candidate optimization direction.
- `Related Tabs/Controls`: `Conversion`, `ROAS vs target`, `% assisted sales`, `ATC clicks`, `eCPM`, visibility rate.
- `Prototype Priority`: `P0`

### UC-04: Diagnose Consideration Performance Signals

- `ID`: `UC-04`
- `User Goal`: Evaluate mid-funnel signal quality without over-indexing on purchase outcomes.
- `Trigger`: Overview indicates consideration-phase concern or user enters `Consideration`.
- `Primary Path`:
  1. Read objective first.
  2. Read grouped consideration signals.
  3. Read `DPVR` with `ROAS vs target` visual treatment.
  4. Read delivery quality with `eCPM` and `VTR`.
  5. Cross-check with conversion tab if needed.
- `Decision/Interpretation Check`: User validates whether weak conversion is preceded by weak consideration signals.
- `Expected Outcome`: User can separate mid-funnel signal weakness from lower-funnel conversion mechanics.
- `Related Tabs/Controls`: `Consideration`, `DPVR`, `ROAS vs target` treatment, `eCPM`, `VTR`.
- `Prototype Priority`: `P1`

### UC-05: Diagnose Loyalty / Repurchase Performance

- `ID`: `UC-05`
- `User Goal`: Assess repurchase performance using loyalty-specific objective framing.
- `Trigger`: User enters `Loyalty` from overview findings or direct navigation.
- `Primary Path`:
  1. Read objective first with repurchase framing.
  2. Follow conversion-like structure (efficiency -> business results -> supporting signals -> control KPIs).
  3. Compare loyalty patterns to conversion patterns.
- `Decision/Interpretation Check`: User confirms whether issue is acquisition-specific or repeat-purchase-specific.
- `Expected Outcome`: Loyalty diagnosis with repurchase-centric interpretation.
- `Related Tabs/Controls`: `Loyalty`, `ROAS vs target`, `eCPM`, `VTR`.
- `Prototype Priority`: `P1`

### UC-06: Validate Trends Across Period and Comparison Modes

- `ID`: `UC-06`
- `User Goal`: Confirm that observed patterns are consistent across selected periods and comparisons.
- `Trigger`: User wants confidence before actioning insights.
- `Primary Path`:
  1. Keep scope filters fixed.
  2. Switch period granularity (`WTD`, `MTD`, `QTD`, `YTD`).
  3. Switch comparison granularity.
  4. Re-read overview and relevant phase tab.
- `Decision/Interpretation Check`: User validates whether signal persists or is period/comparison artifact.
- `Expected Outcome`: Higher-confidence analytical conclusion.
- `Related Tabs/Controls`: All tabs, period selector, comparison switcher.
- `Prototype Priority`: `P0`

### UC-07: Synthesize Finding into Optimization Direction

- `ID`: `UC-07`
- `User Goal`: Turn tab-level readings into actionable optimization direction.
- `Trigger`: User has completed overview and at least one phase drill-down.
- `Primary Path`:
  1. Summarize phase-level objective attainment.
  2. Summarize efficiency and business-result alignment.
  3. Include supporting signal and control KPI context.
  4. Flag any blocked insight due to unavailable awareness/audience data.
- `Decision/Interpretation Check`: User can state if next step is decision-ready, needs follow-up, or blocked.
- `Expected Outcome`: Action-ready insight package for campaign decision-making.
- `Related Tabs/Controls`: `Overview`, `Conversion`, `Consideration`, `Loyalty`, optionally `Awareness`.
- `Prototype Priority`: `P0`

## Edgecases

### Cross-Screen / Control Edgecases

### EC-01: Filters Unset or Misaligned Context Causes Misread

- `ID`: `EC-01`
- `User Goal`: Avoid interpreting DSP KPIs in the wrong business scope.
- `Trigger`: Filters are partially set, stale, or mismatched to intended scope.
- `Primary Path`: User reads KPIs before validating seller/marketplace/product.
- `Decision/Interpretation Check`: User catches mismatch before conclusion.
- `Expected Outcome`: User resets filters and restarts interpretation.
- `Related Tabs/Controls`: All tabs; seller, marketplace, product filters.
- `Prototype Priority`: `P0`

### EC-02: Currency Context Mismatch vs Stakeholder Expectation

- `ID`: `EC-02`
- `User Goal`: Ensure monetary KPI interpretation matches stakeholder reporting currency.
- `Trigger`: Currency selector is not aligned with expected reporting context.
- `Primary Path`: User interprets spend/efficiency with wrong currency.
- `Decision/Interpretation Check`: User verifies currency before finalizing insight.
- `Expected Outcome`: Re-interpretation under corrected currency.
- `Related Tabs/Controls`: All tabs; currency selector.
- `Prototype Priority`: `P1`

### EC-03: Period/Comparison Choice Produces Misleading Trend Confidence

- `ID`: `EC-03`
- `User Goal`: Avoid overconfidence from one period/comparison view.
- `Trigger`: Insight appears strong in one selector state but weak in another.
- `Primary Path`: User checks only one granularity/comparison state.
- `Decision/Interpretation Check`: User cross-validates across selector states.
- `Expected Outcome`: Either stronger confidence or explicit uncertainty note.
- `Related Tabs/Controls`: All tabs; period selector, comparison switcher.
- `Prototype Priority`: `P0`

### EC-04: ROAS Interpreted Without Objective Context

- `ID`: `EC-04`
- `User Goal`: Keep objective-first reading discipline.
- `Trigger`: User jumps to ROAS values before reading objective.
- `Primary Path`: Efficiency interpreted in isolation.
- `Decision/Interpretation Check`: User re-anchors on objective then re-reads efficiency.
- `Expected Outcome`: Correct phase-specific interpretation restored.
- `Related Tabs/Controls`: `Overview`, `Conversion`, `Consideration`, `Loyalty`; objective + optimization KPI.
- `Prototype Priority`: `P0`

### EC-11: Awareness Tab Accessed but KPI Content Unavailable

- `ID`: `EC-11`
- `User Goal`: Continue analysis without inventing unavailable awareness insight.
- `Trigger`: User opens `Awareness`.
- `Primary Path`: Tab shell is available but KPI content is pending.
- `Decision/Interpretation Check`: User recognizes unavailable data boundary.
- `Expected Outcome`: User branches to available tabs and logs dependency.
- `Related Tabs/Controls`: `Awareness`.
- `Prototype Priority`: `P0`

### EC-12: Audience Section Dependency Blocks Deeper Awareness Interpretation

- `ID`: `EC-12`
- `User Goal`: Identify when insight is blocked by planned-but-unavailable audience data.
- `Trigger`: User needs audience-level explanation for awareness behavior.
- `Primary Path`: Attempt to derive awareness conclusion from missing audience section.
- `Decision/Interpretation Check`: User marks blocked path rather than forcing conclusion.
- `Expected Outcome`: Deferred analysis status with dependency note.
- `Related Tabs/Controls`: `Awareness`; future audience section.
- `Prototype Priority`: `P1`

### Tab-Specific Data Interpretation Edgecases

### EC-05: Subscribe-and-Save Signal is Overshadowed by Single Purchases

- `ID`: `EC-05`
- `User Goal`: Preserve visibility of dual purchase signals in conversion.
- `Trigger`: Single purchases dominate visual reading.
- `Primary Path`: User under-reads subscribe-and-save behavior.
- `Decision/Interpretation Check`: User checks split explicitly before concluding.
- `Expected Outcome`: Balanced conversion interpretation.
- `Related Tabs/Controls`: `Conversion`; purchase split.
- `Prototype Priority`: `P1`

### EC-06: `% Assisted Sales` Needed but Interpretation Conflicts with Data Context

- `ID`: `EC-06`
- `User Goal`: Use `% assisted sales` responsibly despite known data-model complexity.
- `Trigger`: `% assisted sales` insight conflicts with other business-result signals.
- `Primary Path`: User treats `% assisted sales` as standalone truth.
- `Decision/Interpretation Check`: User cross-checks with assisted sales vs spend and units sold.
- `Expected Outcome`: Contextualized assisted-sales interpretation.
- `Related Tabs/Controls`: `Conversion`, `Loyalty`; `% assisted sales`, assisted sales vs spend, units sold.
- `Prototype Priority`: `P1`

### EC-07: `ATC clicks` Low Volume is Incorrectly Dismissed

- `ID`: `EC-07`
- `User Goal`: Recognize low-volume but strong-signal behavior.
- `Trigger`: `ATC clicks` appears small relative to other signals.
- `Primary Path`: User discards ATC signal due to volume.
- `Decision/Interpretation Check`: User treats ATC as high-signal checkpoint per source nuance.
- `Expected Outcome`: Better interpretation of conversion/consideration linkage.
- `Related Tabs/Controls`: `Conversion`, `Consideration`; `ATC clicks`.
- `Prototype Priority`: `P1`

### EC-08: `eCPM` / `VTR` Position Switch is Misread as Metric Definition Change

- `ID`: `EC-08`
- `User Goal`: Avoid semantic confusion caused by layout changes.
- `Trigger`: User sees switched metric positions across views/iterations.
- `Primary Path`: User assumes metric meaning changed with placement.
- `Decision/Interpretation Check`: User confirms metric definition unchanged; only placement changed.
- `Expected Outcome`: Correct delivery-quality interpretation.
- `Related Tabs/Controls`: `Conversion`, `Consideration`, `Loyalty`; `eCPM`, `VTR`, visibility rate.
- `Prototype Priority`: `P1`

### EC-09: Control KPIs are Overweighted in Client-Facing Narrative

- `ID`: `EC-09`
- `User Goal`: Keep control KPIs as monitoring context, not primary success proof.
- `Trigger`: Control metrics look strong while objective/business outcomes are weak.
- `Primary Path`: User leads with control metrics.
- `Decision/Interpretation Check`: User re-prioritizes objective, efficiency, and business results first.
- `Expected Outcome`: More accurate stakeholder narrative.
- `Related Tabs/Controls`: `Conversion`, `Loyalty`; control KPI groups.
- `Prototype Priority`: `P2`

### EC-10: Overview Needs Objective Tooltip Decomposition to Explain Values

- `ID`: `EC-10`
- `User Goal`: Explain consolidated objective values with supporting detail.
- `Trigger`: Summary numbers look counterintuitive or hard to trust.
- `Primary Path`: User reads only top-level values.
- `Decision/Interpretation Check`: User uses objective hover/breakdown decomposition.
- `Expected Outcome`: Improved trust and interpretability of overview rollups.
- `Related Tabs/Controls`: `Overview`; objective breakdown behavior.
- `Prototype Priority`: `P1`

## Handling Notes

- Use this document as scenario input when building prototype states and navigation logic.
- For every implemented screen state, map at least one core usecase and one relevant edgecase.
- When a path is blocked by unavailable audience/awareness data, represent that state explicitly instead of inferring missing KPI behavior.
- Keep scenario coverage source-grounded:
  - explicit from brief/sitemap/userflow/Notion
  - implied only by existing controls and documented constraints
  - avoid speculative KPI definitions for unavailable sections

## Visual Scenario Map

```text
Advertising > DSP reporting
|
+-- Context setup
|   +-- Set filters
|   +-- Set currency
|   +-- Set period/comparison
|
+-- Overview-first analysis (UC-02)
|   +-- Objective + optimization KPI by phase
|   +-- Recap -> evolution -> breakdown
|   +-- Branch to phase diagnosis
|
+-- Conversion diagnosis (UC-03)
|   +-- Objective -> efficiency -> business results -> signals -> control KPIs
|   +-- Edge checks: EC-05, EC-06, EC-07, EC-08, EC-09
|
+-- Consideration diagnosis (UC-04)
|   +-- Objective -> grouped signals -> delivery quality
|   +-- Edge checks: EC-04, EC-07, EC-08
|
+-- Loyalty diagnosis (UC-05)
|   +-- Repurchase objective -> conversion-like structure
|   +-- Edge checks: EC-06, EC-08, EC-09
|
+-- Awareness path
|   +-- Shell only (EC-11)
|   +-- Audience dependency block (EC-12)
|
+-- Cross-period validation (UC-06)
|   +-- Edge checks: EC-01, EC-02, EC-03
|
+-- Synthesis and outcome (UC-07)
    +-- Decision-ready
    +-- Needs follow-up
    +-- Blocked by unavailable data
```
