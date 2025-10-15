import { AppShell } from '@/components/app/AppShell';
import { AuthProvider } from '@/lib/auth/AuthProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}
