'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ChevronDown } from 'lucide-react';
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

export function NetworksExplorer() {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>('All');
  const [selectedChain, setSelectedChain] = useState<string>('All Chains');

  const filteredAssets = useMemo(() => {
    return ASSETS_LIST.filter((asset) => {
      // Category check
      const matchesCategory =
        activeCategory === 'All' || asset.category === activeCategory;

      // Chain check
      const matchesChain =
        selectedChain === 'All Chains' ||
        asset.networks.some((n) =>
          n.toLowerCase().includes(selectedChain.toLowerCase().replace(' smart chain', '').replace(' c-chain', '').replace(' ledger', ''))
        );

      return matchesCategory && matchesChain;
    });
  }, [activeCategory, selectedChain]);

  return (
    <section id="networks" className="py-20 sm:py-28 bg-soft border-b border-line">
      <Container>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
              11 blockchains. 13 currencies.
            </h2>
          </div>
        </Reveal>

        {/* Filter Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 pb-4 border-b border-line/70">
          {/* Category Tabs with Animated Underline */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full pb-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg ${
                    isActive ? 'text-violet-700' : 'text-slate hover:text-ink'
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && (
                    <motion.div
                      layoutId="categoryTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Chain Dropdown / Filter Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <div className="relative inline-block w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider hidden sm:inline-block">
                  Network:
                </span>
                <div className="relative">
                  <select
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value)}
                    aria-label="Filter by Blockchain"
                    className="appearance-none w-full sm:w-auto bg-white border border-line rounded-xl px-4 py-2 pr-9 text-xs font-medium text-ink shadow-xs hover:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all cursor-pointer"
                  >
                    {ALL_CHAINS.map((chain) => (
                      <option key={chain} value={chain}>
                        {chain}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chain Chips on Desktop */}
        <div className="mt-4 hidden md:flex flex-wrap items-center gap-1.5">
          {ALL_CHAINS.map((chain) => {
            const isSelected = selectedChain === chain;
            return (
              <button
                key={chain}
                type="button"
                onClick={() => setSelectedChain(chain)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-xs font-semibold'
                    : 'bg-white/80 border border-line text-slate hover:border-violet-200 hover:text-ink'
                }`}
              >
                {chain}
              </button>
            );
          })}
        </div>

        {/* Animated Asset Grid (4 cols on md, 5 cols on lg) */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredAssets.map((asset) => (
              <motion.div
                key={asset.symbol}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="group relative rounded-2xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:shadow-lg hover:shadow-violet-900/5 hover:-translate-y-1 hover:border-violet-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Logo + Type Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-1.5 transition-transform duration-300 group-hover:scale-105">
                      <SmartImage
                        src={asset.logo}
                        alt={`${asset.name} logo`}
                        width={28}
                        height={28}
                        fallbackMonogram={asset.symbol.slice(0, 3)}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold ${
                        asset.type === 'Native'
                          ? 'bg-violet-50 text-violet-700 border border-violet-200/60'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                      }`}
                    >
                      {asset.type}
                    </span>
                  </div>

                  {/* Asset Name & Symbol */}
                  <div className="mt-3.5">
                    <div className="flex items-baseline gap-1.5">
                      <h3 className="font-bold text-ink text-base tracking-tight">
                        {asset.symbol}
                      </h3>
                      <span className="text-xs text-muted truncate">
                        {asset.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network Label */}
                <div className="mt-4 pt-3 border-t border-line/60">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate">
                    <Layers className="h-3 w-3 text-muted shrink-0" />
                    <span className="truncate font-mono" title={asset.networks.join(', ')}>
                      {asset.networks.join(', ')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAssets.length === 0 && (
          <div className="mt-12 text-center py-12 rounded-2xl border border-dashed border-line bg-white/50">
            <p className="text-sm font-medium text-slate">
              No currencies match the selected filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSelectedChain('All Chains');
              }}
              className="mt-3 text-xs font-semibold text-violet-600 hover:text-violet-700 underline"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Footnote */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted">
            Minimum amounts apply per network. Testnets are available for integration testing.
          </p>
        </div>
      </Container>
    </section>
  );
}
