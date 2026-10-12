import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui';

const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ||
  'https://gpf-app.erstech-localserver.xyz/api/user-api-docs#/overview';

// Only render social links if explicitly defined in environment variables
const TWITTER_URL = process.env.NEXT_PUBLIC_TWITTER_URL;
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL;
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL;

const SOCIAL_LINKS = [
  TWITTER_URL && { label: 'X (Twitter)', href: TWITTER_URL },
  GITHUB_URL && { label: 'GitHub', href: GITHUB_URL },
  LINKEDIN_URL && { label: 'LinkedIn', href: LINKEDIN_URL },
].filter(Boolean) as { label: string; href: string }[];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'How it works', href: '#how-it-works', isInternal: false },
        { label: 'Flows', href: '#flows', isInternal: false },
        { label: 'Dashboard', href: '#dashboard', isInternal: false },
        { label: 'Networks', href: '#networks', isInternal: false },
        { label: 'Security', href: '#security', isInternal: false },
      ],
    },
    {
      title: 'Developers',
      links: [
        { label: 'API Documentation', href: DOCS_URL, isInternal: false, isExternal: true },
        { label: 'REST Endpoints', href: '#developers', isInternal: false },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Request Access', href: '/contact', isInternal: true },
        { label: 'Contact', href: '/contact', isInternal: true },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy', isInternal: true },
        { label: 'Terms of Service', href: '/terms', isInternal: true },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] text-slate-400 pt-16 pb-12">
      <Container>
        {/* Main Grid: Brand + 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info (White Variant Logo) */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 py-1"
            >
              <Image
                src="/globpayflow-favicon-transparent.svg"
                alt="GlobPayFlow"
                width={32}
                height={32}
                className="h-8 w-8 object-contain shrink-0"
              />
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Glob<span className="text-violet-400">PayFlow</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Crypto payments, built for business. Scalable multi-chain payment infrastructure for companies and merchants.
            </p>

            {/* Render socials ONLY if configured in env */}
            {SOCIAL_LINKS.length > 0 && (
              <div className="pt-2 flex items-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 4 Defined Columns: Product, Developers, Company, Legal */}
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {col.title}
              </p>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isInternal ? (
                      <Link
                        href={link.href}
                        className="text-slate-400 hover:text-violet-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 rounded"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target={link.isExternal ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        className="text-slate-400 hover:text-violet-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-500 rounded"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row: Copyright + Mandatory Risk Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <p>© {currentYear} GlobPayFlow. All rights reserved.</p>
          <p className="max-w-2xl leading-relaxed text-slate-400 font-sans">
            Crypto assets involve risk. GlobPayFlow provides payment infrastructure and does not provide investment advice.
          </p>
        </div>
      </Container>
    </footer>
  );
}
