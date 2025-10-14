'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Hero3D from './Hero3D';
import StatCounter from '@/components/ui/StatCounter';

const stats = [
  { id: 1, name: 'Affordable Housing Floor Area Created', value: 112500, suffix: '+' },
  { id: 2, name: 'Affordable Units Managed', value: 2000, suffix: '+' },
  { id: 3, name: 'Average Timeline for Submission', value: 6, suffix: ' weeks' },
];

type BrandHeroProps = { className?: string };

export default function BrandHero({ className = '' }: BrandHeroProps) {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background 3D Ribbon (unchanged) */}
      <div className="absolute inset-0">
        <Hero3D height={800} intensity={0.4} speed={0.6} parallaxStrength={0.15} />
      </div>

      {/* Legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/30 pointer-events-none" />

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Headline + subcopy */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Reinventing Affordable Housing in NYC
            </h1>
            <p className="mx-auto max-w-3xl text-lg md:text-xl text-white">
              Regtime is transforming how affordable housing is built, leased, and managed — with automation, intelligence, and transparency for every stakeholder.
            </p>
          </motion.div>

          {/* CTAs intentionally omitted per your prior request */}

          {/* Stats Grid (restored as before) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="text-center bg-[hsl(var(--card))]/80 backdrop-blur-sm ring-1 ring-[hsl(var(--border))]/50 rounded-2xl p-6 shadow-sm"
              >
                <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">
                  <StatCounter end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <p className="text-sm lg:text-base text-white font-medium">{stat.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}