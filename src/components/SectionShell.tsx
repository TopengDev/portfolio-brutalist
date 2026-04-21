"use client";

import type { ReactNode } from "react";
import { RegistrationMarks } from "./RegistrationMark";
import { SectionIndex } from "./SectionIndex";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  total: string;
  kicker: string;
  title: string;
  rightMeta?: string;
  children: ReactNode;
  id?: string;
};

export function SectionShell({ index, total, kicker, title, rightMeta, children, id }: Props) {
  return (
    <section
      id={id}
      className="relative w-full border-t border-[color:var(--color-line)]"
    >
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
        <RegistrationMarks />

        <header className="grid grid-cols-12 gap-4 md:gap-8 mb-16">
          <div className="col-span-12 md:col-span-2">
            <SectionIndex index={index} total={total} />
          </div>
          <div className="col-span-12 md:col-span-7">
            <Reveal dir="right" delay={0.04}>
              <div className="section-index mb-3">— {kicker}</div>
            </Reveal>
            <Reveal dir="right" delay={0.12} duration={0.44}>
              <h2
                data-magnet
                className="font-[family-name:var(--font-display)] font-medium tracking-tight leading-[0.95] text-5xl md:text-7xl text-[color:var(--color-paper)]"
                style={{ textWrap: "balance" }}
              >
                {title}
              </h2>
            </Reveal>
          </div>
          <div className="hidden md:flex md:col-span-3 items-start justify-end">
            {rightMeta ? (
              <Reveal dir="left" delay={0.08}>
                <span className="section-index text-right">{rightMeta}</span>
              </Reveal>
            ) : null}
          </div>
        </header>

        {children}
      </div>
    </section>
  );
}
