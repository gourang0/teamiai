"use client";

import { motion } from "framer-motion";
import { Users, Award, TrendingUp, Cpu } from "lucide-react";
import { GlowCard } from "@/components/GlowCard";

const metrics = [
  { icon: Users, value: "50+", label: "Enterprise Clients" },
  { icon: Award, value: "99.2%", label: "Classification Accuracy" },
  { icon: TrendingUp, value: "$12M+", label: "Operational Savings" },
  { icon: Cpu, value: "8", label: "Industries Deployed" },
];

const clients = [
  { name: "Meridian Financial", code: "client.meridian_fin", industry: "Finance", desc: "Orchestrated AI mortgage underwriting checks, reducing review cycles from 3 days to under 4 hours." },
  { name: "NovaCare Health", code: "client.novacare_health", industry: "Healthcare", desc: "Automated unstructured medical chart translation, outputting summaries for regional hospitals." },
  { name: "Atlas Logistics", code: "client.atlas_logistics", industry: "Logistics", desc: "Designed event-driven routing systems linking dock telemetry to dispatch maps." },
  { name: "Pinnacle Group", code: "client.pinnacle_corp", industry: "Enterprise", desc: "Scrubbed customer records automatically across legacy databases, maintaining compliance." },
  { name: "EduVerse", code: "client.eduverse_sys", industry: "Education", desc: "Indexed 10,000+ course documents into a semantic search system for immediate student access." },
  { name: "UrbanMart", code: "client.urbanmart_retail", industry: "Retail", desc: "Automated supplier invoice matching and approval pipelines, reducing manual accounts overhead by 85%." },
];

const testimonials = [
  {
    quote: "Teamify build systems that actually deliver on the promise. The efficiency gains in our underwriting teams were measurable within weeks of launch.",
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    company: "Meridian Financial",
  },
  {
    quote: "Our clinical documentation load was overwhelming. Teamify helped us automate intake summaries with extreme accuracy, saving hours for our providers.",
    name: "Dr. Marcus Vance",
    role: "VP of Digital Health",
    company: "NovaCare Health",
  },
  {
    quote: "Integrating telemetry feeds directly to shipping lists was a huge challenge. The Teamify pod mapped out and delivered the pipeline on time.",
    name: "David Ross",
    role: "Director of Supply Chain",
    company: "Atlas Logistics",
  },
];

export default function ClientsPage() {
  return (
    <div className="bg-gradient-subtle page-clients min-h-screen">
      {/* Hero */}
      <section className="page-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center select-none"
          >
            <span className="section-label">Trust</span>
            <h1 className="page-hero-title">Our Clients</h1>
            <p className="page-hero-desc">
              We partner with forward-thinking enterprises to construct robust operational AI architectures.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Strip */}
      <section className="section bg-[var(--surface-primary)] border-y border-[var(--border-subtle)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1000px] mx-auto select-none">
            {metrics.map((metric, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl">
                <metric.icon size={20} className="text-[var(--accent-text)] mb-3" />
                <span className="text-3xl font-extrabold text-[var(--text-primary)] font-mono tracking-tight">
                  {metric.value}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-secondary)] mt-2 font-mono font-medium">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 select-none">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Case Highlights</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1050px] mx-auto">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <div className="card glass-panel flex flex-col gap-4 h-full hover:border-[var(--border-primary)] transition-all">
                  <div className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3 select-none">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-sm font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                        {client.name}
                      </h3>
                      <span className="text-[8px] font-mono text-[var(--text-muted)]">[{client.code}]</span>
                    </div>
                    <span className="px-2 py-0.5 bg-[var(--bg-secondary)] text-[var(--accent-text)] text-[9px] font-bold uppercase rounded-md border border-[var(--border-subtle)]">
                      {client.industry}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {client.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 select-none">
            <span className="section-label">Endorsements</span>
            <h2 className="section-title">Client feedback</h2>
            <div className="divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1050px] mx-auto items-stretch">
            {testimonials.map((test, index) => (
              <div key={index} className="flex flex-col">
                <GlowCard className="glass-panel p-6 h-full flex flex-col justify-between gap-6">
                  <blockquote className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
                    &ldquo;{test.quote}&rdquo;
                  </blockquote>
                  
                  <div className="flex flex-col gap-0.5 border-t border-[var(--border-subtle)] pt-4">
                    <cite className="text-xs font-semibold text-[var(--text-primary)] not-italic">
                      {test.name}
                    </cite>
                    <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-mono mt-0.5 select-none">
                      <span>{test.role}</span>
                      <span className="text-[var(--accent-text)]">[{test.company}]</span>
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
