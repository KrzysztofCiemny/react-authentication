import { Navigation } from '@components/Navigation/Navigation';
import { Logo } from '@components/Logo/Logo';
import { AuthControls } from '@components/AuthControls/AuthControls';

export function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-7 border border-b-[1px] border-slate-100">
      <div className="flex items-center space-x-10">
        <Logo />
        <Navigation />
      </div>
      <AuthControls />
    </header>
  );
}
