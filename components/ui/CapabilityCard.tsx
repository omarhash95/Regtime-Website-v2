'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import TiltCard from './TiltCard';

interface CapabilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  delay?: number;
  className?: string;
}

export default function CapabilityCard({
  icon: Icon,
  title,
  description,
  features,
  delay = 0,
  className = ''
}: CapabilityCardProps) {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ 
        duration: shouldReduceMotion ? 0 : 0.6, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut" 
      }}
      viewport={{ once: true }}
      className={className}
    >
      <TiltCard className="h-full p-6 bg-card rounded-lg border border-border hover:border-brand-primary/30 transition-colors duration-300">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mr-4">
            <Icon className="w-6 h-6 text-brand-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <div className="flex-shrink-0 w-1.5 h-1.5 bg-brand-primary rounded-full mt-2 mr-3" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </TiltCard>
    </motion.div>
  );
}