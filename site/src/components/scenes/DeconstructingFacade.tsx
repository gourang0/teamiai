"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const DeconstructingFacade: React.FC = () => {
  const boundsRef = useRef<HTMLDivElement | null>(null);
  const pathMaskRef = useRef<SVGCircleElement | null>(null);
  const [isPointerInBounds, setIsPointerInBounds] = useState(false);

  useEffect(() => {
    const bounds = boundsRef.current;
    if (!bounds) return;

    const computeLocalCoords = (e: MouseEvent) => {
      const area = bounds.getBoundingClientRect();
      // Translate global client screen coordinates to local layout vectors
      const localX = e.clientX - area.left;
      const localY = e.clientY - area.top;

      if (pathMaskRef.current) {
        gsap.to(pathMaskRef.current, {
          attr: { cx: localX, cy: localY },
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    const handlePointerEnter = () => {
      setIsPointerInBounds(true);
      if (pathMaskRef.current) {
        gsap.to(pathMaskRef.current, {
          attr: { r: 160 }, // Expand mask visual boundary on enter
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const handlePointerLeave = () => {
      setIsPointerInBounds(false);
      if (pathMaskRef.current) {
        gsap.to(pathMaskRef.current, {
          attr: { r: 0 }, // Collapse mask visual boundary on leave
          duration: 0.6,
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
    <section className="section bg-[#070708] py-16 px-6">
      <div className="container mx-auto max-w-[1100px]">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-10 select-none">
          <span className="section-label">02 // SIGNATURE CORE FEATURE</span>
          <h2 className="section-title">Deconstructing the Facade</h2>
          <div className="divider" />
          <p className="text-xs text-[var(--text-secondary)] max-w-lg mt-2 font-mono">
            Peeling back the consumer interface to expose production-grade data engineering models.
          </p>
        </div>

        <div
          ref={boundsRef}
          className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden bg-[#0a0a0c] border border-white/5 rounded-3xl p-12 cursor-none"
        >
          {/* Underlying complex vector system layer (visible only inside the mask) */}
          <div
            className="absolute inset-0 select-none pointer-events-none"
            style={{
              maskImage: "url(#substrate-reveal-mask)",
              WebkitMaskImage: "url(#substrate-reveal-mask)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#0c182c]" />
            
            {/* Procedural grid coordinates */}
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(to_right,#00f5ff_1px,transparent_1px),linear-gradient(to_bottom,#00f5ff_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            {/* Glowing schematic connections */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[450px] h-[450px] rounded-full border border-cyan-500/20 animate-pulse flex items-center justify-center">
                <div 
                  className="w-[300px] h-[300px] rounded-full border-2 border-dashed border-cyan-400/10 animate-spin" 
                  style={{ animationDuration: "30s" }} 
                />
              </div>
            </div>

            {/* Revealed state title text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400 mb-4">
                Substrate Architecture Active
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white max-w-4xl leading-tight font-display uppercase">
                LATENT ARCHITECTURES: INTERROGATING THE SILICON SUBSTRATE BENEATH
              </h1>
            </div>
          </div>

          {/* Top-level static text layer */}
          <div className="relative pointer-events-none z-10 flex flex-col justify-center items-center text-center px-6 mix-blend-screen">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">
              System Overview Mapping
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-gray-400 max-w-4xl leading-tight opacity-40 font-display uppercase">
              LATENT ARCHITECTURES: INTERROGATING THE SILICON SUBSTRATE BENEATH
            </h1>
          </div>

          {/* Responsive clip mask element definitions */}
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
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
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};
export default DeconstructingFacade;
