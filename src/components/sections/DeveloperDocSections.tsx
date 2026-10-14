'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Server,
  Key,
  Webhook,
  ArrowRight,
  Code2,
} from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';

const DOCS_URL = 'https://gpf-api.erstech-localserver.xyz/docs/#overview';

export function DeveloperHero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const specPills = [
    {
      icon: <Key className="h-3.5 w-3.5 text-violet-600" />,
      text: 'HMAC-SHA256 Signing',
    },
    {
      icon: <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />,
      text: '5-Min Replay Window',
    },
    {
      icon: <Webhook className="h-3.5 w-3.5 text-sky-600" />,
      text: 'Duplicate-Event Protection',
    },
    {
      icon: <Server className="h-3.5 w-3.5 text-amber-600" />,
      text: 'Zero Private Key Exposure',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 bg-gradient-to-b from-soft via-white to-white border-b border-line">
      {/* Soft ambient background glows */}
      <div
        className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-violet-400/12 blur-[120px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-[130px] -z-10"
        aria-hidden="true"
      />

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200/60 text-violet-700 text-xs font-semibold font-sans mb-5 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-violet-600 animate-pulse" />
              Merchant REST API v1.0
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-ink tracking-tight leading-[1.1]"
          >
            GlobPayFlow{' '}
            <span className="text-gradient">Developer Documentation</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Cryptographic HMAC-SHA256 request verification, multi-chain payment flows, and automated webhook settlement for merchants and companies.
          </motion.p>

          {/* Actions */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="md"
              href={DOCS_URL}
              isExternal
              className="gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <span>Explore Interactive API Reference</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
            <a
              href="#integration-flow"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold font-display text-ink bg-white border border-line hover:border-violet-300 hover:bg-soft transition shadow-2xs hover:shadow-sm"
            >
              <span>Quick Start Guide</span>
              <ArrowRight className="h-4 w-4 text-slate-500" />
            </a>
          </motion.div>

          {/* Key Specs Pills */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-line/70 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-sans text-slate-600"
          >
            {specPills.map((pill) => (
              <span
                key={pill.text}
                className="px-3 py-1.5 rounded-full bg-white border border-line shadow-2xs flex items-center gap-1.5 hover:border-violet-300 hover:shadow-xs transition-all duration-300"
              >
                {pill.icon} {pill.text}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export function IntegrationSteps() {
  const steps = [
    {
      num: '01',
      title: 'Credentials & API Keys',
      desc: 'Obtain your api-key and secret-key from your backoffice account setup. Store the secret key securely in your environment variables; it is never exposed in client requests.',
    },
    {
      num: '02',
      title: 'HMAC-SHA256 Signing',
      desc: 'Calculate the SHA256 hash of your request body. Compute the HMAC signature using timestamp + METHOD + path + contentHash within a 5-minute replay window.',
    },
    {
      num: '03',
      title: 'Create Transactions',
      desc: 'Initiate deposit orders across supported chains or request withdrawals to pre-approved destination addresses with granular gas fee calculation.',
    },
    {
      num: '04',
      title: 'Webhooks & Status',
      desc: 'Receive automated deposit callbacks at /api/webhook/deposit. Monitor transaction lifecycles and query balances at /api/balances/wallet.',
    },
  ];

  return (
    <section id="integration-flow" className="py-16 sm:py-24 bg-white border-b border-line">
      <Container>
        <Reveal>
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-xs font-semibold mb-3 font-sans">
              Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Typical Integration Flow
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-sans">
              End-to-end integration lifecycle from credential provisioning to final transaction reconciliation.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Reveal key={step.num} delay={idx * 0.1} className="h-full">
              <div className="h-full p-6 rounded-2xl bg-soft border border-line flex flex-col justify-between hover:border-violet-300 hover:shadow-card hover:-translate-y-1 transition-all duration-300 group">
                <div>
                  <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-200/60 px-2.5 py-1 rounded-md shadow-2xs group-hover:bg-violet-100/70 transition-colors">
                    STEP {step.num}
                  </span>
                  <h3 className="mt-4 text-base font-bold font-display text-ink group-hover:text-violet-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 font-sans">
                    {step.desc}
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

export function ServerEnvironments() {
  const [copiedEnv, setCopiedEnv] = useState<string | null>(null);

  const envs = [
    {
      name: 'Production Environment',
      url: 'https://api.globpayflow.com/api',
      badge: 'Live',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      note: 'Protected by Cloudflare & strict HMAC verification',
    },
    {
      name: 'Staging Environment',
      url: 'https://api-staging.globpayflow.com/api',
      badge: 'Testnet',
      badgeClass: 'bg-violet-50 text-violet-700 border-violet-200/60',
      note: 'Connected to Sepolia, BSC Testnet, and Tron Shasta',
    },
    {
      name: 'Local Development',
      url: 'http://localhost:8080/api',
      badge: 'Local',
      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
      note: 'Direct backend instance for local proxy development',
    },
  ];

  const handleCopy = (url: string, name: string) => {
    navigator.clipboard.writeText(url);
    setCopiedEnv(name);
    setTimeout(() => setCopiedEnv(null), 2000);
  };

  return (
    <section className="py-16 sm:py-24 bg-soft border-b border-line">
      <Container>
        <Reveal>
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-xs font-semibold mb-3 font-sans">
              Endpoints
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
              Server Environments &amp; Base URLs
            </h2>
            <p className="mt-2 text-sm text-slate-600 font-sans">
              Replace the base URL in your requests based on the deployment target environment.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {envs.map((env, idx) => (
            <Reveal key={env.name} delay={idx * 0.12} className="h-full">
              <div className="h-full p-6 rounded-2xl bg-white border border-line shadow-2xs hover:border-violet-300 hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold font-display text-ink">{env.name}</span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${env.badgeClass}`}
                    >
                      {env.badge}
                    </span>
                  </div>
                  <div className="mt-4 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs flex items-center justify-between gap-2 shadow-inner">
                    <span className="truncate">{env.url}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(env.url, env.name)}
                      className="p-1 rounded text-slate-400 hover:text-white transition shrink-0"
                      aria-label={`Copy ${env.name} URL`}
                    >
                      {copiedEnv === env.name ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 font-sans">{env.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function AuthenticationSpecs() {
  const headers = [
    {
      name: 'api-key',
      type: 'String',
      required: true,
      desc: 'Unique API key identifying your company/merchant account.',
    },
    {
      name: 'api-timestamp',
      type: 'String (Unix ms)',
      required: true,
      desc: 'Current timestamp in milliseconds (e.g. Date.now().toString()). Must be within 5 minutes of server time.',
    },
    {
      name: 'api-content-hash',
      type: 'SHA256 Hex',
      required: true,
      desc: 'SHA256 hash of the JSON body string. For GET/DELETE requests with no body, hash an empty string.',
    },
    {
      name: 'api-signature',
      type: 'HMAC-SHA256 Hex',
      required: true,
      desc: 'Hex signature computed over: timestamp + METHOD + path + contentHash using your private API secret.',
    },
    {
      name: 'Content-Type',
      type: 'String',
      required: 'POST / PUT',
      desc: 'Must be application/json for all mutation requests.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-xs font-semibold font-sans">
                  Protocol
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink">
                  HMAC-SHA256 Request Headers
                </h2>
                <p className="text-sm text-slate-600 font-sans leading-relaxed">
                  Every incoming API request is cryptographically validated. The secret key is never sent over the wire; it is exclusively used locally on your server to generate the HMAC hash.
                </p>

                <div className="p-4 rounded-xl bg-violet-50/70 border border-violet-100 text-xs text-violet-900 font-sans space-y-2 hover:border-violet-200 transition-colors">
                  <div className="font-semibold flex items-center gap-1.5 text-violet-800">
                    <Code2 className="h-4 w-4" /> Signing Formula
                  </div>
                  <code className="block p-2.5 rounded-lg bg-white border border-violet-200/80 font-mono text-[11px] text-slate-800 break-all shadow-2xs">
                    signature = HMAC_SHA256(timestamp + METHOD + path + contentHash, secretKey)
                  </code>
                  <p className="text-[11px] text-slate-600">
                    Note: Include query strings in the path (e.g. <span className="font-mono">/api/transactions/history?limit=10</span>).
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-line bg-soft shadow-card hover:border-violet-200 transition-colors">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-white border-b border-line text-slate-700 uppercase font-semibold text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Header</th>
                        <th className="py-3.5 px-3">Type</th>
                        <th className="py-3.5 px-3">Required</th>
                        <th className="py-3.5 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line/70">
                      {headers.map((h) => (
                        <tr key={h.name} className="hover:bg-violet-50/40 transition-colors">
                          <td className="py-3 px-4 font-mono font-semibold text-ink">{h.name}</td>
                          <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{h.type}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                h.required === true
                                  ? 'bg-violet-50 text-violet-700 border border-violet-200/60'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {h.required === true ? 'Yes' : String(h.required)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 leading-relaxed">{h.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function WebhooksAndErrors() {
  return (
    <section className="py-16 sm:py-24 bg-soft border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Webhook Callback */}
          <Reveal direction="up" delay={0.05}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-xs font-semibold font-sans">
                Callbacks
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-ink">
                Deposit Provider Webhook
              </h2>
              <p className="text-sm text-slate-600 font-sans leading-relaxed">
                When a customer completes an on-chain transfer to a generated deposit address, the payment system detects the transaction and triggers automated processing with duplicate-event protection.
              </p>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-300 shadow-xl hover:border-slate-700 transition-colors">
                <div className="text-slate-500 pb-2 border-b border-slate-800 flex items-center justify-between">
                  <span>POST /api/webhook/deposit</span>
                  <span className="text-[11px] text-emerald-400 font-semibold">HTTP 200 OK</span>
                </div>
                <pre className="pt-3 text-[11px] leading-relaxed overflow-x-auto text-emerald-300">
                  <code>{`{
  "address": "0x71C836343685A0CE32292723a56667573701E7E0",
  "counterAddress": "0x9823485723948579234857293485723948572938",
  "amount": "150.00",
  "asset": "USDT",
  "txId": "0x4b7f8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
  "chain": "TRON",
  "type": "token",
  "trxHash": "0x4b7f8c9d0e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c"
}`}</code>
                </pre>
              </div>
            </div>
          </Reveal>

          {/* Error Standards */}
          <Reveal direction="up" delay={0.15}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-xs font-semibold font-sans">
                Reliability
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-ink">
                Error Handling &amp; Status Codes
              </h2>
              <p className="text-sm text-slate-600 font-sans leading-relaxed">
                All API error responses follow a uniform JSON payload specification so your backend can parse and handle exceptions consistently.
              </p>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-slate-300 shadow-xl hover:border-slate-700 transition-colors">
                <div className="text-slate-500 pb-2 border-b border-slate-800">
                  Standard Error Response Body
                </div>
                <pre className="pt-3 text-[11px] leading-relaxed overflow-x-auto text-rose-300">
                  <code>{`{
  "success": false,
  "message": "Timestamp expired or signature mismatch"
}`}</code>
                </pre>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { code: '400', label: 'Invalid Request' },
                  { code: '401', label: 'Auth Failure' },
                  { code: '402', label: 'AML Rejected' },
                  { code: '403', label: 'Not Allowed' },
                ].map((item) => (
                  <div
                    key={item.code}
                    className="p-2.5 rounded-xl bg-white border border-line text-xs font-sans hover:border-violet-300 hover:shadow-2xs transition-all duration-200"
                  >
                    <span className="font-mono font-bold text-ink">{item.code}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function DeveloperCtaBanner() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <Reveal>
          <div className="rounded-3xl bg-brand-gradient p-8 sm:p-12 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center sm:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
                Ready to test in your browser?
              </h3>
              <p className="mt-2 text-sm text-white font-sans leading-relaxed">
                Explore the interactive Scalar/Swagger API reference at <span className="font-mono underline text-white font-medium">gpf-api.erstech-localserver.xyz/docs</span> with live endpoint schemas and sample requests.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              href={DOCS_URL}
              isExternal
              className="bg-white text-violet-900 hover:bg-violet-50 font-bold shrink-0 gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Open Interactive Docs</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
