export const DSP_TABS = [
  "overview",
  "conversion",
  "consideration",
  "awareness",
  "loyalty",
] as const;

export type DspTabSlug = (typeof DSP_TABS)[number];

export const PERIOD_OPTIONS = ["WTD", "MTD", "QTD", "YTD"] as const;
export type PeriodKey = (typeof PERIOD_OPTIONS)[number];

export const COMPARISON_OPTIONS = {
  "vs-last-week": "vs same period last week",
  "vs-last-month": "vs previous period",
  "vs-last-year": "vs same period last year",
} as const;
export type ComparisonKey = keyof typeof COMPARISON_OPTIONS;

export const TIMEFRAME_OPTIONS = {
  "last-7-days": "Last 7 days",
  "last-30-days": "Last 30 days",
  "quarter-view": "Quarter view",
} as const;
export type TimeframeKey = keyof typeof TIMEFRAME_OPTIONS;

export type Tone = "default" | "positive" | "negative" | "warning" | "muted";
export type ColorToken =
  | "peach"
  | "coral"
  | "blue"
  | "violet"
  | "green"
  | "yellow"
  | "red"
  | "slate";

export type SummaryMetric = {
  label: string;
  value: string;
  helper: string;
  compareA: string;
  compareB: string;
  delta: string;
  deltaTone: Tone;
  tone: "primary" | "neutral";
};

export type TableColumn = {
  key: string;
  label: string;
  group: string;
  tooltip?: string;
  width?: string;
  align?: "left" | "center" | "right";
};

export type TextCell = {
  type: "text";
  primary: string;
  secondary?: string;
  tone?: Tone;
};

export type ObjectiveCell = {
  type: "objective";
  label: string;
  detail: string;
  tooltipTitle: string;
  tooltipLines: string[];
};

export type MetricCell = {
  type: "metric";
  value: string;
  change?: string;
  changeTone?: Tone;
  barRatio?: number;
  barColor?: ColorToken;
  secondary?: string;
};

export type TargetCell = {
  type: "target";
  value: string;
  actualRatio: number;
  targetMarker?: number;
  status: "above" | "below" | "watch";
  tooltipTitle: string;
  tooltipCaption: string;
};

export type PercentBarCell = {
  type: "percentBar";
  value: string;
  ratio: number;
  color?: ColorToken;
  note?: string;
};

export type StackedCell = {
  type: "stacked";
  leftLabel: string;
  leftValue: string;
  leftRatio: number;
  leftColor: ColorToken;
  rightLabel: string;
  rightValue: string;
  rightRatio: number;
  rightColor: ColorToken;
  caption?: string;
};

export type HeatCell = {
  type: "heat";
  value: string;
  tone: "green" | "yellow" | "red" | "neutral";
};

export type StatusCell = {
  type: "status";
  value: string;
  tone: "green" | "yellow" | "red";
  note?: string;
};

export type SignalPackCell = {
  type: "signalPack";
  headline: string;
  sublines: string[];
  barRatio?: number;
  barColor?: ColorToken;
};

export type Cell =
  | TextCell
  | ObjectiveCell
  | MetricCell
  | TargetCell
  | PercentBarCell
  | StackedCell
  | HeatCell
  | StatusCell
  | SignalPackCell;

export type TableRow = {
  id: string;
  cells: Record<string, Cell>;
};

export type EmptyState = {
  title: string;
  body: string;
  note: string;
};

export type ScreenConfig = {
  slug: DspTabSlug;
  label: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: SummaryMetric[];
  tableTitle: string;
  columns: TableColumn[];
  rows: TableRow[];
  timeframeEnabled?: boolean;
  emptyState?: EmptyState;
};

export const DSP_FILTERS = {
  seller: {
    label: "Seller",
    value: "Omny Retail EU",
    badge: "4",
  },
  marketplace: {
    label: "Marketplace",
    value: "amazon.fr",
    badge: "1",
  },
  product: {
    label: "Product",
    value: "All products",
  },
  currency: "EUR",
} as const;

const text = (primary: string, secondary?: string, tone?: Tone): TextCell => ({
  type: "text",
  primary,
  secondary,
  tone,
});

const objective = (
  label: string,
  detail: string,
  tooltipTitle: string,
  tooltipLines: string[],
): ObjectiveCell => ({
  type: "objective",
  label,
  detail,
  tooltipTitle,
  tooltipLines,
});

const metric = (
  value: string,
  options: Omit<MetricCell, "type" | "value"> = {},
): MetricCell => ({
  type: "metric",
  value,
  ...options,
});

const target = (
  value: string,
  actualRatio: number,
  status: TargetCell["status"],
  tooltipTitle: string,
  tooltipCaption: string,
  targetMarker = 0.56,
): TargetCell => ({
  type: "target",
  value,
  actualRatio,
  status,
  tooltipTitle,
  tooltipCaption,
  targetMarker,
});

const percentBar = (
  value: string,
  ratio: number,
  color: ColorToken = "blue",
  note?: string,
): PercentBarCell => ({
  type: "percentBar",
  value,
  ratio,
  color,
  note,
});

const stacked = (
  leftLabel: string,
  leftValue: string,
  leftRatio: number,
  rightLabel: string,
  rightValue: string,
  rightRatio: number,
  caption?: string,
): StackedCell => ({
  type: "stacked",
  leftLabel,
  leftValue,
  leftRatio,
  leftColor: "peach",
  rightLabel,
  rightValue,
  rightRatio,
  rightColor: "coral",
  caption,
});

const heat = (value: string, tone: HeatCell["tone"]): HeatCell => ({
  type: "heat",
  value,
  tone,
});

const status = (
  value: string,
  tone: StatusCell["tone"],
  note?: string,
): StatusCell => ({
  type: "status",
  value,
  tone,
  note,
});

const signalPack = (
  headline: string,
  sublines: string[],
  barRatio?: number,
  barColor: ColorToken = "blue",
): SignalPackCell => ({
  type: "signalPack",
  headline,
  sublines,
  barRatio,
  barColor,
});

const overviewColumns: TableColumn[] = [
  {
    key: "phase",
    label: "Funnel phase",
    group: "Objective",
    tooltip:
      "Each row starts with the phase objective so the screen is read by business goal before efficiency.",
    width: "15rem",
  },
  {
    key: "objective",
    label: "Objective",
    group: "Objective",
    tooltip:
      "Hover the objective chip to see the supporting breakdown used to explain the rollup.",
    width: "18rem",
  },
  {
    key: "optimization",
    label: "Optimization KPI",
    group: "Efficiency",
    tooltip:
      "Primary optimization KPI for the funnel phase, shown with target treatment where relevant.",
    width: "14rem",
  },
  {
    key: "business",
    label: "Business result",
    group: "Business result",
    tooltip:
      "Business outcome summary to keep the phase grounded in the commercial read.",
    width: "12rem",
  },
  {
    key: "delivery",
    label: "Delivery quality",
    group: "Delivery",
    tooltip:
      "Delivery quality checkpoint to quickly see if media delivery is helping or limiting the phase.",
    width: "11rem",
  },
  {
    key: "next",
    label: "Next read",
    group: "Interpretation",
    tooltip:
      "Recommended next interpretation path based on the phase health shown in overview.",
    width: "16rem",
  },
];

const conversionColumns: TableColumn[] = [
  {
    key: "week",
    label: "Week",
    group: "Context",
    width: "10rem",
  },
  {
    key: "objective",
    label: "Objective",
    group: "Objective",
    tooltip:
      "Objective must be read first to prevent over-focusing on ROAS without phase context.",
    width: "15rem",
  },
  {
    key: "purchases",
    label: "Purchase split",
    group: "Business result",
    tooltip:
      "Split purchases between single purchases and subscribe-and-save so the smaller signal stays visible.",
    width: "16rem",
  },
  {
    key: "roas",
    label: "ROAS vs target",
    group: "Efficiency",
    tooltip:
      "Current ROAS compared against the target, using the retained visual treatment from the current platform.",
    width: "14rem",
  },
  {
    key: "cpa",
    label: "CPA NTB",
    group: "Efficiency",
    tooltip:
      "Cost per action for new-to-brand conversion efficiency monitoring.",
    width: "10rem",
    align: "right",
  },
  {
    key: "assistedSpend",
    label: "Assisted sales vs spend",
    group: "Business result",
    tooltip:
      "Reads assisted sales alongside spend so assisted contribution is not interpreted in isolation.",
    width: "13rem",
    align: "right",
  },
  {
    key: "units",
    label: "Units sold",
    group: "Business result",
    width: "9rem",
    align: "right",
  },
  {
    key: "assistedShare",
    label: "% of assisted sales",
    group: "Business result",
    tooltip:
      "Retained column showing assisted sales as a share of total revenue, displayed with a slim bar treatment.",
    width: "12rem",
  },
  {
    key: "atc",
    label: "ATC clicks",
    group: "Signals",
    tooltip:
      "ATC clicks can be low-volume but high-signal, so they should not be dismissed by volume alone.",
    width: "12rem",
  },
  {
    key: "visibility",
    label: "Visibility rate",
    group: "Delivery",
    tooltip:
      "Visibility rate is intentionally placed before eCPM in this design iteration.",
    width: "10rem",
  },
  {
    key: "ecpm",
    label: "eCPM",
    group: "Delivery",
    tooltip:
      "Effective CPM placement has been switched relative to earlier layouts; the metric meaning is unchanged.",
    width: "8rem",
    align: "right",
  },
  {
    key: "impressions",
    label: "Impressions",
    group: "Delivery",
    width: "9rem",
    align: "right",
  },
  {
    key: "control",
    label: "Control KPI",
    group: "Control",
    tooltip:
      "Control KPIs are for setup monitoring and should not replace the main client-facing performance story.",
    width: "10rem",
  },
];

const considerationColumns: TableColumn[] = [
  {
    key: "week",
    label: "Week",
    group: "Context",
    width: "10rem",
  },
  {
    key: "objective",
    label: "Objective",
    group: "Objective",
    tooltip:
      "Consideration is read by objective first rather than by purchase outcomes.",
    width: "16rem",
  },
  {
    key: "signals",
    label: "Grouped consideration signals",
    group: "Signals",
    tooltip:
      "A grouped signal view keeps consideration lighter than conversion while still showing the important mid-funnel indicators.",
    width: "18rem",
  },
  {
    key: "dpvr",
    label: "DPVR vs target",
    group: "Efficiency",
    tooltip:
      "DPVR reuses the ROAS-vs-target pattern to preserve interpretability across phases.",
    width: "14rem",
  },
  {
    key: "vtr",
    label: "VTR",
    group: "Delivery",
    tooltip:
      "View-through rate sits before eCPM in this iteration by explicit requirement.",
    width: "10rem",
  },
  {
    key: "ecpm",
    label: "eCPM",
    group: "Delivery",
    tooltip:
      "Effective CPM placement was switched with VTR; only layout changed, not the KPI definition.",
    width: "8rem",
    align: "right",
  },
  {
    key: "impressions",
    label: "Impressions",
    group: "Delivery",
    width: "9rem",
    align: "right",
  },
  {
    key: "control",
    label: "Control KPI",
    group: "Control",
    tooltip:
      "Monitoring KPI used to validate delivery setup and signal quality, not as the main outcome.",
    width: "10rem",
  },
];

const loyaltyColumns: TableColumn[] = [
  {
    key: "week",
    label: "Week",
    group: "Context",
    width: "10rem",
  },
  {
    key: "objective",
    label: "Objective",
    group: "Objective",
    tooltip:
      "Loyalty objective reframes the read around repurchase instead of new customer acquisition.",
    width: "15rem",
  },
  {
    key: "purchases",
    label: "Repeat purchase split",
    group: "Business result",
    tooltip:
      "Repeat orders are split so subscribe-and-save repeat behavior remains visible next to broader repurchase volume.",
    width: "16rem",
  },
  {
    key: "roas",
    label: "ROAS vs target",
    group: "Efficiency",
    tooltip:
      "Retained target-based ROAS treatment for repurchase efficiency checks.",
    width: "14rem",
  },
  {
    key: "repurchaseCost",
    label: "Cost / repurchase",
    group: "Efficiency",
    width: "10rem",
    align: "right",
  },
  {
    key: "assistedSpend",
    label: "Assisted sales vs spend",
    group: "Business result",
    tooltip:
      "Assisted sales is kept in context with spend and repeat revenue outcome.",
    width: "13rem",
    align: "right",
  },
  {
    key: "assistedShare",
    label: "% of assisted sales",
    group: "Business result",
    tooltip:
      "Same retained slim-bar assisted-sales share pattern used for conversion.",
    width: "12rem",
  },
  {
    key: "signals",
    label: "Supporting signals",
    group: "Signals",
    tooltip:
      "Supporting signals help separate repurchase weakness from delivery or demand issues.",
    width: "13rem",
  },
  {
    key: "vtr",
    label: "VTR",
    group: "Delivery",
    tooltip:
      "VTR is intentionally shown before eCPM in loyalty as well.",
    width: "10rem",
  },
  {
    key: "ecpm",
    label: "eCPM",
    group: "Delivery",
    width: "8rem",
    align: "right",
  },
  {
    key: "control",
    label: "Control KPI",
    group: "Control",
    tooltip:
      "Setup monitoring KPI for internal review; should remain secondary in the narrative.",
    width: "10rem",
  },
];

export const DSP_SCREENS: Record<DspTabSlug, ScreenConfig> = {
  overview: {
    slug: "overview",
    label: "Overview",
    eyebrow: "Advertising / DSP reporting",
    title: "Overview",
    subtitle:
      "Top-down funnel read that starts from objective attainment, then points you to the phase that needs a deeper drill-down.",
    timeframeEnabled: true,
    tableTitle: "Evolution",
    summary: [
      {
        label: "DSP sales",
        value: "€284.6k",
        helper: "All supported phases",
        compareA: "Previous period +8.4%",
        compareB: "Same period LY +14.1%",
        delta: "3 phases on track",
        deltaTone: "positive",
        tone: "primary",
      },
      {
        label: "Target attainment",
        value: "76%",
        helper: "Phases meeting KPI target",
        compareA: "Last 7 days +9 pts",
        compareB: "Quarter view +4 pts",
        delta: "Awareness pending",
        deltaTone: "warning",
        tone: "neutral",
      },
      {
        label: "Assisted contribution",
        value: "24%",
        helper: "Share of revenue influenced",
        compareA: "Previous period +2.1 pts",
        compareB: "Same period LY +5.0 pts",
        delta: "Healthy mix",
        deltaTone: "positive",
        tone: "primary",
      },
      {
        label: "Media efficiency",
        value: "2.9",
        helper: "Weighted ROAS / DPVR read",
        compareA: "Previous period -0.2",
        compareB: "Same period LY +0.4",
        delta: "Watch Consideration",
        deltaTone: "warning",
        tone: "neutral",
      },
    ],
    columns: overviewColumns,
    rows: [
      {
        id: "conversion",
        cells: {
          phase: text("Conversion", "Deep dive available"),
          objective: objective(
            "Acquire new customers",
            "NTB rate 42%",
            "Conversion objective breakdown",
            [
              "New-to-brand sales: €118k",
              "Single purchases lead volume",
              "Subscribe-and-save remains visible but smaller",
            ],
          ),
          optimization: target(
            "3.2",
            0.83,
            "above",
            "Target ROAS: 2.6",
            "Above target with stable week-over-week delivery.",
          ),
          business: percentBar("24%", 0.24, "blue", "% assisted sales retained"),
          delivery: heat("Healthy", "green"),
          next: text("Validate ATC and visibility", "Open Conversion"),
        },
      },
      {
        id: "consideration",
        cells: {
          phase: text("Consideration", "Deep dive available"),
          objective: objective(
            "Increase product detail exploration",
            "DPVR focus",
            "Consideration objective breakdown",
            [
              "DPVR lagging target on marketplace campaigns",
              "ATC is still present but softer than conversion",
              "VTR drift suggests creative wear-out risk",
            ],
          ),
          optimization: target(
            "1.8",
            0.47,
            "below",
            "Target DPVR: 2.4",
            "Below target and the weakest efficiency signal in the current read.",
          ),
          business: metric("62.4k visits", {
            change: "-6%",
            changeTone: "negative",
            barRatio: 0.52,
            barColor: "blue",
          }),
          delivery: heat("Mixed", "yellow"),
          next: text("Review grouped signals and VTR", "Open Consideration"),
        },
      },
      {
        id: "loyalty",
        cells: {
          phase: text("Loyalty", "Deep dive available"),
          objective: objective(
            "Drive repurchase",
            "Repeat order rate 31%",
            "Loyalty objective breakdown",
            [
              "Repeat revenue: €74k",
              "Assisted repeat share remains strong",
              "Repurchase efficiency is above target but softening",
            ],
          ),
          optimization: target(
            "2.7",
            0.69,
            "watch",
            "Target ROAS: 2.4",
            "Above target, but trend softness means the tab still deserves a check.",
          ),
          business: percentBar("27%", 0.27, "blue", "Repeat influenced revenue"),
          delivery: heat("Stable", "green"),
          next: text("Compare repeat vs new customer mix", "Open Loyalty"),
        },
      },
      {
        id: "awareness",
        cells: {
          phase: text("Awareness", "Shell only"),
          objective: objective(
            "Audience reach",
            "Pending data",
            "Awareness objective breakdown",
            [
              "Audience data is not available yet",
              "No KPI interpretation should be invented here",
              "Users should branch to Overview or another active phase",
            ],
          ),
          optimization: text("Pending audience data", "No KPI surface yet", "muted"),
          business: text("Blocked", "Awaiting source availability", "warning"),
          delivery: heat("Unavailable", "neutral"),
          next: text("Stay in shell state", "Dependency noted"),
        },
      },
    ],
  },
  conversion: {
    slug: "conversion",
    label: "Conversion",
    eyebrow: "Advertising / DSP reporting",
    title: "Conversion",
    subtitle:
      "Objective-first conversion read focused on new customer efficiency, purchase quality, and assisted-sales context.",
    tableTitle: "Evolution",
    summary: [
      {
        label: "New-to-brand sales",
        value: "€118.2k",
        helper: "Current selected scope",
        compareA: "Previous period +11.4%",
        compareB: "Same period LY +18.2%",
        delta: "Above target",
        deltaTone: "positive",
        tone: "primary",
      },
      {
        label: "Purchase split",
        value: "4,980",
        helper: "Single + subscribe-and-save",
        compareA: "Single purchases 4,210",
        compareB: "S&S purchases 770",
        delta: "S&S visible",
        deltaTone: "warning",
        tone: "neutral",
      },
      {
        label: "ROAS vs target",
        value: "3.2",
        helper: "Target 2.6",
        compareA: "Previous period +0.3",
        compareB: "Same period LY +0.6",
        delta: "Healthy efficiency",
        deltaTone: "positive",
        tone: "primary",
      },
      {
        label: "% assisted sales",
        value: "24%",
        helper: "Share of total revenue",
        compareA: "Previous period +2 pts",
        compareB: "Same period LY +4 pts",
        delta: "Read with context",
        deltaTone: "warning",
        tone: "neutral",
      },
    ],
    columns: conversionColumns,
    rows: [
      {
        id: "conv-1",
        cells: {
          week: text("May 19, 2026"),
          objective: objective(
            "New customer acquisition",
            "NTB rate 44%",
            "Conversion objective details",
            [
              "New-to-brand revenue: €23.4k",
              "High NTB rate supports efficiency read",
              "Objective remains the anchor before ROAS",
            ],
          ),
          purchases: stacked(
            "Single",
            "812",
            0.76,
            "S&S",
            "252",
            0.24,
            "S&S smaller but still clearly visible",
          ),
          roas: target(
            "3.2",
            0.84,
            "above",
            "Target ROAS: 2.6",
            "Above target",
          ),
          cpa: metric("€18.7", {
            change: "-7%",
            changeTone: "positive",
          }),
          assistedSpend: metric("€2.9x", {
            secondary: "€38.1k / €13.1k",
          }),
          units: metric("1,640", {
            change: "+9%",
            changeTone: "positive",
            barRatio: 0.71,
            barColor: "slate",
          }),
          assistedShare: percentBar("24%", 0.24),
          atc: signalPack("ATC 392", ["High-signal, low-volume", "Supports strong lower funnel"], 0.31),
          visibility: heat("71%", "green"),
          ecpm: metric("€7.6"),
          impressions: metric("1.8M", {
            barRatio: 0.8,
            barColor: "slate",
          }),
          control: status("Healthy", "green", "Setup validated"),
        },
      },
      {
        id: "conv-2",
        cells: {
          week: text("May 12, 2026"),
          objective: objective(
            "New customer acquisition",
            "NTB rate 41%",
            "Conversion objective details",
            [
              "NTB revenue is still strong",
              "Objective remains met even with efficiency softness",
              "Good row for a compare-state read",
            ],
          ),
          purchases: stacked("Single", "746", 0.82, "S&S", "164", 0.18),
          roas: target(
            "2.4",
            0.52,
            "below",
            "Target ROAS: 2.6",
            "Below target and worth a deeper read.",
          ),
          cpa: metric("€22.8", {
            change: "+12%",
            changeTone: "negative",
          }),
          assistedSpend: metric("€2.1x", {
            secondary: "€29.4k / €13.7k",
          }),
          units: metric("1,210", {
            change: "-4%",
            changeTone: "negative",
            barRatio: 0.54,
            barColor: "slate",
          }),
          assistedShare: percentBar("19%", 0.19),
          atc: signalPack("ATC 201", ["Smaller volume", "Still meaningful against purchases"], 0.2),
          visibility: heat("63%", "yellow"),
          ecpm: metric("€8.9"),
          impressions: metric("1.4M", {
            barRatio: 0.63,
            barColor: "slate",
          }),
          control: status("Watch", "yellow", "Bid pacing drift"),
        },
      },
      {
        id: "conv-3",
        cells: {
          week: text("May 05, 2026"),
          objective: objective(
            "New customer acquisition",
            "NTB rate 39%",
            "Conversion objective details",
            [
              "Objective still clear but less efficient",
              "Assisted mix rose while direct units softened",
              "ATC stayed stronger than purchases suggest",
            ],
          ),
          purchases: stacked("Single", "694", 0.79, "S&S", "185", 0.21),
          roas: target(
            "2.7",
            0.69,
            "watch",
            "Target ROAS: 2.6",
            "Slightly above target, but not yet comfortable.",
          ),
          cpa: metric("€20.2", {
            change: "-1%",
            changeTone: "muted",
          }),
          assistedSpend: metric("€2.5x", {
            secondary: "€31.0k / €12.3k",
          }),
          units: metric("1,180", {
            change: "+1%",
            changeTone: "muted",
            barRatio: 0.51,
            barColor: "slate",
          }),
          assistedShare: percentBar("26%", 0.26),
          atc: signalPack("ATC 248", ["Signal stronger than unit trend", "Supports keeping ATC visible"], 0.24),
          visibility: heat("67%", "green"),
          ecpm: metric("€7.9"),
          impressions: metric("1.5M", {
            barRatio: 0.69,
            barColor: "slate",
          }),
          control: status("Stable", "green", "Frequency balanced"),
        },
      },
    ],
  },
  consideration: {
    slug: "consideration",
    label: "Consideration",
    eyebrow: "Advertising / DSP reporting",
    title: "Consideration",
    subtitle:
      "Mid-funnel read that groups supporting signals and keeps purchase outcomes secondary to detail-page engagement quality.",
    tableTitle: "Evolution",
    summary: [
      {
        label: "Consideration reach",
        value: "62.4k",
        helper: "Detail page visits",
        compareA: "Previous period -6.0%",
        compareB: "Same period LY +9.1%",
        delta: "Needs attention",
        deltaTone: "warning",
        tone: "primary",
      },
      {
        label: "DPVR vs target",
        value: "1.8",
        helper: "Target 2.4",
        compareA: "Previous period -0.3",
        compareB: "Same period LY -0.1",
        delta: "Below target",
        deltaTone: "negative",
        tone: "neutral",
      },
      {
        label: "ATC signal",
        value: "Low volume",
        helper: "Still high-signal",
        compareA: "Marketplace campaigns softer",
        compareB: "Brand terms still healthy",
        delta: "Do not dismiss",
        deltaTone: "warning",
        tone: "primary",
      },
      {
        label: "Delivery quality",
        value: "Mixed",
        helper: "VTR ahead of eCPM",
        compareA: "VTR drift in two weeks",
        compareB: "Impressions stable",
        delta: "Creative fatigue risk",
        deltaTone: "warning",
        tone: "neutral",
      },
    ],
    columns: considerationColumns,
    rows: [
      {
        id: "cons-1",
        cells: {
          week: text("May 19, 2026"),
          objective: objective(
            "Drive product detail exploration",
            "DPVR focus",
            "Consideration objective details",
            [
              "Objective is detail-page quality, not direct purchases",
              "Signals remain grouped to reduce column count",
              "Best compared with conversion only when needed",
            ],
          ),
          signals: signalPack(
            "DPV 14.1k | ATC 184",
            ["Strong branded traffic", "ATC small but still meaningful", "CTR 0.92% stable"],
            0.57,
          ),
          dpvr: target(
            "1.8",
            0.46,
            "below",
            "Target DPVR: 2.4",
            "Below target",
          ),
          vtr: heat("76%", "green"),
          ecpm: metric("€5.4"),
          impressions: metric("2.6M", {
            barRatio: 0.88,
            barColor: "slate",
          }),
          control: status("Healthy", "green", "Audience pacing aligned"),
        },
      },
      {
        id: "cons-2",
        cells: {
          week: text("May 12, 2026"),
          objective: objective(
            "Drive product detail exploration",
            "DPVR focus",
            "Consideration objective details",
            [
              "Low DPVR preceded softer conversion",
              "Grouped signals help separate mid-funnel weakness",
              "VTR softness suggests creative refresh need",
            ],
          ),
          signals: signalPack(
            "DPV 12.2k | ATC 143",
            ["ATC volume dipped", "CTR 0.81% below baseline", "Watch new-creative cohorts"],
            0.44,
          ),
          dpvr: target(
            "1.5",
            0.38,
            "below",
            "Target DPVR: 2.4",
            "Below target with weaker supporting signals.",
          ),
          vtr: heat("64%", "yellow"),
          ecpm: metric("€6.1"),
          impressions: metric("2.4M", {
            barRatio: 0.81,
            barColor: "slate",
          }),
          control: status("Watch", "yellow", "Creative rotation lag"),
        },
      },
      {
        id: "cons-3",
        cells: {
          week: text("May 05, 2026"),
          objective: objective(
            "Drive product detail exploration",
            "DPVR focus",
            "Consideration objective details",
            [
              "Traffic quality was healthier in this week",
              "Grouped view shows ATC signal holding despite lower absolute volume",
              "Delivery did not look like the primary issue",
            ],
          ),
          signals: signalPack(
            "DPV 13.4k | ATC 171",
            ["Signal quality recovered", "CTR 0.89% improved", "Good benchmark week"],
            0.51,
          ),
          dpvr: target(
            "2.2",
            0.57,
            "watch",
            "Target DPVR: 2.4",
            "Close to target but not fully there yet.",
          ),
          vtr: heat("72%", "green"),
          ecpm: metric("€5.6"),
          impressions: metric("2.5M", {
            barRatio: 0.84,
            barColor: "slate",
          }),
          control: status("Stable", "green", "Inventory mix balanced"),
        },
      },
    ],
  },
  awareness: {
    slug: "awareness",
    label: "Awareness",
    eyebrow: "Advertising / DSP reporting",
    title: "Awareness",
    subtitle:
      "Reserved shell for the awareness phase while audience-driven DSP reporting inputs are still unavailable.",
    tableTitle: "Awareness status",
    summary: [
      {
        label: "Phase availability",
        value: "Pending",
        helper: "Audience data dependency",
        compareA: "No approved KPI set yet",
        compareB: "Shell retained in IA",
        delta: "Blocked by source data",
        deltaTone: "warning",
        tone: "primary",
      },
      {
        label: "Current action",
        value: "Use other tabs",
        helper: "Continue analysis elsewhere",
        compareA: "Overview remains default entry",
        compareB: "Record dependency explicitly",
        delta: "No invented insight",
        deltaTone: "warning",
        tone: "neutral",
      },
      {
        label: "Audience section",
        value: "Future",
        helper: "Planned later in pipeline",
        compareA: "No reporting surface today",
        compareB: "Await source enablement",
        delta: "Deferred",
        deltaTone: "muted",
        tone: "neutral",
      },
      {
        label: "Interpretation rule",
        value: "Stop at shell",
        helper: "Do not infer KPIs",
        compareA: "Branch to Overview",
        compareB: "Or phase tabs",
        delta: "Respect boundary",
        deltaTone: "warning",
        tone: "primary",
      },
    ],
    columns: [],
    rows: [],
    emptyState: {
      title: "Awareness reporting is pending audience data",
      body:
        "This tab intentionally stops at the shell level. The approved source material does not define awareness KPIs yet, so the first prototype keeps the navigation visible without inventing unavailable reporting content.",
      note:
        "Recommended path: return to Overview for top-down analysis or move to Conversion, Consideration, or Loyalty for active KPI reads.",
    },
  },
  loyalty: {
    slug: "loyalty",
    label: "Loyalty",
    eyebrow: "Advertising / DSP reporting",
    title: "Loyalty",
    subtitle:
      "Repurchase-focused version of the conversion structure, keeping business results and assisted contribution visible for repeat behavior reads.",
    tableTitle: "Evolution",
    summary: [
      {
        label: "Repeat revenue",
        value: "€74.0k",
        helper: "Repurchase objective",
        compareA: "Previous period +7.2%",
        compareB: "Same period LY +10.8%",
        delta: "On track",
        deltaTone: "positive",
        tone: "primary",
      },
      {
        label: "ROAS vs target",
        value: "2.7",
        helper: "Target 2.4",
        compareA: "Previous period -0.1",
        compareB: "Same period LY +0.3",
        delta: "Watch softness",
        deltaTone: "warning",
        tone: "neutral",
      },
      {
        label: "% assisted sales",
        value: "27%",
        helper: "Repeat influenced revenue",
        compareA: "Previous period +1.4 pts",
        compareB: "Same period LY +3.8 pts",
        delta: "Retained pattern",
        deltaTone: "positive",
        tone: "primary",
      },
      {
        label: "Delivery quality",
        value: "Stable",
        helper: "VTR before eCPM",
        compareA: "Inventory quality steady",
        compareB: "Frequency under control",
        delta: "Good baseline",
        deltaTone: "positive",
        tone: "neutral",
      },
    ],
    columns: loyaltyColumns,
    rows: [
      {
        id: "loyal-1",
        cells: {
          week: text("May 19, 2026"),
          objective: objective(
            "Drive repurchase",
            "Repeat order rate 31%",
            "Loyalty objective details",
            [
              "Repurchase remains the framing objective",
              "Efficiency is healthy but should be compared with conversion trends",
              "Assisted share is meaningful in repeat behavior",
            ],
          ),
          purchases: stacked("Repeat", "624", 0.81, "S&S repeat", "143", 0.19),
          roas: target(
            "2.7",
            0.71,
            "above",
            "Target ROAS: 2.4",
            "Above target",
          ),
          repurchaseCost: metric("€14.2", {
            change: "-5%",
            changeTone: "positive",
          }),
          assistedSpend: metric("€2.4x", {
            secondary: "€21.3k / €8.9k",
          }),
          assistedShare: percentBar("27%", 0.27),
          signals: signalPack(
            "Repeat shoppers 4.8k",
            ["Detail visits stable", "Retention audience pacing healthy"],
            0.62,
          ),
          vtr: heat("73%", "green"),
          ecpm: metric("€5.1"),
          control: status("Healthy", "green", "Frequency capped"),
        },
      },
      {
        id: "loyal-2",
        cells: {
          week: text("May 12, 2026"),
          objective: objective(
            "Drive repurchase",
            "Repeat order rate 29%",
            "Loyalty objective details",
            [
              "Repurchase softened without fully breaking",
              "Compare this with conversion before calling it a broader demand issue",
              "Assisted share stayed resilient",
            ],
          ),
          purchases: stacked("Repeat", "588", 0.84, "S&S repeat", "110", 0.16),
          roas: target(
            "2.3",
            0.49,
            "below",
            "Target ROAS: 2.4",
            "Below target with mild delivery softness.",
          ),
          repurchaseCost: metric("€16.8", {
            change: "+9%",
            changeTone: "negative",
          }),
          assistedSpend: metric("€2.0x", {
            secondary: "€18.2k / €9.1k",
          }),
          assistedShare: percentBar("25%", 0.25),
          signals: signalPack(
            "Repeat shoppers 4.4k",
            ["Audience returning, conversion weaker", "Likely offer fatigue"],
            0.54,
          ),
          vtr: heat("66%", "yellow"),
          ecpm: metric("€5.7"),
          control: status("Watch", "yellow", "Offer refresh due"),
        },
      },
      {
        id: "loyal-3",
        cells: {
          week: text("May 05, 2026"),
          objective: objective(
            "Drive repurchase",
            "Repeat order rate 30%",
            "Loyalty objective details",
            [
              "Good reference week for loyalty health",
              "Supporting signals were healthy while efficiency was just above target",
              "Useful comparator against later softness",
            ],
          ),
          purchases: stacked("Repeat", "601", 0.8, "S&S repeat", "149", 0.2),
          roas: target(
            "2.5",
            0.61,
            "watch",
            "Target ROAS: 2.4",
            "Just above target",
          ),
          repurchaseCost: metric("€15.0", {
            change: "-1%",
            changeTone: "muted",
          }),
          assistedSpend: metric("€2.2x", {
            secondary: "€19.5k / €8.8k",
          }),
          assistedShare: percentBar("29%", 0.29),
          signals: signalPack(
            "Repeat shoppers 4.7k",
            ["DPV and retention traffic aligned", "Creative still fresh"],
            0.58,
          ),
          vtr: heat("71%", "green"),
          ecpm: metric("€5.3"),
          control: status("Stable", "green", "Setup balanced"),
        },
      },
    ],
  },
};

export function isDspTabSlug(value: string): value is DspTabSlug {
  return DSP_TABS.includes(value as DspTabSlug);
}

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parsePeriod(value: string | string[] | undefined): PeriodKey {
  const resolved = getSingleValue(value);
  return PERIOD_OPTIONS.includes(resolved as PeriodKey)
    ? (resolved as PeriodKey)
    : "WTD";
}

export function parseComparison(
  value: string | string[] | undefined,
): ComparisonKey {
  const resolved = getSingleValue(value);
  return resolved && resolved in COMPARISON_OPTIONS
    ? (resolved as ComparisonKey)
    : "vs-last-week";
}

export function parseTimeframe(
  value: string | string[] | undefined,
): TimeframeKey {
  const resolved = getSingleValue(value);
  return resolved && resolved in TIMEFRAME_OPTIONS
    ? (resolved as TimeframeKey)
    : "last-7-days";
}
