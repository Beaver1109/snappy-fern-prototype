import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  DexBox,
  DexStack,
  DexInline,
  DexText,
  DexButton,
  DexIconButton,
  DexInput,
  DexIcon,
  DexSelect,
  DexSelectItem,
  DexStatus,
  DexTag,
  DexToggle,
  DexToggleButton,
  DexTable,
  DexTableHeader,
  DexTableBody,
  DexTableRow,
  DexTableHeaderCell,
  DexTableCell,
  DexOffsetPager,
  DexLink,
} from '@thryvlabs/dex-react';
import { mockCustomers, formatDate } from './customersData';
import type { Customer } from './customersData';

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'cancelled', label: 'Cancelled' },
];

const PRODUCT_OPTIONS = [
  { value: 'all', label: 'All products' },
  { value: 'Ultimate', label: 'Ultimate' },
  { value: 'Max', label: 'Max' },
  { value: 'Pro', label: 'Pro' },
  { value: 'Classic', label: 'Classic' },
];

const DATE_OPTIONS = [
  { value: '30d', label: '30 days' },
  { value: '60d', label: '60 days' },
  { value: '90d', label: '90 days' },
];

function getBillingVariant(status: string): 'success' | 'danger' | 'default' {
  if (status.toLowerCase() === 'active') return 'success';
  if (status.toLowerCase() === 'cancelled') return 'danger';
  return 'default';
}

type SortDir = 'asc' | 'desc';

function sortCustomers(data: Customer[], field: keyof Customer | '', dir: SortDir): Customer[] {
  if (!field) return data;
  return [...data].sort((a, b) => {
    const av = a[field] ?? '';
    const bv = b[field] ?? '';
    const cmp = typeof av === 'string' ? av.localeCompare(String(bv)) : (av as number) - (bv as number);
    return dir === 'asc' ? cmp : -cmp;
  });
}

export function CustomersPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [product, setProduct] = useState('all');
  const [dateRange, setDateRange] = useState('30d');
  const [tab, setTab] = useState<'data' | 'activity'>('data');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Customer | ''>('');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [filterOpen]);

  const filteredData = useMemo(() => {
    let data = mockCustomers;
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (c) => c.companyName.toLowerCase().includes(q) || c.tenantId.toLowerCase().includes(q) || c.appId.toLowerCase().includes(q),
      );
    }
    if (status !== 'all') {
      data = data.filter((c) => c.billingStatus.toLowerCase() === status.toLowerCase());
    }
    if (product !== 'all') {
      data = data.filter((c) => c.product === product);
    }
    return data;
  }, [search, status, product]);

  const sortedData = useMemo(() => sortCustomers(filteredData, sortField, sortDir), [filteredData, sortField, sortDir]);

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const getSortState = (field: keyof Customer) => {
    if (sortField !== field) return undefined;
    return sortDir;
  };

  const handleTabChange = (val: string) => {
    setTab(val as 'data' | 'activity');
    setPage(1);
    setSortField('');
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };

  const handleProductChange = (val: string) => {
    setProduct(val);
    setPage(1);
  };

  const activeFilterCount = [status !== 'all', product !== 'all', dateRange !== '30d'].filter(Boolean).length;

  const clearFilters = () => {
    setStatus('all');
    setProduct('all');
    setDateRange('30d');
    setPage(1);
  };

  const dateLabel = DATE_OPTIONS.find((o) => o.value === dateRange)?.label ?? dateRange;

  return (
    <>
      {/* Page header */}
      <DexBox paddingX="300" paddingY="200">
        <DexInline alignY="center" alignX="spread" stretch>
          <DexInline alignY="center" gap="100">
            <DexText variant="display-2">Customers</DexText>
            <DexText variant="display-2" color="subtle">({mockCustomers.length})</DexText>
          </DexInline>
          <DexButton trailingIcon="download" variant="outline" color="neutral">Export</DexButton>
        </DexInline>
      </DexBox>

      <DexBox paddingX="300">
        <DexStack gap="300">
          {/* Toolbar */}
          <DexInline alignY="center" alignX="spread" stretch>
            <DexInline alignY="center" gap="100">
              {/* Search */}
              <div style={{ width: '240px' }}>
                <DexInput
                  label="Search customers"
                  labelHidden
                  placeholder="Search customers, appID"
                  value={search}
                  onValueChange={handleSearchChange}
                  leading={<DexIcon name="search" />}
                />
              </div>

              {/* Filters button */}
              <div style={{ position: 'relative' }} ref={filterRef}>
                <DexButton
                  variant="ghost"
                  color="primary"
                  leadingIcon="filter"
                  trailingIcon="chevron-down"
                  onClick={() => setFilterOpen((o) => !o)}
                >
                  Filters
                  {activeFilterCount > 0 && (
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: '18px', height: '18px', padding: '0 5px', borderRadius: '9px',
                      background: 'var(--dex-color-primary-500, #3392ff)', color: '#fff',
                      fontSize: '11px', fontWeight: 600, marginLeft: '4px',
                    }}>
                      {activeFilterCount}
                    </span>
                  )}
                </DexButton>

                {filterOpen && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 200,
                    width: '260px', background: 'var(--dex-color-surface-default, #fff)',
                    border: '1px solid var(--dex-color-border-default, #e5e7eb)',
                    borderRadius: 'var(--dex-border-radius-md, 8px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)', padding: '12px',
                    display: 'flex', flexDirection: 'column', gap: '8px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--dex-color-neutral-500, #9ca3af)' }}>
                      Date range
                    </div>
                    <DexSelect label="Date range" labelHidden value={dateRange} onValueChange={(v) => setDateRange(v)}>
                      {DATE_OPTIONS.map((o) => <DexSelectItem key={o.value} value={o.value}>{o.label}</DexSelectItem>)}
                    </DexSelect>

                    {tab === 'data' && (
                      <>
                        <div style={{ height: '1px', background: 'var(--dex-color-border-default, #e5e7eb)', margin: '4px 0' }} />
                        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--dex-color-neutral-500, #9ca3af)' }}>
                          Status &amp; product
                        </div>
                        <DexSelect label="Status" labelHidden value={status} onValueChange={handleStatusChange}>
                          {STATUS_OPTIONS.map((o) => <DexSelectItem key={o.value} value={o.value}>{o.label}</DexSelectItem>)}
                        </DexSelect>
                        <DexSelect label="Product" labelHidden value={product} onValueChange={handleProductChange}>
                          {PRODUCT_OPTIONS.map((o) => <DexSelectItem key={o.value} value={o.value}>{o.label}</DexSelectItem>)}
                        </DexSelect>
                      </>
                    )}

                    {activeFilterCount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px', borderTop: '1px solid var(--dex-color-border-default, #e5e7eb)', marginTop: '4px' }}>
                        <DexButton size="dense" variant="ghost" onClick={clearFilters}>Clear filters</DexButton>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Active filter chips */}
              <DexTag color="blue" emphasis="low">{dateLabel}</DexTag>
              {status !== 'all' && (
                <DexTag color="blue" emphasis="low" onRemove={() => { setStatus('all'); setPage(1); }}>
                  {STATUS_OPTIONS.find((o) => o.value === status)?.label}
                </DexTag>
              )}
              {product !== 'all' && (
                <DexTag color="blue" emphasis="low" onRemove={() => { setProduct('all'); setPage(1); }}>
                  {product}
                </DexTag>
              )}
            </DexInline>

            {/* Data/Activity toggle */}
            <DexToggle label="View" labelHidden value={tab} onValueChange={handleTabChange}>
              <DexToggleButton value="data" leadingIcon="list-unordered">Data</DexToggleButton>
              <DexToggleButton value="activity" leadingIcon="activity">Activity</DexToggleButton>
            </DexToggle>
          </DexInline>

          {/* Data Table */}
          {tab === 'data' && (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <DexTable label="Customer list" style={{ tableLayout: 'auto' }}>
                <DexTableHeader>
                  <DexTableRow>
                    <DexTableHeaderCell sort={getSortState('companyName')} onSort={() => handleSort('companyName')}>Customer name</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('tenantId')} onSort={() => handleSort('tenantId')}>App ID</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('product')} onSort={() => handleSort('product')}>Product</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('billingStatus')} onSort={() => handleSort('billingStatus')}>Billing status</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('creationDate')} onSort={() => handleSort('creationDate')}>Creation date</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('activeUsers')} onSort={() => handleSort('activeUsers')}>Active users</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('contactsUsage')} onSort={() => handleSort('contactsUsage')}>Contacts usage</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('markatableContacts')} onSort={() => handleSort('markatableContacts')}>Marketable contacts</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('complaintRate')} onSort={() => handleSort('complaintRate')}>Complaint rate</DexTableHeaderCell>
                    <DexTableHeaderCell>Action</DexTableHeaderCell>
                  </DexTableRow>
                </DexTableHeader>
                <DexTableBody>
                  {pageData.length === 0 ? (
                    <DexTableRow>
                      <DexTableCell colSpan={10} style={{ textAlign: 'center' }}>
                        <DexBox padding="300">
                          <DexText variant="display-3" color="subtle">No customers found</DexText>
                        </DexBox>
                      </DexTableCell>
                    </DexTableRow>
                  ) : pageData.map((row) => (
                    <DexTableRow key={row.tenantId}>
                      <DexTableCell>
                        <DexLink href={`/partner-hub/customers/${row.appId}`} onClick={(e) => { e.preventDefault(); navigate(`/partner-hub/customers/${row.appId}`); }}>
                          {row.companyName}
                        </DexLink>
                      </DexTableCell>
                      <DexTableCell>{row.tenantId}</DexTableCell>
                      <DexTableCell>{row.product}</DexTableCell>
                      <DexTableCell>
                        <DexStatus variant={getBillingVariant(row.billingStatus)} emphasis="low">
                          {row.billingStatus}
                        </DexStatus>
                      </DexTableCell>
                      <DexTableCell>{formatDate(row.creationDate)}</DexTableCell>
                      <DexTableCell>{row.activeUsers}</DexTableCell>
                      <DexTableCell>{row.contactsUsage}</DexTableCell>
                      <DexTableCell>{row.markatableContacts}</DexTableCell>
                      <DexTableCell>{row.complaintRate ? `${row.complaintRate}%` : '0%'}</DexTableCell>
                      <DexTableCell>
                        <DexIconButton name="sign-in-log-in" label="Login to client app" size="dense" variant="transparent" />
                      </DexTableCell>
                    </DexTableRow>
                  ))}
                </DexTableBody>
              </DexTable>
            </div>
          )}

          {/* Activity Table */}
          {tab === 'activity' && (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <DexTable label="Customer activity" style={{ tableLayout: 'auto' }}>
                <DexTableHeader>
                  <DexTableRow>
                    <DexTableHeaderCell sort={getSortState('companyName')} onSort={() => handleSort('companyName')}>Customer name</DexTableHeaderCell>
                    <DexTableHeaderCell>App ID</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('allAutomations')} onSort={() => handleSort('allAutomations')}>Automations</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('contactsInAutomation')} onSort={() => handleSort('contactsInAutomation')}>Contacts in automation</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('newContacts')} onSort={() => handleSort('newContacts')}>New contacts</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('broadcasts')} onSort={() => handleSort('broadcasts')}>Broadcasts</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('logins')} onSort={() => handleSort('logins')}>Logins</DexTableHeaderCell>
                    <DexTableHeaderCell sort={getSortState('daysSinceLastLogin')} onSort={() => handleSort('daysSinceLastLogin')}>Last login</DexTableHeaderCell>
                  </DexTableRow>
                </DexTableHeader>
                <DexTableBody>
                  {pageData.length === 0 ? (
                    <DexTableRow>
                      <DexTableCell colSpan={8} style={{ textAlign: 'center' }}>
                        <DexBox padding="300">
                          <DexText variant="display-3" color="subtle">No customers found</DexText>
                        </DexBox>
                      </DexTableCell>
                    </DexTableRow>
                  ) : pageData.map((row) => (
                    <DexTableRow key={row.tenantId}>
                      <DexTableCell>
                        <DexLink href={`/partner-hub/customers/${row.appId}`} onClick={(e) => { e.preventDefault(); navigate(`/partner-hub/customers/${row.appId}`); }}>
                          {row.companyName}
                        </DexLink>
                      </DexTableCell>
                      <DexTableCell>{row.tenantId}</DexTableCell>
                      <DexTableCell>{row.allAutomations}</DexTableCell>
                      <DexTableCell>{row.contactsInAutomation}</DexTableCell>
                      <DexTableCell>{row.newContacts}</DexTableCell>
                      <DexTableCell>{row.broadcasts}</DexTableCell>
                      <DexTableCell>{row.logins}</DexTableCell>
                      <DexTableCell>{row.lastLoginDate === '-' ? '-' : row.lastLoginDate}</DexTableCell>
                    </DexTableRow>
                  ))}
                </DexTableBody>
              </DexTable>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <DexOffsetPager
              currentPage={page}
              onCurrentPageChange={setPage}
              totalPages={totalPages}
              size="dense"
              style={{ display: 'flex' }}
            />
          )}
        </DexStack>
      </DexBox>
    </>
  );
}
