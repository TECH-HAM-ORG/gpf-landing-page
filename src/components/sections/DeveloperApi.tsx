'use client';

import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';
import { API } from '@/lib/content';

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.globpayflow.com';

type CodeTab = 'sign' | 'deposit' | 'withdrawal';

const STATUS_CODES = [200, 201, 400, 401, 403, 404, 409, 422, 503];

export function DeveloperApi() {
  const [activeTab, setActiveTab] = useState<CodeTab>('sign');
  const [copied, setCopied] = useState(false);

  const checks = [
    'Signed requests',
    'Callback URL for withdrawals',
    'Testnet networks for testing',
  ];

  const getRawCode = () => {
    switch (activeTab) {
      case 'sign':
        return `// Authentication Headers for GlobPayFlow REST API\nconst headers = {\n  'api-key': 'YOUR_API_KEY',\n  'api-timestamp': Date.now().toString(), // Unix ms\n  'api-content-hash': sha256(requestBody), // SHA256 of payload\n  'api-signature': hmacSha256(\n    timestamp + method + path + contentHash,\n    'YOUR_SECRET_KEY'\n  )\n};`;
      case 'deposit':
        return `// POST /api/company/deposit-transactions\n{\n  "order_id": "ord_892341",\n  "amount": "150.00",\n  "payment_method_code": "CRYPTO",\n  "crypto_code": "USDT",\n  "chain": "TRX",\n  "customer_name": "John Doe",\n  "customer_email": "john@example.com"\n}`;
      case 'withdrawal':
        return `// POST /api/company/withdrawal-transactions\n{\n  "type": "crypto",\n  "networkId": "1",\n  "amount": "500.00",\n  "address": "0x71C836343685A0CE32292723a56667573701E7E0",\n  "customerName": "Jane Smith",\n  "customerEmail": "jane@example.com",\n  "customerContact": "+1234567890"\n}`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getRawCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developers" className="py-20 sm:py-28 bg-white border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-xs font-semibold uppercase tracking-wider mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                  Developers
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink leading-tight">
                  Integrate in an afternoon.
                </h2>
              </Reveal>

              {/* 3 Checks */}
              <div className="mt-6 space-y-3">
                {checks.map((check, idx) => (
                  <Reveal key={idx} delay={0.1 + idx * 0.08}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                        <Check className="h-3 w-3 stroke-[2.5]" />
                      </div>
                      <span className="text-sm font-medium text-slate">{check}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Endpoint List as Method Pills */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                Core REST Endpoints
              </span>
              <div className="mt-3 space-y-2">
                {API.endpoints.map((ep) => (
                  <div
                    key={`${ep.method}-${ep.path}`}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-line bg-soft text-xs font-mono transition-colors hover:bg-white hover:border-violet-200"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold shrink-0 uppercase tracking-wide ${
                          ep.method === 'POST'
                            ? 'bg-violet-50 text-violet-700 border border-violet-200/60'
                            : 'bg-cyan-50 text-cyan-700 border border-cyan-200/60'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="font-semibold text-ink truncate">{ep.path}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div>
              <Button variant="primary" size="md" href={DOCS_URL} isExternal>
                <span>Open API documentation</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Right Column (7 cols): Dark Code Card */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-slate-800 bg-slate-950 text-slate-200 shadow-2xl overflow-hidden">
                {/* Code Window Header / Tabs */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-4 py-2.5 gap-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('sign')}
                      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                        activeTab === 'sign'
                          ? 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Sign request
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('deposit')}
                      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                        activeTab === 'deposit'
                          ? 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Create deposit
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('withdrawal')}
                      className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                        activeTab === 'withdrawal'
                          ? 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Create withdrawal
                    </button>
                  </div>

                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/80 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Hand-Coloured Code Body (No external lib) */}
                <div className="p-5 overflow-x-auto text-xs font-mono leading-relaxed bg-slate-950/95 min-h-[260px]">
                  {activeTab === 'sign' && (
                    <pre className="text-slate-300">
                      <code>
                        <span className="text-slate-500">{`// Authentication Headers for GlobPayFlow REST API\n`}</span>
                        <span className="text-violet-400">const</span> <span className="text-amber-200">headers</span> = {'{\n'}
                        {'  '}<span className="text-emerald-400">&apos;api-key&apos;</span>: <span className="text-sky-300">&apos;YOUR_API_KEY&apos;</span>,\n
                        {'  '}<span className="text-emerald-400">&apos;api-timestamp&apos;</span>: <span className="text-cyan-300">Date</span>.<span className="text-yellow-200">now</span>().<span className="text-yellow-200">toString</span>(), <span className="text-slate-500">{`// Unix epoch ms\n`}</span>
                        {'  '}<span className="text-emerald-400">&apos;api-content-hash&apos;</span>: <span className="text-violet-400">sha256</span>(<span className="text-slate-200">requestBody</span>), <span className="text-slate-500">{`// SHA256 of payload\n`}</span>
                        {'  '}<span className="text-emerald-400">&apos;api-signature&apos;</span>: <span className="text-violet-400">hmacSha256</span>(\n
                        {'    '}<span className="text-slate-200">timestamp</span> + <span className="text-slate-200">method</span> + <span className="text-slate-200">path</span> + <span className="text-slate-200">contentHash</span>,\n
                        {'    '}<span className="text-sky-300">&apos;YOUR_SECRET_KEY&apos;</span>\n
                        {'  '})\n
                        {'}'};
                      </code>
                    </pre>
                  )}

                  {activeTab === 'deposit' && (
                    <pre className="text-slate-300">
                      <code>
                        <span className="text-slate-500">{`// POST /api/company/deposit-transactions\n`}</span>
                        {`{\n`}
                        {'  '}<span className="text-emerald-400">&quot;order_id&quot;</span>: <span className="text-sky-300">&quot;ord_892341&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;amount&quot;</span>: <span className="text-amber-300">&quot;150.00&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;payment_method_code&quot;</span>: <span className="text-sky-300">&quot;CRYPTO&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;crypto_code&quot;</span>: <span className="text-sky-300">&quot;USDT&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;chain&quot;</span>: <span className="text-sky-300">&quot;TRX&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;customer_name&quot;</span>: <span className="text-sky-300">&quot;John Doe&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;customer_email&quot;</span>: <span className="text-sky-300">&quot;john@example.com&quot;</span>\n
                        {`}`}
                      </code>
                    </pre>
                  )}

                  {activeTab === 'withdrawal' && (
                    <pre className="text-slate-300">
                      <code>
                        <span className="text-slate-500">{`// POST /api/company/withdrawal-transactions\n`}</span>
                        {`{\n`}
                        {'  '}<span className="text-emerald-400">&quot;type&quot;</span>: <span className="text-sky-300">&quot;crypto&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;networkId&quot;</span>: <span className="text-amber-300">&quot;1&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;amount&quot;</span>: <span className="text-amber-300">&quot;500.00&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;address&quot;</span>: <span className="text-sky-300">&quot;0x71C836343685A0CE32292723a56667573701E7E0&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;customerName&quot;</span>: <span className="text-sky-300">&quot;Jane Smith&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;customerEmail&quot;</span>: <span className="text-sky-300">&quot;jane@example.com&quot;</span>,\n
                        {'  '}<span className="text-emerald-400">&quot;customerContact&quot;</span>: <span className="text-sky-300">&quot;+1234567890&quot;</span>\n
                        {`}`}
                      </code>
                    </pre>
                  )}
                </div>

                {/* Secret Key Note */}
                <div className="border-t border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-amber-300/90 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Keep your secret key on your server.</span>
                </div>
              </div>

              {/* Status Code Chips & Semantics */}
              <div className="mt-5 rounded-2xl border border-line bg-soft p-5">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted">
                  HTTP Status Codes
                </span>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {STATUS_CODES.map((code) => (
                    <span
                      key={code}
                      className="rounded-lg bg-white border border-line px-2.5 py-1 text-xs font-mono text-ink font-semibold shadow-2xs"
                    >
                      {code}
                    </span>
                  ))}
                </div>
                <div className="mt-3.5 flex items-start gap-2 text-xs text-slate">
                  <AlertCircle className="h-4 w-4 text-violet-600 shrink-0 mt-0.5" />
                  <span>
                    A successful response means the request was accepted, not always final settlement.
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
