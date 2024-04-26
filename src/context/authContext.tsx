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

type StoredData = User | boolean | null;

export const AuthContext = createContext<ContextProviderValue | undefined>(undefined);
export const useAuth = () => {
  const userData = useContext(AuthContext);

  if (!userData) throw new Error('User is undefined');

  return userData;
};

const getStoredData = <T extends StoredData>(item: string): T => {
  const storedData = localStorage.getItem(item);

  if (!storedData) return null as T;

  return JSON.parse(storedData) as T;
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getStoredData<User>('user');
    const isRemembered = getStoredData<boolean>('isRemembered');

    if (!storedUser || !isRemembered) return;

    setUser(storedUser);
  }, []);

  const handleRegister = (data: User) => {
    localStorage.setItem('user', JSON.stringify(data));
    console.log('registered');
  };

  const handleLogin = (data: User) => {
    const storedUser = getStoredData<User>('user');

    if (storedUser && data.email === storedUser.email && data.password === storedUser.password) {
      setUser(storedUser);

      if (data.isRemembered) {
        localStorage.setItem('isRemembered', JSON.stringify(true));
      }

      return navigate('/');
    }

    console.error('Wrong email or password');
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
