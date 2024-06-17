import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { publicRoutes } from 'data/routesData';
import {
  User,
  ContextProviderValue,
  StoredData,
  UserSchema,
  RegisterFormInputs,
} from 'types/context';

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

const validateUserData = (data: User) => {
  return UserSchema.safeParse(data);
};

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [registerData, setRegisterData] = useState<RegisterFormInputs>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigatePublic = publicRoutes.has(location.pathname);

  useEffect(() => {
    const storedUser = getStoredData<User>('user');
    const isRemembered = getStoredData<boolean>('isRemembered');

    if (!storedUser && !user && !isNavigatePublic) {
      setLoading(false);
      return navigate('/login');
    }

    if (!user && !isRemembered && !isNavigatePublic) {
      setLoading(false);
      return navigate('/login');
    }

    if (isRemembered) setUser(storedUser);
    setLoading(false);
  }, [location.pathname]);

  const handleRegister = (data: User) => {
    const validation = validateUserData(data);

    if (!validation.success) {
      console.error('Validation failed: ', validation.error.errors);
      return;
    }

    localStorage.setItem('user', JSON.stringify(data));
    console.log('registered');
    navigate('/login');
  };

  const handleLogin = (data: User) => {
    const validation = validateUserData(data);

    if (!validation.success) {
      console.error('Validation failed: ', validation.error.errors);
      return;
    }

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
    navigate('/login');
  };

  const providerData: ContextProviderValue = {
    user,
    handleLogin,
    handleRegister,
    handleLogout,
    loading,
    isNavigatePublic,
    getStoredData,
    registerData,
    setRegisterData,
  };

  return <AuthContext.Provider value={providerData}>{children}</AuthContext.Provider>;
}
