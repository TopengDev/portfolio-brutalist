"use client";

import { useEffect, useState } from "react";

export function GridOverlay() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const t = e.target as HTMLElement | null;
        if (t && /(input|textarea|select)/i.test(t.tagName)) return;
        setOn((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!on) return null;
  return (
    <div className="grid-overlay" aria-hidden>
      {Array.from({ length: 13 }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
