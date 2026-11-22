"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Sparkles,
} from "lucide-react";
import { exploring, skillGroups } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const groupIcons = {
  ai: BrainCircuit,
  languages: Database,
  cloud: Cloud,
  craft: Code2,
};

const levels = {
  core: { label: "Core", bars: 3 },
  working: { label: "Working", bars: 2 },
  exploring: { label: "Exploring", bars: 1 },
} as const;

const allSkills = skillGroups.flatMap((group) => group.skills);
const levelCounts = {
  core: allSkills.filter((skill) => skill.level === "core").length,
  working: allSkills.filter((skill) => skill.level === "working").length,
  exploring: allSkills.filter((skill) => skill.level === "exploring").length,
};

export function Skills() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const group = skillGroups[selected];
  const Icon = groupIcons[group.id as keyof typeof groupIcons];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();

    let next = selected;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = skillGroups.length - 1;
    else {
      const direction =
        event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
      next = (selected + direction + skillGroups.length) % skillGroups.length;
    }
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="skills" className="section bg-bg-deep/30">
      <div className="shell">
        <SectionHeading
          index="04"
          eyebrow="Capability"
          title={
            <>
              A matrix, not
              <br />
              a <span className="serif text-muted">buzzword</span> list.
            </>
          }
          description="Every skill here maps to a course, a credential, an internship, or a project in the record. Levels describe evidence — not a made-up percentage."
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {allSkills.length} listed
            </span>
            <span className="h-3 w-px bg-line" />
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              4 disciplines
            </span>
          </div>
        </SectionHeading>

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Skill disciplines"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="flex flex-col gap-1.5"
            >
              {skillGroups.map((item, index) => {
                const ItemIcon = groupIcons[item.id as keyof typeof groupIcons];
                const active = selected === index;
                return (
                  <button
                    key={item.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`skills-tab-${item.id}`}
                    aria-selected={active}
                    aria-controls="skills-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => setSelected(index)}
                    data-cursor="hover"
                    className={cn(
                      "group relative flex items-center gap-4 rounded-xl border px-4 py-4 text-left transition-all duration-300",
                      active
                        ? "border-line-strong bg-surface text-fg shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)]"
                        : "border-transparent text-muted hover:border-line hover:bg-surface hover:text-fg",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 flex-none place-items-center rounded-lg border transition-colors",
                        active
                          ? "border-accent/30 bg-accent-soft text-accent"
                          : "border-line bg-surface text-subtle group-hover:text-muted",
                      )}
                    >
                      <ItemIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.1rem] font-medium leading-tight tracking-[-0.02em]">
                        {item.label}
                      </span>
                      <span className="mt-1 block font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                        {String(item.skills.length).padStart(2, "0")} capabilities
                      </span>
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[13px] tracking-[0.12em] transition-opacity",
                        active ? "text-accent" : "text-subtle",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <Reveal className="mt-6 rounded-xl border border-line bg-surface p-4" delay={0.08}>
              <div className="flex items-start gap-2.5">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                <div>
                  <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                    How to read this
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    <span className="text-fg">Core</span> is something I use often and can
                    explain. <span className="text-fg">Working</span> means hands-on
                    experience. <span className="text-fg">Exploring</span> is active learning,
                    not claimed mastery.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
              <span className="mono text-subtle">
                [ {String(selected + 1).padStart(2, "0")} / 04 ]
              </span>
              <span className="flex items-center gap-4 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                <span className="flex items-center gap-1.5">
                  <span className="flex gap-0.5">
                    <span className="h-2.5 w-1 rounded-full bg-accent" />
                    <span className="h-2.5 w-1 rounded-full bg-accent" />
                    <span className="h-2.5 w-1 rounded-full bg-accent" />
                  </span>
                  Core
                </span>
                <span className="hidden items-center gap-1.5 sm:flex">
                  <span className="flex gap-0.5">
                    <span className="h-2.5 w-1 rounded-full bg-accent/60" />
                    <span className="h-2.5 w-1 rounded-full bg-accent/60" />
                    <span className="h-2.5 w-1 rounded-full bg-line-strong" />
                  </span>
                  Working
                </span>
                <span className="hidden items-center gap-1.5 sm:flex">
                  <span className="flex gap-0.5">
                    <span className="h-2.5 w-1 rounded-full bg-accent/30" />
                    <span className="h-2.5 w-1 rounded-full bg-line-strong" />
                    <span className="h-2.5 w-1 rounded-full bg-line-strong" />
                  </span>
                  Exploring
                </span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={group.id}
                id="skills-panel"
                role="tabpanel"
                aria-labelledby={`skills-tab-${group.id}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6"
              >
                <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
                  />
                  <div className="relative flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-tight tracking-[-0.035em]">
                        {group.label}
                      </h3>
                      <p className="mt-2 max-w-2xl text-pretty text-[1rem] leading-relaxed text-muted">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-7 grid gap-x-8 gap-y-0 border-t border-line sm:grid-cols-2">
                    {group.skills.map((skill, index) => {
                      const level = levels[skill.level];
                      return (
                        <div
                          key={skill.name}
                          className="group flex items-center justify-between gap-4 border-b border-line py-3.5"
                        >
                          <div className="flex min-w-0 items-baseline gap-3">
                            <span className="font-mono text-[13px] tracking-[0.1em] text-subtle">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[13px] font-medium leading-snug text-fg transition-colors group-hover:text-accent">
                                {skill.name}
                              </p>
                              <p className="mt-0.5 text-[13px] leading-snug text-subtle">
                                {skill.context}
                              </p>
                            </div>
                          </div>
                          <span
                            className="flex flex-none items-center gap-2"
                            aria-label={`${level.label} level`}
                          >
                            <span className="hidden font-mono text-[13px] uppercase tracking-[0.08em] text-subtle sm:block">
                              {level.label}
                            </span>
                            <span className="flex items-end gap-0.5" aria-hidden="true">
                              {[1, 2, 3].map((bar) => (
                                <span
                                  key={bar}
                                  className={cn(
                                    "w-1 rounded-full transition-colors",
                                    bar === 1 && "h-2",
                                    bar === 2 && "h-2.5",
                                    bar === 3 && "h-3",
                                    bar <= level.bars
                                      ? skill.level === "core"
                                        ? "bg-accent"
                                        : skill.level === "working"
                                          ? "bg-accent/60"
                                          : "bg-accent/35"
                                      : "bg-line-strong",
                                  )}
                                />
                              ))}
                            </span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-surface px-4 py-3.5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                <span>{levelCounts.core} core</span>
                <span>{levelCounts.working} working</span>
                <span>{levelCounts.exploring} exploring</span>
              </div>
              <Link
                href="#record"
                className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
                data-cursor="hover"
              >
                Where these were built
                <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <Reveal className="mt-8" delay={0.06}>
              <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                Currently exploring
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {exploring.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-muted transition-colors hover:border-accent/40 hover:text-fg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
