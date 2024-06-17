import { useAuth } from '@context/authContext';
import { RoutesComponent } from '@components/RoutesComponent/RoutesComponent';
import { Header } from '@components/Header/Header';

export function AppWrapper() {
  const { loading } = useAuth();

  if (loading) return <div>loading</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <RoutesComponent />
    </div>
  );
}
