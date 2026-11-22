"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => undefined;
}

function getSnapshot() {
  return /Mac|iPhone|iPad/.test(navigator.userAgent);
}

function getServerSnapshot() {
  return false;
}

export function useIsMac() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
