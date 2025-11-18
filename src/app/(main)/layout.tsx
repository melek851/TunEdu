
import AppHeader from '@/components/app-header';
import { AuthWrapper } from '@/firebase/auth/use-user';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1">{children}</main>
      </div>
    </AuthWrapper>
  );
}
