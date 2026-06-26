"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Phone } from "lucide-react";
import Link from "next/link";

export function ConversionLayer() {
  return (
    <section className="section bg-transparent border-t border-[var(--border-subtle)] overflow-hidden">
      <div className="container mx-auto px-6 text-center max-w-[850px] flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Label */}
          <span className="section-label">LET&apos;S TALK AI</span>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.25] py-2" style={{ fontFamily: "var(--font-display)" }}>
            Let&apos;s Build Your <br />
            AI Advantage
          </h2>

          {/* Subtitle */}
          <p className="text-xs md:text-sm text-[var(--text-secondary)] max-w-[500px] leading-relaxed">
            Schedule a free AI readiness consultation and find out where AI can create the most value for your business.
          </p>

          <Link href="/contact" className="btn btn-primary btn-lg mt-2 select-none">
            Start Consultation
          </Link>
        </motion.div>

        {/* Contact details row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] mt-4 font-mono select-none"
        >
          <div className="flex flex-col items-center gap-2">
            <Mail size={16} className="text-[var(--accent-text)]" />
            <a href="mailto:connect@teamify.in" className="hover:text-[var(--accent-text)] transition-colors">
              connect@teamify.in
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-4 h-4 text-[var(--accent-text)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>&lt; 24h Review Guarantee</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Globe size={16} className="text-[var(--accent-text)]" />
            <span>Global Engineering</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
