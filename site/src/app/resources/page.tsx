"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const recentPosts = [
  { title: "The Future of AI Engineering", code: "pub.ai_eng_future", date: "Jun 15, 2026", duration: "8 min read", excerpt: "An evaluation of deterministic systems engineering versus prompt-driven workflows in enterprise automation." },
  { title: "Building Knowledge Systems at Scale", code: "pub.rag_scale_guidelines", date: "May 28, 2026", duration: "12 min read", excerpt: "Best practices for multi-agent chunking strategies and GraphRAG coordination frameworks." },
  { title: "AI Infrastructure That Scales", code: "pub.inf_concurrency_p99", date: "Apr 10, 2026", duration: "10 min read", excerpt: "Deploying secure, high-concurrency model routing pipelines with minimal execution latencies." },
];

const caseStudies = [
  { company: "Meridian Financial", industry: "Finance", code: "case.meridian", metric: "73% Speedup", desc: "Automated underwriters checklist audits, shifting manual review times from 3 days to under 4 hours." },
  { company: "NovaCare Health", industry: "Healthcare", code: "case.novacare", metric: "99.2% Accuracy", desc: "Ingested nurse shift records into patient clinical summaries with medical classification accuracy." },
  { company: "Atlas Logistics", industry: "Logistics", code: "case.atlas", desc: "Integrated dispatch routing APIs to schedule shipping loads dynamically across cargo fleets.", metric: "$2.1M Saved" },
];

export default function ResourcesHubPage() {
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
            <span className="section-label">Hub</span>
            <h1 className="page-hero-title">Resources</h1>
            <p className="page-hero-desc">
              Explore our technical writeups, enterprise case studies, and engineering guidelines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section bg-[var(--surface-primary)] border-t border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 max-w-[1050px]">
          <div className="flex justify-between items-end mb-12 select-none">
            <div className="flex flex-col gap-2">
              <span className="section-label">Insights</span>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>Latest Articles</h2>
            </div>
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group"
            >
              <span>View all articles</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="card glass-panel flex flex-col justify-between gap-4 h-full hover:border-[var(--border-primary)] transition-all">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center select-none border-b border-[var(--border-subtle)] pb-2 mb-2">
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        {post.date} • {post.duration}
                      </span>
                      <span className="text-[8px] font-mono text-[var(--accent-text)]">[{post.code}]</span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                      {post.title}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <Link
                    href="/resources/blog"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group mt-2 self-start select-none"
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

      {/* Case Studies Section */}
      <section className="section bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6 max-w-[1050px]">
          <div className="flex justify-between items-end mb-12 select-none">
            <div className="flex flex-col gap-2">
              <span className="section-label">Impact</span>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>Case Studies</h2>
            </div>
            <Link
              href="/resources/case-studies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group"
            >
              <span>View all case studies</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="card glass-panel flex flex-col justify-between gap-6 p-6 h-full hover:border-[var(--border-primary)] transition-all">
                  <div>
                    <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3 mb-4 select-none">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[var(--text-primary)]">
                          {study.company}
                        </span>
                        <span className="text-[8px] font-mono text-[var(--text-muted)]">[{study.code}]</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[var(--bg-secondary)] text-[var(--accent-text)] text-[9px] font-bold uppercase rounded-md border border-[var(--border-subtle)] font-mono">
                        {study.industry}
                      </span>
                    </div>
                    <span className="text-2xl font-extrabold text-[var(--accent-text)] tracking-tight font-mono">
                      {study.metric}
                    </span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-3">
                      {study.desc}
                    </p>
                  </div>
                  <Link
                    href="/resources/case-studies"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:text-[var(--accent-hover)] transition-colors group self-start select-none"
                  >
                    <span>View Case Details</span>
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
