"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="no-print fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
      style={{ scaleX }}
    />
  );
}
