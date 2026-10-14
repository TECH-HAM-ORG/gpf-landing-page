"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Container, Button } from "@/components/ui";

const DOCS_URL =
  process.env.NEXT_PUBLIC_DOCS_URL ||
  "https://gpf-app.erstech-localserver.xyz/api/user-api-docs#/overview";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Flows", href: "#flows" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Networks", href: "#networks" },
  { label: "Security", href: "#security" },
  { label: "Developers", href: "/developers" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll detection: > 12px activates backdrop blur & bottom border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver (only on homepage)
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = NAV_LINKS.filter((link) =>
      link.href.startsWith("#"),
    ).map((link) => link.href.replace("#", ""));
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev,
          );
          setActiveSection(topEntry.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);

  const closeDrawer = useCallback(() => {
    setMobileMenuOpen(false);
    toggleButtonRef.current?.focus();
  }, []);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [mobileMenuOpen]);

  // Esc key listener & Focus Trap for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements =
          drawerRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, closeDrawer]);

  // Focus drawer on open
  useEffect(() => {
    if (mobileMenuOpen && drawerRef.current) {
      const firstFocusable = drawerRef.current.querySelector<HTMLElement>(
        "button, [href], input",
      );
      firstFocusable?.focus();
    }
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-line shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Left: Logo & Wordmark */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 py-1"
          >
            <Image
              src="/globpayflow-favicon-transparent.svg"
              alt="GlobPayFlow"
              width={32}
              height={32}
              priority
              className="h-8 w-8 object-contain shrink-0"
            />
            <span className="text-xl sm:text-2xl font-bold font-display tracking-tight text-ink">
              Glob<span className="text-violet-600">PayFlow</span>
            </span>
          </Link>

          {/* Center Links (Anchor Scroll on Homepage / Cross-page Nav on Other Pages) */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isRoute = link.href.startsWith("/");
              const sectionId = link.href.replace("#", "");
              const isActive = isRoute
                ? pathname === link.href
                : isHomePage && activeSection === sectionId;
              const targetHref = isRoute
                ? link.href
                : isHomePage
                  ? link.href
                  : `/${link.href}`;

              const linkClasses = `px-3.5 py-1.5 text-sm font-medium font-sans rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                isActive
                  ? "text-violet-600 bg-violet-50 font-semibold"
                  : "text-slate hover:text-ink hover:bg-soft"
              }`;

              return isRoute || !isHomePage ? (
                <Link
                  key={link.href}
                  href={targetHref}
                  onClick={(e) => {
                    if (pathname === targetHref) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={linkClasses}
                >
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={targetHref} className={linkClasses}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right CTA: Documentation Button */}
          <div className="hidden sm:flex items-center">
            <Button
              variant="primary"
              size="sm"
              href={DOCS_URL}
              external
              className="rounded-full px-5 text-xs font-semibold font-display"
            >
              Documentation
            </Button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            ref={toggleButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-slate hover:text-ink lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </Container>

      {/* Mobile Drawer (Slide-in, Backdrop, Body Scroll Lock, Focus Trap, Esc to close) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* Slide-in Panel */}
          <div
            ref={drawerRef}
            tabIndex={-1}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between focus:outline-none animate-in slide-in-from-right duration-300"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-line">
                <Link
                  href="/"
                  onClick={closeDrawer}
                  className="flex items-center gap-2 rounded-lg"
                >
                  <Image
                    src="/globpayflow-favicon-transparent.svg"
                    alt="GlobPayFlow"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                  <span className="text-lg font-bold font-display tracking-tight text-ink">
                    Glob<span className="text-violet-600">PayFlow</span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={closeDrawer}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-slate hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <nav
                className="mt-6 flex flex-col space-y-1.5"
                aria-label="Mobile Navigation Links"
              >
                {NAV_LINKS.map((link) => {
                  const isRoute = link.href.startsWith("/");
                  const sectionId = link.href.replace("#", "");
                  const isActive = isRoute
                    ? pathname === link.href
                    : isHomePage && activeSection === sectionId;
                  const targetHref = isRoute
                    ? link.href
                    : isHomePage
                      ? link.href
                      : `/${link.href}`;

                  const linkClasses = `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-sans font-medium transition-colors ${
                    isActive
                      ? "bg-violet-50 text-violet-700 font-semibold"
                      : "text-ink hover:bg-soft"
                  }`;

                  return isRoute || !isHomePage ? (
                    <Link
                      key={link.href}
                      href={targetHref}
                      onClick={(e) => {
                        closeDrawer();
                        if (pathname === targetHref) {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className={linkClasses}
                    >
                      <span>{link.label}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-muted"
                        aria-hidden="true"
                      />
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={targetHref}
                      onClick={closeDrawer}
                      className={linkClasses}
                    >
                      <span>{link.label}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-muted"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Actions: Documentation Button */}
            <div className="pt-6 border-t border-line flex flex-col">
              <Button
                variant="primary"
                size="md"
                href={DOCS_URL}
                external
                onClick={closeDrawer}
                className="w-full text-sm font-semibold justify-center"
              >
                Documentation
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
