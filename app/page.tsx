import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollStory from '@/components/sections/ScrollStory';
import BrandHero from '@/components/brand/BrandHero';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';
import StatCounter from '@/components/ui/StatCounter';
import MarketGrid from '@/components/market/MarketGrid';

import FeaturesSection from '@/components/sections/FeaturesSection';

const products = [
  {
    name: 'Regtime Manager',
    image: '/Regtime-Manager-Blue-1080px.png',
    description: 'Comprehensive time management for teams and projects',
    features: ['Advanced time tracking', 'Project management', 'Team collaboration', 'Custom reporting'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Regtime Marketer',
    image: '/regtime-marketer-cadet-1080px.png',
    description: 'Specialized tools for marketing teams and campaigns',
    features: ['Campaign tracking', 'ROI analytics', 'Client billing', 'Performance metrics'],
    color: 'from-teal-500 to-teal-600'
  },
  {
    name: 'Regtime Builder',
    image: '/regtime-builder-maize-1080px.png',
    description: 'Purpose-built for construction and project-based work',
    features: ['Job site tracking', 'Equipment monitoring', 'Labor cost analysis', 'Progress reporting'],
    color: 'from-yellow-500 to-yellow-600'
  }
];

export default function Home() {
  return (
    <div className="bg-background">
      <Header />
      
      {/* Brand Hero Section */}
      <BrandHero />

      {/* Products Showcase - Highlighting the three main products */}
      <div className="py-24 sm:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl lg:text-center mb-16">
              <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Full Lifecycle of Affordable Housing Management
              </p>
              <p className="mt-6 text-lg leading-8 text-white">
                Our systems support creation of affordable units via state-sponsored incentives and provide ongoing leasing and compliance throughout the lifecycle of your project.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Foundation — Regtime Builder (WHITE logo) */}
            <Reveal delayStep={0.1}>
              <TiltCard className="relative overflow-hidden bg-[hsl(var(--card))] ring-1 ring-[hsl(var(--border))] rounded-2xl border hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-600 opacity-10" />
                <div className="relative p-8">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-[hsl(var(--border))]">
                      <Image
                        src="/Regtime-Builder-Night-1080px.png"
                        alt="Regtime Builder logo"
                        width={160}
                        height={160}
                        className="h-16 w-auto"
                        priority
                      />
                    </span>
                  </div>
                  <div className="text-center mb-6">
                    <div className="h-20 flex flex-col justify-center">
                      <div className="text-xl font-bold text-brand-primary">Model incentives, decide faster.</div>
                    </div>
                    <p className="mt-2 text-white">Plan affordable projects with incentive modeling, 
                      subcontractor coordination, and progress reporting.</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Growth — Regtime Marketer (NIGHT logo) */}
            <Reveal delayStep={0.2}>
              <TiltCard className="relative overflow-hidden bg-[hsl(var(--card))] ring-1 ring-[hsl(var(--border))] rounded-2xl border hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-600 opacity-10" />
                <div className="relative p-8">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-[hsl(var(--border))]">
                      <Image
                        src="/Regtime-Marketer-Night-1080px.png"
                        alt="Regtime Marketer logo"
                        width={160}
                        height={160}
                        className="h-16 w-auto"
                      />
                    </span>
                  </div>
                  <div className="text-center mb-6">
                    <div className="h-20 flex flex-col justify-center">
                      <div className="text-xl font-bold text-brand-primary">Lease faster with automated campaigns.
                      </div>
                    </div>
                    <p className="mt-2 text-white">Automate housing connect marketing, application intake, and selection workflows in full compliance with HPD and HDC requirements.</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>

            {/* Success — Regtime Manager (NIGHT logo) */}
            <Reveal delayStep={0.3}>
              <TiltCard className="relative overflow-hidden bg-[hsl(var(--card))] ring-1 ring-[hsl(var(--border))] rounded-2xl border hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-blue-600 opacity-10" />
                <div className="relative p-8">
                  <div className="flex justify-center mb-6">
                    <span className="inline-flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-[hsl(var(--border))]">
                      <Image
                        src="/Regtime-Manager-Night-1080px.png"
                        alt="Regtime Manager logo"
                        width={160}
                        height={160}
                        className="h-16 w-auto"
                      />
                    </span>
                  </div>
                  <div className="text-center mb-6">
                    <div className="h-20 flex flex-col justify-center">
                      <div className="text-xl font-bold text-brand-primary">Stay compliant while minimizing 
                        vacancies.</div>
                    </div>
                    <p className="mt-2 text-white">A workflow-driven compliance platform with regulatory
                      tracking, project management, and custom reporting.</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Application Preview — ScrollStory (restored) */}
      <ScrollStory className="mx-auto max-w-7xl px-6 lg:px-8" />

      {/* Everything you need (features) */}
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-7xl">
        <FeaturesSection />
      </div>

      {/* Final CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-8">
            Ready to{' '}
            <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              transform
            </span>{' '}
            your development?
          </h2>
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto">
            Join the teams already using Regtime to manage their project from pre-construction through   
            the entire lease-up process and ongoing complaince.
          </p>

          {/* KPI Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'Affordable Housing Floor Area Created', value: 112500, suffix: '+' },
              { label: 'Affordable Units Managed', value: 2000, suffix: '+' },
              { label: 'Avgerage Timeline for Submission', value: 6, suffix: ' weeks' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  <StatCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <p className="text-white">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              href="/contact"
              className="bg-brand-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-primary/90 transition-colors"
            >
              Contact Us
            </MagneticButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}