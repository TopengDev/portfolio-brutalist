"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { useOnScreen } from "@/lib/useOnScreen";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type Dir = "right" | "down" | "up" | "left";

type Props = {
  children: ReactNode;
  /** Clip-wipe direction. "right" = content revealed left → right. */
  dir?: Dir;
  /** Stagger delay in seconds */
  delay?: number;
  /** Reveal duration (default 360ms — caps the brief's <600ms rule) */
  duration?: number;
  /** Translate offset in % (hard-cuts snap from this offset to 0) */
  offset?: number;
  /** Force-disable motion (e.g. inside a nested Reveal) */
  noMotion?: boolean;
  className?: string;
  /** Visibility threshold — 0.95 = trigger when element is ~5% into viewport top */
  threshold?: number;
  /** Wrapper element */
  as?: "div" | "li" | "tr" | "section" | "article";
};

/**
 * Brutalist reveal primitive.
 * Hard clip-path wipe + small translate snap. Linear timing. No opacity fade.
 * Driven by manual scroll-listener (useOnScreen) for reliability on Android / Playwright.
 */
export function Reveal({
  children,
  dir = "right",
  delay = 0,
  duration = 0.36,
  offset = 2,
  noMotion = false,
  className,
  threshold = 0.95,
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(ref as React.RefObject<HTMLElement>, threshold);
  const reduced = usePrefersReducedMotion();
  const active = reduced || noMotion || onScreen;

  const initialClip =
    dir === "right"
      ? "inset(0 100% 0 0)"
      : dir === "left"
        ? "inset(0 0 0 100%)"
        : dir === "down"
          ? "inset(0 0 100% 0)"
          : "inset(100% 0 0 0)";

  const initialTransform =
    dir === "right"
      ? { x: `-${offset}%`, y: 0 }
      : dir === "left"
        ? { x: `${offset}%`, y: 0 }
        : dir === "down"
          ? { x: 0, y: `-${offset}%` }
          : { x: 0, y: `${offset}%` };

  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={false}
      animate={{
        clipPath: active ? "inset(0 0 0 0)" : initialClip,
        x: active ? 0 : initialTransform.x,
        y: active ? 0 : initialTransform.y,
      }}
      transition={{
        duration: reduced || noMotion ? 0 : duration,
        ease: "linear",
        delay: reduced || noMotion ? 0 : delay,
      }}
    >
      {children}
    </MotionTag>
  );
}
