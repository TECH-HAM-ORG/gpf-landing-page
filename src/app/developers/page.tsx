import React from 'react';
import type { Metadata } from 'next';
import {
  Navbar,
  Footer,
  DeveloperHero,
  IntegrationSteps,
  DeveloperApi,
  ServerEnvironments,
  AuthenticationSpecs,
  WebhooksAndErrors,
  DeveloperCtaBanner,
} from '@/components/sections';
import { BRAND } from '@/lib/content';

export const metadata: Metadata = {
  title: `Developers & REST API Reference | ${BRAND.name}`,
  description:
    'Integrate GlobPayFlow REST API with cryptographic HMAC-SHA256 signatures, automated multi-chain deposits, and instant webhooks.',
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <DeveloperHero />
        <IntegrationSteps />
        <DeveloperApi />
        <ServerEnvironments />
        <AuthenticationSpecs />
        <WebhooksAndErrors />
        <DeveloperCtaBanner />
      </main>
      <Footer />
    </div>
  );
}
