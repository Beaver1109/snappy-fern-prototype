import { useRef, useEffect, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import {
  DexCard,
  DexBox,
  DexInline,
  DexStack,
  DexText,
  DexIconButton,
  DexLink,
  DexButton,
  DexDropdownMenu,
  DexDropdownMenuItem,
  DexTag,
} from '@thryvlabs/dex-react';
import {
  EMAIL_METRICS,
  EMAIL_WEEK_LABELS,
  EMAIL_TREND_DATA,
  EMAIL_AGGREGATE_DATA,
  EMAIL_AVERAGE_DATA,
  getChartTokens,
  CHART_BLUE,
  CHART_PARTIAL_BLUE,
} from './dashboardData';

function formatMetricValue(value: number, format: 'number' | 'percent'): string {
  if (format === 'percent') return `${value.toFixed(1)}%`;
  if (value >= 1000) return value.toLocaleString();
  return String(value);
}

function formatDelta(delta: number): string {
  return `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`;
}

function getDeltaColor(delta: number, invertDelta: boolean): 'success' | 'danger' | 'neutral' {
  if (delta === 0) return 'neutral';
  const isGood = invertDelta ? delta < 0 : delta >= 0;
  return isGood ? 'success' : 'danger';
}

function getDeltaIcon(delta: number): string | undefined {
  if (delta === 0) return undefined;
  return delta > 0 ? 'arrow-up-right' : 'arrow-down-right';
}

export function EmailBroadcastWidget() {
  const [mode, setMode]                   = useState<string>('aggregate');
  const [selectedRange, setSelectedRange] = useState('Last 30 days');
  const [selectedMetric, setSelectedMetric] = useState(EMAIL_METRICS[0].key);

  const chartRef  = useRef<HTMLDivElement>(null);
  const chartInst = useRef<echarts.ECharts | null>(null);

  const sourceData = useMemo(() => {
    const table = mode === 'aggregate' ? EMAIL_AGGREGATE_DATA : EMAIL_AVERAGE_DATA;
    return table[selectedRange] ?? table['Last 30 days'];
  }, [mode, selectedRange]);

  const metricValues = useMemo(() =>
    EMAIL_METRICS.map((m) => {
      const entry = sourceData[m.key] as { value: number; prev: number } | undefined;
      const value = entry?.value ?? 0;
      const prev  = entry?.prev  ?? 0;
      const delta = prev !== 0 ? ((value - prev) / prev) * 100 : 0;
      return { ...m, value, prev, delta };
    }),
    [sourceData],
  );

  const subtitle = `${mode === 'aggregate' ? 'Aggregate' : 'Average'} · ${selectedRange}`;

  const chartLabel = useMemo(() => {
    const metric = EMAIL_METRICS.find((m) => m.key === selectedMetric);
    return `${metric?.label ?? ''} — weekly, ${selectedRange.toLowerCase()}`;
  }, [selectedMetric, selectedRange]);

  function buildOptions(): echarts.EChartsOption {
    const t = getChartTokens();
    const seriesData = EMAIL_TREND_DATA[selectedMetric] ?? [];
    const barData = seriesData.map((v, i) => ({
      value: v,
      itemStyle: {
        color: i === seriesData.length - 1 ? CHART_PARTIAL_BLUE : CHART_BLUE,
        borderRadius: [4, 4, 0, 0] as [number, number, number, number],
      },
    }));

    return {
      grid: { left: '3%', right: '3%', bottom: '3%', top: '8%', containLabel: true },
      xAxis: {
        type: 'category',
        data: EMAIL_WEEK_LABELS,
        axisLine: { lineStyle: { color: t.border.neutralSubtle } },
        axisTick: { show: false },
        axisLabel: { color: t.text.subtle, fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        min: 0,
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
          const arr = params as Array<{ axisValue: string; value: number; dataIndex: number }>;
          const p = arr[0];
          const metric = EMAIL_METRICS.find((m) => m.key === selectedMetric);
          const isPartial = p.dataIndex === seriesData.length - 1;
          const valStr = metric?.format === 'percent' ? `${p.value}%` : p.value.toLocaleString();
          return `<div style="font-weight:600;margin-bottom:2px">${p.axisValue}${isPartial ? ' (partial)' : ''}</div>`
            + `<span style="color:${CHART_BLUE};font-weight:700">${valStr}</span>`;
        },
      },
      series: [{ type: 'bar', data: barData, barWidth: '55%' }],
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

  useEffect(() => {
    chartInst.current?.setOption(buildOptions(), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMetric, selectedRange, mode]);

  return (
    <DexCard elevation="flat" style={{ height: '100%' }}>
      <DexBox padding="300" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <DexInline alignX="spread" alignY="center" stretch>
          <DexStack gap="025">
            <DexText variant="headline-4">Email broadcast performance</DexText>
            <DexText variant="caption" color="subtle">{subtitle}</DexText>
          </DexStack>
          <DexInline alignY="center" gap="100">
            <DexDropdownMenu
              align="end"
              content={
                <>
                  <DexDropdownMenuItem onSelect={() => setMode('aggregate')}>Aggregate</DexDropdownMenuItem>
                  <DexDropdownMenuItem onSelect={() => setMode('average')}>Average</DexDropdownMenuItem>
                </>
              }
            >
              <DexButton variant="outline" size="dense" trailingIcon="chevron-down">
                {mode === 'aggregate' ? 'Aggregate' : 'Average'}
              </DexButton>
            </DexDropdownMenu>
            <DexIconButton name="more-vertical" label="More options" size="dense" />
          </DexInline>
        </DexInline>

        {/* Metric tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            border: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))',
            borderRadius: '8px',
            overflow: 'hidden',
            marginTop: 'var(--dex-spacing-200)',
          }}
        >
          {metricValues.map((metric, idx) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              style={{
                all: 'unset',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--dex-spacing-050)',
                padding: 'var(--dex-spacing-200)',
                borderRight:
                  idx < metricValues.length - 1
                    ? '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))'
                    : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
                backgroundColor:
                  selectedMetric === metric.key
                    ? 'var(--dex-backgroundColor-brand-subtle, #EBF4FF)'
                    : 'var(--dex-backgroundColor-surface-default, #fff)',
              }}
            >
              <DexText
                variant="caption"
                color="subtle"
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {metric.label}
              </DexText>
              <DexText variant="headline-3" style={{ lineHeight: 1.2 }}>
                {formatMetricValue(metric.value, metric.format)}
              </DexText>
              <DexTag
                color={getDeltaColor(metric.delta, metric.invertDelta)}
                leadingIcon={getDeltaIcon(metric.delta)}
              >
                {formatDelta(metric.delta)}
              </DexTag>
            </button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ marginTop: 'var(--dex-spacing-200)' }}>
          <DexText variant="caption" color="subtle" style={{ marginBottom: 'var(--dex-spacing-100)' }}>
            {chartLabel}
          </DexText>
          <div ref={chartRef} style={{ minHeight: '200px', width: '100%' }} />

          {/* Legend */}
          <DexInline alignX="center" alignY="center" gap="200" stretch style={{ marginTop: 'var(--dex-spacing-150)', marginBottom: 'var(--dex-spacing-150)' }}>
            <DexInline gap="100" alignY="center">
              <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: CHART_BLUE, flexShrink: 0 }} />
              <DexText variant="caption" color="subtle">Complete period</DexText>
            </DexInline>
            <DexInline gap="100" alignY="center">
              <span style={{ display: 'inline-block', width: '12px', height: '12px', backgroundColor: CHART_PARTIAL_BLUE, flexShrink: 0 }} />
              <DexText variant="caption" color="subtle">Partial period</DexText>
            </DexInline>
          </DexInline>
        </div>

        {/* Footer */}
        <DexBox
          paddingTop="150"
          style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.06))' }}
        >
          <DexLink to="/partner-hub/performance?tab=email-broadcasts">Show details</DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
