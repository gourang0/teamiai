"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "./ThemeProvider";

export const SimpleTechCursor: React.FC = () => {
  const caretRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const previousTargetPos = useRef({ x: 0, y: 0 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hoveredElement = useRef<HTMLElement | null>(null);


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
      if (!isHovered) {
        targetPos.current.x = e.clientX;
        targetPos.current.y = e.clientY;
      }
    };

    window.addEventListener("mousemove", trackMouse);

    // Animation render loop for stretching, tilting and trailing
    const runRenderLoop = () => {
      if (isHovered && hoveredElement.current) {
        const rect = hoveredElement.current.getBoundingClientRect();
        targetPos.current.x = rect.left + rect.width / 2;
        targetPos.current.y = rect.top + rect.height / 2;

        const targetWidth = rect.width + 16;
        const targetHeight = rect.height + 8;
        gsap.to(caret, {
          width: targetWidth,
          height: targetHeight,
          duration: 0.1,
          overwrite: "auto",
        });
      }

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
    const handlePointerEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (!target) return;

      isHovered = true;
      hoveredElement.current = target;
      caret.classList.add("cursor-hover-active");

      const rect = target.getBoundingClientRect();
      const targetWidth = rect.width + 16;
      const targetHeight = rect.height + 8;

      // Lock target position to the center of the hovered element
      targetPos.current.x = rect.left + rect.width / 2;
      targetPos.current.y = rect.top + rect.height / 2;
      
      const isDarkTheme = document.documentElement.classList.contains("dark");
      
      gsap.to(caret, {
        width: targetWidth,
        height: targetHeight,
        borderRadius: "6px",
        rotate: 0,
        backgroundColor: "rgba(59, 217, 150, 0.15)",
        border: "1px solid rgba(59, 217, 150, 0.6)",
        boxShadow: "0 0 12px rgba(59, 217, 150, 0.3)",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handlePointerLeave = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      isHovered = false;
      hoveredElement.current = null;
      caret.classList.remove("cursor-hover-active");

      targetPos.current.x = mouseEvent.clientX;
      targetPos.current.y = mouseEvent.clientY;

      const isDarkTheme = document.documentElement.classList.contains("dark");

      gsap.to(caret, {
        width: 5,
        height: 18,
        borderRadius: "1px",
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
        scaleX: isHovered ? 0.95 : 0.6,
        scaleY: isHovered ? 0.95 : 0.6,
        duration: 0.1,
        overwrite: "auto"
      });
    };

    const handleMouseUp = () => {
      gsap.to(caret, {
        scaleX: 1,
        scaleY: 1,
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
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={caretRef}
      className="fixed top-0 left-0 w-[5px] h-[18px] rounded-[1px] pointer-events-none z-[9999]"
      style={{ 
        transformOrigin: "center",
        backgroundColor: "#3BD996",
        boxShadow: "0 0 8px #3BD996"
      }}
    />
  );
};

export default SimpleTechCursor;
