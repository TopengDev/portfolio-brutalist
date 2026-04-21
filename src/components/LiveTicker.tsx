"use client";

import { useEffect, useState } from "react";

function fmt(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(
    d.getUTCHours(),
  )}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`;
}

export function LiveTicker() {
  const [t, setT] = useState("—");
  useEffect(() => {
    setT(fmt(new Date()));
    const id = setInterval(() => setT(fmt(new Date())), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-[family-name:var(--font-mono)] text-[11px] tabular-nums text-[color:var(--color-paper-dim)]">
      {t}
    </span>
  );
}
