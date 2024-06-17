import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
import { routesData } from '@data/routesData';

export const RoutesComponent = () => {
  return (
    <Routes>
      {routesData.map(({ element: Element, path, isProtected }) =>
        !isProtected ? (
          <Route key={path} path={path} element={<Element />} />
        ) : (
          <Route key={path} element={<ProtectedRoute />}>
            <Route key={path} path={path} element={<Element />} />
          </Route>
        )
      )}
    </Routes>
  );
};
