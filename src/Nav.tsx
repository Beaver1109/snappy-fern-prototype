import { useState } from 'react';
import { NavLink } from './NavLink';
import { NavLink as RouterNavLink } from 'react-router';
import {
  DexIcon,
  DexIconButton,
  DexInline,
  DexStack,
  DexText,
  DexThryvLogo,
} from '@thryvlabs/dex-react';

const MANAGEMENT_ITEMS = [
  { icon: 'list', label: 'Listings', to: '/partner-hub/listings' },
  { icon: 'star', label: 'Reputation', to: null },
  { icon: 'user', label: 'Social', to: null },
];

export function Nav() {
  const [managementOpen, setManagementOpen] = useState(true);

  return (
    <nav className="nav">
      <div className="nav-header">
        <DexInline alignY="center" gap="100" style={{ flexWrap: 'nowrap', minWidth: 0 }}>
          <DexIcon name="app-switcher" size="md" style={{ flexShrink: 0 }} />
          <DexThryvLogo variant="color" aria-label="Thryv" style={{ height: '24px', width: 'auto', flexShrink: 0 }} />
        </DexInline>
        <DexIconButton label="Collapse sidebar" name="chevrons-left" variant="transparent" size="dense" />
      </div>

      <DexStack as="ul" gap="025">
        <NavLink to="/partner-hub/dashboard" icon="home">Home</NavLink>
        {/* Manage network — group */}
        <li style={{ paddingTop: 'var(--dex-spacing-100)' }}>
          <DexText variant="caption" color="subtle" className="nav-section-heading" style={{ padding: 'var(--dex-spacing-050) var(--dex-spacing-150) var(--dex-spacing-025)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Manage network
          </DexText>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/customers">
                <DexIcon name="users" size="sm" />
                <DexText as="span" variant="body-2">Customers</DexText>
              </RouterNavLink>
            </li>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/locations">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <DexText as="span" variant="body-2">Locations</DexText>
              </RouterNavLink>
            </li>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/users-roles">
                <DexIcon name="users" size="sm" />
                <DexText as="span" variant="body-2">Users &amp; Roles</DexText>
              </RouterNavLink>
            </li>
          </ul>
        </li>

        {/* Engage customers — group */}
        <li style={{ paddingTop: 'var(--dex-spacing-100)' }}>
          <DexText variant="caption" color="subtle" className="nav-section-heading" style={{ padding: 'var(--dex-spacing-050) var(--dex-spacing-150) var(--dex-spacing-025)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Engage customers
          </DexText>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/listings">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <DexText as="span" variant="body-2">Listings</DexText>
                <DexIcon name="external-link" size="sm" style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </RouterNavLink>
            </li>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/reputation">
                <DexIcon name="star" size="sm" />
                <DexText as="span" variant="body-2">Reputation</DexText>
                <DexIcon name="external-link" size="sm" style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </RouterNavLink>
            </li>
          </ul>
        </li>

        {/* Analytics — group */}
        <li style={{ paddingTop: 'var(--dex-spacing-100)' }}>
          <DexText variant="caption" color="subtle" className="nav-section-heading" style={{ padding: 'var(--dex-spacing-050) var(--dex-spacing-150) var(--dex-spacing-025)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Analytics
          </DexText>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/performance">
                <DexIcon name="bar-chart" size="sm" />
                <DexText as="span" variant="body-2">Performance</DexText>
              </RouterNavLink>
            </li>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/advanced-reporting">
                <DexIcon name="external-link" size="sm" />
                <DexText as="span" variant="body-2">Advanced Reporting</DexText>
                <DexIcon name="external-link" size="sm" style={{ marginLeft: 'auto', opacity: 0.5 }} />
              </RouterNavLink>
            </li>
          </ul>
        </li>

        {/* Operations — group */}
        <li style={{ paddingTop: 'var(--dex-spacing-100)' }}>
          <DexText variant="caption" color="subtle" className="nav-section-heading" style={{ padding: 'var(--dex-spacing-050) var(--dex-spacing-150) var(--dex-spacing-025)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Operations
          </DexText>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/tasks">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <rect x="3" y="3" width="18" height="18" rx="3" ry="3"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <DexText as="span" variant="body-2">Tasks &amp; checklists</DexText>
              </RouterNavLink>
            </li>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/tools">
                <DexIcon name="sliders" size="sm" />
                <DexText as="span" variant="body-2">Tools</DexText>
              </RouterNavLink>
            </li>
            <li className="nav-link">
              <RouterNavLink to="/partner-hub/support">
                <DexIcon name="headphones" size="sm" />
                <DexText as="span" variant="body-2">Support</DexText>
              </RouterNavLink>
            </li>
          </ul>
        </li>
      </DexStack>

      {/* Account section — pinned to bottom */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--dex-borderColor-alpha-subtle)', paddingTop: 'var(--dex-spacing-100)' }}>
        <button style={{ all: 'unset', display: 'flex', alignItems: 'center', gap: 'var(--dex-spacing-150)', padding: 'var(--dex-spacing-100) var(--dex-spacing-150)', borderRadius: 'var(--dex-borderRadius-050)', width: '100%', cursor: 'pointer', boxSizing: 'border-box', transition: 'background-color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--dex-bgColor-transparent-hover)')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#3D2B8E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>EW</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <DexText variant="body-2" style={{ fontWeight: 600, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ezra Witt</DexText>
            <DexText variant="caption" color="subtle" style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Acme Franchising</DexText>
          </div>
          <DexIcon name="chevron-right" size="sm" style={{ flexShrink: 0, opacity: 0.5 }} />
        </button>
      </div>
    </nav>
  );
}
