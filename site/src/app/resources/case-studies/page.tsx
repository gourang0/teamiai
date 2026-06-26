"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const cases = [
  {
    company: "Meridian Financial",
    code: "case.meridian_fin",
    industry: "Finance",
    headline: "Reduced mortgage compliance review times by 73%.",
    metric: "73% Faster",
    challenge: "Loan underwriting checklists required manual document reviews spanning multiple database silos, delaying customer mortgage approvals to an average of 3 business days.",
    solution: "Deployed a dedicated AI Agent pod to parse incoming deeds and credit filings, matching parameters to compliance rules autonomously and flagging only exceptions.",
    results: ["Intake timeline reduced to 4 hours", "Document matching accuracy rated at 99.4%", "Auditable checklist trace logs generated automatically"],
  },
  {
    company: "NovaCare Health",
    code: "case.novacare_health",
    industry: "Healthcare",
    headline: "Ingested nurse shift logs into patient profiles.",
    metric: "99.2% Accurate",
    challenge: "Hospital providers spent over 2 hours per shift converting unstructured nursing notes into formal electronic health records (EHR) formats.",
    solution: "Designed a secure local RAG framework that maps shorthand nursing jargon to standardized clinical terminology guidelines before uploading profiles.",
    results: ["Saved 90 minutes per provider shift", "Eliminated transcription encoding errors", "Fully compliant HIPAA-isolated execution environment"],
  },
  {
    company: "Atlas Logistics",
    code: "case.atlas_logistics",
    industry: "Logistics",
    headline: "Optimized route dispatch telemetry flows.",
    metric: "$2.1M Saved",
    challenge: "Dispatch routing did not dynamically adjust to port wait delays or container temperature swings, leading to load spoilage and extra mileage charges.",
    solution: "Built an event-driven automation framework that monitors active fleet telemetry and dynamically updates route legs.",
    results: ["Reduced fleet mileage by 12%", "Saved $2.1M in fuel and spoilage costs", "Real-time dispatch dashboard for operators"],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-gradient-subtle page-resources min-h-screen">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Case Studies</span>
            <h1 className="page-hero-title">Impact Portfolio</h1>
            <p className="page-hero-desc">
              Real-world engineering implementations showing how we help enterprises optimize core operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 flex flex-col gap-16 max-w-[950px]">
          {cases.map((cs, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card glass-panel p-8 md:p-10 flex flex-col gap-8 h-full hover:border-[var(--border-primary)] transition-all">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 select-none flex-wrap">
                      <span className="text-editorial-spec text-[8.5px] font-semibold">
                        {cs.company} • {cs.industry}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">[{cs.code}]</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                      {cs.headline}
                    </h2>
                  </div>
                  <div className="px-5 py-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] text-2xl font-extrabold tracking-tight rounded-xl border border-[var(--accent)]/10 text-center flex-shrink-0 self-start sm:self-auto font-mono select-none">
                    {cs.metric}
                  </div>
                </div>

                {/* Challenge / Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[var(--text-primary)] text-sm select-none" style={{ fontFamily: "var(--font-display)" }}>
                      The Challenge
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      {cs.challenge}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[var(--text-primary)] text-sm select-none" style={{ fontFamily: "var(--font-display)" }}>
                      Our Solution
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      {cs.solution}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 rounded-lg flex flex-col gap-4">
                  <h3 className="font-bold text-[var(--text-primary)] text-xs uppercase tracking-wider font-mono select-none">
                    Key Metrics Achieved
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {cs.results.map((res, i) => (
                      <li key={i} className="flex gap-3 text-xs text-[var(--text-secondary)]">
                        <Check size={14} className="text-[var(--accent-text)] flex-shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group self-start select-none"
                >
                  <span>Inquire about case specifics</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
