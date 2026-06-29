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
  return (
    <div className="flex flex-col">
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
  );
}
