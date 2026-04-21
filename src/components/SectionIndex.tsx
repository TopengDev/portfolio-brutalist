"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useOnScreen } from "@/lib/useOnScreen";

type Props = {
  index: string;
  total: string;
};

export function SectionIndex({ index, total }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref, 0.98);
  const target = parseInt(index, 10);
  const [current, setCurrent] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCurrent(target);
      return;
    }
    if (!onScreen) return;
    let frame = 0;
    setCurrent(0);
    const id = window.setInterval(() => {
      frame++;
      if (frame >= target) {
        setCurrent(target);
        clearInterval(id);
      } else {
        setCurrent(frame);
      }
    }, 35);
    return () => clearInterval(id);
  }, [target, reduced, onScreen]);

  return (
    <span ref={ref} className="section-index tabular-nums">
      {current.toString().padStart(3, "0")} / {total}
    </span>
  );
}
