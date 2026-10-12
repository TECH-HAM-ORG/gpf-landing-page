import React from 'react';
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Users,
  ScrollText,
  Server,
  ArrowRight,
  Hash,
  Clock,
  Code2,
} from 'lucide-react';
import { Container, Reveal } from '@/components/ui';

export function Security() {
  const securityControls = [
    {
      title: 'Signed API requests',
      description: 'HMAC-SHA256 with a strict 5-minute replay-prevention window.',
      icon: <KeyRound className="h-5 w-5 text-violet-300" />,
    },
    {
      title: 'Approved addresses only',
      description: 'Funds can only be dispatched to pre-verified destination wallets.',
      icon: <ShieldCheck className="h-5 w-5 text-violet-300" />,
    },
    {
      title: 'Withdrawal approval flow',
      description: 'Configurable multi-tier verification before any broadcast occurs.',
      icon: <CheckCircle2 className="h-5 w-5 text-violet-300" />,
    },
    {
      title: 'Role-based permissions',
      description: 'Granular access controls separated across company and merchant roles.',
      icon: <Users className="h-5 w-5 text-violet-300" />,
    },
    {
      title: 'Activity logs',
      description: 'Comprehensive audit trail for every status change and API call.',
      icon: <ScrollText className="h-5 w-5 text-violet-300" />,
    },
    {
      title: 'Secret keys stay on your server',
      description: 'Zero private key exposure; your server holds all signing authority.',
      icon: <Server className="h-5 w-5 text-violet-300" />,
    },
  ];

  return (
    <section id="security" className="py-20 sm:py-28 bg-dark-section relative overflow-hidden text-white">
      {/* Subtle background glow circles */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): Eyebrow, H2, Request Signing Mini Diagram */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-[13px] font-semibold mb-4 backdrop-blur-md font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                Security
              </div>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold font-display tracking-[-0.03em] text-white leading-[1.1]">
                Built so your money moves only where you allow.
              </h2>
            </Reveal>

            {/* Stylised "Request Signing" Mini Diagram Visual */}
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-sans">
                  <div className="flex items-center gap-2 text-violet-300 font-semibold">
                    <Code2 className="h-4 w-4" />
                    <span>HMAC-SHA256 Signing Pipeline</span>
                  </div>
                  <span className="text-xs text-slate-400 font-sans">5-min window</span>
                </div>

                {/* Input Parameters Stream */}
                <div className="mt-4 space-y-2 font-mono text-xs">
                  <div className="flex items-center justify-between bg-slate-900/60 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="h-3 w-3 text-violet-400" />
                      <span>timestamp</span>
                    </div>
                    <span className="text-slate-400">1728489600000</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900/60 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="text-violet-400 font-bold">METHOD</span>
                      <span>+ path</span>
                    </div>
                    <span className="text-violet-300">POST /api/company/withdrawal</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900/60 rounded-lg p-2 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Hash className="h-3 w-3 text-violet-400" />
                      <span>body hash</span>
                    </div>
                    <span className="text-slate-400">SHA256(payload)</span>
                  </div>
                </div>

                {/* Downward Transform Arrow */}
                <div className="flex items-center justify-center my-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/30 border border-violet-400/30 text-xs font-sans text-violet-200">
                    <span>Secret Key Hash</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Output HMAC Signature */}
                <div className="rounded-xl bg-violet-950/80 border border-violet-500/40 p-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-sans text-violet-300">
                      api-signature
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      e3b0c44298fc1c149afbf4c8...
                    </span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column (7 cols): 2x3 grid of glass cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityControls.map((control, idx) => (
                <Reveal key={control.title} delay={0.08 * idx}>
                  <div className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6 transition-all duration-300 hover:bg-white/10 hover:border-violet-400/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/40 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 mb-4 transition-transform duration-300 group-hover:scale-105">
                        {control.icon}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight">
                        {control.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {control.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
