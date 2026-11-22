import Link from "next/link";
import {
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Cloud,
  Layers,
  Sparkles,
} from "lucide-react";
import { exploring, goals, interests, principles, profile } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";

const interestIcons = [BrainCircuit, Layers, Cloud, Atom];

export function Interests() {
  return (
    <section id="next" className="section bg-bg-deep/30">
      <span id="interests" className="sr-only" />
      <div className="shell">
        <SectionHeading
          index="08"
          eyebrow="Next"
          title={
            <>
              What keeps me
              <br />
              <span className="serif text-muted">curious.</span>
            </>
          }
          description="The subjects I return to when nobody assigns them. Four directions, one thread: making intelligent systems legible and usable."
        >
          <span className="mono text-subtle">Interests & goals / 2026 → beyond</span>
        </SectionHeading>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20 lg:gap-5">
          {interests.map((interest, index) => {
            const Icon = interestIcons[index] ?? Sparkles;
            return (
              <Reveal key={interest.title} delay={index * 0.05}>
                <article className="group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-500 hover:border-accent/35 hover:bg-surface sm:p-7">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(80% 90% at 100% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 65%)",
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-subtle">
                      / {interest.index}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-subtle transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-balance font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-[1.02] tracking-[-0.045em] transition-colors duration-300 group-hover:text-accent">
                    {interest.title}
                  </h3>
                  <p className="relative mt-3 max-w-md text-pretty text-[1rem] leading-relaxed text-muted">
                    {interest.body}
                  </p>

                  <div className="relative mt-auto flex flex-wrap gap-1.5 pt-6">
                    {interest.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle transition-colors group-hover:border-line-strong group-hover:text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 right-3 font-display text-[7rem] font-semibold leading-none tracking-[-0.08em] text-fg/[0.035] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-accent/10"
                  >
                    {interest.index}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.06}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="pulse-dot" />
                <p className="mono text-subtle">Where this is going</p>
              </div>
              <h3 className="mt-5 max-w-lg text-balance font-display text-[clamp(1.5rem,2.8vw,2.2rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                From a model that answers to a system someone can use.
              </h3>

              <ol className="mt-7 border-t border-line">
                {goals.map((goal, index) => (
                  <li
                    key={goal}
                    className="group flex items-start gap-4 border-b border-line py-4 last:border-b-0"
                  >
                    <span className="mt-0.5 font-mono text-[13px] tracking-[0.12em] text-accent">
                      0{index + 1}
                    </span>
                    <p className="max-w-xl text-pretty text-[0.94rem] leading-relaxed text-muted transition-colors group-hover:text-fg">
                      {goal}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.12}>
            <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <p className="mono text-subtle">Currently exploring</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {exploring.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <div className="flex items-center gap-2.5">
                  <span className="pulse-dot" />
                  <p className="text-[13px] font-medium">{profile.availability}</p>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  Based in {profile.locationShort}. Remote-ready, curious by default, and
                  always up for a conversation about the AI × interface layer.
                </p>
              </div>

              <Link
                href="#contact"
                className="group mt-auto flex items-center justify-between gap-4 border-t border-line pt-5 text-[13px] text-fg transition hover:text-accent"
                data-cursor="hover"
              >
                Start a conversation
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8" delay={0.05}>
          <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 sm:flex-row sm:items-center sm:gap-5">
            <span className="mono flex-none text-subtle">Operating principles</span>
            <div className="h-px w-5 bg-line sm:h-3 sm:w-px" />
            <Marquee
              items={principles.map((principle) => principle.title)}
              separator="→"
              ariaLabel="Operating principles"
              className="min-w-0 flex-1"
              itemClassName="text-[13px] uppercase tracking-[0.1em]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
