'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StatCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export default function StatCounter({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const { shouldReduceMotion } = useReducedMotion();
  
  const motionValue = useMotionValue(start);
  const springValue = useSpring(motionValue, {
    duration: shouldReduceMotion ? 0 : duration,
    bounce: 0
  });
  
  const [displayValue, setDisplayValue] = useState(start);

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [springValue]);

  const formatNumber = (num: number) => {
    const rounded = decimals > 0 ? num.toFixed(decimals) : Math.round(num);
    return `${prefix}${rounded.toLocaleString()}${suffix}`;
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      {formatNumber(displayValue)}
    </motion.span>
  );
}