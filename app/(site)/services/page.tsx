import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';
import MagneticButton from '@/components/ui/MagneticButton';

const services = [
  {
    name: 'Regtime Builder',
    description: 'Helps property owners create affordable housing using incentive programs, speeding up decisions and lowering costs.',
    image: '/Regtime-Builder-Night-1080px.png',
    features: [
      'Incentive modeling',
      'Workflow templates',
      'Agency coordination',
      'Progress reporting',
    ],
    cta: 'Talk to Sales',
    href: '/contact'
  },
  {
    name: 'Regtime Marketer',
    description: 'Automates the leasing of affordable units through a user-friendly dashboard.',
    image: '/Regtime-Marketer-Night-1080px.png',
    features: [
      'Campaign tracking',
      'ROI analytics',
      'Client billing',
      'Performance metrics',
    ],
    cta: 'Talk to Sales',
    href: '/contact'
  },
  {
    name: 'Regtime Manager',
    description: 'Manages compliance and re-rentals for regulated housing with a workflow-driven platform. Serving over 20,000 users monthly, including tenants and applicants.',
    image: '/Regtime-Manager-Night-1080px.png',
    features: [
      'Advanced time tracking',
      'Project management',
      'Team collaboration',
      'Custom reporting',
    ],
    cta: 'Talk to Sales',
    href: '/contact'
  }
];

const additionalServices = [
  {
    name: 'MWBE Compliance',
    description: 'Ensure full-compliance with all program regulations tailored to your project',
    features: ['Custom solutions', 'Contractor Management', 'Documentation', 'Dedicated support']
  },
  {
    name: 'Consulting Services',
    description: 'Expert guidance on ROI optimization and development design',
    features: ['Program allocation', 'Unit-mix strategy', 'Change management', 'Financial projection']
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <Header />
      <main className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">Integrated Suite of Products</h1>
            <p className="mt-4 text-lg text-white max-w-3xl">
              Regtime™ offers a suite of three core tools, each designed to tackle a specific stage in the affordable housing lifecycle with speed and precision!
            </p>
          </Reveal>

          <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <TiltCard key={s.name} className="p-6 ring-1 ring-[hsl(var(--border))] rounded-2xl bg-[hsl(var(--card))]">
                <div className="flex justify-center mb-6">
                  <span className="inline-flex items-center justify-center rounded-xl bg-white p-3 ring-1 ring-[hsl(var(--border))]">
                    <Image
                      src={s.image}
                      alt={`${s.name} logo`}
                      width={160}
                      height={160}
                      className="h-16 w-auto"
                      priority
                    />
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{s.name}</h3>
                </div>
                <p className="text-sm text-white mt-1">{s.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-[2px] h-4 w-4 text-brand-primary" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href={s.href}
                    className="inline-flex items-center rounded-xl px-4 py-2 ring-1 ring-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]"
                  >
                    {s.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </TiltCard>
            ))}
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Professional Services</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {additionalServices.map((svc) => (
                <div key={svc.name} className="rounded-2xl ring-1 ring-[hsl(var(--border))] p-6 bg-[hsl(var(--card))]">
                  <h3 className="text-lg font-semibold text-foreground">{svc.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{svc.description}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-[2px] h-4 w-4 text-brand-primary" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}