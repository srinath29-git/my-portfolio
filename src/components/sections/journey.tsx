"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { timeline, type TimelineItem } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const typeIcons = {
  Education: GraduationCap,
  Internship: Briefcase,
  Certification: BadgeCheck,
  Milestone: Sparkles,
};

function TimelineDetail({
  item,
  index,
  onPrevious,
  onNext,
  compact = false,
}: {
  item: TimelineItem;
  index: number;
  onPrevious: () => void;
  onNext: () => void;
  compact?: boolean;
}) {
  const Icon = typeIcons[item.type];

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-surface p-6",
        compact ? "mt-3 bg-surface" : "lg:sticky lg:top-28",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
          <Icon className="h-3 w-3 text-accent" />
          {item.type}
        </span>
        <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
          {item.date}
        </span>
      </div>

      <h3 className="mt-5 text-balance font-display text-[clamp(1.45rem,2.4vw,2rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
        {item.title}
      </h3>
      <p className="mt-2 text-[13px] text-muted">{item.org}</p>

      <p className="mt-5 text-pretty text-[1.1rem] leading-relaxed text-muted">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {item.relatedProject && (
        <Link
          href={`/work/${item.relatedProject}`}
          className="group mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-[13px] text-fg transition hover:text-accent"
          data-cursor="hover"
        >
          <span>See the related project</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
          {String(index + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevious}
            disabled={index === 0}
            className="icon-btn h-8 w-8 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous milestone"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index === timeline.length - 1}
            className="icon-btn h-8 w-8 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next milestone"
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Journey() {
  const [selected, setSelected] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const current = timeline[selected];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const direction =
      event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next =
      (selected + direction + timeline.length) % timeline.length;
    setSelected(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <section id="journey" className="section bg-bg-deep/30">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Trajectory"
          title={
            <>
              A year of firsts,
              <br />
              <span className="serif text-muted">shipped.</span>
            </>
          }
          description="From a first B.Tech semester in 2025 to three internships in 2026. A short, honest log of how it happened — click any milestone to inspect it."
        >
          <span className="mono text-subtle">07 milestones / 2025 → now</span>
        </SectionHeading>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div
              role="tablist"
              aria-label="Career timeline"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="relative"
            >
              <div aria-hidden="true" className="timeline-line" />
              <div className="space-y-1">
                {timeline.map((item, index) => {
                  const Icon = typeIcons[item.type];
                  const active = selected === index;
                  return (
                    <div key={item.id} className="timeline-item" data-active={active}>
                      <div className="relative flex gap-5">
                        <span className="relative mt-5 flex w-4 flex-none justify-center">
                          <span className="timeline-dot" />
                        </span>
                        <div className="flex-1">
                          <button
                            ref={(node) => {
                              buttonRefs.current[index] = node;
                            }}
                            type="button"
                            role="tab"
                            id={`timeline-tab-${item.id}`}
                            aria-selected={active}
                            aria-controls="timeline-panel"
                            tabIndex={active ? 0 : -1}
                            onClick={() => setSelected(index)}
                            data-cursor="hover"
                            className={cn(
                              "group w-full border-b border-line py-4 text-left transition-colors",
                              active ? "text-fg" : "text-muted hover:text-fg",
                            )}
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                                {item.date}
                              </span>
                              <span
                                className={cn(
                                  "flex h-6 w-6 items-center justify-center rounded-full border transition",
                                  active
                                    ? "border-accent/40 bg-accent-soft text-accent"
                                    : "border-line text-subtle group-hover:border-line-strong",
                                )}
                              >
                                <Icon className="h-3 w-3" />
                              </span>
                            </div>
                            <p className="mt-2 max-w-lg text-balance text-[15px] font-medium leading-snug tracking-[-0.01em] sm:text-base">
                              {item.title}
                            </p>
                            <p className="mt-1 text-[13px] text-subtle">{item.org}</p>
                          </button>

                          <AnimatePresence initial={false}>
                            {active && (
                              <div className="lg:hidden">
                                <TimelineDetail
                                  item={item}
                                  index={index}
                                  compact
                                  onPrevious={() => setSelected(Math.max(0, index - 1))}
                                  onNext={() =>
                                    setSelected(Math.min(timeline.length - 1, index + 1))
                                  }
                                />
                              </div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block" id="timeline-panel">
            <AnimatePresence mode="wait">
              <TimelineDetail
                key={current.id}
                item={current}
                index={selected}
                onPrevious={() => setSelected(Math.max(0, selected - 1))}
                onNext={() => setSelected(Math.min(timeline.length - 1, selected + 1))}
              />
            </AnimatePresence>
            <Reveal className="mt-6 rounded-2xl border border-line bg-surface p-5" delay={0.1}>
              <p className="mono text-subtle">Verification note</p>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">
                Dates, roles, and credentials are sourced from LinkedIn and public
                credential records. Internship lab briefs are described as work in
                progress, not shipped products.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
