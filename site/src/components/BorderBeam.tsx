import React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;       // Width of the light trail in pixels
  duration?: number;   // Travel duration in seconds
  borderWidth?: number; // Border thickness in pixels
  colorFrom?: string;  // Start color of the gradient path
  colorTo?: string;    // End color of the gradient path
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 120,
  duration = 8,
  borderWidth = 1.5,
  colorFrom = "#1FA971",
  colorTo = "#3BD996",
}) => {
  return (
    <div
      style={{
        "--size": `${size}px`,
        "--duration": `${duration}s`,
        "--border-width": `${borderWidth}px`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
      } as React.CSSProperties}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        className
      )}
    >
      <div
        className="absolute aspect-square w-[var(--size)] bg-gradient-to-r from-[var(--color-from)] to-[var(--color-to)]"
        style={{
          offsetPath: "rect(0% auto auto 0% round 100%)",
          animation: "beam var(--duration) linear infinite",
        }}
      />
      
      <style>{`
        @keyframes beam {
          100% {
            offsetDistance: 100%;
          }
        }
      `}</style>
    </div>
  );
};
export default BorderBeam;
