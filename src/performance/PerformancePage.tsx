import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  DexBox,
  DexStack,
  DexInline,
  DexText,
  DexCard,
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
  DexStatus,
  DexTag,
  DexButton,
  DexIconButton,
  DexIcon,
  DexLink,
  DexInput,
  DexOffsetPager,
  DexToggle,
  DexToggleButton,
} from '@thryvlabs/dex-react';
import {
  mockAtRisk,
  mockTopTen,
  mockBottomTen,
  mockSubAccounts,
  mockDistribution,
  emailSubAccountRows,
} from './performanceData';

type SortDir = 'asc' | 'desc';
type Sort = { field: string; dir: SortDir };

function sortData<T extends Record<string, unknown>>(data: T[], sort: Sort): T[] {
  return [...data].sort((a, b) => {
    const av = a[sort.field];
    const bv = b[sort.field];
    let cmp: number;
    if (typeof av === 'string' && typeof bv === 'string') {
      cmp = av.localeCompare(bv);
    } else {
      cmp = Number(av ?? 0) - Number(bv ?? 0);
    }
    return sort.dir === 'asc' ? cmp : -cmp;
  });
}

function si(sort: Sort, field: string): 'none' | 'ascending' | 'descending' {
  if (sort.field !== field) return 'none';
  return sort.dir === 'asc' ? 'ascending' : 'descending';
}

function ts(sort: Sort, setSort: (s: Sort) => void, field: string) {
  setSort({ field, dir: sort.field === field ? (sort.dir === 'asc' ? 'desc' : 'asc') : 'asc' });
}

function formatKM(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
}

function adoptionTier(count: number) {
  if (count === 0) return 'none';
  if (count <= 3) return 'low';
  if (count <= 7) return 'building';
  if (count <= 12) return 'active';
  return 'power';
}

function adoptionTierLabel(count: number) {
  const labels: Record<string, string> = { none: 'None', low: 'Low', building: 'Building', active: 'Active', power: 'Power' };
  return labels[adoptionTier(count)];
}

function adoptionTierColor(count: number): string {
  const colors: Record<string, string> = { none: 'neutral', low: 'warning', building: 'blue', active: 'success', power: 'purple' };
  return colors[adoptionTier(count)];
}

const PAGE_SIZE = 10;

export function PerformancePage() {
  const navigate = useNavigate();

  const [atRiskSort, setAtRiskSort] = useState<Sort>({ field: 'automationName', dir: 'asc' });
  const [topSort, setTopSort] = useState<Sort>({ field: 'uniqueRecipients', dir: 'desc' });
  const [bottomSort, setBottomSort] = useState<Sort>({ field: 'uniqueRecipients', dir: 'asc' });

  const [kpiSearch, setKpiSearch] = useState('');
  const [kpiSort, setKpiSort] = useState<Sort>({ field: 'contactsInAutomations', dir: 'desc' });
  const [kpiPage, setKpiPage] = useState(1);

  const [distSearch, setDistSearch] = useState('');
  const [distSort, setDistSort] = useState<Sort>({ field: 'publishedAutomations', dir: 'desc' });
  const [distPage, setDistPage] = useState(1);

  const [adoptSearch, setAdoptSearch] = useState('');
  const [adoptSort, setAdoptSort] = useState<Sort>({ field: 'contactsInAutomations', dir: 'desc' });
  const [adoptPage, setAdoptPage] = useState(1);
  const [aggregateMode, setAggregateMode] = useState<'aggregate' | 'average'>('aggregate');

  const [emailSearch, setEmailSearch] = useState('');
  const [emailSort, setEmailSort] = useState<Sort>({ field: 'name', dir: 'asc' });
  const [emailPage, setEmailPage] = useState(1);

  const topMetrics = useMemo(() => ({
    totalRecipients: mockTopTen.reduce((s, a) => s + a.uniqueRecipients, 0),
    totalDeliveries: mockTopTen.reduce((s, a) => s + a.totalDeliveries, 0),
    avgCtr: mockTopTen.length > 0
      ? ((mockTopTen.reduce((s, a) => s + a.clickThroughRate, 0) / mockTopTen.length) * 100).toFixed(2)
      : '0.00',
  }), []);

  const bottomMetrics = useMemo(() => ({
    totalRecipients: mockBottomTen.reduce((s, a) => s + a.uniqueRecipients, 0),
    totalDeliveries: mockBottomTen.reduce((s, a) => s + a.totalDeliveries, 0),
    avgCtr: mockBottomTen.length > 0
      ? ((mockBottomTen.reduce((s, a) => s + a.clickThroughRate, 0) / mockBottomTen.length) * 100).toFixed(2)
      : '0.00',
  }), []);

  const adoptionStats = useMemo(() => {
    const total = mockDistribution.reduce((s, d) => s + d.accountCount, 0);
    const noAuto = mockDistribution.find(d => d.bucket === 0)?.accountCount ?? 0;
    const withOne = mockDistribution.filter(d => d.bucket > 0).reduce((s, d) => s + d.accountCount, 0);
    const weightedSum = mockDistribution.reduce((s, d) => s + d.bucket * d.accountCount, 0);
    const avg = total > 0 ? (weightedSum / total).toFixed(1) : '0';
    const mostCommon = mockDistribution.length > 0
      ? mockDistribution.reduce((a, b) => b.accountCount > a.accountCount ? b : a).bucket
      : 0;
    return [
      { label: 'No automations', value: `${total > 0 ? ((noAuto / total) * 100).toFixed(0) : 0}%`, trend: '-1%', color: 'success' as const, icon: 'arrow-down-right' },
      { label: 'With 1 or more', value: `${total > 0 ? ((withOne / total) * 100).toFixed(0) : 0}%`, trend: '+1%', color: 'success' as const, icon: 'arrow-up-right' },
      { label: 'Portfolio average', value: avg, trend: '+0.3', color: 'success' as const, icon: 'arrow-up-right' },
      { label: 'Most common count', value: String(mostCommon), trend: 'No change', color: 'neutral' as const, icon: null as null },
    ];
  }, []);

  const kpiFiltered = useMemo(() => {
    const q = kpiSearch.trim().toLowerCase();
    const data = q ? mockSubAccounts.filter(r => r.name.toLowerCase().includes(q)) : mockSubAccounts;
    return sortData(data as unknown as Record<string, unknown>[], kpiSort);
  }, [kpiSearch, kpiSort]);
  const kpiTotalPages = Math.max(1, Math.ceil(kpiFiltered.length / PAGE_SIZE));
  const kpiPageData = kpiFiltered.slice((kpiPage - 1) * PAGE_SIZE, kpiPage * PAGE_SIZE);

  const distFiltered = useMemo(() => {
    const q = distSearch.trim().toLowerCase();
    const data = q ? mockSubAccounts.filter(r => r.name.toLowerCase().includes(q)) : mockSubAccounts;
    return sortData(data as unknown as Record<string, unknown>[], distSort);
  }, [distSearch, distSort]);
  const distTotalPages = Math.max(1, Math.ceil(distFiltered.length / PAGE_SIZE));
  const distPageData = distFiltered.slice((distPage - 1) * PAGE_SIZE, distPage * PAGE_SIZE);

  const adoptFiltered = useMemo(() => {
    const q = adoptSearch.trim().toLowerCase();
    const data = q ? mockSubAccounts.filter(r => r.name.toLowerCase().includes(q)) : mockSubAccounts;
    return sortData(data as unknown as Record<string, unknown>[], adoptSort);
  }, [adoptSearch, adoptSort]);
  const adoptTotalPages = Math.max(1, Math.ceil(adoptFiltered.length / PAGE_SIZE));
  const adoptPageData = adoptFiltered.slice((adoptPage - 1) * PAGE_SIZE, adoptPage * PAGE_SIZE);

  const emailFiltered = useMemo(() => {
    const q = emailSearch.trim().toLowerCase();
    const data = q ? emailSubAccountRows.filter(r => r.name.toLowerCase().includes(q)) : emailSubAccountRows;
    return sortData(data as unknown as Record<string, unknown>[], emailSort);
  }, [emailSearch, emailSort]);
  const emailTotalPages = Math.max(1, Math.ceil(emailFiltered.length / PAGE_SIZE));
  const emailPageData = emailFiltered.slice((emailPage - 1) * PAGE_SIZE, emailPage * PAGE_SIZE);

  const customerLink = (tenantId: string, label: string) => (
    <DexLink
      href={`/partner-hub/customers/${tenantId}`}
      onClick={(e: React.MouseEvent) => { e.preventDefault(); navigate(`/partner-hub/customers/${tenantId}`); }}
    >
      {label}
    </DexLink>
  );

  const metricCards = (metrics: { totalRecipients: number; totalDeliveries: number; avgCtr: string }) => (
    <DexInline gap="200" stretch style={{ marginBottom: 'var(--dex-spacing-200)' }}>
      {[
        { title: 'Total unique recipients', value: metrics.totalRecipients.toLocaleString(), icon: 'contacts-users' },
        { title: 'Avg email delivered', value: formatKM(metrics.totalDeliveries), icon: 'email-open' },
        { title: 'Avg CTR rate', value: `${metrics.avgCtr}%`, icon: 'cursor-click' },
      ].map(card => (
        <DexCard key={card.title} elevation="subtle" style={{ flex: 1 }}>
          <DexBox padding="200">
            <DexStack gap="050">
              <DexInline alignY="center" gap="050">
                <DexIcon name={card.icon} size="sm" color="subtle" />
                <DexText variant="headline-5" color="subtle">{card.title}</DexText>
              </DexInline>
              <DexText variant="display-2">{card.value}</DexText>
            </DexStack>
          </DexBox>
        </DexCard>
      ))}
    </DexInline>
  );

  const automationTableCols = (sort: Sort, setSort: (s: Sort) => void) => (
    <DexTableRow>
      <DexTableHeaderCell sort={si(sort, 'automationName')} onSort={() => ts(sort, setSort, 'automationName')}>Automation name</DexTableHeaderCell>
      <DexTableHeaderCell sort={si(sort, 'automationId')} onSort={() => ts(sort, setSort, 'automationId')}>Automation ID</DexTableHeaderCell>
      <DexTableHeaderCell sort={si(sort, 'status')} onSort={() => ts(sort, setSort, 'status')}>Status</DexTableHeaderCell>
      <DexTableHeaderCell sort={si(sort, 'businessName')} onSort={() => ts(sort, setSort, 'businessName')}>Customer name</DexTableHeaderCell>
      <DexTableHeaderCell>App ID</DexTableHeaderCell>
      <DexTableHeaderCell sort={si(sort, 'uniqueRecipients')} onSort={() => ts(sort, setSort, 'uniqueRecipients')}>Unique recipients</DexTableHeaderCell>
      <DexTableHeaderCell sort={si(sort, 'totalDeliveries')} onSort={() => ts(sort, setSort, 'totalDeliveries')}>Email delivered</DexTableHeaderCell>
      <DexTableHeaderCell sort={si(sort, 'clickThroughRate')} onSort={() => ts(sort, setSort, 'clickThroughRate')}>CTR</DexTableHeaderCell>
    </DexTableRow>
  );

  return (
    <>
      <DexBox paddingX="300" paddingY="200">
        <DexText variant="display-2">Performance</DexText>
      </DexBox>

      <DexBox paddingX="300" paddingBottom="300">
        <DexTabs defaultValue="automations">
          <DexTabsList>
            <DexTabsTrigger value="automations">Automations</DexTabsTrigger>
            <DexTabsTrigger value="email-broadcasts">Email broadcasts</DexTabsTrigger>
          </DexTabsList>

          {/* ── Automations tab ── */}
          <DexTabsContent value="automations">
            <DexStack gap="500" style={{ paddingTop: 'var(--dex-spacing-400)' }}>

              {/* At-risk automations */}
              <div>
                <DexBox paddingBottom="200">
                  <DexText variant="headline-1">At-risk automations</DexText>
                </DexBox>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <DexTable label="At-risk automations" style={{ tableLayout: 'auto' }}>
                    <DexTableHeader>
                      <DexTableRow>
                        <DexTableHeaderCell sort={si(atRiskSort, 'automationName')} onSort={() => ts(atRiskSort, setAtRiskSort, 'automationName')}>Automation name</DexTableHeaderCell>
                        <DexTableHeaderCell sort={si(atRiskSort, 'automationId')} onSort={() => ts(atRiskSort, setAtRiskSort, 'automationId')}>Automation ID</DexTableHeaderCell>
                        <DexTableHeaderCell>Status</DexTableHeaderCell>
                        <DexTableHeaderCell sort={si(atRiskSort, 'businessName')} onSort={() => ts(atRiskSort, setAtRiskSort, 'businessName')}>Customer name</DexTableHeaderCell>
                        <DexTableHeaderCell>App ID</DexTableHeaderCell>
                        <DexTableHeaderCell sort={si(atRiskSort, 'totalComplaints')} onSort={() => ts(atRiskSort, setAtRiskSort, 'totalComplaints')}>Complaints (30 days)</DexTableHeaderCell>
                        <DexTableHeaderCell sort={si(atRiskSort, 'totalBounces')} onSort={() => ts(atRiskSort, setAtRiskSort, 'totalBounces')}>Bounce (30 days)</DexTableHeaderCell>
                        <DexTableHeaderCell>Action</DexTableHeaderCell>
                      </DexTableRow>
                    </DexTableHeader>
                    <DexTableBody>
                      {(sortData(mockAtRisk as unknown as Record<string, unknown>[], atRiskSort) as typeof mockAtRisk).map((row, i) => (
                        <DexTableRow key={i}>
                          <DexTableCell>{row.automationName}</DexTableCell>
                          <DexTableCell>{row.automationId}</DexTableCell>
                          <DexTableCell>
                            <DexStatus variant={row.isBroken ? 'danger' : 'success'} emphasis="low">
                              {row.isBroken ? 'Draft' : 'Active'}
                            </DexStatus>
                          </DexTableCell>
                          <DexTableCell>{customerLink(row.tenantId, row.businessName)}</DexTableCell>
                          <DexTableCell>{row.tenantId}</DexTableCell>
                          <DexTableCell>{row.totalComplaints}</DexTableCell>
                          <DexTableCell>{row.totalBounces}</DexTableCell>
                          <DexTableCell>
                            <DexIconButton name="sign-in-log-in" label="Login to client app" variant="transparent" />
                          </DexTableCell>
                        </DexTableRow>
                      ))}
                    </DexTableBody>
                  </DexTable>
                </div>
              </div>

              {/* Top 10 customers */}
              <div>
                <DexBox paddingBottom="200">
                  <DexInline alignY="center" alignX="spread" stretch>
                    <DexText variant="headline-1">Top 10 customers — highest performance</DexText>
                    <DexButton variant="outline" trailingIcon="download">Export</DexButton>
                  </DexInline>
                </DexBox>
                {metricCards(topMetrics)}
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <DexTable label="Top 10 customers" style={{ tableLayout: 'auto' }}>
                    <DexTableHeader>{automationTableCols(topSort, setTopSort)}</DexTableHeader>
                    <DexTableBody>
                      {(sortData(mockTopTen as unknown as Record<string, unknown>[], topSort) as typeof mockTopTen).map((row, i) => (
                        <DexTableRow key={i}>
                          <DexTableCell>{row.automationName}</DexTableCell>
                          <DexTableCell>{row.automationId}</DexTableCell>
                          <DexTableCell>
                            <DexStatus variant={row.status === 'Published' ? 'success' : 'danger'} emphasis="low">
                              {row.status === 'Published' ? 'Active' : row.status}
                            </DexStatus>
                          </DexTableCell>
                          <DexTableCell>{customerLink(row.tenantId, row.businessName)}</DexTableCell>
                          <DexTableCell>{row.tenantId}</DexTableCell>
                          <DexTableCell>{row.uniqueRecipients.toLocaleString()}</DexTableCell>
                          <DexTableCell>{row.totalDeliveries.toLocaleString()}</DexTableCell>
                          <DexTableCell>{(row.clickThroughRate * 100).toFixed(2)}%</DexTableCell>
                        </DexTableRow>
                      ))}
                    </DexTableBody>
                  </DexTable>
                </div>
              </div>

              {/* Bottom 10 customers */}
              <div>
                <DexBox paddingBottom="200">
                  <DexInline alignY="center" alignX="spread" stretch>
                    <DexText variant="headline-1">Bottom 10 customers — lowest performance</DexText>
                    <DexButton variant="outline" trailingIcon="download">Export</DexButton>
                  </DexInline>
                </DexBox>
                {metricCards(bottomMetrics)}
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <DexTable label="Bottom 10 customers" style={{ tableLayout: 'auto' }}>
                    <DexTableHeader>{automationTableCols(bottomSort, setBottomSort)}</DexTableHeader>
                    <DexTableBody>
                      {(sortData(mockBottomTen as unknown as Record<string, unknown>[], bottomSort) as typeof mockBottomTen).map((row, i) => (
                        <DexTableRow key={i}>
                          <DexTableCell>{row.automationName}</DexTableCell>
                          <DexTableCell>{row.automationId}</DexTableCell>
                          <DexTableCell>
                            <DexStatus variant={row.status === 'Published' ? 'success' : 'danger'} emphasis="low">
                              {row.status === 'Published' ? 'Active' : row.status}
                            </DexStatus>
                          </DexTableCell>
                          <DexTableCell>{customerLink(row.tenantId, row.businessName)}</DexTableCell>
                          <DexTableCell>{row.tenantId}</DexTableCell>
                          <DexTableCell>{row.uniqueRecipients.toLocaleString()}</DexTableCell>
                          <DexTableCell>{row.totalDeliveries.toLocaleString()}</DexTableCell>
                          <DexTableCell>{(row.clickThroughRate * 100).toFixed(2)}%</DexTableCell>
                        </DexTableRow>
                      ))}
                    </DexTableBody>
                  </DexTable>
                </div>
              </div>

              {/* KPI card */}
              <DexCard elevation="flat">
                <DexBox padding="300">
                  <DexStack gap="200">
                    <DexText variant="headline-3">KPI</DexText>
                    <DexInline alignX="end" stretch>
                      <DexInput
                        leading={<DexIcon name="search" />}
                        placeholder="Search customers…"
                        label="Search customers"
                        labelHidden
                        value={kpiSearch}
                        onValueChange={(v: string) => { setKpiSearch(v); setKpiPage(1); }}
                        style={{ width: '240px' }}
                      />
                    </DexInline>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <DexTable label="KPI customers" style={{ tableLayout: 'auto' }}>
                        <DexTableHeader>
                          <DexTableRow>
                            <DexTableHeaderCell sort={si(kpiSort, 'name')} onSort={() => { ts(kpiSort, setKpiSort, 'name'); setKpiPage(1); }}>Customer name</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(kpiSort, 'contactsInAutomations')} onSort={() => { ts(kpiSort, setKpiSort, 'contactsInAutomations'); setKpiPage(1); }}>Contacts in automations</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(kpiSort, 'emailsSent')} onSort={() => { ts(kpiSort, setKpiSort, 'emailsSent'); setKpiPage(1); }}>Emails sent</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(kpiSort, 'delivered')} onSort={() => { ts(kpiSort, setKpiSort, 'delivered'); setKpiPage(1); }}>Delivered</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(kpiSort, 'ctr')} onSort={() => { ts(kpiSort, setKpiSort, 'ctr'); setKpiPage(1); }}>CTR</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(kpiSort, 'complaints')} onSort={() => { ts(kpiSort, setKpiSort, 'complaints'); setKpiPage(1); }}>Complaints</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(kpiSort, 'publishedAutomations')} onSort={() => { ts(kpiSort, setKpiSort, 'publishedAutomations'); setKpiPage(1); }}>Published automations</DexTableHeaderCell>
                          </DexTableRow>
                        </DexTableHeader>
                        <DexTableBody>
                          {kpiPageData.length === 0 ? (
                            <DexTableRow>
                              <DexTableCell colSpan={7} style={{ textAlign: 'center' }}>
                                <DexBox padding="200"><DexText variant="body-2" color="subtle">No customers found</DexText></DexBox>
                              </DexTableCell>
                            </DexTableRow>
                          ) : (kpiPageData as typeof mockSubAccounts).map(row => (
                            <DexTableRow key={row.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/partner-hub/customers/${row.id}`)}>
                              <DexTableCell>{customerLink(row.id, row.name)}</DexTableCell>
                              <DexTableCell>{row.contactsInAutomations.toLocaleString()}</DexTableCell>
                              <DexTableCell>{row.emailsSent.toLocaleString()}</DexTableCell>
                              <DexTableCell>{row.delivered.toLocaleString()}</DexTableCell>
                              <DexTableCell>{(row.ctr * 100).toFixed(1)}%</DexTableCell>
                              <DexTableCell>{row.complaints}</DexTableCell>
                              <DexTableCell>{row.publishedAutomations}</DexTableCell>
                            </DexTableRow>
                          ))}
                        </DexTableBody>
                      </DexTable>
                    </div>
                    {kpiTotalPages > 1 && (
                      <DexBox paddingTop="100">
                        <DexOffsetPager currentPage={kpiPage} onCurrentPageChange={setKpiPage} totalPages={kpiTotalPages} size="dense" style={{ display: 'flex' }} />
                      </DexBox>
                    )}
                  </DexStack>
                </DexBox>
              </DexCard>

              {/* Distribution card */}
              <DexCard elevation="flat">
                <DexBox padding="300">
                  <DexStack gap="200">
                    <DexText variant="headline-3">Distribution</DexText>
                    <DexInline alignX="end" stretch>
                      <DexInput
                        leading={<DexIcon name="search" />}
                        placeholder="Search customers…"
                        label="Search customers"
                        labelHidden
                        value={distSearch}
                        onValueChange={(v: string) => { setDistSearch(v); setDistPage(1); }}
                        style={{ width: '240px' }}
                      />
                    </DexInline>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <DexTable label="Distribution customers" style={{ tableLayout: 'auto' }}>
                        <DexTableHeader>
                          <DexTableRow>
                            <DexTableHeaderCell sort={si(distSort, 'name')} onSort={() => { ts(distSort, setDistSort, 'name'); setDistPage(1); }}>Customer name</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(distSort, 'publishedAutomations')} onSort={() => { ts(distSort, setDistSort, 'publishedAutomations'); setDistPage(1); }}>Published automations</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(distSort, 'contactsInAutomations')} onSort={() => { ts(distSort, setDistSort, 'contactsInAutomations'); setDistPage(1); }}>Contacts in automations</DexTableHeaderCell>
                            <DexTableHeaderCell>Adoption tier</DexTableHeaderCell>
                          </DexTableRow>
                        </DexTableHeader>
                        <DexTableBody>
                          {distPageData.length === 0 ? (
                            <DexTableRow>
                              <DexTableCell colSpan={4} style={{ textAlign: 'center' }}>
                                <DexBox padding="200"><DexText variant="body-2" color="subtle">No customers found</DexText></DexBox>
                              </DexTableCell>
                            </DexTableRow>
                          ) : (distPageData as typeof mockSubAccounts).map(row => (
                            <DexTableRow key={row.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/partner-hub/customers/${row.id}`)}>
                              <DexTableCell>{customerLink(row.id, row.name)}</DexTableCell>
                              <DexTableCell>{row.publishedAutomations}</DexTableCell>
                              <DexTableCell>{row.contactsInAutomations.toLocaleString()}</DexTableCell>
                              <DexTableCell>
                                <DexTag color={adoptionTierColor(row.publishedAutomations) as 'neutral' | 'warning' | 'blue' | 'success' | 'purple'}>
                                  {adoptionTierLabel(row.publishedAutomations)}
                                </DexTag>
                              </DexTableCell>
                            </DexTableRow>
                          ))}
                        </DexTableBody>
                      </DexTable>
                    </div>
                    {distTotalPages > 1 && (
                      <DexBox paddingTop="100">
                        <DexOffsetPager currentPage={distPage} onCurrentPageChange={setDistPage} totalPages={distTotalPages} size="dense" style={{ display: 'flex' }} />
                      </DexBox>
                    )}
                  </DexStack>
                </DexBox>
              </DexCard>

              {/* Adoption card */}
              <DexCard elevation="flat">
                <DexBox padding="300">
                  <DexStack gap="200">
                    <DexInline alignY="center" alignX="spread" stretch>
                      <DexStack gap="025">
                        <DexText variant="headline-4">Adoption</DexText>
                        <DexText variant="caption" color="subtle">Portfolio snapshot</DexText>
                      </DexStack>
                      <DexToggle value={aggregateMode} onValueChange={(v: string) => setAggregateMode(v as 'aggregate' | 'average')} label="Calculation mode" labelHidden>
                        <DexToggleButton value="aggregate">Aggregate</DexToggleButton>
                        <DexToggleButton value="average">Average</DexToggleButton>
                      </DexToggle>
                    </DexInline>

                    {/* Adoption stats grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      border: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))',
                      borderRadius: 'var(--dex-borderRadius-md, 8px)',
                      overflow: 'hidden',
                    }}>
                      {adoptionStats.map((stat, i) => (
                        <div key={stat.label} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 'var(--dex-spacing-050)',
                          padding: 'var(--dex-spacing-200)',
                          borderRight: i < adoptionStats.length - 1 ? '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))' : 'none',
                          backgroundColor: 'var(--dex-backgroundColor-surface-default, #fff)',
                        }}>
                          <DexText variant="caption" color="subtle">{stat.label}</DexText>
                          <DexText variant="headline-3">{stat.value}</DexText>
                          <DexTag color={stat.color} leadingIcon={stat.icon ?? undefined}>{stat.trend}</DexTag>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--dex-borderColor-neutral-subtle, rgba(0,0,0,0.08))', margin: 'var(--dex-spacing-100) 0' }} />

                    <DexInline alignX="end" stretch>
                      <DexInput
                        leading={<DexIcon name="search" />}
                        placeholder="Search customers…"
                        label="Search customers"
                        labelHidden
                        value={adoptSearch}
                        onValueChange={(v: string) => { setAdoptSearch(v); setAdoptPage(1); }}
                        style={{ width: '240px' }}
                      />
                    </DexInline>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <DexTable label="Adoption customers" style={{ tableLayout: 'auto' }}>
                        <DexTableHeader>
                          <DexTableRow>
                            <DexTableHeaderCell sort={si(adoptSort, 'name')} onSort={() => { ts(adoptSort, setAdoptSort, 'name'); setAdoptPage(1); }}>Customer name</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(adoptSort, 'contactsInAutomations')} onSort={() => { ts(adoptSort, setAdoptSort, 'contactsInAutomations'); setAdoptPage(1); }}>Contacts in automations</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(adoptSort, 'publishedAutomations')} onSort={() => { ts(adoptSort, setAdoptSort, 'publishedAutomations'); setAdoptPage(1); }}>Published automations</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(adoptSort, 'ctr')} onSort={() => { ts(adoptSort, setAdoptSort, 'ctr'); setAdoptPage(1); }}>CTR</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(adoptSort, 'emailsSent')} onSort={() => { ts(adoptSort, setAdoptSort, 'emailsSent'); setAdoptPage(1); }}>Emails sent</DexTableHeaderCell>
                          </DexTableRow>
                        </DexTableHeader>
                        <DexTableBody>
                          {adoptPageData.length === 0 ? (
                            <DexTableRow>
                              <DexTableCell colSpan={5} style={{ textAlign: 'center' }}>
                                <DexBox padding="200"><DexText variant="body-2" color="subtle">No customers found</DexText></DexBox>
                              </DexTableCell>
                            </DexTableRow>
                          ) : (adoptPageData as typeof mockSubAccounts).map(row => (
                            <DexTableRow key={row.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/partner-hub/customers/${row.id}`)}>
                              <DexTableCell>{customerLink(row.id, row.name)}</DexTableCell>
                              <DexTableCell>{row.contactsInAutomations.toLocaleString()}</DexTableCell>
                              <DexTableCell>{row.publishedAutomations}</DexTableCell>
                              <DexTableCell>{(row.ctr * 100).toFixed(1)}%</DexTableCell>
                              <DexTableCell>{row.emailsSent.toLocaleString()}</DexTableCell>
                            </DexTableRow>
                          ))}
                        </DexTableBody>
                      </DexTable>
                    </div>
                    {adoptTotalPages > 1 && (
                      <DexBox paddingTop="100">
                        <DexOffsetPager currentPage={adoptPage} onCurrentPageChange={setAdoptPage} totalPages={adoptTotalPages} size="dense" style={{ display: 'flex' }} />
                      </DexBox>
                    )}
                  </DexStack>
                </DexBox>
              </DexCard>

            </DexStack>
          </DexTabsContent>

          {/* ── Email broadcasts tab ── */}
          <DexTabsContent value="email-broadcasts">
            <DexBox paddingTop="400">
              <DexCard elevation="flat">
                <DexBox padding="300">
                  <DexStack gap="200">
                    <DexInline alignX="end" stretch>
                      <DexInput
                        leading={<DexIcon name="search" />}
                        placeholder="Search customers…"
                        label="Search customers"
                        labelHidden
                        value={emailSearch}
                        onValueChange={(v: string) => { setEmailSearch(v); setEmailPage(1); }}
                        style={{ width: '240px' }}
                      />
                    </DexInline>
                    <div style={{ width: '100%', overflowX: 'auto' }}>
                      <DexTable label="Email broadcast performance" style={{ tableLayout: 'auto' }}>
                        <DexTableHeader>
                          <DexTableRow>
                            <DexTableHeaderCell sort={si(emailSort, 'name')} onSort={() => { ts(emailSort, setEmailSort, 'name'); setEmailPage(1); }}>Customer name</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'broadcastsSent')} onSort={() => { ts(emailSort, setEmailSort, 'broadcastsSent'); setEmailPage(1); }} style={{ textAlign: 'right' }}>Broadcasts sent</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'emailsSent')} onSort={() => { ts(emailSort, setEmailSort, 'emailsSent'); setEmailPage(1); }} style={{ textAlign: 'right' }}>Emails sent</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'delivered')} onSort={() => { ts(emailSort, setEmailSort, 'delivered'); setEmailPage(1); }} style={{ textAlign: 'right' }}>Delivered</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'openRate')} onSort={() => { ts(emailSort, setEmailSort, 'openRate'); setEmailPage(1); }} style={{ textAlign: 'right' }}>Open rate</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'ctr')} onSort={() => { ts(emailSort, setEmailSort, 'ctr'); setEmailPage(1); }} style={{ textAlign: 'right' }}>CTR</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'optIns')} onSort={() => { ts(emailSort, setEmailSort, 'optIns'); setEmailPage(1); }} style={{ textAlign: 'right' }}>Opt-ins</DexTableHeaderCell>
                            <DexTableHeaderCell sort={si(emailSort, 'optOuts')} onSort={() => { ts(emailSort, setEmailSort, 'optOuts'); setEmailPage(1); }} style={{ textAlign: 'right' }}>Opt-outs</DexTableHeaderCell>
                          </DexTableRow>
                        </DexTableHeader>
                        <DexTableBody>
                          {emailPageData.length === 0 ? (
                            <DexTableRow>
                              <DexTableCell colSpan={8} style={{ textAlign: 'center' }}>
                                <DexBox padding="200"><DexText variant="body-2" color="subtle">No customers found</DexText></DexBox>
                              </DexTableCell>
                            </DexTableRow>
                          ) : (emailPageData as typeof emailSubAccountRows).map(row => (
                            <DexTableRow key={row.tenantId} style={{ cursor: 'pointer' }} onClick={() => navigate(`/partner-hub/customers/${row.tenantId}`)}>
                              <DexTableCell>{customerLink(row.tenantId, row.name)}</DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>{row.broadcastsSent}</DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>{row.emailsSent.toLocaleString()}</DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>{row.delivered.toLocaleString()}</DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>
                                <DexInline alignY="center" gap="050" style={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                                  <DexText color={row.openRate >= 20 ? 'success' : 'danger'} variant="body-sm">
                                    {row.openRate.toFixed(1)}%
                                  </DexText>
                                  <DexIcon name={row.openRate >= 20 ? 'arrow-up-right' : 'arrow-down-right'} color={row.openRate >= 20 ? 'success' : 'danger'} size="sm" />
                                </DexInline>
                              </DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>
                                <DexInline alignY="center" gap="050" style={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
                                  <DexText color={row.ctr >= 5 ? 'success' : 'danger'} variant="body-sm">
                                    {row.ctr.toFixed(1)}%
                                  </DexText>
                                  <DexIcon name={row.ctr >= 5 ? 'arrow-up-right' : 'arrow-down-right'} color={row.ctr >= 5 ? 'success' : 'danger'} size="sm" />
                                </DexInline>
                              </DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>{row.optIns}</DexTableCell>
                              <DexTableCell style={{ textAlign: 'right' }}>{row.optOuts}</DexTableCell>
                            </DexTableRow>
                          ))}
                        </DexTableBody>
                      </DexTable>
                    </div>
                    {emailTotalPages > 1 && (
                      <DexInline alignX="spread" alignY="center" stretch>
                        <DexText variant="caption" color="subtle">
                          {Math.min((emailPage - 1) * PAGE_SIZE + 1, emailFiltered.length)}–{Math.min(emailPage * PAGE_SIZE, emailFiltered.length)} of {emailFiltered.length}
                        </DexText>
                        <DexOffsetPager currentPage={emailPage} onCurrentPageChange={setEmailPage} totalPages={emailTotalPages} size="dense" style={{ display: 'flex' }} />
                      </DexInline>
                    )}
                  </DexStack>
                </DexBox>
              </DexCard>
            </DexBox>
          </DexTabsContent>

        </DexTabs>
      </DexBox>
    </>
  );
}
