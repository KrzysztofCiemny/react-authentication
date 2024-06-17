import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
  const { user, isNavigatePublic } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNavigatePublic) {
      if (!user) return navigate('/login');
    }

    if (isNavigatePublic) {
      if (user) return navigate('/');
    }
  }, []);

  return <Outlet />;
};
