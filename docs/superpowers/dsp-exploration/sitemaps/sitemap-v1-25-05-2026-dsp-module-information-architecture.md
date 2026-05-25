---
artifact_id: DSP-SITEMAP-001
module: DSP
artifact_type: sitemap
version: 1
status: draft
owner: unassigned
created_on: 25-05-2026
last_updated: 25-05-2026
linked_prototype_paths:
  - src/prototypes/dsp/iter-01-dsp-discovery
related_artifacts:
  - DSP-BRIEF-001
  - DSP-USERFLOW-001
---

# DSP Reporting Sitemap (v1)

## Primary Sections

- `Advertising`
- `DSP reporting`

`DSP reporting` sits under the main platform menu item `Advertising`.

## Persistent Global Header

These header layers persist across DSP reporting screens:

### Module and Global Filter Bar

- Main module and sub-module label: `Advertising / DSP reporting`
- Seller filter
- Marketplace filter
- Product filter
- Currency selector dropdown

### Sub-Module Navigation Tabs

- `Overview`
- `Conversion`
- `Consideration`
- `Awareness`
- `Loyalty`

### Shared Table Header Region

- Tab-specific table title
- Import icon
- Period granularity selector dropdown:
  - `WTD`
  - `MTD`
  - `QTD`
  - `YTD`
- Comparison granularity switcher

The provided platform header reference shows this shared table-header region with a tab-specific title such as `Evolution`.

## Navigation Model

- `Advertising > DSP reporting > Overview`
- `Advertising > DSP reporting > Conversion`
- `Advertising > DSP reporting > Consideration`
- `Advertising > DSP reporting > Awareness`
- `Advertising > DSP reporting > Loyalty`

## Screen Map

### Overview

**Purpose**

Provide a consolidated DSP view across funnel phases while highlighting the right objective and the right optimization KPI for each phase.

**Persistent shell**

- Inherits the full global header
- Uses the shared table header region with a tab-specific table title, import control, period granularity selector, and comparison granularity switcher

**Table title context**

- Summary or recap region at the top
- Evolution table below the summary
- Breakdown views below the evolution table

**Required KPI groups and columns**

- Consolidation by funnel phase
- Objective per phase
- Optimization KPI per phase
- Summary or recap content
- Evolution table content
- Breakdown-by content

### Conversion

**Purpose**

Show the conversion-stage DSP reporting view focused on getting new customers.

**Persistent shell**

- Inherits the full global header
- Uses the shared table header region with a tab-specific table title, import control, period granularity selector, and comparison granularity switcher

**Table title context**

- Conversion reporting table within the shared header-and-table structure

**Required KPI groups and columns**

- Objective column first
- Purchase count split into:
  - single purchases
  - subscribe-and-save purchases
- `ROAS vs target`
- Cost per action for new-to-brand conversion
- Assisted sales versus spend
- Units sold
- `% of assisted sales`
- Consideration signals
  - including `ATC clicks`
- Delivery quality
  - `eCPM`
  - visibility rate
  - impressions
- Control KPIs

### Consideration

**Purpose**

Show the consideration-stage DSP reporting view without emphasizing purchases as the primary goal.

**Persistent shell**

- Inherits the full global header
- Uses the shared table header region with a tab-specific table title, import control, period granularity selector, and comparison granularity switcher

**Table title context**

- Consideration reporting table within the shared header-and-table structure

**Required KPI groups and columns**

- Objective column first
- Fewer columns than conversion
- Grouped consideration signals
- `DPVR` using the `ROAS vs target` treatment
- Delivery quality
  - `eCPM`
  - `VTR`

### Awareness

**Purpose**

Reserve the awareness-stage DSP reporting tab in the IA while audience-based KPI content remains unavailable.

**Persistent shell**

- Inherits the full global header
- Uses the shared table header region with a tab-specific table title, import control, period granularity selector, and comparison granularity switcher

**Table title context**

- Awareness reporting table region exists in the IA, but the KPI/table content is pending

**Required KPI groups and columns**

- Shell only
- No awareness KPI names are defined yet in the approved source material
- Audience-data dependency should be called out as the reason the table content is pending

### Loyalty

**Purpose**

Show the loyalty-stage DSP reporting view focused on repurchase.

**Persistent shell**

- Inherits the full global header
- Uses the shared table header region with a tab-specific table title, import control, period granularity selector, and comparison granularity switcher

**Table title context**

- Loyalty reporting table within the shared header-and-table structure

**Required KPI groups and columns**

- Objective column first
- Loyalty objective centered on repurchase
- Same dashboard structure as conversion
- Efficiency KPI group
- Business result KPI group
- Consideration-signal KPI group
- Delivery-quality KPI group
- Control KPI group
- `ROAS vs target`
- `eCPM`
- `VTR`

## Content Ownership

- This sitemap is the IA and screen-structure companion to `DSP-BRIEF-001`.
- It should be used as context for later design ideation, userflows, use cases, and prototype iterations.
- It defines navigation structure, persistent shell elements, and tab-level table content expectations without defining wireframes or detailed interaction behavior.

## Visual Tree Sitemap

```text
Advertising
└── DSP reporting
    ├── Shared global shell
    │   ├── Module label: Advertising / DSP reporting
    │   ├── Global filters
    │   │   ├── Seller
    │   │   ├── Marketplace
    │   │   └── Product
    │   ├── Currency selector
    │   ├── Navigation tabs
    │   │   ├── Overview
    │   │   ├── Conversion
    │   │   ├── Consideration
    │   │   ├── Awareness
    │   │   └── Loyalty
    │   └── Shared table header region
    │       ├── Table title
    │       ├── Import icon
    │       ├── Period granularity
    │       │   ├── WTD
    │       │   ├── MTD
    │       │   ├── QTD
    │       │   └── YTD
    │       └── Comparison granularity switcher
    └── DSP reporting screens
        ├── Overview
        ├── Conversion
        ├── Consideration
        ├── Awareness
        └── Loyalty
```
