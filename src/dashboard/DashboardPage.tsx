import { useState } from 'react';
import {
  DexBox,
  DexButton,
  DexDropdownMenu,
  DexDropdownMenuItem,
  DexInline,
  DexStack,
  DexText,
} from '@thryvlabs/dex-react';

const DATE_RANGE_OPTIONS = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last 6 months', 'Last 12 months'];
import { LoginEngagementWidget }       from './LoginEngagementWidget';
import { AccountGrowthWidget }          from './AccountGrowthWidget';
import { ChurnedAccountsWidget }        from './ChurnedAccountsWidget';
import { AutomationPerformanceWidget }  from './AutomationPerformanceWidget';
import { AutomationAdoptionWidget }     from './AutomationAdoptionWidget';
import { DistributionWidget }           from './DistributionWidget';
import { EmailBroadcastWidget }         from './EmailBroadcastWidget';

export function DashboardPage() {
  const [dateRange, setDateRange] = useState('Last 30 days');

  return (
    <DexBox paddingX="300" paddingY="300">
      <DexStack gap="400">
        <DexInline alignX="spread" alignY="center" stretch>
          <DexText variant="display-2">Home</DexText>
          <DexDropdownMenu
            content={DATE_RANGE_OPTIONS.map((opt) => (
              <DexDropdownMenuItem key={opt} onSelect={() => setDateRange(opt)}>
                {opt}
              </DexDropdownMenuItem>
            ))}
          >
            <DexButton variant="outline" size="dense" leadingIcon="calendar" trailingIcon="chevron-down">
              {dateRange}
            </DexButton>
          </DexDropdownMenu>
        </DexInline>

        {/* ── Account overview ─────────────────────────────── */}
        <DexStack gap="300">
          <DexText variant="headline-3">Account overview</DexText>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--dex-spacing-300)',
            }}
          >
            <LoginEngagementWidget />
            <AccountGrowthWidget />
            <ChurnedAccountsWidget />
          </div>
        </DexStack>

        {/* ── Automation ───────────────────────────────────── */}
        <DexStack gap="300">
          <DexText variant="headline-3">Automation</DexText>
          <AutomationPerformanceWidget />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--dex-spacing-300)',
              alignItems: 'stretch',
            }}
          >
            <DistributionWidget />
            <AutomationAdoptionWidget />
          </div>
        </DexStack>

        {/* ── Email ────────────────────────────────────────── */}
        <DexStack gap="300">
          <DexText variant="headline-3">Email</DexText>
          <EmailBroadcastWidget />
        </DexStack>

      </DexStack>
    </DexBox>
  );
}
