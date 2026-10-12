import React from 'react';
import {
  Building2,
  Sliders,
  ShieldCheck,
  Users,
  ToggleRight,
  ScrollText,
  ArrowRight,
  ArrowDown,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Container, Button, Reveal } from '@/components/ui';

export function CompaniesFees() {
  const companyFeatures = [
    {
      title: 'One merchant per company',
      icon: <Building2 className="h-4 w-4 text-violet-600" />,
    },
    {
      title: 'Limits per company',
      icon: <Sliders className="h-4 w-4 text-violet-600" />,
    },
    {
      title: 'Roles and permissions',
      icon: <ShieldCheck className="h-4 w-4 text-violet-600" />,
    },
    {
      title: 'Sub-users',
      icon: <Users className="h-4 w-4 text-violet-600" />,
    },
    {
      title: 'Features on or off per company',
      icon: <ToggleRight className="h-4 w-4 text-violet-600" />,
    },
    {
      title: 'Support tickets and activity logs',
      icon: <ScrollText className="h-4 w-4 text-violet-600" />,
    },
  ];

  const feeModes = ['Percentage', 'Fixed', 'Network fee'];

  return (
    <section id="companies" className="py-20 sm:py-28 bg-white border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (7 cols): Eyebrow, H2, 6 compact tiles (2x3) */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-[13px] font-semibold mb-4 font-sans">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
                For companies
              </div>
              <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-bold font-display tracking-[-0.03em] text-ink leading-[1.1]">
                Onboard merchants and stay in control.
              </h2>
            </Reveal>

            {/* 6 Compact Feature Tiles (2x3 Grid) */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {companyFeatures.map((feat, idx) => (
                <Reveal key={idx} delay={0.08 * idx}>
                  <div className="group rounded-2xl border border-line bg-soft/60 p-4 transition-all duration-300 hover:bg-white hover:border-violet-200 hover:shadow-md hover:shadow-violet-900/5 flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 border border-violet-100/80 shrink-0 transition-transform duration-300 group-hover:scale-105">
                      {feat.icon}
                    </div>
                    <span className="text-sm font-semibold font-display text-ink leading-snug">
                      {feat.title}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Card "Transparent, configurable fees" */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-line bg-soft p-6 sm:p-8 shadow-card flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-md shadow-violet-500/20">
                      <Layers className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-violet-50 border border-violet-200/60 px-2.5 py-0.5 text-xs font-sans font-semibold text-violet-700">
                      Structure
                    </span>
                  </div>

                  <h3 className="mt-5 text-[22px] font-bold font-display tracking-tight text-ink">
                    Transparent, configurable fees
                  </h3>

                  {/* Layered Diagram: Company > Merchant (inherits) */}
                  <div className="mt-6 rounded-2xl border border-line bg-white p-4 shadow-xs space-y-2 font-sans">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-violet-50/70 border border-violet-100 text-xs">
                      <span className="font-bold text-violet-900">Company Account</span>
                      <span className="text-xs font-sans font-semibold text-violet-700 bg-white px-2 py-0.5 rounded-md border border-violet-200/60">
                        Master Level
                      </span>
                    </div>

                    <div className="flex items-center justify-center py-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-sans text-muted">
                        <ArrowDown className="h-3 w-3 text-violet-500" />
                        <span>inherits & overrides</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-line text-xs">
                      <span className="font-semibold text-slate-800">Merchant Entities</span>
                      <span className="text-xs font-sans text-slate-600 bg-white px-2 py-0.5 rounded-md border border-line">
                        Sub Account
                      </span>
                    </div>
                  </div>

                  {/* 3 Mode Chips */}
                  <div className="mt-5 font-sans">
                    <span className="text-[13px] font-sans font-semibold text-muted">
                      Fee Modes:
                    </span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {feeModes.map((mode) => (
                        <div
                          key={mode}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white border border-line px-3 py-1 text-xs font-medium font-sans text-ink shadow-2xs"
                        >
                          <CheckCircle2 className="h-3 w-3 text-violet-600 shrink-0" />
                          <span>{mode}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tiered-Withdrawal Bar Visual */}
                  <div className="mt-5 rounded-2xl border border-line bg-white p-4 font-sans">
                    <div className="flex items-center justify-between text-xs font-semibold text-ink mb-2.5">
                      <span>Tiered Withdrawal Structure</span>
                      <span className="text-xs font-sans text-muted">Volume-based</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs text-slate font-sans mb-1">
                          <span>Tier 1</span>
                          <span className="font-sans text-muted">Base</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-300 rounded-full w-2/5" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate font-sans mb-1">
                          <span>Tier 2</span>
                          <span className="font-sans text-muted">Mid</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-400 rounded-full w-3/5" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-slate font-sans mb-1">
                          <span>Tier 3</span>
                          <span className="font-sans text-muted">Volume</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-600 rounded-full w-4/5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sentence */}
                  <p className="mt-5 text-xs text-slate italic leading-relaxed">
                    Fees are configured per client.
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-6 pt-4 border-t border-line/70 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate">
                    Custom rates for your enterprise
                  </span>
                  {/* <Button variant="primary" size="sm" href="/contact">
                    <span>Talk to us</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button> */}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
