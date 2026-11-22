"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { registerLenis, unregisterLenis } from "@/lib/scroll";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    registerLenis(lenis);

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const destination = document.querySelector(hash);
      if (!destination) return;
      event.preventDefault();
      lenis.scrollTo(destination as HTMLElement, { offset: -90, duration: 1.2 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(raf);
      unregisterLenis();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
}
