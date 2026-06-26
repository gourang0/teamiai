"use client";

import { motion } from "framer-motion";
import { Check, Shield, Zap, Globe, Award } from "lucide-react";
import Link from "next/link";

const models = [
  {
    title: "Dedicated AI Team",
    code: "sys.allocation_dedicated",
    desc: "A fully staffed engineering pod focused exclusively on your company's product roadmap.",
    features: [
      "1x Lead Architect, 2-3x ML Engineers",
      "100% dedicated allocation",
      "Direct Slack & Teams integration",
      "Weekly delivery syncs",
      "Immediate onboarding",
    ],
    recommended: false,
    cta: "Secure a Dedicated Pod",
  },
  {
    title: "Team Augmentation",
    code: "sys.allocation_embed",
    desc: "Seamlessly integrate senior AI engineers directly into your current agile sprints.",
    features: [
      "Embed 1 to 3 senior engineers",
      "Flexible monthly duration",
      "Participate in daily standups",
      "Rapid tech stack alignment",
      "Direct code contributions",
    ],
    recommended: true,
    cta: "Augment Your Team",
  },
  {
    title: "Project-Based",
    code: "sys.allocation_fixed",
    desc: "Fixed-scope, milestone-driven engagements designed to construct specific infrastructure.",
    features: [
      "Defined SOW & milestones",
      "End-to-end delivery management",
      "Post-handover maintenance window",
      "Strict deadline SLA",
      "Fixed budget estimation",
    ],
    recommended: false,
    cta: "Scope Your Project",
  },
];

const advantages = [
  { icon: Shield, title: "Enterprise Security", desc: "Strict NDAs, data isolation guarantees, and secure SOC2-aligned coding pipelines." },
  { icon: Zap, title: "Rapid Onboarding", desc: "Engineers align with your codebase, API keys, and sprint schedules in under 72 hours." },
  { icon: Globe, title: "Global Talent Pool", desc: "Top-tier senior developers located across multiple time zones for continuous output." },
  { icon: Award, title: "Quality Guaranteed", desc: "Direct oversight by our system architects ensuring robust coding practices." },
];

export default function HiringModelsPage() {
  return (
    <div className="bg-gradient-subtle page-hiring-models min-h-screen">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Engagement Models</span>
            <h1 className="page-hero-title">Hiring Models</h1>
            <p className="page-hero-desc">
              Choose the engagement structure that aligns with your timeline, budget, and development capabilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Models Grid */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1100px] mx-auto items-stretch">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div
                  className={`card flex flex-col justify-between p-8 h-full relative hover:border-[var(--border-primary)] transition-all ${
                    model.recommended
                      ? "border-[var(--accent)] border-2 shadow-md"
                      : "border-[var(--border-subtle)]"
                  }`}
                >
                  {model.recommended && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--accent)] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm select-none">
                      Recommended
                    </span>
                  )}
                  <div>
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3 mb-4 select-none">
                      <span className="text-editorial-spec text-[8.5px]">{model.code}</span>
                      <span className="text-[9px] font-mono text-[var(--text-muted)]">[0{index + 1}]</span>
                    </div>

                    <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                      {model.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed mb-6 border-b border-[var(--border-subtle)] pb-6">
                      {model.desc}
                    </p>
                    <ul className="flex flex-col gap-4">
                      {model.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
                          <Check size={14} className="text-[var(--accent-text)] flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className={`btn w-full mt-8 py-3 text-center justify-center select-none ${
                      model.recommended ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {model.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 select-none">
            <span className="section-label">Why Teamify</span>
            <h2 className="section-title">The engineering advantage</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
            {advantages.map((adv, index) => (
              <div key={index} className="card flex flex-col gap-4">
                <div className="p-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg w-fit">
                  <adv.icon size={20} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
