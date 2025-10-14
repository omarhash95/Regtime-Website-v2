'use client';

import React, { createContext, useContext, useMemo, useState, PropsWithChildren, useCallback } from 'react';

type Toast = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  duration?: number; // ms
};

type ToastContextValue = {
  toasts: Toast[];
  show: (t: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
  clear: () => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((t: Omit<Toast, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const toast: Toast = { id, duration: 3500, variant: 'default', ...t };
    setToasts((prev) => [...prev, toast]);
    if (toast.duration && toast.duration > 0) {
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, toast.duration);
    }
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback((title: string, description?: string) => {
    show({ title, description, variant: 'success' });
  }, [show]);

  const error = useCallback((title: string, description?: string) => {
    show({ title, description, variant: 'error' });
  }, [show]);

  const info = useCallback((title: string, description?: string) => {
    show({ title, description, variant: 'default' });
  }, [show]);

  const warning = useCallback((title: string, description?: string) => {
    show({ title, description, variant: 'warning' });
  }, [show]);

  const api = useMemo<ToastContextValue>(() => ({
    toasts,
    show,
    dismiss,
    clear,
    success,
    error,
    info,
    warning,
  }), [toasts, show, dismiss, clear, success, error, info, warning]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="pointer-events-auto rounded-lg border border-border bg-card/95 p-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/80"
              role="status"
            >
              {t.title && <div className="font-medium text-foreground">{t.title}</div>}
              {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Strict hook: throws in development to catch missing provider, but becomes a no-op in production.
 * This prevents hard crashes in prod while keeping helpful dev signals.
 */
export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('useToastContext must be used within ToastProvider');
    }
    // Production-safe fallback (no-ops) to avoid app crash
    return {
      toasts: [],
      show: () => void 0,
      dismiss: () => void 0,
      clear: () => void 0,
      success: () => void 0,
      error: () => void 0,
      info: () => void 0,
      warning: () => void 0,
    };
  }
  return ctx;
}