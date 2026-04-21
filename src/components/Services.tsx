"use client";

import { services } from "@/content/services";
import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <SectionShell
      id="services"
      index="006"
      total="011"
      kicker="Services"
      title="What you can hire me for."
      rightMeta="Solo or small-squad"
    >
      <div className="grid grid-cols-12 border-t border-[color:var(--color-line)]">
        {services.map((s, i) => {
          const col = i % 3;
          return (
            <Reveal
              key={s.code}
              as="div"
              dir="right"
              delay={0.04 + i * 0.07}
              duration={0.38}
              className={`col-span-12 md:col-span-4 p-6 md:p-8 border-b border-[color:var(--color-line)] ${
                col !== 2 ? "md:border-r md:border-[color:var(--color-line)]" : ""
              } group cursor-default`}
            >
              <div data-hover>
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[color:var(--color-signal)] text-[11px] tracking-[0.18em]">
                    {s.code}
                  </span>
                  <span className="section-index">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-medium leading-[1.05] tracking-tight text-[color:var(--color-paper)] group-hover:text-[color:var(--color-signal)] transition-colors duration-150">
                  {s.name}
                </h3>
                <p className="mt-4 font-[family-name:var(--font-mono)] text-[12px] leading-[1.65] text-[color:var(--color-paper-dim)]">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}
