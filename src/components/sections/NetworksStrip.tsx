'use client';

import React from 'react';
import { Container, SmartImage } from '@/components/ui';

const NETWORKS = [
  { name: 'Ethereum', symbol: 'ETH', icon: '/images/coins/ethereum.svg' },
  { name: 'BNB Smart Chain', symbol: 'BNB', icon: '/images/coins/bnb.svg' },
  { name: 'Tron', symbol: 'TRX', icon: '/images/coins/tron.svg' },
  { name: 'Solana', symbol: 'SOL', icon: '/images/coins/solana.svg' },
  { name: 'Bitcoin', symbol: 'BTC', icon: '/images/coins/bitcoin.svg' },
  { name: 'Litecoin', symbol: 'LTC', icon: '/images/coins/litecoin.svg' },
  { name: 'Dogecoin', symbol: 'DOGE', icon: '/images/coins/dogecoin.svg' },
  { name: 'XRP Ledger', symbol: 'XRP', icon: '/images/coins/xrp.svg' },
  { name: 'Avalanche C-Chain', symbol: 'AVAX', icon: '/images/coins/avalanche.svg' },
  { name: 'Polygon', symbol: 'POL', icon: '/images/coins/polygon.svg' },
  { name: 'Base', symbol: 'BASE', icon: '/images/coins/base.svg' },
] as const;

export function NetworksStrip() {
  return (
    <section
      id="supported-networks"
      aria-label="Supported networks"
      className="py-8 sm:py-10 bg-soft border-b border-line"
    >
      <Container>
        {/* Bordered rounded-3xl container */}
        <div className="rounded-3xl border border-line bg-white p-5 sm:p-6 lg:p-7 relative overflow-hidden shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Small label: "Works with" */}
            <div className="shrink-0 flex items-center gap-3">
              <span className="text-[13px] font-semibold text-muted whitespace-nowrap font-sans">
                Works with
              </span>
              <span className="hidden sm:inline-block h-4 w-px bg-line" aria-hidden="true" />
            </div>

            {/* Infinite marquee viewport with fade edges */}
            <div className="relative flex-1 overflow-hidden">
              {/* Left fade edge */}
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-white to-transparent z-10"
                aria-hidden="true"
              />
              {/* Right fade edge */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-white to-transparent z-10"
                aria-hidden="true"
              />

              {/* Infinite Marquee Track */}
              <div className="animate-marquee flex items-center gap-4 sm:gap-6 py-1">
                {[...NETWORKS, ...NETWORKS].map((network, idx) => (
                  <div
                    key={`${network.name}-${idx}`}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-soft border border-line/70 shadow-2xs transition-all duration-300 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 hover:scale-105 select-none shrink-0 cursor-default"
                  >
                    <div className="h-7 w-7 relative shrink-0 flex items-center justify-center">
                      <SmartImage
                        src={network.icon}
                        alt={network.name}
                        width={28}
                        height={28}
                        fallbackMonogram={network.symbol}
                        className="h-7 w-7 object-contain"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">
                      {network.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
