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
  DexTag,
} from '@thryvlabs/dex-react';
import {
  MONTHLY_CHURN,
  CHURN_DELTA_PCT,
  getChartTokens,
  CHART_BLUE,
  CHART_BLUE_EMPHASIS,
} from './dashboardData';

export function ChurnedAccountsWidget() {
  const chartRef  = useRef<HTMLDivElement>(null);
  const chartInst = useRef<echarts.ECharts | null>(null);

  function buildOptions(): echarts.EChartsOption {
    const t = getChartTokens();
    return {
      grid: { left: '3%', right: '3%', bottom: '3%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: MONTHLY_CHURN.map((d) => d.month),
        axisLine: { lineStyle: { color: t.border.neutralSubtle } },
        axisTick: { show: false },
        axisLabel: { color: t.text.subtle, fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisLabel: { color: t.text.subtle, fontSize: 11 },
        splitLine: { lineStyle: { color: t.border.neutralSubtle, type: 'dashed' } },
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
            + `<span style="color:${CHART_BLUE};font-weight:700">${p.value}</span> churned accounts`;
        },
      },
      series: [
        {
          type: 'bar',
          data: MONTHLY_CHURN.map((d) => d.churned),
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
                <DexText variant="headline-4">Churned accounts</DexText>
                <DexIconButton
                  name="info"
                  label="Accounts with Billing Status = Inactive. Churned data is retained for 13 months post-cancellation."
                  size="dense"
                />
              </DexInline>
              <DexText variant="caption" color="subtle">Accounts that became inactive over time</DexText>
            </DexStack>
            <DexDropdownMenu
              align="end"
              content={<DexDropdownMenuItem>Export data</DexDropdownMenuItem>}
            >
              <DexIconButton name="more-vertical" label="More options" size="dense" />
            </DexDropdownMenu>
          </DexInline>
          <DexTag color="danger" leadingIcon="arrow-up-right">Rising</DexTag>
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
          <DexLink to="/partner-hub/churned-accounts">Show details</DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
