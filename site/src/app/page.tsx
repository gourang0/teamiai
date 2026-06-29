import { HeroSignalBoot } from "@/components/scenes/HeroSignalBoot";

import { InfrastructureReveal } from "@/components/scenes/InfrastructureReveal";

import { CapabilityMatrix } from "@/components/scenes/CapabilityMatrix";
import { UseCasesByRole } from "@/components/scenes/UseCasesByRole";

import { HowItWorks } from "@/components/scenes/HowItWorks";

import { SecurityTrust } from "@/components/scenes/SecurityTrust";
import { PricingExpectations } from "@/components/scenes/PricingExpectations";
import { TrustStabilization } from "@/components/scenes/TrustStabilization";
import { Process } from "@/components/scenes/Process";
import { ConversionLayer } from "@/components/scenes/ConversionLayer";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Slide 1 — Hero */}
      <HeroSignalBoot />



      {/* Slide 2 — The Opportunity / Why AI, Why Now */}
      <InfrastructureReveal />



      {/* Slide 3, 4, 5 — Capabilities & Deep Dives */}
      <CapabilityMatrix />

      {/* Use Cases by Role */}
      <UseCasesByRole />



      {/* Step-by-Step AI Agent Lifecycle */}
      <HowItWorks />



      {/* Security & Compliance Protocols */}
      <SecurityTrust />

      {/* Transparent Pricing Expectations */}
      <PricingExpectations />

      {/* Slide 6 — Why Teamify / Our Difference */}
      <TrustStabilization />

      {/* Slide 7 — Our Process / How We Work */}
      <Process />

      {/* Slide 8 — CTA / Let's Talk AI */}
      <ConversionLayer />
    </div>
  );
}
