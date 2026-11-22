"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, Star, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import {
  projects,
  projectFilters,
  type ProjectCategory,
} from "@/data/portfolio";
import type { GithubSignals } from "@/lib/github";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { cn } from "@/lib/utils";

type Filter = (typeof projectFilters)[number];

function countFor(filter: Filter) {
  if (filter === "All") return projects.length;
  return projects.filter((project) => project.categories.includes(filter)).length;
}

function formatSignalDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function Work() {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [signals, setSignals] = useState<GithubSignals | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: GithubSignals) => setSignals(data))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const term = deferredQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesFilter =
        filter === "All" || project.categories.includes(filter as ProjectCategory);
      if (!matchesFilter) return false;
      if (!term) return true;
      const corpus = [
        project.title,
        project.tagline,
        project.description,
        project.category,
        project.role,
        project.year,
        project.stack.join(" "),
        project.highlights.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return term.split(/\s+/).every((token) => corpus.includes(token));
    });
  }, [deferredQuery, filter]);

  const repoList = signals ? Object.values(signals.repos) : [];
  const totalStars = repoList.reduce((sum, repo) => sum + repo.stars, 0);
  const latestPush = repoList
    .map((repo) => repo.updatedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  const latestLabel = latestPush ? formatSignalDate(latestPush) : null;
  const hasQuery = query.trim().length > 0;

  return (
    <section id="work" className="section">
      <div className="shell">
        <SectionHeading
          index="05"
          eyebrow="Selected work"
          title={
            <>
              Things I built
              <br />
              to <span className="serif text-muted">understand.</span>
            </>
          }
          description="Applied AI labs, algorithmic systems, and interfaces. Seven projects, all traceable to an internship, a repository, or a brief — filter by discipline or search the stack."
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="https://github.com/srinath29-git?tab=repositories"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
              data-cursor="hover"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub repositories
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <span className="mono text-subtle">07 projects / 2026</span>
          </div>
        </SectionHeading>

        <div className="mt-12 lg:mt-16">
          <div className="flex flex-col gap-4 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              {projectFilters.map((item) => {
                const active = filter === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    aria-pressed={active}
                    data-cursor="hover"
                    className={cn(
                      "group flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all duration-300",
                      active
                        ? "border-accent-strong bg-accent-strong text-white shadow-[0_8px_24px_-10px_var(--glow)]"
                        : "border-line bg-surface text-muted hover:border-accent/60 hover:bg-accent-soft hover:text-fg",
                    )}
                  >
                    {item}
                    <span
                      className={cn(
                        "font-mono text-[12px]",
                        active ? "text-white/80" : "text-subtle",
                      )}
                    >
                      {String(countFor(item)).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full lg:w-64">
                <label htmlFor="project-search" className="sr-only">
                  Search projects
                </label>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-subtle" />
                <input
                  id="project-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search stack, title, topic…"
                  className="field h-11 w-full rounded-full py-2 pl-10 pr-9 text-[13px]"
                  autoComplete="off"
                />
                {hasQuery && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute right-2.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded-full text-subtle transition hover:bg-surface hover:text-fg"
                    aria-label="Clear project search"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
              <span
                className="hidden flex-none font-mono text-[13px] uppercase tracking-[0.12em] text-subtle sm:block"
                aria-live="polite"
              >
                {String(filtered.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-bg-deep/35 px-3.5 py-2.5">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-muted">
                <GithubIcon className="h-3.5 w-3.5" />
                srinath29-git
              </span>
              <span className="hidden h-3 w-px bg-line sm:block" />
              <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                {signals ? `${signals.publicRepos} public repos` : "7 public repos"}
              </span>
              {signals && totalStars > 0 && (
                <span className="flex items-center gap-1 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                  <Star className="h-3 w-3" />
                  {totalStars} stars
                </span>
              )}
              {latestLabel && (
                <span className="hidden font-mono text-[13px] uppercase tracking-[0.1em] text-subtle md:block">
                  Last push / {latestLabel}
                </span>
              )}
              <span className="flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    signals?.live ? "bg-emerald-400" : "bg-subtle",
                  )}
                />
                {signals?.live ? "GitHub API live" : signals ? "Public profile" : "Connecting…"}
              </span>
            </div>
            <Link
              href="https://github.com/srinath29-git?tab=repositories"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
              data-cursor="hover"
            >
              Open GitHub
              <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.length > 0 ? (
              <motion.div
                key="project-grid"
                layout={!reducedMotion}
                className="grid gap-x-7 gap-y-12 md:grid-cols-2 lg:gap-x-9 lg:gap-y-16"
              >
                {filtered.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    layout={!reducedMotion}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.45,
                      delay: reducedMotion ? 0 : Math.min(index * 0.04, 0.16),
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProjectCard project={project} signals={signals} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
                className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-dashed border-line-strong bg-surface p-8 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-display text-2xl font-semibold tracking-[-0.04em]">
                    No projects found
                  </p>
                  <p className="mt-2 max-w-md text-sm text-muted">
                    Nothing matches “{query || filter}” yet. Try a broader term, or reset
                    the filters to see the full record.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFilter("All");
                    setQuery("");
                  }}
                  className="btn btn-ghost btn-sm"
                >
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
          <p className="max-w-lg text-[13px] leading-relaxed text-subtle">
            Public repositories are linked from each case study. IBM internship labs are
            described as lab work — no public repo or production metric is claimed.
          </p>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
            data-cursor="hover"
          >
            Discuss a project
            <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
