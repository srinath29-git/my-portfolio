"use client";

import { Printer } from "lucide-react";

export function PrintButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className ?? "btn btn-ghost btn-sm no-print"}
      data-cursor="hover"
    >
      <Printer className="h-3.5 w-3.5" />
      Print / save
    </button>
  );
}
