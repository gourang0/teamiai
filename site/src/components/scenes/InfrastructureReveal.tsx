"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Layers, Zap } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { BorderBeam } from "@/components/BorderBeam";

interface BentoCardProps {
  metric: string;
  title: string;
  desc: string;
  className?: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const BentoCard: React.FC<BentoCardProps> = ({ metric, title, desc, className, icon: Icon }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden p-8 rounded-2xl bg-[var(--surface-primary)] backdrop-blur-md border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--border-primary)] flex flex-col justify-between h-[280px] ${className}`}
    >
      {/* Dynamic Cursor Edge Illumination */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(31, 169, 113, 0.07), transparent 70%)`,
        }}
      />
      
      {/* Dynamic Border Glow Mask */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl border border-emerald-500/20"
        style={{
          WebkitMaskImage: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, black, transparent 100%)`,
          maskImage: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, black, transparent 100%)`,
        }}
      />

      {/* Kinetic Border Beam */}
      <BorderBeam size={160} duration={10} colorFrom="#1FA971" colorTo="#3BD996" />

      {/* Card Contents */}
      <div className="flex flex-col gap-4 relative z-20">
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold">
            {metric}
          </span>
          <div className="p-2.5 bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] text-emerald-400 rounded-lg">
            <Icon size={18} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          {title}
        </h3>
      </div>

      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm relative z-20">
        {desc}
      </p>
    </div>
  );
};

export function InfrastructureReveal() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="section bg-transparent border-t border-[var(--border-subtle)] overflow-hidden py-24">
      <div className="container mx-auto px-6 max-w-[1100px]">
        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 select-none">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="section-label text-left">THE OPPORTUNITY // BENTO ANALYSIS</span>
            <h2 className="section-title text-left">Why AI, Why Now</h2>
            <div className="divider text-left" style={{ margin: "12px 0 0" }} />
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed mt-4 md:mt-0">
            Evaluating the shift from static code automation to multi-model agentic decision frameworks.
          </p>
        </div>

        {/* Asymmetric 3-Column Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 items-stretch"
        >
          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard
              metric="[METRIC_01]"
              title="Velocity Scales"
              desc="Accelerated core data parsing pipelines with multi-threaded execution loops."
              icon={Zap}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="md:col-span-1">
            <BentoCard
              metric="[METRIC_02]"
              title="Data Synergy"
              desc="Deep architectural layer model connections."
              icon={Layers}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="md:col-span-2">
            <BentoCard
              metric="[METRIC_03]"
              title="Automation"
              desc="Eliminating flat pipeline execution errors across localized agent instances."
              icon={Cpu}
            />
          </motion.div>
        </motion.div>

        {/* Footer Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group select-none"
          >
            <span>Explore our full capabilities matrix</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
export default InfrastructureReveal;
