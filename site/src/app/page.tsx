"use client";

import { useEffect } from "react";
import { SpaceOrbsBackground } from "@/components/SpaceOrbsBackground";
import { HeroSignalBoot } from "@/components/scenes/HeroSignalBoot";
import { InfrastructureReveal } from "@/components/scenes/InfrastructureReveal";
import { CapabilityMatrix } from "@/components/scenes/CapabilityMatrix";
import { UseCasesByRole } from "@/components/scenes/UseCasesByRole";
import { SecurityTrust } from "@/components/scenes/SecurityTrust";
import { PricingExpectations } from "@/components/scenes/PricingExpectations";
import { TrustStabilization } from "@/components/scenes/TrustStabilization";
import { Process } from "@/components/scenes/Process";
import { ConversionLayer } from "@/components/scenes/ConversionLayer";

export default function Home() {
  useEffect(() => {
    const container = document.getElementById("orbs-bg-container");
    const handleScroll = () => {
      if (container) {
        container.style.setProperty("--scroll-y", `${window.scrollY}px`);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col">
      {/* Fixed viewport background for space orbs, always active and smoothly blending via CSS mask */}
      <div 
        id="orbs-bg-container"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          maskImage: "linear-gradient(to bottom, transparent calc(100vh - var(--scroll-y, 0px)), rgba(0, 0, 0, 1) calc(140vh - var(--scroll-y, 0px)))",
          WebkitMaskImage: "linear-gradient(to bottom, transparent calc(100vh - var(--scroll-y, 0px)), rgba(0, 0, 0, 1) calc(140vh - var(--scroll-y, 0px)))",
        }}
      >
        <SpaceOrbsBackground 
          className="w-full h-full" 
          active={true} 
          particleCount={150} 
          speed={0.15} 
          glowIntensity={0.1}
        />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Slide 1 — Hero Section */}
        <HeroSignalBoot />

        {/* Slide 2 — AI Services (What we offer) */}
        <CapabilityMatrix />

        {/* Slide 3 — Use Cases by Role */}
        <UseCasesByRole />

        {/* Slide 4 — How We Work Together (Engagement Models) */}
        <PricingExpectations />

        {/* Slide 5 — How We Work (Our Process) */}
        <Process />

        {/* Slide 6 — Trust & Security */}
        <SecurityTrust />

        {/* Slide 7 — Why AI, Why Now */}
        <InfrastructureReveal />

        {/* Slide 8 — Why Teamify / Our Difference */}
        <TrustStabilization />

        {/* Slide 9 — CTA / Let's Talk AI */}
        <ConversionLayer />
      </div>
    </div>
  );
}
