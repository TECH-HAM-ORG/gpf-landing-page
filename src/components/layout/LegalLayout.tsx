import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { Navbar, Footer } from '@/components/sections';
import { Container, Badge } from '@/components/ui';

interface LegalLayoutProps {
  badge: string;
  title: string;
  description: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalLayout({
  badge,
  title,
  description,
  lastUpdated = 'October 2026',
  children,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20 relative overflow-hidden bg-slate-50/50">
        <Container size="narrow">
          {/* Draft Legal Banner */}
          <div className="mb-10 rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5 text-amber-900 shadow-xs">
            <div className="flex items-start gap-3.5">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
              <div className="space-y-1 text-xs sm:text-sm">
                <p className="font-semibold text-amber-800 font-sans text-xs">
                  Draft, to be reviewed by legal
                </p>
                <p className="text-amber-800/90 leading-relaxed font-sans">
                  This document serves as an operational architecture outline. It represents a working draft and must be formally reviewed, adapted, and approved by qualified legal counsel prior to binding commercial execution.
                </p>
              </div>
            </div>
          </div>

          {/* Heading Block */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="purple" className="mx-auto w-fit">
              {badge}
            </Badge>

            <h1 className="mt-4 font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold tracking-[-0.035em] text-slate-900 leading-[1.05]">
              {title}
            </h1>

            <p className="mt-4 text-base sm:text-[19px] text-[#475569] leading-[1.6] font-sans">
              {description}
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-sans text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          {/* Document Content */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md text-sm sm:text-base text-slate-700 leading-relaxed space-y-8">
            {children}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
