'use client';

import { PropsWithChildren } from 'react';
import { ToastProvider } from '@/components/toast/ToastProvider';

/**
 * Ensures ToastProvider exists above any components (e.g., CommandPalette) that consume it.
 * Keep this very small so it can sit directly in app/layout.tsx.
 */
export default function ToastRoot({ children }: PropsWithChildren) {
  return <ToastProvider>{children}</ToastProvider>;
}