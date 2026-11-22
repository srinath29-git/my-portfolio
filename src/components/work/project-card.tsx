import Link from "next/link";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import type { Project } from "@/data/portfolio";
import type { GithubSignals } from "@/lib/github";
import { ProjectVisual } from "@/components/work/project-visual";

function formatUpdated(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function ProjectCard({
  project,
  signals,
}: {
  project: Project;
  signals: GithubSignals | null;
}) {
  const repo = project.githubRepo ? signals?.repos[project.githubRepo] : undefined;
  const updated = repo?.updatedAt ? formatUpdated(repo.updatedAt) : null;
  const visibleStack = project.stack.slice(0, 3);
  const extraStack = project.stack.length - visibleStack.length;

  return (
    <article className="group relative h-full">
      <Link
        href={`/work/${project.slug}`}
        className="flex h-full flex-col"
        data-cursor="view"
        data-cursor-label="Case study"
        aria-label={`${project.title} — ${project.tagline}`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-line transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_30px_80px_-40px_var(--glow)]">
          <div className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]">
            <ProjectVisual cover={project.cover} index={project.index} year={project.year} />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white backdrop-blur-md">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-1 pt-5">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">
              {project.category} / {project.year}
            </span>
            <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">
              {project.role}
            </span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="text-balance font-display text-[clamp(1.35rem,2.2vw,1.85rem)] font-semibold leading-[1.04] tracking-[-0.04em] transition-colors duration-300 group-hover:text-accent">
              {project.title}
            </h3>
            <ArrowUpRight className="mt-1 h-4 w-4 flex-none text-subtle transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </div>

          <p className="mt-2 max-w-md text-pretty text-[1rem] leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
            <div className="flex flex-wrap gap-1.5">
              {visibleStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle"
                >
                  {item}
                </span>
              ))}
              {extraStack > 0 && (
                <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle">
                  +{extraStack}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] uppercase tracking-[0.08em] text-subtle">
              {project.live && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-700 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live app
                </span>
              )}
              {project.repo ? (
                <span className="flex items-center gap-1.5 text-muted">
                  {repo ? (
                    <>
                      <Star className="h-3 w-3" />
                      {repo.stars}
                      {repo.forks > 0 && (
                        <>
                          <GitFork className="ml-1 h-3 w-3" />
                          {repo.forks}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <GithubIcon className="h-3 w-3" />
                      Public repo
                    </>
                  )}
                </span>
              ) : (
                <span className="rounded-full border border-warm/25 bg-warm/10 px-2 py-1 text-warm">
                  Internship
                </span>
              )}
              {updated && <span className="hidden sm:inline">Updated {updated}</span>}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
