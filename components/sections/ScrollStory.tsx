'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Database, Zap, Users, ArrowRight, Check } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import StatCounter from '@/components/ui/StatCounter';
import Image from 'next/image';

const codeSnippets = {
  setup: `// Quick setup
npm install @regtime/sdk

import { Regtime } from '@regtime/sdk';

const regtime = new Regtime({
  apiKey: process.env.REGTIME_API_KEY
});`,
  
  tracking: `// Start tracking time
const session = await regtime.startSession({
  project: 'website-redesign',
  task: 'hero-section',
  team: 'design'
});

// Auto-categorization
session.addTags(['frontend', 'ui']);`,

  analytics: `// Get insights
const insights = await regtime.getInsights({
  timeframe: '30d',
  groupBy: 'project'
});

console.log(insights.productivity); // +40%
console.log(insights.efficiency);   // +25%`
};

const architectureNodes = [
  { id: 'client', label: 'Client Apps', x: 20, y: 50, icon: Users },
  { id: 'api', label: 'API Gateway', x: 50, y: 30, icon: Zap },
  { id: 'analytics', label: 'Analytics Engine', x: 50, y: 70, icon: Code },
  { id: 'database', label: 'Time Database', x: 80, y: 50, icon: Database }
];

const connections = [
  { from: 'client', to: 'api' },
  { from: 'api', to: 'analytics' },
  { from: 'api', to: 'database' },
  { from: 'analytics', to: 'database' }
];

// Helper function moved outside component to avoid JSX parsing issues
const getStageOpacity = (stageIndex: number, progress: number) => {
  const stageSize = 1 / 2; // 2 main stages
  const stageStart = stageIndex * stageSize;
  const stageEnd = (stageIndex + 1) * stageSize;
  
  if (progress < stageStart) return 0;
  if (progress > stageEnd) return 0;
  
  // Fade in during first 20% of stage
  if (progress < stageStart + stageSize * 0.2) {
    return (progress - stageStart) / (stageSize * 0.2);
  }
  
  // Fade out during last 20% of stage
  if (progress > stageEnd - stageSize * 0.2) {
    return (stageEnd - progress) / (stageSize * 0.2);
  }
  
  // Fully visible in the middle 60% of stage
  return 1;
};

interface ScrollStoryProps {
  className?: string;
}

export default function ScrollStory({ className = '' }: ScrollStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCode, setActiveCode] = useState<keyof typeof codeSnippets>('setup');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const { shouldReduceMotion } = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform scroll progress to different stages
  const stage1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const stage2Progress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const stage3Progress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const stage4Progress = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      </div>

      <div className="relative z-10">
        {/* Stage 1: Value Proposition */}
        <motion.section 
          className="min-h-screen flex items-center justify-center"
          style={{
            opacity: shouldReduceMotion ? 1 : useTransform(scrollYProgress, (latest) => getStageOpacity(0, latest))
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Compliance and optimization to{' '}
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  enhance value
                </span>
              </h2>
              <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
                Stop guessing how to stay ahead of regulations. Regtime delivers structured workflows that help you
                streamline compliance, reduce risk, and keep projects moving.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                { icon: Zap, title: 'Real-time Analysis', desc: 'Create finanical projections within minutes' },
                { icon: Code, title: 'Compliance Driven', desc: 'AI-powered insights to ensure accuracy and maintain compliance' },
                { icon: Users, title: 'Development Focused', desc: 'Built for end to end management of the development lifecycle' }
              ].map((feature, index) => (
                <TiltCard key={index} className="p-6 bg-card rounded-lg border">
                  <feature.icon className="h-12 w-12 text-brand-primary mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-white">{feature.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Stage 2: Code & Results */}
        <motion.section 
          className="min-h-screen flex items-center justify-center"
          style={{
            opacity: shouldReduceMotion ? 1 : useTransform(scrollYProgress, (latest) => getStageOpacity(1, latest))
          }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Developer Experience First
              </h2>
              <p className="text-lg text-white">
                Simple APIs, powerful results
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Interactive Demo */}
              <div className="bg-card rounded-lg border overflow-hidden mx-auto max-w-2xl lg:max-w-none lg:col-span-2">
                <div className="bg-muted px-4 py-3 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm text-white">Regtime Dashboard</span>
                </div>
                
         <div className="p-2">
  <div className="bg-muted rounded-lg overflow-hidden flex justify-center">
    <Image
      src="/regtime-screenshot.png"
      width={554}
      height={1446}
      alt="Regtime Dashboard Screenshot"
      // Keep aspect ratio, but don't let it get huge
      className="block w-auto max-w-full h-auto mx-auto
                 max-h-[480px] sm:max-h-[560px] lg:max-h-[640px]"
      sizes="(min-width:1024px) 50vw, 100vw"
      priority
      onError={() => console.error('Image failed to load')}
    />
  </div>
</div>

              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}