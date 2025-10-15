import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import RouteTransition from '@/components/ux/RouteTransition';
import ToastRoot from '@/components/toast/ToastRoot';

// Use Inter font from Google Fonts as a replacement for the missing Aspekta font files
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-aspekta',
  display: 'swap',
});

// Keep the aspekta variable name for compatibility with existing CSS
const aspekta = inter;

export const metadata: Metadata = {
  title: 'Regtime',
  description: 'Transforming affordable housing management with intelligent automation and compliance tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${aspekta.variable} bg-background text-foreground antialiased`}>
        <SmoothScrollProvider>
          <RouteTransition>
            <ToastRoot>{children}</ToastRoot>
          </RouteTransition>
        </SmoothScrollProvider>

        {/* HubSpot tracking (optional) */}
        {(process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '48321391') && (
          <script
            id="hubspot-tracking"
            defer
            src={`https://js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || '48321391'}.js`}
          />
        )}

        {/* GA4 */}
        {(process.env.NEXT_PUBLIC_GA_ID || 'G-51FVQWME6G') && (
          <>
            <Script
              id="ga4"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-51FVQWME6G'}`}
            />
            <Script id="ga4-inline" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-51FVQWME6G'}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
