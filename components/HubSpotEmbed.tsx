// components/HubSpotEmbed.tsx
'use client';

import { useEffect, useRef } from 'react';

type Region = 'na1' | 'eu1';

type Props = {
  className?: string;
  portalId: string;
  formId: string;
  region?: Region; // defaults to 'na1'
};

/**
 * HubSpot Forms v2 embed (Next.js App Router safe)
 * - Loads https://js.hsforms.net/forms/embed/v2.js once
 * - Guards for StrictMode double-mount
 * - Renders into a stable ref instead of using selectors
 */
export default function HubSpotEmbed({
  className = '',
  portalId,
  formId,
  region = 'na1',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const didCreateRef = useRef(false);

  useEffect(() => {
    if (didCreateRef.current) return; // avoid duplicate work in StrictMode/HMR
    didCreateRef.current = true;

    let cancelled = false;

    const nextTick = () =>
      new Promise<void>((r) => requestAnimationFrame(() => r()));

    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        const id = 'hs-forms-v2';
        const existing = document.getElementById(id) as HTMLScriptElement | null;

        const isReady = () =>
          typeof (window as any)?.hbspt?.forms?.create === 'function';

        if (existing) {
          if (isReady()) return resolve();
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('HubSpot forms script failed to load')), { once: true });
          return;
        }

        const s = document.createElement('script');
        s.id = id;
        s.async = true;
        s.defer = true;
        s.src = 'https://js.hsforms.net/forms/embed/v2.js';
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('HubSpot forms script failed to load'));
        (document.body || document.head).appendChild(s);
      });

    const mount = async () => {
      try {
        // Allow the ref to attach
        await nextTick();
        if (cancelled) return;

        const target = containerRef.current;
        if (!target) return;

        await ensureScript();
        if (cancelled) return;

        const hbspt = (window as any).hbspt;
        if (!hbspt?.forms?.create) throw new Error('HubSpot API not ready');

        // Clear fallback before insert (still mounted/same node)
        if (cancelled || containerRef.current !== target) return;
        target.innerHTML = '';

        // Create form
        hbspt.forms.create({
          portalId,
          formId,
          region,
          target,
        });
      } catch (err) {
        if (!cancelled) {
          // Show a dev-only hint; don’t leak details in production
          if (process.env.NODE_ENV !== 'production') {
            console.error(err);
            const el = document.createElement('div');
            el.className =
              'mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3';
            el.textContent =
              'HubSpot form failed to load. Check CSP, portalId/formId/region, and that the form is published & allowed on this domain.';
            containerRef.current?.appendChild(el);
          }
        }
      }
    };

    mount();

    return () => {
      cancelled = true;
      // Do not clear innerHTML on unmount to avoid dev-mode flicker.
    };
  }, [portalId, formId, region]);

  return (
    <div className={className}>
      <div ref={containerRef} className="min-h-[420px] w-full">
        {/* Fallback while form loads */}
        <div className="p-4 text-center text-muted-foreground">
          Loading contact form...
        </div>
      </div>
    </div>
  );
}
