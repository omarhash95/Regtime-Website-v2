'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import CommandPalette from '@/components/command/CommandPalette';
import { useGlobalShortcuts } from '@/hooks/useGlobalShortcuts';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useGlobalShortcuts([
    {
      key: 'cmd+k',
      handler: () => setIsCommandPaletteOpen(true),
      description: 'Open command palette',
      category: 'actions'
    },
    {
      key: 'ctrl+k',
      handler: () => setIsCommandPaletteOpen(true),
      description: 'Open command palette',
      category: 'actions'
    }
  ]);

  return (
    <>
      <header className="bg-background sticky top-0 z-40 border-b border-[hsl(var(--border))]/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
          {/* Left: Brand lockup (theme-aware) */}
          <div className="flex lg:flex-1">
            <Link href="/" aria-label="Regtime home" className="-m-1.5 p-1.5">
              <Image
                src="/lockup-anti-white-logo.png"
                alt="Regtime"
                width={160}
                height={36}
                className="h-8 w-auto md:h-10 md:w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-foreground hover:text-brand-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side: remove command button; keep mobile trigger */}
          <div className="flex lg:flex-1 items-center justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground lg:hidden ring-1 ring-[hsl(var(--border))]"
              onClick={() => setMobileOpen(true)}
              aria-label="Open main menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile menu sheet */}
        {mobileOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-background shadow-xl ring-1 ring-[hsl(var(--border))] focus:outline-none">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border))]">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileOpen(false)} aria-label="Regtime home">
                  <Image 
                    src="/lockup-anti-white-logo.png" 
                    alt="Regtime" 
                    width={140} 
                    height={32} 
                    className="h-7 w-auto" 
                  />
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2.5 text-foreground ring-1 ring-[hsl(var(--border))]"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1 px-4 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-[hsl(var(--muted))]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Keep palette mounted globally if used elsewhere */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </>
  );
}