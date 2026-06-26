"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    title: "The Future of AI Engineering",
    code: "pub.ai_eng_v1",
    category: "Engineering",
    date: "Jun 15, 2026",
    duration: "8 min read",
    excerpt: "An evaluation of deterministic systems engineering versus prompt-driven workflows in enterprise automation pipelines.",
  },
  {
    title: "Building Knowledge Systems at Scale",
    code: "pub.rag_scale_v4",
    category: "Systems",
    date: "May 28, 2026",
    duration: "12 min read",
    excerpt: "Best practices for multi-agent chunking strategies, metadata embedding schema, and GraphRAG coordination frameworks.",
  },
  {
    title: "AI Infrastructure That Scales",
    code: "pub.inf_scaling_v2",
    category: "Infrastructure",
    date: "Apr 10, 2026",
    duration: "10 min read",
    excerpt: "Deploying secure, high-concurrency model routing platforms and token rate-limit policies with low latency overhead.",
  },
  {
    title: "Operational Intelligence: A Primer",
    code: "pub.ops_intel_v1",
    category: "Operations",
    date: "Mar 05, 2026",
    duration: "6 min read",
    excerpt: "Re-engineering everyday enterprise workflows using stateful AI execution pods instead of fragile cron architectures.",
  },
  {
    title: "Document Intelligence in Practice",
    code: "pub.doc_intel_v3",
    category: "Systems",
    date: "Feb 18, 2026",
    duration: "9 min read",
    excerpt: "Parsing multi-page scanned invoice formats, extracting complex table schemas, and routing validations autonomously.",
  },
  {
    title: "The Rise of AI Agents",
    code: "pub.agent_rise_v1",
    category: "Engineering",
    date: "Jan 12, 2026",
    duration: "14 min read",
    excerpt: "A deep dive into self-correcting task executors, memory context loops, and multi-model coordination strategies.",
  },
];

export default function BlogListingPage() {
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
            <span className="section-label">Publications</span>
            <h1 className="page-hero-title">Blog</h1>
            <p className="page-hero-desc">
              Technical articles, system guides, and notes on production AI development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1050px] mx-auto">
            {blogPosts.map((post, index) => (
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
                        <span className="text-[10px] uppercase tracking-wider text-[var(--accent-text)] font-semibold font-mono">
                          {post.category}
                        </span>
                        <span className="text-[8px] font-mono text-slate-500">[{post.code}]</span>
                      </div>
                      <span className="text-[9px] text-[var(--text-muted)] font-mono font-medium">
                        {post.date} • {post.duration}
                      </span>
                    </div>
                    
                    <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      {post.title}
                    </h2>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group self-start mt-2 select-none"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
