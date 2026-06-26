"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";

const partnerLogos = [
  "Acme Corp",
  "Initech",
  "Umbrella Corp",
  "Hooli",
  "Globex Corporation",
  "Vehement",
  "Soylent Corp",
  "Stark Industries",
];

export function HeroSignalBoot() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 bg-gradient-subtle overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col items-center text-center justify-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[850px] flex flex-col items-center gap-8"
        >
          {/* Brand header */}
          <motion.div
            variants={itemVariants}
            className="text-[11px] font-mono tracking-widest text-[var(--accent-text)] uppercase select-none"
          >
            T E A M I F Y
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Services Built to Move <br className="hidden sm:inline" />
            Your Business Forward
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-[var(--text-secondary)] max-w-[620px] leading-relaxed"
          >
            From intelligent automation to custom AI agents — practical, secure AI solutions designed around your goals, not the other way around.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
          >
            <Magnetic>
              <Link href="/services" className="btn btn-primary btn-lg justify-center w-full sm:w-auto">
                AI Capabilities Overview
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="btn btn-secondary btn-lg justify-center w-full sm:w-auto glass-panel">
                Start a Conversation
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Infinite Partners Carousel Slider */}
      <div className="w-full mt-20 overflow-hidden relative py-4 border-y border-[var(--border-subtle)] bg-[var(--bg-alt)]/30 backdrop-blur-sm">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        <div className="animate-infinite-slider flex gap-16 items-center">
          {partnerLogos.map((logo, idx) => (
            <span
              key={`logo-1-${idx}`}
              className="text-xs font-mono tracking-wider text-[var(--text-muted)] uppercase select-none opacity-60 hover:opacity-100 hover:text-[var(--accent-text)] transition-all"
            >
              {logo}
            </span>
          ))}
          {partnerLogos.map((logo, idx) => (
            <span
              key={`logo-2-${idx}`}
              className="text-xs font-mono tracking-wider text-[var(--text-muted)] uppercase select-none opacity-60 hover:opacity-100 hover:text-[var(--accent-text)] transition-all"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
