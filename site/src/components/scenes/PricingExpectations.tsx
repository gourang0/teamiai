"use client";

import { Check, ArrowRight, Lightbulb, Blocks, Users } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/GlowCard";

const pricingPlans = [
  {
    name: "Pilot Project (PoC)",
    icon: Lightbulb,
    duration: "2-4 Weeks Prototype",
    desc: "Rapidly validate technical feasibility. We build a high-fidelity working agent prototype using your custom data to prove core ROI before full-scale development.",
    inclusions: [
      "Single custom agent prototype",
      "Real-data validation simulation",
      "Secure VPC feasibility audit",
      "Production integration blueprint",
    ],
    highlight: false,
    cta: "Initiate Pilot",
  },
  {
    name: "Enterprise System",
    icon: Blocks,
    duration: "6-12 Weeks Delivery",
    desc: "End-to-end design, custom development, and private cloud deployment of coordinated multi-agent orchestration layers built for scale.",
    inclusions: [
      "Custom multi-agent orchestrations",
      "VPC deployment (AWS, GCP, Azure)",
      "Local PII redaction & security guardrails",
      "Custom database & API connectors",
      "3 months post-launch systems monitoring",
    ],
    highlight: true,
    cta: "Deploy Enterprise",
  },
  {
    name: "Dedicated Retainer",
    icon: Users,
    duration: "Continuous Support",
    desc: "Dedicated allocation of senior machine learning engineers and architects integrated into your Slack and agile sprint cycles for roadmap scaling.",
    inclusions: [
      "Dedicated Senior ML Engineer(s)",
      "Fractional Lead Architect oversight",
      "Direct Slack & agile sprint integration",
      "Continuous prompt tuning & drift audit",
      "Priority response time SLA",
    ],
    highlight: false,
    cta: "Partner with Us",
  },
];

export function PricingExpectations() {
  return (
    <section id="pricing" className="section bg-transparent border-t border-[var(--border-subtle)] py-24">
      <div className="container mx-auto px-6 max-w-[1100px]">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">Engagement Models</span>
          <h2 className="section-title">How We Work Together</h2>
          <div className="divider" />
          <p className="section-desc">
            Flexible, results-driven collaboration frameworks tailored to your organization's technical complexity and business scale.
          </p>
        </div>

        {/* 3-Column Plan Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto items-stretch">
          {pricingPlans.map((plan, idx) => (
            <GlowCard
              key={idx}
              className={`glass-panel p-6 md:p-8 border rounded-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 h-full ${
                plan.highlight
                  ? "border-[var(--accent)] bg-[var(--accent-subtle-bg)]/20 shadow-lg scale-[1.01]"
                  : "border-[var(--border-subtle)] bg-[var(--surface-primary)]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {/* Header Container */}
                <div className="border-b border-[var(--border-subtle)] pb-5 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] text-[var(--accent-text)] rounded-xl w-fit">
                      <plan.icon size={16} />
                    </div>
                    {plan.highlight && (
                      <span className="bg-emerald-500/10 dark:text-emerald-400 text-[var(--accent-text)] border dark:border-emerald-500/20 border-[var(--accent)]/20 text-[8px] font-mono font-bold tracking-widest px-2.5 py-1 uppercase rounded select-none">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                      {plan.name}
                    </h3>
                    <span className="text-[10px] text-[var(--accent-text)] font-mono font-bold block mt-1">
                      {plan.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed min-h-[60px]">
                  {plan.desc}
                </p>

                {/* Inclusions */}
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">
                    Key Outcomes:
                  </span>
                  <ul className="flex flex-col gap-2">
                    {plan.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                        <Check size={12} className="text-[var(--accent-text)] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className={`btn btn-lg w-full justify-center text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all ${
                    plan.highlight
                      ? "btn-primary shadow-md"
                      : "btn-secondary border border-[var(--border-primary)] hover:border-[var(--accent)]"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
