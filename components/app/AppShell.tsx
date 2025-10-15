"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthProvider';
import {
  LayoutDashboard,
  FolderKanban,
  Search,
  Calculator,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Property Search', href: '/dashboard/property-search', icon: Search },
  { name: 'FAR Calculator', href: '/dashboard/far-calculator', icon: Calculator },
  { name: 'Project Management', href: '/dashboard/project-management', icon: Building2 },
  { name: 'Import/Export', href: '/dashboard/import-export', icon: FileText },
  { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="h-screen flex overflow-hidden bg-[#DEEDF4]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#111111]/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ pointerEvents: 'auto' }}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#9CB2BC]/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between h-16 px-6 border-b border-[#9CB2BC]/20">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="text-[#78C7EA] font-bold text-xl">Regtime</div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#636363] hover:text-[#111111] transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-[#78C7EA]/10 text-[#78C7EA] border-l-4 border-[#78C7EA]'
                      : 'text-[#636363] hover:bg-[#DEEDF4] hover:text-[#111111]'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-[#9CB2BC]/20 p-4">
            <div className="flex items-center space-x-3 px-4 py-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-[#78C7EA] flex items-center justify-center text-white font-medium text-sm">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111111] truncate">
                  {user?.email || 'Admin User'}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center px-4 py-2 text-sm font-medium text-[#636363] hover:bg-[#DEEDF4] hover:text-[#111111] rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-[#9CB2BC]/20 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#636363] hover:text-[#111111] transition-colors mr-4"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-[#111111]">
            {navigation.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))?.name || 'Dashboard'}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
