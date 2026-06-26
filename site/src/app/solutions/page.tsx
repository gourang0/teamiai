"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Activity, Ship, BarChart3, GraduationCap, Factory, Shield, ShoppingBag } from "lucide-react";


const solutionsData = [
  {
    id: "finance",
    name: "Finance",
    icon: Landmark,
    code: "sys.fin_agent_v3",
    description: "Automated underwriting, compliance monitoring, and risk analysis for institutions.",
    useCases: [
      { title: "Underwriting Automation", desc: "Reduce mortgage processing time by 75% while maintaining compliance standards." },
      { title: "Risk Orchestration", desc: "Coordinate multi-model checks for real-time transaction security." },
      { title: "Portfolio Intelligence", desc: "Automate raw financial text digest and highlight portfolio exposure." },
      { title: "Audit Trail Gen", desc: "Automatically build clear documentation logs for regulatory audits." },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Activity,
    code: "sys.med_records_v4",
    description: "Secure data extraction, patient intake automation, and clinical workflow assistance.",
    useCases: [
      { title: "Patient Intake Systems", desc: "Digitize and validate patient records automatically upon check-in." },
      { title: "Clinical Summary Gen", desc: "Summarize unstructured nurse logs into standard provider reports." },
      { title: "Billing Code Mapping", desc: "Map diagnostic charts to correct medical billing codes instantly." },
      { title: "Schedule Optimization", desc: "Minimize provider downtime by analyzing scheduling patterns." },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: BarChart3,
    code: "sys.corp_workflows",
    description: "Workflow systems, cross-department automation, and operations dashboards.",
    useCases: [
      { title: "Procurement Approvals", desc: "Automate invoice matching and route approval checks automatically." },
      { title: "SOP Execution Pods", desc: "Embed AI agents that guide compliance checks on internal manuals." },
      { title: "Knowledge Extraction", desc: "Search thousands of slides and PDF archives through chat." },
      { title: "Customer Operations", desc: "Route complex incoming support cases to correct engineering pods." },
    ],
  },
  {
    id: "logistics",
    name: "Logistics",
    icon: Ship,
    code: "sys.fleet_telemetry",
    description: "Route planning optimization, supply chain analysis, and dispatch routing.",
    useCases: [
      { title: "Dispatch Coordination", desc: "Ingest load descriptions and assign optimal trucks autonomously." },
      { title: "Customs Doc Extraction", desc: "Extract shipping line numbers and tax details from scanned forms." },
      { title: "Route Cost Prediction", desc: "Evaluate real-time variables to quote accurate delivery costs." },
      { title: "Inventory Forecasting", desc: "Forecast demand patterns and warn before critical stockouts occur." },
    ],
  },
  {
    id: "retail",
    name: "Retail",
    icon: ShoppingBag,
    code: "sys.catalog_sync",
    description: "Demand forecasting, catalog enrichment, and automated inventory systems.",
    useCases: [
      { title: "Catalog Auto-Tagging", desc: "Extract attributes from vendor descriptions and write tags instantly." },
      { title: "Price Elasticity Models", desc: "Adjust pricing thresholds dynamically based on supply fluctuations." },
      { title: "Logistics Syncing", desc: "Automatically order fresh inventory once warehouse numbers slip." },
      { title: "Sentiment Summaries", desc: "Aggregate thousands of reviews daily into key feedback matrices." },
    ],
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    code: "sys.syllabus_map",
    description: "Personalized learning modules, grading assistance, and enrollment systems.",
    useCases: [
      { title: "Grading Assistance", desc: "Generate draft feedback on essays, highlighting code errors or syntax issues." },
      { title: "Curriculum Alignment", desc: "Map course material to district guidelines automatically." },
      { title: "Student Intake Help", desc: "Provide instant answers to complex admissions and visa requirements." },
      { title: "Access Translation", desc: "Convert educational content into accessible multilingual versions." },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    code: "sys.qa_checkpoint",
    description: "Quality assurance vision systems, preventative alert dashboards, and scheduling.",
    useCases: [
      { title: "QA Vision Inspection", desc: "Identify micro-fractures in metal parts using camera feeds." },
      { title: "Telemetry Anomaly Alerts", desc: "Flag vibration drift on rotary motors before actual system failure." },
      { title: "Supply Chain Matching", desc: "Match incoming material certs to production batch specifications." },
      { title: "Shift Optimization", desc: "Balance worker schedules with production line output expectations." },
    ],
  },
  {
    id: "government",
    name: "Government",
    icon: Shield,
    code: "sys.secure_redaction",
    description: "Secure data sanitization, document analysis, and public inquiries automation.",
    useCases: [
      { title: "Secure PII Scrubbing", desc: "Redact names, ID numbers, and sensitive text before public release." },
      { title: "Public Record Indexes", desc: "Index vast municipal archives, allowing data matching." },
      { title: "Permit Filing Assist", desc: "Check permit submissions for compliance before manual intake." },
      { title: "Asset Maintenance Sync", desc: "Sync city work reports to schedule road repairs autonomously." },
    ],
  },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState("finance");
  const currentSolution = solutionsData.find((sol) => sol.id === activeTab) || solutionsData[0];
  const IconComponent = currentSolution.icon;

  return (
    <div className="bg-gradient-subtle page-solutions min-h-screen">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Solutions</span>
            <h1 className="page-hero-title">Industry Solutions</h1>
            <p className="page-hero-desc">
              We deploy tailored intelligence systems engineered around the regulatory and operational realities of your industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Selector & Content (60/40 Bento Dashboard Layout) */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 max-w-[1100px]">
          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-[900px] mx-auto select-none">
            {solutionsData.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-full border transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === sol.id
                    ? "bg-[var(--accent)] border-[var(--accent)] text-white shadow-sm"
                    : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-primary)]"
                }`}
              >
                <sol.icon size={13} />
                <span>{sol.name}</span>
              </button>
            ))}
          </div>

          {/* Panel Display */}
          <div className="p-6 md:p-8 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Column (40% width): Industry Intro */}
                <div className="lg:col-span-4 flex flex-col justify-between p-4">
                  <div>
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-6 select-none">
                      <span className="text-editorial-spec text-[8.5px]">{currentSolution.code}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3 text-[var(--accent-text)] mb-4 select-none">
                      <IconComponent size={22} strokeWidth={1.5} />
                      <h3 className="text-2xl font-black text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                        {currentSolution.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {currentSolution.description}
                    </p>
                  </div>
                  <div className="text-[9px] font-mono text-[var(--text-muted)] border-t border-[var(--border-subtle)] pt-4 mt-6 select-none">
                    STATUS: READY_TO_DEPLOY
                  </div>
                </div>

                {/* Right Column (60% width): Use Case Cards with Tilt */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentSolution.useCases.map((uc, index) => (
                    <div key={index} className="p-5 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-lg h-full flex flex-col justify-between hover:border-[var(--border-primary)] transition-all">
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2 select-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                          {uc.title}
                        </h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {uc.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
