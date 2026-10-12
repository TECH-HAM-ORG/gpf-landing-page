import { ExternalLink } from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';

const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ||
  'https://gpf-app.erstech-localserver.xyz/api/user-api-docs#/overview';

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
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold font-display tracking-[-0.03em] leading-[1.1] text-white">
                Ready to accept crypto?
              </h2>

              <p className="mt-4 text-base sm:text-[19px] text-violet-100 font-normal leading-[1.6] font-sans">
                Connect your business to 11 blockchains, configure transparent fee structures, and disburse local fiat payouts in Argentina and Brazil.
              </p>

              <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  href={DOCS_URL}
                  external
                  className="bg-white text-violet-900 hover:bg-violet-50 font-bold border-transparent shadow-lg"
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
