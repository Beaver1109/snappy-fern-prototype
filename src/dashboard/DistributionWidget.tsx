import { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import {
  DexCard,
  DexBox,
  DexInline,
  DexStack,
  DexText,
  DexIconButton,
  DexLink,
  DexDropdownMenu,
  DexDropdownMenuItem,
} from '@thryvlabs/dex-react';
import { MOCK_DISTRIBUTION, getChartTokens } from './dashboardData';

const CATEGORY_COLOR: Record<string, string> = {
  none:     '#94A3B8',
  low:      '#D97706',
  building: '#3392FF',
  active:   '#22C55E',
  power:    '#8B5CF6',
};

function getCategory(bucket: number): string {
  if (bucket === 0)              return 'none';
  if (bucket <= 3)               return 'low';
  if (bucket <= 7)               return 'building';
  if (bucket <= 12)              return 'active';
  return 'power';
}

const LEGEND = [
  { key: 'none',     label: 'None (0)',     color: CATEGORY_COLOR.none     },
  { key: 'low',      label: 'Low (1-3)',    color: CATEGORY_COLOR.low      },
  { key: 'building', label: 'Building (4-7)', color: CATEGORY_COLOR.building },
  { key: 'active',   label: 'Active (8-12)', color: CATEGORY_COLOR.active  },
  { key: 'power',    label: 'Power (13+)',  color: CATEGORY_COLOR.power    },
];

export function DistributionWidget() {
  const chartRef  = useRef<HTMLDivElement>(null);
  const chartInst = useRef<echarts.ECharts | null>(null);

  function buildOptions(): echarts.EChartsOption {
    const t = getChartTokens();
    return {
      grid: { left: '3%', right: '3%', bottom: '3%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: MOCK_DISTRIBUTION.map((d) => String(d.bucket)),
        axisLine: { lineStyle: { color: t.border.neutralSubtle } },
        axisTick: { show: false },
        axisLabel: { color: t.text.subtle, fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        min: 0,
        minInterval: 1,
        axisLabel: { color: t.text.subtle, fontSize: 11 },
        splitLine: { lineStyle: { color: t.border.neutralSubtle, type: 'dashed' } },
        axisLine: { show: false },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: t.background.default,
        borderColor: t.border.neutralSubtle,
        textStyle: { color: t.text.default, fontSize: 12 },
        formatter: (params: unknown) => {
          const arr = params as Array<{ axisValue: string; value: number; color: string }>;
          const p = arr[0];
          return `<div style="font-weight:600;margin-bottom:2px">Bucket ${p.axisValue}</div>`
            + `<span style="color:${p.color};font-weight:700">${p.value}</span> accounts`;
        },
      },
      series: [
        {
          type: 'bar',
          barWidth: '60%',
          data: MOCK_DISTRIBUTION.map((d) => ({
            value: d.accountCount,
            itemStyle: {
              color: CATEGORY_COLOR[getCategory(d.bucket)],
              borderRadius: [3, 3, 0, 0] as [number, number, number, number],
            },
          })),
          cursor: 'pointer',
        },
      ],
    };
  }

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    chartInst.current = chart;
    chart.setOption(buildOptions());
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);
    return () => {
      chart.dispose();
      chartInst.current = null;
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DexCard elevation="flat" style={{ height: '100%' }}>
      <DexBox padding="300" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <DexInline alignX="spread" alignY="start" stretch>
          <DexStack gap="025">
            <DexInline alignY="center" gap="050">
              <DexText variant="headline-4">Distribution</DexText>
              <DexIconButton name="info" label="Distribution of automations per account." size="dense" />
            </DexInline>
            <DexText variant="caption" color="subtle">Jul 14, 26 - Aug 13, 26</DexText>
          </DexStack>
          <DexDropdownMenu
            align="end"
            content={<DexDropdownMenuItem>Export data</DexDropdownMenuItem>}
          >
            <DexIconButton name="more-vertical" label="More options" size="dense" />
          </DexDropdownMenu>
        </DexInline>

        {/* Bar chart */}
        <div ref={chartRef} style={{ marginTop: '12px', minHeight: '220px', width: '100%', flex: 1 }} />

        {/* Legend */}
        <DexInline alignX="center" gap="150" style={{ flexWrap: 'wrap', paddingBottom: 'var(--dex-spacing-150)' }}>
          {LEGEND.map((l) => (
            <DexInline key={l.key} alignY="center" gap="075">
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: l.color, flexShrink: 0 }} />
              <DexText variant="caption">{l.label}</DexText>
            </DexInline>
          ))}
        </DexInline>

        {/* Footer */}
        <DexBox
          paddingTop="150"
          style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.06))' }}
        >
          <DexLink to="/partner-hub/performance?tab=automations#section-distribution">Show details</DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
