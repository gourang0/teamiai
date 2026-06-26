"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Cpu,
  MessageSquare,
  Zap,
  Bot,
  BarChart3,
  Compass,
  CheckCircle2,
} from "lucide-react";

const capabilities = [
  {
    id: "vision",
    name: "Computer Vision Solutions",
    icon: Eye,
    shortDesc: "Detect, track, and analyze visual data in real time.",
    bullets: [
      "Object detection, recognition, and tracking in images & video",
      "Automated visual quality inspection on production lines",
      "OCR and structured data extraction from documents and images",
      "Real-time video analytics for security and operations",
    ],
  },
  {
    id: "models",
    name: "Custom AI Model Development",
    icon: Cpu,
    shortDesc: "Models built and trained for your exact use case.",
    bullets: [
      "Models trained and tuned for your exact business problem",
      "Classification, prediction, and recommendation systems",
      "Built on your own data — not a generic, one-size-fits-all model",
      "Ongoing retraining and monitoring as your data evolves",
    ],
  },
  {
    id: "conversational",
    name: "Conversational AI & Chatbots",
    icon: MessageSquare,
    shortDesc: "24/7 assistants for support, sales & engagement.",
    bullets: [
      "Multi-channel virtual assistants — web, WhatsApp, and voice",
      "Natural, on-brand conversations powered by modern LLMs",
      "Smart handoff to a human agent the moment it's needed",
      "Continuously improves from real conversation data",
    ],
  },
  {
    id: "automation",
    name: "Intelligent Process Automation",
    icon: Zap,
    shortDesc: "Automate workflows with AI-driven accuracy.",
    bullets: [
      "AI-augmented automation for documents and workflows",
      "Intelligent processing for invoices, forms, and contracts",
      "Fewer manual touchpoints, faster turnaround times",
      "Plugs into the systems your team already uses",
    ],
  },
  {
    id: "agents",
    name: "Custom AI Agents & Copilots",
    icon: Bot,
    shortDesc: "Purpose-built agents that work inside your existing tools and systems.",
    bullets: [
      "Autonomous executors that connect directly with databases & APIs",
      "Drafts emails, schedules operations, and updates spreadsheets",
      "Adheres strictly to compliance thresholds and logical guardrails",
      "Augments human workflow loops with reliable background processing",
    ],
  },
  {
    id: "analytics",
    name: "Data Analytics & Predictive Insights",
    icon: BarChart3,
    shortDesc: "Turn raw data into dashboards, forecasts, and decisions you can act on.",
    bullets: [
      "Advanced anomaly detection across operational logs",
      "Forecasting models to predict inventory restocks or resource loads",
      "Interactive data visualizations and reporting summaries",
      "Automated text-to-insights transformation pipelines",
    ],
  },
  {
    id: "consulting",
    name: "AI Strategy & Consulting",
    icon: Compass,
    shortDesc: "A clear, practical roadmap from first idea to measurable ROI.",
    bullets: [
      "Detailed feasibility studies matching business requirements to ML models",
      "Security audit scans checking compliance guidelines",
      "Technology stack selections and proof-of-concept modeling",
      "ROI mapping and deployment scale projections",
    ],
  },
];

export function CapabilityMatrix() {
  const [activeTab, setActiveTab] = useState("vision");
  const currentCapability = capabilities.find((cap) => cap.id === activeTab) || capabilities[0];
  const ActiveIcon = currentCapability.icon;

  return (
    <section id="services" className="section bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">WHAT WE OFFER</span>
          <h2 className="section-title">Our AI Services</h2>
          <div className="divider" />
          <p className="section-desc">
            Seven core capabilities, combined or standalone, tailored to your goals.
          </p>
        </div>

        {/* 60/40 Asymmetrical Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1100px] mx-auto items-stretch">
          {/* Left Column (Selector List - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {capabilities.map((cap) => {
              const CapIcon = cap.icon;
              const isActive = activeTab === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => setActiveTab(cap.id)}
                  className={`text-left p-4 rounded-xl border text-xs transition-all flex items-center gap-4 cursor-pointer ${
                    isActive
                      ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)] text-[var(--text-primary)] shadow-sm"
                      : "bg-[var(--surface-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-primary)]"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-muted)]"
                    }`}
                  >
                    <CapIcon size={16} />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-xs block">{cap.name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (Deep Dive Pane - 7 cols) */}
          <div className="lg:col-span-7">
            <div className="card glass-panel h-full p-8 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 text-[var(--accent-text)] mb-4 select-none">
                      <ActiveIcon size={22} strokeWidth={1.5} />
                      <span className="text-[10px] font-mono tracking-wider uppercase">SERVICE DEEP DIVE</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[var(--text-primary)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
                      {currentCapability.name}
                    </h3>
                    
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 border-b border-[var(--border-subtle)] pb-6">
                      {currentCapability.shortDesc}
                    </p>

                    {/* Specifications List */}
                    <div className="flex flex-col gap-3.5">
                      {currentCapability.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex gap-3 items-start text-xs text-[var(--text-secondary)]">
                          <CheckCircle2 size={14} className="text-[var(--accent)] mt-0.5 shrink-0" />
                          <span className="leading-relaxed">{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-[var(--border-subtle)] pt-4 mt-8 select-none font-mono text-[9px] text-[var(--text-muted)]">
                    STATUS: AVAILABLE FOR INTEGRATION
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
