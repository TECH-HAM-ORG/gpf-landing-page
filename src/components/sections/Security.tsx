import React from "react";
import { ShieldCheck } from "lucide-react";
import { Container, SectionHeading, FloatingCard } from "@/components/ui";
import { SECURITY } from "@/lib/content";

export function Security() {
  return (
    <section
      id="security"
      className="py-20 sm:py-24 bg-soft border-b border-line"
    >
      <Container>
        <SectionHeading
          badge="Security Architecture"
          title="Verified Security Controls"
          description="Cryptographic request verification, address whitelisting, and secure administrative controls."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SECURITY.map((item) => (
            <FloatingCard
              key={item}
              className="flex flex-col justify-between h-full p-6"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="mt-4 text-base font-bold text-ink">{item}</h3>
              </div>
              <div className="mt-4 pt-3 border-t border-line text-[11px] font-mono text-muted">
                Platform Security
              </div>
            </FloatingCard>
          ))}
        </div>
      </Container>
    </section>
  );
}
