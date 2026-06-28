"use client";

import { Shield, Lock, EyeOff, FileCheck } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

const securityFeatures = [
  {
    icon: Lock,
    title: "Zero-Retention VPC Deployment",
    desc: "We deploy AI agent clusters directly in your secure virtual private cloud (AWS, Azure, or GCP). Your proprietary business data never leaves your network perimeter.",
  },
  {
    icon: EyeOff,
    title: "Local PII Redaction Engine",
    desc: "A built-in middleware scans every outgoing prompt, automatically masking names, emails, SSNs, and payment card details before forwarding payloads to external LLMs.",
  },
  {
    icon: Shield,
    title: "Deterministic Schema Guardrails",
    desc: "AI responses are checked in a validation loop against strict JSON schemas. If formatting drifts, the system auto-corrects it, preventing application runtime errors.",
  },
  {
    icon: FileCheck,
    title: "Compliance & Audit Logging",
    desc: "Every cognitive decision point generates structured, queryable access logs. We design and construct all custom systems following SOC2 Type II, HIPAA, and GDPR compliant architectures, ensuring your system audit trails remain fully secure.",
  },
];

export function SecurityTrust() {
  return (
    <section id="security" className="section bg-transparent border-t border-[var(--border-subtle)] py-24">
      <div className="container mx-auto px-6 max-w-[1100px]">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">Enterprise Shield</span>
          <h2 className="section-title">Trust & Security</h2>
          <div className="divider" />
          <p className="section-desc">
            Engineered to meet the safety, audit, and legacy database privacy requirements of highly regulated sectors.
          </p>
        </div>

        {/* 2x2 Grid of security cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[950px] mx-auto">
          {securityFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <GlowCard key={idx} className="glass-panel p-6 md:p-8 border border-[var(--border-subtle)] bg-[var(--surface-primary)] flex flex-col gap-4">
                <div className="p-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-xl w-fit border border-[var(--border-subtle)]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)] font-display">
                    {feat.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </GlowCard>
            );
          })}
        </div>

        {/* Footer trust badge */}
        <div className="mt-12 text-center select-none">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ENCRYPTION: AES-256 IN TRANSIT & AT REST</span>
          </div>
        </div>
      </div>
    </section>
  );
}
