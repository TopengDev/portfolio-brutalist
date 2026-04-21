"use client";

type Props = {
  items: string[];
  separator?: string;
};

/**
 * Pure CSS infinite marquee via translateX.
 * Duplicated content x2 to make the -50% loop seamless.
 * Linear timing. No easing.
 */
export function Marquee({ items, separator = "·" }: Props) {
  const unit = items.join(`   ${separator}   `);
  const line = `${unit}   ${separator}   `;
  return (
    <div
      className="relative w-full border-y border-[color:var(--color-line)] bg-[color:var(--color-ink)] overflow-hidden py-3 md:py-4"
      role="presentation"
      aria-hidden
    >
      <div className="marquee-track font-[family-name:var(--font-mono)] text-[11px] md:text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-paper)]">
        <span className="px-6">{line.repeat(3)}</span>
        <span className="px-6">{line.repeat(3)}</span>
      </div>
      {/* Edge fade is BANNED for brutalist — hard cut at borders only */}
    </div>
  );
}
