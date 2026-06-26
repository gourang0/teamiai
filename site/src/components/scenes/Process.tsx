"use client";

import { motion } from "framer-motion";
import { Search, Compass, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Discover",
    desc: "Understand your workflows, data, and where AI creates the most value.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Design",
    desc: "Map the right solution — chatbot, agent, automation, or analytics.",
  },
  {
    num: "03",
    icon: Cpu,
    title: "Build & Train",
    desc: "Develop and train the solution on your real data and use cases.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Deploy & Scale",
    desc: "Launch, measure results, and expand to new use cases over time.",
  },
];

export function Process() {
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
          <span className="section-label">OUR PROCESS</span>
          <h2 className="section-title">How We Work</h2>
          <div className="divider" />
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1100px] mx-auto relative"
        >
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-start gap-4 relative group"
              >
                {/* Step Indicator Header */}
                <div className="flex items-center justify-between w-full border-b border-[var(--border-subtle)] pb-3 select-none">
                  <span className="text-2xl font-black text-[var(--accent-text)] font-mono leading-none">
                    {step.num}
                  </span>
                  <div className="p-2 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg">
                    <StepIcon size={16} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
