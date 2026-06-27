"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Play, RotateCcw, FileCode, Settings, Activity, Server, Database, ShieldAlert } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

type TabId = "router" | "config" | "log";

const files = {
  router: {
    name: "agent_router.py",
    icon: FileCode,
    language: "python",
    code: `import os
import telemetry
from teamify_sdk import Router, CognitiveChain

def dispatch_pipeline(payload):
    # Initialize gateway router
    router = Router(policy="multi-model-fallback")
    
    # Analyze prompt complexity
    complexity = router.evaluate_complexity(payload["prompt"])
    
    if complexity > 0.8:
        # Route to high-reasoning engine (Claude 3.5 Sonnet)
        target = "claude-3-5-sonnet"
    else:
        # Route to ultra-low-latency pipeline (Groq LLaMA-3)
        target = "groq-llama3-70b"
        
    session = router.dispatch(target, payload)
    
    # Security sweep: scrub PII fields
    scrubbed = telemetry.compliance_scan(session.output)
    return scrubbed
`
  },
  config: {
    name: "config.yaml",
    icon: Settings,
    language: "yaml",
    code: `routing_matrix:
  default_gateway: "groq-llama3-70b"
  fallback_model: "gpt-4o"
  policy: "latency_optimized"
  retry_limit: 3
  timeout_ms: 12000

guardrails:
  pii_scrub_enabled: true
  verification_threshold: 0.95
  enforce_strict_types: true
`
  },
  log: {
    name: "telemetry.log",
    icon: Activity,
    language: "log",
    code: `[16:50:01] [SYS] Ingesting source payloads...
[16:50:01] [SYS] Connection pool size: 32 active
[16:50:02] [ROUTE] Prompt complexity evaluation: High (0.84)
[16:50:02] [ORCHESTRATOR] Selecting primary execution target: Groq LLaMA-3
[16:50:03] [PIPELINE] Invoking Groq API client...
[16:50:03] [SANITY] Running compliance scan (PII scrub active)
[16:50:04] [SUCCESS] Output generated. 1240 tokens returned. Exit code 0.
`
  }
};

const runLogs = [
  "Initializing routing matrix on thread pool #0...",
  "Reading local config.yaml thresholds...",
  "[OK] default_gateway: 'groq-llama3-70b' detected",
  "[ROUTE] Prompt complexity evaluation: Low (0.34)",
  "[ROUTE] Redirecting execution target to low-latency pipeline...",
  "[ORCHESTRATOR] Dispatching payload to Groq LLaMA-3 API...",
  "[TELEMETRY] Connection request latency: 12ms",
  "[SANITY] Initiating compliance sweep: 0 PII issues flagged",
  "[SUCCESS] 842 tokens successfully returned in 24ms.",
  "[SYS] Task completed. Pipeline idle. Exit code 0."
];

export function SystemSandboxBlock() {
  const [activeTab, setActiveTab] = useState<TabId>("router");
  const [isSimulating, setIsSimulating] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [cpuMetric, setCpuMetric] = useState(14);
  const [dbMetric, setDbMetric] = useState(2.4);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (consoleOutput.length > 0 && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [consoleOutput]);

  // Generate random metrics spikes during simulation
  useEffect(() => {
    if (!isSimulating) {
      setCpuMetric(12 + Math.floor(Math.random() * 4));
      setDbMetric(2.1 + parseFloat((Math.random() * 0.4).toFixed(1)));
      return;
    }

    const interval = setInterval(() => {
      setCpuMetric(45 + Math.floor(Math.random() * 30));
      setDbMetric(5.2 + parseFloat((Math.random() * 3.5).toFixed(1)));
    }, 400);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setConsoleOutput([]);

    let logIndex = 0;
    const printNextLog = () => {
      if (logIndex < runLogs.length) {
        setConsoleOutput((prev) => [...prev, `[16:56:${50 + logIndex}] ${runLogs[logIndex]}`]);
        logIndex++;
        // Add random interval to mimic actual processing delay
        setTimeout(printNextLog, 300 + Math.random() * 400);
      } else {
        setIsSimulating(false);
      }
    };

    printNextLog();
  };

  // Minimal syntax highlighter helper
  const renderHighlightedCode = (code: string, tab: TabId) => {
    if (tab === "config") {
      return code.split("\n").map((line, idx) => {
        const parts = line.split(":");
        if (parts.length > 1) {
          return (
            <div key={idx} className="line">
              <span className="text-[var(--text-secondary)]">{idx + 1}</span>
              <span className="text-emerald-400 ml-4">{parts[0]}</span>:
              <span className="text-emerald-400">{parts.slice(1).join(":")}</span>
            </div>
          );
        }
        return (
          <div key={idx} className="line">
             <span className="text-[var(--text-secondary)]">{idx + 1}</span>
             <span className="text-[var(--text-secondary)] ml-4">{line}</span>
          </div>
        );
      });
    }

    if (tab === "log") {
      return code.split("\n").map((line, idx) => {
        let lineClass = "text-[var(--text-secondary)]";
        if (line.includes("[SUCCESS]")) lineClass = "text-emerald-400";
        if (line.includes("[ROUTE]")) lineClass = "text-emerald-400 font-bold";
        return (
          <div key={idx} className="line">
            <span className="text-[var(--text-secondary)]">{idx + 1}</span>
            <span className={`${lineClass} ml-4`}>{line}</span>
          </div>
        );
      });
    }

    // Basic Python syntax mapping
    return code.split("\n").map((line, idx) => {
      const tokens = line.split(/(\s+|=|\(|\)|,|:|\.|\"|\')/);
      return (
        <div key={idx} className="line font-mono">
          <span className="text-[var(--text-secondary)] select-none text-[10px] w-4 inline-block text-right">{idx + 1}</span>
          <span className="ml-4">
            {tokens.map((token, tIdx) => {
              if (["def", "import", "from", "return", "if", "else"].includes(token)) {
                return <span key={tIdx} className="text-pink-500 font-semibold">{token}</span>;
              }
              if (token.startsWith("#")) {
                return <span key={tIdx} className="text-[var(--text-muted)] italic">{token}</span>;
              }
              if (token.startsWith('"') || token.startsWith("'")) {
                return <span key={tIdx} className="text-emerald-400">{token}</span>;
              }
              if (["Router", "CognitiveChain"].includes(token)) {
                return <span key={tIdx} className="text-yellow-400">{token}</span>;
              }
              if (["dispatch_pipeline", "evaluate_complexity", "dispatch", "compliance_scan"].includes(token)) {
                return <span key={tIdx} className="text-emerald-400">{token}</span>;
              }
               return <span key={tIdx} className="text-[var(--text-secondary)]">{token}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <section className="section bg-transparent border-t border-[var(--border-subtle)] py-24 overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[1100px] relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 select-none font-sans">
          <div className="flex flex-col gap-2 max-w-lg">
            <span className="section-label text-left">SIMULATION // SANDBOX</span>
            <h2 className="section-title text-left">System Sandbox</h2>
            <div className="divider text-left" style={{ margin: "12px 0 0" }} />
          </div>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed mt-4 md:mt-0 font-mono">
            Execute model routing pipelines in an isolated test harness to inspect latency and security sweeps.
          </p>
        </div>

        {/* Console & Editor Grid (60/40 Asymmetrical Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Left Column (7 cols): Mock IDE Editor */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)] rounded-xl flex flex-col shadow-lg overflow-hidden relative h-full hover:border-[var(--accent)]/30 transition-colors">
              
              {/* Window Header / File Tabs */}
              <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  {/* Action lights */}
                  <div className="flex gap-1.5 mr-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                  </div>
                  
                  {/* File explorer tabs */}
                  <div className="flex items-center gap-1 border-l border-[var(--border-subtle)] pl-4">
                    {(Object.keys(files) as TabId[]).map((tabId) => {
                      const file = files[tabId];
                      const TabIcon = file.icon;
                      const isActive = activeTab === tabId;
                      return (
                        <button
                          key={tabId}
                          onClick={() => setActiveTab(tabId)}
                          className={`text-[10px] font-mono px-3 py-1 rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? "bg-[var(--surface-primary)] text-[var(--text-primary)] border-b-2 border-[var(--accent)]"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <TabIcon size={11} className={isActive ? "text-[var(--accent-text)]" : ""} />
                          <span>{file.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">IDE EDITOR</span>
              </div>

              {/* Code display screen */}
              <div className="flex-1 p-5 font-mono text-[11px] overflow-y-auto leading-relaxed max-h-[380px] bg-[var(--bg-primary)] text-left">
                <pre className="whitespace-pre-wrap select-text">
                  {renderHighlightedCode(files[activeTab].code, activeTab)}
                </pre>
              </div>

              {/* Execution Actions Toolbar */}
              <div className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-3 flex items-center justify-between">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Language: {files[activeTab].language}</span>
                
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className={`btn btn-primary text-xs font-semibold px-4 py-2 cursor-pointer flex items-center gap-2 ${
                    isSimulating ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSimulating ? (
                    <>
                      <RotateCcw size={13} className="animate-spin" />
                      <span>Running Execution...</span>
                    </>
                  ) : (
                    <>
                      <Play size={13} fill="white" />
                      <span>Run Pipeline Test</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Right Column (5 cols): Live Telemetry Terminal */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between h-full">
            
            {/* Terminal Window */}
            <div className="border border-[var(--border-subtle)] bg-[var(--bg-secondary)] rounded-xl flex flex-col shadow-lg overflow-hidden relative flex-1 min-h-[250px] max-h-[300px]">
              
              {/* Terminal Title */}
              <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-2.5 flex items-center justify-between select-none">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Terminal size={12} />
                  <span className="text-[10px] font-mono tracking-widest uppercase">test_execution_terminal</span>
                </div>
                <span className="text-[9px] font-mono text-[var(--text-muted)]">IDLE</span>
              </div>

              {/* Log view port */}
              <div className="flex-1 p-4 font-mono text-[10.5px] overflow-y-auto leading-relaxed bg-[var(--bg-primary)] text-left">
                {consoleOutput.length === 0 ? (
                  <span className="text-[var(--text-muted)] italic">
                    # Terminal ready. Click "Run Pipeline Test" inside the code editor to initiate live test trace.
                  </span>
                ) : (
                  <div className="space-y-1">
                    {consoleOutput.map((log, idx) => {
                      let color = "text-[var(--text-secondary)]";
                      if (log.includes("[SUCCESS]")) color = "text-emerald-400 font-semibold";
                      if (log.includes("[ROUTE]")) color = "text-emerald-400";
                      if (log.includes("[TELEMETRY]")) color = "text-amber-400";
                      return (
                        <div key={idx} className={`${color} whitespace-pre-wrap select-text`}>
                          {log}
                        </div>
                      );
                    })}
                    {isSimulating && (
                      <span className="animate-ping font-semibold ml-0.5 text-emerald-400">_</span>
                    )}
                  </div>
                )}
                <div ref={terminalEndRef} />
              </div>

            </div>

            {/* Performance Monitoring Stats */}
            <GlowCard className="glass-panel p-5 flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-wider text-[var(--accent-text)] uppercase flex items-center gap-1.5 select-none font-mono">
                <Activity size={12} />
                <span>Runtime Performance Matrix</span>
              </h4>

              <div className="grid grid-cols-2 gap-4">
                {/* Metric 1: CPU utilization */}
                <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-3 rounded-lg flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono text-[9px] uppercase select-none">
                    <Server size={10} />
                    <span>CPU Thread Load</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
                      {cpuMetric}%
                    </span>
                    <span className={`text-[8px] font-mono uppercase ${isSimulating ? "text-emerald-400 animate-pulse" : "text-[var(--text-muted)]"}`}>
                      {isSimulating ? "Active Peak" : "Standby"}
                    </span>
                  </div>
                </div>

                {/* Metric 2: Database locks latency */}
                <div className="bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-3 rounded-lg flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[var(--text-muted)] font-mono text-[9px] uppercase select-none">
                    <Database size={10} />
                    <span>DB Lock Duration</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-bold font-mono text-[var(--text-primary)] tracking-tight">
                      {dbMetric}ms
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400 uppercase select-none">
                      Nominal
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bars showing simulation thread status */}
              <div className="border-t border-[var(--border-subtle)] pt-3 flex flex-col gap-2 font-mono text-[9.5px]">
                <div className="flex justify-between text-[var(--text-muted)] uppercase select-none">
                  <span>Securities Sweep Clearance</span>
                  <span className={isSimulating ? "text-emerald-400" : "text-[var(--text-muted)]"}>
                    {isSimulating ? "Scanning..." : "Passed"}
                  </span>
                </div>
                <div className="w-full bg-[var(--surface-primary)] h-1 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-400"
                    initial={{ width: "100%" }}
                    animate={{ width: isSimulating ? ["0%", "40%", "85%", "100%"] : "100%" }}
                    transition={{
                      duration: isSimulating ? 5 : 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>

            </GlowCard>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SystemSandboxBlock;
