"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Cpu, TrendingUp, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

const rolesData = [
  {
    id: "ops",
    title: "Operations Lead",
    subtitle: "Drowning in repetitive processing & email bottlenecks.",
    icon: Users,
    color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
    textToken: "text-blue-400",
    painPoints: [
      "Staff spending hours manually copying data from documents to ERP systems.",
      "High human error rates under peak transaction volumes.",
      "Support response times lagging due to large queues of simple queries.",
    ],
    solutions: [
      "Automated Document Processing (IDP) running custom OCR to parse invoices/forms under 5s.",
      "Intelligent Ticket Routing agents classifying email queries and auto-drafting replies.",
      "Sub-second sync adapters keeping databases and third-party SaaS tools aligned.",
    ],
  },
  {
    id: "tech",
    title: "Product & Tech Leader",
    subtitle: "Struggling to build reliable AI features with raw APIs.",
    icon: Cpu,
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
    textToken: "text-emerald-400",
    painPoints: [
      "Raw LLM calls return unstructured or erratic formats, breaking system code.",
      "Expensive API token billing from routing simple queries to giant models.",
      "Security compliance risks when sending sensitive customer data (PII) to LLMs.",
    ],
    solutions: [
      "Deterministic Schema Gateways validating model responses before code execution.",
      "Intelligent Model Routing forwarding simple requests to low-cost pipelines (e.g. Groq LLaMA).",
      "Built-in local PII scrubbers redacting emails, credit cards, and PII in real-time.",
    ],
  },
  {
    id: "ceo",
    title: "CEO & Founder",
    subtitle: "Seeking to scale operations and output without bloating headcount.",
    icon: TrendingUp,
    color: "from-amber-500/10 to-orange-500/10 border-amber-500/20",
    textToken: "text-amber-400",
    painPoints: [
      "Operational overhead scaling linearly with transaction volume.",
      "Losing competitive advantage due to slow product feature adaptation.",
      "Lack of clear, consolidated operational analytics on internal AI system usage.",
    ],
    solutions: [
      "Autonomous Agent Clusters executing background workflows (sales research, SOP verification).",
      "Custom intelligence portals giving teams instant semantic search across all internal data.",
      "Comprehensive telemetry dashboard displaying cost per query, latency, and success rates.",
    ],
  },
];

export function UseCasesByRole() {
  const [activeTab, setActiveTab] = useState("ops");
  const currentRole = rolesData.find((r) => r.id === activeTab) || rolesData[0];
  const IconComponent = currentRole.icon;

  return (
    <section id="use-cases" className="section bg-transparent border-t border-[var(--border-subtle)] py-24">
      <div className="container mx-auto px-6 max-w-[1100px]">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">Tailored Solutions</span>
          <h2 className="section-title">Use Cases by Role</h2>
          <div className="divider" />
          <p className="section-desc">
            See how custom AI systems address your role's specific bottlenecks and drive real business outcomes.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 md:gap-4 mb-12">
          {rolesData.map((role) => {
            const TabIcon = role.icon;
            const isActive = activeTab === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setActiveTab(role.id)}
                className={`px-5 py-3 rounded-xl border text-xs md:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)] text-[var(--text-primary)] shadow-md scale-[1.02]"
                    : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-primary)]"
                }`}
              >
                <TabIcon size={16} className={isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)]"} />
                <span>{role.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Panel */}
        <div className="max-w-[950px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlowCard className={`glass-panel p-6 md:p-10 border bg-gradient-to-br ${currentRole.color}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-[var(--border-subtle)] pb-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-2xl ${currentRole.textToken}`}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)] font-display">
                        {currentRole.title}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 font-mono">
                        {currentRole.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)] select-none">
                    <span>GATEWAY: ACTIVE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Left: Pain Points */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-rose-400 font-bold uppercase flex items-center gap-1.5">
                      <AlertCircle size={12} />
                      Current Bottlenecks
                    </span>
                    <ul className="flex flex-col gap-3">
                      {currentRole.painPoints.map((pain, i) => (
                        <li key={i} className="flex gap-3 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed">
                          <span className="text-rose-500/80 font-bold flex-shrink-0 mt-0.5">•</span>
                          <span>{pain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Solutions */}
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                      <CheckCircle2 size={12} />
                      Teamify AI Strategy
                    </span>
                    <ul className="flex flex-col gap-3">
                      {currentRole.solutions.map((sol, i) => (
                        <li key={i} className="flex gap-3 text-xs md:text-sm text-[var(--text-primary)] leading-relaxed">
                          <ChevronRight size={14} className="text-[var(--accent)] flex-shrink-0 mt-1" />
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
