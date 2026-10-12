'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { Container, SmartImage, Reveal } from '@/components/ui';

type AssetCategory = 'All' | 'Stablecoins' | 'Majors' | 'Altcoins';
type AssetType = 'Native' | 'Token';

interface AssetDetail {
  symbol: string;
  name: string;
  category: 'Stablecoins' | 'Majors' | 'Altcoins';
  type: AssetType;
  networks: string[];
  logo: string;
}

const ALL_CHAINS = [
  'All Chains',
  'Ethereum',
  'BNB Smart Chain',
  'Tron',
  'Solana',
  'Bitcoin',
  'Litecoin',
  'Dogecoin',
  'XRP Ledger',
  'Avalanche C-Chain',
  'Polygon',
  'Base',
] as const;

const CHAIN_LOGOS: Record<string, string> = {
  Ethereum: '/images/coins/ethereum.svg',
  'BNB Smart Chain': '/images/coins/bnb.svg',
  Tron: '/images/coins/tron.svg',
  Solana: '/images/coins/solana.svg',
  Bitcoin: '/images/coins/bitcoin.svg',
  Litecoin: '/images/coins/litecoin.svg',
  Dogecoin: '/images/coins/dogecoin.svg',
  'XRP Ledger': '/images/coins/xrp.svg',
  'Avalanche C-Chain': '/images/coins/avalanche.svg',
  Polygon: '/images/coins/polygon.svg',
  Base: '/images/coins/base.svg',
};

const ASSETS_LIST: AssetDetail[] = [
  {
    symbol: 'USDT',
    name: 'Tether',
    category: 'Stablecoins',
    type: 'Token',
    networks: ['Tron', 'Ethereum', 'BNB Smart Chain', 'Solana', 'Base'],
    logo: '/images/coins/usdt.svg',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    category: 'Stablecoins',
    type: 'Token',
    networks: ['Ethereum', 'BNB Smart Chain', 'Base'],
    logo: '/images/coins/usdc.svg',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    category: 'Majors',
    type: 'Native',
    networks: ['Bitcoin'],
    logo: '/images/coins/bitcoin.svg',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    category: 'Majors',
    type: 'Native',
    networks: ['Ethereum', 'Base'],
    logo: '/images/coins/ethereum.svg',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    category: 'Majors',
    type: 'Native',
    networks: ['Solana'],
    logo: '/images/coins/solana.svg',
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    category: 'Majors',
    type: 'Native',
    networks: ['BNB Smart Chain'],
    logo: '/images/coins/bnb.svg',
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    category: 'Majors',
    type: 'Native',
    networks: ['XRP Ledger'],
    logo: '/images/coins/xrp.svg',
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    category: 'Altcoins',
    type: 'Native',
    networks: ['Tron'],
    logo: '/images/coins/tron.svg',
  },
  {
    symbol: 'LTC',
    name: 'Litecoin',
    category: 'Altcoins',
    type: 'Native',
    networks: ['Litecoin'],
    logo: '/images/coins/litecoin.svg',
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    category: 'Altcoins',
    type: 'Native',
    networks: ['Dogecoin'],
    logo: '/images/coins/dogecoin.svg',
  },
  {
    symbol: 'SHIB',
    name: 'Shiba Inu',
    category: 'Altcoins',
    type: 'Token',
    networks: ['Ethereum'],
    logo: '/images/coins/shib.svg',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    category: 'Majors',
    type: 'Native',
    networks: ['Avalanche C-Chain'],
    logo: '/images/coins/avalanche.svg',
  },
  {
    symbol: 'POL',
    name: 'Polygon',
    category: 'Altcoins',
    type: 'Native',
    networks: ['Polygon'],
    logo: '/images/coins/polygon.svg',
  },
];

const CATEGORIES: AssetCategory[] = ['All', 'Stablecoins', 'Majors', 'Altcoins'];

function getChainLogo(network: string): string {
  return CHAIN_LOGOS[network] || '';
}

function formatNetworkChipName(network: string): string {
  if (network === 'BNB Smart Chain') return 'BNB';
  if (network === 'Avalanche C-Chain') return 'Avalanche';
  if (network === 'XRP Ledger') return 'XRP';
  return network;
}

function matchesChain(asset: AssetDetail, chain: string): boolean {
  if (chain === 'All Chains' || chain === 'All') return true;
  const cClean = chain
    .toLowerCase()
    .replace(' smart chain', '')
    .replace(' c-chain', '')
    .replace(' ledger', '');
  return asset.networks.some((n) => {
    const nClean = n
      .toLowerCase()
      .replace(' smart chain', '')
      .replace(' c-chain', '')
      .replace(' ledger', '');
    return nClean.includes(cClean) || cClean.includes(nClean);
  });
}

export function NetworksExplorer() {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('All');
  const [selectedChain, setSelectedChain] = useState<string>('All Chains');
  const shouldReduceMotion = useReducedMotion();

  const filteredAssets = useMemo(() => {
    return ASSETS_LIST.filter((asset) => {
      const matchesCategory =
        activeCategory === 'All' || asset.category === activeCategory;
      const chainMatch = matchesChain(asset, selectedChain);
      return matchesCategory && chainMatch;
    });
  }, [activeCategory, selectedChain]);

  const getChainCount = (chain: string) => {
    if (chain === 'All Chains' || chain === 'All') {
      return ASSETS_LIST.length;
    }
    return ASSETS_LIST.filter((asset) => matchesChain(asset, chain)).length;
  };

  return (
    <section id="networks" className="py-20 sm:py-28 bg-soft border-b border-line">
      <Container>
        {/* Section heading with Reveal executed once */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink font-display">
              11 blockchains. 13 currencies.
            </h2>
          </div>
        </Reveal>

        {/* Filter Navigation Bar */}
        <div className="mt-10 pb-4 border-b border-line/70">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none max-w-full pb-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-semibold font-sans transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg shrink-0 ${
                    isActive ? 'text-violet-700' : 'text-slate hover:text-ink'
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="categoryTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.1 }
                          : { type: 'spring', stiffness: 500, damping: 35 }
                      }
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Chain Filter Chips with sliding active layoutId pill */}
          <div className="mt-4 flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 px-0.5 max-w-full sm:flex-wrap">
            {ALL_CHAINS.map((chain) => {
              const isSelected = selectedChain === chain;
              const count = getChainCount(chain);
              const label = chain === 'All Chains' ? `All ${count}` : `${chain} ${count}`;
              return (
                <button
                  key={chain}
                  type="button"
                  onClick={() => setSelectedChain(chain)}
                  className={`relative z-10 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium font-sans transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                    isSelected
                      ? 'text-white font-semibold'
                      : 'text-slate hover:text-ink bg-white/80 border border-[#E2E8F0]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeChainPill"
                      className="absolute inset-0 bg-violet-600 rounded-full -z-10 shadow-xs"
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.1 }
                          : { type: 'spring', stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Assets Grid: Flex-wrap centered with fixed card widths */}
        <motion.div
          layout={!shouldReduceMotion}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredAssets.map((asset, index) => {
              const hasMore = asset.networks.length > 3;
              const visibleNetworks = hasMore
                ? asset.networks.slice(0, 2)
                : asset.networks;
              const remainingCount = asset.networks.length - visibleNetworks.length;

              return (
                <motion.div
                  key={asset.symbol}
                  layout={!shouldReduceMotion}
                  tabIndex={0}
                  role="article"
                  aria-label={`${asset.name} (${asset.symbol})`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1, transition: { duration: 0.1 } }
                      : {
                          opacity: 1,
                          y: 0,
                          transition: {
                            opacity: {
                              duration: 0.22,
                              delay: Math.min(index * 0.03, 0.24),
                              ease: 'easeOut',
                            },
                            y: {
                              duration: 0.22,
                              delay: Math.min(index * 0.03, 0.24),
                              ease: 'easeOut',
                            },
                          },
                        }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0, transition: { duration: 0.1 } }
                      : {
                          opacity: 0,
                          scale: 0.97,
                          transition: { duration: 0.14, ease: 'easeIn' },
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          layout: {
                            type: 'spring',
                            stiffness: 380,
                            damping: 36,
                            mass: 0.8,
                          },
                        }
                  }
                  className="group relative rounded-2xl bg-white border border-[#E2E8F0] p-4 sm:p-5 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 w-[calc(50%-8px)] md:w-[calc(33.333%-10.67px)] lg:w-[calc(25%-12px)] xl:w-[calc(20%-12.8px)] h-[168px] sm:h-[184px] transition-[transform,box-shadow,border-color] duration-200 ease-out [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-violet-300 [@media(hover:hover)]:hover:shadow-[0_16px_32px_-12px_rgba(124,58,237,0.25)]"
                >
                  {/* Top Row: Coin Logo (left) + Type Badge (right) */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-full bg-white border border-[#E2E8F0] shadow-[0_2px_8px_rgba(124,58,237,0.08)] flex items-center justify-center shrink-0">
                      <SmartImage
                        src={asset.logo}
                        alt={`${asset.name} logo`}
                        width={28}
                        height={28}
                        fallbackMonogram={asset.symbol.slice(0, 3)}
                        className="w-7 h-7 object-contain transition-transform duration-200 [@media(hover:hover)]:group-hover:scale-[1.06]"
                      />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold font-sans ${
                        asset.type === 'Native'
                          ? 'bg-violet-50 text-violet-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {asset.type}
                    </span>
                  </div>

                  {/* Middle Row: Symbol (Manrope 700 22px) + Name below (Inter 500 14px) */}
                  <div>
                    <div className="font-bold font-display text-[22px] leading-tight text-[#0F172A]">
                      {asset.symbol}
                    </div>
                    <div className="font-medium font-sans text-[14px] leading-snug text-[#64748B] mt-0.5">
                      {asset.name}
                    </div>
                  </div>

                  {/* Bottom Row: 1px #F1F5F9 border line, up to 3 chain chips */}
                  <div className="border-t border-[#F1F5F9] pt-2.5 flex items-center gap-1.5 overflow-hidden">
                    {visibleNetworks.map((network) => (
                      <span
                        key={network}
                        className="inline-flex items-center gap-1.5 bg-[#F8FAFC] rounded-full px-2 py-0.5 text-[12px] font-medium font-sans text-[#475569] shrink-0"
                      >
                        <span className="hidden sm:inline-flex shrink-0">
                          <SmartImage
                            src={getChainLogo(network)}
                            alt={`${network} logo`}
                            width={16}
                            height={16}
                            fallbackMonogram={network.slice(0, 2)}
                            className="w-4 h-4 rounded-full object-contain"
                          />
                        </span>
                        <span>{formatNetworkChipName(network)}</span>
                      </span>
                    ))}
                    {hasMore && (
                      <span className="inline-flex items-center bg-[#F8FAFC] rounded-full px-2 py-0.5 text-[12px] font-medium font-sans text-[#64748B] shrink-0">
                        +{remainingCount}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Calm Empty State Card */}
        {filteredAssets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.25 }}
            className="w-full max-w-md mx-auto my-12 text-center py-10 px-6 rounded-2xl border border-dashed border-[#E2E8F0] bg-white/70 shadow-2xs"
          >
            <div className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center mx-auto mb-3">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-display text-[#0F172A]">
              No assets on this network yet
            </h3>
            <p className="mt-1 text-xs font-medium font-sans text-[#64748B]">
              Try selecting another network or category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSelectedChain('All Chains');
              }}
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold font-sans bg-violet-50 text-violet-700 hover:bg-violet-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              Reset filters
            </button>
          </motion.div>
        )}

        {/* Footnote */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted font-sans font-normal">
            Minimum amounts apply per network. Testnets are available for integration testing.
          </p>
        </div>
      </Container>
    </section>
  );
}
