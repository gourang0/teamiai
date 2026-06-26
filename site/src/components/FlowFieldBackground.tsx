"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface GridNode {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
}

export const FlowFieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerCoords = useRef({ x: 0, y: 0, active: false });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let gridNodes: GridNode[] = [];
    const gridSpacing = 60; 
    const pullRadius = 300;
    const acceleration = 0.18;
    const damping = 0.85;

    const configureCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      gridNodes = [];
      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing;
          const y = j * gridSpacing;
          gridNodes.push({
            x,
            y,
            homeX: x,
            homeY: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    configureCanvasSize();

    const trackPointer = (e: MouseEvent) => {
      pointerCoords.current.x = e.clientX;
      pointerCoords.current.y = e.clientY;
      pointerCoords.current.active = true;
    };

    const deactivatePointer = () => {
      pointerCoords.current.active = false;
    };

    window.addEventListener("mousemove", trackPointer);
    document.addEventListener("mouseleave", deactivatePointer);
    window.addEventListener("resize", configureCanvasSize);

    const runFrame = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Set grid lines stroke color based on theme
      const isDark = theme === "dark";
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.035)" : "rgba(11, 93, 72, 0.035)";
      ctx.lineWidth = 1;

      const px = pointerCoords.current.x;
      const py = pointerCoords.current.y;
      const isPointerActive = pointerCoords.current.active;

      gridNodes.forEach((node) => {
        if (isPointerActive) {
          const dx = px - node.x;
          const dy = py - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < pullRadius) {
            const pullForce = (pullRadius - distance) / pullRadius;
            const magnitude = pullForce * acceleration * 12;
            const heading = Math.atan2(dy, dx);
            node.vx += Math.cos(heading) * magnitude;
            node.vy += Math.sin(heading) * magnitude;
          }
        }

        const springForceX = node.homeX - node.x;
        const springForceY = node.homeY - node.y;
        node.vx += springForceX * 0.025;
        node.vy += springForceY * 0.025;

        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
      });

      const cols = Math.ceil(width / gridSpacing) + 1;
      const rows = Math.ceil(height / gridSpacing) + 1;

      for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const index = i * rows + j;
          const rightNeighbor = (i + 1) * rows + j;
          const bottomNeighbor = i * rows + (j + 1);

          if (gridNodes[index] && gridNodes[rightNeighbor]) {
            ctx.beginPath();
            ctx.moveTo(gridNodes[index].x, gridNodes[index].y);
            ctx.lineTo(gridNodes[rightNeighbor].x, gridNodes[rightNeighbor].y);
            ctx.stroke();
          }

          if (gridNodes[index] && gridNodes[bottomNeighbor]) {
            ctx.beginPath();
            ctx.moveTo(gridNodes[index].x, gridNodes[index].y);
            ctx.lineTo(gridNodes[bottomNeighbor].x, gridNodes[bottomNeighbor].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(runFrame);
    };

    runFrame();

    return () => {
      window.removeEventListener("mousemove", trackPointer);
      document.removeEventListener("mouseleave", deactivatePointer);
      window.removeEventListener("resize", configureCanvasSize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-10 transition-colors duration-500 ${
        theme === "dark" ? "bg-[#070708]" : "bg-[#F0FDF7]"
      }`}
    />
  );
};
