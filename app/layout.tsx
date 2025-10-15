import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import RouteTransition from '@/components/ux/RouteTransition';
import { ToastProvider } from '@/components/toast/ToastProvider';

export const metadata: Metadata = {
  title: 'Regtime - Professional Time Management Solutions',
  description: 'Transform your business with Regtime\'s comprehensive time management platform. Streamline operations, boost productivity, and drive growth.',
  keywords: 'time management, business productivity, project management, team collaboration',
  authors: [{ name: 'Regtime' }],
  creator: 'Regtime',
  publisher: 'Regtime',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://regtime.com'),
  openGraph: {
    title: 'Regtime - Professional Time Management Solutions',
    description: 'Transform your business with Regtime\'s comprehensive time management platform',
    url: 'https://regtime.com',
    siteName: 'Regtime',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regtime - Professional Time Management Solutions',
    description: 'Transform your business with Regtime\'s comprehensive time management platform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-background text-foreground antialiased font-sans">
        <SmoothScrollProvider>
          <RouteTransition>
            <ToastProvider>{children}</ToastProvider>
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
