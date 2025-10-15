import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import RouteTransition from '@/components/ux/RouteTransition';
import ToastRoot from '@/components/toast/ToastRoot';

const aspekta = localFont({
  src: [
    { path: '../public/fonts/Aspekta-300.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/Aspekta-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Aspekta-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Aspekta-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-aspekta',
  display: 'swap',
});

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
