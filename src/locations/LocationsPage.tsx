import { useState, useMemo, useRef, useEffect } from 'react';
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
  DexTable,
  DexTableHeader,
  DexTableBody,
  DexTableRow,
  DexTableHeaderCell,
  DexTableCell,
  DexOffsetPager,
} from '@thryvlabs/dex-react';
import { mockLocations, formatOpenedDate, REGIONS } from './locationsData';
import type { Location } from './locationsData';

const PAGE_SIZE = 10;

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'temp-closed', label: 'Temp closed' },
];

const REGION_OPTIONS = [
  { value: 'all', label: 'All regions' },
  ...REGIONS.map((r) => ({ value: r, label: r })),
];

function getStatusVariant(status: string): 'success' | 'danger' | 'warning' | 'default' {
  if (status === 'active') return 'success';
  if (status === 'inactive') return 'danger';
  if (status === 'temp-closed') return 'warning';
  return 'default';
}

function getStatusLabel(status: string) {
  if (status === 'temp-closed') return 'Temp closed';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

type SortField = keyof Location | '';
type SortDir = 'asc' | 'desc';

function sortLocations(data: Location[], field: SortField, dir: SortDir): Location[] {
  if (!field) return data;
  return [...data].sort((a, b) => {
    const av = a[field as keyof Location] ?? '';
    const bv = b[field as keyof Location] ?? '';
    const cmp = String(av).localeCompare(String(bv));
    return dir === 'asc' ? cmp : -cmp;
  });
}

export function LocationsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [region, setRegion] = useState('all');
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('');
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
    let data = mockLocations;
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q) ||
          l.locId.toLowerCase().includes(q) ||
          l.manager.toLowerCase().includes(q),
      );
    }
    if (status !== 'all') data = data.filter((l) => l.status === status);
    if (region !== 'all') data = data.filter((l) => l.region === region);
    return data;
  }, [search, status, region]);

  const sortedData = useMemo(() => sortLocations(filteredData, sortField, sortDir), [filteredData, sortField, sortDir]);

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE);
  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedData.slice(start, start + PAGE_SIZE);
  }, [sortedData, page]);

  const handleSort = (field: keyof Location) => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setPage(1);
  };

  const getSortState = (field: keyof Location) => {
    if (sortField !== field) return undefined;
    return sortDir;
  };

  const activeFilterCount = [status !== 'all', region !== 'all'].filter(Boolean).length;

  const clearFilters = () => {
    setStatus('all');
    setRegion('all');
    setPage(1);
  };

  const counts = useMemo(() => ({
    active: mockLocations.filter((l) => l.status === 'active').length,
    inactive: mockLocations.filter((l) => l.status === 'inactive').length,
    tempClosed: mockLocations.filter((l) => l.status === 'temp-closed').length,
  }), []);

  return (
    <>
      {/* Page header */}
      <DexBox paddingX="300" paddingY="200">
        <DexInline alignY="center" alignX="spread" stretch>
          <DexInline alignY="center" gap="100">
            <DexText variant="display-2">Locations</DexText>
            <DexText variant="display-2" color="subtle">({mockLocations.length})</DexText>
          </DexInline>
          <DexInline gap="100">
            <DexButton trailingIcon="download" variant="outline" color="neutral">Export</DexButton>
            <DexButton variant="solid" leading={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>}>Add Location</DexButton>
          </DexInline>
        </DexInline>
      </DexBox>

      <DexBox paddingX="300">
        <DexStack gap="300">

          {/* Status summary chips */}
          <DexInline gap="100">
            <DexButton variant="outline" color="neutral" shape="pill" size="dense" selected={status === 'all'} onClick={() => { setStatus('all'); setPage(1); }}>
              {mockLocations.length} All
            </DexButton>
            <DexButton variant="outline" color="neutral" shape="pill" size="dense" selected={status === 'active'} onClick={() => { setStatus('active'); setPage(1); }}>
              {counts.active} Active
            </DexButton>
            <DexButton variant="outline" color="neutral" shape="pill" size="dense" selected={status === 'inactive'} onClick={() => { setStatus('inactive'); setPage(1); }}>
              {counts.inactive} Inactive
            </DexButton>
            <DexButton variant="outline" color="neutral" shape="pill" size="dense" selected={status === 'temp-closed'} onClick={() => { setStatus('temp-closed'); setPage(1); }}>
              {counts.tempClosed} Temp closed
            </DexButton>
          </DexInline>

          {/* Toolbar */}
          <DexInline alignY="center" alignX="spread" stretch>
            <DexInline alignY="center" gap="100">
              {/* Search */}
              <div style={{ width: '260px' }}>
                <DexInput
                  label="Search locations"
                  labelHidden
                  placeholder="Search by name, city, manager…"
                  value={search}
                  onValueChange={(v) => { setSearch(v); setPage(1); }}
                  leading={<DexIcon name="search" />}
                />
              </div>

              {/* Filters */}
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
                    width: '240px', background: 'var(--dex-surface-flat-bgColor, #fff)',
                    border: '1px solid var(--dex-borderColor-alpha-subtle)',
                    borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                    padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px',
                  }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--dex-fgColor-subtle)' }}>
                      Status
                    </div>
                    <DexSelect label="Status" labelHidden value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                      {STATUS_OPTIONS.map((o) => <DexSelectItem key={o.value} value={o.value}>{o.label}</DexSelectItem>)}
                    </DexSelect>
                    <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--dex-fgColor-subtle)', marginTop: '4px' }}>
                      Region
                    </div>
                    <DexSelect label="Region" labelHidden value={region} onValueChange={(v) => { setRegion(v); setPage(1); }}>
                      {REGION_OPTIONS.map((o) => <DexSelectItem key={o.value} value={o.value}>{o.label}</DexSelectItem>)}
                    </DexSelect>
                    {activeFilterCount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px', borderTop: '1px solid var(--dex-borderColor-alpha-subtle)', marginTop: '4px' }}>
                        <DexButton size="dense" variant="ghost" onClick={clearFilters}>Clear filters</DexButton>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Active filter chips */}
              {status !== 'all' && (
                <DexTag color="blue" emphasis="low" onRemove={() => { setStatus('all'); setPage(1); }}>
                  {STATUS_OPTIONS.find((o) => o.value === status)?.label}
                </DexTag>
              )}
              {region !== 'all' && (
                <DexTag color="blue" emphasis="low" onRemove={() => { setRegion('all'); setPage(1); }}>
                  {region}
                </DexTag>
              )}
            </DexInline>

            <DexText variant="caption" color="subtle">
              {filteredData.length} of {mockLocations.length} locations
            </DexText>
          </DexInline>

          {/* Table */}
          <div style={{ width: '100%', overflowX: 'auto' }}>
            <DexTable label="Location list" style={{ tableLayout: 'auto' }}>
              <DexTableHeader>
                <DexTableRow>
                  <DexTableHeaderCell sort={getSortState('name')} onSort={() => handleSort('name')}>Location name</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('locId')} onSort={() => handleSort('locId')}>ID</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('address')} onSort={() => handleSort('address')}>Address</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('city')} onSort={() => handleSort('city')}>City / State</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('timezone')} onSort={() => handleSort('timezone')}>Timezone</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('hours')} onSort={() => handleSort('hours')}>Open hours</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('region')} onSort={() => handleSort('region')}>Region</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('status')} onSort={() => handleSort('status')}>Status</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('manager')} onSort={() => handleSort('manager')}>Manager</DexTableHeaderCell>
                  <DexTableHeaderCell sort={getSortState('openedDate')} onSort={() => handleSort('openedDate')}>Opened</DexTableHeaderCell>
                  <DexTableHeaderCell>Actions</DexTableHeaderCell>
                </DexTableRow>
              </DexTableHeader>
              <DexTableBody>
                {pageData.length === 0 ? (
                  <DexTableRow>
                    <DexTableCell colSpan={11} style={{ textAlign: 'center' }}>
                      <DexBox padding="300">
                        <DexText variant="display-3" color="subtle">No locations found</DexText>
                      </DexBox>
                    </DexTableCell>
                  </DexTableRow>
                ) : pageData.map((row) => (
                  <DexTableRow key={row.id}>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{row.name}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="caption" color="subtle" style={{ fontFamily: 'monospace' }}>{row.locId}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ whiteSpace: 'nowrap' }}>{row.address}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ whiteSpace: 'nowrap' }}>{row.city}, {row.state}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ whiteSpace: 'nowrap' }}>{row.timezone}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ whiteSpace: 'nowrap' }}>{row.hours}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexTag color="neutral" emphasis="low">{row.region}</DexTag>
                    </DexTableCell>
                    <DexTableCell>
                      <DexStatus variant={getStatusVariant(row.status)} emphasis="low">
                        {getStatusLabel(row.status)}
                      </DexStatus>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ whiteSpace: 'nowrap' }}>{row.manager}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexText variant="body-2" style={{ whiteSpace: 'nowrap' }}>{formatOpenedDate(row.openedDate)}</DexText>
                    </DexTableCell>
                    <DexTableCell>
                      <DexInline gap="025">
                        <DexIconButton name="edit" label="Edit location" size="dense" variant="transparent" />
                        <DexIconButton name="more-vertical" label="More options" size="dense" variant="transparent" />
                      </DexInline>
                    </DexTableCell>
                  </DexTableRow>
                ))}
              </DexTableBody>
            </DexTable>
          </div>

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
