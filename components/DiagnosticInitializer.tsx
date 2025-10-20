'use client';

import { useEffect } from 'react';
import { installGlobalErrorHandlers } from '@/lib/diagnostics';

export default function DiagnosticInitializer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      installGlobalErrorHandlers();
      console.log('[DIAGNOSTIC] Global error handlers installed');
    }
  }, []);

  return null;
}
