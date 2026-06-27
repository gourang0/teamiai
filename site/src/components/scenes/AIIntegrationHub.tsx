"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity, ShieldCheck, Database, CheckSquare, Sparkles, Workflow, ArrowRight } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";
import { useTheme } from "@/components/ThemeProvider";

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  avgLatency: number;
  throughput: number;
  contextWindow: string;
  status: "nominal" | "active" | "standby";
}

const initialModels: ModelConfig[] = [
  { id: "groq", name: "LLaMA 3 70B (Groq Pipeline)", provider: "Groq", avgLatency: 28, throughput: 14200, contextWindow: "8k", status: "active" },
  { id: "xai", name: "Grok-1.5 (xAI Router)", provider: "xAI", avgLatency: 120, throughput: 4200, contextWindow: "128k", status: "nominal" },
  { id: "gpt4", name: "GPT-4o (Cognitive Core)", provider: "OpenAI", avgLatency: 210, throughput: 2800, contextWindow: "128k", status: "nominal" },
  { id: "claude", name: "Claude 3.5 Sonnet (Expert Reasoning)", provider: "Anthropic", avgLatency: 280, throughput: 3100, contextWindow: "200k", status: "standby" },
];

export function AIIntegrationHub() {
  const [models, setModels] = useState<ModelConfig[]>(initialModels);
  const [hoveredModel, setHoveredModel] = useState<string | null>("groq");
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const lineStrokeColor = isDark ? "var(--text-muted)" : "rgba(11, 93, 72, 0.35)";
  const lineOpacity = isDark ? 0.15 : 0.35;

  // Live telemetry updating effect
  useEffect(() => {
    const timer = setInterval(() => {
      setModels((prev) =>
        prev.map((model) => {
          // Add small fluctuations to latency & throughput
          const latencyDelta = Math.floor((Math.random() - 0.5) * 6);
          const throughputDelta = Math.floor((Math.random() - 0.5) * 200);
          return {
            ...model,
            avgLatency: Math.max(15, model.avgLatency + latencyDelta),
            throughput: Math.max(1000, model.throughput + throughputDelta),
          };
        })
      );
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Step loop animation to show workflow in progress
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWorkflowStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { label: "1. Payload Ingestion", desc: "API request decrypted and vectorized" },
    { label: "2. Cognitive Router", desc: "Evaluating task complexity & syntax" },
    { label: "3. Model Execution", desc: "Dispatching context to active pipeline" },
    { label: "4. Compliance Check", desc: "PII redaction and security scans" },
    { label: "5. Structured Synthesis", desc: "Compiling JSON schema output" },
  ];

  return (
    <section className="section bg-transparent border-t border-[var(--border-subtle)] py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 select-none font-sans">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="section-label text-left">INTEGRATION // ORCHESTRATION</span>
            <h2 className="section-title text-left">AI Integration Hub</h2>
            <div className="divider text-left" style={{ margin: "12px 0 0" }} />
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed mt-4 md:mt-0 font-mono">
            Orchestrating calls across deep neural models with sub-millisecond dispatching latencies.
          </p>
        </div>

        {/* Layout split */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Left Column (5 cols): System Controller panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <Cpu size={16} className="text-[var(--accent)]" />
                <span>System Controller</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Telemetry log showing connected model clusters and active gateways. Hover over a model to trace its routing pipeline.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {models.map((model) => {
                const isHovered = hoveredModel === model.id;
                return (
                  <div
                    key={model.id}
                    onMouseEnter={() => setHoveredModel(model.id)}
                    className={`p-4 rounded-xl border transition-all duration-300 relative overflow-hidden select-none cursor-pointer ${
                      isHovered
                        ? "bg-[var(--bg-secondary)] border-[var(--accent)]/40 shadow-[0_0_15px_rgba(31,169,113,0.05)]"
                        : "bg-[var(--surface-primary)] border-[var(--border-subtle)] hover:border-[var(--border-primary)] hover:bg-[var(--surface-primary)]"
                    }`}
                  >
                    {/* Status accent indicator */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 transition-colors duration-300 ${
                        isHovered ? "bg-[var(--accent)]" : "bg-transparent"
                      }`}
                    />

                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent-text)] block tracking-wider font-semibold uppercase">
                          {model.provider}
                        </span>
                        <h4 className="text-sm font-bold text-[var(--text-primary)] mt-0.5">
                          {model.name}
                        </h4>
                      </div>
                      
                      {/* Active Status Badge */}
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                        model.status === "active"
                          ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)]/20 text-[var(--accent-text)] animate-pulse"
                          : model.status === "nominal"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      }`}>
                        {model.status}
                      </span>
                    </div>

                    {/* Telemetry Metrics Row */}
                    <div className="grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-2.5 mt-1 text-[10px] font-mono text-[var(--text-secondary)]">
                      <div>
                        <span className="block text-[8px] text-[var(--text-muted)] uppercase">Latency</span>
                        <span className="text-[var(--text-primary)] font-medium">{model.avgLatency}ms</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-[var(--text-muted)] uppercase">Throughput</span>
                        <span className="text-[var(--text-primary)] font-medium">{model.throughput.toLocaleString()} t/s</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-[var(--text-muted)] uppercase">Context</span>
                        <span className="text-[var(--text-primary)] font-medium">{model.contextWindow}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (7 cols): Interactive connection diagram */}
          <div className="lg:col-span-7 flex flex-col justify-between min-h-[480px]">
            <GlowCard className="glass-panel h-full p-6 flex flex-col justify-between relative overflow-hidden">
              
              {/* Diagram Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 mb-6 select-none">
                <div className="flex items-center gap-2 text-[var(--accent-text)]">
                  <Workflow size={14} className="animate-spin-slow" />
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold">ROUTING DICTIONARY & FLOWS</span>
                </div>
                <span className="text-[9px] font-mono text-[var(--text-muted)]">SYSTEM: ACTIVE_ROUTER</span>
              </div>

              {/* Central Schematic Board */}
              <div className="flex-1 relative flex items-center justify-center min-h-[280px]">
                
                {/* SVG connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "280px" }}>
                  <defs>
                    <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#138A64" stopOpacity={isDark ? 0.2 : 0.4} />
                      <stop offset="50%" stopColor="#3BD996" stopOpacity={1.0} />
                      <stop offset="100%" stopColor="#1FA971" stopOpacity={isDark ? 0.2 : 0.4} />
                    </linearGradient>
                  </defs>

                  {/* Bezier connection paths */}
                  {/* Path 1: Ingest (20%, 50%) -> Router (50%, 50%) */}
                  <path d="M 90 140 Q 160 140, 210 140" fill="none" stroke={lineStrokeColor} strokeOpacity={lineOpacity} strokeWidth="2" />
                  
                  {/* Paths from Router (210, 140) to Models */}
                  {/* Router -> Groq (380, 50) */}
                  <path
                    d="M 270 140 Q 320 140, 360 70"
                    fill="none"
                    stroke={hoveredModel === "groq" ? "url(#emerald-gradient)" : lineStrokeColor}
                    strokeOpacity={hoveredModel === "groq" ? 1 : lineOpacity}
                    strokeWidth={hoveredModel === "groq" ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Router -> xAI (380, 140) */}
                  <path
                    d="M 270 140 H 360"
                    fill="none"
                    stroke={hoveredModel === "xai" ? "url(#emerald-gradient)" : lineStrokeColor}
                    strokeOpacity={hoveredModel === "xai" ? 1 : lineOpacity}
                    strokeWidth={hoveredModel === "xai" ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* Router -> GPT-4 (380, 210) */}
                  <path
                    d="M 270 140 Q 320 140, 360 210"
                    fill="none"
                    stroke={hoveredModel === "gpt4" ? "url(#emerald-gradient)" : lineStrokeColor}
                    strokeOpacity={hoveredModel === "gpt4" ? 1 : lineOpacity}
                    strokeWidth={hoveredModel === "gpt4" ? 3 : 1.5}
                    className="transition-all duration-300"
                  />

                  {/* Paths from Models to Sanitizer (490, 140) */}
                  {/* Groq -> Sanitizer */}
                  <path
                    d="M 430 70 Q 460 140, 480 140"
                    fill="none"
                    stroke={hoveredModel === "groq" ? "url(#emerald-gradient)" : lineStrokeColor}
                    strokeOpacity={hoveredModel === "groq" ? 1 : lineOpacity}
                    strokeWidth={hoveredModel === "groq" ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* xAI -> Sanitizer */}
                  <path
                    d="M 430 140 H 480"
                    fill="none"
                    stroke={hoveredModel === "xai" ? "url(#emerald-gradient)" : lineStrokeColor}
                    strokeOpacity={hoveredModel === "xai" ? 1 : lineOpacity}
                    strokeWidth={hoveredModel === "xai" ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  {/* GPT-4 -> Sanitizer */}
                  <path
                    d="M 430 210 Q 460 140, 480 140"
                    fill="none"
                    stroke={hoveredModel === "gpt4" ? "url(#emerald-gradient)" : lineStrokeColor}
                    strokeOpacity={hoveredModel === "gpt4" ? 1 : lineOpacity}
                    strokeWidth={hoveredModel === "gpt4" ? 3 : 1.5}
                    className="transition-all duration-300"
                  />

                  {/* Path 4: Sanitizer (540, 140) -> Output (610, 140) */}
                  <path d="M 540 140 H 600" fill="none" stroke={lineStrokeColor} strokeOpacity={lineOpacity} strokeWidth="2" />

                  {/* Animated flow dash packet overlay */}
                  <motion.path
                    d={
                      hoveredModel === "groq"
                        ? "M 90 140 Q 160 140, 210 140 Q 260 140, 270 140 Q 320 140, 360 70 M 430 70 Q 460 140, 480 140 H 540 H 600"
                        : hoveredModel === "xai"
                        ? "M 90 140 Q 160 140, 210 140 H 360 M 430 140 H 480 H 540 H 600"
                        : "M 90 140 Q 160 140, 210 140 Q 260 140, 270 140 Q 320 140, 360 210 M 430 210 Q 460 140, 480 140 H 540 H 600"
                    }
                    fill="none"
                    stroke="var(--color-accent-highlight)"
                    strokeWidth="3.5"
                    strokeDasharray="15 150"
                    animate={{ strokeDashoffset: [-165, 0] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>

                {/* Node Box Widgets */}
                
                {/* Node 1: INGEST */}
                <div className="absolute left-[15px] top-[115px] w-20 h-12 bg-[var(--surface-elevated)] border border-[var(--border-primary)] rounded-lg flex flex-col items-center justify-center p-1.5 shadow-md">
                  <Database size={12} className="text-[var(--text-secondary)] mb-0.5" />
                  <span className="text-[8px] font-mono text-[var(--text-secondary)] uppercase font-semibold">INGEST</span>
                </div>

                {/* Node 2: COGNITIVE ROUTER */}
                <div className="absolute left-[180px] top-[115px] w-24 h-12 bg-[var(--surface-elevated)] border border-[var(--accent)]/45 rounded-lg flex flex-col items-center justify-center p-1.5 shadow-md">
                  <span className="text-[7px] font-mono text-[var(--accent-text)] font-bold tracking-widest uppercase">STAGE_02</span>
                  <span className="text-[8.5px] font-semibold text-[var(--text-primary)] uppercase mt-0.5">ROUTER</span>
                </div>

                {/* Model Target Nodes */}
                {/* Groq Node */}
                <div
                  className={`absolute left-[340px] top-[45px] w-24 h-11 border rounded-lg flex flex-col items-center justify-center p-1 shadow-md transition-all duration-300 ${
                    hoveredModel === "groq"
                      ? "bg-[var(--bg-secondary)] border-[var(--accent)]/50 scale-105"
                      : "bg-[var(--surface-elevated)] border-[var(--border-subtle)] opacity-60"
                  }`}
                >
                  <span className="text-[7.5px] font-mono text-[var(--text-primary)]/80">Groq API</span>
                  <span className="text-[8.5px] font-bold text-[var(--text-primary)] tracking-tight mt-0.5">LLaMA-3</span>
                </div>

                {/* xAI Node */}
                <div
                  className={`absolute left-[340px] top-[115px] w-24 h-11 border rounded-lg flex flex-col items-center justify-center p-1 shadow-md transition-all duration-300 ${
                    hoveredModel === "xai"
                      ? "bg-[var(--bg-secondary)] border-[var(--accent)]/50 scale-105"
                      : "bg-[var(--surface-elevated)] border-[var(--border-subtle)] opacity-60"
                  }`}
                >
                  <span className="text-[7.5px] font-mono text-[var(--text-primary)]/80">xAI Cluster</span>
                  <span className="text-[8.5px] font-bold text-[var(--text-primary)] tracking-tight mt-0.5">Grok-1.5</span>
                </div>

                {/* OpenAI Node */}
                <div
                  className={`absolute left-[340px] top-[185px] w-24 h-11 border rounded-lg flex flex-col items-center justify-center p-1 shadow-md transition-all duration-300 ${
                    hoveredModel === "gpt4"
                      ? "bg-[var(--bg-secondary)] border-[var(--accent)]/50 scale-105"
                      : "bg-[var(--surface-elevated)] border-[var(--border-subtle)] opacity-60"
                  }`}
                >
                  <span className="text-[7.5px] font-mono text-[var(--text-primary)]/80">Cognitive Core</span>
                  <span className="text-[8.5px] font-bold text-[var(--text-primary)] tracking-tight mt-0.5">GPT-4o</span>
                </div>

                {/* Node 6: PII SANITIZER */}
                <div className="absolute right-[110px] top-[115px] w-24 h-12 bg-[var(--surface-elevated)] border border-[var(--border-primary)] rounded-lg flex flex-col items-center justify-center p-1.5 shadow-md">
                  <ShieldCheck size={12} className="text-emerald-400 mb-0.5" />
                  <span className="text-[8px] font-mono text-[var(--text-secondary)] uppercase font-semibold">SANITIZER</span>
                </div>

                {/* Node 7: OUTPUT */}
                <div className="absolute right-[15px] top-[115px] w-20 h-12 bg-[var(--surface-elevated)] border border-[var(--border-primary)] rounded-lg flex flex-col items-center justify-center p-1.5 shadow-md">
                  <CheckSquare size={12} className="text-[var(--accent-text)] mb-0.5" />
                  <span className="text-[8px] font-mono text-[var(--text-secondary)] uppercase font-semibold">SYNTHESIS</span>
                </div>

              </div>

              {/* Real-time telemetry monitoring console */}
              <div className="border-t border-[var(--border-subtle)] pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-mono">Workflow Sequencer</span>
                  <div className="flex gap-1.5 mt-2">
                    {steps.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                          idx === activeWorkflowStep ? "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" : "bg-[var(--bg-secondary)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--accent-text)] font-semibold block mt-1.5 transition-all">
                    {steps[activeWorkflowStep].label}
                  </span>
                </div>

                <div className="flex flex-col justify-end">
                  <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] block font-mono">Stage Detail</span>
                  <span className="text-[10.5px] text-[var(--text-secondary)] mt-1">
                    {steps[activeWorkflowStep].desc}
                  </span>
                </div>
              </div>

            </GlowCard>
          </div>
          
        </div>

      </div>
    </section>
  );
}

export default AIIntegrationHub;
