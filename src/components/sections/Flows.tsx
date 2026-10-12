import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Landmark, Check, ArrowRight } from 'lucide-react';
import { Container, SectionHeading, BrowserFrame, SmartImage, Reveal } from '@/components/ui';

const FLOW_CARDS = [
  {
    id: 'deposits',
    title: 'Deposits',
    description:
      'Generate unique deposit addresses across 11 blockchains and receive automatic settlement notifications.',
    icon: ArrowDownLeft,
    imageType: 'browser' as const,
    imageSrc: '/images/shot-deposit.png',
    imageAlt: 'Deposit Invoice Interface',
    frameUrl: 'app.globpayflow/deposits',
    bullets: [
      'Unique address per order',
      'Automatic status updates',
      'Duplicate-event protection',
    ],
    href: '#dashboard',
  },
  {
    id: 'withdrawals',
    title: 'Withdrawals',
    description:
      'Send outbound crypto transfers strictly directed to authorized recipient addresses with approval flow.',
    icon: ArrowUpRight,
    imageType: 'browser' as const,
    imageSrc: '/images/shot-withdraw.png',
    imageAlt: 'Withdrawal Approval Form',
    frameUrl: 'app.globpayflow/withdrawals',
    bullets: [
      'Approved addresses only',
      'Pending approval flow',
      'Optional callback URL',
    ],
    href: '#dashboard',
  },
  {
    id: 'fiat',
    title: 'Crypto to Fiat',
    description:
      'Execute direct bank disbursements in local currencies across regional rails with verified details.',
    icon: Landmark,
    imageType: 'fiat' as const,
    imageSrc: '/images/fiat-argentina.webp',
    imageAlt: 'Bank Payouts in Argentina and Brazil',
    frameUrl: 'app.globpayflow/fiat',
    bullets: [
      'Bank payouts in Argentina and Brazil',
      'Beneficiary details',
      'Status tracking',
    ],
    href: '#fiat-payouts',
  },
] as const;

const SLIM_CHIPS = [
  'Refunds',
  'Balances and history',
  'Whitelist addresses',
] as const;

export function Flows() {
  return (
    <section id="flows" className="py-20 sm:py-28 bg-soft border-b border-line">
      <Container>
        <SectionHeading
          eyebrow="Pick your flow"
          title="Everything a merchant needs to move money."
          description="End-to-end payment workflows designed for deposits, withdrawals, and bank payouts."
        />

        {/* 3 Large Image Cards (grid md:grid-cols-3) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {FLOW_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.id} delay={idx * 0.15} className="h-full">
                <div className="rounded-3xl bg-white border border-line shadow-xs hover:-translate-y-1 hover:shadow-card hover:border-violet-300 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden group">
                  {/* Top 60% Image Area */}
                  {card.imageType === 'browser' ? (
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-br from-violet-200/50 via-violet-100/30 to-indigo-100/40 p-4 sm:p-5 flex items-end justify-center">
                      <div className="w-full max-w-[92%] shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                        <BrowserFrame
                          url={card.frameUrl}
                          src={card.imageSrc}
                          alt={card.imageAlt}
                          width={480}
                          height={270}
                          className="border border-line/80 shadow-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden flex items-end p-5">
                      {/* Background photo */}
                      <SmartImage
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent z-10"
                        aria-hidden="true"
                      />
                      {/* Overlay card inside image */}
                      <div className="relative z-20 w-full rounded-2xl bg-white/95 backdrop-blur-md p-3.5 border border-white/40 shadow-xl">
                        <div className="flex items-center justify-between text-xs font-sans">
                          <span className="font-bold font-display text-ink">ARS &amp; BRL Payouts</span>
                          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 font-sans">
                            Bank Rails
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate font-sans">
                          <span>Beneficiary Verification</span>
                          <span className="font-sans font-semibold text-ink">Confirmed</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Content Area */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      {/* Header with Icon + Title */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700 border border-violet-100/80 shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="text-[22px] font-bold font-display text-ink group-hover:text-violet-700 transition-colors">
                          {card.title}
                        </h3>
                      </div>

                      {/* 2-line description */}
                      <p className="mt-3 text-sm text-[#475569] leading-relaxed min-h-[40px] font-sans">
                        {card.description}
                      </p>

                      {/* 3 Check bullets */}
                      <ul className="mt-5 space-y-2.5">
                        {card.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-sans"
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                              <Check className="h-2.5 w-2.5 stroke-[3]" />
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learn more link */}
                    <div className="mt-6 pt-4 border-t border-line">
                      <a
                        href={card.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold font-display text-violet-700 hover:text-violet-900 group-hover:translate-x-1 transition-all"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Slim row of 3 chips below the cards */}
        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs font-sans">
          <span className="text-muted font-sans text-xs">Also included:</span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {SLIM_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white border border-line px-4 py-1.5 text-slate font-sans text-xs font-medium shadow-2xs hover:border-violet-300 hover:text-ink transition-colors select-none"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
