import { NavLink } from 'react-router-dom';
import { navLinks } from '@data/navLinks';
import { buttonVariants } from '@components/ui/button';

export function Navigation() {
  return (
    <nav>
      <ul className="flex justify-center">
        {navLinks.map(({ path, name }) => (
          <NavLink key={path} to={path} className={buttonVariants({ variant: 'link' })}>
            {name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
