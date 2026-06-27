import { HeroSignalBoot } from "@/components/scenes/HeroSignalBoot";
import { DeconstructingFacade } from "@/components/scenes/DeconstructingFacade";
import { InfrastructureReveal } from "@/components/scenes/InfrastructureReveal";
import { AIIntegrationHub } from "@/components/scenes/AIIntegrationHub";
import { CapabilityMatrix } from "@/components/scenes/CapabilityMatrix";
import { UseCasesByRole } from "@/components/scenes/UseCasesByRole";
import { IndustryIntelligence } from "@/components/scenes/IndustryIntelligence";
import { HowItWorks } from "@/components/scenes/HowItWorks";
import { SystemSandboxBlock } from "@/components/scenes/SystemSandboxBlock";
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

      {/* Signature reveal transition */}
      <DeconstructingFacade />

      {/* Slide 2 — The Opportunity / Why AI, Why Now */}
      <InfrastructureReveal />

      {/* Real-time Agentic Integration Hub */}
      <AIIntegrationHub />

      {/* Slide 3, 4, 5 — Capabilities & Deep Dives */}
      <CapabilityMatrix />

      {/* Use Cases by Role */}
      <UseCasesByRole />

      {/* Industries Tab Selector */}
      <IndustryIntelligence />

      {/* Step-by-Step AI Agent Lifecycle */}
      <HowItWorks />

      {/* Live System Sandbox Block */}
      <SystemSandboxBlock />

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
