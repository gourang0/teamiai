"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  angle: number;
  angularSpeed: number;
}

export function FallingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();
  
  // Track mouse coordinates
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Map routes to visual vibes
  const getVibe = (path: string) => {
    if (path.startsWith("/about")) return "about";
    if (path.startsWith("/careers")) return "careers";
    if (path.startsWith("/contact")) return "contact";
    if (path.startsWith("/services") || path.startsWith("/solutions")) return "tech";
    return "home";
  };

  const vibe = getVibe(pathname);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let orbs: Orb[] = [];
    const maxOrbs = vibe === "tech" ? 40 : vibe === "contact" ? 35 : vibe === "careers" ? 45 : 20;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initialize orbs based on current vibe
    const initOrbs = () => {
      orbs = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < maxOrbs; i++) {
        const radius = vibe === "about"
          ? Math.random() * 80 + 60 // Larger, breathing orbs
          : vibe === "careers"
          ? Math.random() * 5 + 2 // Tiny rising sparks
          : vibe === "tech"
          ? Math.random() * 4 + 2 // Fine network nodes
          : Math.random() * 40 + 20; // Default floating orbs

        orbs.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (vibe === "careers" ? 0.18 : vibe === "tech" ? 0.25 : 0.12),
          vy: vibe === "careers"
            ? -(Math.random() * 0.7 + 0.25) // Floating upwards
            : vibe === "about"
            ? (Math.random() - 0.5) * 0.08 // Very slow random drift
            : vibe === "contact"
            ? Math.random() * 0.25 + 0.1 // Drift down slightly
            : Math.random() * 0.18 + 0.08, // Default slow downward drift
          radius,
          color: getRandomColor(vibe, theme),
          alpha: Math.random() * 0.4 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2,
          angle: Math.random() * Math.PI * 2,
          angularSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    initOrbs();

    // Get color palettes matching theme and vibe
    function getRandomColor(currentVibe: string, currentTheme: string): string {
      const isDark = currentTheme === "dark";
      
      if (currentVibe === "about") {
        // Deep purple and teal
        const colors = isDark 
          ? ["75, 0, 130", "138, 43, 226", "31, 169, 113", "11, 93, 72"]
          : ["186, 85, 211", "147, 112, 219", "26, 148, 98", "138, 43, 226"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      if (currentVibe === "careers") {
        // Energetic gold and bright emerald
        const colors = isDark
          ? ["218, 165, 32", "255, 215, 0", "31, 169, 113", "59, 217, 150"]
          : ["184, 134, 11", "218, 165, 32", "11, 93, 72", "26, 148, 98"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      if (currentVibe === "contact") {
        // Magnetic cyan, mint and clean teals
        const colors = isDark
          ? ["0, 206, 209", "31, 169, 113", "59, 217, 150", "0, 128, 128"]
          : ["0, 139, 139", "11, 93, 72", "26, 148, 98", "32, 178, 170"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      if (currentVibe === "tech") {
        // Technical blue, slate and emerald nodes
        const colors = isDark
          ? ["30, 144, 255", "31, 169, 113", "0, 191, 255", "59, 217, 150"]
          : ["0, 102, 204", "11, 93, 72", "0, 128, 128", "26, 148, 98"];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      // Default Home: Classic Emerald & Mint
      const colors = isDark
        ? ["31, 169, 113", "11, 93, 72", "59, 217, 150", "19, 138, 100"]
        : ["11, 93, 72", "26, 148, 98", "19, 138, 100", "0, 77, 58"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Background gradient rendering removed to keep the site background completely black.

      // Render network lines if in tech vibe
      if (vibe === "tech") {
        ctx.lineWidth = 0.5;
        const maxDist = 140;
        for (let i = 0; i < orbs.length; i++) {
          for (let j = i + 1; j < orbs.length; j++) {
            const dx = orbs[i].x - orbs[j].x;
            const dy = orbs[i].y - orbs[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.12;
              ctx.strokeStyle = theme === "dark" 
                ? `rgba(59, 217, 150, ${lineAlpha})`
                : `rgba(11, 93, 72, ${lineAlpha})`;
              ctx.beginPath();
              ctx.moveTo(orbs[i].x, orbs[i].y);
              ctx.lineTo(orbs[j].x, orbs[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw orbs
      orbs.forEach((orb) => {
        // Pulse breathing effect
        orb.pulsePhase += orb.pulseSpeed;
        const scaleFactor = 1 + Math.sin(orb.pulsePhase) * (vibe === "about" ? 0.15 : 0.08);
        const currentRadius = orb.radius * scaleFactor;

        // Apply path-specific physics
        if (vibe === "contact" && mouseRef.current.active) {
          const dx = mouseRef.current.x - orb.x;
          const dy = mouseRef.current.y - orb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 320) {
            const force = (320 - dist) / 320;
            const pullX = (dx / dist) * force * 0.4;
            const pullY = (dy / dist) * force * 0.4;
            orb.vx += pullX;
            orb.vy += pullY;
            
            if (dist < 180) {
              ctx.beginPath();
              ctx.strokeStyle = theme === "dark"
                ? `rgba(0, 206, 209, ${(1 - dist / 180) * 0.08})`
                : `rgba(0, 139, 139, ${(1 - dist / 180) * 0.08})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(orb.x, orb.y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.stroke();
            }
          }
        }

        // Apply velocities
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Subtle friction/speed limits
        if (vibe === "contact") {
          orb.vx *= 0.95;
          orb.vy = orb.vy * 0.95 + (Math.random() * 0.02 + 0.01);
        }

        // Bounce/loop logic
        if (vibe === "careers") {
          if (orb.y < -20) {
            orb.y = height + 20;
            orb.x = Math.random() * width;
          }
          if (orb.x < -20 || orb.x > width + 20) {
            orb.vx = (Math.random() - 0.5) * 0.3;
          }
        } else {
          if (orb.y > height + 100) {
            orb.y = -100;
            orb.x = Math.random() * width;
          } else if (orb.y < -100) {
            orb.y = height + 100;
            orb.x = Math.random() * width;
          }

          if (orb.x > width + 100) {
            orb.x = -100;
          } else if (orb.x < -100) {
            orb.x = width + 100;
          }
        }

        // Draw particle/orb
        ctx.beginPath();
        const baseAlpha = theme === "dark" ? orb.alpha : orb.alpha * 0.5;
        
        if (vibe === "careers") {
          ctx.save();
          ctx.translate(orb.x, orb.y);
          orb.angle += orb.angularSpeed;
          ctx.rotate(orb.angle);
          
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentRadius * 2);
          grad.addColorStop(0, `rgba(${orb.color}, ${baseAlpha * 1.5})`);
          grad.addColorStop(0.4, `rgba(${orb.color}, ${baseAlpha * 0.4})`);
          grad.addColorStop(1, `rgba(${orb.color}, 0)`);
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(0, -currentRadius * 2);
          ctx.quadraticCurveTo(0, 0, currentRadius * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, currentRadius * 2);
          ctx.quadraticCurveTo(0, 0, -currentRadius * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -currentRadius * 2);
          ctx.fill();
          ctx.restore();
        } else if (vibe === "tech") {
          ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${orb.color}, ${baseAlpha * 1.2})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgb(${orb.color})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          const grad = ctx.createRadialGradient(
            orb.x, orb.y, 0,
            orb.x, orb.y, currentRadius
          );
          
          grad.addColorStop(0, `rgba(${orb.color}, ${baseAlpha})`);
          grad.addColorStop(0.5, `rgba(${orb.color}, ${baseAlpha * 0.3})`);
          grad.addColorStop(1, `rgba(${orb.color}, 0)`);

          ctx.fillStyle = grad;
          ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname, vibe, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none transition-all duration-700"
      style={{
        zIndex: -2,
        mixBlendMode: theme === "dark" ? "screen" : "multiply",
        opacity: theme === "dark" ? 0.75 : 0.45,
      }}
    />
  );
}
