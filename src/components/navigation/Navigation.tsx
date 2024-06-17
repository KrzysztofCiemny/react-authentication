import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { navLinks } from 'data/navLinks';

export function Navigation() {
  const { user, handleLogout } = useAuth();
  return (
    <div className="py-8 bg-black">
      <ul className="flex justify-center gap-4 text-white">
        {navLinks.map(({ path, name }) => (
          <NavLink key={path} to={path}>
            {name}
          </NavLink>
        ))}
        {user ? (
          <li onClick={() => handleLogout()} className="cursor-pointer">
            log out
          </li>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </ul>
    </div>
  );
}
