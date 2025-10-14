'use client';

'use client';

import { Clock, Users, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import CapabilityCard from '@/components/ui/CapabilityCard';

const features = [
  {
    name: 'Timely Submission',
    description: 'Accurate planning tools with automated workflows and intelligent categorization.',
    icon: Clock,
    features: ['Automated Unit-Mix Analysis', 'Smart Workflows Tailored to your Development Strategy', 'Real-time Inisghts']
  },
  {
    name: 'Development Management',
    description: 'Coordinate teams effectively with digital tools.',
    icon: Users,
    features: ['Applicant Eligibiltiy Analysis', 'Scheduled Showings', 'Live Unit Tracking']
  },
  {
    name: 'Analytics & Insights',
    description: 'Comprehensive reporting and analytics to optimize performance and project management.',
    icon: BarChart3,
    features: ['Custom reports', 'Performance metrics', 'Trend analysis']
  },
  {
    name: 'Performance Optimization',
    description: 'AI-powered insights to identify bottlenecks and improve efficiency.',
    icon: TrendingUp,
    features: ['Bottleneck detection', 'Efficiency recommendations', 'Project optimization']
  },
  {
    name: 'Enterprise Security',
    description: 'Bank-level security with SOC 2 compliance and data encryption.',
    icon: Shield,
    features: ['SOC 2 compliance', 'Data encryption', 'Access controls']
  },
  {
    name: 'Coordination with City Agencies',
    description: 'Optimized application process with real-time updates and guided workflows.',
    icon: Zap,
    features: ['Real-time updates', 'Generation and Submission of all Required Documents', 'Communication with relevant Agencies']
  },
];

export default function FeaturesSection() {
  return (
    <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
      {features.map((feature, index) => (
        <CapabilityCard
          key={feature.name}
          icon={feature.icon}
          title={feature.name}
          description={feature.description}
          features={feature.features}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}