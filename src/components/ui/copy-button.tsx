"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  value: string;
  label?: string;
  successMessage?: string;
  className?: string;
  showIcon?: boolean;
};

export function CopyButton({
  value,
  label = "Copy",
  successMessage = "Copied to clipboard.",
  className,
  showIcon = true,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast(successMessage, "success");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Couldn't copy automatically. Please select the text instead.", "error");
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex items-center gap-2 text-left transition-colors hover:text-accent",
        className,
      )}
      aria-label={`${label}: ${value}`}
      data-cursor="hover"
    >
      {showIcon && (
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-line-strong bg-surface">
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-muted transition group-hover:text-accent" />
          )}
        </span>
      )}
      <span className="text-sm">{copied ? "Copied" : label}</span>
    </button>
  );
}
