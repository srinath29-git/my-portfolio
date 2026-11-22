import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label="Nallamothu Srinath — home"
      data-cursor="hover"
    >
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[0.7rem] border border-line-strong bg-surface font-mono text-[13px] font-medium tracking-[0.02em] text-fg transition-colors group-hover:border-accent/60 group-hover:text-accent">
        NS
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent opacity-70 blur-[1px]" />
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="text-[13px] font-semibold tracking-[-0.01em] text-fg">
          Nallamothu Srinath
        </span>
        <span className="mt-1 font-mono text-[13px] uppercase tracking-[0.18em] text-subtle">
          AI × Data × Interface
        </span>
      </span>
    </Link>
  );
}
