import React from 'react';
import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { BRAND, BLOCKCHAINS, CURRENCIES } from '@/lib/content';

export const metadata: Metadata = {
  title: `Terms of Service | ${BRAND.name}`,
  description: 'Terms of Service and commercial usage conditions for GlobPayFlow payment infrastructure.',
};

export default function TermsPage() {
  return (
    <LegalLayout
      badge="Commercial Terms"
      title="Terms of Service"
      description="Operational standards, service boundaries, and commercial rules governing participation on GlobPayFlow."
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">
          1. Scope of Platform Infrastructure
        </h2>
        <p className="text-slate-700">
          {BRAND.name} ({BRAND.tagline}) provides software infrastructure for multi-chain digital asset deposits, outbound crypto disbursements to approved addresses, transaction webhooks, and regional fiat payouts in Argentina and Brazil.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          The platform operates across {BLOCKCHAINS.length} supported blockchains and {CURRENCIES.length} currencies. All network fees, minimum amounts, and settlement speeds are governed by underlying protocol mechanics.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">
          2. API Key Governance &amp; Security Mandates
        </h2>
        <p className="text-slate-700">
          Clients are issued API credentials and cryptographic signing secrets. You are strictly responsible for maintaining the confidentiality of your secret keys and executing signature calculations on your backend servers. Every authenticated request requires valid timestamp headers and HMAC-SHA256 signatures within a 5-minute replay-prevention window.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">
          3. Payout and Disbursement Controls
        </h2>
        <p className="text-slate-700">
          Outbound crypto disbursements are restricted strictly to pre-approved wallet addresses. Local fiat payouts in Argentina and Brazil require verified beneficiary details prior to fund dispatch.
        </p>
      </div>
    </LegalLayout>
  );
}
