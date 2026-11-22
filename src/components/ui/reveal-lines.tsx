"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealLinesProps = {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  active?: boolean;
};

export function RevealLines({
  lines,
  className,
  delay = 0.2,
  stagger = 0.11,
  active = true,
}: RevealLinesProps) {
  const reducedMotion = useReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span className="hero-line" key={index}>
          <motion.span
            className="block"
            initial={{ y: "115%", opacity: 0 }}
            animate={
              active
                ? { y: 0, opacity: 1 }
                : { y: "115%", opacity: 0 }
            }
            transition={{
              duration: reducedMotion ? 0 : 1,
              ease: [0.22, 1, 0.36, 1],
              delay: reducedMotion ? 0 : delay + index * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
