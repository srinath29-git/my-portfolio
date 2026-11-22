"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Minus,
  Plus,
  Sparkles,
  Trophy,
} from "lucide-react";
import { certifications, learningLog } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const typeIcons = {
  Course: BookOpen,
  Program: Sparkles,
  Participation: Trophy,
};

export function Proof() {
  const [openItem, setOpenItem] = useState<string | null>(learningLog[0]?.title ?? null);
  const reducedMotion = useReducedMotion();

  return (
    <section id="proof" className="section bg-bg-deep/30">
      <div className="shell">
        <SectionHeading
          index="06"
          eyebrow="Proof"
          title={
            <>
              Credentials,
              <br />
              not <span className="serif text-muted">claims.</span>
            </>
          }
          description="Two credentials verified through Credly, plus a learning log of courses and challenges that shaped how I think. Each entry names the issuer and the evidence."
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 text-accent" />
              2 verified badges
            </span>
            <span className="h-3 w-px bg-line" />
            <span>4 learning entries</span>
          </div>
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-2 lg:gap-7">
          {certifications.map((certification, index) => (
            <Reveal key={certification.id} delay={index * 0.06}>
              <a
                href={certification.credentialUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-500 hover:border-accent/40 hover:shadow-[var(--shadow)] sm:p-7"
                data-cursor="hover"
                aria-label={`${certification.title} — verify credential on Credly`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-[13px] font-medium tracking-[0.04em] text-fg">
                      {certification.mark}
                    </span>
                    <div>
                      <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                        {certification.issuer}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
                        <BadgeCheck className="h-3 w-3" />
                        Verified credential
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                    {certification.issued}
                  </span>
                </div>

                <h3 className="relative mt-7 max-w-md text-balance font-display text-[clamp(1.3rem,2.3vw,1.85rem)] font-semibold leading-[1.08] tracking-[-0.04em] transition-colors group-hover:text-accent">
                  {certification.title}
                </h3>

                <p className="relative mt-3 text-[13px] leading-relaxed text-muted">
                  {certification.note}
                </p>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {certification.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="relative mt-auto">
                  <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
                    <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      Credly / {certification.id}
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px] text-fg transition-colors group-hover:text-accent">
                      Verify credential
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="mono text-subtle">Learning log</p>
              <h3 className="mt-4 text-balance font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                The courses and challenges behind the list.
              </h3>
              <p className="mt-4 max-w-sm text-pretty text-[0.94rem] leading-relaxed text-muted">
                Not every course earns a badge. These are the ones that changed how I
                approach a problem, with the detail behind each entry.
              </p>
              <div className="mt-6 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Click a row to expand
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line">
              {learningLog.map((item, index) => {
                const open = openItem === item.title;
                const Icon = typeIcons[item.type];
                return (
                  <Reveal key={item.title} delay={index * 0.04}>
                    <div className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setOpenItem(open ? null : item.title)}
                        aria-expanded={open}
                        aria-controls={`learning-${index}`}
                        className="group flex w-full items-start gap-4 py-5 text-left"
                        data-cursor="hover"
                      >
                        <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg border border-line bg-surface text-subtle transition-colors group-hover:border-accent/30 group-hover:text-accent">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span
                              className={cn(
                                "text-balance text-[14px] font-medium leading-snug transition-colors",
                                open ? "text-accent" : "text-fg",
                              )}
                            >
                              {item.title}
                            </span>
                            <span className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                              {item.date}
                              <span className="hidden rounded-full border border-line px-2 py-0.5 sm:inline">
                                {item.type}
                              </span>
                            </span>
                          </span>
                          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
                            <span>{item.issuer}</span>
                            {item.meta && (
                              <>
                                <span className="h-2.5 w-px bg-line" />
                                <span className="text-subtle">{item.meta}</span>
                              </>
                            )}
                          </span>
                        </span>
                        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-line text-subtle transition-colors group-hover:border-accent/40 group-hover:text-accent">
                          {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            id={`learning-${index}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: reducedMotion ? 0 : 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-2xl pb-6 pl-12 pr-10 text-pretty text-[1.1rem] leading-relaxed text-muted">
                              {item.detail}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 border-y border-line sm:grid-cols-4">
          {[
            { value: "91%", label: "Accenture AI course", detail: "Overall score" },
            { value: "46h", label: "Information security", detail: "Saylor University" },
            { value: "5.25L+", label: "QuizOff participants", detail: "National AI quiz" },
            { value: "02", label: "Verified credentials", detail: "IBM + Google Cloud" },
          ].map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.04}
              className={cn(
                "group px-4 py-6 transition-colors duration-500 hover:bg-accent-soft sm:px-5",
                index !== 0 && "border-l border-line",
                index === 2 && "border-l-0 sm:border-l",
                index < 2 && "border-b border-line sm:border-b-0",
              )}
            >
              <p className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-none tracking-[-0.05em]">
                {stat.value}
              </p>
              <p className="mt-2.5 text-[13px] font-medium text-fg">{stat.label}</p>
              <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                {stat.detail}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4" delay={0.05}>
          <p className="max-w-2xl text-[13px] leading-relaxed text-subtle">
            Credential links resolve to public Credly badges. Learning-log entries are
            self-reported from completed courses and participation records; they are not
            presented as certifications.
          </p>
          <Link
            href="#record"
            className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
            data-cursor="hover"
          >
            See where these were applied
            <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
