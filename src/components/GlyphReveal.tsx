"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const POOL = "!@#$%&*?+=<>/\\|01ABCDEFGHIJ";

function randGlyph() {
  return POOL.charAt(Math.floor(Math.random() * POOL.length));
}

type Props = {
  text: string;
  charDelay?: number;
  scrambleMs?: number;
  tickMs?: number;
  className?: string;
  as?: "span" | "div";
  ariaLabel?: string;
};

/**
 * Terminal-decode-style glyph reveal.
 * - Single setInterval tick.
 * - Locks tracked in a local array (not React state) so the tick reads the
 *   latest without retrieving a stale closure.
 * - Self-terminates the moment every character is locked.
 * - Strict-Mode / HMR safe: the cleanup clears timers and the next effect
 *   run starts a fresh scramble.
 */
export function GlyphReveal({
  text,
  charDelay = 40,
  scrambleMs = 520,
  tickMs = 45,
  className,
  as: Tag = "span",
  ariaLabel,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState<string>(text);

  useEffect(() => {
    if (reduced) {
      setDisplay(text);
      return;
    }

    const chars = text.split("");
    const locked: boolean[] = chars.map((ch) => /\s/.test(ch));
    let stopped = false;

    // initial scrambled frame
    setDisplay(chars.map((ch, i) => (locked[i] ? ch : randGlyph())).join(""));

    // per-char lock timers
    const lockTimers: number[] = [];
    chars.forEach((ch, i) => {
      if (/\s/.test(ch)) return;
      const id = window.setTimeout(
        () => {
          locked[i] = true;
        },
        i * charDelay + scrambleMs,
      );
      lockTimers.push(id);
    });

    // single tick, self-terminates when all chars locked
    const tick = window.setInterval(() => {
      if (stopped) return;
      if (locked.every(Boolean)) {
        setDisplay(text);
        window.clearInterval(tick);
        stopped = true;
        return;
      }
      setDisplay(
        chars.map((ch, i) => (locked[i] ? ch : randGlyph())).join(""),
      );
    }, tickMs);

    return () => {
      stopped = true;
      lockTimers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(tick);
    };
  }, [text, charDelay, scrambleMs, tickMs, reduced]);

  return (
    <Tag className={className} aria-label={ariaLabel ?? text}>
      <span aria-hidden>{display}</span>
    </Tag>
  );
}
