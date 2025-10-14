'use client';

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HubSpotForm from '@/components/HubSpotForm';

const contactInfo = [
  { name: 'Email',    value: 'info@regtime.com',               icon: Mail,  href: 'mailto:info@regtime.com' },
  { name: 'Phone',    value: '(646) 386-0654',                  icon: Phone, href: 'tel:+16463860654' },
  { name: 'Location', value: '109 E 9th St, New York, NY 10003',icon: MapPin,href: 'https://maps.google.com/?q=109+E+9th+St,+New+York,+NY+10003' },
  { name: 'Hours',    value: 'Mon–Fri 9:00–6:00 ET',            icon: Clock }
];

export default function ContactPage() {
  // Prefer envs; override with known-good IDs if envs are empty.
  const portalId = (process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '').trim() || '48321391';
  const formId   = (process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID   || '').trim() || '27b23585-a05a-4eb3-8cdc-e2eb354f5044';
  const region   = (process.env.NEXT_PUBLIC_HUBSPOT_REGION    || 'na1').trim();

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="relative isolate">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact us</h1>
                  <p className="mt-2 text-base leading-7 text-white">We&apos;ll get back to you shortly.</p>
                  <dl className="mt-10 space-y-6 text-base leading-7 text-foreground">
                    {contactInfo.map((item) => (
                      <div key={item.name} className="flex gap-x-4">
                        <item.icon className="h-7 w-6 mt-1 text-primary" aria-hidden="true" />
                        <div>
                          <dt className="font-semibold">{item.name}</dt>
                          <dd>
                            {item.href ? (
                              <a href={item.href} className="text-white hover:text-foreground underline underline-offset-4">{item.value}</a>
                            ) : (
                              <span className="text-white">{item.value}</span>
                            )}
                          </dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Right column: single HubSpot form */}
              <div className="lg:pt-4">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-foreground">Send us a message</h3>
                  <p className="mt-1 text-sm text-white">Fill out the form and our team will reach out.</p>
                  <div className="mt-6">
                    <HubSpotForm className="w-full" />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-foreground">Our office</h3>
                  <p className="mt-1 text-sm text-white">Stop by or schedule a meeting — we'd love to meet you.</p>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border p-4">
                      <div className="text-sm font-medium text-foreground">Address</div>
                      <div className="text-sm text-white">109 E 9th St<br />New York, NY 10003</div>
                    </div>
                    <div className="rounded-lg border border-border p-4">
                      <div className="text-sm font-medium text-foreground">Hours</div>
                      <div className="text-sm text-white">Mon–Fri 9:00–6:00 ET</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}