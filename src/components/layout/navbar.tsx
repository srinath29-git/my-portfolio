"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SocialLinks } from "@/components/ui/social-links";
import { Magnetic } from "@/components/ui/magnetic";
import { useDialog } from "@/hooks/use-dialog";
import { useIsMac } from "@/hooks/use-is-mac";
import { cn } from "@/lib/utils";

const desktopLinks = navItems.filter((item) =>
  ["#about", "#journey", "#record", "#work", "#skills", "#proof", "#contact"].includes(
    item.href,
  ),
);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [menuState, setMenuState] = useState({ open: false, path: pathname });
  const menuOpen = menuState.open && menuState.path === pathname;
  const setMenuOpen = (open: boolean) => setMenuState({ open, path: pathname });
  const menuRef = useRef<HTMLDivElement>(null);
  const isMac = useIsMac();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const ids = navItems.map((item) => item.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-34% 0px -56% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  useDialog(menuOpen, () => setMenuOpen(false), menuRef);

  return (
    <>
      <header
        className={cn(
          "no-print fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled ? "py-2.5" : "py-4 sm:py-5",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between gap-4 rounded-2xl transition-all duration-500",
            scrolled
              ? "border border-line bg-[var(--nav-bg)] px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:px-4"
              : "border border-transparent px-0 py-0",
          )}
        >
          <Logo />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-0.5 lg:flex"
          >
            {desktopLinks.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = pathname === "/" && active === id;
              return (
                <Link
                  key={item.href}
                  href={pathname === "/" ? item.href : `/${item.href}`}
                  className={cn(
                    "relative rounded-full px-3 py-2 text-[13px] font-medium tracking-[0.02em] transition-colors",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                  aria-current={isActive ? "location" : undefined}
                  data-cursor="hover"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-line bg-accent-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("ns:command"))}
              className="hidden h-10 items-center gap-2 rounded-full border border-line-strong bg-surface px-3 text-[13px] text-muted transition hover:border-accent/50 hover:bg-accent-soft hover:text-fg xl:flex"
              aria-label="Open command palette"
              data-cursor="hover"
            >
              <Command className="h-3.5 w-3.5" />
              <span>Quick nav</span>
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[13px] text-subtle">
                {isMac ? "⌘ K" : "Ctrl K"}
              </kbd>
            </button>

            <ThemeToggle />

            <Magnetic className="hidden sm:inline-flex" strength={0.2}>
              <Link
                href="/resume"
                className="btn btn-ghost btn-sm hidden md:inline-flex"
                data-cursor="hover"
              >
                Résumé
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="icon-btn lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              data-cursor="hover"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="mobile-menu no-print"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex min-h-full flex-col px-6 pb-8 pt-5 sm:px-10 sm:pt-7">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="icon-btn"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-12 flex items-center gap-3">
                <span className="pulse-dot" />
                <span className="mono text-muted">{profile.availability}</span>
              </div>

              <nav
                aria-label="Mobile navigation"
                className="mt-8 flex flex-col border-t border-line"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.12 + index * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={pathname === "/" ? item.href : `/${item.href}`}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline justify-between border-b border-line py-2.5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[13px] tracking-[0.14em] text-subtle">
                          {item.index}
                        </span>
                        <span className="font-display text-[clamp(2rem,8vw,3.25rem)] font-semibold leading-none tracking-[-0.05em] transition-colors group-hover:text-accent">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto grid gap-6 pt-10 sm:grid-cols-2">
                <div>
                  <p className="mono text-subtle">Direct</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="mt-2 block break-all text-sm text-muted transition hover:text-fg"
                  >
                    {profile.email}
                  </a>
                  <SocialLinks className="mt-5" />
                </div>
                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <p className="mono text-subtle">Based in</p>
                  <p className="text-sm text-muted">
                    {profile.location}
                    <br />
                    <span className="text-subtle">Available for remote work</span>
                  </p>
                  <Link
                    href="/resume"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-primary btn-sm mt-1"
                  >
                    View résumé
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
