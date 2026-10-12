'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container, Reveal } from '@/components/ui';

type FaqCategory = 'Getting started' | 'Deposits' | 'Withdrawals' | 'Fiat payouts' | 'API';

interface FaqItem {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

const FAQ_CATEGORIES: FaqCategory[] = [
  'Getting started',
  'Deposits',
  'Withdrawals',
  'Fiat payouts',
  'API',
];

const FAQS: FaqItem[] = [
  {
    id: 'how-to-get-access',
    category: 'Getting started',
    question: 'How do I get platform access?',
    answer:
      'Your company submits an onboarding request to set up a merchant account and API credentials. Once approved, administrators register a WebAuthn passkey once on the setup page for seamless biometric or device-level sign-in without typing passwords.',
  },
  {
    id: 'supported-currencies-networks',
    category: 'Getting started',
    question: 'Which blockchains and currencies are supported?',
    answer:
      'GlobPayFlow supports 11 blockchains (Ethereum, BNB Smart Chain, Tron, Solana, Bitcoin, Litecoin, Dogecoin, XRP Ledger, Avalanche C-Chain, Polygon, Base) and 13 currencies (USDT, USDC, BTC, ETH, SOL, BNB, XRP, TRX, LTC, DOGE, SHIB, AVAX, POL).',
  },
  {
    id: 'how-fees-work',
    category: 'Getting started',
    question: 'How do fees work?',
    answer:
      'Fees are configured per client and scoped per company or merchant account. We support flexible fee modes including percentage rates, fixed amounts, network fees, and tiered withdrawal structures tailored to your volume.',
  },
  {
    id: 'how-deposits-work',
    category: 'Deposits',
    question: 'How do crypto deposits work?',
    answer:
      'Every order dynamically creates a dedicated deposit address. When the customer transmits crypto, our infrastructure automatically detects on-chain confirmation and updates the transaction status with built-in duplicate-event protection.',
  },
  {
    id: 'why-withdrawal-pending',
    category: 'Withdrawals',
    question: 'Why can a withdrawal show as pending?',
    answer:
      'Outbound withdrawals may enter a pending approval state before broadcast to the network. This allows company administrators and role-based permission tiers to review and authorize disbursements prior to on-chain execution.',
  },
  {
    id: 'approved-addresses',
    category: 'Withdrawals',
    question: 'What are approved addresses?',
    answer:
      'To prevent unauthorized fund movement, crypto withdrawals are restricted strictly to pre-whitelisted and verified wallet addresses configured within your merchant security dashboard.',
  },
  {
    id: 'fiat-payout-countries',
    category: 'Fiat payouts',
    question: 'Which countries are supported for local fiat payouts?',
    answer:
      'Local currency bank payouts are supported directly in Argentina (ARS) and Brazil (BRL). Merchants can deposit stablecoins and disburse local fiat directly to verified domestic bank accounts with full status tracking.',
  },
  {
    id: 'how-api-signing-works',
    category: 'API',
    question: 'How does API request signing work?',
    answer:
      'Every API request is authenticated using HMAC-SHA256 signatures generated from UNIX millisecond timestamp + HTTP method + endpoint path + SHA256 payload hash, evaluated against a strict 5-minute replay-prevention window.',
  },
  {
    id: 'where-to-find-docs',
    category: 'API',
    question: 'Where can I find complete API documentation?',
    answer:
      'Comprehensive REST API specifications, endpoint schemas, code snippets, and postman collections are accessible via our developer portal through the "Open API documentation" link.',
  },
  {
    id: 'what-accepted-means',
    category: 'API',
    question: 'What does an "accepted" response mean?',
    answer:
      'A 200 or 201 HTTP response from our API indicates that your transaction payload has been verified and accepted into the processing queue, rather than immediate final blockchain confirmation.',
  },
];

export function Faq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('Getting started');
  const [openIndex, setOpenIndex] = useState<string | null>('how-to-get-access');

  const filteredFaqs = FAQS.filter((faq) => faq.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-soft border-b border-line">
      <Container size="narrow">
        <Reveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-[13px] font-semibold mb-4 font-sans">
              <HelpCircle className="h-3.5 w-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold font-display tracking-[-0.03em] text-ink leading-[1.1]">
              Questions &amp; Answers
            </h2>
            <p className="mt-3 text-base text-[#475569] max-w-xl mx-auto font-sans leading-[1.6]">
              Verified facts regarding onboarding, multi-chain operations, security approvals, and developer integrations.
            </p>
          </div>
        </Reveal>

        {/* Category Tabs like Pexx */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white border border-line shadow-xs">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    const firstInCat = FAQS.find((f) => f.category === cat);
                    if (firstInCat) setOpenIndex(firstInCat.id);
                  }}
                  className={`relative px-3.5 py-2 text-xs sm:text-sm font-semibold font-sans rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-2xs'
                      : 'text-slate hover:text-ink hover:bg-soft'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accessible Accordion with Animated Height */}
        <div className="mt-10 space-y-3" role="region" aria-label="FAQ Questions">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {filteredFaqs.map((faq) => {
                const isOpen = openIndex === faq.id;
                const buttonId = `faq-btn-${faq.id}`;
                const panelId = `faq-panel-${faq.id}`;

                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-line bg-white shadow-card overflow-hidden transition-all duration-200 hover:border-violet-200"
                  >
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleAccordion(faq.id)}
                        className="flex w-full items-center justify-between p-5 text-left text-base sm:text-[17px] font-bold font-display text-ink hover:text-violet-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 gap-4"
                      >
                        <span>{faq.question}</span>
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full bg-soft border border-line transition-transform duration-300 shrink-0 ${
                            isOpen ? 'rotate-180 bg-violet-50 border-violet-200 text-violet-600' : 'text-muted'
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-line/70 p-5 pt-3 text-sm sm:text-[15px] text-[#475569] leading-[1.6] bg-soft/40 font-sans font-normal">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
