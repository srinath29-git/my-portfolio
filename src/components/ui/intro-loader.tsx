"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INTRO_COMPLETE_EVENT, INTRO_STORAGE_KEY } from "@/lib/intro";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = window.sessionStorage.getItem(INTRO_STORAGE_KEY);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || prefersReduced) {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
      const frame = window.requestAnimationFrame(() => {
        setVisible(false);
        window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    document.documentElement.style.overflow = "hidden";
    const startedAt = performance.now();
    const duration = 1100;

    let raf = 0;
    const tick = (now: number) => {
      const ratio = Math.min(1, (now - startedAt) / duration);
      setProgress(Math.round(ratio * 100));
      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setVisible(false);
          document.documentElement.style.overflow = "";
          window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
          window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="no-print fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-[#05060a] p-6 text-white sm:p-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          aria-hidden="true"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(50% 50% at 70% 30%, rgba(77,141,255,0.28), transparent 70%), radial-gradient(40% 40% at 20% 70%, rgba(139,233,255,0.1), transparent 70%)",
            }}
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 font-mono text-[13px]">
                NS
              </span>
              <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-white/70">
                Portfolio / 2026
              </span>
            </div>
            <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-white/65">
              Hyderabad, IN
            </span>
          </div>

          <div className="relative flex flex-col items-start gap-5">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
                className="font-display text-[clamp(2.8rem,10vw,7rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
              >
                Nallamothu
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                className="font-serif text-[clamp(2.8rem,10vw,7rem)] italic leading-[0.9] tracking-[-0.03em] text-[#8be9ff]"
              >
                Srinath
              </motion.p>
            </div>
            <p className="max-w-xs font-mono text-[13px] uppercase leading-relaxed tracking-[0.16em] text-white/70">
              AI × Data × Interface
              <br />
              Initialising the experience
            </p>
          </div>

          <div className="relative">
            <div className="mb-3 flex items-center justify-between font-mono text-[13px] uppercase tracking-[0.18em] text-white/70">
              <span>Loading</span>
              <span>{String(progress).padStart(3, "0")}%</span>
            </div>
            <div className="h-px w-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4d8dff] to-[#8be9ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
