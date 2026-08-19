import { useState, useMemo } from 'react';
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
  MOCK_PORTFOLIO_METRICS,
  AUTOMATION_METRIC_DEFS,
  AutomationMetrics,
} from './dashboardData';

const MOCK_SUB_ACCOUNT_COUNT = 30;

function formatValue(v: number, isRate: boolean): string {
  if (isRate) return `${(v * 100).toFixed(1)}%`;
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return v.toLocaleString();
  return String(v);
}

function formatDelta(d: number, isRate: boolean): string {
  const sign = d >= 0 ? '+' : '';
  if (isRate) return `${sign}${(d * 100).toFixed(1)}%`;
  const abs = Math.abs(d);
  return `${sign}${abs >= 1_000 ? abs.toLocaleString() : abs}`;
}

function deltaColor(d: number, invertDelta: boolean): 'success' | 'danger' | 'neutral' {
  if (d === 0) return 'neutral';
  const isGood = invertDelta ? d < 0 : d > 0;
  return isGood ? 'success' : 'danger';
}

function deltaIcon(d: number): string | undefined {
  if (d === 0) return undefined;
  return d > 0 ? 'arrow-up-right' : 'arrow-down-right';
}

export function AutomationPerformanceWidget() {
  const [aggregateMode, setAggregateMode] = useState<string>('aggregate');

  const portfolioMetrics = useMemo((): AutomationMetrics => {
    if (aggregateMode === 'average') {
      const count = MOCK_SUB_ACCOUNT_COUNT;
      return {
        ...MOCK_PORTFOLIO_METRICS,
        contactsInAutomations: Math.round(MOCK_PORTFOLIO_METRICS.contactsInAutomations / count),
        emailsSent:            Math.round(MOCK_PORTFOLIO_METRICS.emailsSent / count),
        delivered:             Math.round(MOCK_PORTFOLIO_METRICS.delivered / count),
        complaints:            Math.round(MOCK_PORTFOLIO_METRICS.complaints / count),
        publishedAutomations:  Math.round(MOCK_PORTFOLIO_METRICS.publishedAutomations / count),
        ctr:                   MOCK_PORTFOLIO_METRICS.ctr,
      };
    }
    return MOCK_PORTFOLIO_METRICS;
  }, [aggregateMode]);

  return (
    <DexCard elevation="flat" style={{ height: '100%' }}>
      <DexBox padding="300" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <DexInline alignX="spread" alignY="center" stretch>
          <DexStack gap="025">
            <DexText variant="headline-4">Automation KPIs</DexText>
            <DexText variant="caption" color="subtle">Portfolio automation metrics</DexText>
          </DexStack>
          <DexInline alignY="center" gap="100">
            <DexDropdownMenu
              align="end"
              content={
                <>
                  <DexDropdownMenuItem onSelect={() => setAggregateMode('aggregate')}>Aggregate</DexDropdownMenuItem>
                  <DexDropdownMenuItem onSelect={() => setAggregateMode('average')}>Average</DexDropdownMenuItem>
                </>
              }
            >
              <DexButton variant="outline" size="dense" trailingIcon="chevron-down">
                {aggregateMode === 'aggregate' ? 'Aggregate' : 'Average'}
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
            borderRadius: 'var(--dex-borderRadius-md, 8px)',
            overflow: 'hidden',
            marginTop: 'var(--dex-spacing-200)',
          }}
        >
          {AUTOMATION_METRIC_DEFS.map((m, idx) => {
            const value = portfolioMetrics[m.key] as number;
            const delta = portfolioMetrics[m.deltaKey] as number;
            return (
              <div
                key={m.key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--dex-spacing-050)',
                  padding: 'var(--dex-spacing-200)',
                  borderRight:
                    idx < AUTOMATION_METRIC_DEFS.length - 1
                      ? '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))'
                      : 'none',
                  backgroundColor: 'var(--dex-backgroundColor-surface-default, #fff)',
                }}
              >
                <DexText variant="caption" color="subtle" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {m.label}
                </DexText>
                <DexText variant="headline-3" style={{ lineHeight: 1.2 }}>
                  {formatValue(value, m.isRate)}
                </DexText>
                <DexTag
                  color={deltaColor(delta, m.invertDelta)}
                  leadingIcon={deltaIcon(delta)}
                >
                  {formatDelta(delta, m.isRate)}
                </DexTag>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <DexBox
          paddingTop="150"
          style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.06))' }}
        >
          <DexLink to="/partner-hub/performance?tab=automations">Show details</DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
