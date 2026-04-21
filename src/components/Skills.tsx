"use client";

import { useEffect, useRef, useState } from "react";
import { skills, stackTable } from "@/content/skills";
import { SectionShell } from "./SectionShell";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useOnScreen } from "@/lib/useOnScreen";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <SectionShell
      id="skills"
      index="005"
      total="011"
      kicker="Stack"
      title="Tools I reach for."
      rightMeta="From raw TCP → RSC"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        {/* Top skills column */}
        <div className="col-span-12 md:col-span-5">
          <span className="section-index">— Primary</span>
          <SkillList />
        </div>

        {/* Stack layers table */}
        <div className="col-span-12 md:col-span-7 md:pt-8">
          <span className="section-index">— Layers</span>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0 mt-4">
          <table className="brutalist min-w-[620px] md:min-w-0">
            <thead>
              <tr>
                <th>Layer</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {stackTable.map((r, i) => (
                <Reveal
                  key={r.layer}
                  as="tr"
                  dir="right"
                  delay={0.06 + i * 0.06}
                  duration={0.34}
                >
                  <td className="w-44 font-medium text-[color:var(--color-paper)]">{r.layer}</td>
                  <td className="text-[color:var(--color-paper-dim)]">{r.tools}</td>
                </Reveal>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function SkillList() {
  const ref = useRef<HTMLOListElement>(null);
  const onScreen = useOnScreen(ref, 0.95);
  const [typedCount, setTypedCount] = useState<number[]>(() => skills.map(() => 0));
  const [started, setStarted] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setTypedCount(skills.map((s) => s.length));
      setStarted(true);
      return;
    }
    if (onScreen && !started) setStarted(true);
  }, [reduced, started, onScreen]);

  useEffect(() => {
    if (!started || reduced) return;
    const charMs = 10;
    // compute cumulative start offsets so each skill starts after prev finishes
    const offsets: number[] = [];
    let cursor = 0;
    skills.forEach((s) => {
      offsets.push(cursor);
      cursor += s.length * charMs + 60;
    });

    const timers: number[] = [];
    skills.forEach((s, idx) => {
      timers.push(
        window.setTimeout(() => {
          let i = 0;
          const interval = window.setInterval(() => {
            i++;
            setTypedCount((prev) => {
              const next = prev.slice();
              next[idx] = i;
              return next;
            });
            if (i >= s.length) clearInterval(interval);
          }, charMs);
          timers.push(interval);
        }, offsets[idx]),
      );
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [started, reduced]);

  return (
    <ol
      ref={ref}
      className="mt-4 divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]"
    >
      {skills.map((s, i) => {
        const shown = s.slice(0, typedCount[i]);
        const showCursor = started && typedCount[i] < s.length;
        const kind = i < 3 ? "core" : i < 8 ? "daily" : "working";
        return (
          <li
            key={s}
            className="flex items-center justify-between py-3 group cursor-default"
            data-hover
          >
            <span className="flex items-baseline gap-3 font-[family-name:var(--font-mono)] text-[13px] text-[color:var(--color-paper)]">
              <span className="w-10 text-[color:var(--color-paper-dim)] tabular-nums">
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <span
                className="group-hover:text-[color:var(--color-signal)] transition-colors duration-150"
                aria-label={s}
              >
                <span aria-hidden>{shown}</span>
                {showCursor ? <span className="blink-cursor" /> : null}
              </span>
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-paper-dim)]">
              {kind}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
