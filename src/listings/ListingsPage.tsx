import { useState } from 'react';
import {
  DexBox,
  DexButton,
  DexIcon,
  DexInline,
  DexStack,
  DexText,
  DexTable,
  DexTableHeader,
  DexTableBody,
  DexTableRow,
  DexTableHeaderCell,
  DexTableCell,
} from '@thryvlabs/dex-react';

interface Listing {
  id: string;
  businessName: string;
  identifier: string;
  address: string;
  city: string;
  status: 'active' | 'warning';
  date: string;
  userCount: string;
  syncPct: number;
  connections: { label: string; extra?: string }[];
  lastDate: string;
  regionTag?: string;
}

const LISTINGS: Listing[] = [
  { id: '1', businessName: "Jacqueline's Frisor", identifier: 'L: 234', address: 'Wernerstraße 53', city: '03046 Cottbus', status: 'active', date: '15.03.2024', userCount: '20/50', syncPct: 80, connections: [{ label: 'E-Mail', extra: '+2' }, { label: 'Facebook' }], lastDate: '12.09.2018' },
  { id: '2', businessName: 'Office Space', identifier: 'L: 343', address: '198 Avenue de France', city: '75013 Paris', status: 'warning', date: '29.01.2026', userCount: '0/0', syncPct: 36, connections: [{ label: 'E-Mail', extra: '+6' }], lastDate: '' },
  { id: '3', businessName: 'Café Store', identifier: 'L: AU1_FB', address: '628 Victoria St', city: '3051 Melbourne', status: 'active', date: '15.03.2024', userCount: '15/35', syncPct: 83, connections: [{ label: 'Services', extra: '+...' }, { label: 'Facebook' }], lastDate: '23.05.2017', regionTag: 'region_2' },
  { id: '4', businessName: 'The Best Nail Salon Ever', identifier: 'L: AU1_FB_', address: '628 Victoria Street', city: '3051 North Melbourne', status: 'active', date: '06.04.2024', userCount: '14/27', syncPct: 90, connections: [{ label: 'Services' }, { label: 'Facebook' }], lastDate: '06.04.2022', regionTag: 'TGBAU, Berl...' },
  { id: '5', businessName: 'Supermarket', identifier: 'L: AU2_FB', address: '91 Sixth Ave', city: 'NSW 2141 Sydney', status: 'active', date: '15.03.2024', userCount: '11/35', syncPct: 90, connections: [{ label: 'Services' }, { label: 'Facebook' }], lastDate: '07.03.2017' },
  { id: '6', businessName: 'Restaurant', identifier: 'L: AU3_FB', address: '9 Blakeney St', city: 'QLD 4101 Brisbane', status: 'active', date: '06.04.2024', userCount: '15/27', syncPct: 90, connections: [{ label: 'Services' }, { label: 'Facebook', extra: '(...)' }], lastDate: '06.04.2022' },
  { id: '7', businessName: 'Restaurant', identifier: 'L: AU3_FB', address: '9 Blakeney St', city: 'QLD 4101 Brisbane', status: 'active', date: '15.03.2024', userCount: '13/35', syncPct: 90, connections: [{ label: 'Services' }, { label: 'Facebook' }], lastDate: '07.03.2017' },
  { id: '8', businessName: 'Office', identifier: 'L: AU4_FB', address: '6 Flinders Street', city: '6016 Mount Hawthorn', status: 'active', date: '06.04.2024', userCount: '15/27', syncPct: 67, connections: [{ label: 'Services', extra: '+...' }, { label: 'Facebook', extra: '(...)' }], lastDate: '06.04.2022' },
  { id: '9', businessName: 'Office', identifier: 'L: AU4_FB', address: '6 Flinders Street', city: '6016 Mount Hawthorn', status: 'active', date: '15.03.2024', userCount: '16/35', syncPct: 67, connections: [{ label: 'Services', extra: '+...' }], lastDate: '26.01.2018' },
];

function SyncBadge({ pct }: { pct: number }) {
  const color = pct >= 80 ? '#1d9e75' : pct >= 60 ? '#e8a000' : '#e24b4a';
  const bg = pct >= 80 ? '#eaf3de' : pct >= 60 ? '#faeeda' : '#fcebeb';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: bg, color, borderRadius: 20, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>
      <span style={{ fontSize: 14 }}>☺</span> {pct}%
    </span>
  );
}

function StatusDot({ status }: { status: 'active' | 'warning' }) {
  return (
    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: status === 'active' ? '#1d9e75' : '#e8a000', marginRight: 4 }} />
  );
}

function ConnectionTag({ label, extra }: { label: string; extra?: string }) {
  const isEmail = label === 'E-Mail';
  const isServices = label === 'Services';
  const color = isEmail ? '#185fa5' : isServices ? '#185fa5' : '#3333aa';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, color, fontWeight: 500 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e24b4a', display: 'inline-block' }} />
      {label}{extra ? ` ${extra}` : ''}
    </span>
  );
}

const FILTER_OPTIONS = ['All Locations', 'Actions Required'];

export function ListingsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Locations');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allSelected, setAllSelected] = useState(false);

  const filtered = LISTINGS.filter(l =>
    !search || l.businessName.toLowerCase().includes(search.toLowerCase()) || l.address.toLowerCase().includes(search.toLowerCase())
  );

  function toggleAll() {
    if (allSelected) { setSelected(new Set()); setAllSelected(false); }
    else { setSelected(new Set(filtered.map(l => l.id))); setAllSelected(true); }
  }

  function toggleRow(id: string) {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  }

  return (
    <DexBox paddingX="300" paddingY="200">
      <DexStack gap="200">

        {/* Top bar */}
        <DexInline alignY="center" alignX="spread" stretch>
          <DexInline alignY="center" gap="150">
            <DexText variant="body-2" color="subtle">{filtered.length} locations</DexText>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <DexIcon name="search" size="sm" style={{ position: 'absolute', left: 8, color: 'var(--dex-fgColor-subtle)' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                style={{ paddingLeft: 30, paddingRight: 10, height: 32, border: '1px solid var(--dex-borderColor-alpha-subtle)', borderRadius: 'var(--dex-borderRadius-050)', fontSize: 13, background: 'var(--dex-surface-flat-bgColor)', color: 'var(--dex-fgColor-default)', outline: 'none', width: 180 }}
              />
            </div>
          </DexInline>
          <DexInline alignY="center" gap="100">
            <div style={{ display: 'flex', border: '1px solid var(--dex-borderColor-alpha-subtle)', borderRadius: 'var(--dex-borderRadius-050)', overflow: 'hidden' }}>
              <button style={{ padding: '5px 10px', background: 'var(--dex-bgColor-neutral-subtle)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="List view">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="1" width="6" height="6" rx="1"/>
                  <rect x="9" y="1" width="6" height="6" rx="1"/>
                  <rect x="1" y="9" width="6" height="6" rx="1"/>
                  <rect x="9" y="9" width="6" height="6" rx="1"/>
                </svg>
              </button>
              <button style={{ padding: '5px 10px', background: 'none', border: 'none', borderLeft: '1px solid var(--dex-borderColor-alpha-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="Map view">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 1C5.24 1 3 3.24 3 6c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                </svg>
              </button>
            </div>
            <DexButton variant="outline" color="neutral" leadingIcon="refresh-cw">Sync</DexButton>
            <DexButton variant="outline" color="neutral" leadingIcon="edit">Bulk Update</DexButton>
            <DexButton variant="outline" color="neutral" leadingIcon="download">Export</DexButton>
            <DexButton variant="solid">+ Add Location</DexButton>
          </DexInline>
        </DexInline>

        {/* Filter pills + table controls */}
        <DexInline alignY="center" alignX="spread" stretch>
          <DexInline alignY="center" gap="100">
            {FILTER_OPTIONS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500, cursor: 'pointer', border: '1px solid',
                  background: activeFilter === f ? 'var(--dex-bgColor-neutral-subtle)' : 'none',
                  borderColor: activeFilter === f ? 'var(--dex-borderColor-alpha-subtle)' : 'transparent',
                  color: 'var(--dex-fgColor-default)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                {f === 'Actions Required' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e24b4a', display: 'inline-block' }} />}
                {f}
              </button>
            ))}
          </DexInline>
          <DexInline alignY="center" gap="100">
            <DexButton variant="ghost" color="neutral" leadingIcon="filter">Advanced Filters</DexButton>
            <DexButton variant="ghost" color="neutral" leadingIcon="settings">Personalize table</DexButton>
          </DexInline>
        </DexInline>

        {/* Refine filters row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <DexText variant="caption" color="subtle" style={{ whiteSpace: 'nowrap' }}>Refine Your Location Search</DexText>
          {['Businesses', 'Groups', 'Location Status'].map(f => (
            <select key={f} style={{ padding: '4px 24px 4px 10px', border: '1px solid var(--dex-borderColor-alpha-subtle)', borderRadius: 'var(--dex-borderRadius-050)', fontSize: 12, background: 'var(--dex-surface-flat-bgColor)', color: 'var(--dex-fgColor-default)', cursor: 'pointer', appearance: 'none' }}>
              <option>{f}</option>
            </select>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--dex-borderColor-alpha-subtle)', margin: '0 4px' }} />
          <DexText variant="caption" color="subtle" style={{ whiteSpace: 'nowrap' }}>Track Sync &amp; Connection</DexText>
          {['Sync Status', 'Listing Connection Status'].map(f => (
            <select key={f} style={{ padding: '4px 24px 4px 10px', border: '1px solid var(--dex-borderColor-alpha-subtle)', borderRadius: 'var(--dex-borderRadius-050)', fontSize: 12, background: 'var(--dex-surface-flat-bgColor)', color: 'var(--dex-fgColor-default)', cursor: 'pointer', appearance: 'none' }}>
              <option>{f}</option>
            </select>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <DexTable label="Listings">
            <DexTableHeader>
              <DexTableRow>
                <DexTableHeaderCell style={{ width: 36 }}>
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ cursor: 'pointer' }} />
                </DexTableHeaderCell>
                <DexTableHeaderCell>Business name and Identifier</DexTableHeaderCell>
                <DexTableHeaderCell>Address</DexTableHeaderCell>
                <DexTableHeaderCell>Location status</DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="users" size="sm" /></DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="smile" size="sm" /></DexTableHeaderCell>
                <DexTableHeaderCell>Track Sync &amp; Connection</DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="calendar" size="sm" /></DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="star" size="sm" /></DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="message-circle" size="sm" /></DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="grid" size="sm" /></DexTableHeaderCell>
                <DexTableHeaderCell>Region</DexTableHeaderCell>
                <DexTableHeaderCell><DexIcon name="refresh-cw" size="sm" /></DexTableHeaderCell>
              </DexTableRow>
            </DexTableHeader>
            <DexTableBody>
              {filtered.map(listing => (
                <DexTableRow key={listing.id}>
                  <DexTableCell>
                    <input type="checkbox" checked={selected.has(listing.id)} onChange={() => toggleRow(listing.id)} style={{ cursor: 'pointer' }} />
                  </DexTableCell>
                  <DexTableCell>
                    <DexStack gap="000">
                      <DexText variant="body-2" style={{ fontWeight: 500, color: '#185fa5', cursor: 'pointer' }}>{listing.businessName}</DexText>
                      <DexText variant="caption" color="subtle">{listing.identifier}</DexText>
                    </DexStack>
                  </DexTableCell>
                  <DexTableCell>
                    <DexStack gap="000">
                      <DexText variant="body-2">{listing.address}</DexText>
                      <DexText variant="caption" color="subtle">{listing.city}</DexText>
                    </DexStack>
                  </DexTableCell>
                  <DexTableCell>
                    <DexInline alignY="center" gap="050">
                      <StatusDot status={listing.status} />
                      <DexText variant="caption">{listing.date}</DexText>
                    </DexInline>
                  </DexTableCell>
                  <DexTableCell>
                    <DexText variant="caption">{listing.userCount}</DexText>
                  </DexTableCell>
                  <DexTableCell>
                    <SyncBadge pct={listing.syncPct} />
                  </DexTableCell>
                  <DexTableCell>
                    <DexStack gap="025">
                      {listing.connections.map((c, i) => (
                        <ConnectionTag key={i} label={c.label} extra={c.extra} />
                      ))}
                    </DexStack>
                  </DexTableCell>
                  <DexTableCell><DexText variant="caption" color="subtle">—</DexText></DexTableCell>
                  <DexTableCell><DexText variant="caption" color="subtle">—</DexText></DexTableCell>
                  <DexTableCell><DexText variant="caption" color="subtle">—</DexText></DexTableCell>
                  <DexTableCell><DexText variant="caption" color="subtle">n/a</DexText></DexTableCell>
                  <DexTableCell>
                    {listing.regionTag
                      ? <DexText variant="caption" color="subtle">{listing.regionTag}</DexText>
                      : <DexText variant="caption" color="subtle">—</DexText>}
                  </DexTableCell>
                  <DexTableCell>
                    <DexText variant="caption" color="subtle">{listing.lastDate || '—'}</DexText>
                  </DexTableCell>
                </DexTableRow>
              ))}
            </DexTableBody>
          </DexTable>
        </div>

      </DexStack>
    </DexBox>
  );
}
