"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 240, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 240, damping: 18, mass: 0.4 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((event.clientX - rect.left - rect.width / 2) * strength);
    rawY.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}
