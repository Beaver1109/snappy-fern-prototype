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
  LOGIN_SERIES,
  LOGIN_DONUT_COUNTS,
  getChartTokens,
} from './dashboardData';

const TREND_META: Record<string, { color: string; icon: string }> = {
  Increasing: { color: 'success', icon: 'arrow-up-right'   },
  Stable:     { color: 'neutral', icon: 'arrow-right'       },
  Declining:  { color: 'warning', icon: 'arrow-down-right'  },
  Dormant:    { color: 'neutral', icon: 'minus'             },
};

export function LoginEngagementWidget() {
  const chartRef  = useRef<HTMLDivElement>(null);
  const chartInst = useRef<echarts.ECharts | null>(null);

  const total = useMemo(
    () => LOGIN_DONUT_COUNTS.reduce((s, d) => s + d.value, 0),
    [],
  );

  const dominantTrend = useMemo(() => {
    const top = [...LOGIN_DONUT_COUNTS].sort((a, b) => b.value - a.value)[0];
    const key = LOGIN_SERIES.find((s) => s.label === top.name)?.key ?? 'Stable';
    return { key, label: top.name, ...TREND_META[key] };
  }, []);

  function buildOptions(): echarts.EChartsOption {
    const t = getChartTokens();
    return {
      tooltip: {
        trigger: 'item',
        formatter: (params: unknown) => {
          const p = params as { name: string; value: number };
          const pct = total > 0 ? Math.round((p.value / total) * 100) : 0;
          return `${p.name}: ${p.value} accounts (${pct}%)`;
        },
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '38%',
          style: {
            text: String(total),
            fontSize: 24,
            fontWeight: 700,
            fill: t.text.default,
          },
        },
        {
          type: 'text',
          left: 'center',
          top: '50%',
          style: {
            text: 'accounts',
            fontSize: 12,
            fill: t.text.subtle,
          },
        },
      ],
      series: [
        {
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '48%'],
          avoidLabelOverlap: false,
          padAngle: 2,
          itemStyle: { borderRadius: 4 },
          label: { show: false },
          data: LOGIN_DONUT_COUNTS.map((d, i) => ({
            name: d.name,
            value: d.value,
            itemStyle: { color: LOGIN_SERIES[i].color },
          })),
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
                <DexText variant="headline-4">Login engagement</DexText>
                <DexIconButton
                  name="info"
                  label="Shows how actively your accounts are logging in."
                  size="dense"
                />
              </DexInline>
              <DexText variant="caption" color="subtle">Accounts grouped by login activity</DexText>
            </DexStack>
            <DexDropdownMenu
              align="end"
              content={<DexDropdownMenuItem>Export data</DexDropdownMenuItem>}
            >
              <DexIconButton name="more-vertical" label="More options" size="dense" />
            </DexDropdownMenu>
          </DexInline>
          <DexTag color={dominantTrend.color as 'success' | 'neutral' | 'warning' | 'danger'} leadingIcon={dominantTrend.icon}>
            {dominantTrend.label}
          </DexTag>
        </div>

        {/* Donut chart */}
        <div
          ref={chartRef}
          style={{ marginTop: '12px', minHeight: '220px', width: '100%', flex: 1 }}
        />

        {/* Legend */}
        <DexInline alignX="center" gap="200" style={{ flexWrap: 'wrap', paddingBottom: 'var(--dex-spacing-150, 12px)' }}>
          {LOGIN_SERIES.map((s, i) => {
            const count = LOGIN_DONUT_COUNTS[i];
            const pct = total > 0 ? Math.round((count.value / total) * 100) : 0;
            return (
              <DexInline key={s.key} alignY="center" gap="075">
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    background: s.color,
                    flexShrink: 0,
                  }}
                />
                <DexText variant="caption">{s.label}</DexText>
                <DexText variant="caption" color="subtle">
                  {count.value} ({pct}%)
                </DexText>
              </DexInline>
            );
          })}
        </DexInline>

        {/* Footer */}
        <DexBox
          paddingTop="150"
          style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.06))' }}
        >
          <DexLink to="/partner-hub/login-engagement">
            Show details
          </DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
