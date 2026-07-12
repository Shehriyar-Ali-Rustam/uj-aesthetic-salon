"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query. Returns false until mounted, then tracks changes. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
