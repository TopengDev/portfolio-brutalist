"use client";

import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";

const drafts = [
  {
    idx: "DRAFT.01",
    title: "Why we killed our HTTPS bridge for a Kotlin plugin",
    note: "Chrome Private Network Access, JetDirect :9100, and a receipt printer in the wild.",
    status: "drafting",
  },
  {
    idx: "DRAFT.02",
    title: "Multi-tenant RBAC without a mess",
    note: "Subscription gates the owner. Staff bypass via membership. RBAC still enforced.",
    status: "outline",
  },
  {
    idx: "DRAFT.03",
    title: "The Indonesian SMB stack I wish existed",
    note: "POS, aggregator, payments, accounting — one login, one inventory.",
    status: "notes",
  },
];

export function Writing() {
  return (
    <SectionShell
      id="writing"
      index="009"
      total="011"
      kicker="Writing"
      title="Nothing published yet. Here are the drafts."
      rightMeta="0 published · 3 drafting"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <Reveal as="div" dir="right" delay={0.04} className="col-span-12 md:col-span-3">
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)] leading-[1.6] max-w-[28ch]">
            Writing is on the schedule. Shipping always wins. When a post goes up it will live here.
          </p>
        </Reveal>
        <ol className="col-span-12 md:col-span-9 divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]">
          {drafts.map((d, i) => (
            <Reveal
              key={d.idx}
              as="li"
              dir="right"
              delay={0.08 + i * 0.09}
              duration={0.38}
              className="grid grid-cols-12 gap-3 md:gap-6 py-5 group cursor-default"
            >
              <div className="col-span-12 md:col-span-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em] text-[color:var(--color-signal)]">
                {d.idx}
              </div>
              <div className="col-span-12 md:col-span-7" data-hover>
                <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight tracking-tight text-[color:var(--color-paper)] group-hover:text-[color:var(--color-signal)] transition-colors duration-150">
                  {d.title}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)]">
                  {d.note}
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <span className="section-index">[{d.status}]</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
