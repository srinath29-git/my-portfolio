"use client";

import { useEffect, useRef, type RefObject } from "react";
import { lockScroll, unlockScroll } from "@/lib/scroll";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useDialog(
  open: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
) {
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll();

    const container = containerRef.current;
    const focusable = container
      ? Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (element) => element.offsetParent !== null,
        )
      : [];

    const first = focusable[0];
    if (first) {
      window.setTimeout(() => first.focus(), 30);
    } else {
      container?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current();
        return;
      }

      if (event.key !== "Tab" || !container) return;

      const enabled = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (enabled.length === 0) return;

      const firstElement = enabled[0];
      const lastElement = enabled[enabled.length - 1];
      const active = document.activeElement;

      if (!event.shiftKey && active === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && active === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlockScroll();
      previouslyFocused?.focus?.();
    };
  }, [open, containerRef]);
}
