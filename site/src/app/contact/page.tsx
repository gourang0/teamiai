"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  MapPin,
  CheckCircle,
  Terminal as TerminalIcon,
  ArrowRight,
  Upload,
  FileText,
  Phone,
  Building2,
  User,
  Briefcase,
  DollarSign,
  CalendarClock,
  Code2,
  Check,
  X,
  Send,
  MessageSquare,
  Sparkles,
  ShieldAlert,
  Cpu,
  Activity,
  Layers,
} from "lucide-react";

/* ───────────────────────────────────────────
   Data Constants
   ─────────────────────────────────────────── */

const techOptions = [
  "Python", "Node.js", "React", "Next.js", "TensorFlow",
  "PyTorch", "LangChain", "OpenAI API", "Custom LLM",
  "Cloud Infrastructure", "Vector Databases", "Kubernetes",
];

const projectTypes = [
  "AI Chatbot / Virtual Assistant",
  "Automation System",
  "Data Pipeline / ETL",
  "Custom ML Model",
  "AI Agent Development",
  "Full-Stack AI Solution",
  "RAG / Knowledge System",
  "AI Team Augmentation",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $100,000",
  "$100,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP (< 2 weeks)",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Just exploring",
];

const nextSteps = [
  { icon: FileText, label: "We Review", desc: "Our team reviews your requirements within 24 hours." },
  { icon: Phone, label: "Discovery Call", desc: "A 30-min call to understand your vision and tech landscape." },
  { icon: Send, label: "Custom Proposal", desc: "We send a tailored solution proposal with timeline & pricing." },
  { icon: Sparkles, label: "Kickoff", desc: "We assemble the right team and begin building immediately." },
];

type FormType = "contact" | "request";
type SubmissionState = "idle" | "parsing" | "handshake" | "transmitting" | "success";

interface ContactFormData {
  name?: string;
  email?: string;
  company?: string;
  inquiryType?: string;
  message?: string;
  fullName?: string;
  jobTitle?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
}

function TelemetryConsole({
  formType,
  data,
  techs,
  files,
  logs,
  latency,
  subState,
}: {
  formType: FormType;
  data: ContactFormData;
  techs: string[];
  files: string[];
  logs: string[];
  latency: number;
  subState: SubmissionState;
}) {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Format JSON values beautifully
  const renderJSON = () => {
    const payload: {
      gateway: string;
      timestamp: string;
      client?: {
        name: string | null;
        email: string | null;
        company: string | null;
        type?: string;
        role?: string | null;
      };
      message_preview?: string | null;
      project?: {
        type: string | null;
        budget: string | null;
        timeline: string | null;
        stack: string[] | null;
        attachments_count: number;
      } | null;
      telemetry?: {
        client_latency_ms: number;
        encryption: string;
        transmission_state: string;
      };
    } = {
      gateway: formType === "contact" ? "sys.quick_inquiry" : "sys.detailed_request",
      timestamp: new Date().toISOString(),
    };

    if (formType === "contact") {
      payload.client = {
        name: data.name || null,
        email: data.email || null,
        company: data.company || null,
        type: data.inquiryType,
      };
      payload.message_preview = data.message ? data.message.slice(0, 45) + (data.message.length > 45 ? "..." : "") : null;
    } else {
      payload.client = {
        name: data.fullName || null,
        email: data.email || null,
        company: data.company || null,
        role: data.jobTitle || null,
      };
      payload.project = {
        type: data.projectType || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        stack: techs.length > 0 ? techs : null,
        attachments_count: files.length,
      };
    }

    payload.telemetry = {
      client_latency_ms: latency,
      encryption: "AES-GCM-256",
      transmission_state: subState.toUpperCase(),
    };

    return JSON.stringify(payload, null, 2);
  };

  return (
    <div className="terminal-window text-[10px] select-none h-full flex flex-col border border-zinc-800/80">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
        </div>
        <div className="font-mono text-[9px] text-zinc-500 flex items-center gap-1.5">
          <Activity size={10} className="text-emerald-500 animate-pulse" />
          sys.telemetry_mon v1.0.4
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden min-h-[400px]">
        {/* Metric Bar */}
        <div className="grid grid-cols-3 border-b border-zinc-900 bg-[#05110f] p-3 text-center gap-2">
          <div>
            <div className="text-[8px] text-zinc-500 uppercase tracking-wider">LATENCY</div>
            <div className="font-mono font-semibold text-emerald-400 text-xs">{latency}ms</div>
          </div>
          <div>
            <div className="text-[8px] text-zinc-500 uppercase tracking-wider">ENCRYPTION</div>
            <div className="font-mono font-semibold text-emerald-400 text-[10px] flex items-center justify-center gap-1">
              AES-256
            </div>
          </div>
          <div>
            <div className="text-[8px] text-zinc-500 uppercase tracking-wider">BUFFER</div>
            <div className="font-mono font-semibold text-emerald-400 text-xs">
              {subState === "success" ? "0.00 KB" : `${(JSON.stringify(data).length / 1024).toFixed(2)} KB`}
            </div>
          </div>
        </div>

        {/* JSON Stream View */}
        <div className="p-4 flex-1 overflow-y-auto font-mono bg-[#030908] border-b border-zinc-900 max-h-[220px]">
          <span className="text-zinc-500">{"// LIVE RECORD STATE PAYLOAD"}</span>
          <pre className="text-zinc-300 mt-1.5 whitespace-pre-wrap select-text leading-relaxed">
            {renderJSON()}
          </pre>
        </div>

        {/* Console Logs */}
        <div className="p-4 flex-1 overflow-y-auto bg-[#020605] max-h-[180px] font-mono scrollbar-thin">
          <span className="text-zinc-500">{"// TRANSACTION GATEWAY LOGS"}</span>
          <div className="mt-1.5 flex flex-col gap-1">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed text-zinc-400">
                <span className="text-emerald-500 font-semibold">&gt; </span>
                {log}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────
   Main Component
   ─────────────────────────────────────────── */

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<FormType>("contact");
  const [latency, setLatency] = useState(14);
  const [submittingState, setSubmittingState] = useState<SubmissionState>("idle");
  const [logs, setLogs] = useState<string[]>([
    "Gateway initialization complete.",
    "Awaiting secure client configuration...",
  ]);

  // Inquiry Form State
  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "AI Systems Consultation",
    message: "",
  });

  // Client Request Form State
  const [requestData, setRequestData] = useState({
    fullName: "",
    email: "",
    company: "",
    jobTitle: "",
    projectType: "",
    budget: "",
    timeline: "",
    requirements: "",
  });
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger telemetry log helper
  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Simulate network latency fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency((prev) => {
        const diff = Math.floor(Math.random() * 5) - 2; // fluctuate by -2 to +2
        const next = prev + diff;
        return next < 5 ? 5 : next > 35 ? 35 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Form input change handlers
  const handleInquiryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
    if (value && value.length === 1) {
      addLog(`Setting inquiry parameter: ${name} = "${value.slice(0, 15)}..."`);
    }
  };

  const handleRequestChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
    if (value && value.length === 1) {
      addLog(`Setting request parameter: ${name} = "${value.slice(0, 15)}..."`);
    }
  };

  const toggleTech = (tech: string) => {
    let nextTechs = [...selectedTech];
    if (nextTechs.includes(tech)) {
      nextTechs = nextTechs.filter((t) => t !== tech);
      addLog(`Detached dependency layer: ${tech}`);
    } else {
      nextTechs.push(tech);
      addLog(`Attached dependency layer: ${tech}`);
    }
    setSelectedTech(nextTechs);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach((file) => addLog(`Staged file buffer: "${file}"`));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach((file) => addLog(`Staged file buffer via drag-drop: "${file}"`));
    }
  };

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f !== name));
    addLog(`Purged file buffer: "${name}"`);
  };

  // Submit form — sends data via mailto and shows success animation
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addLog("Form submission initialized. Staging payload...");
    setSubmittingState("parsing");

    // Build the mailto body from form data
    const targetEmail = "connect@teamify.in";
    let subject = "";
    let body = "";

    if (activeTab === "contact") {
      subject = `Inquiry: ${inquiryData.inquiryType} — from ${inquiryData.name || "Unknown"}`;
      body = [
        `Name: ${inquiryData.name}`,
        `Email: ${inquiryData.email}`,
        `Company: ${inquiryData.company || "N/A"}`,
        `Inquiry Type: ${inquiryData.inquiryType}`,
        ``,
        `Message:`,
        inquiryData.message,
      ].join("\n");
    } else {
      subject = `Project Request: ${requestData.projectType || "General"} — from ${requestData.fullName || "Unknown"}`;
      body = [
        `Name: ${requestData.fullName}`,
        `Email: ${requestData.email}`,
        `Company: ${requestData.company || "N/A"}`,
        `Role: ${requestData.jobTitle || "N/A"}`,
        `Project Type: ${requestData.projectType || "N/A"}`,
        `Budget: ${requestData.budget || "N/A"}`,
        `Timeline: ${requestData.timeline || "N/A"}`,
        `Tech Stack: ${selectedTech.length > 0 ? selectedTech.join(", ") : "N/A"}`,
        ``,
        `Requirements:`,
        requestData.requirements,
      ].join("\n");
    }

    setTimeout(() => {
      addLog("Payload parsed. Formulating secure connection handshake...");
      setSubmittingState("handshake");

      // Open mailto link to actually send the email
      const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setTimeout(() => {
        addLog("Connection accepted. Transmitting encrypted stream packet...");
        setSubmittingState("transmitting");

        setTimeout(() => {
          addLog("Email client opened. Transaction logged successfully!");
          setSubmittingState("success");
        }, 1200);
      }, 1000);
    }, 800);
  };

  const resetForm = () => {
    setSubmittingState("idle");
    setLogs([
      "Gateway initialization complete.",
      "Awaiting secure client configuration...",
    ]);
    setInquiryData({
      name: "",
      email: "",
      company: "",
      inquiryType: "AI Systems Consultation",
      message: "",
    });
    setRequestData({
      fullName: "",
      email: "",
      company: "",
      jobTitle: "",
      projectType: "",
      budget: "",
      timeline: "",
      requirements: "",
    });
    setSelectedTech([]);
    setFiles([]);
  };

  return (
    <div className="theme-emerald bg-gradient-subtle page-contact min-h-screen text-[var(--text-primary)]">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label text-[var(--accent-text)]">Gateway Interface</span>
            <h1 className="page-hero-title">Get in Touch</h1>
            <p className="page-hero-desc text-[var(--text-secondary)]">
              {"Configure your system architecture requirements or consult with our engineering core."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Selector */}
      <section className="container mx-auto px-6 -mt-4 mb-4">
        <div className="flex items-center justify-center gap-2 select-none">
          <button
            onClick={() => {
              setActiveTab("contact");
              resetForm();
            }}
            className={`pill-chip px-6 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "contact"
                ? "active bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/10"
                : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Mail size={12} className="inline mr-1" />
            Quick Inquiry
          </button>
          <button
            onClick={() => {
              setActiveTab("request");
              resetForm();
            }}
            className={`pill-chip px-6 py-2.5 text-xs font-semibold cursor-pointer transition-all duration-300 ${
              activeTab === "request"
                ? "active bg-[var(--accent)] border-[var(--accent)] text-white shadow-md shadow-[var(--accent)]/10"
                : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Briefcase size={12} className="inline mr-1" />
            Project Request
          </button>
        </div>
      </section>

      {/* Content Columns */}
      <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-12">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1200px]">
          
          {/* Form Side */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {submittingState === "success" ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-8 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-xl flex flex-col items-center text-center gap-5 shadow-lg relative overflow-hidden"
                >
                  {/* Subtle decorative aurora blob */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[var(--accent-subtle-bg)] blur-3xl opacity-50" />
                  
                  <div className="text-[var(--accent)] p-4 bg-[var(--accent-subtle-bg)] rounded-full border border-[var(--accent)]/20 relative z-10">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] relative z-10" style={{ fontFamily: "var(--font-display)" }}>
                    Secure Handshake Successful
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm relative z-10">
                    Payload received, encrypted, and recorded in our queue. Our systems engineers will evaluate the requirements and contact you within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    className="btn btn-primary mt-4 select-none cursor-pointer py-2.5 px-6 font-semibold"
                  >
                    Reset Connection Gate
                  </button>
                </motion.div>
              ) : submittingState !== "idle" ? (
                /* Submitting Status / Telemetry Stream Overlay */
                <motion.div
                  key="transmitting-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 bg-[var(--surface-primary)] border border-[var(--border-primary)] rounded-xl flex flex-col items-center justify-center gap-6 h-[450px]"
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--border-subtle)] animate-spin border-t-[var(--accent)]" />
                    <Cpu size={24} className="absolute inset-0 m-auto text-[var(--accent)] animate-pulse" />
                  </div>
                  <div className="text-center flex flex-col gap-2">
                    <h3 className="text-sm font-semibold tracking-wider font-mono text-[var(--accent-text)] uppercase">
                      {submittingState === "parsing" && "Parsing Input Fields..."}
                      {submittingState === "handshake" && "Formulating Key Exchange..."}
                      {submittingState === "transmitting" && "Uploading Secure Buffer..."}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-mono max-w-xs">
                      Connecting to gateway node... Syncing channel state.
                    </p>
                  </div>
                </motion.div>
              ) : activeTab === "contact" ? (
                /* ── Quick Inquiry Form ── */
                <motion.form
                  key="contact-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-6 md:p-8 flex flex-col gap-5 modern-hover-card"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 select-none">
                    <span className="font-mono text-[9px] text-[var(--text-muted)]">sys.gateway_port: 443</span>
                    <span className="font-mono text-[9px] text-[var(--accent-text)]">[CHANNEL: READY]</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-field">
                      <label htmlFor="contact-name">Client Name *</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        required
                        value={inquiryData.name}
                        onChange={handleInquiryChange}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-email">Secure Email *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        value={inquiryData.email}
                        onChange={handleInquiryChange}
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="form-field">
                      <label htmlFor="contact-company">Entity / Company</label>
                      <input
                        type="text"
                        id="contact-company"
                        name="company"
                        value={inquiryData.company}
                        onChange={handleInquiryChange}
                        placeholder="Acme Corp (Optional)"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="contact-inquiryType">Inquiry Gateway</label>
                      <select
                        id="contact-inquiryType"
                        name="inquiryType"
                        value={inquiryData.inquiryType}
                        onChange={handleInquiryChange}
                      >
                        <option>AI Systems Consultation</option>
                        <option>Automation Infrastructure</option>
                        <option>AI Agent Development</option>
                        <option>Knowledge System/RAG</option>
                        <option>AI Team Augmentation</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-message">Inquiry Payload *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={inquiryData.message}
                      onChange={handleInquiryChange}
                      placeholder="Describe system parameters or goals..."
                      className="resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary py-3 justify-center select-none cursor-pointer font-semibold mt-2"
                  >
                    Submit Secure Inquiry
                  </button>
                </motion.form>
              ) : (
                /* ── Client Project Request Form ── */
                <motion.form
                  key="request-form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-6 md:p-8 flex flex-col gap-6 modern-hover-card"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 select-none">
                    <span className="font-mono text-[9px] text-[var(--text-muted)]">sys.gateway_port: 8080</span>
                    <span className="font-mono text-[9px] text-[var(--accent-text)]">[PACKET: DETAILED]</span>
                  </div>

                  {/* Section: Client Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User size={12} className="text-[var(--accent)]" />
                      <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Client Identity</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-field">
                        <label htmlFor="req-fullName">Full Name *</label>
                        <input
                          id="req-fullName"
                          name="fullName"
                          required
                          value={requestData.fullName}
                          onChange={handleRequestChange}
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="req-email">Secure Email *</label>
                        <input
                          id="req-email"
                          name="email"
                          type="email"
                          required
                          value={requestData.email}
                          onChange={handleRequestChange}
                          placeholder="jane@company.com"
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="req-company">Entity / Company</label>
                        <input
                          id="req-company"
                          name="company"
                          value={requestData.company}
                          onChange={handleRequestChange}
                          placeholder="Acme Corp"
                        />
                      </div>
                      <div className="form-field sm:col-span-2">
                        <label htmlFor="req-jobTitle">Role / Job Title</label>
                        <input
                          id="req-jobTitle"
                          name="jobTitle"
                          value={requestData.jobTitle}
                          onChange={handleRequestChange}
                          placeholder="CTO, VP Engineering, Product Manager..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section: Parameters */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase size={12} className="text-[var(--accent)]" />
                      <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Project Scope</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="form-field">
                        <label htmlFor="req-projectType">Project Core</label>
                        <select
                          id="req-projectType"
                          name="projectType"
                          value={requestData.projectType}
                          onChange={handleRequestChange}
                        >
                          <option value="">Choose system...</option>
                          {projectTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="req-budget">Budget Limit</label>
                        <select
                          id="req-budget"
                          name="budget"
                          value={requestData.budget}
                          onChange={handleRequestChange}
                        >
                          <option value="">Budget scope...</option>
                          {budgetRanges.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="req-timeline">Timeline Scope</label>
                        <select
                          id="req-timeline"
                          name="timeline"
                          value={requestData.timeline}
                          onChange={handleRequestChange}
                        >
                          <option value="">Time window...</option>
                          {timelines.map((tl) => (
                            <option key={tl} value={tl}>{tl}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section: Requirements Text */}
                  <div className="form-field">
                    <label htmlFor="req-requirements">Detailed Technical Parameters *</label>
                    <textarea
                      id="req-requirements"
                      name="requirements"
                      required
                      rows={4}
                      value={requestData.requirements}
                      onChange={handleRequestChange}
                      placeholder="Describe system parameters, database integrations, model inputs, and target outcomes..."
                      className="resize-none"
                    />
                  </div>

                  {/* Section: Technology Selector */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 select-none">
                      <Code2 size={12} className="text-[var(--accent)]" />
                      <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Dependency Stack</h4>
                      <span className="text-[9px] text-[var(--text-muted)]">(Select multiple)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {techOptions.map((tech) => (
                        <div
                          key={tech}
                          onClick={() => toggleTech(tech)}
                          className={`custom-checkbox hover:scale-[1.01] transition-transform select-none ${
                            selectedTech.includes(tech)
                              ? "checked border-[var(--accent)] bg-[var(--accent-subtle-bg)] text-[var(--accent-text)]"
                              : "border-[var(--border-subtle)] text-[var(--text-muted)]"
                          }`}
                        >
                          <div className={`check-box border-2 ${
                            selectedTech.includes(tech) ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--border-primary)]"
                          }`}>
                            {selectedTech.includes(tech) && <Check size={10} className="text-[#071311]" />}
                          </div>
                          <span className="text-xs">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: File Attachments */}
                  <div>
                    <div className="flex items-center gap-2 mb-3 select-none">
                      <Upload size={12} className="text-[var(--accent)]" />
                      <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">Payload Attachments</h4>
                    </div>
                    <div
                      className={`drag-drop-zone transition-all duration-300 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                        isDragging ? "border-[var(--accent)] bg-[var(--accent-subtle-bg)]" : "border-[var(--border-subtle)]"
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={20} className="upload-icon mx-auto text-[var(--text-muted)]" />
                      <p className="text-xs text-[var(--text-secondary)] mt-2">
                        Drag specifications here, or <span className="text-[var(--accent-text)] font-semibold">browse</span>
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileSelect}
                        accept=".pdf,.doc,.docx,.png,.jpg,.zip"
                      />
                    </div>

                    {files.length > 0 && (
                      <div className="flex flex-col gap-2 mt-3 select-none">
                        {files.map((file) => (
                          <div key={file} className="flex items-center justify-between px-3 py-1.5 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText size={12} className="text-[var(--accent-text)]" />
                              <span className="text-[10px] text-[var(--text-primary)]">{file}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file)}
                              className="text-[var(--text-muted)] hover:text-red-400 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary py-3.5 justify-center font-semibold text-xs uppercase tracking-wider select-none cursor-pointer mt-2"
                  >
                    Transmit Secure Packet
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Telemetry Column */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="flex flex-col gap-5 sticky top-24">
              
              {/* Telemetry Panel */}
              <div className="flex-1">
                <TelemetryConsole
                  formType={activeTab}
                  data={activeTab === "contact" ? inquiryData : requestData}
                  techs={selectedTech}
                  files={files}
                  logs={logs}
                  latency={latency}
                  subState={submittingState}
                />
              </div>

              {/* Physical Locations / Info Cards */}
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl flex items-center gap-3.5 modern-hover-card">
                  <div className="p-2.5 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg border border-[var(--accent)]/10">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-mono">Secure Core Email</div>
                    <a
                      href="mailto:connect@teamify.in"
                      className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors"
                    >
                      connect@teamify.in
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl flex items-center gap-3.5 modern-hover-card">
                  <div className="p-2.5 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg border border-[var(--accent)]/10">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-mono">Guaranteed Review Time</div>
                    <div className="text-xs font-semibold text-[var(--text-primary)]">
                      &lt; 24 Hours (Global Engineers)
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl flex items-center gap-3.5 modern-hover-card">
                  <div className="p-2.5 bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] rounded-lg border border-[var(--accent)]/10">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-mono">Operational Center</div>
                    <div className="text-xs font-semibold text-[var(--text-primary)]">
                      Distributed Network (Global-First)
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
