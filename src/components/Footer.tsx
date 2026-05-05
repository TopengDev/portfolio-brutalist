"use client";

import { useEffect, useMemo, useState } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { services } from "@/content/services";
import { now } from "@/content/now";
import { StatCounter } from "./StatCounter";

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

function fmtStamp(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(
    d.getUTCHours(),
  )}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`;
}

export function Footer() {
  const [stamp, setStamp] = useState("—");
  useEffect(() => {
    setStamp(fmtStamp(new Date()));
    const id = setInterval(() => setStamp(fmtStamp(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => {
    const allText = [
      ...profile.about,
      profile.oneLiner,
      ...projects.flatMap((p) => [p.title, p.summary, ...p.bullets, ...p.stack]),
      ...experience.map((e) => `${e.company} ${e.role} ${e.detail}`),
      ...skills,
      ...services.map((s) => `${s.name} ${s.detail}`),
      ...now.lines,
    ].join(" ");
    const words = allText.trim().split(/\s+/).length;
    const bytes = new TextEncoder().encode(allText).length;
    const build = hash(allText).toUpperCase();
    return { words, bytes, build };
  }, []);

  return (
    <footer className="relative w-full border-t border-[color:var(--color-line)] mt-20 md:mt-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <div className="col-span-12 md:col-span-6">
            <span className="section-index">011 / 011 — Mission</span>
            <p
              className="mt-4 font-[family-name:var(--font-display)] font-medium tracking-tight leading-[1.1] text-2xl md:text-4xl text-[color:var(--color-paper)] max-w-[22ch]"
              style={{ textWrap: "balance" }}
            >
              Multi-tenant SaaS, native shells, autonomous bots —{" "}
              <span className="text-[color:var(--color-signal)] italic">
                all running on one VPS reliably &amp; autonomously.
              </span>
            </p>
            <p className="mt-6 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--color-paper-dim)] leading-[1.7] max-w-[58ch]">
              Set in <span className="text-[color:var(--color-paper)]">Space Grotesk</span>{" "}
              (display) and <span className="text-[color:var(--color-paper)]">JetBrains Mono</span>{" "}
              (body). One accent:{" "}
              <span className="text-[color:var(--color-signal)]">#FF4400</span>. Next.js, Tailwind,
              Framer Motion. No trackers. No cookies. No forms. Press{" "}
              <kbd className="border border-[color:var(--color-line-strong)] px-1 py-[1px] text-[10px]">
                G
              </kbd>{" "}
              for the 12-col grid overlay.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <span className="section-index">— Stats</span>
            <dl className="mt-3 space-y-1 font-[family-name:var(--font-mono)] text-[11px] tabular-nums">
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">words</dt>
                <dd>
                  <StatCounter target={stats.words} durationMs={1100} />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">bytes</dt>
                <dd>
                  <StatCounter target={stats.bytes} durationMs={1300} />
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">sections</dt>
                <dd>011 / 011</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">build</dt>
                <dd>0x{stats.build}</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-6 md:col-span-3">
            <span className="section-index">— Signal</span>
            <dl className="mt-3 space-y-1 font-[family-name:var(--font-mono)] text-[11px]">
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">served</dt>
                <dd className="tabular-nums">{stamp}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">status</dt>
                <dd className="text-[color:var(--color-signal)]">OPEN TO WORK</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[color:var(--color-paper-dim)]">jurisdiction</dt>
                <dd>ID · UTC+7</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--color-line)] pt-4 flex flex-col md:flex-row gap-2 md:gap-8 items-start md:items-center justify-between font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-paper-dim)]">
          <span>
            © {new Date().getFullYear()} {profile.full}. All rights reserved.
          </span>
          <span>No rights grant you permission to ship slop.</span>
          <span>
            {profile.location} · {profile.email}
          </span>
        </div>
      </div>
    </footer>
  );
}
