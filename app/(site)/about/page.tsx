'use client';

import Image, { StaticImageData } from 'next/image';
import { Target, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

const values = [
  {
    name: 'Innovation',
    description:
      "We continuously push the boundaries of what's possible in real estate technology.",
    icon: Target,
  },
  {
    name: 'Reliability',
    description:
      'Our platform provides consistent, dependable service that businesses can count on.',
    icon: Award,
  },
  {
    name: 'Global Impact',
    description:
      "We're building solutions that help teams around the world work smarter.",
    icon: Globe,
  },
];

type Person = {
  name: string;
  role: string;
  image: string;
  priority?: boolean;
};

const team: Person[] = [
  { name: 'Yuri Geylik',     role: 'CEO & Founder',              image: '/team/Yuri_Geylik_Headshot copy.png',   priority: true },
  { name: 'Kirill Boyarkin', role: 'CTO',                        image: '/team/Kirill_Boyarkin_Headshot copy.png' },
  { name: 'Omar Hashmi',     role: 'Head of Revenue Operations', image: '/team/Omar_Hashmi_Headshot copy.png'   },
  { name: 'Anna Martynova',  role: 'Director of Incentives',     image: '/team/Anna_Martynova_Headshot copy.png'   },
  { name: 'Max Isakov',      role: 'Director of Product',        image: '/team/Max_Isakov_Headshot copy.png'    },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <Header />
      <main className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              About Regtime
            </h1>
            <p className="mt-4 text-lg text-white max-w-3xl">
              Regtime™ is a platform transforming the world of regulated and affordable housing. As a digital assistant for developers, agencies, and residents, it automates compliance, simplifies leasing, and empowers communities — making regulatory housing management not just easier, but smarter.
            </p>
          </Reveal>

          {/* Leadership */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Leadership</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person) => (
                <TiltCard
                  key={person.name}
                  className="p-6 ring-1 ring-[hsl(var(--border))] bg-[hsl(var(--card))] rounded-2xl"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-muted">
                    <Image
                      src={person.image}
                      alt={`${person.name} headshot`}
                      // Next/Image will size this to the container (object-cover below)
                      fill
                      sizes="(min-width:1024px) 320px, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                      priority={person.priority}
                      // unoptimized here is optional since you set it in next.config already
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                    <p className="text-sm text-white">{person.role}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Our Values</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <div
                  key={v.name}
                  className="rounded-2xl ring-1 ring-[hsl(var(--border))] p-6 bg-[hsl(var(--card))]"
                >
                  <v.icon className="h-6 w-6 text-brand-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{v.name}</h3>
                  <p className="text-sm text-white">{v.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Closing */}
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">
              Transforming the Way Regulated Housing is Managed
            </h2>
            <p className="mt-4 text-lg text-white">
              We believe better housing systems create better communities. From initial leasing to ongoing tenant compliance, Regtime™ cuts through bureaucracy. Say goodbye to PDF juggling, spreadsheet chaos, and redundant data entry. Our automated workflows deliver faster turnarounds and fewer headaches — so your team can focus on what matters most.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
