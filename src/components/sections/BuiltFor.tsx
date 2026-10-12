import React from 'react';
import { Container, SectionHeading, SmartImage, Reveal } from '@/components/ui';

interface UseCaseCard {
  id: string;
  title: string;
  line: string;
  image: string;
  alt: string;
}

const USE_CASES: UseCaseCard[] = [
  {
    id: 'ecommerce',
    title: 'Online stores',
    line: 'Accept crypto at checkout',
    image: '/images/use-ecommerce.webp',
    alt: 'Online store checkout with cryptocurrency',
  },
  {
    id: 'marketplaces',
    title: 'Marketplaces',
    line: 'Pay out sellers and partners',
    image: '/images/use-marketplace.webp',
    alt: 'Marketplace payouts to sellers and partners',
  },
  {
    id: 'global-teams',
    title: 'Global teams',
    line: 'Settle across borders',
    image: '/images/use-global.webp',
    alt: 'Global teams cross-border settlement',
  },
];

export function BuiltFor() {
  return (
    <section id="built-for" className="py-20 sm:py-28 bg-soft border-b border-line">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Built for"
            title="Built for businesses that accept crypto."
            description="Payment infrastructure tailored for online checkout, partner payouts, and cross-border settlement."
          />
        </Reveal>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {USE_CASES.map((useCase, idx) => (
            <Reveal key={useCase.id} delay={idx * 0.12}>
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line/80 bg-slate-900 shadow-card">
                {/* Background Image with hover zoom 1.05 */}
                <div className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                  <SmartImage
                    src={useCase.image}
                    alt={useCase.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Dark gradient overlay at the bottom */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95"
                  aria-hidden="true"
                />

                {/* Text Content: White title and 1 line */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end z-10">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {useCase.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-normal text-slate-200 leading-relaxed">
                    {useCase.line}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
