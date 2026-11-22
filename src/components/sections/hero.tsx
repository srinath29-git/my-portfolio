"use client";

import { useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Brain,
  Download,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react";
import { profile, heroTicker, highlights } from "@/data/portfolio";
import { RevealLines } from "@/components/ui/reveal-lines";
import { Magnetic } from "@/components/ui/magnetic";
import { Marquee } from "@/components/ui/marquee";
import { INTRO_COMPLETE_EVENT, INTRO_STORAGE_KEY } from "@/lib/intro";

function subscribeIntro(callback: () => void) {
  window.addEventListener(INTRO_COMPLETE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(INTRO_COMPLETE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getIntroSnapshot() {
  try {
    return (
      window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "true" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return true;
  }
}

function getServerIntroSnapshot() {
  return false;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const introDone = useSyncExternalStore(
    subscribeIntro,
    getIntroSnapshot,
    getServerIntroSnapshot,
  );
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ y: orbY }} className="hero-aurora" />
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="absolute inset-y-0 left-[25%] hidden w-px bg-line/50 lg:block" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-line/50 lg:block" />
        <div className="absolute inset-y-0 left-[75%] hidden w-px bg-line/50 lg:block" />
        <div className="orb -left-40 top-40 h-[26rem] w-[26rem] bg-accent/20" />
        <div className="orb bottom-10 right-[-10%] h-[30rem] w-[30rem] bg-[#7c5cff]/10 [animation-delay:-6s]" />
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="shell relative z-10 flex flex-1 flex-col justify-center pb-16 pt-10 sm:pt-14 lg:pb-20"
      >
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{
                duration: 0.7,
                delay: introDone ? 0.05 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="mono text-muted">[ Portfolio / 2026 ]</span>
              <span className="hidden h-3 w-px bg-line-strong sm:block" />
              <span className="flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="mono text-muted">Open to opportunities</span>
              </span>
            </motion.div>

            <motion.div style={{ y: titleY }} className="mt-7 sm:mt-9">
              <h1 className="hero-title">
                <RevealLines
                  active={introDone}
                  delay={0.12}
                  stagger={0.09}
                  lines={[
                    <>
                      Intelligence,
                    </>,
                    <>
                      engineered.
                    </>,
                    <>
                      <span className="serif text-accent-2">Interfaces,</span>{" "}
                      <span className="text-muted">felt.</span>
                    </>,
                  ]}
                />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{
                duration: 0.8,
                delay: introDone ? 0.42 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex max-w-xl flex-col gap-6 sm:mt-10"
            >
              <p className="text-pretty text-[1.1rem] leading-relaxed text-muted sm:text-[1.1rem]">
                I&apos;m <span className="font-medium text-fg">Srinath</span> — a B.Tech
                computer science student and AI intern building practical AI systems,
                data-driven experiments, and web interfaces that make technology feel
                effortless.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.22}>
                  <Link href="#work" className="btn btn-primary" data-cursor="hover">
                    Explore the work
                    <ArrowDown className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <Link
                    href="/resume/Nallamothu-Srinath-Resume.pdf"
                    download
                    className="btn btn-ghost"
                    data-cursor="hover"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </Link>
                </Magnetic>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                      Currently
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium">{profile.currentRole}</p>
                  </div>
                </div>
                <div className="hidden h-7 w-px bg-line sm:block" />
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <GraduationCap className="h-3.5 w-3.5" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                      Studying
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium">B.Tech CSE · 2029</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ y: cardY }}
            className="relative hidden lg:col-span-4 lg:col-start-9 lg:block"
          >
            <div aria-hidden="true" className="absolute -inset-16 -z-10">
              <div className="absolute inset-0 rounded-full border border-line/70" />
              <div className="absolute inset-8 rounded-full border border-dashed border-line/60 spin-slower" />
              <div className="absolute inset-20 rounded-full border border-line/50" />
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_8px_var(--glow)]" />
              <div className="absolute bottom-6 left-10 h-1.5 w-1.5 rounded-full bg-accent-2/70" />
              <div className="absolute right-2 top-1/3 h-1.5 w-1.5 rounded-full bg-fg/30" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 1.5 }}
              animate={
                introDone
                  ? { opacity: 1, y: 0, rotate: 0 }
                  : { opacity: 0, y: 30, rotate: 1.5 }
              }
              transition={{ duration: 0.95, delay: introDone ? 0.3 : 0, ease: [0.22, 1, 0.36, 1] }}
              className="hero-card"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <span className="mono text-subtle">Profile / 01</span>
                <span className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4">
                  <div className="portrait-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={profile.avatar}
                      alt={`${profile.name} portrait`}
                      width={100}
                      height={100}
                    />
                    <span className="portrait-tint" />
                    <span className="portrait-scan" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-[1.35rem] font-semibold leading-[1.05] tracking-[-0.04em]">
                      Nallamothu
                      <br />
                      Srinath
                    </p>
                    <p className="mt-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
                      AI intern · Frontend developer
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-line bg-surface p-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="pulse-dot mt-1" />
                    <div>
                      <p className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
                        Currently building
                      </p>
                      <p className="mt-1 text-[13px] font-medium leading-snug">
                        Applied AI at IBM SkillsBuild
                      </p>
                      <p className="mt-0.5 text-[13px] text-muted">
                        via Edunet Foundation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["AI", "Data", "Interface"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-muted"
                    >
                      {chip}
                    </span>
                  ))}
                  <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[13px] uppercase tracking-[0.1em] text-accent">
                    Python
                  </span>
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
                  {highlights.slice(0, 3).map((item) => (
                    <div key={item.label}>
                      <dt className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-[13px] leading-tight text-fg">
                        {item.label === "Focus" ? "AI × Interface" : item.value}
                      </dd>
                    </div>
                  ))}
                  <div>
                    <dt className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      Studying
                    </dt>
                    <dd className="mt-1 text-[13px] leading-tight text-fg">
                      B.Tech CSE, 2029
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex items-center justify-between border-t border-line px-5 py-3">
                <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                  17.3850° N / 78.4867° E
                </span>
                <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                  NS / 2026
                </span>
              </div>
            </motion.div>

            <div className="absolute -left-8 bottom-16 flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3 py-2 backdrop-blur-md">
              <Brain className="h-3 w-3 text-accent" />
              <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted">
                AI × Interface
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: introDone ? 0.55 : 0 }}
          className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-5 lg:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="portrait-frame h-11 w-11 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.avatar} alt="" width={100} height={100} />
              <span className="portrait-tint" />
            </div>
            <div>
              <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                Currently
              </p>
              <p className="mt-0.5 text-[13px] font-medium">AI & IBM Cloud Intern</p>
              <p className="text-[13px] text-muted">IBM SkillsBuild × Edunet</p>
            </div>
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-[13px] text-muted">
              <MapPin className="h-3 w-3" />
              Hyderabad
            </p>
            <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.1em] text-subtle">
              Open to remote
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="hero-ticker relative z-10 bg-surface backdrop-blur-sm">
        <div className="shell flex items-center gap-5 py-4">
          <span className="mono flex flex-none items-center gap-2 text-subtle">
            <ArrowDown className="h-3 w-3 animate-bounce" />
            Scroll
          </span>
          <div className="h-4 w-px bg-line" />
          <Marquee items={heroTicker} className="flex-1" />
          <Link
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden flex-none items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.12em] text-muted transition hover:text-accent md:flex"
            data-cursor="hover"
          >
            LinkedIn
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
