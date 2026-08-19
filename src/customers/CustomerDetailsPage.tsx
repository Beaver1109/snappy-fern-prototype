import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  DexBox,
  DexStack,
  DexInline,
  DexText,
  DexButton,
  DexIconButton,
  DexCard,
  DexStatus,
  DexIcon,
  DexTag,
  DexTooltip,
  DexTooltipProvider,
  DexTabs,
  DexTabsList,
  DexTabsTrigger,
  DexTabsContent,
  DexTable,
  DexTableHeader,
  DexTableBody,
  DexTableRow,
  DexTableHeaderCell,
  DexTableCell,
  DexOffsetPager,
} from '@thryvlabs/dex-react';
import { findCustomer, getDetailData, formatDate } from './customersData';
import type { CustomerUser } from './customersData';

const TREND_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  increasing: { icon: 'arrow-up-right', color: 'success', label: 'Increasing' },
  stable: { icon: 'arrow-right', color: 'blue', label: 'Stable' },
  declining: { icon: 'arrow-down-right', color: 'warning', label: 'Declining' },
  dormant: { icon: 'minus', color: 'danger', label: 'No logins' },
};

function getUserStatusVariant(status: string): 'success' | 'info' | 'danger' | 'default' {
  if (status.toLowerCase() === 'active') return 'success';
  if (status.toLowerCase() === 'invited') return 'info';
  if (status.toLowerCase() === 'disabled') return 'danger';
  return 'default';
}

function getUserTrend(user: CustomerUser): { icon: string; color: string; tooltip: string } | null {
  const state = user.totalLoginTrend;
  const pct = user.loginTrendPercent;
  const days = user.daysSinceLastLogin;
  if (!state) return null;
  if (state === 'increasing') return { icon: 'arrow-up-right', color: 'green', tooltip: pct != null ? `+${pct}% vs prior 30 days` : 'Increase vs prior 30 days' };
  if (state === 'stable') return { icon: 'arrow-right', color: 'green', tooltip: 'Stable vs prior 30 days' };
  if (state === 'declining') return { icon: 'arrow-down-right', color: 'yellow', tooltip: pct != null ? `Down ${pct}% vs prior 30 days` : 'Down vs prior 30 days' };
  if (state === 'dormant') return { icon: 'minus', color: 'red', tooltip: days != null ? `No logins in ${days} days` : 'No logins' };
  return null;
}

const MC_KPI_CARDS = [
  { label: 'Leads', value: '7,412', delta: '+100.0%', color: 'success' },
  { label: 'Impressions', value: '89,775', delta: '+6,174', color: 'success' },
  { label: 'Clicks', value: '52,019', delta: '+0.3%', color: 'success' },
  { label: 'Calls', value: '2,266', delta: '+3', color: 'danger' },
  { label: 'Form fills', value: '5,012', delta: '+12', color: 'success' },
];

const MC_LEADS = [
  { name: 'Ethan Anderson', type: 'Call', score: 3, contact: '(859) 800-9294', source: 'Partner', date: 'Aug 10, 2026', time: '3:48 PM' },
  { name: 'Liam Kim', type: 'Form fill', score: 4, contact: 'marcus.j@outlook.com', source: 'Trade Show', date: 'Aug 11, 2026', time: '5:16 AM' },
  { name: 'Noah Johnson', type: 'Form fill', score: 1, contact: 'sarah.chen92@gmail...', source: 'Google Ads', date: 'Aug 11, 2026', time: '6:59 PM' },
  { name: 'Mia Chen', type: 'Form fill', score: 1, contact: 'david.wright@yahoo...', source: 'Organic Search', date: 'Aug 15, 2026', time: '11:17 PM' },
  { name: 'Ava Garcia', type: 'Form fill', score: 3, contact: '(628) 445-3201', source: 'LinkedIn', date: 'Aug 22, 2026', time: '1:10 AM' },
  { name: 'Emma Singh', type: 'Form fill', score: 4, contact: 'priya.nair@hotmail.com', source: 'Referral', date: 'Aug 24, 2026', time: '7:50 AM' },
  { name: 'Olivia Martinez', type: 'Form fill', score: 3, contact: 'jake.morrison@gmail...', source: 'Email Campaign', date: 'Aug 24, 2026', time: '2:56 PM' },
  { name: 'James Taylor', type: 'Call', score: 3, contact: '(503) 219-7744', source: 'Facebook Ads', date: 'Aug 30, 2026', time: '5:31 AM' },
  { name: 'Lucas Williams', type: 'Call', score: 5, contact: 'lena.kowalski@icloud...', source: 'Webinar', date: 'Sep 2, 2026', time: '6:30 PM' },
  { name: 'Sophia Patel', type: 'Call', score: 3, contact: '(737) 563-0198', source: 'Direct Traffic', date: 'Sep 3, 2026', time: '11:46 AM' },
];

const LEADS_PAGE_SIZE = 10;
const LEADS_TOTAL_PAGES = 8;

function AiScoreDots({ score }: { score: number }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: i < score ? '#1d9e75' : 'var(--border-strong)',
            display: 'inline-block',
          }}
        />
      ))}
    </span>
  );
}

export function CustomerDetailsPage() {
  const navigate = useNavigate();
  const { appId } = useParams<{ appId: string }>();
  const [userTab, setUserTab] = useState<'customers' | 'partners'>('customers');
  const [usersPage, setUsersPage] = useState(1);
  const [leadsPage, setLeadsPage] = useState(1);
  const [leadsSearch, setLeadsSearch] = useState('');

  const customer = useMemo(() => findCustomer(appId ?? ''), [appId]);
  const detail = useMemo(() => getDetailData(appId ?? ''), [appId]);

  const appDataFields = customer ? [
    { label: 'Product', value: customer.product, statusVariant: undefined as undefined },
    { label: 'Billing status', value: customer.billingStatus, statusVariant: getBillingVariant(customer.billingStatus) as 'success' | 'danger' | 'default' },
    { label: 'Creation date', value: formatDate(customer.creationDate), statusVariant: undefined as undefined },
    { label: 'Active users', value: customer.activeUsers, statusVariant: undefined as undefined },
    { label: 'Contacts usage', value: customer.contactsUsage, statusVariant: undefined as undefined },
    { label: 'Marketable contacts', value: String(detail.cardData.markatableContacts.toLocaleString()), statusVariant: undefined as undefined },
    { label: 'Complaint rate', value: `${detail.cardData.complaintRate}%`, statusVariant: undefined as undefined },
  ] : [];

  const metricCards = [
    { title: 'Contacts in automation', value: detail.activity.contactsInAutomation.toLocaleString() },
    { title: 'Newly created contacts', value: detail.activity.newContacts.toLocaleString() },
    { title: 'Broadcasts', value: detail.activity.broadcastsSent.toLocaleString() },
    { title: 'Logins', value: detail.loginSummary.totalLogins.toLocaleString(), trend: customer?.totalLoginTrend },
  ];

  const filteredUsers = useMemo(() => {
    return detail.users.filter((u) => {
      const type = u.userType || 'customer';
      return userTab === 'partners' ? type === 'partner' : type === 'customer';
    });
  }, [detail.users, userTab]);

  const USERS_PAGE_SIZE = 5;
  const usersTotalPages = Math.ceil(filteredUsers.length / USERS_PAGE_SIZE);
  const usersPageData = useMemo(() => {
    const start = (usersPage - 1) * USERS_PAGE_SIZE;
    return filteredUsers.slice(start, start + USERS_PAGE_SIZE);
  }, [filteredUsers, usersPage]);

  if (!customer) {
    return (
      <DexBox paddingX="300" paddingY="300">
        <DexText variant="display-2" color="subtle">Customer not found</DexText>
      </DexBox>
    );
  }

  return (
    <>
      {/* Page header */}
      <DexBox paddingX="300" paddingY="200">
        <DexInline alignY="center" alignX="spread" stretch>
          <DexInline alignY="center" gap="100">
            <DexIconButton name="arrow-left" label="Back to customers" variant="transparent" onClick={() => navigate('/partner-hub/customers')} />
            <DexText variant="display-1">{customer.companyName}, {appId}</DexText>
          </DexInline>
          <DexInline alignY="center" gap="100">
            <DexButton variant="outline" color="neutral" trailingIcon="chevron-down">Export</DexButton>
            <DexButton color="neutral" trailingIcon="sign-in-log-in" variant="solid">App login</DexButton>
          </DexInline>
        </DexInline>
      </DexBox>

      <DexBox paddingX="300" paddingBottom="300">
        <DexStack gap="300">
          {/* App data card */}
          <DexCard elevation="subtle">
            <DexBox padding="200">
              <DexInline alignY="center" alignX="spread" stretch>
                {appDataFields.map((field) => (
                  <DexStack key={field.label} gap="025">
                    <DexText variant="headline-5">{field.label}</DexText>
                    {field.statusVariant ? (
                      <DexStatus variant={field.statusVariant} emphasis="low">{field.value}</DexStatus>
                    ) : (
                      <DexText variant="caption">{field.value || '-'}</DexText>
                    )}
                  </DexStack>
                ))}
              </DexInline>
            </DexBox>
          </DexCard>

          {/* Feature tabs */}
          <DexTabs defaultValue="overview">
            <DexTabsList>
              <DexTabsTrigger value="overview">Overview</DexTabsTrigger>
              <DexTabsTrigger value="automations">Automations</DexTabsTrigger>
              <DexTabsTrigger value="email-broadcasts">Email broadcasts</DexTabsTrigger>
              <DexTabsTrigger value="marketing-center">Marketing Center</DexTabsTrigger>
            </DexTabsList>

            {/* Overview tab */}
            <DexTabsContent value="overview">
              <DexStack gap="400" style={{ paddingTop: 'var(--dex-spacing-400)' }}>
                {/* App Activity metric cards */}
                <div>
                  <DexBox paddingBottom="200">
                    <DexText variant="display-2">App activity</DexText>
                  </DexBox>
                  <DexInline gap="200" stretch>
                    {metricCards.map((card) => (
                      <DexCard key={card.title} elevation="subtle" style={{ flex: 1 }}>
                        <DexBox padding="200">
                          <DexStack gap="100">
                            <DexText variant="headline-5" color="subtle">{card.title}</DexText>
                            <DexInline alignY="center" gap="100">
                              <DexText variant="display-2">{card.value}</DexText>
                              {card.trend && TREND_CONFIG[card.trend] && (
                                <DexTag color={TREND_CONFIG[card.trend].color as 'success' | 'blue' | 'warning' | 'danger'} leadingIcon={TREND_CONFIG[card.trend].icon}>
                                  {TREND_CONFIG[card.trend].label}
                                </DexTag>
                              )}
                            </DexInline>
                          </DexStack>
                        </DexBox>
                      </DexCard>
                    ))}
                  </DexInline>
                </div>

                {/* Users table */}
                <div>
                  <DexBox paddingBottom="200">
                    <DexText variant="display-2">Users</DexText>
                  </DexBox>

                  <DexTabs value={userTab} onValueChange={(v) => { setUserTab(v as 'customers' | 'partners'); setUsersPage(1); }}>
                    <DexTabsList>
                      <DexTabsTrigger value="customers">Customers</DexTabsTrigger>
                      <DexTabsTrigger value="partners">Partners</DexTabsTrigger>
                    </DexTabsList>
                  </DexTabs>

                  <div style={{ width: '100%', overflowX: 'auto', marginTop: 'var(--dex-spacing-200)' }}>
                    <DexTable label="Users">
                      <DexTableHeader>
                        <DexTableRow>
                          <DexTableHeaderCell>Username</DexTableHeaderCell>
                          <DexTableHeaderCell>Role</DexTableHeaderCell>
                          <DexTableHeaderCell>Email</DexTableHeaderCell>
                          <DexTableHeaderCell>Status</DexTableHeaderCell>
                          <DexTableHeaderCell>Last login</DexTableHeaderCell>
                          <DexTableHeaderCell>Logins</DexTableHeaderCell>
                        </DexTableRow>
                      </DexTableHeader>
                      <DexTableBody>
                        {usersPageData.length === 0 ? (
                          <DexTableRow>
                            <DexTableCell colSpan={6} style={{ textAlign: 'center' }}>
                              <DexBox padding="200">
                                <DexText variant="body-1" color="subtle">No users found</DexText>
                              </DexBox>
                            </DexTableCell>
                          </DexTableRow>
                        ) : usersPageData.map((user, i) => {
                          const trend = getUserTrend(user);
                          const name = `${user.firstName} ${user.lastName}`.trim();
                          return (
                            <DexTableRow key={i}>
                              <DexTableCell>{name || '—'}</DexTableCell>
                              <DexTableCell>{user.userRole}</DexTableCell>
                              <DexTableCell>{user.email}</DexTableCell>
                              <DexTableCell>
                                <DexStatus variant={getUserStatusVariant(user.userStatus)}>
                                  {user.userStatus}
                                </DexStatus>
                              </DexTableCell>
                              <DexTableCell>
                                {user.lastLoginDatetime ? formatDate(user.lastLoginDatetime) : '—'}
                              </DexTableCell>
                              <DexTableCell>
                                <DexInline alignY="center" gap="100">
                                  {user.totalLoginCount ?? 0}
                                  {trend && (
                                    <DexTooltipProvider>
                                      <DexTooltip content={trend.tooltip} side="top">
                                        <span style={{ display: 'inline-flex', alignItems: 'center', cursor: 'default' }}>
                                          <DexIcon name={trend.icon} size="sm" color={trend.color} />
                                        </span>
                                      </DexTooltip>
                                    </DexTooltipProvider>
                                  )}
                                </DexInline>
                              </DexTableCell>
                            </DexTableRow>
                          );
                        })}
                      </DexTableBody>
                    </DexTable>
                  </div>

                  {usersTotalPages > 1 && (
                    <DexBox paddingTop="200">
                      <DexOffsetPager
                        currentPage={usersPage}
                        onCurrentPageChange={setUsersPage}
                        totalPages={usersTotalPages}
                        size="dense"
                        style={{ display: 'flex' }}
                      />
                    </DexBox>
                  )}
                </div>
              </DexStack>
            </DexTabsContent>

            {/* Automations tab */}
            <DexTabsContent value="automations">
              <DexBox paddingY="300">
                <DexStack gap="200">
                  <DexText variant="display-2">Automations ({detail.automations.length})</DexText>
                  <div style={{ width: '100%', overflowX: 'auto' }}>
                    <DexTable label="Automations">
                      <DexTableHeader>
                        <DexTableRow>
                          <DexTableHeaderCell>Automation name</DexTableHeaderCell>
                          <DexTableHeaderCell>Status</DexTableHeaderCell>
                          <DexTableHeaderCell>Unique recipients</DexTableHeaderCell>
                          <DexTableHeaderCell>Total sends</DexTableHeaderCell>
                          <DexTableHeaderCell>Deliveries</DexTableHeaderCell>
                          <DexTableHeaderCell>CTR</DexTableHeaderCell>
                          <DexTableHeaderCell>Complaints</DexTableHeaderCell>
                        </DexTableRow>
                      </DexTableHeader>
                      <DexTableBody>
                        {detail.automations.length === 0 ? (
                          <DexTableRow>
                            <DexTableCell colSpan={7} style={{ textAlign: 'center' }}>
                              <DexBox padding="200">
                                <DexText variant="body-1" color="subtle">No automations</DexText>
                              </DexBox>
                            </DexTableCell>
                          </DexTableRow>
                        ) : detail.automations.map((a) => (
                          <DexTableRow key={a.automationId}>
                            <DexTableCell>{a.automationName}</DexTableCell>
                            <DexTableCell>
                              <DexStatus variant={a.status === 'Published' ? 'success' : 'default'} emphasis="low">
                                {a.status}
                              </DexStatus>
                            </DexTableCell>
                            <DexTableCell>{a.uniqueRecipients.toLocaleString()}</DexTableCell>
                            <DexTableCell>{a.totalSends.toLocaleString()}</DexTableCell>
                            <DexTableCell>{a.totalDeliveries.toLocaleString()}</DexTableCell>
                            <DexTableCell>{(a.clickThroughRate * 100).toFixed(1)}%</DexTableCell>
                            <DexTableCell>{a.totalComplaints}</DexTableCell>
                          </DexTableRow>
                        ))}
                      </DexTableBody>
                    </DexTable>
                  </div>
                </DexStack>
              </DexBox>
            </DexTabsContent>

            {/* Email broadcasts tab */}
            <DexTabsContent value="email-broadcasts">
              <DexBox paddingY="300">
                <DexText variant="display-2" color="subtle">Email broadcasts data coming soon</DexText>
              </DexBox>
            </DexTabsContent>

            {/* Marketing Center tab */}
            <DexTabsContent value="marketing-center">
              <DexStack gap="400" style={{ paddingTop: 'var(--dex-spacing-400)' }}>

                {/* KPI card */}
                <DexCard elevation="subtle">
                  <DexBox padding="200">
                    <DexStack gap="200">
                      <DexStack gap="025">
                        <DexText variant="headline-4">Marketing Center KPIs</DexText>
                        <DexText variant="caption" color="subtle">Aggregate · Last 30 days</DexText>
                      </DexStack>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                        {MC_KPI_CARDS.map((kpi) => (
                          <div key={kpi.label} style={{ border: '1px solid var(--dex-borderColor-alpha-subtle)', borderRadius: 'var(--dex-borderRadius-050)', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <DexText variant="headline-5" color="subtle">{kpi.label}</DexText>
                            <DexText variant="display-2">{kpi.value}</DexText>
                            <DexTag color={kpi.color as 'success' | 'danger'} emphasis="low" leadingIcon="arrow-up-right">{kpi.delta}</DexTag>
                          </div>
                        ))}
                      </div>
                    </DexStack>
                  </DexBox>
                </DexCard>

                {/* Leads section */}
                <DexStack gap="200">
                  <DexText variant="display-2">Leads</DexText>
                  <input
                    type="text"
                    placeholder="Search customers..."
                    value={leadsSearch}
                    onChange={(e) => { setLeadsSearch(e.target.value); setLeadsPage(1); }}
                    style={{
                      width: 220,
                      padding: '6px 12px',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--dex-radius-md)',
                      fontSize: 13,
                      color: 'var(--text-primary)',
                      background: 'var(--surface-2)',
                      outline: 'none',
                    }}
                  />
                  <div style={{ width: '100%', overflowX: 'auto' }}>
                    <DexTable label="Leads">
                      <DexTableHeader>
                        <DexTableRow>
                          <DexTableHeaderCell>Lead name</DexTableHeaderCell>
                          <DexTableHeaderCell>Lead type</DexTableHeaderCell>
                          <DexTableHeaderCell>AI score</DexTableHeaderCell>
                          <DexTableHeaderCell>Contact</DexTableHeaderCell>
                          <DexTableHeaderCell>Source</DexTableHeaderCell>
                          <DexTableHeaderCell>Date</DexTableHeaderCell>
                        </DexTableRow>
                      </DexTableHeader>
                      <DexTableBody>
                        {MC_LEADS
                          .filter((l) => !leadsSearch || l.name.toLowerCase().includes(leadsSearch.toLowerCase()))
                          .map((lead, i) => (
                            <DexTableRow key={i}>
                              <DexTableCell>{lead.name}</DexTableCell>
                              <DexTableCell>
                                <DexInline alignY="center" gap="050">
                                  <DexIcon name={lead.type === 'Call' ? 'phone' : 'file-text'} size="sm" color="subtle" />
                                  <span>{lead.type}</span>
                                </DexInline>
                              </DexTableCell>
                              <DexTableCell>
                                <DexInline alignY="center" gap="100">
                                  <AiScoreDots score={lead.score} />
                                  <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{lead.score}</span>
                                </DexInline>
                              </DexTableCell>
                              <DexTableCell>{lead.contact}</DexTableCell>
                              <DexTableCell>{lead.source}</DexTableCell>
                              <DexTableCell>
                                <DexStack gap="000">
                                  <span>{lead.date}</span>
                                  <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{lead.time}</span>
                                </DexStack>
                              </DexTableCell>
                            </DexTableRow>
                          ))}
                      </DexTableBody>
                    </DexTable>
                  </div>
                  <DexBox paddingTop="200">
                    <DexOffsetPager
                      currentPage={leadsPage}
                      onCurrentPageChange={setLeadsPage}
                      totalPages={LEADS_TOTAL_PAGES}
                      size="dense"
                      style={{ display: 'flex' }}
                    />
                  </DexBox>
                </DexStack>

              </DexStack>
            </DexTabsContent>
          </DexTabs>
        </DexStack>
      </DexBox>
    </>
  );
}

function getBillingVariant(status: string): 'success' | 'danger' | 'default' {
  if (status.toLowerCase() === 'active') return 'success';
  if (status.toLowerCase() === 'cancelled') return 'danger';
  return 'default';
}
