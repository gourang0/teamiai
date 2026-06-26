"use client";

import Link from "next/link";

const footerLinks = {
  Company: [
    { label: "About", href: "/company/about" },
    { label: "Clients", href: "/company/clients" },
    { label: "Careers", href: "/company/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Hiring Models", href: "/services/hiring-models" },
    { label: "AI Services", href: "/services/ai-services" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
  ],
  Resources: [
    { label: "Blog", href: "/resources/blog" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: "Research", href: "/resources/research" },
    { label: "Playground", href: "/playground" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-alt)] mt-auto py-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-2xl font-semibold text-[var(--text-primary)] select-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="text-[var(--accent)]">t</span>eamify
          </Link>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[240px]">
            Intelligence, Engineered. Reimagining operational infrastructure with robust, minimal AI systems.
          </p>
        </div>

        {/* Link Groups */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-4 group/col">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] relative pb-2 w-fit select-none">
              {title}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 scale-x-0 group-hover/col:scale-x-100 transition-transform duration-300 origin-left" />
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label} className="group/item w-fit">
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors relative"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-cyan-400/50 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} Teamify. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
