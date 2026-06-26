"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─── Small info node data ─── */
const insideNodes = [
  { label: "NEURAL ENGINE", value: "Active", x: "12%", y: "18%" },
  { label: "THROUGHPUT", value: "2.4M req/s", x: "72%", y: "14%" },
  { label: "LATENCY", value: "0.8ms p99", x: "78%", y: "72%" },
  { label: "MODEL POOL", value: "12 Active", x: "8%", y: "75%" },
  { label: "UPTIME", value: "99.997%", x: "42%", y: "85%" },
];

const outsideStats = [
  { label: "AI Agents Deployed", value: "240+", x: "10%", y: "20%" },
  { label: "Client Satisfaction", value: "98.6%", x: "75%", y: "16%" },
  { label: "Avg. ROI Increase", value: "4.2×", x: "80%", y: "78%" },
  { label: "Integrations", value: "60+", x: "8%", y: "76%" },
  { label: "Data Processed", value: "18 PB", x: "44%", y: "88%" },
];

export const DeconstructingFacade: React.FC = () => {
  const boundsRef = useRef<HTMLDivElement | null>(null);
  const pathMaskRef = useRef<SVGCircleElement | null>(null);
  const [isPointerInBounds, setIsPointerInBounds] = useState(false);

  useEffect(() => {
    const bounds = boundsRef.current;
    if (!bounds) return;

    const computeLocalCoords = (e: MouseEvent) => {
      const area = bounds.getBoundingClientRect();
      const localX = e.clientX - area.left;
      const localY = e.clientY - area.top;

      if (pathMaskRef.current) {
        gsap.to(pathMaskRef.current, {
          attr: { cx: localX, cy: localY },
          duration: 0.12,
          ease: "power2.out",
        });
      }
    };

    const handlePointerEnter = () => {
      setIsPointerInBounds(true);
      if (pathMaskRef.current) {
        gsap.to(pathMaskRef.current, {
          attr: { r: 180 },
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const handlePointerLeave = () => {
      setIsPointerInBounds(false);
      if (pathMaskRef.current) {
        gsap.to(pathMaskRef.current, {
          attr: { r: 0 },
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    };

    bounds.addEventListener("mousemove", computeLocalCoords);
    bounds.addEventListener("mouseenter", handlePointerEnter);
    bounds.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      bounds.removeEventListener("mousemove", computeLocalCoords);
      bounds.removeEventListener("mouseenter", handlePointerEnter);
      bounds.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <section className="section bg-transparent py-16 px-6">
      <div className="container mx-auto max-w-[1100px]">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-10 select-none">
          <span className="section-label">02 // SIGNATURE CORE FEATURE</span>
          <h2 className="section-title">Deconstructing the Facade</h2>
          <div className="divider" />
          <p className="text-xs text-[var(--text-secondary)] max-w-lg mt-2 font-mono">
            Hover to peel back the polished surface and reveal the real-time
            engineering infrastructure running underneath.
          </p>
        </div>

        <div
          ref={boundsRef}
          className="relative w-full min-h-[520px] flex items-center justify-center overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-3xl cursor-none select-none"
        >
          {/* ═══════════════════════════════════════════════════
              LAYER 1 — OUTSIDE (default visible): Polished client-facing view
              ═══════════════════════════════════════════════════ */}
          <div className="absolute inset-0 z-[1]">
            {/* Soft gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)]/70 via-[var(--bg-primary)]/60 to-[var(--bg-secondary)]/70 backdrop-blur-[2px]" />

            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(59,217,150,0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Outside content — Clean, marketing-friendly */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#3BD996]/60 mb-3">
                What clients see
              </span>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)]/80 max-w-2xl leading-snug mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Seamless AI Solutions
              </h3>
              <p className="text-[13px] text-[var(--text-muted)] max-w-md leading-relaxed">
                A beautifully orchestrated interface that delivers intelligent
                automation, predictive insights, and real-time decision support.
              </p>
            </div>

            {/* Small scattered stat cards (outside) */}
            {outsideStats.map((stat, i) => (
              <div
                key={`outside-${i}`}
                className="absolute flex flex-col gap-0.5 pointer-events-none"
                style={{ left: stat.x, top: stat.y }}
              >
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-[#3BD996]/30">
                  {stat.label}
                </span>
                <span className="text-sm font-bold text-[var(--text-muted)]">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* ═══════════════════════════════════════════════════
              LAYER 2 — INSIDE (revealed by mask): Raw engineering substrate
              ═══════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 z-[2] pointer-events-none"
            style={{
              maskImage: "url(#substrate-reveal-mask)",
              WebkitMaskImage: "url(#substrate-reveal-mask)",
            }}
          >
            {/* Dark engineering background */}
            <div className="absolute inset-0 bg-[#030810]/80 backdrop-blur-[1px]" />

            {/* Precise engineering grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,245,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,245,255,0.4) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Secondary fine grid */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,245,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,245,255,0.5) 1px, transparent 1px)",
                backgroundSize: "7px 7px",
              }}
            />

            {/* Radial glow from cursor area */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,245,255,0.06), transparent 70%)",
              }}
            />

            {/* Central revealed content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#00f5ff]">
                  Infrastructure Live
                </span>
              </div>
              <h3
                className="text-xl sm:text-2xl md:text-3xl font-bold text-white max-w-2xl leading-snug mb-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Multi-Agent Orchestration Layer
              </h3>
              <p className="text-[13px] text-cyan-300/60 max-w-md leading-relaxed">
                Distributed AI agents running on GPU clusters, coordinating
                through event-driven pipelines with sub-millisecond latency.
              </p>
            </div>

            {/* Scattered engineering telemetry nodes (inside) */}
            {insideNodes.map((node, i) => (
              <div
                key={`inside-${i}`}
                className="absolute flex flex-col gap-0.5"
                style={{ left: node.x, top: node.y }}
              >
                <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-cyan-400/70">
                  {node.label}
                </span>
                <span className="text-sm font-bold text-[#00f5ff]">
                  {node.value}
                </span>
                {/* Small decorative connector line */}
                <div className="w-6 h-[1px] bg-gradient-to-r from-cyan-500/40 to-transparent mt-1" />
              </div>
            ))}

            {/* Decorative connection lines between nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15">
              <line x1="15%" y1="22%" x2="42%" y2="30%" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="75%" y1="18%" x2="55%" y2="35%" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="80%" y1="75%" x2="55%" y2="60%" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="12%" y1="78%" x2="42%" y2="65%" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1="44%" y1="88%" x2="50%" y2="65%" stroke="#00f5ff" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>

            {/* Circular orbit ring decoration */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <div
                className="w-[350px] h-[350px] rounded-full border border-cyan-500/40"
                style={{ animation: "spin 40s linear infinite" }}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              LAYER 3 — Mask edge ring (visible border of the reveal circle)
              ═══════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 z-[3] pointer-events-none"
            style={{
              maskImage: "url(#substrate-reveal-edge-mask)",
              WebkitMaskImage: "url(#substrate-reveal-edge-mask)",
            }}
          >
            <div className="absolute inset-0 border-[2px] border-cyan-500/30 rounded-full" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,245,255,0.1), transparent 60%)",
              }}
            />
          </div>

          {/* Hover hint (bottom center) */}
          <div
            className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-[4] flex items-center gap-2 transition-opacity duration-500 ${
              isPointerInBounds ? "opacity-0" : "opacity-60"
            }`}
          >
            <div className="w-5 h-5 rounded-full border border-[var(--border-subtle)] flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[var(--text-muted)]" />
            </div>
            <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase">
              Hover to reveal
            </span>
          </div>

          {/* ═══════════════════════════════════════════════════
              SVG Mask Definitions
              ═══════════════════════════════════════════════════ */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              {/* Main reveal mask */}
              <mask id="substrate-reveal-mask">
                <rect width="100%" height="100%" fill="black" />
                <circle
                  ref={pathMaskRef}
                  cx="-300"
                  cy="-300"
                  r="0"
                  fill="white"
                />
              </mask>
              {/* Edge ring mask (a thin ring around the reveal circle) */}
              <mask id="substrate-reveal-edge-mask">
                <rect width="100%" height="100%" fill="black" />
                <circle cx="-300" cy="-300" r="0" fill="white" stroke="white" strokeWidth="2" />
              </mask>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};
export default DeconstructingFacade;
