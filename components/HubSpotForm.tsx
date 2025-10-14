'use client';

import { useEffect, useRef } from 'react';

type Props = {
  className?: string;
  portalId?: string;
  formId?: string;
  region?: 'na1' | 'eu1';
};

export default function HubSpotForm({
  className = '',
  portalId = (process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '').trim() || '48321391',
  formId   = (process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID   || '').trim() || '27b23585-a05a-4eb3-8cdc-e2eb354f5044',
  region   = ((process.env.NEXT_PUBLIC_HUBSPOT_REGION   || 'na1').trim() as 'na1' | 'eu1'),
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) Clear and add the placeholder BEFORE loading script
    container.innerHTML = '';
    const placeholder = document.createElement('div');
    placeholder.className = 'hs-form-frame';
    placeholder.setAttribute('data-portal-id', portalId);
    placeholder.setAttribute('data-form-id', formId);
    placeholder.setAttribute('data-region', region);
    container.appendChild(placeholder);

    // 2) Ensure embed script is present
    const src = `https://js.hsforms.net/forms/embed/${portalId}.js`;
    let script = Array.from(document.scripts).find((s) => s.src === src) as HTMLScriptElement | undefined;
    let appendedScript = false;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
      appendedScript = true;
    }

    // 3) MutationObserver: if HubSpot injects the form elsewhere, move it into our container
    const moveIntoContainerIfNeeded = (node: Node) => {
      if (!(node instanceof HTMLElement)) return;

      // HubSpot wraps the iframe in a div; look for the iframe first
      const iframe =
        (node.matches('iframe.hs-form-iframe') ? node : node.querySelector('iframe.hs-form-iframe')) as HTMLIFrameElement | null;

      if (!iframe) return;

      // Match on portalId/formId in URL to be sure it's OUR form
      const srcUrl = iframe.getAttribute('src') || '';
      if (!srcUrl.includes(`/${portalId}/${formId}`)) return;

      // If it's already inside our container, do nothing
      if (container.contains(iframe)) return;

      // Move the WHOLE wrapper (prefer parent element if it exists)
      const wrapper = iframe.parentElement ?? iframe;
      container.innerHTML = ''; // clear placeholder
      container.appendChild(wrapper);
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach(moveIntoContainerIfNeeded);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // In case the form was already created before the observer started
    // try to grab it once on the next tick.
    const tick = requestAnimationFrame(() => {
      document.querySelectorAll('iframe.hs-form-iframe').forEach((node) => moveIntoContainerIfNeeded(node));
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(tick);
      // Keep the form DOM on unmount to avoid flicker in dev/strict mode
      // (no cleanup needed)
      if (appendedScript && script && script.parentNode) {
        // do not remove the script; keeping it avoids reloads on revisit
      }
    };
  }, [portalId, formId, region]);

  return (
    <div className={className}>
      {/* reserve space so layout doesn’t collapse while the form initializes */}
      <div ref={containerRef} className="relative w-full min-h-[640px]" />
    </div>
  );
}
