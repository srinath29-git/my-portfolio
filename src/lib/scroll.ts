import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let lockCount = 0;

export function registerLenis(instance: Lenis) {
  lenisInstance = instance;
}

export function unregisterLenis() {
  lenisInstance = null;
}

export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    lenisInstance?.stop();
    document.documentElement.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    lenisInstance?.start();
    document.documentElement.style.overflow = "";
  }
}

export function scrollToTop() {
  lenisInstance?.scrollTo(0, { immediate: true });
}

export function scrollToHash(hash: string, offset = -88) {
  const element = document.querySelector<HTMLElement>(hash);
  if (!element) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset, duration: 1.2 });
  } else {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
