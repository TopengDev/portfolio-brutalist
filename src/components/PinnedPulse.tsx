"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BEATS = [
  {
    kicker: "Beat 001",
    title: "Multi-tenant POS SaaS.",
    body: "One Next.js app. Tenant isolation, RBAC, owner subscription gating, staff bypass via membership.",
  },
  {
    kicker: "Beat 002",
    title: "Native Android. Capacitor + Kotlin TCP.",
    body: "Raw socket to thermal printer. JetDirect :9100. Supersedes the failed HTTPS bridge.",
  },
  {
    kicker: "Beat 003",
    title: "Indonesia. Bahasa + English. Dark theme.",
    body: "Brand teal #2DDCC7. Dogfooded daily on Arch + Android.",
  },
];

export function PinnedPulse() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Hard step — no easing. Snap at 0.33 and 0.66.
  const active = useTransform<number, number>(scrollYProgress, (v) => {
    if (v < 0.333) return 0;
    if (v < 0.666) return 1;
    return 2;
  });

  // 1-frame black flash near the boundaries (linear, steps-ish via snap)
  const flash = useTransform(scrollYProgress, (v) => {
    const d1 = Math.abs(v - 0.333);
    const d2 = Math.abs(v - 0.666);
    return d1 < 0.006 || d2 < 0.006 ? 1 : 0;
  });

  return (
    <section
      ref={ref}
      id="p-001"
      className="relative border-b border-[color:var(--color-line)]"
      style={{ height: "320vh", position: "relative" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative mx-auto max-w-[1600px] h-full px-6 md:px-10">
          {/* reg ticks on the pinned viewport */}
          <span className="reg-tick tl" aria-hidden />
          <span className="reg-tick tr" aria-hidden />
          <span className="reg-tick bl" aria-hidden />
          <span className="reg-tick br" aria-hidden />

          {/* top chrome */}
          <div className="grid grid-cols-12 gap-4 md:gap-8 pt-10">
            <div className="col-span-12 md:col-span-2">
              <span className="section-index">001 / 011</span>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="section-index mb-3">— Case study · PIN</div>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-medium leading-[0.95] tracking-tight text-[color:var(--color-paper)]">
                Pulse<span className="text-[color:var(--color-signal)]">.</span>
              </h2>
            </div>
            <div className="hidden md:flex md:col-span-3 items-start justify-end">
              <ProgressDots />
            </div>
          </div>

          {/* beats */}
          <div className="relative grid grid-cols-12 gap-4 md:gap-8 h-[calc(100vh-14rem)] items-center mt-6">
            <div className="col-span-12 md:col-span-2 flex flex-col gap-3">
              {BEATS.map((b, i) => (
                <BeatMarker key={i} index={i} active={active} />
              ))}
            </div>

            <div className="col-span-12 md:col-span-10 relative">
              {BEATS.map((b, i) => (
                <BeatPanel key={i} index={i} beat={b} active={active} />
              ))}
            </div>
          </div>

          {/* bottom strip */}
          <div className="absolute bottom-6 left-0 right-0 mx-auto max-w-[1600px] px-6 md:px-10">
            <div className="flex items-center justify-between border-t border-[color:var(--color-line)] pt-3">
              <span className="section-index">↓ scroll to advance · 3 beats</span>
              <span className="section-index">PULSE · APP.PULSE.AENOXA.COM</span>
            </div>
          </div>

          {/* hard black flash layer */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: flash }}
          />
        </div>
      </div>
    </section>
  );
}

function BeatMarker({
  index,
  active,
}: {
  index: number;
  active: ReturnType<typeof useTransform<number, number>>;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em]"
      style={{
        color: useTransform(active, (v) =>
          v === index ? "#FF4400" : "rgba(250,250,250,0.55)",
        ),
      }}
    >
      <motion.span
        className="inline-block h-[2px] bg-current"
        style={{
          width: useTransform(active, (v) => (v === index ? 32 : 12)),
        }}
      />
      <span>00{index + 1}</span>
    </motion.div>
  );
}

function BeatPanel({
  index,
  beat,
  active,
}: {
  index: number;
  beat: (typeof BEATS)[number];
  active: ReturnType<typeof useTransform<number, number>>;
}) {
  const visible = useTransform(active, (v) => (v === index ? 1 : 0));
  const clip = useTransform(active, (v) =>
    v === index ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity: visible }}
      aria-hidden={undefined}
    >
      <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-signal)] mb-4">
        — {beat.kicker}
      </div>
      <motion.h3
        className="font-[family-name:var(--font-display)] text-5xl md:text-8xl leading-[0.92] tracking-tight font-medium text-[color:var(--color-paper)]"
        style={{ clipPath: clip }}
        transition={{ duration: 0.25, ease: "linear" }}
      >
        {beat.title}
      </motion.h3>
      <p className="mt-6 md:mt-8 max-w-[52ch] font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] text-[color:var(--color-paper-dim)] leading-[1.65]">
        {beat.body}
      </p>
    </motion.div>
  );
}

function ProgressDots() {
  return (
    <div className="flex items-center gap-2 section-index">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 border border-[color:var(--color-paper-dim)]"
        />
      ))}
      <span className="ml-2">3 beats</span>
    </div>
  );
}
