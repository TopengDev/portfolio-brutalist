"use client";

import { hardware, software } from "@/content/uses";
import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";

export function Uses() {
  return (
    <SectionShell
      id="uses"
      index="008"
      total="011"
      kicker="Uses"
      title="Hardware, software, and opinions."
      rightMeta="Arch btw"
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-12 md:col-span-6">
          <div className="flex items-baseline justify-between mb-3">
            <span className="section-index">— Hardware</span>
            <span className="section-index">{hardware.length} items</span>
          </div>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="brutalist min-w-[520px] md:min-w-0">
            <tbody>
              {hardware.map((r, i) => (
                <Reveal
                  key={r.k}
                  as="tr"
                  dir="right"
                  delay={0.04 + i * 0.05}
                  duration={0.3}
                >
                  <th scope="row" className="w-40 text-[color:var(--color-paper)]">
                    {r.k}
                  </th>
                  <td className="text-[color:var(--color-paper-dim)]">{r.v}</td>
                </Reveal>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="flex items-baseline justify-between mb-3">
            <span className="section-index">— Software</span>
            <span className="section-index">{software.length} items</span>
          </div>
          <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
          <table className="brutalist min-w-[520px] md:min-w-0">
            <tbody>
              {software.map((r, i) => (
                <Reveal
                  key={r.k}
                  as="tr"
                  dir="right"
                  delay={0.08 + i * 0.05}
                  duration={0.3}
                >
                  <th scope="row" className="w-40 text-[color:var(--color-paper)]">
                    {r.k}
                  </th>
                  <td className="text-[color:var(--color-paper-dim)]">{r.v}</td>
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
