import Link from "next/link";
import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { profile, stats } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";

export function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="Identity"
          title={
            <>
              Curious by default.
              <br />
              <span className="serif text-muted">Building</span> by design.
            </>
          }
          description="A computer science student who learns best by turning ideas into running systems. Here's the short version — no buzzword bingo."
        >
          <Link
            href="#journey"
            className="group inline-flex w-fit items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
            data-cursor="hover"
          >
            Follow the journey
            <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </SectionHeading>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-2xl text-balance font-display text-[clamp(1.5rem,3vw,2.35rem)] font-medium leading-[1.18] tracking-[-0.035em]">
                “{profile.aboutLead}”
              </p>
            </Reveal>

            <div className="mt-9 grid gap-5 sm:grid-cols-2 sm:gap-8">
              {profile.aboutBody.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.06 + index * 0.06}>
                  <p className="text-pretty text-[1.1rem] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12}>
              <blockquote className="mt-10 border-l border-accent/40 pl-5">
                <p className="text-balance font-serif text-[clamp(1.25rem,2.4vw,1.7rem)] italic leading-snug text-fg/85">
                  {profile.aboutQuote}
                </p>
                <footer className="mt-3 font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                  The thread running through the work
                </footer>
              </blockquote>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.16}>
            <div className="panel relative overflow-hidden p-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
              />
              <div className="relative flex items-center gap-3 border-b border-line pb-5">
                <div className="portrait-frame h-14 w-14 rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={profile.avatar} alt={`${profile.name} portrait`} width={100} height={100} />
                  <span className="portrait-tint" />
                  <span className="portrait-scan" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{profile.name}</p>
                  <p className="mt-0.5 break-words font-mono text-[13px] uppercase leading-snug tracking-[0.1em] text-subtle">
                    {profile.role}
                  </p>
                  <span className="mt-1.5 inline-flex items-center gap-1 font-mono text-[13px] uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
                    <span className="pulse-dot scale-75" />
                    Open to work
                  </span>
                </div>
              </div>

              <div className="relative mt-5 space-y-4">
                <div className="flex gap-3">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                  <div>
                    <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      Currently
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-fg">
                      {profile.currentRole}
                    </p>
                    <p className="text-[13px] text-muted">{profile.currentOrg}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <GraduationCap className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                  <div>
                    <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      Studying
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-fg">
                      {profile.educationShort}
                    </p>
                    <p className="text-[13px] text-muted">
                      Malla Reddy (MR) Deemed to be University
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                  <div>
                    <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      Based in
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-fg">
                      {profile.location}
                    </p>
                    <p className="text-[13px] text-muted">
                      {profile.coordinates} · remote-ready
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-5">
                {profile.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.08em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <SocialLinks />
                <Link
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-1.5 text-[13px] text-muted transition hover:text-accent"
                  data-cursor="hover"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 border-y border-line lg:mt-24 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 0.05}
              className={[
                "group relative px-4 py-7 transition-colors duration-500 hover:bg-accent-soft sm:px-6 sm:py-9",
                index !== 0 ? "border-l border-line" : "",
                index === 2 ? "border-l-0 lg:border-l" : "",
                index < 2 ? "border-b border-line lg:border-b-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="font-display text-[clamp(2.4rem,4.5vw,4.25rem)] font-semibold leading-none tracking-[-0.06em]">
                {stat.value}
              </p>
              <p className="mt-3 text-[13px] font-medium text-fg">{stat.label}</p>
              <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                {stat.detail}
              </p>
              <span className="absolute right-4 top-4 h-1 w-1 rounded-full bg-line-strong transition group-hover:bg-accent" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
