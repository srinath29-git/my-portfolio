"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  CornerDownLeft,
  Sparkles,
  X,
} from "lucide-react";
import { answerQuestion, conciergePrompts, type ConciergeLink } from "@/lib/concierge";
import { profile } from "@/data/portfolio";
import { useDialog } from "@/hooks/use-dialog";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  links?: ConciergeLink[];
};

let messageId = 0;

export function Concierge() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++messageId,
      role: "assistant",
      text: "Hi — I'm Srinath's portfolio concierge. I only answer from verified profile information. Ask me about his experience, projects, skills, education, certifications, or availability.",
    },
  ]);
  const [showPrompts, setShowPrompts] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  useDialog(open, () => setOpen(false), panelRef);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("ns:concierge", onOpen);
    return () => window.removeEventListener("ns:concierge", onOpen);
  }, []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.02 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 260);
  }, [open]);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;
    node.scrollTo({
      top: node.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, pending, reducedMotion]);

  const send = (value: string) => {
    const question = value.trim();
    if (!question || pending) return;

    const userMessage: Message = {
      id: ++messageId,
      role: "user",
      text: question,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setShowPrompts(false);
    setPending(true);

    window.setTimeout(
      () => {
        const answer = answerQuestion(question);
        setMessages((current) => [
          ...current,
          {
            id: ++messageId,
            role: "assistant",
            text: answer.text,
            links: answer.links,
          },
        ]);
        setPending(false);
      },
      reducedMotion ? 80 : 620,
    );
  };

  const followLink = (link: ConciergeLink) => {
    if (link.external || link.href.startsWith("mailto:")) return;
    setOpen(false);
    window.setTimeout(() => {
      if (link.href.startsWith("#")) {
        scrollToHash(link.href);
      } else {
        router.push(link.href);
      }
    }, 180);
  };

  return (
    <>
      <AnimatePresence>
        {!open && !footerVisible && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="no-print group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[70] flex h-14 w-14 items-center justify-center gap-0 rounded-full border border-line-strong bg-surface p-0 text-left shadow-2xl transition hover:border-accent/60 hover:bg-surface sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:justify-start sm:gap-3 sm:py-2 sm:pl-2 sm:pr-4"
            aria-label="Open portfolio concierge"
            data-cursor="hover"
          >
            <span className="relative grid h-11 w-11 place-items-center rounded-full bg-accent-strong text-white sm:h-10 sm:w-10">
              <Bot className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-400" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-semibold">Ask the concierge</span>
              <span className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-subtle">
                Verified answers only
              </span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio concierge"
            className="no-print fixed inset-x-3 bottom-3 z-[118] flex h-[min(82vh,620px)] flex-col overflow-hidden rounded-[1.5rem] border border-line-strong bg-surface shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[390px]"
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            <div className="relative border-b border-line px-4 py-3">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(80% 120% at 20% 0%, rgba(77,141,255,0.16), transparent 70%)",
                }}
              />
              <div className="relative flex items-center gap-3">
                <span className="relative grid h-9 w-9 flex-none place-items-center overflow-hidden rounded-full border border-line-strong bg-bg-deep">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatar}
                    alt=""
                    className="h-full w-full object-cover grayscale"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[13px] font-semibold">
                    Portfolio Concierge
                    <Sparkles className="h-3 w-3 text-accent" />
                  </p>
                  <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Grounded in verified data
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="icon-btn h-8 w-8"
                  aria-label="Close concierge"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div
              ref={listRef}
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-md bg-accent text-white"
                        : "rounded-bl-md border border-line bg-surface text-muted",
                    )}
                  >
                    <p>{message.text}</p>
                    {message.links && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {message.links.map((link) => {
                          const external =
                            link.external || link.href.startsWith("mailto:");
                          return (
                            <a
                              key={`${message.id}-${link.href}`}
                              href={link.href}
                              target={external ? "_blank" : undefined}
                              rel={external ? "noreferrer noopener" : undefined}
                              onClick={(event) => {
                                if (!external) {
                                  event.preventDefault();
                                  followLink(link);
                                }
                              }}
                              className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-surface px-2.5 py-1 text-[13px] font-medium text-fg transition hover:border-accent/50 hover:text-accent"
                            >
                              {link.label}
                              <ArrowUpRight className="h-2.5 w-2.5" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {pending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                  </div>
                </div>
              )}

              {showPrompts && (
                <div className="space-y-2 pt-1">
                  <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                    Try asking
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {conciergePrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => send(prompt)}
                        className="rounded-full border border-line px-2.5 py-1.5 text-left text-[13.5px] text-muted transition hover:border-accent/40 hover:bg-accent-soft hover:text-fg"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-line bg-surface p-3">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <label htmlFor="concierge-input" className="sr-only">
                  Ask a question
                </label>
                <input
                  ref={inputRef}
                  id="concierge-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about experience, projects…"
                  className="field h-10 flex-1 rounded-full px-3.5 py-2 text-[13px]"
                  autoComplete="off"
                  maxLength={240}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  className="grid h-10 w-10 flex-none place-items-center rounded-full bg-accent text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Send question"
                >
                  <CornerDownLeft className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-2 text-center font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                Retrieval-based · answers only from this portfolio
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
