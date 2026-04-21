"use client";

import { experience } from "@/content/experience";
import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <SectionShell
      id="experience"
      index="004"
      total="011"
      kicker="Work history"
      title="Where the hours went."
      rightMeta={`${experience.length} entries`}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <Reveal as="div" dir="right" delay={0.04} className="col-span-12 md:col-span-3">
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)] leading-[1.6] max-w-[32ch]">
            Reverse chronological. Aenoxa is the work I want evaluated on. Day-job pays the rent.
          </p>
        </Reveal>

        <div className="col-span-12 md:col-span-9 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="brutalist min-w-[640px] md:min-w-0">
            <thead>
              <tr>
                <th>Year</th>
                <th>Company</th>
                <th>Role</th>
                <th className="hidden md:table-cell">Kind</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((e, i) => (
                <Reveal
                  key={e.company}
                  as="tr"
                  dir="right"
                  delay={0.06 + i * 0.06}
                  duration={0.34}
                >
                  <td className="whitespace-nowrap tabular-nums">{e.range}</td>
                  <td className="font-medium text-[color:var(--color-paper)]">{e.company}</td>
                  <td>{e.role}</td>
                  <td className="hidden md:table-cell text-[color:var(--color-paper-dim)]">
                    {e.kind}
                  </td>
                  <td className="text-[color:var(--color-paper-dim)]">{e.detail}</td>
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionShell>
  );
}
