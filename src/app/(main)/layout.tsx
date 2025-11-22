
import AppHeader from '@/components/app-header';
import { AuthWrapper } from '@/firebase/auth/use-user';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="flex min-h-screen flex-col">
        <AuthWrapper>
          <AppHeader />
          <main className="flex-1">{children}</main>
        </AuthWrapper>
      </div>
  );
}
