"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Scroll-listener-based visibility hook.
 * Prefer over IntersectionObserver per frontend-design skill §9.5.2 —
 * IO silently misfires on some Android Chromium forks and occasionally
 * on Playwright scroll-to-position.
 */
export function useOnScreen<T extends HTMLElement>(
  ref: RefObject<T | null>,
  threshold = 0.85,
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const trigger = window.innerHeight * threshold;
      if (rect.top < trigger && rect.top + rect.height > 0) setVisible(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [ref, threshold, visible]);

  return visible;
}
