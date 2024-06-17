import { Home } from '@pages/Home';
import { Login } from '@pages/Login';
import { RegisterFirstStep } from '@pages/Register/RegisterFirstStep';
import { Private } from '@pages/PrivatePage';
import { RegisterSecondStep } from '@pages/Register/RegisterSecondStep';

export const publicRoutes = new Set(['/register-first', '/register-second', '/login']);

export const routesData = [
  {
    path: '/',
    element: Home,
    isProtected: false,
  },
  {
    path: '/login',
    element: Login,
    isProtected: true,
  },
  {
    path: '/register-first',
    element: RegisterFirstStep,
    isProtected: true,
  },
  {
    path: '/register-second',
    element: RegisterSecondStep,
    isProtected: true,
  },
  {
    path: '/private',
    element: Private,
    isProtected: true,
  },
];
