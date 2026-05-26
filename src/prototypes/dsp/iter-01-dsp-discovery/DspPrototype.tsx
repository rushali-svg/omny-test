"use client";

import Link from "next/link";
import {
  COMPARISON_OPTIONS,
  DSP_FILTERS,
  DSP_SCREENS,
  TIMEFRAME_OPTIONS,
  type Cell,
  type ColorToken,
  type ComparisonKey,
  type DspTabSlug,
  type PeriodKey,
  type TableColumn,
  type TimeframeKey,
  type Tone,
} from "./model";

type DspPrototypeProps = {
  tab: DspTabSlug;
  period: PeriodKey;
  comparison: ComparisonKey;
  timeframe: TimeframeKey;
};

const railItems = [
  { label: "Home", active: true },
  { label: "Catalog" },
  { label: "Reporting" },
  { label: "Settings" },
  { label: "Media" },
  { label: "Help" },
];

const phaseTabs: DspTabSlug[] = [
  "conversion",
  "consideration",
  "awareness",
  "loyalty",
];

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function mergeQuery(
  tab: DspTabSlug,
  period: PeriodKey,
  comparison: ComparisonKey,
  timeframe: TimeframeKey,
) {
  return {
    pathname: `/dsp-reporting/${tab}`,
    query: {
      period,
      comparison,
      timeframe,
    },
  };
}

function getColorToken(color: ColorToken) {
  switch (color) {
    case "peach":
      return "bg-[#fec9aa]";
    case "coral":
      return "bg-[#ff8d71]";
    case "blue":
      return "bg-[#4a88f4]";
    case "violet":
      return "bg-[#d9b6ff]";
    case "green":
      return "bg-[#63c38c]";
    case "yellow":
      return "bg-[#f1cc55]";
    case "red":
      return "bg-[#ef7d81]";
    case "slate":
    default:
      return "bg-[#9ca3af]";
  }
}

function getTextTone(tone?: Tone) {
  switch (tone) {
    case "positive":
      return "text-emerald-600";
    case "negative":
      return "text-rose-500";
    case "warning":
      return "text-amber-600";
    case "muted":
      return "text-[#999999]";
    default:
      return "text-[#4d4d4d]";
  }
}

function Tooltip({
  title,
  body,
  align = "left",
}: {
  title: string;
  body: string | string[];
  align?: "left" | "center" | "right";
}) {
  const lines = Array.isArray(body) ? body : [body];

  return (
    <span
      className={cn(
        "pointer-events-none absolute top-full z-20 mt-2 hidden w-64 rounded-[12px] bg-[#3d3d3d] px-4 py-3 text-left text-xs leading-5 text-white shadow-xl group-hover:block group-focus-within:block",
        align === "right" && "right-0",
        align === "center" && "left-1/2 -translate-x-1/2",
        align === "left" && "left-0",
      )}
    >
      <span className="mb-1 block text-sm font-semibold">{title}</span>
      {lines.map((line) => (
        <span key={line} className="block text-white/80">
          {line}
        </span>
      ))}
    </span>
  );
}

function HeaderTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex items-center">
      <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ececec] text-[10px] font-semibold text-[#757575]">
        i
      </span>
      <Tooltip title="Column definition" body={text} />
    </span>
  );
}

function FilterChip({
  value,
  badge,
  icon,
}: {
  value: string;
  badge?: string;
  icon: "store" | "marketplace" | "product";
}) {
  return (
    <button className="flex min-w-[148px] max-w-[240px] items-center gap-2 rounded-[8px] border border-[#e3e3e3] bg-white px-3 py-[7px] text-left">
      <span className="flex h-4 w-4 items-center justify-center text-[#4d4d4d]">
        {icon === "store" && <StoreIcon />}
        {icon === "marketplace" && <MarketplaceIcon />}
        {icon === "product" && <ProductIcon />}
      </span>
      <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-[#4d4d4d]">
        {value}
      </span>
      {badge ? (
        <span className="rounded-full bg-[#2172e1] px-1.5 py-0.5 text-[10px] leading-none text-white">
          {badge}
        </span>
      ) : null}
      <span className="text-[12px] text-[#616161]">v</span>
    </button>
  );
}

function PhaseTabs({
  activeTab,
  period,
  comparison,
  timeframe,
}: {
  activeTab: DspTabSlug;
  period: PeriodKey;
  comparison: ComparisonKey;
  timeframe: TimeframeKey;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-[#e3e3e3] px-6 py-3">
      <Link
        href={mergeQuery("overview", period, comparison, timeframe)}
        className={cn(
          "rounded-[8px] px-3 py-2 text-[14px] font-medium transition",
          activeTab === "overview"
            ? "bg-[#fff6f0] font-semibold text-[#e05e0f]"
            : "text-[#757575] hover:bg-[#faf7f3] hover:text-[#4d4d4d]",
        )}
      >
        Overview
      </Link>
      <div className="h-4 w-px bg-[#c9cfd4]" />
      {phaseTabs.map((item) => (
        <Link
          key={item}
          href={mergeQuery(item, period, comparison, timeframe)}
          className={cn(
            "rounded-[8px] px-3 py-2 text-[14px] font-medium capitalize transition",
            activeTab === item
              ? "bg-[#fff6f0] font-semibold text-[#e05e0f]"
              : "text-[#757575] hover:bg-[#faf7f3] hover:text-[#4d4d4d]",
          )}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

function SharedHeader({
  activeTab,
  period,
  comparison,
  timeframe,
}: {
  activeTab: DspTabSlug;
  period: PeriodKey;
  comparison: ComparisonKey;
  timeframe: TimeframeKey;
}) {
  return (
    <header className="border-b border-[#e3e3e3]">
      <div className="flex items-center justify-between gap-5 px-6 py-3">
        <div className="flex items-center gap-7">
          <div className="flex items-center text-[16px]">
            <span className="font-medium text-[#757575]">Advertising</span>
            <span className="px-2 text-[#757575]">/</span>
            <span className="font-semibold text-[#4d4d4d]">DSP reporting</span>
          </div>
          <div className="flex items-center gap-4">
            <FilterChip
              value={DSP_FILTERS.seller.value}
              badge={DSP_FILTERS.seller.badge}
              icon="store"
            />
            <FilterChip
              value={DSP_FILTERS.marketplace.value}
              badge={DSP_FILTERS.marketplace.badge}
              icon="marketplace"
            />
            <FilterChip value={DSP_FILTERS.product.value} icon="product" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-[8px] px-2 py-1 text-[14px] font-medium text-[#757575]">
            <span>{DSP_FILTERS.currency}</span>
            <span className="text-[12px]">v</span>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-[8px] text-[#999999]">
            i
          </button>
        </div>
      </div>
      <PhaseTabs
        activeTab={activeTab}
        period={period}
        comparison={comparison}
        timeframe={timeframe}
      />
    </header>
  );
}

function OverviewRecap() {
  const recap = DSP_SCREENS.overview.summary;

  return (
    <section className="overflow-hidden rounded-[16px] border border-[#e3e3e3] bg-white">
      <div className="grid grid-cols-4 divide-x divide-[#ebebeb]">
        {recap.map((item) => (
          <div key={item.label} className="px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-medium text-[#757575]">{item.label}</p>
                <p className="mt-2 text-[28px] font-semibold leading-none text-[#3d3d3d]">
                  {item.value}
                </p>
              </div>
              <span className={cn("text-[12px] font-semibold", getTextTone(item.deltaTone))}>
                {item.delta}
              </span>
            </div>
            <p className="mt-2 text-[12px] text-[#999999]">{item.helper}</p>
            <div className="mt-3 border-t border-dashed border-[#e3e3e3] pt-3 text-[12px] text-[#757575]">
              <p>{item.compareA}</p>
              <p className="mt-1">{item.compareB}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionChrome({
  title,
  period,
  comparison,
  timeframe,
  activeTab,
  timeframeEnabled,
}: {
  title: string;
  period: PeriodKey;
  comparison: ComparisonKey;
  timeframe: TimeframeKey;
  activeTab: DspTabSlug;
  timeframeEnabled?: boolean;
}) {
  const comparisonEntries = Object.entries(COMPARISON_OPTIONS);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-semibold text-[#3d3d3d]">{title}</h2>
            <button className="text-[#757575]">↓</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-[8px] border border-[#e3e3e3] bg-white px-3 py-1 text-[14px] font-medium text-[#3d3d3d]">
              <span>{period}</span>
              <span className="ml-2 text-[12px] text-[#757575]">v</span>
            </div>
            <div className="flex overflow-hidden rounded-[8px] border border-[#d1d1d1] bg-white">
              {comparisonEntries.map(([key, label], index) => (
                <Link
                  key={key}
                  href={mergeQuery(
                    activeTab,
                    period,
                    key as ComparisonKey,
                    timeframe,
                  )}
                  className={cn(
                    "px-4 py-1 text-[14px] font-medium transition",
                    index > 0 && "border-l border-[#e3e3e3]",
                    comparison === key
                      ? "bg-[#f4f4f4] text-[#3d3d3d]"
                      : "bg-white text-[#999999] hover:bg-[#faf7f3]",
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {activeTab !== "overview" ? (
          <div className="flex items-center gap-2 py-1">
            <div className="flex h-[17px] w-8 items-center rounded-full bg-[#d1d1d1] p-[2px]">
              <div className="h-[14px] w-[14px] rounded-full bg-white" />
            </div>
            <span className="text-[14px] font-medium text-[#757575]">
              Show Control KPI&apos;s
            </span>
          </div>
        ) : null}
      </div>
      {timeframeEnabled ? (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Object.entries(TIMEFRAME_OPTIONS).map(([key, label]) => (
              <Link
                key={key}
                href={mergeQuery(
                  activeTab,
                  period,
                  comparison,
                  key as TimeframeKey,
                )}
                className={cn(
                  "rounded-[8px] px-3 py-1.5 text-[14px] font-medium transition",
                  timeframe === key
                    ? "bg-[#f4f4f4] text-[#3d3d3d]"
                    : "text-[#757575] hover:bg-[#faf7f3]",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="text-[13px] text-[#757575]">
            Objective hover is enabled in this view
          </div>
        </div>
      ) : null}
    </div>
  );
}

function TableGroupHeader({ columns }: { columns: TableColumn[] }) {
  const groups: Array<{ label: string; span: number }> = [];

  for (const column of columns) {
    const previous = groups[groups.length - 1];
    if (previous && previous.label === column.group) {
      previous.span += 1;
    } else {
      groups.push({ label: column.group, span: 1 });
    }
  }

  return (
    <tr className="text-[11px] uppercase tracking-[0.18em] text-[#c1bdbd]">
      {groups.map((group) => (
        <th
          key={group.label}
          colSpan={group.span}
          className="border-b border-[#ebebeb] px-3 py-2 text-left font-semibold"
        >
          {group.label}
        </th>
      ))}
    </tr>
  );
}

function DataTable({ tab }: { tab: DspTabSlug }) {
  const screen = DSP_SCREENS[tab];

  if (screen.emptyState) {
    return (
      <section className="rounded-[16px] border border-dashed border-[#d9d9d9] bg-white px-10 py-14 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="inline-flex rounded-[8px] bg-[#fff6f0] px-3 py-1 text-sm font-semibold text-[#e05e0f]">
            Shell only
          </span>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-[#3d3d3d]">
            {screen.emptyState.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-[#757575]">
            {screen.emptyState.body}
          </p>
          <p className="mt-5 rounded-[12px] bg-[#f7f4ee] px-5 py-4 text-sm leading-7 text-[#757575]">
            {screen.emptyState.note}
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#e3e3e3] bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-0">
          <thead className="bg-[#f7f7f7]">
            <TableGroupHeader columns={screen.columns} />
            <tr className="text-[13px] text-[#757575]">
              {screen.columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "border-b border-[#ebebeb] px-3 py-2.5 font-medium",
                    column.align === "right" && "text-right",
                    column.align === "center" && "text-center",
                    (!column.align || column.align === "left") && "text-left",
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  <span className="inline-flex items-center">
                    {column.label}
                    {column.tooltip ? <HeaderTooltip text={column.tooltip} /> : null}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {screen.rows.map((row) => (
              <tr key={row.id} className="bg-white hover:bg-[#fffaf5]">
                {screen.columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "border-b border-r border-[#eeeeee] px-3 py-2 align-top last:border-r-0",
                      column.align === "right" && "text-right",
                      column.align === "center" && "text-center",
                    )}
                  >
                    <CellRenderer cell={row.cells[column.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CellRenderer({ cell }: { cell: Cell }) {
  if (cell.type === "text") {
    return (
      <div>
        <p className={cn("text-[14px] font-medium", getTextTone(cell.tone))}>
          {cell.primary}
        </p>
        {cell.secondary ? (
          <p className="mt-1 text-[12px] text-[#999999]">{cell.secondary}</p>
        ) : null}
      </div>
    );
  }

  if (cell.type === "objective") {
    return (
      <div className="group relative inline-flex max-w-[15rem] flex-col gap-1 rounded-[10px] bg-[#f8f6f2] px-3 py-2 text-left">
        <span className="text-[14px] font-semibold text-[#3d3d3d]">{cell.label}</span>
        <span className="text-[12px] text-[#757575]">{cell.detail}</span>
        <Tooltip title={cell.tooltipTitle} body={cell.tooltipLines} />
      </div>
    );
  }

  if (cell.type === "metric") {
    return (
      <div className={cn("space-y-1", cell.barRatio ? "min-w-[8rem]" : "")}>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[14px] font-medium text-[#4d4d4d]">{cell.value}</span>
          {cell.change ? (
            <span className={cn("text-[12px] font-semibold", getTextTone(cell.changeTone))}>
              {cell.change}
            </span>
          ) : null}
        </div>
        {cell.secondary ? (
          <p className="text-[12px] text-[#999999]">{cell.secondary}</p>
        ) : null}
        {typeof cell.barRatio === "number" ? (
          <div className="h-[5px] rounded-full bg-[#ececec]">
            <div
              className={cn("h-[5px] rounded-full", getColorToken(cell.barColor ?? "slate"))}
              style={{ width: `${Math.max(6, cell.barRatio * 100)}%` }}
            />
          </div>
        ) : null}
      </div>
    );
  }

  if (cell.type === "target") {
    const statusColor =
      cell.status === "above"
        ? "bg-[#bfe9c8]"
        : cell.status === "below"
          ? "bg-[#ffe7e1]"
          : "bg-[#fff0bf]";

    const markerColor =
      cell.status === "above"
        ? "bg-[#5fcb7b]"
        : cell.status === "below"
          ? "bg-[#ff7b7b]"
          : "bg-[#f0b84a]";

    return (
      <div className="group relative min-w-[10rem]">
        <div className="mb-1 inline-flex rounded-[6px] bg-[#fff6f2] px-2 py-1 text-[14px] font-medium text-[#4d4d4d]">
          {cell.value}
        </div>
        <div className="relative h-7 rounded-[6px] bg-[#ececec]">
          <div
            className={cn("absolute inset-y-0 left-0 rounded-[6px]", statusColor)}
            style={{ width: `${Math.max(10, Math.min(100, cell.actualRatio * 100))}%` }}
          />
          <div
            className={cn("absolute inset-y-0 w-[2px]", markerColor)}
            style={{ left: `${(cell.targetMarker ?? 0.56) * 100}%` }}
          />
        </div>
        <Tooltip title={cell.tooltipTitle} body={cell.tooltipCaption} align="center" />
      </div>
    );
  }

  if (cell.type === "percentBar") {
    return (
      <div className="min-w-[8rem]">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[14px] font-medium text-[#4d4d4d]">{cell.value}</span>
          {cell.note ? <span className="text-[11px] text-[#999999]">{cell.note}</span> : null}
        </div>
        <div className="mt-2 h-[6px] rounded-full bg-[#e8f0ff]">
          <div
            className={cn("h-[6px] rounded-full", getColorToken(cell.color ?? "blue"))}
            style={{ width: `${Math.max(8, cell.ratio * 100)}%` }}
          />
        </div>
      </div>
    );
  }

  if (cell.type === "stacked") {
    return (
      <div className="min-w-[11rem]">
        <div className="flex items-center justify-between text-[11px] text-[#757575]">
          <span>{cell.leftLabel}</span>
          <span>{cell.leftValue}</span>
        </div>
        <div className="mt-2 h-[8px] overflow-hidden rounded-full bg-[#ececec]">
          <div className="flex h-full">
            <div
              className={getColorToken(cell.leftColor)}
              style={{ width: `${Math.max(6, cell.leftRatio * 100)}%` }}
            />
            <div
              className={getColorToken(cell.rightColor)}
              style={{ width: `${Math.max(4, cell.rightRatio * 100)}%` }}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-[#757575]">
          <span>{cell.rightLabel}</span>
          <span>{cell.rightValue}</span>
        </div>
        {cell.caption ? <p className="mt-2 text-[11px] text-[#999999]">{cell.caption}</p> : null}
      </div>
    );
  }

  if (cell.type === "heat") {
    const toneClass =
      cell.tone === "green"
        ? "bg-[#ddf4e5] text-[#1f8b46]"
        : cell.tone === "yellow"
          ? "bg-[#fff0c4] text-[#b67e00]"
          : cell.tone === "red"
            ? "bg-[#ffe1e1] text-[#d94c4c]"
            : "bg-[#f1f1f1] text-[#757575]";

    return (
      <span className={cn("rounded-[8px] px-3 py-2 text-[13px] font-semibold", toneClass)}>
        {cell.value}
      </span>
    );
  }

  if (cell.type === "status") {
    const dotClass =
      cell.tone === "green"
        ? "bg-[#38c172]"
        : cell.tone === "yellow"
          ? "bg-[#e0b33f]"
          : "bg-[#ef6b6b]";

    return (
      <div className="inline-flex items-center gap-2 rounded-[8px] bg-[#f8f6f2] px-3 py-2">
        <span className={cn("h-2.5 w-2.5 rounded-full", dotClass)} />
        <div className="text-left">
          <p className="text-[13px] font-semibold text-[#4d4d4d]">{cell.value}</p>
          {cell.note ? <p className="text-[11px] text-[#999999]">{cell.note}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[11rem]">
      <p className="text-[14px] font-semibold text-[#4d4d4d]">{cell.headline}</p>
      <div className="mt-2 space-y-1 text-[12px] text-[#757575]">
        {cell.sublines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      {typeof cell.barRatio === "number" ? (
        <div className="mt-3 h-[5px] rounded-full bg-[#ececec]">
          <div
            className={cn("h-[5px] rounded-full", getColorToken(cell.barColor ?? "blue"))}
            style={{ width: `${Math.max(8, cell.barRatio * 100)}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}

function SideRail() {
  return (
    <aside className="flex h-[982px] w-[64px] shrink-0 flex-col items-center overflow-hidden rounded-l-[18px] bg-[#1a1817] text-white">
      <div className="flex h-16 w-full items-center justify-center border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ccb771] text-lg font-medium text-white">
          H
        </div>
      </div>
      <nav className="flex w-full flex-1 flex-col items-center gap-1 px-[14px] py-[8px]">
        {railItems.map((item, index) => (
          <button
            key={item.label}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-[6px] transition",
              item.active
                ? "bg-white/10 text-[#fec9aa]"
                : "text-white/70 hover:bg-white/10 hover:text-white",
            )}
            title={item.label}
          >
            <RailIcon index={index} />
          </button>
        ))}
      </nav>
      <button className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#57c5ff] bg-[#e5f6ff] text-[#00548a]">
        o
      </button>
    </aside>
  );
}

function RailIcon({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <HomeIcon />;
    case 1:
      return <BoxIcon />;
    case 2:
      return <ChartIcon />;
    case 3:
      return <SettingsIcon />;
    case 4:
      return <MediaIcon />;
    default:
      return <QuestionIcon />;
  }
}

export function DspPrototype({
  tab,
  period,
  comparison,
  timeframe,
}: DspPrototypeProps) {
  return (
    <div className="min-h-screen bg-[#f6f6f6] p-4">
      <div className="mx-auto flex max-w-[1540px] gap-0 rounded-[18px] border border-[#e8e8e8] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
        <SideRail />
        <div className="min-w-0 flex-1 overflow-hidden rounded-r-[18px] bg-white">
          <SharedHeader
            activeTab={tab}
            period={period}
            comparison={comparison}
            timeframe={timeframe}
          />
          <main className="px-6 py-5">
            {tab === "overview" ? <OverviewRecap /> : null}
            <section className={cn(tab === "overview" && "mt-5")}>
              <SectionChrome
                title={DSP_SCREENS[tab].tableTitle}
                period={period}
                comparison={comparison}
                timeframe={timeframe}
                activeTab={tab}
                timeframeEnabled={DSP_SCREENS[tab].timeframeEnabled}
              />
              <DataTable tab={tab} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function StoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 8.5h16l-1.5 10.5H5.5L4 8.5Z" />
      <path d="M7 8.5 8.5 5h7L17 8.5" />
    </svg>
  );
}

function MarketplaceIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 7h16" />
      <path d="M6 7v10h12V7" />
      <path d="M9 12h6" />
    </svg>
  );
}

function ProductIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m3 8 9-5 9 5-9 5-9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m4 11 8-6 8 6" />
      <path d="M6.5 10.5v8h11v-8" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m3 8 9-5 9 5-9 5-9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m12 3 1.7 2.8 3.3.7-.7 3.3L19 12l-2.7 2.2.7 3.3-3.3.7L12 21l-1.7-2.8-3.3-.7.7-3.3L5 12l2.7-2.2-.7-3.3 3.3-.7L12 3Z" />
      <circle cx="12" cy="12" r="2.7" />
    </svg>
  );
}

function MediaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="m10 9 5 3-5 3V9Z" />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M9.5 9.2a2.5 2.5 0 1 1 4.3 1.7c-.8.8-1.8 1.4-1.8 2.8" />
      <circle cx="12" cy="17.5" r=".6" fill="currentColor" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
