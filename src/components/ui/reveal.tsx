"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true,
  amount = 0.2,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: Math.min(amount, 0.15) }}
      transition={{
        duration: reducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: reducedMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
