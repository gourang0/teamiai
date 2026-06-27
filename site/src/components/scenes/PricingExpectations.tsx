"use client";

import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { GlowCard } from "@/components/GlowCard";

const pricingPlans = [
  {
    name: "Pilot Project (PoC)",
    price: "$5,000",
    period: "fixed price",
    duration: "2-4 Weeks Delivery",
    desc: "Designed to prove technical feasibility of a single core agentic workflow on your real data.",
    inclusions: [
      "Single AI agent prototype",
      "Sandbox simulation testing environment",
      "VPC installation feasibility report",
      "Basic REST API integration adapters",
    ],
    highlight: false,
    cta: "Initiate Pilot",
  },
  {
    name: "Enterprise Build",
    price: "$15,000",
    period: "starts at",
    duration: "4-8 Weeks Delivery",
    desc: "Complete design, custom development, and production deployment of multi-agent intelligence.",
    inclusions: [
      "Custom multi-agent workflows",
      "Private cloud VPC deployment (AWS/GCP)",
      "Local PII redactor & schema guardrails",
      "Legacy database custom connectors",
      "3 months post-launch system monitoring",
    ],
    highlight: true,
    cta: "Deploy Enterprise",
  },
  {
    name: "AI Retainer",
    price: "$3,000",
    period: "per month",
    duration: "Ongoing Optimization",
    desc: "Continuous system refinement, model drift checks, prompt tuning, and active support SLAs.",
    inclusions: [
      "Weekly token telemetry audits",
      "LLM version updates & model upgrades",
      "Prompt tuning for drift corrections",
      "Priority standby email/Slack SLA",
      "Dedicated developer hours monthly",
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
          <h2 className="section-title">Pricing & Packages</h2>
          <div className="divider" />
          <p className="section-desc">
            Clear, transparent structures shaped around business value. No surprises, no hidden API markups.
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
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-[8px] font-mono font-bold tracking-widest px-3 py-1 uppercase rounded-bl-lg select-none">
                  RECOMMENDED
                </div>
              )}

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                    {plan.name}
                  </h3>
                  <span className="text-[10px] text-[var(--accent-text)] font-mono font-bold block mt-1">
                    {plan.duration}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 border-b border-[var(--border-subtle)] pb-4">
                  <span className="text-4xl font-black text-[var(--text-primary)] font-display">
                    {plan.price}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">
                    / {plan.period}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed h-[60px]">
                  {plan.desc}
                </p>

                <div className="flex flex-col gap-3">
                  <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider font-bold">
                    What's Included:
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

              <div className="mt-8">
                <Link
                  href="/contact"
                  className={`btn btn-lg w-full justify-center text-xs font-mono font-bold flex items-center gap-2 cursor-pointer ${
                    plan.highlight
                      ? "btn-primary"
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
