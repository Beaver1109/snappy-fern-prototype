import { useState } from 'react';
import {
  DexButton,
  DexIconButton,
  DexText,
  DexInline,
  DexStack,
} from '@thryvlabs/dex-react';

// ── Mock Dashboard (blurred background) ───────────────────────────────────────

function KpiCard({ label, value, delta, color }: { label: string; value: string; delta: string; color: string }) {
  return (
    <div style={{ background: 'var(--dex-surface-flat-bgColor)', borderRadius: 12, padding: '16px 20px', border: '1px solid var(--dex-borderColor-alpha-subtle)', flex: 1 }}>
      <div style={{ fontSize: 12, color: 'var(--dex-fgColor-subtle)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color, fontWeight: 500 }}>{delta}</div>
    </div>
  );
}

function FakeBarChart() {
  const bars = [
    { label: 'Baldwin Pk', value: 82 },
    { label: 'Hollywood', value: 67 },
    { label: 'Santa Mon.', value: 91 },
    { label: 'San Diego', value: 55 },
    { label: 'Las Vegas', value: 74 },
    { label: 'Scottsdale', value: 61 },
    { label: 'Salt Lake', value: 48 },
    { label: 'Dallas', value: 79 },
  ];
  return (
    <div style={{ background: 'var(--dex-surface-flat-bgColor)', borderRadius: 12, padding: 20, border: '1px solid var(--dex-borderColor-alpha-subtle)' }}>
      <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Revenue by Location — Aug 2026</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
        {bars.map((b) => (
          <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: `${b.value}%`, background: '#FF5000', borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
            <div style={{ fontSize: 10, color: 'var(--dex-fgColor-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '100%', textOverflow: 'ellipsis' }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FakeLineChart() {
  const points = [30, 45, 38, 60, 52, 70, 65, 80, 74, 90, 85, 95];
  const max = 100;
  const w = 300;
  const h = 80;
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${h - (p / max) * h}`).join(' ');
  const areaD = `${pathD} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div style={{ background: 'var(--dex-surface-flat-bgColor)', borderRadius: 12, padding: 20, border: '1px solid var(--dex-borderColor-alpha-subtle)' }}>
      <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Franchise Revenue Trend</div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF5000" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF5000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#grad)" />
        <path d={pathD} fill="none" stroke="#FF5000" strokeWidth="2" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map((m) => (
          <span key={m} style={{ fontSize: 10, color: 'var(--dex-fgColor-subtle)' }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function FakeTable() {
  const rows = [
    { loc: 'Baldwin Park', revenue: '$48,210', sessions: '3,840', conv: '12.4%', roas: '4.2×' },
    { loc: 'Hollywood', revenue: '$41,550', sessions: '3,120', conv: '10.8%', roas: '3.9×' },
    { loc: 'Santa Monica', revenue: '$53,900', sessions: '4,210', conv: '14.1%', roas: '5.1×' },
    { loc: 'Las Vegas Strip', revenue: '$62,340', sessions: '4,980', conv: '15.3%', roas: '5.8×' },
    { loc: 'Dallas Uptown', revenue: '$38,770', sessions: '2,890', conv: '9.6%', roas: '3.5×' },
  ];
  return (
    <div style={{ background: 'var(--dex-surface-flat-bgColor)', borderRadius: 12, border: '1px solid var(--dex-borderColor-alpha-subtle)', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', fontWeight: 600, fontSize: 14, borderBottom: '1px solid var(--dex-borderColor-alpha-subtle)' }}>Location Roll-up Report</div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: 'var(--dex-bgColor-neutral-subtle)' }}>
            {['Location', 'Revenue', 'Sessions', 'Conv. Rate', 'ROAS'].map((h) => (
              <th key={h} style={{ padding: '8px 16px', textAlign: 'left', fontSize: 12, color: 'var(--dex-fgColor-subtle)', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.loc} style={{ borderTop: '1px solid var(--dex-borderColor-alpha-subtle)', background: i % 2 === 0 ? 'transparent' : 'var(--dex-bgColor-neutral-subtle, rgba(0,0,0,0.01))' }}>
              <td style={{ padding: '10px 16px', fontWeight: 500 }}>{r.loc}</td>
              <td style={{ padding: '10px 16px' }}>{r.revenue}</td>
              <td style={{ padding: '10px 16px' }}>{r.sessions}</td>
              <td style={{ padding: '10px 16px', color: '#22C55E', fontWeight: 600 }}>{r.conv}</td>
              <td style={{ padding: '10px 16px', fontWeight: 600 }}>{r.roas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MockDashboard() {
  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <KpiCard label="Total Revenue" value="$284,770" delta="↑ 18.4% vs last month" color="#22C55E" />
        <KpiCard label="Total Sessions" value="23,040" delta="↑ 11.2% vs last month" color="#22C55E" />
        <KpiCard label="Avg. Conv. Rate" value="12.4%" delta="↑ 1.3pts vs last month" color="#22C55E" />
        <KpiCard label="Avg. ROAS" value="4.5×" delta="↓ 0.2× vs last month" color="#EF4444" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FakeBarChart />
        <FakeLineChart />
      </div>
      <FakeTable />
    </div>
  );
}

// ── Provider logos (text-based) ───────────────────────────────────────────────

function TapClicksLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: '#E8F4FF', border: '1px solid #B8DEFF' }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#0066CC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>+</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#0066CC' }}>TapClicks</span>
    </div>
  );
}

function WickedReportsLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: '#FFF0F0', border: '1px solid #FFD0D0' }}>
      <div style={{ width: 20, height: 20, borderRadius: 4, background: '#CC0000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 900 }}>W</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#CC0000' }}>Wicked Rep</span>
    </div>
  );
}

function GraphlyLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: '#F3F0FF', border: '1px solid #D4C8FF' }}>
      <div style={{ width: 20, height: 20, borderRadius: 4, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M3 3v18h18"/><path d="m3 9 4-4 4 4 4-7 4 4"/></svg>
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#7C3AED' }}>Graphly</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

const PROVIDERS = [
  {
    id: 'tapclicks',
    logo: <TapClicksLogo />,
    name: 'TapClicks',
    description: 'AI-powered marketing intelligence platform. 250+ data connectors, automated white-label reports, and franchise roll-up dashboards built for scale.',
    tags: ['Franchise-focused', '250+ connectors', 'AI reporting'],
    badge: '⭐ Best for franchises',
    price: '$119/mo',
  },
  {
    id: 'wicked',
    logo: <WickedReportsLogo />,
    name: 'Wicked Reports',
    description: 'Multi-touch attribution and ROI tracking purpose-built for small business and franchise operators. Connects ad spend to actual revenue.',
    tags: ['Attribution', 'ROI tracking', 'Revenue analytics'],
    badge: null,
    price: '$109/mo',
  },
  {
    id: 'graphly',
    logo: <GraphlyLogo />,
    name: 'Graphly',
    description: 'Deep Keap/Infusionsoft analytics with beautiful visual dashboards. Ideal for partners who want to surface CRM and pipeline data at a glance.',
    tags: ['Keap-native', 'CRM analytics', 'Pipeline reporting'],
    badge: null,
    price: '$109/mo',
  },
];

export function AdvancedReportingPage() {
  const [showModal, setShowModal] = useState(true);
  const [selected, setSelected] = useState('tapclicks');

  const selectedProvider = PROVIDERS.find((p) => p.id === selected);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>

      {/* Blurred mock dashboard */}
      <div style={{ filter: showModal ? 'blur(4px)' : 'none', pointerEvents: showModal ? 'none' : 'auto', transition: 'filter 0.2s' }}>
        <div style={{ padding: '24px 24px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <DexText variant="display-2">Advanced Reporting</DexText>
            <DexText variant="body-2" color="subtle">Powered by TapClicks · franchise roll-up · Aug 2026</DexText>
          </div>
          <DexButton variant="outline" color="neutral">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: 6 }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export PDF
          </DexButton>
        </div>
        <MockDashboard />
      </div>

      {/* Dark overlay */}
      {showModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
      )}

      {/* Unlock modal */}
      {showModal && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div style={{ width: 560, maxHeight: '90vh', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column' }}>

            {/* Dark header */}
            <div style={{ background: '#1E2A4A', padding: '28px 28px 24px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
                    Unlock Advanced Reporting
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.3, maxWidth: 420 }}>
                    Take your franchise analytics to the next level
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', padding: 4, marginTop: -4, flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 20 }}>
                Connect a preferred reporting provider to unlock custom KPI dashboards, cross-location roll-up reporting, and white-labeled client reports — all pulling live from your Thryv data.
              </div>
              {/* Feature pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { icon: '↗', label: 'Custom KPI dashboards' },
                  { icon: '⊞', label: 'Roll-up reporting' },
                  { icon: '◎', label: 'White-labeled reports' },
                  { icon: '✓', label: 'Live Thryv data sync' },
                ].map((f) => (
                  <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{f.icon}</span>
                    <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 500 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Provider list */}
            <div style={{ background: 'var(--dex-surface-flat-bgColor)', flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--dex-fgColor-subtle)', marginBottom: 14 }}>
                Choose your reporting provider
              </div>
              <DexStack gap="150">
                {PROVIDERS.map((provider) => {
                  const isSelected = selected === provider.id;
                  return (
                    <button
                      key={provider.id}
                      onClick={() => setSelected(provider.id)}
                      style={{
                        all: 'unset', display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 18px',
                        borderRadius: 12, border: `2px solid ${isSelected ? '#3392FF' : 'var(--dex-borderColor-alpha-subtle)'}`,
                        background: isSelected ? '#F0F7FF' : 'var(--dex-surface-flat-bgColor)',
                        cursor: 'pointer', width: '100%', boxSizing: 'border-box', transition: 'border-color 0.15s, background 0.15s',
                      }}
                    >
                      {/* Radio */}
                      <div style={{ marginTop: 2, flexShrink: 0 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${isSelected ? '#3392FF' : '#CBD5E1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3392FF' }} />}
                        </div>
                      </div>
                      {/* Logo */}
                      <div style={{ flexShrink: 0, marginTop: 2 }}>{provider.logo}</div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{provider.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--dex-fgColor-subtle)', lineHeight: 1.5, marginBottom: 10 }}>{provider.description}</div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                          {provider.tags.map((t) => (
                            <span key={t} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'var(--dex-bgColor-neutral-subtle)', border: '1px solid var(--dex-borderColor-alpha-subtle)', color: 'var(--dex-fgColor-default)' }}>{t}</span>
                          ))}
                          {provider.badge && (
                            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: '#FFFBEB', border: '1px solid #FDE68A', color: '#92400E', fontWeight: 600 }}>{provider.badge}</span>
                          )}
                        </div>
                      </div>
                      {/* Price */}
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--dex-fgColor-subtle)', marginBottom: 2 }}>Starting at</div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{provider.price}</div>
                      </div>
                    </button>
                  );
                })}
              </DexStack>
            </div>

            {/* Footer */}
            <div style={{ background: 'var(--dex-surface-flat-bgColor)', borderTop: '1px solid var(--dex-borderColor-alpha-subtle)', padding: '16px 28px', display: 'flex', justifyContent: 'flex-end', gap: 12, flexShrink: 0 }}>
              <DexButton variant="outline" color="neutral" onClick={() => setShowModal(false)}>Maybe later</DexButton>
              <DexButton variant="solid" onClick={() => setShowModal(false)}>
                Connect {selectedProvider?.name}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 6 }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </DexButton>
            </div>
          </div>
        </div>
      )}

      {/* CTA when modal is dismissed */}
      {!showModal && (
        <div style={{ position: 'absolute', top: 24, right: 24 }}>
          <DexButton variant="solid" onClick={() => setShowModal(true)}>
            Unlock Advanced Reporting
          </DexButton>
        </div>
      )}
    </div>
  );
}
