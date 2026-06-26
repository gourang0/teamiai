"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const SimpleTechCursor: React.FC = () => {
  const caretRef = useRef<HTMLDivElement | null>(null);
  
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const previousTargetPos = useRef({ x: 0, y: 0 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const caret = caretRef.current;
    if (!caret) return;

    // Position in the center of the screen initially
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    gsap.set(caret, { 
      x: initialX, 
      y: initialY, 
      xPercent: -50, 
      yPercent: -50,
      opacity: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0
    });
    
    currentPos.current = { x: initialX, y: initialY };
    targetPos.current = { x: initialX, y: initialY };

    // Optimized quickTo pipelines for position
    const updateCaretX = gsap.quickTo(caret, "x", { duration: 0.15, ease: "power2.out" });
    const updateCaretY = gsap.quickTo(caret, "y", { duration: 0.15, ease: "power2.out" });

    let hasMoved = false;
    let isHovered = false;

    const trackMouse = (e: MouseEvent) => {
      if (!hasMoved) {
        gsap.to(caret, { opacity: 1, duration: 0.2 });
        hasMoved = true;
      }
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
    };

    window.addEventListener("mousemove", trackMouse);

    // Animation render loop for stretching, tilting and trailing
    const runRenderLoop = () => {
      // Smooth interpolation for position
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      
      currentPos.current.x += dx * 0.25;
      currentPos.current.y += dy * 0.25;

      updateCaretX(currentPos.current.x);
      updateCaretY(currentPos.current.y);

      // Skip tilt/stretch animations if hovering over interactive element
      if (isHovered) return;

      const vx = targetPos.current.x - previousTargetPos.current.x;
      const vy = targetPos.current.y - previousTargetPos.current.y;
      const mouseVelocity = Math.sqrt(vx * vx + vy * vy);

      // Rotate caret to face direction of travel (-90 because default is vertical)
      const travelAngle = Math.atan2(vy, vx) * (180 / Math.PI);

      if (mouseVelocity > 1.2) {
        // Stretch based on speed (up to 60% stretch)
        const stretchAmount = Math.min(mouseVelocity * 0.015, 0.6);
        const scaleX = 1 - stretchAmount * 0.35; // get thinner
        const scaleY = 1 + stretchAmount;        // get longer

        gsap.to(caret, {
          rotate: travelAngle - 90,
          scaleX,
          scaleY,
          duration: 0.1,
          overwrite: "auto",
        });
      } else {
        // Return to upright caret shape when slow or static
        gsap.to(caret, {
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
          overwrite: "auto",
        });
      }

      previousTargetPos.current.x = targetPos.current.x;
      previousTargetPos.current.y = targetPos.current.y;
    };

    const tickerConnection = gsap.ticker.add(runRenderLoop);

    // Fade out when leaving the document
    const handleMouseLeave = () => {
      gsap.to(caret, { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        gsap.to(caret, { opacity: 1, duration: 0.2 });
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hover interactions for links, buttons, and other interactive elements
    const handlePointerEnter = () => {
      isHovered = true;
      caret.classList.add("cursor-hover-active");
      
      gsap.to(caret, {
        scaleX: 3.2,
        scaleY: 1.2,
        rotate: 0,
        backgroundColor: "rgba(59, 217, 150, 0.25)",
        border: "1px solid rgba(59, 217, 150, 0.8)",
        boxShadow: "0 0 12px rgba(59, 217, 150, 0.4)",
        duration: 0.2,
        overwrite: "auto",
      });
    };

    const handlePointerLeave = () => {
      isHovered = false;
      caret.classList.remove("cursor-hover-active");

      gsap.to(caret, {
        scaleX: 1,
        scaleY: 1,
        rotate: 0,
        backgroundColor: "#3BD996",
        border: "1px solid transparent",
        boxShadow: "0 0 8px #3BD996",
        duration: 0.2,
        overwrite: "auto",
      });
    };

    // Click effect (quick squeeze)
    const handleMouseDown = () => {
      gsap.to(caret, {
        scaleX: isHovered ? 2.6 : 0.6,
        scaleY: isHovered ? 0.9 : 0.6,
        duration: 0.1,
        overwrite: "auto"
      });
    };

    const handleMouseUp = () => {
      gsap.to(caret, {
        scaleX: isHovered ? 3.2 : 1,
        scaleY: isHovered ? 1.2 : 1,
        duration: 0.15,
        overwrite: "auto"
      });
    };

    const bindLinkHovers = () => {
      const hoverTargets = document.querySelectorAll('a, button, [role="button"], .interactive-node, .card, .btn');
      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handlePointerEnter);
        target.removeEventListener("mouseleave", handlePointerLeave);
        target.addEventListener("mouseenter", handlePointerEnter);
        target.addEventListener("mouseleave", handlePointerLeave);
      });
    };

    bindLinkHovers();
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Watch for dynamically added DOM elements to apply hovers
    const domObserver = new MutationObserver(bindLinkHovers);
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", trackMouse);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      gsap.ticker.remove(runRenderLoop);
      domObserver.disconnect();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <style jsx global>{`
        /* Hide system cursor on non-touch devices */
        @media (pointer: fine) {
          body, a, button, [role="button"], .btn, .card {
            cursor: none !important;
          }
        }
        
        /* Blinking block cursor animation when hovering interactive elements */
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        
        .cursor-hover-active {
          animation: terminal-blink 1s ease-in-out infinite;
        }
      `}</style>
      <div
        ref={caretRef}
        className="fixed top-0 left-0 w-[5px] h-[18px] bg-[#3BD996] rounded-[1px] pointer-events-none z-[9999]"
        style={{ 
          transformOrigin: "center",
          boxShadow: "0 0 8px #3BD996"
        }}
      />
    </>
  );
};

export default SimpleTechCursor;
