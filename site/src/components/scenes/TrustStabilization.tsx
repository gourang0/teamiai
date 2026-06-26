"use client";

import { motion } from "framer-motion";
import { Layers, Database, Zap, ShieldCheck } from "lucide-react";

const differenceCards = [
  {
    icon: Layers,
    title: "End-to-End Delivery",
    desc: "Strategy, build, deployment, and support — all under one roof.",
  },
  {
    icon: Database,
    title: "Built Around Your Data",
    desc: "Custom solutions shaped by your business, not a generic template.",
  },
  {
    icon: Zap,
    title: "Fast, Iterative Builds",
    desc: "Working prototypes in weeks, refined together with your team.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI",
    desc: "Secure, transparent, and compliant by design — every step.",
  },
];

export function TrustStabilization() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="section bg-transparent border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="section-label">OUR DIFFERENCE</span>
          <h2 className="section-title">Why Teamify</h2>
          <div className="divider" />
        </div>

        {/* 4-column card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto"
        >
          {differenceCards.map((diff, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 rounded-xl flex flex-col gap-4 hover:border-[var(--border-primary)] transition-all"
            >
              <div className="p-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg w-fit">
                <diff.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                  {diff.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {diff.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
