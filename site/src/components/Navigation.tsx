"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
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
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Magnetic } from "./Magnetic";

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  description: string;
}

interface NavItem {
  label: string;
  href?: string;
  items?: DropdownItem[];
}

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Company",
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
  },
  {
    label: "Services",
    items: [
      {
        label: "Hiring Models",
        href: "/services/hiring-models",
        icon: UserPlus,
        description: "Build your AI team with Teamify",
      },
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
  },
  {
    label: "Resources",
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
  },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [hoveredRect, setHoveredRect] = useState<{ left: number; width: number } | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleDropdownEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  }, []);

  const isItemActive = useCallback(
    (item: NavItem) => {
      if (item.href) return pathname === item.href;
      if (item.items) return item.items.some((sub) => pathname.startsWith(sub.href));
      return false;
    },
    [pathname]
  );

  const handleHoverItem = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const textSpan = target.querySelector("span") || target;
    const rect = textSpan.getBoundingClientRect();
    const container = navContainerRef.current?.getBoundingClientRect();
    if (container) {
      setHoveredRect({
        left: rect.left - container.left,
        width: rect.width,
      });
    }
  };

  const handleMouseLeaveNav = () => {
    setHoveredRect(null);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center pointer-events-none ${
          isScrolled ? "pt-3 md:pt-4" : "pt-4 md:pt-6"
        }`}
      >
        <div
          className={`w-full max-w-[1100px] mx-4 px-6 py-2.5 rounded-full transition-all duration-300 flex items-center justify-between pointer-events-auto ${
            isScrolled
              ? "bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-subtle)] shadow-lg"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-semibold select-none group"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
              t
            </span>
            <span className="text-[var(--text-primary)]">eamify</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            ref={navContainerRef}
            onMouseLeave={handleMouseLeaveNav}
            className="hidden md:flex items-center gap-1 relative py-1"
          >
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.items && handleDropdownEnter(item.label)}
                onMouseLeave={() => item.items && handleDropdownLeave()}
              >
                {item.href ? (
                  <Magnetic range={40} strength={0.25}>
                    <Link
                      href={item.href}
                      onMouseEnter={handleHoverItem}
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-md block relative ${
                        isItemActive(item)
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </Magnetic>
                ) : (
                  <Magnetic range={40} strength={0.25}>
                    <button
                      onMouseEnter={handleHoverItem}
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-md flex items-center gap-1 cursor-pointer relative ${
                        isItemActive(item)
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      }`}
                      aria-expanded={activeDropdown === item.label}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </Magnetic>
                )}

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {item.items && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 p-2 glass-panel rounded-lg shadow-lg z-50"
                    >
                      <div className="flex flex-col gap-1">
                        {item.items.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`flex items-start gap-3 p-3 rounded-md transition-colors ${
                              pathname === sub.href
                                ? "bg-[var(--accent-subtle-bg)] text-[var(--accent-text)]"
                                : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="p-2 bg-[var(--bg-secondary)] rounded-md text-[var(--accent-text)]">
                              <sub.icon size={16} strokeWidth={2} />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold leading-tight">
                                {sub.label}
                              </div>
                              <div className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                                {sub.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {hoveredRect && (
              <motion.div
                className="absolute bottom-0 h-[2px] bg-[var(--accent)] pointer-events-none"
                initial={false}
                animate={{
                  left: hoveredRect.left,
                  width: hoveredRect.width,
                  opacity: 1,
                }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 pointer-events-auto">
            {/* Theme Toggle */}
            <Magnetic range={40} strength={0.3}>
              <button
                onClick={toggleTheme}
                className="p-2 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full transition-colors cursor-pointer bg-[var(--bg-primary)]/50"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </Magnetic>

            {/* CTA */}
            <Magnetic range={50} strength={0.25}>
              <Link href="/contact" className="btn btn-primary hidden md:inline-flex">
                Start Consultation
              </Link>
            </Magnetic>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md md:hidden transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-[var(--bg-primary)] border-l border-[var(--border-subtle)] z-40 p-6 pt-24 md:hidden overflow-y-auto flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={`block py-3 px-4 text-base font-medium rounded-md transition-colors ${
                          isItemActive(item)
                            ? "bg-[var(--accent-subtle-bg)] text-[var(--text-primary)]"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          onClick={() =>
                            setMobileAccordion(
                              mobileAccordion === item.label ? null : item.label
                            )
                          }
                          className={`w-full py-3 px-4 text-base font-medium rounded-md transition-colors flex items-center justify-between cursor-pointer ${
                            isItemActive(item)
                              ? "text-[var(--text-primary)]"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${
                              mobileAccordion === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileAccordion === item.label && item.items && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-[var(--bg-secondary)] rounded-md mt-1 ml-4"
                            >
                              <div className="py-2 flex flex-col">
                                {item.items.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="px-4 py-3 text-sm flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                  >
                                    <sub.icon size={16} />
                                    <span>{sub.label}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                <div className="flex items-center justify-between px-4 py-2 border border-[var(--border-subtle)] rounded-lg bg-[var(--bg-secondary)] select-none">
                  <span className="text-xs font-medium text-[var(--text-secondary)]">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full transition-colors cursor-pointer bg-[var(--bg-primary)]/50 flex items-center justify-center"
                    aria-label="Toggle theme"
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </button>
                </div>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn btn-primary w-full py-3 text-center justify-center"
                >
                  Start Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
