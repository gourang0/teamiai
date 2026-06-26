"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  ArrowRight,
  ChevronDown,
  X,
  Briefcase,
  Home,
  Award,
  Monitor,
  Gem,
  CalendarCheck,
  Send,
  FileText,
  Users,
  MessageSquare,
  Handshake,
  Check,
  Upload,
  ExternalLink,
  Globe,
  Cpu,
  Database,
  Palette,
  Megaphone,
  Settings,
  Sparkles,
  Clock,
  CloudSun,
  Building2,
  CheckCircle,
  Download,
  UserCheck,
  Compass,
} from "lucide-react";
import Link from "next/link";

/* ───────────────────────────────────────────
   Data Definitions
   ─────────────────────────────────────────── */

interface Role {
  id: string;
  title: string;
  department: string;
  deptClass: string;
  location: string;
  type: string;
  description: string;
  salary: string;
  experienceLevel: "Junior" | "Mid" | "Senior" | "Lead";
  workMode: "Remote" | "Hybrid" | "On-site";
  details: {
    about: string;
    impact: string;
    do: string[];
    bring: string[];
    techStack: string[];
    team: { name: string; role: string; avatar: string }[];
  };
}

const roles: Role[] = [
  {
    id: "eng-01",
    title: "Senior AI Systems Engineer",
    department: "Engineering",
    deptClass: "engineering",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Senior",
    workMode: "Remote",
    salary: "$180K – $240K",
    description: "Design and implement custom orchestration frameworks, coordinating multi-model agent systems for enterprise clients.",
    details: {
      about: "Join the Core AI Systems team to architect high-performance LLM routing, agent orchestration engines, and multi-model consensus frameworks. We build the core capabilities powering Teamify's client solutions.",
      impact: "In this role, you will lead the architecture of our agent coordination kernel, reducing inference latency by 35% and improving task accuracy for client automation systems.",
      do: [
        "Design and deploy custom orchestrators using LangGraph, AutoGen, and proprietary frameworks.",
        "Implement guardrails, semantic cache layers, and fallback logic across model routers.",
        "Collaborate with Client Delivery teams to solve deep integration bottlenecks.",
        "Conduct peer reviews and establish testing paradigms for non-deterministic code."
      ],
      bring: [
        "5+ years of software development experience, with 2+ years specialized in production LLM systems.",
        "Expert knowledge of Python, asynchronous programming, and vector databases (pgvector, Qdrant).",
        "Deep familiarity with cognitive architectures, agentic loops, and semantic search paradigms.",
        "Strong engineering foundations: CI/CD, secure containerization, and observability."
      ],
      techStack: ["Python", "LangChain", "FastAPI", "PostgreSQL", "Docker", "Qdrant", "OpenAI / Claude API"],
      team: [
        { name: "Vikram N.", role: "VP Engineering", avatar: "VN" },
        { name: "Priya S.", role: "Senior AI Engineer", avatar: "PS" }
      ]
    }
  },
  {
    id: "eng-02",
    title: "ML Infrastructure Engineer",
    department: "Engineering",
    deptClass: "infrastructure",
    location: "San Francisco",
    type: "Full-time",
    experienceLevel: "Senior",
    workMode: "Hybrid",
    salary: "$170K – $230K",
    description: "Build high-throughput, secure model deployment systems and telemetry pipelines supporting millions of tokens per minute.",
    details: {
      about: "Help us build the compute and orchestration backbone that deploys, monitors, and scales proprietary models and fine-tuned open-source LLMs.",
      impact: "You will own the infrastructure pipelines that deploy models on dedicated clusters, maintaining 99.95% uptime and optimizing hardware utilization.",
      do: [
        "Design and manage Kubernetes GPU clusters on AWS, GCP, and CoreWeave.",
        "Configure inference servers using vLLM, Triton, and TGI.",
        "Build telemetry systems capturing token throughput, model latency, and prompt footprints.",
        "Optimize cold start latencies and autoscaling thresholds for serverless inference."
      ],
      bring: [
        "4+ years of DevOps or Infrastructure experience with significant GPU workload management.",
        "Advanced Kubernetes architecture expertise, including KServe or Ray cluster setups.",
        "Strong scripting and automation foundations in Go, Python, and Terraform.",
        "Knowledge of CUDA profiling and Triton Inference Server optimization."
      ],
      techStack: ["Kubernetes", "Ray", "vLLM", "Terraform", "Go", "Python", "Prometheus", "AWS / GCP"],
      team: [
        { name: "Hassan K.", role: "Director of Infra", avatar: "HK" },
        { name: "Alex M.", role: "SRE Lead", avatar: "AM" }
      ]
    }
  },
  {
    id: "eng-03",
    title: "Backend Engineer — AI Platform",
    department: "Engineering",
    deptClass: "engineering",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Mid",
    workMode: "Remote",
    salary: "$160K – $220K",
    description: "Architect scalable API layers and data pipelines that power our AI orchestration platform serving Fortune 500 clients.",
    details: {
      about: "Join the platform team to build APIs, websocket servers, and event queues that coordinate high-throughput agent systems.",
      impact: "You will design real-time data sync channels, handling hundreds of concurrent agent conversations and backend database ETLs.",
      do: [
        "Develop high-performance APIs and streaming endpoints in Node.js and Go.",
        "Design message queues and event brokers to manage non-blocking agent routines.",
        "Integrate legacy client databases with real-time semantic query tools.",
        "Ensure compliant enterprise-grade security protocols (SOC2, HIPAA) across backend endpoints."
      ],
      bring: [
        "3+ years of backend engineering experience at scale.",
        "Strong proficiency in Node.js (TypeScript), NestJS, or Go.",
        "Hands-on experience with Redis, Kafka, and relational databases.",
        "Familiarity with streaming protocols (SSE, WebSockets) and API gateways."
      ],
      techStack: ["Node.js", "TypeScript", "NestJS", "Go", "Kafka", "Redis", "PostgreSQL", "gRPC"],
      team: [
        { name: "Sarah L.", role: "Tech Lead", avatar: "SL" },
        { name: "David P.", role: "Senior Backend Engineer", avatar: "DP" }
      ]
    }
  },
  {
    id: "prod-01",
    title: "Senior Product Manager — AI",
    department: "Product",
    deptClass: "product",
    location: "London",
    type: "Full-time",
    experienceLevel: "Senior",
    workMode: "Hybrid",
    salary: "$160K – $210K",
    description: "Define and drive the product roadmap for our enterprise AI platform, collaborating with engineering and design teams.",
    details: {
      about: "Work at the intersection of business strategy and cutting-edge machine learning. Guide enterprise AI tools from conceptual prototypes to production integrations.",
      impact: "You will own the lifecycle of our agent design-studio product, directly contributing to our 200% year-over-year client expansion.",
      do: [
        "Translate technical AI capabilities into clear, highly intuitive user flows.",
        "Synthesize client feedback, model telemetry, and industry trends into product roadmaps.",
        "Run user discovery interviews, scoping exercises, and product specification docs.",
        "Collaborate daily with UX designers, engineers, and client delivery architects."
      ],
      bring: [
        "4+ years of Product Management experience, preferably in B2B SaaS, developer tools, or AI platforms.",
        "Solid technical comprehension of LLM capabilities, prompt tuning, and embeddings.",
        "Experience leading cross-functional teams using agile methodologies.",
        "Excellent communication skills tailored to both engineers and client executives."
      ],
      techStack: ["Jira", "Figma", "Amplitude", "Notion", "Mixpanel", "Slack"],
      team: [
        { name: "Marcus C.", role: "Head of Product", avatar: "MC" },
        { name: "Emma W.", role: "Product Designer", avatar: "EW" }
      ]
    }
  },
  {
    id: "prod-02",
    title: "Frontend Engineer",
    department: "Product",
    deptClass: "product",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Mid",
    workMode: "Remote",
    salary: "$140K – $190K",
    description: "Build robust, minimal playground tools and internal operators dashboards using Next.js and modern web technologies.",
    details: {
      about: "Join our UI team to build premium, lightning-fast interfaces for model playgrounds, agent canvases, and client telemetry dashboards.",
      impact: "You will own the creation of interactive node-based editors, allowing non-technical operators to build agent graphs visually.",
      do: [
        "Craft rich, accessible, and performant web interfaces with React, Next.js, and TypeScript.",
        "Implement dynamic node-editing features using ReactFlow or custom canvas logic.",
        "Optimize application loading parameters, asset bundles, and state containers.",
        "Build shared component libraries incorporating fluid micro-animations."
      ],
      bring: [
        "3+ years of professional frontend development experience.",
        "Exceptional mastery of modern CSS, React, TypeScript, and state management (Zustand, Redux).",
        "Experience with canvas-rendering, SVG structures, or node-graph libraries.",
        "Passionate about pixel-perfect implementation and premium UI styling."
      ],
      techStack: ["React", "Next.js", "TypeScript", "Zustand", "TailwindCSS", "Framer Motion", "ReactFlow"],
      team: [
        { name: "Marcus Chen", role: "Frontend Lead", avatar: "MC" },
        { name: "Suresh P.", role: "UI Engineer", avatar: "SP" }
      ]
    }
  },
  {
    id: "des-01",
    title: "Senior Product Designer",
    department: "Design",
    deptClass: "design",
    location: "Remote",
    type: "Full-time",
    experienceLevel: "Senior",
    workMode: "Remote",
    salary: "$150K – $200K",
    description: "Craft intuitive interfaces for complex AI workflows, creating design systems that scale across our product suite.",
    details: {
      about: "Shape how humans interact with agentic AI. Establish the design standards, component behaviors, and aesthetic philosophies for Teamify's entire ecosystem.",
      impact: "Your designs will establish Teamify as the easiest platform to deploy and orchestrate custom enterprise agents.",
      do: [
        "Translate abstract backend agent processes into structured, clear, and beautiful UI mockups.",
        "Maintain and scale our internal design system across multiple application projects.",
        "Create responsive layouts, visual guides, and interactive wireframes in Figma.",
        "Conduct user research and usability testing on core developer tools."
      ],
      bring: [
        "5+ years of experience designing complex developer tools, dashboards, or data-visualization tools.",
        "Mastery of Figma, component architecture, auto-layout, and prototyping techniques.",
        "Strong portfolio demonstrating sleek, minimal, premium dark-mode aesthetics.",
        "Ability to code basic layouts/CSS is a significant plus."
      ],
      techStack: ["Figma", "Adobe CC", "Framer", "CSS", "Storybook"],
      team: [
        { name: "Elena R.", role: "Design Director", avatar: "ER" },
        { name: "Marcus C.", role: "Head of Product", avatar: "MC" }
      ]
    }
  },
  {
    id: "del-01",
    title: "AI Solutions Architect",
    department: "Delivery",
    deptClass: "delivery",
    location: "Bangalore",
    type: "Full-time",
    experienceLevel: "Senior",
    workMode: "Hybrid",
    salary: "$130K – $180K",
    description: "Engage directly with client engineering leadership to design integrations, map legacy databases, and lay down specs.",
    details: {
      about: "Connect our core models to real-world client networks. Solve complex database schemas, security mandates, and performance parameters for Fortune 500 partners.",
      impact: "You will accelerate client onboarding times by 40% and secure technical alignment during key proof-of-concept stages.",
      do: [
        "Lead technical integration calls, system mapping, and solution architecture scoping.",
        "Write clear architectural design records (ADRs) and interface definitions.",
        "Configure hybrid cloud environments and secure APIs to link with client databases.",
        "Build early prototypes demonstrating core agent system viability."
      ],
      bring: [
        "6+ years of technical consulting, solutions architecture, or backend engineering experience.",
        "Strong capabilities in SQL databases, hybrid cloud configuration, and secure APIs.",
        "Comfortable discussing high-level business logic and low-level code parameters.",
        "Familiarity with containerization (Docker, ECS) and enterprise security protocols."
      ],
      techStack: ["AWS / Azure", "Docker", "Python", "SQL Server", "Terraform", "OpenAPI"],
      team: [
        { name: "Sarah Williams", role: "Solutions Architect", avatar: "SW" },
        { name: "Anand G.", role: "VP Client Delivery", avatar: "AG" }
      ]
    }
  }
];

const departments = ["All", "Engineering", "Product", "Design", "Delivery"];
const locations = ["All", "Remote", "San Francisco", "London", "Bangalore"];
const jobTypes = ["All", "Full-time", "Contract"];
const experienceLevels = ["All", "Junior", "Mid", "Senior", "Lead"];

const perks = [
  { icon: Home, label: "Remote-First Culture", desc: "Work from wherever you do your best thinking. Flexible core hours, async-first communication, and a global team.", wide: true },
  { icon: Award, label: "$5K Learning Budget", desc: "Yearly education allowance for conferences, courses, books, or any learning that levels you up.", wide: false },
  { icon: Briefcase, label: "Top-Tier Benefits", desc: "Comprehensive health, dental, and vision for you and dependents. Mental health support included.", wide: false },
  { icon: Monitor, label: "Latest Tools & Hardware", desc: "Top-spec MacBook Pro or equivalent, ergonomic office gear, and all the software subscriptions you need.", wide: false },
  { icon: Gem, label: "Equity & Stock Options", desc: "Meaningful equity participation so you grow with us. Early employees get generous option packages.", wide: false },
  { icon: CalendarCheck, label: "Unlimited PTO", desc: "Take the time you need. We trust our team to manage their own schedule and recharge regularly.", wide: true },
];

const faqItems = [
  {
    category: "Interview Prep",
    q: "What is your interview structure like?",
    a: "We use a 4-step process: (1) 30-min screening call, (2) A practical role-relevant assessment, (3) System Architecture & Design discussion, (4) Culture Alignment. We do not ask arbitrary algorithmic questions; all assessments mirror our daily work."
  },
  {
    category: "Remote & Work Location",
    q: "Do you support fully remote work?",
    a: "Yes! About 75% of our team is fully remote. For hybrid roles in SF, London, and Bangalore, we recommend 2-3 days in the office, but schedules are highly flexible and set by individual teams."
  },
  {
    category: "Visa & Relocation",
    q: "Do you sponsor visas or assist with relocation?",
    a: "We support visa transfer and new sponsorships for senior engineering and delivery roles in our office hubs. Relocation assistance packages are discussed during offer extension."
  },
  {
    category: "Equipment & Workspace",
    q: "What equipment do you provide?",
    a: "Every employee receives a high-spec MacBook Pro (or equivalent Linux machine), a 34\" curved monitor, keyboard/mouse accessories, and a $1,000 stipend to set up their home workspace."
  }
];

const hiringSteps = [
  { label: "Application Screen", desc: "Our recruitment core reviews your resume within 5 business days." },
  { label: "Technical Deep-Dive", desc: "A 60-minute practical session covering system layout and logic." },
  { label: "Architecture / Design", desc: "Collaborative systems design, database mapping, and scalability specs." },
  { label: "Culture & Values Alignment", desc: "A values sync to ensure mutual fit, growth goals, and alignment." },
  { label: "Leadership Sync / Offer", desc: "Final alignments, review package specifications, and rapid offer." }
];

/* ───────────────────────────────────────────
   Interactive Hub Map Card Clock Helper
   ─────────────────────────────────────────── */

function LocalClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <span className="font-mono text-xs font-semibold text-[var(--accent-text)]">{time}</span>;
}

/* ───────────────────────────────────────────
   AI Resume Matcher component
   ─────────────────────────────────────────── */

function ResumeMatcher({ onMatch }: { onMatch: (matches: Record<string, number>) => void }) {
  const [dragging, setDragging] = useState(false);
  const [scanState, setScanState] = useState<"idle" | "scanning" | "done">("idle");
  const [fileName, setFileName] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const addLog = (msg: string, delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        resolve();
      }, delay);
    });
  };

  const runScanningFlow = async (name: string) => {
    setFileName(name);
    setScanState("scanning");
    setLogs([]);

    await addLog("Parsing upload package...", 200);
    await addLog(`File lock resolved: "${name}"`, 300);
    await addLog("Initializing optical character indexing...", 400);
    await addLog("Extracting skill indicators and semantic tokens...", 500);
    await addLog("CORRELATING SKILLS: Detected key phrases [Python, LLM, APIs, Docker]", 600);
    await addLog("Comparing vectors with active role indices...", 700);
    await addLog("Matching scores calculated successfully.", 600);

    setScanState("done");

    // Simulate match results
    const matches: Record<string, number> = {
      "eng-01": 98, // Senior AI Systems Engineer
      "eng-03": 84, // Backend Engineer
      "prod-02": 72, // Frontend
    };
    onMatch(matches);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      runScanningFlow(e.target.files[0].name);
    }
  };

  const handleDemoSelect = (demoResume: string) => {
    runScanningFlow(demoResume);
  };

  return (
    <div className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-6 flex flex-col gap-6 max-w-[700px] mx-auto scanner-container">
      {scanState === "scanning" && <div className="scanner-line" />}
      
      <div className="border-b border-[var(--border-subtle)] pb-3 select-none flex items-center justify-between">
        <span className="font-mono text-[9px] text-[var(--text-muted)]">sys.resume_matcher_kernel</span>
        <span className="font-mono text-[9px] text-[var(--accent-text)]">
          {scanState === "idle" && "READY"}
          {scanState === "scanning" && "PARSING"}
          {scanState === "done" && "COMPLETED"}
        </span>
      </div>

      {scanState === "idle" && (
        <div className="flex flex-col gap-6">
          <div
            className={`drag-drop-zone py-10 border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors ${
              dragging ? "border-[var(--accent)] bg-[var(--accent-subtle-bg)]" : "border-[var(--border-subtle)]"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                runScanningFlow(e.dataTransfer.files[0].name);
              }
            }}
            onClick={() => document.getElementById("resume-input")?.click()}
          >
            <Upload size={32} className="mx-auto text-[var(--text-muted)]" />
            <p className="text-sm font-semibold text-[var(--text-primary)] mt-3">
              Drag & drop your resume here, or <span className="text-[var(--accent-text)]">browse</span>
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">PDF, DOCX, TXT — Max 10MB</p>
            <input
              id="resume-input"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.docx,.txt"
            />
          </div>

          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Test with a demo resume</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleDemoSelect("Jane_Doe_AI_Architect.pdf")}
                className="pill-chip cursor-pointer py-1.5 px-3 text-[11px] hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
              >
                AI Architect Spec
              </button>
              <button
                onClick={() => handleDemoSelect("John_Smith_Fullstack.docx")}
                className="pill-chip cursor-pointer py-1.5 px-3 text-[11px] hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
              >
                Fullstack Dev Spec
              </button>
            </div>
          </div>
        </div>
      )}

      {scanState === "scanning" && (
        <div className="flex flex-col gap-4 py-6">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-2 border-[var(--border-subtle)] border-t-[var(--accent)] rounded-full animate-spin" />
            <span className="text-xs font-semibold tracking-wider font-mono text-[var(--accent-text)]">SCANNING SOURCE MEMORY...</span>
          </div>

          <div className="p-3 bg-[#040d0c] rounded-lg border border-[var(--border-subtle)] font-mono text-[10px] h-[120px] overflow-y-auto mt-2">
            {logs.map((log, i) => (
              <div key={i} className="text-[var(--text-secondary)] leading-relaxed">
                <span className="text-[var(--accent)] font-bold">&gt; </span> {log}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      )}

      {scanState === "done" && (
        <div className="flex flex-col gap-5 text-center items-center py-4">
          <div className="p-3 bg-[var(--accent-subtle-bg)] border border-[var(--accent)]/20 rounded-full text-[var(--accent)]">
            <CheckCircle size={32} />
          </div>
          <div>
            <h4 className="text-base font-bold text-[var(--text-primary)]">Parsing Session Complete</h4>
            <p className="text-xs text-[var(--text-muted)] mt-1">Processed: {fileName}</p>
          </div>
          <button
            onClick={() => setScanState("idle")}
            className="btn btn-secondary py-2 px-5 text-xs select-none cursor-pointer mt-2"
          >
            Scan Another Resume
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────
   Candidate Portal / Mock Application Tracker
   ─────────────────────────────────────────── */

interface PortalMatch {
  roleName: string;
  date: string;
  stage: string;
  stageIdx: number;
  description: string;
  actionRequired: boolean;
}

function CandidatePortal() {
  const [emailInput, setEmailInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [simulatedMatch, setSimulatedMatch] = useState<PortalMatch | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    // mock search results
    if (emailInput.toLowerCase().includes("offer")) {
      setSimulatedMatch({
        roleName: "Senior AI Systems Engineer",
        date: "June 24, 2026",
        stage: "Offer Extended",
        stageIdx: 4,
        description: "We are thrilled to extend an offer! Please review the package details.",
        actionRequired: true,
      });
    } else {
      setSimulatedMatch({
        roleName: "Backend Engineer — AI Platform",
        date: "June 25, 2026",
        stage: "Technical Deep-Dive",
        stageIdx: 1,
        description: "Your screening call is approved. Up next is a 60-minute technical review panel.",
        actionRequired: false,
      });
    }
    setChecked(true);
  };

  const handleAcceptOffer = () => {
    alert("Offer Accepted! Confetti initialized. Welcome to Teamify!");
    setSimulatedMatch((prev) =>
      prev
        ? {
            ...prev,
            stage: "Offer Accepted (Onboarding Init)",
            stageIdx: 5,
            actionRequired: false,
          }
        : null
    );
  };

  return (
    <div className="max-w-[700px] mx-auto flex flex-col gap-6">
      
      {/* Tracking Form */}
      <form onSubmit={handleTrack} className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-6 flex flex-col gap-4 modern-hover-card">
        <div className="border-b border-[var(--border-subtle)] pb-3 select-none flex items-center justify-between">
          <span className="font-mono text-[9px] text-[var(--text-muted)]">sys.candidate_access_gate</span>
          <span className="font-mono text-[9px] text-[var(--accent-text)]">[READY]</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="portal-email" className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Registered Email Address</label>
          <div className="flex gap-2">
            <input
              id="portal-email"
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="e.g. priority@candidate.com (Try 'offer@candidate.com')"
              className="flex-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-4 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            />
            <button
              type="submit"
              className="btn btn-primary font-semibold px-5 select-none cursor-pointer"
            >
              Verify Identity
            </button>
          </div>
        </div>
      </form>

      {/* Tracker Status Display */}
      <AnimatePresence>
        {checked && simulatedMatch && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-6 flex flex-col gap-6"
          >
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span className="dept-tag engineering">Engineering</span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">{simulatedMatch.roleName}</h3>
                <span className="text-xs text-[var(--text-muted)]">Submitted: {simulatedMatch.date}</span>
              </div>
              <span className={`pill-chip select-none py-1 px-3.5 text-xs font-semibold ${
                simulatedMatch.actionRequired ? "bg-[#138A64] text-white border-[#138A64] animate-pulse" : "bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] border-[var(--accent)]/20"
              }`}>
                {simulatedMatch.stage}
              </span>
            </div>

            {/* Visual Timeline Steps */}
            <div>
              <div className="flex items-center justify-between w-full text-[9px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-3">
                <span>Timeline Stage</span>
                <span>{simulatedMatch.stageIdx + 1} of 5</span>
              </div>
              
              <div className="flex items-center gap-1 w-full justify-between select-none">
                {hiringSteps.map((step, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center relative text-center">
                    {/* Line segment connecting steps */}
                    {idx < hiringSteps.length - 1 && (
                      <div className={`absolute top-2 left-[50%] right-[-50%] h-[2px] z-0 ${
                        idx < simulatedMatch.stageIdx ? "bg-[var(--accent)]" : "bg-[var(--border-subtle)]"
                      }`} />
                    )}
                    
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center relative z-10 ${
                      idx < simulatedMatch.stageIdx
                        ? "bg-[var(--accent)] border-[var(--accent)] text-[#071311]"
                        : idx === simulatedMatch.stageIdx
                        ? "bg-[#071311] border-[var(--accent)] text-[var(--accent-text)] shadow-sm shadow-[var(--accent)]/50"
                        : "bg-[#071311] border-[var(--border-subtle)] text-[var(--text-muted)]"
                    }`}>
                      {idx < simulatedMatch.stageIdx ? (
                        <Check size={8} />
                      ) : (
                        <div className={`w-1 h-1 rounded-full ${idx === simulatedMatch.stageIdx ? "bg-[var(--accent)]" : "bg-[var(--text-muted)]"}`} />
                      )}
                    </div>
                    
                    <span className={`text-[8px] font-mono mt-1.5 leading-tight ${
                      idx <= simulatedMatch.stageIdx ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                    }`}>
                      {step.label.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#05110f] border border-[var(--border-subtle)] rounded-lg flex flex-col gap-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-semibold flex items-center gap-1">
                <Compass size={10} className="text-[var(--accent)]" />
                Next milestone guidelines
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {simulatedMatch.description}
              </p>

              {simulatedMatch.actionRequired && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleAcceptOffer}
                    className="btn btn-primary text-xs py-2 px-4 select-none cursor-pointer flex items-center gap-1"
                  >
                    <UserCheck size={12} /> Accept Contract Offer
                  </button>
                  <button
                    onClick={() => alert("Downloading secure contract offer package...")}
                    className="btn btn-secondary text-xs py-2 px-4 select-none cursor-pointer flex items-center gap-1"
                  >
                    <Download size={12} /> Read Terms PDF
                  </button>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────
   Immersive Job Application Inside Side-Drawer
   ─────────────────────────────────────────── */

function DrawerApplicationForm({ role, onSubmit, onCancel }: { role: Role; onSubmit: () => void; onCancel: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    resumeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleStepSubmit} className="flex flex-col gap-5 flex-1 p-6 justify-between select-none">
      
      <div className="flex flex-col gap-4">
        {/* Step Progress Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`flex-1 h-[3px] rounded-full transition-colors ${
              i <= step ? "bg-[var(--accent)]" : "bg-[var(--border-subtle)]"
            }`} />
          ))}
        </div>
        
        <div className="flex justify-between items-center select-none mt-1">
          <span className="font-mono text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Step {step + 1} of 3</span>
          <span className="text-xs text-[var(--accent-text)] font-semibold">
            {step === 0 && "Personal Identity"}
            {step === 1 && "Secure Dossier Links"}
            {step === 2 && "Application Memo"}
          </span>
        </div>

        <div className="mt-2">
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div className="form-field">
                <label htmlFor="drawer-app-name">Full Legal Name *</label>
                <input id="drawer-app-name" name="name" required value={form.name} onChange={handleChange} placeholder="Jane Doe" />
              </div>
              <div className="form-field">
                <label htmlFor="drawer-app-email">Secure Email *</label>
                <input id="drawer-app-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="form-field">
                <label htmlFor="drawer-app-linkedin">LinkedIn Dossier</label>
                <input id="drawer-app-linkedin" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
              </div>
              <div className="form-field">
                <label htmlFor="drawer-app-portfolio">Github / Portfolio Target</label>
                <input id="drawer-app-portfolio" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://github.com/..." />
              </div>
              <div
                className={`drag-drop-zone py-6 transition-colors border-2 border-dashed rounded-lg text-center cursor-pointer ${
                  form.resumeName ? "border-[var(--accent)] bg-[var(--accent-subtle-bg)] text-[var(--accent-text)]" : "border-[var(--border-subtle)]"
                }`}
                onClick={() => setForm({ ...form, resumeName: "resume_staged.pdf" })}
              >
                <Upload size={20} className="mx-auto text-[var(--text-muted)]" />
                {form.resumeName ? (
                  <p className="text-xs font-semibold text-[var(--accent-text)] mt-2">{form.resumeName}</p>
                ) : (
                  <>
                    <p className="text-xs font-semibold text-[var(--text-primary)] mt-2">Upload resume package</p>
                    <p className="text-[10px] text-[var(--text-muted)]">PDF or DOCX — Max 10MB</p>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-field">
              <label htmlFor="drawer-app-cover">Application statement memo *</label>
              <textarea
                id="drawer-app-cover"
                name="coverLetter"
                required
                rows={7}
                value={form.coverLetter}
                onChange={handleChange}
                placeholder="Explain why you wish to align with Teamify's operational core and how your skill vectors match..."
                className="resize-none"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 mt-4 gap-4 select-none">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="btn btn-secondary py-2.5 px-4 text-xs select-none cursor-pointer"
          >
            Previous Stage
          </button>
        ) : (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary py-2.5 px-4 text-xs select-none cursor-pointer"
          >
            Cancel Application
          </button>
        )}

        <button
          type="submit"
          className="btn btn-primary py-2.5 px-6 text-xs font-semibold select-none cursor-pointer"
        >
          {step < 2 ? "Continue" : "Finalize Transmission"}
        </button>
      </div>

    </form>
  );
}

/* ───────────────────────────────────────────
   Immersive Job Detail Drawer Component
   ─────────────────────────────────────────── */

function JobDetailDrawer({ role, onClose }: { role: Role; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<"about" | "stack" | "apply">("about");
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} />
      
      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="drawer-container theme-emerald border-l border-[var(--border-primary)]"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[var(--border-subtle)] flex items-start justify-between select-none">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`dept-tag ${role.deptClass}`}>{role.department}</span>
              <span className="text-[10px] text-[var(--accent-text)] uppercase font-semibold">{role.location} · {role.type}</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
              {role.title}
            </h3>
            <span className="text-xs text-[var(--text-muted)] font-mono">{role.salary}</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer rounded-lg bg-[var(--surface-primary)] border border-[var(--border-subtle)]">
            <X size={16} />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[var(--border-subtle)] bg-[#091b18] select-none text-xs">
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 py-3 text-center font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === "about" ? "border-[var(--accent)] text-[var(--accent-text)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Role details
          </button>
          <button
            onClick={() => setActiveTab("stack")}
            className={`flex-1 py-3 text-center font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === "stack" ? "border-[var(--accent)] text-[var(--accent-text)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Stack & Team
          </button>
          <button
            onClick={() => setActiveTab("apply")}
            className={`flex-1 py-3 text-center font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === "apply" ? "border-[var(--accent)] text-[var(--accent-text)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            Quick Apply
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-6 flex flex-col gap-6"
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 select-none">About the Mission</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{role.details.about}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 select-none">System Impact</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{role.details.impact}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 select-none">Key Responsibilities</h4>
                  <ul className="flex flex-col gap-2 pl-4 list-disc text-xs text-[var(--text-secondary)] leading-relaxed">
                    {role.details.do.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 select-none">Technical Qualifications</h4>
                  <ul className="flex flex-col gap-2 pl-4 list-disc text-xs text-[var(--text-secondary)] leading-relaxed">
                    {role.details.bring.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "stack" && (
              <motion.div
                key="stack-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-6 flex flex-col gap-6"
              >
                {/* Tech stack */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 select-none">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2 select-none">
                    {role.details.techStack.map((tech) => (
                      <span key={tech} className="pill-chip text-[10px] py-1 px-3 border-[var(--border-primary)] bg-[var(--surface-primary)] text-[var(--text-secondary)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team members */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 select-none">Core Collaborators</h4>
                  <div className="flex flex-col gap-3">
                    {role.details.team.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 p-3.5 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-[var(--accent-subtle-bg)] border border-[var(--accent)]/15 text-[var(--accent-text)] font-bold flex items-center justify-center text-sm font-mono select-none">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[var(--text-primary)]">{member.name}</p>
                          <p className="text-[10px] text-[var(--text-muted)]">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standard perks summary */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 select-none">Shared Benefits</h4>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--text-secondary)] select-none">
                    <div className="p-2.5 bg-[var(--surface-primary)] rounded border border-[var(--border-subtle)] flex items-center gap-2">
                      <Gem size={12} className="text-[var(--accent-text)]" /> Equity Stock Options
                    </div>
                    <div className="p-2.5 bg-[var(--surface-primary)] rounded border border-[var(--border-subtle)] flex items-center gap-2">
                      <Monitor size={12} className="text-[var(--accent-text)]" /> Laptop & workspace budget
                    </div>
                    <div className="p-2.5 bg-[var(--surface-primary)] rounded border border-[var(--border-subtle)] flex items-center gap-2">
                      <Award size={12} className="text-[var(--accent-text)]" /> $5K learning allowance
                    </div>
                    <div className="p-2.5 bg-[var(--surface-primary)] rounded border border-[var(--border-subtle)] flex items-center gap-2">
                      <CalendarCheck size={12} className="text-[var(--accent-text)]" /> Unlimited vacation PTO
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "apply" && (
              <motion.div
                key="apply-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="h-full flex flex-col"
              >
                {isApplied ? (
                  <div className="p-8 flex flex-col items-center justify-center text-center gap-4 py-16">
                    <div className="p-3.5 bg-[var(--accent-subtle-bg)] border border-[var(--accent)]/15 rounded-full text-[var(--accent)]">
                      <CheckCircle size={32} />
                    </div>
                    <h4 className="text-base font-bold text-[var(--text-primary)]">Application Transmitted</h4>
                    <p className="text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
                      Thank you for applying. Your application profile has been synced with our recruitment pipeline. We will follow up via email within 5 business days.
                    </p>
                    <button
                      onClick={onClose}
                      className="btn btn-primary py-2 px-6 text-xs font-semibold select-none cursor-pointer mt-2"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <DrawerApplicationForm
                    role={role}
                    onSubmit={() => setIsApplied(true)}
                    onCancel={onClose}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Drawer Footer CTA (only if not on Apply tab) */}
        {activeTab !== "apply" && (
          <div className="p-5 border-t border-[var(--border-subtle)] bg-[#071311]/80 backdrop-blur-sm flex items-center justify-between select-none">
            <div className="text-[10px] text-[var(--text-muted)] font-mono">sys.flow_state: READY</div>
            <button
              onClick={() => setActiveTab("apply")}
              className="btn btn-primary py-2.5 px-6 font-semibold text-xs flex items-center gap-1.5 select-none cursor-pointer"
            >
              Initialize Application <ArrowRight size={12} />
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

/* ───────────────────────────────────────────
   Careers Main Layout Component
   ─────────────────────────────────────────── */

type ActiveTab = "positions" | "matcher" | "portal";

export default function CareersPage() {
  const [activeSubTab, setActiveSubTab] = useState<ActiveTab>("positions");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedExp, setSelectedExp] = useState("All");
  const [applyingRole, setApplyingRole] = useState<Role | null>(null);

  // Resume matcher scores
  const [matchedRoles, setMatchedRoles] = useState<Record<string, number>>({});

  // Hub values
  const [activeHubFilters, setActiveHubFilters] = useState<string | null>(null);

  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      // Search text correlation
      const matchSearch =
        searchQuery === "" ||
        role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Select filters correlation
      const matchDept = selectedDept === "All" || role.department === selectedDept;
      const matchLocation = selectedLocation === "All" || role.location === selectedLocation;
      const matchType = selectedType === "All" || role.type === selectedType;
      const matchExp = selectedExp === "All" || role.experienceLevel === selectedExp;
      
      // Global hub correlation
      const matchHub = !activeHubFilters || role.location === activeHubFilters;

      return matchSearch && matchDept && matchLocation && matchType && matchExp && matchHub;
    });
  }, [searchQuery, selectedDept, selectedLocation, selectedType, selectedExp, activeHubFilters]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedDept("All");
    setSelectedLocation("All");
    setSelectedType("All");
    setSelectedExp("All");
    setActiveHubFilters(null);
    setMatchedRoles({});
  }, []);

  const hasActiveFilters = searchQuery !== "" || selectedDept !== "All" || selectedLocation !== "All" || selectedType !== "All" || selectedExp !== "All" || activeHubFilters !== null || Object.keys(matchedRoles).length > 0;

  // Handle Match callback from Resume Matcher
  const handleMatches = (matches: Record<string, number>) => {
    setMatchedRoles(matches);
    setActiveSubTab("positions");
    // clear other filter layers so we show matches
    setSelectedDept("All");
    setSelectedLocation("All");
    setSelectedType("All");
    setSelectedExp("All");
    setActiveHubFilters(null);
  };

  return (
    <div className="theme-emerald bg-gradient-subtle page-careers min-h-screen text-[var(--text-primary)]">
      
      {/* Cinematic Hero */}
      <section className="emerald-mesh relative min-h-[55vh] flex items-center justify-center select-none pt-24 pb-12">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <span className="section-label text-[var(--accent-text)] mb-4">ENGINEERING HUMAN CAPITAL</span>
            <h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 max-w-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Build the <span className="text-gradient">Future of AI</span>
            </h1>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8">
              Join a distributed network of developers, SREs, and design architects engineering robust, minimal operational intelligence systems.
            </p>

            {/* Micro counters */}
            <div className="flex items-center gap-5 text-xs text-[var(--text-muted)] font-mono border-t border-b border-[var(--border-subtle)] py-2.5 px-6 bg-[#071311]/40 backdrop-blur-sm rounded-lg select-none">
              <span className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-[var(--accent)]" /> {roles.length} vacancies
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-primary)]" />
              <span>4 global hubs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-primary)]" />
              <span>SOC2 compliant</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Tab Controls */}
      <section className="container mx-auto px-6 mb-6">
        <div className="flex border-b border-[var(--border-subtle)] justify-center gap-6 text-sm select-none font-semibold">
          <button
            onClick={() => setActiveSubTab("positions")}
            className={`py-3.5 cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === "positions" ? "border-[var(--accent)] text-[var(--accent-text)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Briefcase size={14} /> Open Vacancies
          </button>
          <button
            onClick={() => setActiveSubTab("matcher")}
            className={`py-3.5 cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === "matcher" ? "border-[var(--accent)] text-[var(--accent-text)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Cpu size={14} /> AI Resume Matcher
          </button>
          <button
            onClick={() => setActiveSubTab("portal")}
            className={`py-3.5 cursor-pointer border-b-2 transition-all flex items-center gap-1.5 ${
              activeSubTab === "portal" ? "border-[var(--accent)] text-[var(--accent-text)]" : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Users size={14} /> Candidate Portal
          </button>
        </div>
      </section>

      {/* Tab Switcher Content */}
      <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-10">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            
            {activeSubTab === "positions" && (
              <motion.div
                key="positions-subtab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-8"
              >
                {/* Search & Filter Bar */}
                <div className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-4 md:p-5 flex flex-col gap-4 max-w-[1000px] mx-auto w-full modern-hover-card">
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Search Field */}
                    <div className="flex-1 min-w-[240px] bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 flex items-center gap-2">
                      <Search size={14} className="text-[var(--text-muted)]" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search positions by keyword..."
                        className="bg-transparent border-none text-xs text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] w-full"
                      />
                      {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-[10px] text-red-400 hover:underline cursor-pointer">
                          Reset
                        </button>
                      )}
                    </div>

                    {/* Filter selects */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 outline-none text-[11px] text-[var(--text-secondary)] cursor-pointer"
                      >
                        <option value="All">All Departments</option>
                        {departments.filter(d => d !== "All").map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>

                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 outline-none text-[11px] text-[var(--text-secondary)] cursor-pointer"
                      >
                        <option value="All">All Locations</option>
                        {locations.filter(l => l !== "All").map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>

                      <select
                        value={selectedExp}
                        onChange={(e) => setSelectedExp(e.target.value)}
                        className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 outline-none text-[11px] text-[var(--text-secondary)] cursor-pointer"
                      >
                        <option value="All">All Experience</option>
                        {experienceLevels.filter(e => e !== "All").map(e => (
                          <option key={e} value={e}>{e} Level</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {activeHubFilters && (
                    <div className="flex items-center gap-2 select-none text-[10px] bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] border border-[var(--accent)]/15 px-3 py-1 rounded w-fit">
                      <span>Filtering by hub: {activeHubFilters}</span>
                      <button onClick={() => setActiveHubFilters(null)} className="hover:text-white cursor-pointer font-bold"><X size={10} /></button>
                    </div>
                  )}

                  {Object.keys(matchedRoles).length > 0 && (
                    <div className="flex items-center justify-between select-none text-[10px] bg-[#138A64]/10 text-[#38D996] border border-[#138A64]/20 px-3 py-1.5 rounded">
                      <span className="flex items-center gap-1"><Sparkles size={11} /> Resume matches active. Roles sorted by semantic compatibility.</span>
                      <button onClick={() => setMatchedRoles({})} className="hover:underline cursor-pointer font-semibold">Clear Matches</button>
                    </div>
                  )}
                </div>

                {/* Role list grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1000px] mx-auto w-full select-none">
                  {filteredRoles
                    .map((role) => ({
                      ...role,
                      score: matchedRoles[role.id] || null,
                    }))
                    .sort((a, b) => (b.score || 0) - (a.score || 0))
                    .map((role) => (
                      <div
                        key={role.id}
                        className="card bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-5 flex flex-col gap-3.5 group modern-hover-card"
                      >
                        <div className="flex items-start justify-between">
                          <span className={`dept-tag ${role.deptClass}`}>{role.department}</span>
                          {role.score ? (
                            <span className="bg-[#138A64] text-white border border-[#138A64]/20 rounded-full px-2.5 py-0.5 text-[9px] font-bold font-mono animate-pulse">
                              {role.score}% Match
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono text-[var(--text-muted)] font-semibold">{role.experienceLevel}</span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{role.title}</h3>
                          <div className="flex gap-3 text-[10px] text-[var(--text-muted)] flex-wrap font-mono uppercase tracking-wide">
                            <span className="flex items-center gap-0.5"><MapPin size={10} /> {role.location}</span>
                            <span>•</span>
                            <span>{role.type}</span>
                            <span>•</span>
                            <span>{role.workMode}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-1">
                          {role.description}
                        </p>

                        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3.5 mt-1 select-none">
                          <span className="text-xs font-semibold text-[var(--accent-text)]">{role.salary}</span>
                          <button
                            onClick={() => setApplyingRole(role)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--accent-text)] hover:text-white transition-colors cursor-pointer"
                          >
                            Read Details <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                  {filteredRoles.length === 0 && (
                    <div className="col-span-2 text-center py-12 flex flex-col items-center gap-3">
                      <p className="text-xs text-[var(--text-muted)] font-mono">NO VACANCIES FOUND MATCHING FILTER CRITERIA</p>
                      <button onClick={clearFilters} className="btn btn-secondary py-1.5 px-4 text-xs cursor-pointer">Reset Filters</button>
                    </div>
                  )}
                </div>

              </motion.div>
            )}

            {activeSubTab === "matcher" && (
              <motion.div
                key="matcher-subtab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ResumeMatcher onMatch={handleMatches} />
              </motion.div>
            )}

            {activeSubTab === "portal" && (
              <motion.div
                key="portal-subtab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <CandidatePortal />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* Global Hubs showcase */}
      <section className="section bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] py-14">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10 select-none">
            <span className="section-label text-[var(--accent-text)]">NETWORK NODES</span>
            <h2 className="section-title text-2xl md:text-3xl font-bold">Global Office Hubs</h2>
            <div className="divider mx-auto" />
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              We operate distributed core pods linked synchronously. Click a hub to filter vacancies in that geographic location.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1000px] mx-auto w-full select-none">
            
            <div onClick={() => setActiveHubFilters("Remote")} className={`hub-card ${activeHubFilters === "Remote" ? "border-[var(--accent)] bg-[var(--surface-primary)] shadow-md" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <Globe size={18} className="text-[var(--accent-text)]" />
                <span className="text-[9px] font-mono text-[var(--text-muted)]">GLOBAL</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Fully Remote</h3>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 mb-4 leading-relaxed">Operate anywhere across core timezone corridors.</p>
              <div className="flex justify-between items-center mt-auto border-t border-[var(--border-subtle)] pt-3 text-[10px]">
                <span className="text-[var(--text-muted)]">Time:</span>
                <span className="font-mono text-[10px]">UTC COORDINATED</span>
              </div>
            </div>

            <div onClick={() => setActiveHubFilters("San Francisco")} className={`hub-card ${activeHubFilters === "San Francisco" ? "border-[var(--accent)] bg-[var(--surface-primary)] shadow-md" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <Building2 size={18} className="text-[var(--accent-text)]" />
                <span className="text-[9px] font-mono text-[var(--text-muted)]">PACIFIC</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">San Francisco</h3>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 mb-4 leading-relaxed">Core systems infrastructure and executive nodes.</p>
              <div className="flex justify-between items-center mt-auto border-t border-[var(--border-subtle)] pt-3 text-[10px]">
                <span className="text-[var(--text-muted)]">Local clock:</span>
                <LocalClock timeZone="America/Los_Angeles" />
              </div>
            </div>

            <div onClick={() => setActiveHubFilters("London")} className={`hub-card ${activeHubFilters === "London" ? "border-[var(--accent)] bg-[var(--surface-primary)] shadow-md" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <Building2 size={18} className="text-[var(--accent-text)]" />
                <span className="text-[9px] font-mono text-[var(--text-muted)]">GMT</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">London</h3>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 mb-4 leading-relaxed">Product definition and European delivery architectures.</p>
              <div className="flex justify-between items-center mt-auto border-t border-[var(--border-subtle)] pt-3 text-[10px]">
                <span className="text-[var(--text-muted)]">Local clock:</span>
                <LocalClock timeZone="Europe/London" />
              </div>
            </div>

            <div onClick={() => setActiveHubFilters("Bangalore")} className={`hub-card ${activeHubFilters === "Bangalore" ? "border-[var(--accent)] bg-[var(--surface-primary)] shadow-md" : ""}`}>
              <div className="flex justify-between items-start mb-4">
                <Building2 size={18} className="text-[var(--accent-text)]" />
                <span className="text-[9px] font-mono text-[var(--text-muted)]">IST</span>
              </div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Bangalore</h3>
              <p className="text-[10px] text-[var(--text-secondary)] mt-1 mb-4 leading-relaxed">Engineering core and scale testing workloads.</p>
              <div className="flex justify-between items-center mt-auto border-t border-[var(--border-subtle)] pt-3 text-[10px]">
                <span className="text-[var(--text-muted)]">Local clock:</span>
                <LocalClock timeZone="Asia/Kolkata" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hiring Prep Accordion Roadmap */}
      <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] py-14">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10 select-none">
            <span className="section-label text-[var(--accent-text)]">ALIGNMENT CYCLE</span>
            <h2 className="section-title text-2xl md:text-3xl font-bold"> Hires Pipeline</h2>
            <div className="divider mx-auto" />
            <p className="text-xs text-[var(--text-secondary)] max-w-sm leading-relaxed">
              We design our recruitment milestones to be fast, clear, and highly practical.
            </p>
          </div>

          <div className="max-w-[750px] mx-auto flex flex-col gap-4 select-none">
            {hiringSteps.map((step, idx) => (
              <div key={idx} className="p-4 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl flex gap-4 items-start hover:border-[var(--accent)]/30 transition-colors">
                <div className="w-6 h-6 rounded-full bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] border border-[var(--accent)]/15 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{step.label}</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] py-14">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-10 select-none">
            <span className="section-label text-[var(--accent-text)]">RESOURCES</span>
            <h2 className="section-title text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="divider mx-auto" />
          </div>

          <div className="max-w-[750px] mx-auto flex flex-col gap-3 select-none">
            {faqItems.map((item, idx) => (
              <div key={idx} className="p-4 bg-[var(--surface-primary)] border border-[var(--border-subtle)] rounded-xl flex flex-col gap-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h4 className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                    <span className="text-[var(--accent-text)] font-mono text-[9px] uppercase tracking-wider">[{item.category}]</span>
                    {item.q}
                  </h4>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-1 mt-0.5">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Side-Drawer Overlay */}
      <AnimatePresence>
        {applyingRole && (
          <JobDetailDrawer role={applyingRole} onClose={() => setApplyingRole(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
