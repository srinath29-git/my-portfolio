import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Command, Home, Layers } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-bg absolute inset-0 opacity-60" />
        <div className="hero-aurora opacity-40" />
        <div className="orb -left-40 top-1/3 h-[24rem] w-[24rem] bg-accent/20" />
      </div>

      <div className="shell relative z-10">
        <div className="flex items-center justify-between border-t border-line pt-5">
          <span className="mono text-muted">[ Error / 404 ]</span>
          <span className="mono text-muted">Page not found</span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[clamp(5rem,18vw,14rem)] font-medium leading-[0.8] tracking-[-0.06em] text-fg/[0.08]">
              404
            </p>
            <h1 className="-mt-4 max-w-2xl text-balance font-display text-[clamp(2.6rem,6.5vw,5.6rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
              This page took
              <br />
              a <span className="serif text-muted">wrong turn.</span>
            </h1>
            <p className="mt-6 max-w-md text-pretty text-[1rem] leading-relaxed text-muted">
              The URL doesn&apos;t resolve to anything here. The work, the record, and the contact
              form are all still exactly where they should be.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.2}>
                <Link href="/" className="btn btn-primary" data-cursor="hover">
                  <Home className="h-4 w-4" />
                  Back to the index
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <Link href="/#work" className="btn btn-ghost" data-cursor="hover">
                  <Layers className="h-4 w-4" />
                  Browse the work
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="mono text-subtle">Useful shortcuts</p>
              <div className="mt-4 space-y-1.5">
                <Link
                  href="/#about"
                  className="group flex items-center justify-between border-b border-line py-2 text-[13px] text-muted transition hover:text-fg"
                >
                  About
                  <ArrowUpRight className="h-3 w-3 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
                <Link
                  href="/resume"
                  className="group flex items-center justify-between border-b border-line py-2 text-[13px] text-muted transition hover:text-fg"
                >
                  Résumé
                  <ArrowUpRight className="h-3 w-3 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
                <Link
                  href="/#contact"
                  className="group flex items-center justify-between border-b border-line py-2 text-[13px] text-muted transition hover:text-fg"
                >
                  Contact
                  <ArrowUpRight className="h-3 w-3 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </Link>
              </div>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-subtle">
                <Command className="h-3 w-3" />
                Or press Ctrl / ⌘ K anywhere
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[13px] text-muted transition hover:text-fg"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
            Return home
          </Link>
          <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-subtle">
            NS / 2026
          </span>
        </div>
      </div>
    </section>
  );
}
