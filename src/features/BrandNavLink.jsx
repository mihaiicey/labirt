import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export function BrandNavLink({ children, ...props }) {
    return (
      <NavLink
        {...props}
        className={({ isActive }) =>
          clsx('hover:text-primary hover:underline', { ['text-primary underline']: isActive })
        }
      >
        {children}
      </NavLink>
    );
}