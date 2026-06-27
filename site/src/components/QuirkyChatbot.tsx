"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, User, Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const jokes = [
  "Why did the AI go broke? Because he lost his cache! 💸",
  "Why did the neural network go to therapy? It had too many hidden layers! 🧠",
  "How many AI researchers does it take to change a lightbulb? None, they just define it as an optimization problem and wait! 💡",
  "Why do machine learning algorithms love coffee? Because it helps them converge faster without sleeping! ☕",
  "There are 10 types of people: those who understand binary, and those who don't. 🔢",
  "What is a machine learning model's favorite music genre? Algorhythm! 🎵"
];

export function QuirkyChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Beep boop! 🤖 I'm the Teamify self-aware chatbot. I was added to address the critique that our website is 'too dark and serious'. Ask me anything or let me crack a joke!",
    },
  ]);
  const [currentJokeIdx, setCurrentJokeIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendPrompt = (promptType: "joke" | "agents" | "discount" | "work") => {
    let userText = "";
    let botText = "";

    if (promptType === "joke") {
      userText = "Tell me an AI joke!";
      botText = jokes[currentJokeIdx];
      setCurrentJokeIdx((prev) => (prev + 1) % jokes.length);
    } else if (promptType === "agents") {
      userText = "Explain AI agents simply.";
      botText = "An AI agent is like a virtual employee with a brain (LLM), memory (databases), and tools (APIs, email, spreadsheets). Instead of just answering questions, they execute complete workflows autonomously.";
    } else if (promptType === "discount") {
      userText = "Is there a discount?";
      botText = "No discounts, but our AI agents don't require health insurance, 401(k) matches, or organic snacks in the pantry. So it practically pays for itself! 😉";
    } else if (promptType === "work") {
      userText = "How do we start?";
      botText = "Easy! Head over to our contact page and schedule a consultation. I'm routing you there now. Hold onto your seat... 🚀";
      setTimeout(() => {
        setIsOpen(false);
        router.push("/contact");
      }, 2000);
    }

    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    // Simulated typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[330px] sm:w-[360px] h-[450px] bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden mb-4 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-xl bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] flex items-center justify-center border border-[var(--border-subtle)]">
                  <Bot size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[var(--text-primary)] font-mono leading-none flex items-center gap-1.5">
                    <span>SYS_BOT_V1</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </h4>
                  <span className="text-[9px] text-[var(--text-muted)] font-mono mt-0.5 block">
                    Telemetry: Active & Witty
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer rounded-full hover:bg-[var(--bg-primary)]"
              >
                <X size={15} />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scroll-smooth"
            >
              {messages.map((msg, idx) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 max-w-[85%] ${
                      isBot ? "self-start" : "self-end flex-row-reverse"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] ${
                        isBot
                          ? "bg-[var(--accent-subtle-bg)] text-[var(--accent-text)] border border-[var(--border-subtle)]"
                          : "bg-[var(--text-primary)] text-[var(--bg-primary)]"
                      }`}
                    >
                      {isBot ? <Bot size={11} /> : <User size={11} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        isBot
                          ? "bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-tl-sm"
                          : "bg-[var(--accent)] text-white rounded-tr-sm font-semibold"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Prompt Selector Footer */}
            <div className="p-3 bg-[var(--bg-secondary)]/50 border-t border-[var(--border-subtle)] flex flex-col gap-2">
              <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-wider block px-1">
                Choose a query prompt:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => handleSendPrompt("joke")}
                  className="px-2.5 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent-text)] hover:border-[var(--accent)] transition-all cursor-pointer"
                >
                  ⚡ AI Joke
                </button>
                <button
                  onClick={() => handleSendPrompt("agents")}
                  className="px-2.5 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent-text)] hover:border-[var(--accent)] transition-all cursor-pointer"
                >
                  🤖 Explain Agents
                </button>
                <button
                  onClick={() => handleSendPrompt("discount")}
                  className="px-2.5 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent-text)] hover:border-[var(--accent)] transition-all cursor-pointer"
                >
                  💰 Discount?
                </button>
                <button
                  onClick={() => handleSendPrompt("work")}
                  className="px-2.5 py-1.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[10px] font-mono text-[var(--text-secondary)] hover:text-[var(--accent-text)] hover:border-[var(--accent)] transition-all cursor-pointer"
                >
                  🚀 Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-12 w-12 rounded-full flex items-center justify-center shadow-xl cursor-pointer text-white transition-all duration-300 ${
            isOpen
              ? "bg-[var(--text-primary)] text-[var(--bg-primary)] rotate-90"
              : "bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:scale-105"
          }`}
          aria-label="Toggle assistant"
        >
          {isOpen ? <X size={20} className="text-[var(--bg-primary)]" /> : <MessageSquare size={20} />}
        </motion.button>
      </div>
    </div>
  );
}
