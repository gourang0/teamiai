"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  FileText,
  GitBranch,
  Search,
  Play,
  Terminal as TerminalIcon,
  Activity,
  CornerDownLeft,
  Sparkles,
} from "lucide-react";

const playgroundModules = [
  {
    id: "chat",
    name: "AI Chat",
    description: "Multi-agent orchestration & reasoning loops",
    icon: MessageSquare,
    prompts: [
      { text: "Analyze operational logs for latency anomalies.", response: "[INFO] Initializing Latency Scan...\n[CHECK] Scanning HTTP response metrics across 4 gateway targets...\n[WARN] Target GATEWAY_02 indicates a 14% drift in p99 response duration (234ms > 200ms threshold).\n[CORRELATION] Trace ID: 90c-fa23 indicates high database serialization during transaction syncs.\n[ACTION] Recommend tuning connection pool limits on resource DB_TX_REPLICA." },
      { text: "Generate structural model configuration template.", response: "{\n  \"model_routing\": {\n    \"default_gateway\": \"agent-large-v1\",\n    \"fallback_policy\": \"agent-medium-fast\",\n    \"retry_limit\": 3,\n    \"timeout_seconds\": 45,\n    \"guardrails\": {\n      \"block_unsafe_keywords\": true,\n      \"scrub_pii\": true\n    }\n  }\n}" },
      { text: "Outline custom RAG semantic chunking pipeline.", response: "1. Ingest PDF document from source secure bucket.\n2. Scrub non-unicode formatting characters and layout margins.\n3. Split document via semantic sentence sliding window (300 token chunk, 50 token overlap).\n4. Embed chunks using specialized layout-aware vector models.\n5. Write indexes to DB_CLUSTER_PRIMARY with metadata payloads." },
    ],
  },
  {
    id: "document",
    name: "Document Intelligence",
    description: "Structured parsing & layout extraction",
    icon: FileText,
    prompts: [
      { text: "Extract invoice table parameters from billing PDF.", response: "[PARSER] Starting Document Tokenizer...\n[EXTRACTED_METADATA]\n- INVOICE_ID: INV-2026-9042\n- VENDOR: Atlas Shipping Co.\n- DUE_DATE: 2026-07-15\n- LINE_ITEMS:\n  | # | Item Code | Description              | Quantity | Unit Price | Total   |\n  | 1 | SH-094    | Container Freight Port A | 2        | $1,400.00  | $2,800.00 |\n  | 2 | SH-902    | Customs Clearance Fee    | 1        | $450.00    | $450.00   |\n- SUB_TOTAL: $3,250.00\n- TAX_AMOUNT (10%): $325.00\n- NET_TOTAL: $3,575.00" },
      { text: "Sanitize compliance forms of personal identifiers.", response: "[COMPLIANCE_ENGINE] Ingesting record...\n[ACTION] Scrubbing fields...\n- Field [NAME]: 'Johnathan Vance' -> [REDACTED_ALPHA]\n- Field [SSN]: 'XXX-XX-8921' -> [REDACTED_NUMERIC]\n- Field [ADDR]: '14 Pine St, NY' -> [REDACTED_LOCATION]\n[STATUS] Form scrubbed. 3 elements sanitized. Exporting document template." },
      { text: "Categorize incoming legal clauses automatically.", response: "[CLASSIFIER] Loading input legal text...\n[ANALYSIS] Clause length: 120 words. Checking tags...\n[RESULT] Category: LIMITATION_OF_LIABILITY\n[CONFIDENCE] 98.4%\n[HIGHLIGHT] 'Neither party shall be liable for consequential, indirect, or punitive damages...'" },
    ],
  },
  {
    id: "workflow",
    name: "Workflow Intelligence",
    description: "State-machine routing & race condition checks",
    icon: GitBranch,
    prompts: [
      { text: "Model procurement SOW approval routing stages.", response: "[WORKFLOW_DESIGN] Mapping state machine...\n[STATES]\n- [STATE 0] Draft SOW submitted.\n- [STATE 1] Compliance review -> Action: trigger PII scrubbing.\n- [STATE 2] Dept Head sign-off -> Trigger alert: slack channel #procurement.\n- [STATE 3] VP authorization -> Required if SOW total > $50,000.\n- [STATE 4] SOW approved & archived in DB.\n[TRIGGERS] Automatically route to STATE 2 on completion of STATE 1." },
      { text: "Identify latency bottlenecks in automated matching.", response: "[PROFILER] Analyzing execution logs...\n- Step 1: Ingest invoice PDF [Duration: 45ms]\n- Step 2: Extract text variables [Duration: 2400ms] <-- Bottleneck found!\n- Step 3: Match database fields [Duration: 12ms]\n- Step 4: Route approval mail [Duration: 80ms]\n[RECOMMENDATION] Scale extraction pods to concurrency 4 or cache layout tokens." },
      { text: "Check workflow transition checks for race hazards.", response: "[CHECKER] Evaluating transitions...\n- Transition: STATE_1 -> STATE_2 requires check: `invoice_valid == true`.\n- Danger: If `invoice_valid` changes value during concurrent updates, transaction mismatch occurs.\n- Fix: Wrap status checks in database row locking." },
    ],
  },
  {
    id: "search",
    name: "AI Search & Retrieval",
    description: "Semantic queries & filter dictionary rules",
    icon: Search,
    prompts: [
      { text: "Execute query: 'retiree healthcare adjustments'.", response: "[SEARCH] Query: 'retiree healthcare adjustments'\n[EXPANSION] Query expanded to: ['pension healthcare', 'post-employment benefit plan modifications', 'annuitant coverage']\n[RESULTS]\n1. Policy_Guide_2026.pdf (Section 4.2: Annuitant Insurance Caps) - Match Score: 94%\n2. HR_Memo_Final.docx (Adjustments to Retiree Premium Deductibles) - Match Score: 88%\n3. Benefit_Summary_v2.pdf (Post-Employment Healthcare Adjustments) - Match Score: 81%" },
      { text: "Create customized query synonyms dictionary rules.", response: "{\n  \"rules\": [\n    { \"synonyms\": [\"underwriting\", \"risk evaluation\", \"loan profiling\"] },\n    { \"synonyms\": [\"compliance check\", \"regulatory audit\", \"KYC scan\"] }\n  ]\n}" },
      { text: "List metadata filters for database searches.", response: "- 'tenant_id': UUID (organization partition)\n- 'classification': String ['PUBLIC', 'INTERNAL', 'RESTRICTED']\n- 'created_date': DateTimeRange\n- 'language': String ['en', 'es', 'de']" },
    ],
  },
  {
    id: "automation",
    name: "Automation Engine",
    description: "State monitoring & emergency failovers",
    icon: Play,
    prompts: [
      { text: "Simulate automated supplier inventory restock loop.", response: "[SIMULATION] Running restock triggers...\n[MONITOR] Checking stock of SKU: PROD-7910...\n- Stock level: 12 units (Threshold: 20 units).\n- [ACTION] Initiating automated purchase order PO-0941.\n- [STATUS] Routing PO-0941 to vendor Atlas Mfg.\n- [CONFIRM] Vendor response received: Est. delivery 2026-06-25.\n- [ACTION] Updated inventory status: Restock in progress." },
      { text: "Run system health check cron job execution logic.", response: "[HEALTH_CHECK] Running check script...\n- CPU Load: 14% [OK]\n- DB Connection: 2.1ms [OK]\n- Cache Hit Rate: 91% [OK]\n- Storage Usage: 64% [OK]\n[STATUS] All operations nominal. Logging results." },
      { text: "Trigger emergency failover sequence mockup.", response: "[FAILOVER] EMERGENCY TRIGGER DETECTED...\n- Step 1: Diverting traffic from SERVER_PRIMARY to SERVER_SECONDARY.\n- Step 2: Locking database row updates to prevent corruption.\n- Step 3: Resynching write ahead logs.\n- Step 4: System back online on backup replica [Duration: 4.2 seconds]." },
    ],
  },
];

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState("chat");
  const [terminalText, setTerminalText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [activeSubTab, setActiveSubTab] = useState<"terminal" | "telemetry">("terminal");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  const currentModule = playgroundModules.find((mod) => mod.id === activeTab) || playgroundModules[0];

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalText]);

  const handlePromptClick = (text: string, response: string) => {
    if (isTyping) return;
    setIsTyping(true);
    
    // Command execution header style
    const executionHeader = `teamify@system:~$ run_job --module=${activeTab} --prompt="${text}"\n[09:45:54] [SYS] Dispatching pipeline parameters...\n[09:45:55] [JOB] Executing target script...\n\n`;
    setTerminalText(executionHeader);

    let index = 0;
    const interval = setInterval(() => {
      if (index < response.length) {
        setTerminalText((prev) => prev + response.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTerminalText((prev) => prev + "\n\n[09:45:56] [SYS] Task completed. Exit code 0.\nteamify@system:~$ ");
        setIsTyping(false);
      }
    }, 10);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isTyping) return;
    
    const input = customInput;
    setCustomInput("");
    setIsTyping(true);
    
    const executionHeader = `teamify@system:~$ run_job --custom="${input}"\n[09:45:54] [SYS] Routing custom prompt to cognitive engine...\n[09:45:55] [AGENT] Interfacing with database schema...\n\n`;
    setTerminalText(executionHeader);

    const customResponse = `[INFO] Initializing Custom Agent Runtime...\n[PROCESS] Analyzing query metrics for "${input}"...\n[WARN] Action required: No specific script match found. Executing general model fallback.\n[RESULT] Input parsed successfully. System metrics nominal.\n[METADATA] Target: client_sandbox_v4\n[STATUS] Custom automation complete.`;
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < customResponse.length) {
        setTerminalText((prev) => prev + customResponse.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTerminalText((prev) => prev + "\n\n[09:45:56] [SYS] Task completed. Exit code 0.\nteamify@system:~$ ");
        setIsTyping(false);
      }
    }, 10);
  };

  return (
    <div className="bg-gradient-subtle page-playground min-h-screen pb-20">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Interactive Platform</span>
            <h1 className="page-hero-title">AI Playground</h1>
            <p className="page-hero-desc">
              Experience the performance and reliability of our modular AI components through live simulations and custom queries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)] py-12">
        <div className="container mx-auto px-6 max-w-[1200px]">
          {/* Asymmetrical 60/40 Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (40%): Module selection & prompts */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)] mb-1">
                  System Modules
                </h2>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Select a workflow system to load its underlying logic models and prompt configurations.
                </p>
              </div>

              {/* Module selection buttons */}
              <div className="flex flex-col gap-2.5">
                {playgroundModules.map((mod) => {
                  const Icon = mod.icon;
                  const isActive = activeTab === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        if (!isTyping) {
                          setActiveTab(mod.id);
                          setTerminalText("");
                          setIsTyping(false);
                        }
                      }}
                      disabled={isTyping}
                      className={`text-left p-3.5 rounded-lg border text-xs transition-all flex items-start gap-3.5 relative overflow-hidden ${
                        isTyping ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                      } ${
                        isActive
                          ? "bg-[var(--accent-subtle-bg)] border-[var(--accent)]/40 text-[var(--text-primary)] shadow-sm"
                          : "bg-[var(--bg-secondary)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-primary)]"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-md ${
                          isActive ? "bg-[var(--accent)]/10 text-[var(--accent-text)]" : "bg-[var(--bg-primary)] text-[var(--text-muted)]"
                        }`}
                      >
                        <Icon size={16} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-xs flex items-center justify-between">
                          <span>{mod.name}</span>
                          {isActive && (
                            <span className="text-[9px] uppercase tracking-wider text-[var(--accent-text)] font-mono font-medium">
                              LOADED
                            </span>
                          )}
                        </div>
                        <p className="text-[10.5px] text-[var(--text-muted)] mt-0.5 leading-normal">
                          {mod.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-[var(--border-subtle)] pt-6 mt-2">
                <h3 className="text-xs font-bold tracking-wider text-[var(--text-muted)] uppercase mb-3 flex items-center gap-1.5 select-none">
                  <Sparkles size={11} className="text-[var(--accent-text)]" />
                  <span>Execute Sample Prompts</span>
                </h3>
                <div className="flex flex-col gap-2">
                  {currentModule.prompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePromptClick(p.text, p.response)}
                      disabled={isTyping}
                      className={`text-left text-[11.5px] px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg hover:border-[var(--accent)]/30 hover:bg-[var(--surface-elevated)] transition-all flex items-center justify-between group cursor-pointer ${
                        isTyping ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] leading-normal pr-4">
                        {p.text}
                      </span>
                      <Play size={10} className="text-[var(--text-muted)] group-hover:text-[var(--accent-text)] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (60%): Interactive Terminal */}
            <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full"
              >
                <div className="border border-[var(--border-primary)] bg-[var(--bg-alt)] rounded-xl flex flex-col shadow-lg overflow-hidden relative h-full hover:border-[var(--accent)]/40 transition-colors">
                  {/* Terminal Header */}
                  <div className="border-b border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-3 flex items-center justify-between select-none">
                    <div className="flex items-center gap-4">
                      {/* Window lights */}
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                      </div>
                      
                      {/* Tabs */}
                      <div className="flex items-center gap-2 border-l border-[var(--border-subtle)] pl-4">
                        <button
                          onClick={() => setActiveSubTab("terminal")}
                          className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                            activeSubTab === "terminal"
                              ? "bg-[var(--border-primary)] text-[var(--text-primary)]"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <TerminalIcon size={10} />
                          <span>terminal_session</span>
                        </button>
                        <button
                          onClick={() => setActiveSubTab("telemetry")}
                          className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded cursor-pointer transition-colors flex items-center gap-1.5 ${
                            activeSubTab === "telemetry"
                              ? "bg-[var(--border-primary)] text-[var(--text-primary)]"
                              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                          }`}
                        >
                          <Activity size={10} />
                          <span>telemetry.sys</span>
                        </button>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[var(--text-muted)] hidden sm:inline">
                      teamify_sh v1.0.4
                    </span>
                  </div>

                  {/* Terminal Body */}
                  <div className="flex-1 p-5 font-mono text-xs overflow-y-auto min-h-[350px] max-h-[500px] leading-relaxed relative selection:bg-[var(--accent-subtle-bg)]">
                    <AnimatePresence mode="wait">
                      {activeSubTab === "terminal" ? (
                        <motion.div
                          key="terminal"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="h-full flex flex-col justify-between"
                        >
                          <pre className="whitespace-pre-wrap text-[var(--text-primary)] select-text">
                            {terminalText || (
                              <span className="text-[var(--text-muted)] italic">
                                # System ready. Select a module on the left or type a custom command below to begin simulation...
                                {"\n"}# Click a sample prompt to inspect high-speed engine telemetry logs.
                                {"\n\n"}teamify@system:~$ 
                              </span>
                            )}
                            {isTyping && (
                              <span className="animate-ping font-semibold ml-0.5 text-[var(--accent-highlight)]">_</span>
                            )}
                          </pre>
                          <div ref={terminalEndRef} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="telemetry"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4 text-[var(--text-secondary)] select-none"
                        >
                          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 mb-2">
                            <span className="text-[var(--accent-text)] font-bold">RUNTIME TELEMETRY SUMMARY</span>
                            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-semibold uppercase">ONLINE</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-3 rounded-lg">
                              <span className="text-[9px] text-[var(--text-muted)] block uppercase font-semibold">Active Session ID</span>
                              <span className="text-xs text-[var(--text-primary)] font-mono font-medium block mt-0.5">sess_90f230xla</span>
                            </div>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-3 rounded-lg">
                              <span className="text-[9px] text-[var(--text-muted)] block uppercase font-semibold">Gateway Latency (p99)</span>
                              <span className="text-xs text-[var(--text-primary)] font-mono font-medium block mt-0.5">142ms</span>
                            </div>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-3 rounded-lg">
                              <span className="text-[9px] text-[var(--text-muted)] block uppercase font-semibold">Model Provider Rerouting</span>
                              <span className="text-xs text-[var(--text-primary)] font-mono font-medium block mt-0.5">Fallback Active (0%)</span>
                            </div>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-3 rounded-lg">
                              <span className="text-[9px] text-[var(--text-muted)] block uppercase font-semibold">Token Extraction Throughput</span>
                              <span className="text-xs text-[var(--text-primary)] font-mono font-medium block mt-0.5">14,240 tokens/sec</span>
                            </div>
                          </div>
                          <div className="border border-[var(--border-subtle)] p-3 rounded-lg bg-[var(--bg-secondary)]/50">
                            <span className="text-[9px] text-[var(--text-muted)] block uppercase font-semibold mb-2">Memory Utilization Track</span>
                            <div className="flex gap-1 items-end h-8">
                              {[40, 45, 52, 49, 58, 62, 59, 44, 38, 51, 60, 68, 72, 64, 58, 50, 48, 55, 62, 70, 78, 69, 54, 49, 42, 45, 51, 56, 60].map((h, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-[var(--accent)]/30 hover:bg-[var(--accent)] rounded-t transition-all"
                                  style={{ height: `${h}%` }}
                                  title={`System Load: ${h}%`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Terminal Input Line */}
                  <form
                    onSubmit={handleCustomSubmit}
                    className="border-t border-[var(--border-primary)] bg-[var(--bg-secondary)] px-4 py-3 flex items-center gap-2"
                  >
                    <span className="text-[var(--accent-text)] font-mono font-semibold text-xs select-none">
                      teamify@system:~$
                    </span>
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      disabled={isTyping || activeSubTab !== "terminal"}
                      placeholder={
                        activeSubTab !== "terminal"
                          ? "Switch to terminal_session to input commands..."
                          : "Type custom query (e.g. build inventory flow) and press enter..."
                      }
                      className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text-primary)] font-mono disabled:opacity-50 placeholder:text-[var(--text-muted)]"
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !customInput.trim() || activeSubTab !== "terminal"}
                      className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--accent-text)] disabled:opacity-30 disabled:hover:text-[var(--text-muted)] transition-colors cursor-pointer"
                    >
                      <CornerDownLeft size={14} />
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
