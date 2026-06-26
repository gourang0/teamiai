"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine } from "lucide-react";

const papers = [
  {
    title: "Neural Architecture for Multi-Agent Systems",
    code: "paper.neural_multi_agent",
    status: "Active Research",
    statusType: "active",
    authors: "A. Vance, L. Thorne, S. Patel",
    abstract: "Proposing a state-routing graph model for multi-agent systems, prioritizing deterministic path selection and failover states during concurrent runs.",
  },
  {
    title: "Scalable Knowledge Graph Construction",
    code: "paper.knowledge_graph_scale",
    status: "Published",
    statusType: "published",
    authors: "S. Chen, R. Gomez",
    abstract: "Detailing chunk extraction frameworks using custom parser schemas to build reliable, searchable entity graphs from enterprise PDF logs.",
  },
  {
    title: "Efficient Document Understanding Models",
    code: "paper.doc_understanding_layout",
    status: "Published",
    statusType: "published",
    authors: "L. Thorne, J. Miller",
    abstract: "Methods for training token-efficient layout encoders, lowering layout analysis times by 40% while preserving optical character details.",
  },
  {
    title: "Real-time Anomaly Detection Framework",
    code: "paper.telemetry_anomaly_realtime",
    status: "Active Research",
    statusType: "active",
    authors: "P. Nair, K. Zhao",
    abstract: "Evaluating telemetry logs using lightweight encoder networks to flag system connection anomalies in under 5 milliseconds.",
  },
  {
    title: "Federated Learning for Enterprise AI",
    code: "paper.federated_learning_onprem",
    status: "Experimental",
    statusType: "experimental",
    authors: "A. Vance, S. Chen",
    abstract: "Mocking model updates across isolated data nodes, keeping proprietary data within on-premise partitions while syncing weights.",
  },
  {
    title: "Conversational AI Orchestration",
    code: "paper.conv_orchestration_state",
    status: "Published",
    statusType: "published",
    authors: "R. Gomez, L. Thorne",
    abstract: "Outlining state-machines that coordinate conversation turns, routing complicated user intents to correct specialist agents.",
  },
];

export default function ResearchPage() {
  const getBadgeClass = (type: string) => {
    switch (type) {
      case "published":
        return "bg-green-500/10 border-green-500/20 text-green-400";
      case "active":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "experimental":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      default:
        return "bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-muted)]";
    }
  };

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
            <span className="section-label">Research</span>
            <h1 className="page-hero-title">Research Papers</h1>
            <p className="page-hero-desc">
              Explore our technical publications, active research files, and architectural drafts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1050px] mx-auto">
            {papers.map((paper, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="card glass-panel flex flex-col justify-between gap-6 h-full hover:border-[var(--border-primary)] transition-all">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 select-none">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-[var(--text-muted)] font-mono leading-none">
                          {paper.authors}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500">[{paper.code}]</span>
                      </div>
                      <span className={`px-2 py-0.5 border text-[9px] font-bold uppercase rounded-md font-mono ${getBadgeClass(paper.statusType)}`}>
                        {paper.status}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      {paper.title}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {paper.abstract}
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors mt-2 self-start cursor-pointer select-none">
                    <ArrowDownToLine size={14} />
                    <span>Download Draft PDF</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
