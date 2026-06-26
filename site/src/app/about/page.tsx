"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Shield, Users, Cpu } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const values = [
  {
    icon: Eye,
    title: "Operational Clarity",
    code: "val.clarity",
    description: "We design AI systems that are deterministic and understandable, avoiding opaque black-box workflows.",
  },
  {
    icon: Shield,
    title: "Computational Calmness",
    code: "val.calmness",
    description: "Our technology should work quietly in the background without constant manual intervention or alerting noise.",
  },
  {
    icon: Users,
    title: "Ecosystem Thinking",
    code: "val.ecosystem",
    description: "We don't build isolated tools. We design pipelines that enhance and integrate with your existing software stack.",
  },
  {
    icon: Cpu,
    title: "Infrastructure-First",
    code: "val.infrastructure",
    description: "Models are only as good as the infrastructure serving them. We focus on reliable runtimes and clean pipelines first.",
  },
];

const timeline = [
  { year: "2022", title: "Company Founded", desc: "Teamify is launched as a specialized team of system architects and ML engineers." },
  { year: "2023", title: "Enterprise Scaling", desc: "Successfully deployed our first custom orchestration systems at global financial firms." },
  { year: "2024", title: "50+ Client Milestone", desc: "Expanded operations to support 50+ enterprise clients across healthcare, retail, and manufacturing." },
  { year: "2025", title: "Global Expansion", desc: "Transitioned to a remote-first, globally distributed team of experts building AI infrastructure." },
  { year: "2030", title: "The Next Era", desc: "Pioneering highly modular, autonomous operations networks that require zero maintenance." },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <div className="bg-gradient-subtle page-about min-h-screen">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Our Story</span>
            <h1 className="page-hero-title">About Teamify</h1>
            <p className="page-hero-desc">
              We are an intelligent systems company building the operational infrastructure of tomorrow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission (Varying scale editorial typography) */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 max-w-[850px] text-center flex flex-col items-center gap-6">
          <span className="text-editorial-spec text-[8.5px] select-none">
            [sys.mission_statement]
          </span>
          <p className="text-3xl md:text-5xl font-black text-[var(--text-primary)] leading-[1.1] tracking-tighter" style={{ fontFamily: "var(--font-display)" }}>
            &ldquo;Quiet, reliable intelligence.&rdquo;
          </p>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl">
            We engineer autonomous systems that handle complex background calculations, letting human teams focus on core design and logic architecture.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 select-none">
            <span className="section-label">Core Values</span>
            <h2 className="section-title">The principles that guide us</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
            {values.map((val, index) => (
              <div key={index} className="card glass-panel flex gap-5 items-start h-full hover:border-[var(--border-primary)] transition-all">
                <div className="p-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg flex-shrink-0">
                  <val.icon size={22} />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between select-none">
                    <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                      {val.title}
                    </h3>
                    <span className="text-[8px] font-mono text-[var(--text-muted)]">[{val.code}]</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline with SVG scroll line path */}
      <section ref={containerRef} className="section bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col items-center text-center mb-16 select-none">
            <span className="section-label">Milestones</span>
            <h2 className="section-title">Our evolution</h2>
            <div className="divider" />
          </div>

          {/* Timeline Wrapper */}
          <div className="max-w-[700px] mx-auto relative pl-10 md:pl-16">
            {/* SVG Scroll Line */}
            <div className="absolute left-[20px] md:left-[32px] top-4 bottom-8 w-[2px]">
              {/* Static background wire */}
              <div className="absolute inset-0 bg-[var(--border-subtle)]" />
              {/* Active scroll drawing line */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  style={{ pathLength }}
                />
              </svg>
            </div>

            {/* Timeline Milestones */}
            <div className="flex flex-col gap-10">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-6 md:gap-8 items-stretch group relative">
                  {/* Floating target dot indicator */}
                  <div className="absolute -left-[30px] md:-left-[43px] top-1 w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--border-primary)] flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform" />
                  </div>

                  <div className="pb-4 flex-1 flex flex-col gap-1.5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-black text-[var(--accent-text)] font-mono leading-none">
                        {item.year}
                      </span>
                      <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[var(--surface-primary)] border-t border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
            Want to build with us?
          </h2>
          <p className="text-xs text-[var(--text-secondary)] max-w-md">
            Check out our open roles or connect directly to learn how we integrate our team into your workflow.
          </p>
          <div className="flex gap-4 select-none">
            <Link href="/careers" className="btn btn-primary">
              View Careers
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
