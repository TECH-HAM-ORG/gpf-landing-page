'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { Container, SectionHeading, BrowserFrame, SmartImage, Reveal } from '@/components/ui';

interface DashboardTab {
  id: string;
  title: string;
  line: string;
  slug: string;
  image: string;
  icon: LucideIcon;
}

const DASHBOARD_TABS: DashboardTab[] = [
  {
    id: 'wallet',
    title: 'Wallet',
    line: 'Balances for every supported currency',
    slug: 'wallet',
    image: '/images/shot-wallet.png',
    icon: Wallet,
  },
  {
    id: 'deposit',
    title: 'Deposit',
    line: 'Create deposit addresses per order',
    slug: 'deposit',
    image: '/images/shot-deposit.png',
    icon: ArrowDownLeft,
  },
  {
    id: 'withdraw',
    title: 'Withdraw',
    line: 'Send to approved addresses with clear fee and net amount',
    slug: 'withdraw',
    image: '/images/shot-withdraw.png',
    icon: ArrowUpRight,
  },
  {
    id: 'transactions',
    title: 'Transactions',
    line: 'Search and filter all activity',
    slug: 'transactions',
    image: '/images/shot-transactions.png',
    icon: ReceiptText,
  },
  {
    id: 'whitelist',
    title: 'Whitelist Addresses',
    line: 'Control exactly where funds can go',
    slug: 'whitelist-addresses',
    image: '/images/shot-whitelist.png',
    icon: ShieldCheck,
  },
];

export function DashboardShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const desktopTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-rotate every 6 seconds, pause on hover
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DASHBOARD_TABS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isHovered, activeIndex]);

  // Keyboard accessibility for tablist
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % DASHBOARD_TABS.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + DASHBOARD_TABS.length) % DASHBOARD_TABS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = DASHBOARD_TABS.length - 1;
    }

    if (nextIndex !== null) {
      setActiveIndex(nextIndex);
      desktopTabRefs.current[nextIndex]?.focus();
    }
  };

  const currentTab = DASHBOARD_TABS[activeIndex];

  return (
    <section id="dashboard" className="py-20 sm:py-28 bg-white border-b border-line">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Merchant dashboard"
            title="Your wallet, deposits and withdrawals in one place."
            description="Manage your business payment workflows from an intuitive console built for operations."
          />
        </Reveal>

        <div
          className="mt-12 sm:mt-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Mobile Horizontal Scroll Chips (Above the image) */}
          <div className="lg:hidden mb-6">
            <div
              role="tablist"
              aria-label="Merchant dashboard tabs"
              className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x"
            >
              {DASHBOARD_TABS.map((tab, idx) => {
                const isActive = idx === activeIndex;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`mobile-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all snap-start ${
                      isActive
                        ? 'text-white'
                        : 'text-slate bg-soft hover:bg-violet-50 hover:text-ink border border-line'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="dashboardMobileChip"
                        className="absolute inset-0 rounded-full bg-violet-600 shadow-card"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <Icon
                      className={`relative z-10 h-4 w-4 ${
                        isActive ? 'text-white' : 'text-violet-600'
                      }`}
                    />
                    <span className="relative z-10">{tab.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main 12-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left (4 cols): Vertical Tab List */}
            <div
              role="tablist"
              aria-label="Merchant dashboard navigation"
              aria-orientation="vertical"
              className="hidden lg:flex lg:col-span-4 flex-col gap-2.5"
            >
              {DASHBOARD_TABS.map((tab, idx) => {
                const isActive = idx === activeIndex;
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      desktopTabRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="group relative flex items-start gap-4 p-4 rounded-2xl text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer"
                  >
                    {/* Animated active indicator with layoutId */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDashboardTab"
                        className="absolute inset-0 rounded-2xl bg-violet-50 border-l-4 border-violet-600 shadow-2xs"
                        transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      />
                    )}

                    {/* Icon container */}
                    <div
                      className={`relative z-10 shrink-0 p-2.5 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'bg-soft text-slate border border-line group-hover:bg-violet-100/70 group-hover:text-violet-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Title and one line text */}
                    <div className="relative z-10 min-w-0 flex-1">
                      <h3
                        className={`text-sm sm:text-base font-semibold transition-colors ${
                          isActive ? 'text-ink' : 'text-ink-2 group-hover:text-ink'
                        }`}
                      >
                        {tab.title}
                      </h3>
                      <p
                        className={`mt-1 text-xs sm:text-sm leading-relaxed transition-colors ${
                          isActive ? 'text-slate font-normal' : 'text-muted group-hover:text-slate'
                        }`}
                      >
                        {tab.line}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right (8 cols): Large BrowserFrame with AnimatePresence crossfade */}
            <div
              role="tabpanel"
              id={`panel-${currentTab.id}`}
              aria-labelledby={`tab-${currentTab.id}`}
              className="lg:col-span-8 w-full"
            >
              <BrowserFrame
                url={`app.globpayflow/${currentTab.slug}`}
                className="w-full shadow-card border-line/80 overflow-hidden"
                toolbarRight={
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isHovered ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
                      }`}
                    />
                    <span>{isHovered ? 'Paused' : 'Auto-rotating'}</span>
                  </div>
                }
              >
                <div className="relative aspect-[1376/768] overflow-hidden bg-slate-100">
                  <AnimatePresence>
                    <motion.div
                      key={currentTab.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <SmartImage
                        src={currentTab.image}
                        alt={`${currentTab.title} dashboard interface`}
                        width={1376}
                        height={768}
                        priority
                        className="w-full h-full object-cover object-top block select-none"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </BrowserFrame>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
