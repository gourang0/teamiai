"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Magnetic } from "@/components/Magnetic";
import { HeroWaveBackground } from "@/components/HeroWaveBackground";
import { useTheme } from "@/components/ThemeProvider";



export function HeroSignalBoot() {
  const { theme } = useTheme();
  const waveTheme = theme === "dark" ? "matt" : "lightEmerald";

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
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 bg-transparent overflow-hidden">
      {/* Background overlay that fades at the bottom to transition to the grid */}
      <div className="absolute inset-0 bg-gradient-subtle-fade pointer-events-none" />

      {/* 3D Wave Background with custom design parameters */}
      <HeroWaveBackground 
        className="absolute inset-0 wave-mask-bottom"
        transparent={true}
        showControls={false}
        colorTheme={waveTheme}
        disableWave={false}
        flowSpeed={0.30}
        amp={0.50}
        pointSize={0.2}
        lineOpacity={0.14}
        camX={10.8}
        camY={16.8}
        camZ={40.0}
        fov={40}
        targetX={10.0}
        targetY={6.1}
        scale={1.70}
        orbitAmount={0.00}
        orbitSpeed={0.00}
        glowIntensity={0.00}
        glowThreshold={0.09}
        cursorStrength={0.18}
        cursorRadius={1.9}
        cursorRecovery={0.60}
      />
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
            Engineered AI Systems <br className="hidden sm:inline" />
            & Custom Agents
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-[var(--text-secondary)] max-w-[620px] leading-relaxed"
          >
            We design, build, and deploy production-ready AI agents and systems that integrate with your databases, APIs, and business workflows—delivering measurable outcomes, not just hype.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2"
          >
            <Magnetic>
              <Link href="/#services" className="btn btn-primary btn-lg justify-center w-full sm:w-auto">
                Explore Capabilities
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="btn btn-secondary btn-lg justify-center w-full sm:w-auto glass-panel">
                Schedule Consultation
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
