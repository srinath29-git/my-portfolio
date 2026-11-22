"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastTone = "success" | "info" | "error";

type Toast = {
  id: number;
  message: string;
  tone: ToastTone;
};

type ToastContextValue = {
  toast: (message: string, tone?: ToastTone) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let toastId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = ++toastId;
      setToasts((current) => [...current.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismiss(id), 4200);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[130] flex flex-col items-center gap-2 px-4 no-print sm:bottom-7"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence>
          {toasts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className={cn(
                "pointer-events-auto flex max-w-md items-center gap-3 rounded-full border px-4 py-2.5 text-[13px] shadow-2xl backdrop-blur-xl",
                item.tone === "success" &&
                  "border-emerald-400/25 bg-emerald-950/85 text-emerald-50 dark:bg-emerald-950/85",
                item.tone === "info" &&
                  "border-line-strong bg-surface text-fg",
                item.tone === "error" &&
                  "border-red-400/25 bg-red-950/85 text-red-50",
              )}
              role="status"
            >
              <span
                className={cn(
                  "flex h-5 w-5 flex-none items-center justify-center rounded-full",
                  item.tone === "success" && "bg-emerald-400/15 text-emerald-300",
                  item.tone === "info" && "bg-accent-soft text-accent",
                  item.tone === "error" && "bg-red-400/15 text-red-300",
                )}
              >
                {item.tone === "success" ? (
                  <Check className="h-3 w-3" />
                ) : item.tone === "error" ? (
                  <X className="h-3 w-3" />
                ) : (
                  <Info className="h-3 w-3" />
                )}
              </span>
              <span>{item.message}</span>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                className="ml-1 rounded-full p-0.5 text-current/60 transition hover:text-current"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
