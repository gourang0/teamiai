"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Landmark, Ship, BarChart3, GraduationCap, Factory } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

const industriesData = [
  {
    id: "finance",
    name: "Finance",
    icon: Landmark,
    code: "sys.finance_orchestrator",
    desc: "Automated underwriting, compliance monitoring, and risk analysis for institutions.",
    metric: "75% check reduction",
    useCases: [
      { title: "Underwriting Automation", detail: "Scans deeds and tax filings dynamically, outputting compliance scores." },
      { title: "Risk Orchestration", detail: "Routes transactions across multi-model anomaly sweeps under 20ms." },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Activity,
    code: "sys.clinical_processor",
    desc: "Secure data extraction, clinical document formatting, and HIPAA-compliant ingestion.",
    metric: "90m saved per shift",
    useCases: [
      { title: "Patient Intake Systems", detail: "Digitizes unstructured referral sheets, creating clean JSON records." },
      { title: "Clinical Summary Gen", detail: "Summarizes provider logs into HIPAA-compliant clinical cards." },
    ],
  },
  {
    id: "logistics",
    name: "Logistics",
    icon: Ship,
    code: "sys.routing_telemetry",
    desc: "Dynamic load coordination, shipping document parser, and dispatch routing optimization.",
    metric: "12% fuel optimization",
    useCases: [
      { title: "Dispatch Coordination", detail: "Matches load sizes to carrier capacity using transit maps." },
      { title: "Customs Doc Extraction", detail: "Extracts tax registration codes and line weights from scanned forms." },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: BarChart3,
    code: "sys.corp_automation",
    desc: "SOP audit checkers, procurement approval routing, and internal database indexes.",
    metric: "85% overhead reduction",
    useCases: [
      { title: "Procurement Approvals", detail: "Compares invoices against supply orders, flagging billing mismatches." },
      { title: "Manual Search indexing", detail: "Indexes internal wikis and slides, enabling semantic chat answers." },
    ],
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    code: "sys.grading_assistance",
    desc: "Automated grading checklists, course guideline mapping, and intake visa routing.",
    metric: "10k files mapped",
    useCases: [
      { title: "Curriculum Alignment", detail: "Matches syllabus content to state guidelines, flagging gaps." },
      { title: "Admissions routing", detail: "Answers complex student enrollment queries from regulatory handbooks." },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    code: "sys.telemetry_anomaly",
    desc: "QA vision checkpoints, motor telemetry monitors, and shift coordination engines.",
    metric: "0 exceptions logged",
    useCases: [
      { title: "QA Vision Inspection", detail: "Scans structural components for microscopic cracks using video logs." },
      { title: "Vibration telemetry logs", detail: "Flags machine rotation frequency drifts before hardware failures occur." },
    ],
  },
];

export function IndustryIntelligence() {
  const [activeTab, setActiveTab] = useState("finance");
  const currentIndustry = industriesData.find((ind) => ind.id === activeTab) || industriesData[0];
  const IconComponent = currentIndustry.icon;

  return (
    <section className="section bg-transparent border-y border-[var(--border-subtle)]">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">Deployments</span>
          <div className="flex flex-col md:flex-row items-baseline gap-3 mb-2 justify-center leading-none">
            <h2 className="section-title">Trusted across sectors</h2>
            <span className="text-[9px] font-mono text-[var(--accent-text)] border border-[var(--border-subtle)] px-2 py-0.5 rounded">
              [sys.target_verticals]
            </span>
          </div>
          <div className="divider" />
          <p className="section-desc">
            We adapt cognitive pipelines to meet the regulatory, security, and legacy database realities of your sector.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12 max-w-[900px] mx-auto">
          {industriesData.map((ind) => {
            const TabIcon = ind.icon;
            const isActive = activeTab === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveTab(ind.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm"
                    : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-primary)]"
                }`}
              >
                <TabIcon size={13} />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel (60/40 Asymmetrical Tilt Dashboard) */}
        <div className="max-w-[1000px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column (40% width): Description & Metric */}
              <div className="lg:col-span-5">
                <GlowCard className="glass-panel h-full flex flex-col justify-between p-8">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-6 select-none">
                      <span className="text-editorial-spec text-[8.5px]">{currentIndustry.code}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3 text-[var(--accent-text)] mb-4">
                      <IconComponent size={22} strokeWidth={1.5} />
                      <h3 className="text-2xl font-black text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                        {currentIndustry.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                      {currentIndustry.desc}
                    </p>
                  </div>
                  
                  {/* Micro telemetry metric */}
                  <div className="border-t border-[var(--border-subtle)] pt-4 mt-6">
                    <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-mono">Impact Factor</span>
                    <span className="text-xl font-bold text-[var(--accent-text)] tracking-tight font-mono">{currentIndustry.metric}</span>
                  </div>
                </GlowCard>
              </div>

              {/* Right Column (60% width): 3D Rotate Use Cases Preview */}
              <div className="lg:col-span-7">
                <div className="perspective-1000 h-full">
                  <motion.div
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: [15, 0] }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="card glass-panel h-full p-8 flex flex-col justify-center gap-6"
                  >
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-mono border-b border-[var(--border-subtle)] pb-3 select-none">
                      Core Operations Modules
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      {currentIndustry.useCases.map((uc, i) => (
                        <div
                          key={i}
                          className="p-5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex flex-col gap-2 transition-transform duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30"
                          style={{ transform: `translateZ(${(i + 1) * 15}px)` }}
                        >
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                            {uc.title}
                          </h4>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {uc.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
