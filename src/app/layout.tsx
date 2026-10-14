import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://globpayflow.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'GlobPayFlow — Crypto Payments, Built for Business',
  description:
    'Accept crypto deposits across 11 blockchains, disburse to approved addresses, and execute local fiat bank payouts in Argentina and Brazil via dashboard or signed REST API.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GlobPayFlow — Crypto Payments, Built for Business',
    description:
      'Accept crypto deposits across 11 blockchains, disburse to approved addresses, and execute local fiat bank payouts in Argentina and Brazil.',
    url: siteUrl,
    siteName: 'GlobPayFlow',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlobPayFlow — Crypto Payments, Built for Business',
    description:
      'Accept crypto deposits across 11 blockchains, disburse to approved addresses, and execute local fiat bank payouts in Argentina and Brazil.',
  },
  icons: {
    icon: '/globpayflow-favicon-transparent.svg',
    shortcut: '/globpayflow-favicon-transparent.svg',
    apple: '/globpayflow-favicon-transparent.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GlobPayFlow',
  url: siteUrl,
  logo: `${siteUrl}/globpayflow-favicon-transparent.svg`,
  description:
    'Scalable cryptocurrency payment infrastructure for companies and merchants. Supporting 11 blockchains, 13 currencies, and local fiat payouts in Argentina and Brazil.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    url: `${siteUrl}/contact`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white text-ink antialiased selection:bg-violet-100 selection:text-violet-900">
        {children}
      </body>
    </html>
  );
}
