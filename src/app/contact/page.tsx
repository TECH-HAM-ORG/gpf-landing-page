'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { Navbar, Footer } from '@/components/sections';
import { Container, Button } from '@/components/ui';

const VOLUME_OPTIONS = [
  { value: '', label: 'Select estimated monthly volume' },
  { value: 'under-50k', label: 'Under $50,000 USD / month' },
  { value: '50k-250k', label: '$50,000 – $250,000 USD / month' },
  { value: '250k-1m', label: '$250,000 – $1,000,000 USD / month' },
  { value: 'over-1m', label: 'Over $1,000,000 USD / month (Enterprise)' },
] as const;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    monthlyVolume: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address.';
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      newErrors.company = 'Please enter your company or organization name.';
    }

    if (!formData.country.trim() || formData.country.trim().length < 2) {
      newErrors.country = 'Please enter your country.';
    }

    if (!formData.monthlyVolume) {
      newErrors.monthlyVolume = 'Please select your estimated monthly volume.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide details about your integration (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    if (formData.honeypot) {
      setIsSuccess(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.error || 'Failed to submit request. Please try again.');
        }
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 sm:py-24 bg-soft border-b border-line">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-100/80 text-violet-700 text-[13px] font-semibold mb-4 font-sans">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-600" />
              Institutional Onboarding
            </div>

            <h1 className="font-display text-[clamp(2.5rem,5.2vw,4.5rem)] font-extrabold tracking-[-0.035em] text-ink leading-[1.05]">
              Request Platform Access
            </h1>

            <p className="mt-4 text-base sm:text-[19px] text-[#475569] leading-[1.6] font-sans">
              Connect with our solutions team for customized API credentials, merchant account setup, and testnet integration access.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-line bg-white p-6 sm:p-10 shadow-card relative">
            {isSuccess ? (
              <div className="py-8 text-center space-y-5">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                </div>

                <h2 className="font-display text-2xl font-bold text-ink">
                  Access Request Received
                </h2>

                <p className="max-w-md mx-auto text-sm text-slate leading-relaxed">
                  Thank you for your submission. An integration manager will review your application and contact you at <strong className="text-ink">{formData.email}</strong> with sandbox credentials and setup instructions.
                </p>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        country: '',
                        monthlyVolume: '',
                        message: '',
                        honeypot: '',
                      });
                    }}
                  >
                    <span>Submit another request</span>
                  </Button>

                  <Button variant="outline" size="md" href="/">
                    <span>Return to overview</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot field (hidden from real users, traps automated bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {serverError && (
                  <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[13px] font-semibold text-slate-700 mb-2 font-sans"
                    >
                      Full Name <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Alex Morgan"
                      required
                      className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm text-ink placeholder-muted transition focus:outline-none focus:bg-white focus-visible:ring-2 ${
                        errors.name
                          ? 'border-rose-300 focus:border-rose-500 focus-visible:ring-rose-500/20'
                          : 'border-line focus:border-violet-500 focus-visible:ring-violet-500/20'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[13px] font-semibold text-slate-700 mb-2 font-sans"
                    >
                      Work Email <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      required
                      className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm text-ink placeholder-muted transition focus:outline-none focus:bg-white focus-visible:ring-2 ${
                        errors.email
                          ? 'border-rose-300 focus:border-rose-500 focus-visible:ring-rose-500/20'
                          : 'border-line focus:border-violet-500 focus-visible:ring-violet-500/20'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Company & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-[13px] font-semibold text-slate-700 mb-2 font-sans"
                    >
                      Company <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Global Ltd"
                      required
                      className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm text-ink placeholder-muted transition focus:outline-none focus:bg-white focus-visible:ring-2 ${
                        errors.company
                          ? 'border-rose-300 focus:border-rose-500 focus-visible:ring-rose-500/20'
                          : 'border-line focus:border-violet-500 focus-visible:ring-violet-500/20'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block text-[13px] font-semibold text-slate-700 mb-2 font-sans"
                    >
                      Country <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Brazil / Argentina / United Kingdom"
                      required
                      className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm text-ink placeholder-muted transition focus:outline-none focus:bg-white focus-visible:ring-2 ${
                        errors.country
                          ? 'border-rose-300 focus:border-rose-500 focus-visible:ring-rose-500/20'
                          : 'border-line focus:border-violet-500 focus-visible:ring-violet-500/20'
                      }`}
                    />
                    {errors.country && (
                      <p className="mt-1.5 text-xs text-rose-600">{errors.country}</p>
                    )}
                  </div>
                </div>

                {/* Monthly Volume Select */}
                <div>
                  <label
                    htmlFor="monthlyVolume"
                    className="block text-[13px] font-semibold text-slate-700 mb-2 font-sans"
                  >
                    Estimated Monthly Volume <span className="text-violet-600">*</span>
                  </label>
                  <select
                    id="monthlyVolume"
                    name="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm text-ink transition focus:outline-none focus:bg-white focus-visible:ring-2 ${
                      errors.monthlyVolume
                        ? 'border-rose-300 focus:border-rose-500 focus-visible:ring-rose-500/20'
                        : 'border-line focus:border-violet-500 focus-visible:ring-violet-500/20'
                    }`}
                  >
                    {VOLUME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.monthlyVolume && (
                    <p className="mt-1.5 text-xs text-rose-600">{errors.monthlyVolume}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[13px] font-semibold text-slate-700 mb-2 font-sans"
                  >
                    Message &amp; Integration Details <span className="text-violet-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your required blockchains, settlement corridors, or rollout timeline..."
                    required
                    className={`w-full rounded-xl border bg-soft px-4 py-3 text-sm text-ink placeholder-muted transition focus:outline-none focus:bg-white focus-visible:ring-2 ${
                      errors.message
                        ? 'border-rose-300 focus:border-rose-500 focus-visible:ring-rose-500/20'
                        : 'border-line focus:border-violet-500 focus-visible:ring-violet-500/20'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-rose-600">{errors.message}</p>
                  )}
                </div>

                {/* Privacy Assurance */}
                <div className="flex items-start gap-2.5 rounded-xl border border-line bg-soft p-3 text-xs text-slate">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-violet-600 mt-0.5" />
                  <span>
                    Your information is transmitted securely and used exclusively to assess onboarding eligibility and configure rate cards. By submitting, you agree to our{' '}
                    <Link href="/privacy" className="text-violet-700 underline font-medium hover:text-violet-900">
                      Privacy Policy
                    </Link>.
                  </span>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Validating &amp; Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Access Request</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
