"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Sun,
  Moon,
  Building2,
  Users,
  Briefcase,
  Cpu,
  Layers,
  BookOpen,
  Award,
  FlaskConical,
  ArrowRight,
  Phone,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./Magnetic";

// Services dropdown data
const servicesItems = [
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
];

// Navigation link groups — kept minimal
const navLinks = [
  { label: "Services", href: "/services", icon: Cpu },
  { label: "Solutions", href: "/services/ai-solutions", icon: Layers },
  { label: "Case Studies", href: "/resources/case-studies", icon: Award },
  { label: "About", href: "/company/about", icon: Building2 },
  { label: "Blog", href: "/resources/blog", icon: BookOpen },
  { label: "Careers", href: "/company/careers", icon: Briefcase },
  { label: "Research", href: "/resources/research", icon: FlaskConical },
];



export function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
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

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } },
    exit: { opacity: 0, y: -10 },
  };

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
          {/* Logo */}
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
            {/* Quick Link - Services with Dropdown */}
            <div
              className="relative hidden md:inline-block"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`px-4 py-1.5 text-xs font-mono font-medium rounded-full border transition-all duration-300 flex items-center gap-1 cursor-pointer bg-transparent ${
                  pathname.startsWith("/services") || isServicesOpen
                    ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)] text-[var(--accent-text)]"
                    : "border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>// SERVICES</span>
                <ChevronRight size={10} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-90" : ""}`} />
              </button>

              {/* Services Dropdown */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[var(--bg-primary)]/95 backdrop-blur-md border border-[var(--border-primary)] rounded-2xl p-3 shadow-xl z-50 flex flex-col gap-1"
                  >
                    {servicesItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--surface-elevated)] transition-colors duration-200 group/srv"
                      >
                        <div className="p-2 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] group-hover/srv:text-[var(--accent-text)] group-hover/srv:border-[var(--accent)]/45 transition-colors">
                          <sub.icon size={14} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[var(--text-primary)] group-hover/srv:text-[var(--accent-text)] transition-colors leading-tight">
                            {sub.label}
                          </span>
                          <span className="text-[9px] text-[var(--text-muted)] mt-1 leading-normal">
                            {sub.description}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Link - Playground */}
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

            {/* ★ Primary CTA — Book a Call */}
            <Magnetic range={40} strength={0.2}>
              <Link
                href="/contact"
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold font-mono transition-all duration-300 shadow-lg shadow-[var(--accent)]/25 hover:shadow-[var(--accent)]/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone size={12} />
                <span>Book a Call</span>
              </Link>
            </Magnetic>

            {/* EXPLORE_MENU Dropdown */}
            <div
              className="relative hidden md:inline-block"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
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
                  <span>{isMenuOpen ? "CLOSE_MENU" : "EXPLORE_MENU"}</span>
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

              {/* Explore Dropdown Panel */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-[300px] bg-[var(--bg-primary)]/95 backdrop-blur-md border border-[var(--border-primary)] rounded-2xl p-3 shadow-xl z-50 flex flex-col gap-3"
                  >

                    <div className="flex flex-col gap-1">
                      {[
                        { href: "/company/about", icon: Building2, label: "About Us" },

                        { href: "/resources/case-studies", icon: Award, label: "Case Studies" },
                        { href: "/resources/blog", icon: BookOpen, label: "Blog & News" },
                        { href: "/company/careers", icon: Briefcase, label: "Careers" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl bg-transparent hover:bg-[var(--surface-elevated)] transition-all duration-200 group/link"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-secondary)] group-hover/link:text-[var(--accent-text)] group-hover/link:border-[var(--accent)]/45 transition-colors">
                              <item.icon size={13} />
                            </div>
                            <span className="text-xs font-medium text-[var(--text-secondary)] group-hover/link:text-[var(--text-primary)] transition-colors">
                              {item.label}
                            </span>
                          </div>
                          <ChevronRight size={12} className="text-[var(--text-muted)] group-hover/link:translate-x-1 transition-transform opacity-0 group-hover/link:opacity-100" />
                        </Link>
                      ))}
                    </div>


                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
