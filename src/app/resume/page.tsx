import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  certifications,
  education,
  experiences,
  profile,
  projects,
  skillGroups,
  siteConfig,
} from "@/data/portfolio";
import { PrintButton } from "@/components/resume/print-button";
import { SocialLinks } from "@/components/ui/social-links";
import { LocalTime } from "@/components/ui/local-time";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "The résumé of Nallamothu Srinath — AI intern, frontend developer, and B.Tech computer science student in Hyderabad. Experience, education, skills, projects, and certifications.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `Résumé — ${profile.name}`,
    description:
      "Experience, education, skills, projects, and verified credentials for Nallamothu Srinath.",
    url: "/resume",
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">{children}</p>
  );
}

export default function ResumePage() {
  return (
    <div className="pb-20 pt-24 sm:pt-28 lg:pt-32">
      <div className="shell">
        <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[13px] text-muted transition hover:text-fg"
            data-cursor="hover"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Back to portfolio
          </Link>
          <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">
            Résumé / 2026 · Updated Nov 2026
          </span>
        </div>

        <header className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="mono text-subtle">Curriculum vitae</p>
            <h1 className="mt-4 text-balance font-display text-[clamp(2.8rem,7vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.062em]">
              Nallamothu
              <br />
              <span className="serif text-muted">Srinath.</span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-[1rem] leading-relaxed text-muted">
              AI intern and frontend developer, currently building applied AI systems at IBM
              SkillsBuild while studying computer science at Malla Reddy (MR) Deemed to be
              University.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
              <a
                href={`mailto:${profile.email}`}
                className="link-underline"
                data-cursor="hover"
              >
                <Mail className="h-3.5 w-3.5" />
                {profile.email}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-subtle" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <LocalTime timeZone={siteConfig.timeZone} />
                IST
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <div className="flex flex-wrap gap-2">
              <a
                href="/resume/Nallamothu-Srinath-Resume.pdf"
                download
                className="btn btn-primary btn-sm no-print"
                data-cursor="hover"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
              <PrintButton />
            </div>
            <div className="mt-1 flex items-center gap-2 text-[13px] text-subtle">
              <BadgeCheck className="h-3.5 w-3.5 text-accent" />
              Verified against LinkedIn, GitHub & Credly
            </div>
            <SocialLinks className="mt-1" />
          </div>
        </header>

        <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <section>
              <SectionLabel>Education</SectionLabel>
              <div className="mt-4 flex items-start gap-3">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-line bg-surface text-accent">
                  <GraduationCap className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-[13px] font-semibold leading-snug">
                    B.Tech, Computer Science
                  </h2>
                  <p className="mt-1 text-[13px] text-muted">{education.institution}</p>
                  <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                    {education.period} · Hyderabad
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {education.focus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="mt-8 border-t border-line pt-6">
              <SectionLabel>Core skills</SectionLabel>
              <div className="mt-4 space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.id}>
                    <p className="text-[13px] font-medium text-fg">{group.label}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      {group.skills
                        .filter((skill) => skill.level !== "exploring")
                        .map((skill) => skill.name)
                        .join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 border-t border-line pt-6">
              <SectionLabel>Certifications</SectionLabel>
              <div className="mt-4 space-y-4">
                {certifications.map((certification) => (
                  <a
                    key={certification.id}
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group block"
                    data-cursor="hover"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[13px] font-medium leading-snug transition group-hover:text-accent">
                        {certification.title}
                      </p>
                      <ArrowUpRight className="mt-0.5 h-3 w-3 flex-none text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </div>
                    <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                      {certification.issuer} · {certification.issued}
                    </p>
                  </a>
                ))}
              </div>
            </section>

            <section className="mt-8 border-t border-line pt-6">
              <SectionLabel>Links</SectionLabel>
              <div className="mt-4 space-y-2.5 text-[13px]">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between gap-3 text-muted transition hover:text-accent"
                >
                  <span>LinkedIn</span>
                  <span className="font-mono text-[13px] text-subtle">
                    /in/{profile.linkedinHandle}
                  </span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between gap-3 text-muted transition hover:text-accent"
                >
                  <span>GitHub</span>
                  <span className="font-mono text-[13px] text-subtle">
                    /{profile.githubHandle}
                  </span>
                </a>
                <div className="flex items-center justify-between gap-3 text-muted">
                  <span>Portfolio</span>
                  <span className="font-mono text-[13px] text-subtle">
                    {siteConfig.url.replace(/^https?:\/\//, "")}
                  </span>
                </div>
              </div>
            </section>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <section>
                <SectionLabel>Profile</SectionLabel>
                <p className="mt-4 max-w-2xl text-pretty text-[0.96rem] leading-relaxed text-muted">
                  {profile.heroIntro} I care about the layer where an intelligent system
                  becomes something a person can actually use — the model, the data, the
                  interface, and the explanation that ties them together.
                </p>
              </section>
            </Reveal>

            <section className="mt-10 border-t border-line pt-6">
              <div className="flex items-center justify-between gap-4">
                <SectionLabel>Experience</SectionLabel>
                <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                  03 roles / 2026
                </span>
              </div>

              <div className="mt-6 space-y-8">
                {experiences.map((experience) => (
                  <article key={experience.id} className="border-b border-line pb-7 last:border-b-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h2 className="text-[14px] font-semibold leading-snug">
                        {experience.role}
                      </h2>
                      <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
                        {experience.period}
                      </p>
                    </div>
                    <p className="mt-1 text-[13px] text-muted">
                      {experience.company}
                      {experience.context ? ` · ${experience.context}` : ""} ·{" "}
                      {experience.location}
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-muted">
                      {experience.summary}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                          <span className="mt-[0.45rem] h-1 w-1 flex-none rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-line px-2 py-0.5 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10 border-t border-line pt-6">
              <div className="flex items-center justify-between gap-4">
                <SectionLabel>Selected projects</SectionLabel>
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
                >
                  All work
                  <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {projects.slice(0, 4).map((project) => (
                  <Link
                    key={project.slug}
                    href={`/work/${project.slug}`}
                    className="group block border-b border-line pb-3"
                    data-cursor="hover"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[13px] font-medium leading-snug transition group-hover:text-accent">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[13px] tracking-[0.1em] text-subtle">
                        {project.index}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
                      {project.tagline}
                    </p>
                    <p className="mt-1.5 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle">
                      {project.stack.slice(0, 3).join(" · ")}
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-10 border-t border-line pt-6">
              <SectionLabel>Beyond the record</SectionLabel>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="flex gap-2.5 rounded-lg border border-line bg-surface p-4">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                  <div>
                    <p className="text-[13.5px] font-medium">Currently exploring</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      Generative AI, agentic workflows, RAG, IBM Cloud, and quantum computing.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-lg border border-line bg-surface p-4">
                  <BadgeCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                  <div>
                    <p className="text-[13.5px] font-medium">Also completed</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">
                      Accenture Digital Skills: AI (91%), a 46-hour Information Security
                      course, Reliance Data Science, and QuizOff 2026.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-[13px] text-subtle">
          <span>References available on request. All dates and credentials are public.</span>
          <span className="font-mono uppercase tracking-[0.12em]">
            {profile.name} · {profile.locationShort}
          </span>
        </div>
      </div>
    </div>
  );
}
