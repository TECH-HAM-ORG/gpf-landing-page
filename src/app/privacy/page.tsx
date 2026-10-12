import React from 'react';
import type { Metadata } from 'next';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { BRAND, BLOCKCHAINS, CURRENCIES } from '@/lib/content';

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
  description: 'Privacy Policy and data processing terms for GlobPayFlow payment infrastructure.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      badge="Data Protection & Privacy"
      title="Privacy Policy"
      description="How GlobPayFlow processes, secures, and protects merchant and company operational data."
    >
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">
          1. Platform Architecture &amp; Data Principles
        </h2>
        <p className="text-slate-700">
          {BRAND.name} operates API orchestration and ledger infrastructure for multi-chain digital currency processing. We adhere to data minimization principles, recording only cryptographic hashes, public blockchain addresses, order identifiers, and operational telemetry necessary to execute transaction lifecycle states across {BLOCKCHAINS.length} supported networks.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">
          2. Information Processed
        </h2>
        <p className="mb-3 text-slate-700">
          During normal operations, {BRAND.name} processes the following technical data categories:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
          <li>Company account credentials, approved destination wallet addresses, and team role assignments.</li>
          <li>Cryptographic authentication headers including API keys, UNIX millisecond timestamps, and HMAC-SHA256 signatures.</li>
          <li>On-chain identifiers such as public wallet addresses, transaction hashes, and deposit receipts across {CURRENCIES.length} supported currencies.</li>
          <li>Beneficiary verification records for regional fiat payouts in Argentina and Brazil.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-3 font-display">
          3. Security &amp; Access Governance
        </h2>
        <p className="text-slate-700">
          All data in transit is encrypted using modern TLS standards. Access to administrative controls is governed by role-based permissions, hardware-backed WebAuthn passkey authentication, and OTP verification. Signing secrets remain strictly on merchant servers.
        </p>
      </div>
    </LegalLayout>
  );
}
