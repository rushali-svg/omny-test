---
artifact_id: DSP-BRIEF-001
module: DSP
artifact_type: brief
version: 1
status: draft
owner: unassigned
created_on: 25-05-2026
last_updated: 25-05-2026
linked_prototype_paths:
  - src/prototypes/dsp/iter-01-dsp-discovery
related_artifacts:
  - DSP-SITEMAP-001
  - DSP-USERFLOW-001
---

# DSP Global Brief (v1)

## Objective

Define the canonical DSP design foundation for future sitemap, userflow, usecase, and design-iteration artifacts. This brief captures only the requirements and explicit constraints described in the May 18 meeting transcript and the `DSP Reporting v2` Notion page.

## Source Inputs

- `C:\Users\LENOVO\Downloads\Omny_Daily_UXUI_May18_Transcript.md`
- Notion page: `[DSP] Reporting v2` (`https://www.notion.so/364cf10473ea809e845ddc8a60c88915`)

This brief excludes unrelated meeting topics and ignores non-DSP discussion in the transcript.

## Module Scope

The DSP reporting surface described in the source inputs includes these reporting areas:

- `Conversion`
- `Consideration`
- `Loyalty`
- `Overview`

The source inputs also identify these incomplete or future areas:

- `Awareness` is not done yet because it is mostly based on audience data that is not available yet.
- An additional `Audience` section is expected later in the pipeline, but its data is not available yet.

## Cross-Screen Non-Negotiables

- The first column should present the campaign objective for the funnel phase because customers otherwise focus only on ROAS. The objective changes by funnel step.
- The new DSP reporting version should be a mix of the current design and the mini-app version rather than a direct copy of only one source.
- Where explicitly requested, the `ROAS vs target` treatment from the current design should be retained instead of a plain `ROAS` column.
- Where explicitly requested, the `% of assisted sales` column should be retained.
- `eCPM` and `visibility rate / VTR` should switch positions where this is explicitly requested.
- The `Overview` tab should include a top summary or recap area and then continue with an evolution table and breakdown views.
- The `Overview` tab should use a timeframe selector because this view cannot show all timeframes side by side the way the current dashboard does.

## Screen-by-Screen Requirements

### Conversion

**Purpose**

Show the conversion-stage DSP dashboard with the goal of getting new customers.

**KPI groups and columns mentioned in the sources**

- Objective column first
- Purchase count split into single purchases and subscribe-and-save purchases
- `ROAS vs target`
- Cost per action for new-to-brand conversion
- Assisted sales versus spend
- Units sold
- `% of assisted sales` out of total revenue
- Consideration signals, including `ATC clicks`
- Delivery quality, including `eCPM`, visibility rate, and impressions
- Control KPIs used to monitor whether the campaign is set properly

**Explicit carry-overs from current design vs mini-app**

- The target state is the mini-app version with these retained elements from the current design:
  - keep the current `ROAS vs target` column instead of plain `ROAS`
  - keep the `% of assisted sales` column

**Layout and interaction requirements explicitly stated**

- The objective column comes first.
- The purchase representation uses two colors because it separates single purchases from subscribe-and-save purchases.
- `ATC clicks` is called out as a strong signal even if volume is low.
- `eCPM` and visibility rate should switch positions.

**Future gaps and dependencies explicitly stated**

- The source notes difficulty because subscribe-and-save volume is not always visible compared with single purchases.
- Control KPIs are more for the internal team than for the client.
- The future audience section is not available yet because the data is not available.

### Consideration

**Purpose**

Show the consideration-stage DSP dashboard without emphasizing purchases because purchases are not the goal of these campaigns.

**KPI groups and columns mentioned in the sources**

- Objective column first
- Fewer columns than conversion
- Consideration signals grouped into one column
- `DPVR` using the `ROAS vs target` design treatment
- Delivery quality section including `eCPM` and `VTR`

**Explicit carry-overs from current design vs mini-app**

- The target state is the mini-app version with these required changes:
  - reuse the `ROAS vs target` column design on the `DPVR` column
  - switch `eCPM` and `VTR`

**Layout and interaction requirements explicitly stated**

- The consideration tab groups signals that are split into multiple columns in conversion.

**Future gaps and dependencies explicitly stated**

- Awareness is not done yet because it depends mostly on audience data that is not available.

### Loyalty

**Purpose**

Show the loyalty-stage DSP dashboard with the goal of making customers repurchase.

**KPI groups and columns mentioned in the sources**

- Objective column first
- Same dashboard structure as conversion
- Loyalty objective centered on repurchase instead of new customer acquisition
- Efficiency, business result, consideration-signal, delivery-quality, and control KPI structure carried from conversion

**Explicit carry-overs from current design vs mini-app**

- The target state is the mini-app version with these retained or required changes:
  - keep the current `ROAS vs target` column instead of plain `ROAS`
  - switch `eCPM` and `VTR`

**Layout and interaction requirements explicitly stated**

- The dashboard should match conversion structurally, with KPI naming adjusted for loyalty.

**Future gaps and dependencies explicitly stated**

- The KPI naming changes from `new customer` in conversion to `repurchase` in loyalty.

### Overview

**Purpose**

Provide a consolidated DSP view across funnel phases while highlighting the correct objective and optimization KPI for each phase.

**KPI groups and columns mentioned in the sources**

- Consolidation table by funnel phase
- Highlighted objective per phase
- Highlighted optimization KPI per phase
- Summary or recap area at the top
- Evolution table
- Breakdown views

**Explicit carry-overs from current design vs mini-app**

- The overview should be treated as the equivalent of the summary cards at the top of the current dashboard or the summary pattern used in the pricing and margin table.

**Layout and interaction requirements explicitly stated**

- The funnel bars are intended to be horizontally proportional to their values.
- On hover for the objective, the mini-app shows the first column of the previous table as a tooltip breakdown.
- A timeframe selector is required because this view cannot place all timeframes side by side.

**Future gaps and dependencies explicitly stated**

- The overview is still in progress even though the source says the team has agreed on the direction.
- The way the timeframe selector will be presented still needs iteration.
- The evolution table still needs to be designed.

## Known Constraints and Deferred Items

- The currently implemented version in the app only exists for `Conversion`.
- The new DSP reporting version is more complete than the current version in the app and design.
- The mini-app did not include the `% of assisted sales` column because the data was hard to compute without mixing tables, but the client explicitly wants that column kept in the new version.
- The mini-app did not reuse the optimization-KPI-versus-target layout, but the client explicitly wants that retained in the new version.
- `Awareness` is not ready because it depends mostly on audience data that is not available.
- The additional `Audience` section will be added later in the pipeline when data becomes available.
- The `Overview` tab needs a timeframe selector because the dashboard's current side-by-side timeframe pattern does not fit this layout.

## Known Unknowns From Client Inputs

- The client says the DSP reporting version should keep a small mix of the current design and the mini-app, but the exact boundary of that mix is only explicitly specified for the columns and treatments called out in the sources.
- The source notes that the conversion-side balance for consideration signals may take too much space and still needs the right balance.
- The source notes that the `Overview` timeframe selector exists, but the final presentation approach still needs iteration.
