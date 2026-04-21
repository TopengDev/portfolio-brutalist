"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor accent dot follower.
 * - Hard scale-up on hover over any [data-hover]/a/button.
 * - Linear magnetic pull toward any [data-magnet] heading within 280px.
 *   (Pure linear lerp each frame — no spring, no bezier.)
 */
export function CursorDot() {
  const [mounted, setMounted] = useState(false);
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const renderedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const [big, setBig] = useState(false);
  const [magnet, setMagnet] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    setMounted(true);

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setBig(!!t && t.closest("a,button,[data-hover]") !== null);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);

    let raf = 0;
    const tick = () => {
      const dot = dotRef.current;
      if (!dot) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // find nearest magnet
      const magnets = document.querySelectorAll<HTMLElement>("[data-magnet]");
      let pulledX = posRef.current.x;
      let pulledY = posRef.current.y;
      let isMagnet = false;

      magnets.forEach((m) => {
        const r = m.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - posRef.current.x;
        const dy = cy - posRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 280) {
          // linear pull — hard, proximity-weighted
          const pull = 1 - dist / 280; // 0..1
          pulledX = posRef.current.x + dx * pull * 0.35;
          pulledY = posRef.current.y + dy * pull * 0.35;
          isMagnet = true;
        }
      });

      // snap render — no easing (linear lerp 0.45 per frame still counts as linear, but for brutalism we do half-step hard)
      renderedRef.current.x += (pulledX - renderedRef.current.x) * 0.5;
      renderedRef.current.y += (pulledY - renderedRef.current.y) * 0.5;

      dot.style.left = renderedRef.current.x + "px";
      dot.style.top = renderedRef.current.y + "px";
      setMagnet(isMagnet);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted) return null;
  const size = magnet ? 28 : big ? 20 : 8;
  return (
    <span
      ref={dotRef}
      className="accent-dot"
      aria-hidden
      style={{ width: size, height: size }}
    />
  );
}
