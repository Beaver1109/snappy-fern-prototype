import { useRef, useEffect, useMemo } from 'react';
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
  DexTag,
} from '@thryvlabs/dex-react';
import {
  ACCOUNT_GROWTH_DATA,
  getChartTokens,
  CHART_BLUE,
  CHART_BLUE_EMPHASIS,
} from './dashboardData';

export function AccountGrowthWidget() {
  const chartRef  = useRef<HTMLDivElement>(null);
  const chartInst = useRef<echarts.ECharts | null>(null);

  const chartData = ACCOUNT_GROWTH_DATA.Month;

  const momGrowth = useMemo(() => {
    if (chartData.length < 2) return null;
    const last = chartData[chartData.length - 1].accounts;
    const prev = chartData[chartData.length - 2].accounts;
    const pct = prev > 0 ? Math.round(((last - prev) / prev) * 100) : 0;
    const label = pct >= 10 ? 'Growing' : pct >= 0 ? 'Stable' : 'Declining';
    return {
      pct,
      color: pct >= 0 ? 'success' : 'danger',
      icon: pct >= 0 ? 'arrow-up-right' : 'arrow-down-right',
      label,
    };
  }, []);

  function buildOptions(): echarts.EChartsOption {
    const t = getChartTokens();
    return {
      grid: { left: '3%', right: '3%', bottom: '3%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: chartData.map((d) => d.label),
        axisLine: { lineStyle: { color: t.border.neutralSubtle } },
        axisTick: { show: false },
        axisLabel: { color: t.text.subtle, fontSize: 12 },
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
          const arr = params as Array<{ axisValue: string; value: number }>;
          const p = arr[0];
          return `<div style="font-weight:600;margin-bottom:2px">${p.axisValue}</div>`
            + `<span style="color:${CHART_BLUE};font-weight:700">${p.value}</span> new accounts`;
        },
      },
      series: [
        {
          type: 'bar',
          data: chartData.map((d) => d.accounts),
          barWidth: '50%',
          itemStyle: { color: CHART_BLUE, borderRadius: [4, 4, 0, 0] },
          emphasis: { itemStyle: { color: CHART_BLUE_EMPHASIS } },
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

        {/* Header + trend tag — fixed height so pill aligns across all 3 cards */}
        <div style={{ height: '86px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <DexInline alignX="spread" alignY="start" stretch>
            <DexStack gap="025">
              <DexInline alignY="center" gap="050">
                <DexText variant="headline-4">New accounts</DexText>
                <DexIconButton
                  name="info"
                  label="Count of new accounts created during the selected time period."
                  size="dense"
                />
              </DexInline>
              <DexText variant="caption" color="subtle">Filtered by: Paid accounts</DexText>
            </DexStack>
            <DexDropdownMenu
              align="end"
              content={<DexDropdownMenuItem>Export data</DexDropdownMenuItem>}
            >
              <DexIconButton name="more-vertical" label="More options" size="dense" />
            </DexDropdownMenu>
          </DexInline>
          {momGrowth && (
            <DexTag color={momGrowth.color as 'success' | 'danger'} leadingIcon={momGrowth.icon}>
              {momGrowth.label}
            </DexTag>
          )}
        </div>

        {/* Bar chart */}
        <div
          ref={chartRef}
          style={{ marginTop: '12px', minHeight: '240px', width: '100%', flex: 1 }}
        />

        {/* Footer */}
        <DexBox
          paddingTop="150"
          style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.06))' }}
        >
          <DexLink to="/partner-hub/account-growth">Show details</DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
