import { Navigation } from 'components/Navigation/Navigation';
import { useAuth } from 'context/authContext';
import { RoutesComponent } from 'components/RoutesComponent/RoutesComponent';

export function Wrapper() {
  const { loading } = useAuth();

  if (loading) return <div>loading</div>;

  return (
    <>
      <Navigation />
      <RoutesComponent />
    </>
  );
}
