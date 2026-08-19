import { useMemo } from 'react';
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
import { MOCK_DISTRIBUTION } from './dashboardData';

interface StatRow {
  label: string;
  value: string;
  trend: string;
  color: 'success' | 'neutral' | 'warning' | 'danger';
  icon: string | null;
}

export function AutomationAdoptionWidget() {
  const totalAccounts = useMemo(
    () => MOCK_DISTRIBUTION.reduce((s, d) => s + d.accountCount, 0),
    [],
  );

  const statsNoAutomations = useMemo(() => {
    const none = MOCK_DISTRIBUTION.find((d) => d.bucket === 0)?.accountCount ?? 0;
    return totalAccounts ? ((none / totalAccounts) * 100).toFixed(0) : '0';
  }, [totalAccounts]);

  const statsAtLeastOne = useMemo(() => {
    const withOne = MOCK_DISTRIBUTION.filter((d) => d.bucket > 0).reduce((s, d) => s + d.accountCount, 0);
    return totalAccounts ? ((withOne / totalAccounts) * 100).toFixed(0) : '0';
  }, [totalAccounts]);

  const statsAvg = useMemo(() => {
    const total = MOCK_DISTRIBUTION.reduce((s, d) => s + d.bucket * d.accountCount, 0);
    return totalAccounts ? (total / totalAccounts).toFixed(1) : '0';
  }, [totalAccounts]);

  const statsMostCommon = useMemo(() => {
    if (!MOCK_DISTRIBUTION.length) return '0';
    return String(MOCK_DISTRIBUTION.reduce((a, b) => (b.accountCount > a.accountCount ? b : a)).bucket);
  }, []);

  const stats = useMemo((): StatRow[] => [
    { label: 'No automations',    value: `${statsNoAutomations}%`, trend: '-1%',       color: 'success', icon: 'arrow-down-right' },
    { label: 'With 1 or more',   value: `${statsAtLeastOne}%`,   trend: '+1%',        color: 'success', icon: 'arrow-up-right'   },
    { label: 'Portfolio average', value: statsAvg,                trend: '+0.3',       color: 'success', icon: 'arrow-up-right'   },
    { label: 'Most common count', value: statsMostCommon,          trend: 'No change',  color: 'neutral', icon: null               },
  ], [statsNoAutomations, statsAtLeastOne, statsAvg, statsMostCommon]);

  return (
    <DexCard elevation="flat" style={{ height: '100%' }}>
      <DexBox padding="300" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <DexInline alignX="spread" alignY="start" stretch>
          <DexStack gap="025">
            <DexInline alignY="center" gap="050">
              <DexText variant="headline-4">Adoption</DexText>
              <DexIconButton name="info" label="Snapshot of automation adoption across your portfolio." size="dense" />
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

        {/* Stat rows */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))',
            borderRadius: 'var(--dex-borderRadius-md, 8px)',
            overflow: 'hidden',
            marginTop: 'var(--dex-spacing-200)',
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--dex-spacing-150) var(--dex-spacing-200)',
                borderBottom:
                  idx < stats.length - 1
                    ? '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))'
                    : 'none',
                backgroundColor: 'var(--dex-backgroundColor-surface-default, #fff)',
                gap: 'var(--dex-spacing-200)',
              }}
            >
              <DexText variant="body-2" color="subtle" style={{ flex: 1 }}>
                {stat.label}
              </DexText>
              <DexText variant="headline-3" style={{ lineHeight: 1.2, flexShrink: 0 }}>
                {stat.value}
              </DexText>
              <DexTag color={stat.color} leadingIcon={stat.icon ?? undefined}>
                {stat.trend}
              </DexTag>
            </div>
          ))}
        </div>

        {/* Footer */}
        <DexBox
          paddingTop="150"
          style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.06))' }}
        >
          <DexLink to="/partner-hub/performance?tab=automations#section-adoption">
            Show details
          </DexLink>
        </DexBox>

      </DexBox>
    </DexCard>
  );
}
