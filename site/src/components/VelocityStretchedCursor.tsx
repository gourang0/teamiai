"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const VelocityStretchedCursor: React.FC = () => {
  const outerRingRef = useRef<HTMLDivElement | null>(null);
  const innerDotRef = useRef<HTMLDivElement | null>(null);
  
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const previousTargetPos = useRef({ x: 0, y: 0 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const ring = outerRingRef.current;
    const dot = innerDotRef.current;
    if (!ring || !dot) return;

    // Position components in the center of the screen to prevent initialization offsets
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { x: initialX, y: initialY, opacity: 0 });
    gsap.set(ring, { x: initialX, y: initialY, opacity: 0 });
    
    currentPos.current = { x: initialX, y: initialY };
    targetPos.current = { x: initialX, y: initialY };

    // Set up optimized animation hooks using quickTo pipelines
    const updateRingX = gsap.quickTo(ring, "x", { duration: 0.3, ease: "power3.out" });
    const updateRingY = gsap.quickTo(ring, "y", { duration: 0.3, ease: "power3.out" });
    const updateDotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power1.out" });
    const updateDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power1.out" });

    let hasMoved = false;

    const trackMouse = (e: MouseEvent) => {
      if (!hasMoved) {
        // Fade in when mouse first moves
        gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
        hasMoved = true;
      }
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      
      updateDotX(e.clientX);
      updateDotY(e.clientY);
    };

    window.addEventListener("mousemove", trackMouse);

    const runRenderLoop = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * 0.12;
      currentPos.current.y += dy * 0.12;

      updateRingX(currentPos.current.x);
      updateRingY(currentPos.current.y);

      const vx = targetPos.current.x - previousTargetPos.current.x;
      const vy = targetPos.current.y - previousTargetPos.current.y;
      const mouseVelocity = Math.sqrt(vx * vx + vy * vy);

      const travelAngle = Math.atan2(vy, vx) * (180 / Math.PI);

      if (mouseVelocity > 1.5) {
        const stretchAmount = Math.min(mouseVelocity * 0.012, 0.65);
        const scaleX = 1 + stretchAmount;
        const scaleY = 1 - stretchAmount * 0.45;

        gsap.to(ring, {
          rotate: travelAngle,
          scaleX,
          scaleY,
          duration: 0.12,
          overwrite: "auto",
        });
      } else {
        gsap.to(ring, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.25,
          overwrite: "auto",
        });
      }

      previousTargetPos.current.x = targetPos.current.x;
      previousTargetPos.current.y = targetPos.current.y;
    };

    const tickerConnection = gsap.ticker.add(runRenderLoop);

    // Fade cursor out when mouse leaves the document
    const handleMouseLeave = () => {
      gsap.to([ring, dot], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        gsap.to([ring, dot], { opacity: 1, duration: 0.2 });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handlePointerEnter = () => {
      gsap.to(ring, { scale: 1.75, borderWidth: "1px", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 0, duration: 0.15 });
    };

    const handlePointerLeave = () => {
      gsap.to(ring, { scale: 1, borderWidth: "1.5px", duration: 0.3, ease: "power2.out" });
      gsap.to(dot, { scale: 1, duration: 0.15 });
    };

    const bindLinkHovers = () => {
      const hoverTargets = document.querySelectorAll('a, button, [role="button"], .interactive-node, .card, .btn');
      hoverTargets.forEach((target) => {
        target.addEventListener("mouseenter", handlePointerEnter);
        target.addEventListener("mouseleave", handlePointerLeave);
      });
    };

    bindLinkHovers();

    const domObserver = new MutationObserver(bindLinkHovers);
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", trackMouse);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      gsap.ticker.remove(runRenderLoop);
      domObserver.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={outerRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-[1.5px] border-[#3b82f6] pointer-events-none z-[9999] mix-blend-difference"
        style={{ transformOrigin: "center" }}
      />
      <div
        ref={innerDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#60a5fa] pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  );
};
export default VelocityStretchedCursor;
