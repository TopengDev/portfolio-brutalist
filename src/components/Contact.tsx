"use client";

import { profile } from "@/content/profile";
import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";

const socials = [
  { k: "Email (primary)", v: profile.email, href: `mailto:${profile.email}`, accent: true },
  { k: "Email (alt)", v: profile.emailAlt, href: `mailto:${profile.emailAlt}`, accent: false },
  { k: "GitHub", v: `@${profile.github}`, href: profile.githubUrl, accent: false },
  { k: "LinkedIn", v: profile.linkedin, href: profile.linkedinUrl, accent: false },
  { k: "Site", v: profile.site, href: profile.siteUrl, accent: false },
  { k: "Company", v: profile.company, href: profile.companyUrl, accent: false },
];

export function Contact() {
  return (
    <SectionShell
      id="contact"
      index="010"
      total="011"
      kicker="Contact"
      title="Send a brief. I reply."
      rightMeta="No forms · no calendars"
    >
      {/* Huge mailto */}
      <Reveal as="div" dir="right" delay={0.06} duration={0.5}>
        <a
          href={`mailto:${profile.email}`}
          data-hover
          className="block border-t border-b border-[color:var(--color-line)] py-10 md:py-16 group"
        >
          <div className="section-index mb-4">— mailto</div>
          <span
            className="block font-[family-name:var(--font-display)] font-semibold tracking-[-0.04em] leading-[0.92] uppercase text-[clamp(2rem,11vw,11rem)] text-[color:var(--color-paper)] break-all group-hover:text-[color:var(--color-signal)] transition-colors duration-150"
            style={{ textWrap: "balance" }}
          >
            {profile.email}
            <span className="text-[color:var(--color-signal)]">_</span>
          </span>
        </a>
      </Reveal>

      <div className="mt-12 grid grid-cols-12 gap-4 md:gap-8">
        <Reveal as="div" dir="right" delay={0.04} className="col-span-12 md:col-span-3">
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)] leading-[1.6] max-w-[28ch]">
            Include: what you are building, your constraint (time / budget / stack), your real deadline. I answer within 24h on weekdays, JKT.
          </p>
        </Reveal>
        <ul className="col-span-12 md:col-span-9 divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]">
          {socials.map((s, i) => (
            <Reveal
              key={s.k}
              as="li"
              dir="right"
              delay={0.1 + i * 0.06}
              duration={0.32}
              className="grid grid-cols-12 gap-4 py-3"
            >
              <span className="col-span-6 md:col-span-3 section-index">{s.k}</span>
              <span className="col-span-6 md:col-span-9 font-[family-name:var(--font-mono)] text-[13px] text-right md:text-left">
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={`link ${s.accent ? "link-accent" : ""}`}
                >
                  {s.v}
                </a>
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
