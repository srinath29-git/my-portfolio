import Link from "next/link";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";
import { profile, siteConfig } from "@/data/portfolio";
import { Logo } from "@/components/ui/logo";
import { SocialLinks } from "@/components/ui/social-links";
import { CopyButton } from "@/components/ui/copy-button";
import { Magnetic } from "@/components/ui/magnetic";
import { LocalTime } from "@/components/ui/local-time";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Experience", href: "#record" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="no-print relative overflow-hidden border-t border-line bg-bg-deep"
    >
      <div className="shell relative z-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-pretty text-[15px] leading-relaxed text-muted">
              AI intern, frontend developer, and B.Tech computer science student.
              Building practical systems and considered interfaces from Hyderabad.
            </p>
            <div className="mt-7">
              <SocialLinks />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CopyButton
                value={profile.email}
                label={profile.email}
                successMessage="Email copied to clipboard."
                className="text-[14px] text-muted hover:text-fg"
              />
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <p className="mono text-subtle">Index</p>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  className="group flex w-fit items-center gap-2 text-[15px] text-muted transition-colors hover:text-accent"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            <p className="mono text-subtle">Status</p>
            <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
              <div className="flex items-center gap-2.5">
                <span className="pulse-dot" />
                <span className="text-[14px] font-medium leading-snug">
                  {profile.availability}
                </span>
              </div>
              <div className="mt-4 space-y-3 border-t border-line pt-4 text-[13.5px] text-muted">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-subtle">Local time</span>
                  <span className="text-fg">
                    <LocalTime timeZone={siteConfig.timeZone} /> IST
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-subtle">Based in</span>
                  <span className="flex items-center gap-1 text-fg">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    Hyderabad
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-subtle">Work mode</span>
                  <span className="text-fg">Remote-ready</span>
                </div>
              </div>
            </div>
            <Link
              href="/resume"
              className="btn btn-ghost btn-sm mt-3 w-full justify-between"
              data-cursor="hover"
            >
              <span>Résumé / CV</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="mono text-subtle">Nallamothu Srinath</p>
            <p
              aria-hidden="true"
              className="mt-4 font-display text-[clamp(2.2rem,10.2vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.065em] text-fg/30"
            >
              <span className="block">Nallamothu</span>
              <span className="block text-accent/45">Srinath</span>
            </p>
          </div>

          <Magnetic className="flex-none" strength={0.35}>
            <Link
              href="/#top"
              aria-label="Back to top"
              data-cursor="hover"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-surface transition hover:border-accent hover:text-accent"
            >
              <ArrowUp className="h-4 w-4 transition group-hover:-translate-y-0.5" />
            </Link>
          </Magnetic>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line py-8 text-[13px] text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© 2026 {profile.name}</span>
            <span className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>Information verified from LinkedIn & GitHub</span>
          </div>
          <span className="font-mono text-[12px] uppercase tracking-[0.1em] text-subtle">
            Designed & built with intent
          </span>
        </div>
      </div>
    </footer>
  );
}
