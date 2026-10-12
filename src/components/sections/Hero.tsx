'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { CheckCircle2, ArrowRight, ExternalLink, ArrowDownLeft, Clock } from 'lucide-react';
import { Container, Button, Badge, SmartImage, BrowserFrame, FloatingCard } from '@/components/ui';

const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ||
  'https://gpf-app.erstech-localserver.xyz/api/user-api-docs#/overview';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 bg-hero">
      {/* Two soft ambient violet blobs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-violet-400/15 blur-[120px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px] -z-10"
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (6): Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge dot>Crypto payments for business</Badge>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold font-display tracking-[-0.035em] text-ink leading-[1.05]"
            >
              Crypto payments,{' '}
              <span className="text-gradient">built for business.</span>
            </motion.h1>

            {/* Subtitle (max 30 words) */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-[19px] text-[#475569] leading-[1.6] max-w-xl font-sans font-normal"
            >
              Accept crypto deposits, withdraw to wallets or local banks, and track everything from one merchant dashboard or API.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Button variant="primary" size="lg" href="/contact">
                <span>Request access</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button variant="secondary" size="lg" href={DOCS_URL} external>
                <span>Read the API docs</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>

            {/* 3 Small Checks */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-6 border-t border-line flex flex-wrap items-center gap-y-3 gap-x-6 text-sm font-medium text-slate font-sans"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600 shrink-0" aria-hidden="true" />
                <span>11 blockchains</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600 shrink-0" aria-hidden="true" />
                <span>13 currencies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-violet-600 shrink-0" aria-hidden="true" />
                <span>Argentina and Brazil payouts</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column (6): Visual Composition */}
          <div className="lg:col-span-6 mt-6 lg:mt-0 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Photo: Large rounded-3xl photo */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative rounded-3xl overflow-hidden border border-line bg-white shadow-xl shadow-slate-900/5 aspect-4/3 w-full"
              >
                <SmartImage
                  src="/images/hero-business.webp"
                  alt="Business operations and treasury collaboration"
                  width={720}
                  height={540}
                  priority
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Overlapping BrowserFrame (Bottom-Left) */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-6 w-[78%] max-w-[340px] sm:max-w-[390px] z-20 -rotate-2"
              >
                <BrowserFrame
                  url="app.globpayflow"
                  src="/images/shot-wallet.png"
                  alt="Merchant wallet balance and deposit interface"
                  width={480}
                  height={270}
                  className="shadow-2xl border border-line"
                />
              </motion.div>

              {/* FloatingCard 1: Top-Right (Deposit received +250 USDT Tron) */}
              <motion.div
                animate={shouldReduceMotion ? false : { y: [-4, 5, -4] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-2 sm:-top-6 sm:-right-6 z-30 max-w-[240px] sm:max-w-[270px] w-full"
              >
                <FloatingCard
                  icon={<ArrowDownLeft className="h-4 w-4 text-emerald-600" />}
                  title="Deposit received"
                  value="+250 USDT (Tron)"
                  statusPill="Completed"
                  statusVariant="emerald"
                />
              </motion.div>

              {/* FloatingCard 2: Bottom-Right (Withdrawal pending approval) */}
              <motion.div
                animate={shouldReduceMotion ? false : { y: [4, -5, 4] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8,
                }}
                className="absolute -bottom-6 -right-2 sm:-bottom-8 sm:-right-4 z-30 max-w-[240px] sm:max-w-[270px] w-full"
              >
                <FloatingCard
                  icon={<Clock className="h-4 w-4 text-amber-600" />}
                  title="Withdrawal"
                  value="Pending approval"
                  statusPill="Pending"
                  statusVariant="amber"
                />
              </motion.div>
            </div>

            {/* Tiny Sample data notice */}
            <div className="mt-10 sm:mt-12 text-right pr-2">
              <span className="text-xs font-semibold text-muted font-sans">
                Sample data
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
