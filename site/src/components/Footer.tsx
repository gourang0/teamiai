"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const footerLinks = {
  Company: [
    { label: "About", href: "/company/about" },
    { label: "Careers", href: "/company/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
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

interface GridNode {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
}

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseCoords = useRef({ x: 0, y: 0, active: false });
  const { theme } = useTheme();

  useEffect(() => {
    const footer = footerRef.current;
    const canvas = canvasRef.current;
    if (!footer || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let gridNodes: GridNode[] = [];
    const gridSpacing = 50;

    const configure = () => {
      const width = footer.clientWidth;
      const height = footer.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridNodes = [];
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;
          gridNodes.push({
            x,
            y,
            homeX: x,
            homeY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    configure();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      mouseCoords.current.x = e.clientX - rect.left;
      mouseCoords.current.y = e.clientY - rect.top;
      mouseCoords.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseCoords.current.active = false;
    };

    footer.addEventListener("mousemove", handleMouseMove);
    footer.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", configure);

    const run = () => {
      const width = footer.clientWidth;
      const height = footer.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Thin transparent grid lines
      const isDark = theme === "dark";
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.015)" : "rgba(11, 93, 72, 0.015)";
      ctx.lineWidth = 0.75;

      const mx = mouseCoords.current.x;
      const my = mouseCoords.current.y;
      const mActive = mouseCoords.current.active;
      const influenceRadius = 200;
      const maxPush = 28;
      const damping = 0.85;

      gridNodes.forEach((node) => {
        let targetX = node.homeX;
        let targetY = node.homeY;

        if (mActive) {
          const dx = node.homeX - mx;
          const dy = node.homeY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius) {
            // Pushing coordinates outward away from cursor
            const force = (influenceRadius - dist) / influenceRadius;
            const pushAmount = force * maxPush;
            const angle = Math.atan2(dy, dx);
            targetX = node.homeX + Math.cos(angle) * pushAmount;
            targetY = node.homeY + Math.sin(angle) * pushAmount;
          }
        }

        // Spring equations
        const ax = (targetX - node.x) * 0.08;
        const ay = (targetY - node.y) * 0.08;
        node.vx = (node.vx + ax) * damping;
        node.vy = (node.vy + ay) * damping;
        node.x += node.vx;
        node.y += node.vy;
      });

      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const idx = i * rows + j;
          const right = (i + 1) * rows + j;
          const bottom = i * rows + (j + 1);

          if (gridNodes[idx] && gridNodes[right] && i < cols - 1) {
            ctx.beginPath();
            ctx.moveTo(gridNodes[idx].x, gridNodes[idx].y);
            ctx.lineTo(gridNodes[right].x, gridNodes[right].y);
            ctx.stroke();
          }
          if (gridNodes[idx] && gridNodes[bottom] && j < rows - 1) {
            ctx.beginPath();
            ctx.moveTo(gridNodes[idx].x, gridNodes[idx].y);
            ctx.lineTo(gridNodes[bottom].x, gridNodes[bottom].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(run);
    };

    run();

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      footer.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", configure);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <footer ref={footerRef} className="border-t border-[var(--border-subtle)] bg-[var(--bg-alt)] mt-auto py-16 relative overflow-hidden select-none">
      {/* Interactive canvas grid */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80" />

      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 font-sans">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-[var(--text-primary)] select-none tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[var(--accent)]">t</span>eamify
          </Link>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[240px]">
            Intelligence, Engineered. Reimagining operational infrastructure with robust, minimal AI systems.
          </p>
        </div>

        {/* Link Groups */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title} className="flex flex-col gap-4 group/col">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--text-primary)] relative pb-2 w-fit">
              {title}
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--accent)] scale-x-0 group-hover/col:scale-x-100 transition-transform duration-300 origin-left" />
            </h4>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label} className="group/item w-fit">
                  <Link
                    href={link.href}
                    className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--accent)]/50 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 font-sans">
        <p className="text-[10px] font-mono text-[var(--text-muted)]">
          © {new Date().getFullYear()} Teamify. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
