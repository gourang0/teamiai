"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export function CursorTrail() {
  const pathname = usePathname();
  const { theme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Position tracking refs
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const sparklesRef = useRef<Sparkle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Outer ring custom element refs
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Determine current vibe
  const getVibe = (path: string) => {
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/careers")) return "careers";
    if (path.startsWith("/contact")) return "contact";
    if (path.startsWith("/services") || path.startsWith("/solutions")) return "tech";
    return "home";
  };
  
  const vibe = getVibe(pathname);

  useEffect(() => {
    setMounted(true);
    
    // Check if it's a touch device
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);

      // Check if hovering over interactive elements dynamically
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest("a, button, input, select, textarea, [role='button'], .card-interactive, .btn, .nav-link, .magnetic-wrap, option, label") !== null;
        setIsHovered(isInteractive);
      }

      // Add sparkles for Careers page
      if (vibe === "careers" && Math.random() < 0.3) {
        const colors = theme === "dark" 
          ? ["rgba(218, 165, 32, 0.8)", "rgba(255, 215, 0, 0.9)", "rgba(59, 217, 150, 0.8)"]
          : ["rgba(184, 134, 11, 0.8)", "rgba(218, 165, 32, 0.8)", "rgba(26, 148, 98, 0.8)"];
        
        sparklesRef.current.push({
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 6 + 4,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Canvas size for particles
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    
    const updateCursor = () => {
      // Lerp ring position
      const ease = 0.15;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      // Update HTML Elements
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x - 3}px, ${mousePos.current.y - 3}px, 0) scale(${isClicked ? 0.6 : isHovered ? 1.5 : 1})`;
      }
      if (ringRef.current) {
        const ringScale = isClicked ? 0.8 : isHovered ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 18}px, ${ringPos.current.y - 18}px, 0) scale(${ringScale})`;
      }

      // Draw Sparkle/Effects on Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Render sparkles (Careers page)
          if (vibe === "careers") {
            sparklesRef.current.forEach((sparkle, idx) => {
              sparkle.x += sparkle.vx;
              sparkle.y += sparkle.vy;
              sparkle.alpha -= 0.02; // Fade out
              sparkle.rotation += sparkle.rotationSpeed;

              if (sparkle.alpha <= 0) {
                sparklesRef.current.splice(idx, 1);
                return;
              }

              ctx.save();
              ctx.translate(sparkle.x, sparkle.y);
              ctx.rotate(sparkle.rotation);
              ctx.fillStyle = sparkle.color.replace("0.8", sparkle.alpha.toString()).replace("0.9", sparkle.alpha.toString());
              
              // Draw small diamond sparkle
              ctx.beginPath();
              ctx.moveTo(0, -sparkle.size);
              ctx.quadraticCurveTo(0, 0, sparkle.size, 0);
              ctx.quadraticCurveTo(0, 0, 0, sparkle.size);
              ctx.quadraticCurveTo(0, 0, -sparkle.size, 0);
              ctx.quadraticCurveTo(0, 0, 0, -sparkle.size);
              ctx.fill();
              
              ctx.restore();
            });
          }

          // Render crosshair elements if in tech vibe
          if (vibe === "tech" && isVisible) {
            ctx.save();
            ctx.translate(ringPos.current.x, ringPos.current.y);
            ctx.strokeStyle = theme === "dark" 
              ? `rgba(59, 217, 150, ${isHovered ? 0.8 : 0.3})`
              : `rgba(11, 93, 72, ${isHovered ? 0.8 : 0.3})`;
            ctx.lineWidth = 0.5;

            // Draw horizontal and vertical hair lines protruding from ring
            const lineOffset = isHovered ? 26 : 20;
            const lineLen = isHovered ? 8 : 5;
            
            // Top line
            ctx.beginPath();
            ctx.moveTo(0, -lineOffset);
            ctx.lineTo(0, -lineOffset - lineLen);
            ctx.stroke();

            // Bottom line
            ctx.beginPath();
            ctx.moveTo(0, lineOffset);
            ctx.lineTo(0, lineOffset + lineLen);
            ctx.stroke();

            // Left line
            ctx.beginPath();
            ctx.moveTo(-lineOffset, 0);
            ctx.lineTo(-lineOffset - lineLen, 0);
            ctx.stroke();

            // Right line
            ctx.beginPath();
            ctx.moveTo(lineOffset, 0);
            ctx.lineTo(lineOffset + lineLen, 0);
            ctx.stroke();
            
            ctx.restore();
          }
        }
      }

      animId = requestAnimationFrame(updateCursor);
    };

    animId = requestAnimationFrame(updateCursor);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", handleResize);
    };
  }, [vibe, isHovered, isClicked, isVisible, theme]);

  if (!mounted || !isVisible) return null;

  // Decide colors based on vibe and theme
  const getColors = () => {
    const isDark = theme === "dark";
    
    switch (vibe) {
      case "about":
        return {
          dotBg: isDark ? "bg-[#8A2BE2]" : "bg-[#9370DB]",
          ringBorder: isDark ? "border-[#8A2BE2]/40" : "border-[#9370DB]/40",
          shadowColor: isDark ? "rgba(138, 43, 226, 0.4)" : "rgba(147, 112, 219, 0.3)",
        };
      case "careers":
        return {
          dotBg: isDark ? "bg-[#D4AF37]" : "bg-[#B8860B]",
          ringBorder: isDark ? "border-[#D4AF37]/40" : "border-[#B8860B]/40",
          shadowColor: isDark ? "rgba(212, 175, 55, 0.4)" : "rgba(184, 134, 11, 0.3)",
        };
      case "contact":
        return {
          dotBg: isDark ? "bg-[#00CED1]" : "bg-[#008B8B]",
          ringBorder: isDark ? "border-[#00CED1]/40" : "border-[#008B8B]/40",
          shadowColor: isDark ? "rgba(0, 206, 209, 0.4)" : "rgba(0, 139, 139, 0.3)",
        };
      case "tech":
        return {
          dotBg: isDark ? "bg-[#1E90FF]" : "bg-[#0066CC]",
          ringBorder: isDark ? "border-[#1E90FF]/40" : "border-[#0066CC]/40",
          shadowColor: isDark ? "rgba(30, 144, 255, 0.4)" : "rgba(0, 102, 204, 0.3)",
        };
      default:
        // Classic emerald theme
        return {
          dotBg: isDark ? "bg-[#1FA971]" : "bg-[#0B5D48]",
          ringBorder: isDark ? "border-[#1FA971]/40" : "border-[#0B5D48]/40",
          shadowColor: isDark ? "rgba(31, 169, 113, 0.4)" : "rgba(11, 93, 72, 0.3)",
        };
    }
  };

  const colors = getColors();

  return (
    <>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      />
      
      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none will-change-transform ${colors.dotBg} transition-transform duration-100 ease-out`}
        style={{
          zIndex: 9999,
          boxShadow: `0 0 8px ${colors.shadowColor}`,
        }}
      />
      
      {/* Custom Cursor Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 w-9 h-9 rounded-full border pointer-events-none will-change-transform ${colors.ringBorder} transition-transform duration-300 ease-out`}
        style={{
          zIndex: 9999,
          boxShadow: isHovered ? `0 0 12px ${colors.shadowColor}` : "none",
          backgroundColor: isHovered ? `${colors.shadowColor.replace("0.4", "0.08").replace("0.3", "0.06")}` : "transparent",
        }}
      />
    </>
  );
}
