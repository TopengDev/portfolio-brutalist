"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useOnScreen } from "@/lib/useOnScreen";

type Props = {
  target: number;
  durationMs?: number;
  className?: string;
};

export function StatCounter({ target, durationMs = 900, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref, 0.95);
  const [n, setN] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setN(target);
      return;
    }
    if (!onScreen) return;
    let raf = 0;
    let startTime = 0;
    const tick = (t: number) => {
      if (!startTime) startTime = t;
      const elapsed = t - startTime;
      const p = Math.min(1, elapsed / durationMs);
      setN(Math.round(target * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduced, onScreen]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString()}
    </span>
  );
}
