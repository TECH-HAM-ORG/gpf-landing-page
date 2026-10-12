import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.globpayflow.com';

export function FinalCta() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container size="narrow">
        <Reveal>
          <div className="relative rounded-3xl bg-brand-gradient p-8 sm:p-14 md:p-16 text-center text-white shadow-2xl overflow-hidden">
            {/* Subtle ambient light effects */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-indigo-900/30 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
                Ready to accept crypto?
              </h2>

              <p className="mt-4 text-base sm:text-lg text-violet-100 font-normal leading-relaxed">
                Connect your business to 11 blockchains, configure transparent fee structures, and disburse local fiat payouts in Argentina and Brazil.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  href="/contact"
                  className="bg-white text-violet-900 hover:bg-violet-50 font-bold border-transparent shadow-lg"
                >
                  <span>Request access</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  href={DOCS_URL}
                  isExternal
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white font-medium"
                >
                  <span>Read the docs</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
