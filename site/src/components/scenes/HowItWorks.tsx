"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Cpu, ArrowRight, ShieldCheck, Zap, Layers } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

const lifecycleSteps = [
  {
    step: "01",
    label: "Ingestion",
    title: "Secure Ingestion Gateway",
    icon: FileText,
    desc: "Unstructured data—like document uploads, emails, database logs, and API payloads—enters our secure routing layer.",
    details: "Supports batch processing, real-time webhooks, and secure cloud storage adapters (S3, GCS, local VPC folders).",
  },
  {
    step: "02",
    label: "Routing",
    title: "Cognitive Complexity Evaluation",
    icon: Layers,
    desc: "Our router evaluates the task's language structure, logic level, and context length to determine the best model path.",
    details: "If the task is simple data entry, it routes to high-speed pipelines. For advanced reasoning/math, it selects large-reasoning networks.",
  },
  {
    step: "03",
    label: "Execution",
    title: "Orchestrated Model Execution",
    icon: Cpu,
    desc: "The payload is sent to specialized APIs or localized instances. We balance calls across Groq, Anthropic, and OpenAI.",
    details: "Uses multi-threaded fallbacks. If Groq encounters rate limits, the system auto-shifts execution to standby APIs under 50ms.",
  },
  {
    step: "04",
    label: "Compliance",
    title: "Safety & Schema Auditing",
    icon: ShieldCheck,
    desc: "Built-in local validation scripts scan the model's text outputs to scrub PII and confirm it matches your database schema.",
    details: "Automatically redacts credit cards, emails, SSNs, and flags any formatting syntax mismatches before execution.",
  },
  {
    step: "05",
    label: "Action",
    title: "Downstream System Action",
    icon: Zap,
    desc: "The verified response triggers actions in your target tools—updating your CRM, writing to SQL database, or alerting Slack.",
    details: "Outputs strictly structured JSON data formats, ensuring compatibility with legacy enterprise codebases and webhooks.",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = lifecycleSteps[activeStep];
  const IconComponent = currentStep.icon;

  return (
    <section id="how-it-works" className="section bg-transparent border-t border-[var(--border-subtle)] py-24">
      <div className="container mx-auto px-6 max-w-[1100px]">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">PROCESS BLUEPRINT</span>
          <h2 className="section-title">How It Works</h2>
          <div className="divider" />
          <p className="section-desc">
            A step-by-step breakdown of how our secure, multi-model execution loop processes your data.
          </p>
        </div>

        {/* Stepper Timeline & Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-[1000px] mx-auto">
          {/* Left Column (Stepper Selector - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {lifecycleSteps.map((item, idx) => {
              const StepIcon = item.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isActive
                      ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)] text-[var(--text-primary)]"
                      : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-primary)]"
                  }`}
                >
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center font-mono text-[11px] font-black ${
                      isActive ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                    }`}
                  >
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-xs block leading-tight">{item.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)] mt-0.5 block truncate max-w-[200px]">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight size={13} className={`transition-transform duration-300 ${isActive ? "translate-x-1 text-[var(--accent)]" : "text-transparent"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column (Interactive Card Reveal - 7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <GlowCard className="glass-panel p-8 md:p-10 h-full flex flex-col justify-between border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30">
                  <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-xl">
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-[var(--accent-text)] font-black tracking-widest uppercase">
                            STAGE {currentStep.step} // LIFECYCLE
                          </span>
                          <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] font-display leading-tight mt-0.5">
                            {currentStep.title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-2xl font-black text-[var(--border-primary)] font-mono">
                        {currentStep.step}
                      </span>
                    </div>

                    {/* Desc */}
                    <p className="text-xs md:text-sm text-[var(--text-primary)] leading-relaxed font-sans">
                      {currentStep.desc}
                    </p>

                    {/* Deep details block */}
                    <div className="p-4 rounded-xl bg-[var(--bg-primary)]/60 border border-[var(--border-subtle)] font-mono">
                      <span className="text-[8.5px] text-[var(--accent-text)] tracking-wider block mb-1.5 uppercase font-bold">
                        [System Implementation Spec]
                      </span>
                      <p className="text-[10.5px] text-[var(--text-secondary)] leading-relaxed">
                        {currentStep.details}
                      </p>
                    </div>
                  </div>

                  {/* Micro timeline visualizer */}
                  <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-[9px] font-mono text-[var(--text-muted)] select-none">
                    <span>GATEWAY_STATUS: OPTIMAL</span>
                    <span>PIPELINE_STABILITY: 100%</span>
                  </div>
                </GlowCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
