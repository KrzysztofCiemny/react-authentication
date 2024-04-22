import { useAuth } from '../context/authContext';

export function Private() {
  const { user } = useAuth();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        {user ? <div>Hello {user.name}! Welcome to Private Page.</div> : null}
      </div>
    </div>
  );
}
