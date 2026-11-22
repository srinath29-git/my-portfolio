import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Beaker,
  CalendarDays,
  Check,
  CircleDot,
  Layers,
  Link2,
  UserRound,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { profile, projects, siteConfig } from "@/data/portfolio";
import { getProjectBySlug, getRelatedProjects } from "@/lib/projects";
import { ProjectVisual } from "@/components/work/project-visual";
import { ProjectCard } from "@/components/work/project-card";
import { CopyButton } from "@/components/ui/copy-button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    keywords: [project.category, ...project.stack, "Nallamothu Srinath"],
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${profile.name}`,
      description: project.description,
      type: "article",
      url: `/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${profile.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const related = getRelatedProjects(project, 2);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];
  const projectUrl = `${siteConfig.url}/work/${project.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: projectUrl,
    genre: project.category,
    keywords: project.stack.join(", "),
    dateCreated: project.year,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteConfig.url,
    },
    creator: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <article className="pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <header className="shell pb-10 pt-28 sm:pt-32 lg:pb-14 lg:pt-36">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[13px] text-muted transition hover:text-fg"
            data-cursor="hover"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            All work
          </Link>
          <div className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
            <span>Case study / {project.index}</span>
            <span className="h-3 w-px bg-line" />
            <span>{project.year}</span>
          </div>
        </div>

        <div className="mt-10 grid gap-9 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((category, categoryIndex) => (
                <span
                  key={category}
                  className={
                    categoryIndex === 0
                      ? "rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-accent"
                      : "rounded-full border border-line px-3 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-muted"
                  }
                >
                  {category}
                </span>
              ))}
              <span className="rounded-full border border-line px-3 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
                {project.status}
              </span>
            </div>

            <h1 className="mt-6 text-balance font-display text-[clamp(2.7rem,6.2vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-balance font-serif text-[clamp(1.25rem,2.4vw,1.8rem)] italic leading-snug text-muted">
              {project.tagline}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-[1rem] leading-relaxed text-muted">
              {project.description}
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-2xl border border-line bg-surface">
              <dl>
                {[
                  { icon: UserRound, label: "Role", value: project.role },
                  { icon: CalendarDays, label: "Timeline", value: project.timeline },
                  { icon: Layers, label: "Discipline", value: project.categories.join(" · ") },
                  {
                    icon: CircleDot,
                    label: "Status",
                    value: project.status,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 border-b border-line px-4 py-3.5 last:border-b-0"
                    >
                      <Icon className="mt-0.5 h-3.5 w-3.5 flex-none text-subtle" />
                      <div className="min-w-0">
                        <dt className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                          {item.label}
                        </dt>
                        <dd className="mt-1 text-[13px] leading-snug text-fg">{item.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            <div className="mt-3 grid gap-2">
              <div className="flex flex-wrap gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn btn-primary btn-sm flex-1"
                    data-cursor="hover"
                  >
                    Live app
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.repo ? (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={
                      project.live
                        ? "btn btn-ghost btn-sm flex-1"
                        : "btn btn-primary btn-sm flex-1"
                    }
                    data-cursor="hover"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    {project.live ? "Repository" : "View repository"}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : (
                  !project.live && (
                    <Link
                      href="/#contact"
                      className="btn btn-primary btn-sm flex-1"
                      data-cursor="hover"
                    >
                      Discuss this work
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )
                )}
              </div>
              <CopyButton
                value={projectUrl}
                label="Copy case-study link"
                successMessage="Project link copied."
                showIcon={false}
                className="btn btn-ghost btn-sm w-full justify-center text-[13px]"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="shell">
        <Reveal>
          <ProjectVisual
            cover={project.cover}
            index={project.index}
            year={project.year}
            className="aspect-[16/10] rounded-[1.5rem] sm:aspect-[16/9] lg:aspect-[2.15/1]"
          />
        </Reveal>
      </div>

      <div className="shell mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <div className="border-t border-line pt-5">
              <p className="mono text-subtle">Stack</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 border-t border-line pt-5">
                <p className="mono text-subtle">Highlights</p>
                <ul className="mt-4 space-y-2.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-[13px] text-muted">
                      <Check className="mt-0.5 h-3 w-3 flex-none text-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 border-t border-line pt-5">
                <p className="mono text-subtle">Share</p>
                <div className="mt-3">
                  <CopyButton
                    value={projectUrl}
                    label="Copy project URL"
                    successMessage="Project link copied."
                    showIcon={false}
                    className="text-[13px] text-muted hover:text-accent"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8 lg:col-start-5">
          <Reveal className="border-t border-line pt-6">
            <p className="mono text-subtle">01 / The problem</p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              What needed figuring out.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-[1rem] leading-relaxed text-muted">
              {project.problem}
            </p>
          </Reveal>

          <Reveal className="mt-12 border-t border-line pt-6" delay={0.04}>
            <p className="mono text-subtle">02 / The approach</p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              How it came together.
            </h2>
            <ol className="mt-6 border-t border-line">
              {project.approach.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-5 border-b border-line py-4 text-[1.02rem] leading-relaxed text-muted"
                >
                  <span className="mt-0.5 font-mono text-[13px] tracking-[0.12em] text-accent">
                    0{index + 1}
                  </span>
                  <span className="max-w-2xl">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-12 border-t border-line pt-6" delay={0.04}>
            <p className="mono text-subtle">03 / Build notes</p>
            <h2 className="mt-5 max-w-2xl text-balance font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
              Inside the build.
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.buildNotes.map((note, index) => (
                <div
                  key={note.title}
                  className="group rounded-xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-accent/30 hover:bg-surface"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Beaker className="h-3.5 w-3.5 text-accent" />
                    <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                      Note / 0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[13px] font-semibold">{note.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{note.body}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12" delay={0.04}>
            <blockquote className="relative overflow-hidden rounded-2xl border border-line bg-bg-deep/50 p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
              />
              <p className="mono relative text-subtle">What stayed with me</p>
              <p className="relative mt-4 max-w-2xl text-balance font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-snug text-fg/90">
                {project.learning}
              </p>
            </blockquote>
          </Reveal>

          {project.note && (
            <Reveal className="mt-6" delay={0.04}>
              <div className="flex gap-3 rounded-xl border border-line bg-surface p-4">
                <Link2 className="mt-0.5 h-3.5 w-3.5 flex-none text-subtle" />
                <p className="text-[13.5px] leading-relaxed text-subtle">{project.note}</p>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <div className="shell mt-16 lg:mt-24">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
          <p className="mono text-subtle">Related work</p>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
            data-cursor="hover"
          >
            View all
            <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-9">
          {related.map((item) => (
            <ProjectCard key={item.slug} project={item} signals={null} />
          ))}
        </div>
      </div>

      <div className="shell mt-16 lg:mt-20">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/work/${previous.slug}`}
            className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-accent/35 hover:bg-surface"
            data-cursor="hover"
          >
            <ArrowLeft className="h-4 w-4 flex-none text-subtle transition group-hover:-translate-x-0.5 group-hover:text-accent" />
            <span>
              <span className="block font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                Previous
              </span>
              <span className="mt-1 block text-[13px] font-medium">{previous.shortTitle}</span>
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-end gap-4 rounded-xl border border-line bg-surface p-4 text-right transition hover:border-accent/35 hover:bg-surface"
            data-cursor="hover"
          >
            <span>
              <span className="block font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                Next
              </span>
              <span className="mt-1 block text-[13px] font-medium">{next.shortTitle}</span>
            </span>
            <ArrowRight className="h-4 w-4 flex-none text-subtle transition group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-[13px] leading-relaxed text-subtle">
            Built from the same verified profile data as the rest of this site. Repository
            links, credentials, and internship descriptions are sourced from GitHub, LinkedIn,
            and Credly.
          </p>
          <Magnetic strength={0.2}>
            <Link href="/#contact" className="btn btn-primary btn-sm" data-cursor="hover">
              Talk about a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
