import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  name?: string;
  email: string;
  password: string;
  isRemembered?: boolean;
};

type ContextProviderValue = {
  user: User | null;
  handleLogin: (data: User) => void;
  handleRegister: (data: User) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<ContextProviderValue | undefined>(undefined);
export const useAuth = () => {
  const userData = useContext(AuthContext);

  if (userData === undefined) {
    throw new Error('User is undefined');
  }

  return userData;
};

const getStoredUser = (): User | null => {
  return JSON.parse(localStorage.getItem('user') || 'null');
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getStoredUser();
    const isRemembered = JSON.parse(localStorage.getItem('isRemembered') || 'false');
    if (storedUser && isRemembered) {
      setUser(storedUser);
    }
  }, []);

  const handleRegister = (data: User) => {
    localStorage.setItem('user', JSON.stringify(data));
    console.log('registered');
  };

  const handleLogin = (data: User) => {
    const storedUser = getStoredUser();

    if (storedUser && data.email === storedUser.email && data.password === storedUser.password) {
      setUser(storedUser);

      navigate('/');

      if (data.isRemembered) {
        localStorage.setItem('isRemembered', JSON.stringify(true));
      }
    } else {
      console.error('Wrong email or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('isRemembered');
    navigate('/');
  };

  const providerData: ContextProviderValue = {
    user,
    handleLogin,
    handleRegister,
    handleLogout,
  };

  return <AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>;
}
