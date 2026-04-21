"use client";

import { profile } from "@/content/profile";
import { LiveTicker } from "./LiveTicker";
import { RegistrationMarks } from "./RegistrationMark";
import { GlyphReveal } from "./GlyphReveal";

export function Hero() {
  return (
    <section className="relative w-full" id="top">
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 pt-10 md:pt-14 pb-20 md:pb-28">
        <RegistrationMarks />

        {/* Availability kicker — dedicated top strip, CANNOT overlap anything */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 border-t border-b border-[color:var(--color-line)] py-2.5 md:py-3 mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 bg-[color:var(--color-signal)] shrink-0"
              style={{ animation: "blink-step 1.4s steps(2,end) infinite" }}
              aria-hidden
            />
            <span className="font-[family-name:var(--font-mono)] text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]">
              Available for builds · Q2 2026
            </span>
          </div>
          <span className="font-[family-name:var(--font-mono)] text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-paper-dim)]">
            REPLY &lt; 24H · JKT · UTC+7
          </span>
        </div>

        {/* Top meta row */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 mb-8 md:mb-16">
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
            <span className="section-index">File</span>
            <span className="text-[11px] font-[family-name:var(--font-mono)]">
              toper.indrawan / 01
            </span>
          </div>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
            <span className="section-index">Trade</span>
            <span className="text-[11px] font-[family-name:var(--font-mono)]">
              software / end-to-end
            </span>
          </div>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
            <span className="section-index">Location</span>
            <span className="text-[11px] font-[family-name:var(--font-mono)]">
              {profile.location}
            </span>
          </div>
          <div className="col-span-6 md:col-span-3 flex flex-col gap-1">
            <span className="section-index">Updated</span>
            <LiveTicker />
          </div>
        </div>

        {/* Huge name — no sibling in the headline row, no overlap possible */}
        <div className="w-full">
          <h1
            data-magnet
            className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.04em] leading-[0.82] uppercase text-[clamp(2.5rem,13vw,17rem)] text-[color:var(--color-paper)]"
            style={{ textWrap: "balance" }}
            aria-label="Christopher Indrawan"
          >
            <GlyphReveal text="CHRISTOPHER" as="span" charDelay={38} className="block" />
            <span className="block">
              <GlyphReveal text="INDRAWAN" as="span" charDelay={40} scrambleMs={640} />
              <span className="text-[color:var(--color-signal)]">.</span>
            </span>
          </h1>
        </div>

        {/* Role row — full width under name */}
        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-4 md:gap-8 items-start border-t border-[color:var(--color-line)] pt-6 md:pt-8">
          <div className="col-span-12 md:col-span-3">
            <span className="section-index">— Role</span>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--color-paper-dim)] leading-[1.6] max-w-[28ch]">
              Goes by <span className="text-[color:var(--color-paper)]">Toper</span>. Not a founder. Not an officer. A builder who ships.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl leading-[1.15] tracking-tight text-[color:var(--color-paper)]">
              {profile.oneLiner}
            </p>
          </div>
        </div>

        {/* Spec strip */}
        <div className="mt-10 md:mt-16 border-t border-[color:var(--color-line)]">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[color:var(--color-line)]">
            {[
              ["Stack", "Next.js · Kotlin · Postgres · Rust · Go"],
              ["Day-job", "PT. Ihsan / Indosat · BUMN · Banking"],
              ["Focus", "Pulse · POS · Native bridges · AI ops"],
              ["Contact", profile.email],
            ].map(([k, v]) => (
              <div key={k} className="px-4 md:px-6 py-4 flex flex-col gap-1">
                <dt className="section-index">{k}</dt>
                <dd className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper)] break-words">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
