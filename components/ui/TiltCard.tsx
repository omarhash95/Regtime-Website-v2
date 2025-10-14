'use client';

import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number; // 0-1, how strong the tilt effect is
  glowEffect?: boolean;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = '',
  tiltStrength = 0.1,
  glowEffect = false,
  onClick
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || shouldReduceMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    
    const rotateX = -deltaY * tiltStrength * 10;
    const rotateY = deltaX * tiltStrength * 10;
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current || shouldReduceMotion) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      ref={ref}
      className={`relative transition-all duration-200 ease-out ${
        glowEffect ? 'hover:shadow-2xl hover:shadow-brand-primary/20' : ''
      } ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}