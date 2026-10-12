import React from 'react';
import {
  Navbar,
  Hero,
  NetworksStrip,
  Steps,
  Flows,
  DashboardShowcase,
  BuiltFor,
  FiatPayouts,
  NetworksExplorer,
  CompaniesFees,
  Security,
  DeveloperApi,
  Faq,
  FinalCta,
  Footer,
} from '@/components/sections';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <NetworksStrip />
        <Steps />
        <Flows />
        <DashboardShowcase />
        <BuiltFor />
        <FiatPayouts />
        <NetworksExplorer />
        <CompaniesFees />
        <Security />
        <DeveloperApi />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
