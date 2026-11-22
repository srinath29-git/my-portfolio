import Link from "next/link";
import {
  ArrowUpRight,
  Download,
  FileText,
  Printer,
  Sparkles,
} from "lucide-react";
import { education, experiences, profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";

const facts = [
  { label: "Format", value: "PDF · A4" },
  { label: "Focus", value: "AI × interface" },
  { label: "Based in", value: "Hyderabad, IN" },
  { label: "Updated", value: "Nov 2026" },
];

export function ResumeSection() {
  return (
    <section id="resume" className="section">
      <div className="shell">
        <SectionHeading
          index="07"
          eyebrow="Dossier"
          title={
            <>
              The short version,
              <br />
              <span className="serif text-muted">on paper.</span>
            </>
          }
          description="The same verified record, condensed for a recruiter's two-minute scan. Read it on the web, print it, or download the PDF."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.18}>
              <a
                href="/resume/Nallamothu-Srinath-Resume.pdf"
                download
                className="btn btn-primary btn-sm"
                data-cursor="hover"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <Link href="/resume" className="btn btn-ghost btn-sm" data-cursor="hover">
                View web résumé
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Magnetic>
          </div>
        </SectionHeading>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-sm text-balance font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.035em]">
                “Enough context to start a conversation. Enough detail to show the work
                behind it.”
              </p>
              <p className="mt-5 max-w-sm text-pretty text-[0.94rem] leading-relaxed text-muted">
                Three internships, a B.Tech in progress, two verified credentials, and the
                projects that connect them. No confidential material, no invented metrics.
              </p>
            </Reveal>

            <Reveal className="mt-8" delay={0.08}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      {fact.label}
                    </p>
                    <p className="mt-1.5 text-[13px] text-fg">{fact.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" delay={0.12}>
              <Link
                href="/resume"
                className="group inline-flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
                data-cursor="hover"
              >
                <Printer className="h-3.5 w-3.5" />
                Print-friendly version
              </Link>
              <span className="flex items-center gap-1.5 text-[13px] text-subtle">
                <Sparkles className="h-3 w-3 text-accent" />
                Sourced from LinkedIn & Credly
              </span>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <div className="group relative mx-auto max-w-[560px]">
              <div
                aria-hidden="true"
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-3 -right-3 top-6 left-6 -z-10 rounded-sm border border-line bg-surface transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
              />
              <div className="relative rotate-[-0.6deg] overflow-hidden rounded-sm bg-[#f4f1e8] text-[#12151c] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-0 group-hover:scale-[1.01]">
                <div className="absolute right-0 top-0 bg-[#12151c] px-4 py-2 font-mono text-[13px] uppercase tracking-[0.18em] text-[#f4f1e8]">
                  PDF / 01
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4 border-b border-[#12151c]/20 pb-4">
                    <div>
                      <p className="font-display text-[clamp(1.35rem,2.7vw,1.9rem)] font-semibold leading-none tracking-[-0.055em]">
                        Nallamothu Srinath
                      </p>
                      <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.14em] text-[#12151c]/60">
                        AI intern · Frontend developer · B.Tech CSE
                      </p>
                    </div>
                    <div className="hidden text-right text-[13px] leading-relaxed text-[#12151c]/55 sm:block">
                      Hyderabad, IN
                      <br />
                      nallamothusrinath999@gmail.com
                      <br />
                      github.com/srinath29-git
                    </div>
                  </div>

                  <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_0.7fr]">
                    <div>
                      <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#12151c]/45">
                        Experience
                      </p>
                      <div className="mt-2 space-y-3">
                        {experiences.slice(0, 3).map((experience) => (
                          <div key={experience.id}>
                            <div className="flex items-baseline justify-between gap-2">
                              <p className="text-[12px] font-semibold leading-tight">
                                {experience.role}
                              </p>
                              <p className="flex-none font-mono text-[13px] uppercase tracking-[0.06em] text-[#12151c]/45">
                                {experience.period}
                              </p>
                            </div>
                            <p className="mt-0.5 text-[13.5px] text-[#12151c]/60">
                              {experience.company}
                              {experience.context ? ` · ${experience.context}` : ""}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#12151c]/45">
                        Education
                      </p>
                      <p className="mt-2 text-[13px] font-semibold leading-tight">
                        B.Tech, Computer Science
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-[#12151c]/60">
                        Malla Reddy (MR) Deemed to be University
                        <br />
                        2025 — 2029
                      </p>

                      <p className="mt-4 font-mono text-[13px] uppercase tracking-[0.16em] text-[#12151c]/45">
                        Focus
                      </p>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#12151c]/60">
                        {education.focus.join(" · ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-[#12151c]/15 pt-3">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#12151c]/45">
                      Selected projects
                    </p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#12151c]/60">
                      AMIXY AI Core · Applied AI Lab · Rule-Based Expert System · A* Maze Solver ·
                      Responsive Web Layout
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#12151c]/15 pt-3">
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#12151c]/40">
                      Portfolio / 2026
                    </p>
                    <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-[#12151c]/40">
                      {profile.linkedinHandle} / {profile.githubHandle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3 py-2 shadow-lg backdrop-blur-md">
                <FileText className="h-3 w-3 text-accent" />
                <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
                  Verified content
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
