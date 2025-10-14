'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

let lenis: any = null;
let rafId: number | null = null;

export function useLenis() {
  const { shouldReduceMotion } = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;

    const initLenis = async () => {
      // Only initialize if not already initialized
      if (lenis) return;
      
      const Lenis = (await import('lenis')).default;
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        if (lenis) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      };

      rafId = requestAnimationFrame(raf);

      // Add data attribute for styling hooks
      document.documentElement.setAttribute('data-lenis-smooth', '');
    };

    initLenis();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      // Only destroy lenis when motion is reduced or component unmounts permanently
      if (shouldReduceMotion && lenis) {
        lenis.destroy();
        lenis = null;
        document.documentElement.removeAttribute('data-lenis-smooth');
      }
    };
  }, [shouldReduceMotion]);

  return lenis;
}

export function scrollTo(target: string | number, options?: any) {
  if (lenis) {
    lenis.scrollTo(target, options);
  } else {
    // Fallback for when Lenis is not available
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
}