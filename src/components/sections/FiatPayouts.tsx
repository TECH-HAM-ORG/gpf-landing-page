import React from 'react';
import { Check, ArrowRight, Landmark } from 'lucide-react';
import { Container, SmartImage, FloatingCard, Reveal } from '@/components/ui';

export function FiatPayouts() {
  const bullets = [
    'Send stablecoins and receive local currency in a bank account',
    'Enter bank details once',
    'Track payout status in the dashboard',
  ];

  const cards = [
    {
      country: 'Argentina',
      currency: 'ARS',
      image: '/images/fiat-argentina.webp',
      alt: 'Argentina local bank payout',
      offsetClass: 'md:translate-y-0',
    },
    {
      country: 'Brazil',
      currency: 'BRL',
      image: '/images/fiat-brazil.webp',
      alt: 'Brazil local bank payout',
      offsetClass: 'md:translate-y-10',
    },
  ];

  return (
    <section id="fiat" className="py-20 sm:py-28 bg-white border-b border-line overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-[13px] font-semibold mb-4 font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600 animate-pulse" />
                Crypto to Fiat
              </div>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold font-display tracking-[-0.03em] text-ink leading-[1.1]">
                Cash out to local banks in Argentina and Brazil.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-4">
              {bullets.map((bullet, idx) => (
                <Reveal key={idx} delay={0.1 + idx * 0.1}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/70 shrink-0 mt-0.5">
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden="true" />
                    </div>
                    <span className="text-base text-[#475569] font-normal leading-[1.6] font-sans">
                      {bullet}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols): Two tall offset photo cards with floating badge */}
          <div className="lg:col-span-7 relative">
            {/* Center FloatingCard badge positioned over/between cards */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none w-max max-w-[90%]">
              <FloatingCard
                className="shadow-2xl border-violet-100/80 bg-white/95 backdrop-blur-md px-5 py-3.5"
                hoverEffect={false}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold font-display text-ink">USDT</span>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                      <ArrowRight className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-semibold font-display text-ink">Local Bank</span>
                  </div>
                </div>
              </FloatingCard>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
              {cards.map((card, idx) => (
                <Reveal key={card.country} delay={idx * 0.15}>
                  <div
                    className={`group relative h-[380px] sm:h-[430px] w-full overflow-hidden rounded-3xl border border-line/80 bg-slate-900 shadow-card transition-all duration-500 hover:shadow-2xl hover:border-violet-300 ${card.offsetClass}`}
                  >
                    {/* Background photo with hover scale */}
                    <div className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                      <SmartImage
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 transition-opacity duration-300 group-hover:opacity-95"
                      aria-hidden="true"
                    />

                    {/* Top Pill */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 px-3 py-1 text-xs font-semibold font-sans text-white shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Bank payout
                      </span>
                    </div>

                    {/* Bottom Country Name & Currency Details */}
                    <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl font-bold font-display tracking-tight text-white">
                          {card.country}
                        </h3>
                        <p className="mt-1 text-xs font-sans font-medium text-slate-300">
                          Direct {card.currency} Rail
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
