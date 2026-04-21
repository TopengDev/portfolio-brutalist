"use client";

import { profile } from "@/content/profile";
import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <SectionShell
      id="about"
      index="002"
      total="011"
      kicker="About"
      title="Builder out of Jakarta. Shipping Pulse."
      rightMeta={`${profile.location}`}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {/* Column 1 */}
        <Reveal as="div" dir="right" delay={0.02} className="col-span-12 md:col-span-4 md:pt-6">
          <p className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[color:var(--color-paper)]">
            {profile.about[0]}
          </p>
        </Reveal>

        {/* Column 2 — offset down, shorter, ragged */}
        <Reveal as="div" dir="right" delay={0.14} className="col-span-12 md:col-span-4 md:pt-24">
          <p className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[color:var(--color-paper)]">
            {profile.about[1]}
          </p>
          <p className="mt-6 font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[color:var(--color-paper-dim)]">
            {profile.about[2]}
          </p>
        </Reveal>

        {/* Column 3 — offset further, tech strip + closer */}
        <Reveal as="div" dir="right" delay={0.26} className="col-span-12 md:col-span-4 md:pt-10">
          <p className="font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[color:var(--color-paper)]">
            {profile.about[3]}
          </p>
          <p className="mt-6 font-[family-name:var(--font-mono)] text-[13px] leading-[1.65] text-[color:var(--color-paper)]">
            {profile.about[4].split(profile.email)[0]}
            <a href={`mailto:${profile.email}`} className="link link-accent">
              {profile.email}
            </a>
            {profile.about[4].split(profile.email)[1] ?? ""}
          </p>
        </Reveal>
      </div>

      {/* fact sheet */}
      <div className="mt-16 md:mt-24 grid grid-cols-12 gap-4 md:gap-8">
        <Reveal as="div" dir="right" delay={0.04} className="col-span-12 md:col-span-3">
          <span className="section-index">— Fact sheet</span>
        </Reveal>
        <div className="col-span-12 md:col-span-9">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
            {[
              ["Goes by", profile.alias],
              ["Title", profile.title],
              ["Current", profile.current],
              ["Location", profile.location],
              ["Remote", profile.worksRemote],
              ["Languages", profile.languages.join(" · ")],
              ["GitHub", `@${profile.github}`],
              ["Site", profile.site],
            ].map(([k, v], i) => (
              <Reveal
                key={k}
                as="div"
                dir="right"
                delay={0.08 + i * 0.04}
                duration={0.3}
                className="flex items-baseline gap-4 border-b border-[color:var(--color-line)] py-2"
              >
                <dt className="section-index w-24 shrink-0">{k}</dt>
                <dd className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper)]">
                  {v}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </SectionShell>
  );
}
