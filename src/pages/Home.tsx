import { useAuth } from '../context/authContext';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center">
      {user ? <div>Hello {user.name}! You can open Private Page now.</div> : <div>Home</div>}
    </div>
  );
}
