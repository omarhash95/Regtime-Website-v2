'use client';

import { useEffect, useRef } from 'react';

/**
 * HubSpot Forms (official v2 embed) for Next.js App Router
 * - Loads HubSpot's hosted script once
 * - Creates the form into this component's container
 * - Guards against duplicate mounts in Strict Mode / HMR
 *
 * Docs: https://developers.hubspot.com/docs/cms/building-blocks/forms
 */
export default function HubSpotForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const createdRef = useRef(false);

  useEffect(() => {
    if (createdRef.current) return;
    createdRef.current = true;

    const portalId = '48321391';
    const formId = '27b23585-a05a-4eb3-8cdc-e2eb354f5044';
    const region = 'na1'; // or 'eu1' if your HubSpot account is EU

    // Dynamically inject the official v2 script
    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        const id = 'hs-forms-v2';
        const existing = document.getElementById(id) as HTMLScriptElement | null;
        if (existing && (window as any).hbspt?.forms?.create) return resolve();
        if (existing) {
          existing.addEventListener('load', () => resolve(), { once: true });
          existing.addEventListener('error', () => reject(new Error('HubSpot v2 failed to load')), { once: true });
          return;
        }
        const s = document.createElement('script');
        s.id = id;
        s.src = 'https://js.hsforms.net/forms/embed/v2.js';
        s.async = true;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('HubSpot v2 failed to load'));
        document.body.appendChild(s);
      });

    const mount = async () => {
      try {
        await ensureScript();
        const hbspt = (window as any).hbspt;
        if (!hbspt?.forms?.create) throw new Error('HubSpot API not ready');

        // Clear any previous content and mount the form
        const target = containerRef.current!;
        target.innerHTML = '';

        hbspt.forms.create({
          portalId,
          formId,
          region,
          target, // mount directly into this element
          // Optional callbacks:
          // onFormReady: ($form: any) => {},
          // onFormSubmitted: ($form: any) => {},
        });
      } catch (err) {
        // Visible hint in dev only
        if (process.env.NODE_ENV !== 'production') {
          const el = document.createElement('div');
          el.className = 'mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-3';
          el.textContent =
            'HubSpot form failed to load. Check: 1) trusted domain in HubSpot, 2) ad blockers/CSP, 3) correct portalId/formId.';
          containerRef.current?.appendChild(el);
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    };

    mount();
  }, []);

  return <div ref={containerRef} className="w-full max-w-xl mx-auto mt-8" />;
}
