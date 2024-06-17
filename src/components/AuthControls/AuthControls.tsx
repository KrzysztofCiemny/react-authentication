import { NavLink } from 'react-router-dom';
import { useAuth } from '@context/authContext';
import { Button, buttonVariants } from '@components/ui/button';

export function AuthControls() {
  const { user, handleLogout } = useAuth();
  return (
    <>
      {user ? (
        <Button onClick={() => handleLogout()} variant="ghost">
          Logout
        </Button>
      ) : (
        <NavLink to="/login" className={buttonVariants({ variant: 'ghost' })}>
          Sign in
        </NavLink>
      )}
    </>
  );
}
