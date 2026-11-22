import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Download,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { education, experiences, profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const companyMarks: Record<string, string> = {
  "IBM SkillsBuild": "IBM",
  Decodelabs: "DL",
  Syntecxhub: "SX",
};

export function Record() {
  return (
    <section id="record" className="section">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Record"
          title={
            <>
              Work, studied,
              <br />
              <span className="serif text-muted">still</span> in progress.
            </>
          }
          description="Three internships, one degree underway, and a deliberately short list of things I can speak to honestly. No inflated titles — just the record."
        >
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
              data-cursor="hover"
            >
              View full résumé
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="/resume/Nallamothu-Srinath-Resume.pdf"
              download
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
              data-cursor="hover"
            >
              <Download className="h-3.5 w-3.5" />
              PDF
            </a>
          </div>
        </SectionHeading>

        <div className="mt-14 lg:mt-20">
          {experiences.map((experience, index) => (
            <Reveal key={experience.id} delay={index * 0.05}>
              <article className="group relative grid gap-7 border-t border-line py-10 transition-colors duration-500 hover:border-line-strong sm:py-12 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-3">
                  <div className="flex items-start justify-between gap-4 lg:block">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-line-strong bg-surface font-mono text-[13px] tracking-[0.08em] text-fg transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent">
                        {companyMarks[experience.company] ?? "NS"}
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-tight">
                          {experience.company}
                        </p>
                        {experience.context && (
                          <p className="mt-1 text-[13px] text-subtle">{experience.context}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right lg:mt-5 lg:text-left">
                      <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
                        {experience.period}
                      </p>
                      <p className="mt-1.5 flex items-center justify-end gap-1.5 text-[13px] text-subtle lg:justify-start">
                        <MapPin className="h-3 w-3" />
                        {experience.location}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
                      {experience.type}
                    </span>
                    {experience.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-8 lg:col-start-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="text-balance font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold leading-[1.05] tracking-[-0.04em] transition-colors duration-300 group-hover:text-accent">
                      {experience.role}
                    </h3>
                    <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">
                      / 0{index + 1}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-muted">
                    {experience.summary}
                  </p>

                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {experience.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2.5 text-[0.875rem] leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-1 w-1 flex-none rounded-full bg-accent/70"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle transition-colors duration-300 group-hover:border-line-strong group-hover:text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full"
                />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12" delay={0.08}>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-bg-deep/60">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(70% 100% at 85% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 65%)",
              }}
            />
            <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-surface text-accent">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="mono text-subtle">Education</p>
                    <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
                      {education.period}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <h3 className="text-balance font-display text-[clamp(1.5rem,3vw,2.4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  B.Tech, Computer Science
                </h3>
                <p className="mt-2 text-sm text-muted">{education.institution}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[13px] text-subtle">
                  <MapPin className="h-3 w-3" />
                  {education.location}
                </p>
                <p className="mt-4 max-w-lg text-pretty text-[1.1rem] leading-relaxed text-muted">
                  {education.note}
                </p>
              </div>

              <div className="lg:col-span-3">
                <p className="mono text-subtle">Focus areas</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {education.focus.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-9">
              <span className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                Expected graduation / 2029
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-[13px] text-muted">
                  <CalendarDays className="h-3 w-3" />
                  Sep 2025 — 2029
                </span>
                <span className="flex items-center gap-1.5 text-[13px] text-muted">
                  <Building2 className="h-3 w-3" />
                  Hyderabad, IN
                </span>
                <span className="hidden items-center gap-1.5 text-[13px] text-muted sm:flex">
                  <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                    {profile.pronouns}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
