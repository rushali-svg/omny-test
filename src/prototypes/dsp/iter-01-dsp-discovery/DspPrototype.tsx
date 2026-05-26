"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

const VERSIONS = [
  { id: "v1", label: "v1" },
  { id: "v2", label: "v2", latest: true },
] as const;
type VersionId = (typeof VERSIONS)[number]["id"];

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
  const [version, setVersion] = useState<VersionId>("v2");

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <VersionSwitcher value={version} onChange={setVersion} />
      <div className="p-4">
        {version === "v1" && (
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
        )}

        {version === "v2" && <DashboardV2 />}
      </div>
    </div>
  );
}

function VersionSwitcher({
  value,
  onChange,
}: {
  value: VersionId;
  onChange: (next: VersionId) => void;
}) {
  return (
    <div className="fixed bottom-3 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[#e8e8e8] bg-white/95 px-2 py-1 shadow-[0_6px_20px_rgba(15,23,42,0.12)] backdrop-blur">
      <div className="flex items-center gap-1.5">
        <span className="pl-1 text-[9px] uppercase tracking-[0.16em] text-[#9ca3af]">
          Version
        </span>
        <div className="flex items-center gap-0.5 rounded-full bg-[#f6f6f6] p-0.5">
          {VERSIONS.map((v) => {
            const isActive = v.id === value;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onChange(v.id)}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium transition",
                  isActive
                    ? "bg-[#1a1817] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-[#1a1817]",
                )}
              >
                <span>{v.label}</span>
                {"latest" in v && v.latest ? (
                  <span
                    className={cn(
                      "rounded-full px-1 py-px text-[8px] font-semibold uppercase tracking-[0.1em]",
                      isActive
                        ? "bg-[#fec9aa] text-[#1a1817]"
                        : "bg-[#fec9aa]/60 text-[#1a1817]",
                    )}
                  >
                    Latest
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// v2 — Budget Cockpit dashboard
// ---------------------------------------------------------------------------

type Trend = "up" | "down" | "flat";
type Heat = "green" | "yellow" | "red" | "lime";

type EvoRow = {
  date: string;
  revenue: string;
  revenueDelta: string;
  revenueTrend: Trend;
  revenueBar: number; // 0-100
  units: string;
  unitsDelta: string;
  unitsTrend: Trend;
  unitsBar: number;
  avgPrice: string;
  avgDelta: string;
  avgTrend: Trend;
  avgBar: number;
  days: number;
  daysBar: number;
  lostRev: string;
  lostBar: number;
  impressions: string;
  impDelta?: string;
  impTrend?: Trend;
  pageViews: string;
  pageDelta?: string;
  pageTrend?: Trend;
  ctr: string;
  ctrHeat: Heat;
  cvr: string;
  cvrHeat: Heat;
  ppcSales: string;
  buybox: string;
  buyboxDotGreen: boolean;
  tacos: string;
  tacosBg: string;
  selected?: boolean;
};

const evoRows: EvoRow[] = [
  { date: "Oct 2, 2023", revenue: "8 845 €", revenueDelta: "+10%", revenueTrend: "up", revenueBar: 58, units: "1,691", unitsDelta: "+10%", unitsTrend: "up", unitsBar: 30, avgPrice: "50.00 €", avgDelta: "+10%", avgTrend: "up", avgBar: 60, days: 49, daysBar: 50, lostRev: "8 845 €", lostBar: 60, impressions: "8 845", impDelta: "+10%", impTrend: "up", pageViews: "8 845", pageDelta: "+10%", pageTrend: "up", ctr: "11%", ctrHeat: "yellow", cvr: "11%", cvrHeat: "yellow", ppcSales: "96%", buybox: "96%", buyboxDotGreen: true, tacos: "71%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]" },
  { date: "Sept 25, 2023", revenue: "", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 52, units: "4,204", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 56, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 56, daysBar: 58, lostRev: "7 855 €", lostBar: 54, impressions: "7 509", impDelta: "-4%", impTrend: "down", pageViews: "7 509", pageDelta: "-4%", pageTrend: "down", ctr: "13%", ctrHeat: "yellow", cvr: "13%", cvrHeat: "yellow", ppcSales: "96%", buybox: "96%", buyboxDotGreen: true, tacos: "36%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]", selected: true },
  { date: "Sept 18, 2023", revenue: "7 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 50, units: "3,846", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 52, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 28, daysBar: 30, lostRev: "445 €", lostBar: 8, impressions: "7 509", impDelta: "-4%", impTrend: "down", pageViews: "7 509", pageDelta: "-4%", pageTrend: "down", ctr: "17%", ctrHeat: "lime", cvr: "17%", cvrHeat: "lime", ppcSales: "96%", buybox: "96%", buyboxDotGreen: true, tacos: "21%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]" },
  { date: "Sept 11, 2023", revenue: "8 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 56, units: "3,846", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 52, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 63, daysBar: 64, lostRev: "8 845 €", lostBar: 60, impressions: "8 509", impDelta: "-4%", impTrend: "down", pageViews: "8 509", pageDelta: "-4%", pageTrend: "down", ctr: "7%", ctrHeat: "yellow", cvr: "7%", cvrHeat: "yellow", ppcSales: "96%", buybox: "96%", buyboxDotGreen: true, tacos: "52%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]" },
  { date: "Sept 4, 2023", revenue: "8 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 56, units: "5,760", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 70, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 44, daysBar: 46, lostRev: "2 545 €", lostBar: 25, impressions: "8 509", impDelta: "-4%", impTrend: "down", pageViews: "8 509", pageDelta: "-4%", pageTrend: "down", ctr: "22%", ctrHeat: "green", cvr: "22%", cvrHeat: "green", ppcSales: "96%", buybox: "85%", buyboxDotGreen: false, tacos: "100%", tacosBg: "bg-[#fde0e0] text-[#c84141]" },
  { date: "Aug 28, 2023", revenue: "8 509 €", revenueDelta: "", revenueTrend: "flat", revenueBar: 56, units: "6,142", unitsDelta: "", unitsTrend: "flat", unitsBar: 76, avgPrice: "50.00 €", avgDelta: "", avgTrend: "flat", avgBar: 60, days: 927, daysBar: 100, lostRev: "845 €", lostBar: 12, impressions: "8 509", pageViews: "8 509", ctr: "9%", ctrHeat: "yellow", cvr: "9%", cvrHeat: "yellow", ppcSales: "96%", buybox: "85%", buyboxDotGreen: false, tacos: "24%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]" },
  { date: "Sept 25, 2023", revenue: "8 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 56, units: "4,204", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 56, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 76, daysBar: 70, lostRev: "6 865 €", lostBar: 48, impressions: "8 509", impDelta: "-4%", impTrend: "down", pageViews: "8 509", pageDelta: "-4%", pageTrend: "down", ctr: "35%", ctrHeat: "green", cvr: "35%", cvrHeat: "green", ppcSales: "96%", buybox: "35%", buyboxDotGreen: false, tacos: "36%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]" },
  { date: "Aug 14, 2023", revenue: "15 120 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 92, units: "6,177", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 78, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 54, daysBar: 54, lostRev: "15 120 €", lostBar: 92, impressions: "15 120", impDelta: "-4%", impTrend: "down", pageViews: "15 120", pageDelta: "-4%", pageTrend: "down", ctr: "4%", ctrHeat: "red", cvr: "4%", cvrHeat: "red", ppcSales: "96%", buybox: "85%", buyboxDotGreen: false, tacos: "34%", tacosBg: "bg-[#e9defb] text-[#5b3fbd]" },
];

type BreakdownRow = {
  thumb: string;
  name: string;
  asin: string;
  revenue: string;
  revenueDelta: string;
  revenueTrend: Trend;
  revenueBar: number;
  units: string;
  unitsDelta: string;
  unitsTrend: Trend;
  unitsBar: number;
  avgPrice: string;
  avgDelta: string;
  avgTrend: Trend;
  avgBar: number;
  days: number;
  daysBar: number;
  lostRev: string;
  lostBar: number;
  asinSold: string;
  asinSoldDot: "grey" | "green";
  orgCvr: string;
  orgCvrHeat: Heat;
  buybox: string;
  buyboxDotGreen: boolean;
  pageViews: string;
  pageDelta?: string;
  pageTrend?: Trend;
  ppcSales: string;
  state: "select" | "deselect" | "none";
};

const breakdownRows: BreakdownRow[] = [
  { thumb: "#fec9aa", name: "PonySecret - Accesorio para devolver", asin: "B0BH6DVKZD - 298078", revenue: "8 845 €", revenueDelta: "+10%", revenueTrend: "up", revenueBar: 60, units: "1,691", unitsDelta: "+10%", unitsTrend: "up", unitsBar: 30, avgPrice: "50.00 €", avgDelta: "+10%", avgTrend: "up", avgBar: 60, days: 49, daysBar: 50, lostRev: "8 845 €", lostBar: 62, asinSold: "78%", asinSoldDot: "grey", orgCvr: "11%", orgCvrHeat: "yellow", buybox: "96%", buyboxDotGreen: true, pageViews: "8 845", pageDelta: "+10%", pageTrend: "up", ppcSales: "96%", state: "none" },
  { thumb: "#ff8d71", name: "PonySecret - Accesorio para devolver", asin: "B0BH6DVKZD - 298078", revenue: "7 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 50, units: "", unitsDelta: "", unitsTrend: "flat", unitsBar: 0, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 56, daysBar: 58, lostRev: "7 855 €", lostBar: 54, asinSold: "79%", asinSoldDot: "grey", orgCvr: "13%", orgCvrHeat: "yellow", buybox: "96%", buyboxDotGreen: true, pageViews: "7 509", pageDelta: "-4%", pageTrend: "down", ppcSales: "96%", state: "deselect" },
  { thumb: "#4a88f4", name: "PonySecret - Accesorio para devolver", asin: "B0BH6DVKZD - 298078", revenue: "7 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 50, units: "3,846", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 52, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 28, daysBar: 30, lostRev: "445 €", lostBar: 8, asinSold: "80%", asinSoldDot: "grey", orgCvr: "17%", orgCvrHeat: "lime", buybox: "96%", buyboxDotGreen: true, pageViews: "8 509", pageDelta: "-4%", pageTrend: "down", ppcSales: "96%", state: "none" },
  { thumb: "#d9b6ff", name: "PonySecret - Accesorio para devolver", asin: "B0BH6DVKZD - 298078", revenue: "8 509 €", revenueDelta: "-4%", revenueTrend: "down", revenueBar: 56, units: "3,846", unitsDelta: "-4%", unitsTrend: "down", unitsBar: 52, avgPrice: "50.00 €", avgDelta: "-4%", avgTrend: "down", avgBar: 60, days: 63, daysBar: 64, lostRev: "8 845 €", lostBar: 62, asinSold: "82%", asinSoldDot: "grey", orgCvr: "7%", orgCvrHeat: "yellow", buybox: "96%", buyboxDotGreen: true, pageViews: "8 509", pageDelta: "-4%", pageTrend: "down", ppcSales: "96%", state: "select" },
  { thumb: "#63c38c", name: "PonySecret - Accesorio para devolver", asin: "B0BH6DVKZD - 298078", revenue: "", revenueDelta: "", revenueTrend: "flat", revenueBar: 0, units: "", unitsDelta: "", unitsTrend: "flat", unitsBar: 0, avgPrice: "", avgDelta: "", avgTrend: "flat", avgBar: 0, days: 0, daysBar: 0, lostRev: "", lostBar: 0, asinSold: "", asinSoldDot: "grey", orgCvr: "22%", orgCvrHeat: "green", buybox: "", buyboxDotGreen: true, pageViews: "", ppcSales: "", state: "none" },
];

function DashboardV2() {
  return (
    <div className="mx-auto flex max-w-[1540px] overflow-hidden rounded-[18px] border border-[#e8e8e8] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
      <DashboardSideRail />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        <DashboardTabs />
        <div className="flex-1 bg-[#f7f7f9] px-5 py-4">
          <RevenueCards />
          <div className="relative mt-4">
            <EvolutionPanel />
            <BreakdownPanel />
          </div>
        </div>
      </div>
      <CommentWidget />
    </div>
  );
}

type CommentState = "hidden" | "circle" | "open";

function CommentWidget() {
  const [state, setState] = useState<CommentState>("hidden");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "c") return;
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const tag = t.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || t.isContentEditable) return;
      setState((s) => (s === "hidden" ? "circle" : "hidden"));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (state === "hidden") return null;

  return (
    <>
      <div className="group fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setState("open")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5b3fbd] text-white shadow-[0_8px_24px_rgba(91,63,189,0.35)] transition hover:bg-[#4a32a8]"
          aria-label="Open comment"
        >
          <ChatBubbleIcon />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setState("hidden");
          }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#1a1817] opacity-0 shadow transition group-hover:opacity-100"
          aria-label="Remove chat"
        >
          <CloseIcon />
        </button>
      </div>

      {state === "open" && (
        <div className="fixed bottom-24 right-6 z-50 w-[320px] rounded-2xl border border-[#ececf0] bg-white p-4 shadow-[0_18px_48px_rgba(15,23,42,0.18)]">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5b3fbd]">
              from rishabh
            </span>
            <button
              onClick={() => setState("circle")}
              className="flex h-5 w-5 items-center justify-center rounded-full text-[#9ca3af] hover:bg-[#f4f4f6] hover:text-[#1a1817]"
              aria-label="Collapse"
            >
              <CloseIcon />
            </button>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[#374151]">
            This is my take on the designs. I made this by exporting the screen
            as a PDF and then asking the AI agent to rebuild it in code.
          </p>
        </div>
      )}
    </>
  );
}

function ChatBubbleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
      <path
        d="M4 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H9l-4 3v-3a2 2 0 01-1-2V5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 3l6 6M9 3l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DashboardSideRail() {
  const top = ["home", "box", "chart", "settings"] as const;
  const bottom = ["help", "bell", "settings", "logout"] as const;
  return (
    <aside className="flex w-[60px] shrink-0 flex-col items-center justify-between bg-[#2d2438] py-3 text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-white text-sm font-semibold text-[#2d2438]">
          C
        </div>
        <div className="mt-2 flex flex-col items-center gap-1">
          {top.map((k, i) => (
            <button
              key={i}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-[10px] transition",
                k === "settings"
                  ? "bg-[#4a3a63] text-white"
                  : "text-white/60 hover:bg-white/10 hover:text-white",
              )}
              aria-label={k}
            >
              <DashIcon name={k} />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        {bottom.map((k, i) => (
          <button
            key={i}
            className="flex h-9 w-9 items-center justify-center rounded-[10px] text-white/60 hover:bg-white/10 hover:text-white"
            aria-label={k}
          >
            <DashIcon name={k} />
          </button>
        ))}
      </div>
    </aside>
  );
}

function DashboardHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-[#ececf0] px-5 py-3">
      <h1 className="text-[15px] font-semibold text-[#1a1817]">Dashboard</h1>
      <div className="ml-2 flex items-center gap-2">
        <FilterPill leading={<span className="inline-block h-3.5 w-3.5 rounded-sm bg-[#fec9aa]" />} label="Omny, Map..." count={4} />
        <FilterPill leading={<span className="inline-block h-3.5 w-3.5 rounded-sm bg-gradient-to-b from-[#0055a4] via-white to-[#ef4135]" />} label="amazon.fr" count={1} />
        <FilterPill leading={<span className="inline-block h-3.5 w-3.5 rounded-sm bg-[#1a1817]" />} label="B0BH6..." count={4} />
      </div>
      <div className="ml-auto flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#1a1817] hover:bg-[#f4f4f6]">
        € EUR
        <Caret />
      </div>
    </div>
  );
}

function FilterPill({ leading, label, count }: { leading: React.ReactNode; label: string; count: number }) {
  return (
    <button className="flex items-center gap-1.5 rounded-md border border-[#e3e3e8] bg-white px-2 py-1 text-xs font-medium text-[#1a1817] hover:border-[#cfd0d8]">
      {leading}
      <span>{label}</span>
      <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#5b3fbd] text-[10px] font-semibold text-white">
        {count}
      </span>
      <Caret />
    </button>
  );
}

function DashboardTabs() {
  const tabs = [
    { label: "Performance" },
    { label: "Advertising" },
    { label: "Listing" },
    { label: "Profit" },
    { label: "Budget Cockpit", active: true },
  ];
  return (
    <div className="flex items-center gap-1 border-b border-[#ececf0] px-5 pt-2">
      {tabs.map((t) => (
        <button
          key={t.label}
          className={cn(
            "rounded-t-md px-3 py-1.5 text-[13px] font-medium transition",
            t.active
              ? "bg-[#eee7ff] text-[#5b3fbd]"
              : "text-[#6b7280] hover:text-[#1a1817]",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function RevenueCards() {
  const cards = [
    { label: "Yesterday", value: "8 725 €", rows: [["Same day LW", "+6%"], ["Same day LY", "+6%"]] },
    { label: "Week to Date", value: "8 725 €", rows: [["Previous WTD", "+6%"], ["Same period LY", "+6%"]] },
    { label: "Month to Date", value: "8 725 €", rows: [["Previous MTD", "+6%"], ["Same period LY", "+6%"]] },
    { label: "Year to Date", value: "8 725 €", rows: [["Previous YTD", "+6%"]] },
  ];
  return (
    <section className="rounded-[14px] border border-[#ececf0] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold text-[#1a1817]">
          Revenue <span className="font-normal text-[#9ca3af]">excl. VAT</span>
        </h2>
        <InfoIcon />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-[10px] border border-[#ececf0] bg-white p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-[#6b7280]">{c.label}</span>
              <span className="text-[16px] font-semibold text-[#1a1817]">{c.value}</span>
            </div>
            <div className="mt-2 border-t border-[#f1f1f4]" />
            <div className="mt-2 flex flex-col gap-1.5">
              {c.rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-[11px]">
                  <span className="text-[#9ca3af]">{k}</span>
                  <span className="font-medium text-[#22a06b]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function EvolutionPanel() {
  return (
    <section className="rounded-[14px] border border-[#ececf0] bg-white pb-[220px]">
      <div className="flex items-center gap-2 px-4 py-3">
        <h2 className="text-[13px] font-semibold text-[#1a1817]">Evolution</h2>
        <button className="flex h-6 w-6 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f4f4f6]">
          <DownloadIcon />
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f4f4f6]">
          <ChartLineIcon />
        </button>
        <div className="ml-2 flex items-center gap-1 rounded-md border border-[#e3e3e8] bg-white px-2 py-1 text-[11px] font-medium text-[#1a1817]">
          Daily <Caret />
        </div>
        <div className="ml-1 flex items-center gap-1 rounded-md bg-[#eee7ff] px-2 py-1 text-[11px] font-medium text-[#5b3fbd]">
          vs Same day Last Week
        </div>
        <div className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-[#6b7280] hover:bg-[#f4f4f6]">
          vs Same day LY
        </div>
      </div>
      <div className="overflow-hidden">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr>
              <th colSpan={4} className="border-b-2 border-[#5b3fbd] px-2 py-1 text-center text-[11px] font-medium text-[#5b3fbd]">Performance</th>
              <th colSpan={2} className="border-b-2 border-[#a78bdb] px-2 py-1 text-center text-[11px] font-medium text-[#a78bdb]">Supply</th>
              <th colSpan={4} className="border-b-2 border-[#27a3a3] px-2 py-1 text-center text-[11px] font-medium text-[#27a3a3]">Listing</th>
              <th colSpan={3} className="border-b-2 border-[#e0883b] px-2 py-1 text-center text-[11px] font-medium text-[#e0883b]">Advertising</th>
            </tr>
            <tr className="text-[#6b7280]">
              <th className="px-2 py-2 text-left font-medium">Week</th>
              <th className="px-2 py-2 text-left font-medium">Revenue excl. VAT ↑€</th>
              <th className="px-2 py-2 text-left font-medium">Units sold</th>
              <th className="px-2 py-2 text-left font-medium">Avg unit price</th>
              <th className="px-2 py-2 text-left font-medium">Days of inventory</th>
              <th className="px-2 py-2 text-left font-medium">Lost revenue</th>
              <th className="px-2 py-2 text-left font-medium">Impressions</th>
              <th className="px-2 py-2 text-left font-medium">Page views</th>
              <th className="px-2 py-2 text-left font-medium">CTR</th>
              <th className="px-2 py-2 text-left font-medium">CVR</th>
              <th className="px-2 py-2 text-left font-medium">% of PPC sale</th>
              <th className="px-2 py-2 text-left font-medium">% of buybox</th>
              <th className="px-2 py-2 text-left font-medium">TACOS</th>
            </tr>
          </thead>
          <tbody>
            {evoRows.map((r, i) => (
              <tr key={i} className={cn("border-t border-[#f1f1f4]", r.selected && "bg-[#faf6ff]")}>
                <td className="px-2 py-1.5 text-[#1a1817]">
                  <div className="flex items-center gap-1.5">
                    <MagnifierIcon />
                    <span>{r.date}</span>
                  </div>
                </td>
                <td className="px-2 py-1.5">
                  {r.selected ? (
                    <SelectButton kind="select" />
                  ) : (
                    <CellBar value={r.revenue} delta={r.revenueDelta} trend={r.revenueTrend} bar={r.revenueBar} color="#a78bdb" />
                  )}
                </td>
                <td className="px-2 py-1.5"><CellBar value={r.units} delta={r.unitsDelta} trend={r.unitsTrend} bar={r.unitsBar} color="#a78bdb" /></td>
                <td className="px-2 py-1.5"><CellBar value={r.avgPrice} delta={r.avgDelta} trend={r.avgTrend} bar={r.avgBar} color="#a78bdb" /></td>
                <td className="px-2 py-1.5"><DaysBar days={r.days} bar={r.daysBar} /></td>
                <td className="px-2 py-1.5"><LostRevCell value={r.lostRev} bar={r.lostBar} /></td>
                <td className="px-2 py-1.5"><CellSimple value={r.impressions} delta={r.impDelta} trend={r.impTrend} /></td>
                <td className="px-2 py-1.5"><CellSimple value={r.pageViews} delta={r.pageDelta} trend={r.pageTrend} /></td>
                <td className="p-0"><HeatCell value={r.ctr} heat={r.ctrHeat} /></td>
                <td className="p-0"><HeatCell value={r.cvr} heat={r.cvrHeat} /></td>
                <td className="px-2 py-1.5"><PpcCell value={r.ppcSales} /></td>
                <td className="px-2 py-1.5"><BuyboxCell value={r.buybox} green={r.buyboxDotGreen} /></td>
                <td className="px-2 py-1.5"><TacosPill value={r.tacos} cls={r.tacosBg} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BreakdownPanel() {
  return (
    <section className="absolute bottom-0 left-0 right-0 rounded-[14px] border border-[#ececf0] bg-white shadow-[0_-6px_24px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between border-b border-[#f1f1f4] px-4 py-2">
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#6b7280]">Breakdown by</span>
          <button className="rounded-md bg-[#eee7ff] px-2.5 py-1 text-[12px] font-medium text-[#5b3fbd]">Seller</button>
          <button className="px-2.5 py-1 text-[12px] font-medium text-[#6b7280] hover:text-[#1a1817]">Marketplace</button>
          <button className="px-2.5 py-1 text-[12px] font-medium text-[#6b7280] hover:text-[#1a1817]">Product</button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border border-[#e3e3e8] px-2 py-1 text-[11px] text-[#6b7280]">
            <CalendarIcon /> 27 Oct - 03 Nov 2023
          </div>
          <div className="rounded-md bg-[#eee7ff] px-2 py-1 text-[11px] font-medium text-[#5b3fbd]">Last 7 days</div>
          <div className="ml-1 flex items-center gap-1">
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f4f4f6]"><MinIcon /></button>
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f4f4f6]"><SwapIcon /></button>
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f4f4f6]"><ExpandIcon /></button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="text-[#6b7280]">
              <th className="px-2 py-2 text-left font-medium">Product</th>
              <th className="px-2 py-2 text-left font-medium">Revenue excl. VAT €⇄%</th>
              <th className="px-2 py-2 text-left font-medium">Units sold</th>
              <th className="px-2 py-2 text-left font-medium">Avg unit price</th>
              <th className="px-2 py-2 text-left font-medium">Days of inve...</th>
              <th className="px-2 py-2 text-left font-medium">Lost revenue</th>
              <th className="px-2 py-2 text-left font-medium">% of ASIN sold</th>
              <th className="px-2 py-2 text-left font-medium">Org. CVR</th>
              <th className="px-2 py-2 text-left font-medium">% of buybox</th>
              <th className="px-2 py-2 text-left font-medium">Page views ↓</th>
              <th className="px-2 py-2 text-left font-medium">% of PPC sa</th>
            </tr>
          </thead>
          <tbody>
            {breakdownRows.map((r, i) => (
              <tr key={i} className={cn("border-t border-[#f1f1f4]", r.state === "deselect" && "bg-[#faf6ff]")}>
                <td className="px-2 py-1.5">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 rounded-md" style={{ background: r.thumb }} />
                    <div className="leading-tight">
                      <div className="text-[#1a1817]">{r.name}</div>
                      <div className="text-[10px] text-[#9ca3af]">{r.asin}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-1.5"><CellBar value={r.revenue} delta={r.revenueDelta} trend={r.revenueTrend} bar={r.revenueBar} color="#a78bdb" /></td>
                <td className="px-2 py-1.5">
                  {r.state === "deselect" ? (
                    <SelectButton kind="deselect" />
                  ) : r.state === "select" ? (
                    <SelectButton kind="select" />
                  ) : (
                    <CellBar value={r.units} delta={r.unitsDelta} trend={r.unitsTrend} bar={r.unitsBar} color="#a78bdb" />
                  )}
                </td>
                <td className="px-2 py-1.5"><CellBar value={r.avgPrice} delta={r.avgDelta} trend={r.avgTrend} bar={r.avgBar} color="#a78bdb" /></td>
                <td className="px-2 py-1.5"><DaysBar days={r.days} bar={r.daysBar} /></td>
                <td className="px-2 py-1.5"><LostRevCell value={r.lostRev} bar={r.lostBar} /></td>
                <td className="px-2 py-1.5"><AsinSoldCell value={r.asinSold} dot={r.asinSoldDot} /></td>
                <td className="p-0"><HeatCell value={r.orgCvr} heat={r.orgCvrHeat} /></td>
                <td className="px-2 py-1.5"><BuyboxCell value={r.buybox} green={r.buyboxDotGreen} /></td>
                <td className="px-2 py-1.5"><CellSimple value={r.pageViews} delta={r.pageDelta} trend={r.pageTrend} /></td>
                <td className="px-2 py-1.5"><PpcCell value={r.ppcSales} /></td>
              </tr>
            ))}
            <tr className="border-t border-[#ececf0] bg-[#fafafb] font-semibold text-[#1a1817]">
              <td className="px-2 py-2">TOTAL</td>
              <td className="px-2 py-2"><CellBar value="32.2k €" delta="↑20%" trend="up" bar={70} color="#a78bdb" /></td>
              <td className="px-2 py-2">3,645</td>
              <td className="px-2 py-2">50.00 €</td>
              <td className="px-2 py-2">56</td>
              <td className="px-2 py-2"><span className="text-[#c84141]">7 148 €</span></td>
              <td className="px-2 py-2">43%</td>
              <td className="p-0"><HeatCell value="22%" heat="green" /></td>
              <td className="px-2 py-2"><BuyboxCell value="96%" green /></td>
              <td className="px-2 py-2">6 712</td>
              <td className="px-2 py-2">72%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

// --- v2 cell primitives ---

function CellBar({ value, delta, trend, bar, color }: { value: string; delta: string; trend: Trend; bar: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex min-w-[60px] flex-col leading-tight">
        <span className="text-[#1a1817]">{value || ""}</span>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#f1edfb]">
          <div className="h-full rounded-full" style={{ width: `${bar}%`, background: color }} />
        </div>
      </div>
      <Delta value={delta} trend={trend} />
    </div>
  );
}

function CellSimple({ value, delta, trend }: { value: string; delta?: string; trend?: Trend }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#1a1817]">{value}</span>
      {delta ? <Delta value={delta} trend={trend ?? "flat"} /> : null}
    </div>
  );
}

function Delta({ value, trend }: { value: string; trend: Trend }) {
  if (!value) return <span className="text-[#9ca3af]">-</span>;
  const color = trend === "up" ? "text-[#22a06b]" : trend === "down" ? "text-[#c84141]" : "text-[#9ca3af]";
  return <span className={cn("text-[10px] font-medium", color)}>{value}</span>;
}

function DaysBar({ days, bar }: { days: number; bar: number }) {
  if (days === 0) return <span className="text-[#9ca3af]">-</span>;
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[20px] text-[#1a1817]">{days}</span>
      <div className="h-1 w-12 overflow-hidden rounded-full bg-[#f4f0ea]">
        <div className="h-full rounded-full bg-[#c08b5b]" style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}

function LostRevCell({ value, bar }: { value: string; bar: number }) {
  if (!value) return <span className="text-[#9ca3af]">-</span>;
  return (
    <div className="flex flex-col gap-0.5 leading-tight">
      <span className="font-medium text-[#c84141]">{value}</span>
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#fdecec]">
        <div className="h-full rounded-full bg-[#ef7d81]" style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}

function HeatCell({ value, heat }: { value: string; heat: Heat }) {
  if (!value) return <span className="px-2 text-[#9ca3af]">-</span>;
  const bg = heat === "green" ? "bg-[#bfe6c9]" : heat === "lime" ? "bg-[#d8eb9a]" : heat === "yellow" ? "bg-[#fce29b]" : "bg-[#f5b6b6]";
  return (
    <div className={cn("flex h-full min-h-[28px] items-center px-2 py-1.5 font-medium text-[#1a1817]", bg)}>
      {value}
    </div>
  );
}

function PpcCell({ value }: { value: string }) {
  if (!value) return <span className="text-[#9ca3af]">-</span>;
  return (
    <div className="flex items-center gap-2">
      <span className="text-[#1a1817]">{value}</span>
      <div className="h-1 w-8 overflow-hidden rounded-full bg-[#dde7fb]">
        <div className="h-full w-full rounded-full bg-[#4a88f4]" />
      </div>
    </div>
  );
}

function BuyboxCell({ value, green }: { value: string; green: boolean }) {
  if (!value) return <span className="text-[#9ca3af]">-</span>;
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("h-1.5 w-1.5 rounded-full", green ? "bg-[#22a06b]" : "bg-[#ef7d81]")} />
      <span className="text-[#1a1817]">{value}</span>
    </div>
  );
}

function TacosPill({ value, cls }: { value: string; cls: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium", cls)}>{value}</span>
  );
}

function AsinSoldCell({ value, dot }: { value: string; dot: "grey" | "green" }) {
  if (!value) return <span className="text-[#9ca3af]">-</span>;
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[#1a1817]">{value}</span>
      <div className="h-1 w-8 overflow-hidden rounded-full bg-[#ececf0]">
        <div className={cn("h-full rounded-full", dot === "green" ? "bg-[#22a06b]" : "bg-[#cfd0d8]")} style={{ width: "80%" }} />
      </div>
    </div>
  );
}

function SelectButton({ kind }: { kind: "select" | "deselect" }) {
  return (
    <button className="inline-flex items-center gap-1 rounded-md border border-[#e3e3e8] bg-white px-2 py-1 text-[11px] font-medium text-[#1a1817] shadow-sm">
      <MagnifierIcon />
      {kind === "select" ? "Select" : "Deselect"}
    </button>
  );
}

// --- v2 icons ---

function Caret() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="#9ca3af" strokeWidth="1.2" />
      <path d="M7 6v3.5M7 4.2v.6" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v6m0 0l-2.2-2.2M7 8l2.2-2.2M3 11h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChartLineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 11l3-3 2 2 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MagnifierIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <circle cx="5" cy="5" r="3.2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7.5 7.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2 6h10M5 2v2M9 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function MinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 9h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 4h6l-2-2M10 8H4l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 3h3M3 3v3M9 9H6M9 9V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function DashIcon({ name }: { name: string }) {
  const stroke = "currentColor";
  switch (name) {
    case "home":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M3 9l6-5 6 5v6a1 1 0 01-1 1h-3v-4H7v4H4a1 1 0 01-1-1V9z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
    case "box":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M9 2l6 3.2v7L9 15.4 3 12.2v-7L9 2zM3 5.5l6 3 6-3M9 8.5V15" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M3 13l4-4 3 3 5-6" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "settings":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="2" stroke={stroke} strokeWidth="1.3" />
          <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4 4l1.4 1.4M12.6 12.6L14 14M4 14l1.4-1.4M12.6 5.4L14 4" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "help":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="6.5" stroke={stroke} strokeWidth="1.3" />
          <path d="M7.4 7a1.7 1.7 0 113.2.6c-.4.7-1.6.7-1.6 1.6V10M9 12.5v.4" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );
    case "bell":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M4 13h10l-1.2-1.5V8a3.8 3.8 0 10-7.6 0v3.5L4 13zM7.6 15a1.4 1.4 0 002.8 0" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      );
    case "logout":
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
          <path d="M7 3H4a1 1 0 00-1 1v10a1 1 0 001 1h3M11 6l3 3-3 3M14 9H7" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
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
