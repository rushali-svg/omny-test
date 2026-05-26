import { notFound } from "next/navigation";
import { DspPrototype } from "@/prototypes/dsp/iter-01-dsp-discovery/DspPrototype";
import {
  DSP_TABS,
  isDspTabSlug,
  parseComparison,
  parsePeriod,
  parseTimeframe,
} from "@/prototypes/dsp/iter-01-dsp-discovery/model";

export const dynamicParams = false;

export function generateStaticParams() {
  return DSP_TABS.map((tab) => ({ tab }));
}

export default async function DspTabPage({
  params,
  searchParams,
}: {
  params: Promise<{ tab: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tab } = await params;

  if (!isDspTabSlug(tab)) {
    notFound();
  }

  const query = await searchParams;

  return (
    <DspPrototype
      tab={tab}
      period={parsePeriod(query.period)}
      comparison={parseComparison(query.comparison)}
      timeframe={parseTimeframe(query.timeframe)}
    />
  );
}
