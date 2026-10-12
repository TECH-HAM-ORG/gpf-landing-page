'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container, SectionHeading, Reveal } from '@/components/ui';

const STEPS = [
  {
    step: 1,
    title: 'Get access',
    description:
      'Your company sets up your merchant account and API keys, and you register your passkey once to sign in securely.',
    snippet: {
      header: 'Merchant Setup',
      badge: 'Ready',
      badgeColor: 'emerald',
      row1Label: 'API Credentials',
      row1Val: 'gpf_live_••••••',
      row2Label: 'Passkey Biometric',
      row2Val: 'Registered',
    },
  },
  {
    step: 2,
    title: 'Accept crypto',
    description:
      'Create a deposit, share the address, get notified when it lands.',
    snippet: {
      header: 'Deposit Order',
      badge: '11 Chains',
      badgeColor: 'violet',
      row1Label: 'Deposit Address',
      row1Val: '0x71C...924e',
      row2Label: 'Network Payment',
      row2Val: '+500 USDT Detected',
    },
  },
  {
    step: 3,
    title: 'Withdraw or pay out',
    description:
      'Send to approved wallets or cash out to a bank in Argentina or Brazil.',
    snippet: {
      header: 'Disbursement',
      badge: 'Approved',
      badgeColor: 'emerald',
      row1Label: 'Whitelisted Target',
      row1Val: 'Corporate Hot Wallet',
      row2Label: 'Bank Settlement',
      row2Val: 'ARS & BRL Rails',
    },
  },
] as const;

export function Steps() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-line">
      <Container>
        <SectionHeading
          eyebrow="Easy start"
          title="Three easy steps, one simple flow."
          description="Everything you need to onboard, accept digital assets, and settle locally through the dashboard or signed REST API."
        />

        <div className="mt-16 sm:mt-20 relative">
          {/* Dashed connector line between circles on desktop that draws on scroll */}
          <div
            className="hidden md:block absolute top-7 left-[18%] right-[18%] h-2 z-0 pointer-events-none"
            aria-hidden="true"
          >
            <svg
              className="w-full h-4 overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 4"
            >
              <defs>
                <linearGradient id="stepConnectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
              <motion.line
                x1="0"
                y1="2"
                x2="100"
                y2="2"
                stroke="url(#stepConnectorGrad)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={shouldReduceMotion ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.8 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </svg>
          </div>

          {/* 3 cards in a row (stack on mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((item, idx) => (
              <Reveal key={item.step} delay={idx * 0.15} className="h-full">
                <div className="rounded-3xl border border-line bg-soft p-6 sm:p-7 flex flex-col justify-between h-full hover:border-violet-300 hover:shadow-card transition-all duration-300 group">
                  <div>
                    {/* Large numbered circle with violet-to-indigo gradient ring */}
                    <div className="flex items-center justify-between">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full p-[2px] bg-brand-gradient shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-lg font-bold font-mono text-ink">
                          {item.step}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted font-semibold">
                        Step 0{item.step}
                      </span>
                    </div>

                    {/* Title & 2-line text */}
                    <h3 className="mt-6 text-xl font-bold text-ink group-hover:text-violet-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate leading-relaxed min-h-[48px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Small visual snippet at the bottom built with divs */}
                  <div className="mt-6 pt-5 border-t border-line/80">
                    <div className="rounded-2xl border border-line bg-white p-3.5 space-y-2 text-xs font-mono shadow-2xs">
                      <div className="flex items-center justify-between text-muted text-[11px]">
                        <span>{item.snippet.header}</span>
                        {item.snippet.badgeColor === 'emerald' ? (
                          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-semibold px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {item.snippet.badge}
                          </span>
                        ) : (
                          <span className="text-violet-700 bg-violet-50 border border-violet-200/60 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                            {item.snippet.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between bg-soft rounded-xl px-2.5 py-1.5 border border-line/60">
                        <span className="text-slate text-[10px]">{item.snippet.row1Label}</span>
                        <span className="text-ink font-semibold text-[10px] truncate max-w-[130px]">
                          {item.snippet.row1Val}
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-violet-50/60 rounded-xl px-2.5 py-1.5 border border-violet-100">
                        <span className="font-sans font-medium text-slate text-[10px]">
                          {item.snippet.row2Label}
                        </span>
                        <span className="font-bold text-violet-700 text-[10px]">
                          {item.snippet.row2Val}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
