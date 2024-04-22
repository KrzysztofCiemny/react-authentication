import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

export function Navigation() {
  const { user, handleLogout } = useAuth();
  return (
    <div className="py-8 bg-black">
      <ul className="flex justify-center gap-4 text-white">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/private">Private</NavLink>
        {user ? (
          <li onClick={() => handleLogout()} className="cursor-pointer">
            log out
          </li>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </ul>
    </div>
  );
}
