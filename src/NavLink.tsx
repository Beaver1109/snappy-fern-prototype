import { NavLink as RouterNavLink } from 'react-router';
import type { ReactNode } from 'react';
import { DexIcon, DexText } from '@thryvlabs/dex-react';

interface NavLinkProps {
  to: string;
  icon?: string;
  children: ReactNode;
  trailing?: ReactNode;
}

export function NavLink({ to, icon, children, trailing }: NavLinkProps) {
  return (
    <li className="nav-link">
      <RouterNavLink to={to} end={to === '/'}>
        {icon && <DexIcon name={icon} size="sm" />}
        <DexText as="span" variant="body-2">
          {children}
        </DexText>
        {trailing && <span className="nav-link-trailing">{trailing}</span>}
      </RouterNavLink>
    </li>
  );
}
