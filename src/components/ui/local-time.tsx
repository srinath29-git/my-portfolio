"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";

export function LocalTime({ timeZone = "Asia/Kolkata" }: { timeZone?: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(formatTime(new Date(), timeZone));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time}
    </span>
  );
}
