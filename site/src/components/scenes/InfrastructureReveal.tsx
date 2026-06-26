"use client";

import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, TrendingUp, UserCheck } from "lucide-react";
import Link from "next/link";

const opportunityCards = [
  {
    icon: RefreshCw,
    title: "From manual to automated",
    desc: "Repetitive workflows handled by AI, freeing your team for higher-value work.",
  },
  {
    icon: TrendingUp,
    title: "From reactive to predictive",
    desc: "Spot trends and risks before they show up in a quarterly report.",
  },
  {
    icon: UserCheck,
    title: "From generic to personalized",
    desc: "Every customer interaction shaped by their own data and context.",
  },
];

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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="section bg-[var(--surface-primary)] border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1100px] mx-auto items-stretch"
        >
          {/* Left Column (Opportunity Info - 5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="section-label text-left">THE OPPORTUNITY</span>
              <h2 className="section-title text-left">Why AI, Why Now</h2>
              <div className="divider text-left" style={{ margin: "12px 0 24px" }} />
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              AI has moved from experimental to essential. Businesses that once treated it as a side project are now building it into daily operations — support, sales, ops, and decision-making.
            </p>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              The businesses pulling ahead aren&apos;t the ones with the most data — they&apos;re the ones turning that data into faster decisions, lighter workloads, and better customer experiences. That&apos;s where Teamify comes in.
            </p>

            <div className="mt-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group"
              >
                <span>Explore our capabilities</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column (Opportunity Cards - 7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-5 justify-center">
            {opportunityCards.map((card, index) => (
              <div
                key={index}
                className="card bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-6 rounded-xl flex gap-5 items-start transition-all hover:border-[var(--border-primary)]"
              >
                <div className="p-3 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg flex-shrink-0">
                  <card.icon size={22} strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                    {card.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
