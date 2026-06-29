"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Zap,
  Brain,
  Search,
  FileText,
  Eye,
  GitBranch,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { HowItWorks } from "@/components/scenes/HowItWorks";


const services = [
  {
    icon: Bot,
    code: "sys.agent_orchestrator",
    title: "AI Agent Systems",
    metric: "99.4% success rate",
    description: "Self-correcting, stateful software agents that run complex, long-lived business processes independently.",
  },
  {
    icon: Zap,
    code: "io.event_trigger",
    title: "Intelligent Automation",
    metric: "delta <4ms",
    description: "Event-driven systems that link APIs, documents, and databases together with code logic, replacing manual tasks.",
  },
  {
    icon: Brain,
    code: "db.knowledge_graph",
    title: "Knowledge Systems",
    metric: "10k+ files indexed",
    description: "Multi-layered RAG pipelines, graph knowledge bases, and custom search indexes loaded with enterprise context.",
  },
  {
    icon: Search,
    code: "query.vector_index",
    title: "AI Search",
    metric: "142ms avg latency",
    description: "Advanced semantic search layers that parse jargon, synonyms, and natural query intent across legacy platforms.",
  },
  {
    icon: FileText,
    code: "doc.parser_engine",
    title: "Document Intelligence",
    metric: "4.2M docs processed",
    description: "Automated schema extraction, table parsing, and data validation from massive volumes of PDFs and images.",
  },
  {
    icon: Eye,
    code: "vision.telemetry_node",
    title: "Vision Systems",
    metric: "0 exceptions logged",
    description: "Visual analysis models deployed for quality control, industrial telemetry monitoring, or automated metadata labeling.",
  },
  {
    icon: GitBranch,
    code: "state.machine_sync",
    title: "Workflow Intelligence",
    metric: "100% trace coverage",
    description: "Optimized state-machines that coordinate handoffs and actions across multiple microservices and legacy databases.",
  },
  {
    icon: Shield,
    code: "sec.guardrails_v2",
    title: "AI Security & Governance",
    metric: "100% isolation",
    description: "Guardrails, prompt evaluation systems, cost limits, and security boundaries keeping models operating within compliance bounds.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gradient-subtle page-services min-h-screen">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Capabilities</span>
            <h1 className="page-hero-title">Our Services</h1>
            <p className="page-hero-desc">
              We design and construct production-grade AI systems, reliable data engines, and clean automation layers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1050px] mx-auto">
            {services.map((service, index) => (
              <div key={index} className="card glass-panel h-full flex flex-col justify-between p-8 hover:border-[var(--border-primary)] transition-all">
                <div>
                  <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-4 mb-6 select-none">
                    <span className="text-editorial-spec text-[8.5px]">{service.code}</span>
                    <span className="text-[9px] font-mono text-[var(--accent-text)]">[{service.metric}]</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg flex-shrink-0">
                      <service.icon size={22} />
                    </div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group mt-2 self-start select-none"
                >
                  <span>Inquire about this capability</span>
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* CTA */}
      <section className="section bg-[var(--bg-secondary)]">
        <div className="container mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            Ready to design your system?
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-md">
            Our engineers are ready to build a custom proof-of-concept showing how these capabilities fit your specific requirements.
          </p>
          <Link href="/contact" className="btn btn-primary select-none">
            Start Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
