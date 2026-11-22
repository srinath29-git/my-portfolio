"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ToastProvider } from "@/components/providers/toast-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll />
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
