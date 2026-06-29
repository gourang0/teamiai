"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  ChevronRight,
  Sun,
  Moon,
  Building2,
  Users,
  Briefcase,
  UserPlus,
  Cpu,
  Layers,
  BookOpen,
  Award,
  FlaskConical,
  Activity,
  Terminal,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./Magnetic";

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
}

interface NavCategory {
  title: string;
  items: DropdownItem[];
}

const companyCategory: NavCategory = {
  title: "Company",
  items: [
    {
      label: "About",
      href: "/company/about",
      icon: Building2,
      description: "Mission, vision & innovation story",
    },
    {
      label: "Clients",
      href: "/company/clients",
      icon: Users,
      description: "Trust portfolio & testimonials",
    },
    {
      label: "Careers",
      href: "/company/careers",
      icon: Briefcase,
      description: "Build the future with us",
    },
  ],
};

const servicesCategory: NavCategory = {
  title: "Services",
  items: [
    {
      label: "AI Services",
      href: "/services/ai-services",
      icon: Cpu,
      description: "Agents, automation & intelligence",
    },
    {
      label: "AI Solutions",
      href: "/services/ai-solutions",
      icon: Layers,
      description: "Industry-specific implementations",
    },
  ],
};

const resourcesCategory: NavCategory = {
  title: "Resources",
  items: [
    {
      label: "Blog",
      href: "/resources/blog",
      icon: BookOpen,
      description: "Insights, articles & deep dives",
    },
    {
      label: "Case Studies",
      href: "/resources/case-studies",
      icon: Award,
      description: "Real-world project showcases",
    },
    {
      label: "Research",
      href: "/resources/research",
      icon: FlaskConical,
      description: "Innovation & AI experiments",
    },
  ],
};

export function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTelemetry, setActiveTelemetry] = useState(0);

  // Mock telemetry loop
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTelemetry((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const telemetryData = [
    { label: "Router Node", value: "active-edge-us" },
    { label: "Token Rate", value: "2.4k t/sec" },
    { label: "Core Latency", value: "14.2ms" },
    { label: "System Status", value: "operational" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${
          isScrolled
            ? "bg-[var(--bg-primary)]/85 backdrop-blur-lg border-b border-[var(--border-primary)] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_-5px_rgba(0,0,0,0.4)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className="w-full max-w-[1100px] mx-6 py-4 flex items-center justify-between pointer-events-auto"
        >
          {/* Logo & Status Combo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1 text-2xl sm:text-3xl font-bold select-none group font-display tracking-tight"
            >
              <span className="text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
                t
              </span>
              <span className="text-[var(--text-primary)]">eamify</span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Link - Playground (visible on lg screens) */}
            <Link
              href="/playground"
              className={`hidden md:inline-block px-4 py-1.5 text-xs font-mono font-medium rounded-full border transition-all duration-300 ${
                pathname === "/playground"
                  ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)] text-[var(--accent-text)]"
                  : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
              }`}
            >
              // PLAYGROUND
            </Link>

            {/* Theme Toggle */}
            <Magnetic range={30} strength={0.25}>
              <button
                onClick={toggleTheme}
                className="p-2 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-primary)] rounded-full transition-colors cursor-pointer bg-[var(--bg-primary)]/50 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </Magnetic>

            {/* High-Tech Menu Toggle Button */}
            <Magnetic range={40} strength={0.2}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`relative px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2.5 cursor-pointer text-xs font-mono font-bold select-none ${
                  isMenuOpen
                    ? "bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent"
                    : "bg-[var(--bg-secondary)] border-[var(--border-primary)] hover:border-[var(--accent)] text-[var(--text-primary)] shadow-sm"
                }`}
                aria-label="Toggle Navigation Menu"
              >
                <span>{isMenuOpen ? "CLOSE_MENU" : "SYS_MENU"}</span>
                <div className="flex flex-col gap-1 w-4 justify-center items-end">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 4, width: "16px" } : { rotate: 0, y: 0, width: "12px" }}
                    transition={{ duration: 0.2 }}
                    className={`h-[1.5px] rounded-full ${
                      isMenuOpen ? "bg-[var(--bg-primary)]" : "bg-[var(--text-primary)]"
                    }`}
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0, width: "16px" }}
                    transition={{ duration: 0.15 }}
                    className={`h-[1.5px] rounded-full ${
                      isMenuOpen ? "bg-[var(--bg-primary)]" : "bg-[var(--text-primary)]"
                    }`}
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: -4, width: "16px" } : { rotate: 0, y: 0, width: "8px" }}
                    transition={{ duration: 0.2 }}
                    className={`h-[1.5px] rounded-full ${
                      isMenuOpen ? "bg-[var(--bg-primary)]" : "bg-[var(--text-primary)]"
                    }`}
                  />
                </div>
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Fullscreen Bento Grid Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Bento Grid Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[540px] md:w-[680px] lg:w-[750px] bg-[var(--bg-primary)] border-l border-[var(--border-primary)] z-40 p-6 pt-28 md:p-10 md:pt-32 overflow-y-auto flex flex-col justify-between shadow-2xl"
            >
              {/* Bento Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                
                {/* Bento Card 1: Main Platform Services (Spans 4 cols on desktop) */}
                <div className="md:col-span-4 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] p-6 relative overflow-hidden group hover:border-[var(--accent)]/45 transition-colors duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="text-[10px] font-mono text-[var(--accent-text)] tracking-wider uppercase mb-4 flex items-center gap-1.5">
                    <Cpu size={11} />
                    <span>01 // ENGINE CAPABILITIES</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 font-display">Services</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {servicesCategory.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex flex-col p-4 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/60 hover:bg-[var(--surface-elevated)] transition-all duration-300 group/item hover:-translate-y-0.5"
                      >
                        <div className="p-2.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--accent-text)] w-fit mb-3 transition-colors group-hover/item:border-[var(--accent)]/40">
                          <sub.icon size={16} />
                        </div>
                        <span className="text-xs font-bold text-[var(--text-primary)] leading-tight group-hover/item:text-[var(--accent-text)] transition-colors">
                          {sub.label}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] mt-1.5 leading-relaxed">
                          {sub.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bento Card 2: Interactive Sandbox (Spans 2 cols on desktop) */}
                <Link
                  href="/playground"
                  className="md:col-span-2 rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--accent-subtle-bg)]/30 border border-[var(--border-subtle)] hover:border-[var(--accent)]/60 p-6 relative flex flex-col justify-between overflow-hidden group/playground transition-colors duration-300 cursor-pointer"
                >
                  <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[var(--accent)]/10 rounded-full blur-2xl pointer-events-none group-hover/playground:scale-125 transition-transform duration-500" />
                  <div>
                    <div className="text-[10px] font-mono text-[var(--accent-text)] tracking-wider uppercase mb-3 flex items-center gap-1.5">
                      <Terminal size={11} />
                      <span>02 // SANDBOX</span>
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 font-display">Playground</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      Test live routing, models, workflows, and token metrics.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between text-xs font-mono font-bold text-[var(--accent-text)] group-hover/playground:translate-x-1.5 transition-transform duration-300">
                    <span>LAUNCH_SANDBOX</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>

                {/* Bento Card 3: Company Ecosystem (Spans 3 cols on desktop) */}
                <div className="md:col-span-3 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] p-6 relative overflow-hidden group hover:border-[var(--accent)]/45 transition-colors duration-300">
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] tracking-wider uppercase mb-4 flex items-center gap-1.5">
                    <Building2 size={11} />
                    <span>03 // ECOSYSTEM</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 font-display">Company</h3>
                  <div className="flex flex-col gap-2">
                    {companyCategory.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 hover:bg-[var(--surface-elevated)] transition-all duration-300 group/link"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-[var(--bg-secondary)] rounded-md text-[var(--text-secondary)] group-hover/link:text-[var(--accent-text)] transition-colors">
                            <sub.icon size={13} />
                          </div>
                          <span className="text-xs font-medium text-[var(--text-secondary)] group-hover/link:text-[var(--text-primary)] transition-colors">
                            {sub.label}
                          </span>
                        </div>
                        <ChevronRight size={12} className="text-[var(--text-muted)] group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bento Card 4: Knowledge Hub (Spans 3 cols on desktop) */}
                <div className="md:col-span-3 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] p-6 relative overflow-hidden group hover:border-[var(--accent)]/45 transition-colors duration-300">
                  <div className="text-[10px] font-mono text-[var(--text-secondary)] tracking-wider uppercase mb-4 flex items-center gap-1.5">
                    <BookOpen size={11} />
                    <span>04 // PUBLISHED DATA</span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 font-display">Resources</h3>
                  <div className="flex flex-col gap-2">
                    {resourcesCategory.items.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="flex items-center justify-between p-3 rounded-xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] hover:border-[var(--accent)]/40 hover:bg-[var(--surface-elevated)] transition-all duration-300 group/link"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-[var(--bg-secondary)] rounded-md text-[var(--text-secondary)] group-hover/link:text-[var(--accent-text)] transition-colors">
                            <sub.icon size={13} />
                          </div>
                          <span className="text-xs font-medium text-[var(--text-secondary)] group-hover/link:text-[var(--text-primary)] transition-colors">
                            {sub.label}
                          </span>
                        </div>
                        <ChevronRight size={12} className="text-[var(--text-muted)] group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bento Card 5: Live Telemetry Indicator (Spans 3 cols on desktop) */}
                <div className="md:col-span-3 rounded-2xl bg-[var(--bg-secondary)]/30 border border-[var(--border-subtle)] p-5 relative overflow-hidden flex flex-col justify-between select-none">
                  <div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase mb-3 flex items-center gap-1.5">
                      <Activity size={11} />
                      <span>LIVE TELEMETRY MONITOR</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 my-2">
                      {telemetryData.map((tel, idx) => (
                        <div
                          key={tel.label}
                          className={`p-2.5 rounded-lg border font-mono transition-all duration-500 ${
                            idx === activeTelemetry
                              ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)]/40 shadow-sm"
                              : "bg-[var(--bg-primary)]/50 border-[var(--border-subtle)] opacity-70"
                          }`}
                        >
                          <div className="text-[9px] text-[var(--text-muted)] uppercase">{tel.label}</div>
                          <div className="text-[11px] font-bold text-[var(--text-primary)] mt-1 flex items-center gap-1.5">
                            {idx === activeTelemetry && (
                              <span className="h-1 w-1 bg-[var(--accent)] rounded-full animate-pulse" />
                            )}
                            {tel.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-[8px] font-mono text-[var(--text-muted)] mt-2 border-t border-[var(--border-subtle)] pt-2.5 flex items-center justify-between">
                    <span>NODES ACTIVE: 14/14</span>
                    <span>LOAD: OPTIMAL</span>
                  </div>
                </div>

                {/* Bento Card 6: Workforce Intake Form (Spans 3 cols on desktop) */}
                <Link
                  href="/contact"
                  className="md:col-span-3 rounded-2xl bg-[var(--text-primary)] border border-transparent hover:border-[var(--accent)] p-5 relative overflow-hidden flex flex-col justify-between group/intake transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/15 rounded-full blur-2xl pointer-events-none group-hover/intake:scale-125 transition-transform duration-500" />
                  
                  <div>
                    <div className="text-[9px] font-mono text-[var(--bg-primary)]/60 tracking-wider uppercase mb-3 flex items-center gap-1">
                      <Shield size={11} />
                      <span>SECURE PIPELINE // INTAKE</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--bg-primary)] font-display leading-snug">
                      Ready to Scale Your AI Agent Infrastructure?
                    </h3>
                  </div>

                  <div className="mt-4 flex items-center justify-between bg-[var(--bg-primary)]/10 group-hover/intake:bg-[var(--bg-primary)]/20 px-3.5 py-2 rounded-xl transition-colors duration-300">
                    <span className="text-[10px] font-mono font-bold text-[var(--bg-primary)]">
                      INITIATE_INTAKE
                    </span>
                    <Sparkles size={12} className="text-[var(--accent-highlight)]" />
                  </div>
                </Link>

              </div>

              {/* Bottom Quick Links / Branding */}
              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-[var(--text-muted)]">
                <div className="flex gap-4">
                  <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">
                    HOME
                  </Link>
                  <span>//</span>
                  <Link href="/playground" className="hover:text-[var(--text-primary)] transition-colors">
                    PLAYGROUND
                  </Link>
                  <span>//</span>
                  <Link href="/contact" className="hover:text-[var(--text-primary)] transition-colors">
                    CONTACT
                  </Link>
                </div>
                <span>© {new Date().getFullYear()} TEAMIFY CORP.</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
