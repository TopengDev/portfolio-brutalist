"use client";

import { useEffect, useRef, useState } from "react";
import { now } from "@/content/now";
import { SectionShell } from "./SectionShell";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useOnScreen } from "@/lib/useOnScreen";

export function Now() {
  return (
    <SectionShell
      id="now"
      index="007"
      total="011"
      kicker="Now"
      title="What I am heads-down on."
      rightMeta={`Updated ${now.updated}`}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)] leading-[1.6] max-w-[28ch]">
            Stolen from Derek Sivers — a page with what I am actually working on this week and
            month. No archive, no vanity metrics. Just now.
          </p>
          <div className="mt-6 border-t border-[color:var(--color-line)] pt-4">
            <span className="section-index">— File</span>
            <div className="mt-2 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--color-paper)]">
              now.txt · {now.lines.join("\n").length} bytes
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9">
          <BootedTerminal />
        </div>
      </div>
    </SectionShell>
  );
}

type Phase = "idle" | "prompt-blink" | "prompt-typing" | "body-stream" | "done";

function BootedTerminal() {
  const ref = useRef<HTMLPreElement>(null);
  const onScreen = useOnScreen(ref, 0.9);
  const [phase, setPhase] = useState<Phase>("idle");
  const [promptTyped, setPromptTyped] = useState(0);
  const [bodyLines, setBodyLines] = useState(0);
  const [bodyCharInLine, setBodyCharInLine] = useState(0);
  const reduced = usePrefersReducedMotion();

  const promptText = "$ cat now.txt";

  useEffect(() => {
    if (reduced) {
      setPhase("done");
      setPromptTyped(promptText.length);
      setBodyLines(now.lines.length);
      return;
    }
    if (onScreen && phase === "idle") setPhase("prompt-blink");
  }, [phase, reduced, onScreen]);

  // phase driver
  useEffect(() => {
    if (phase === "prompt-blink") {
      const t = window.setTimeout(() => setPhase("prompt-typing"), 220);
      return () => clearTimeout(t);
    }
    if (phase === "prompt-typing") {
      let i = 0;
      const id = window.setInterval(() => {
        i++;
        setPromptTyped(i);
        if (i >= promptText.length) {
          clearInterval(id);
          window.setTimeout(() => setPhase("body-stream"), 120);
        }
      }, 22);
      return () => clearInterval(id);
    }
    if (phase === "body-stream") {
      let lineIdx = 0;
      let charIdx = 0;
      const tick = window.setInterval(() => {
        const line = now.lines[lineIdx] ?? "";
        if (charIdx < line.length) {
          charIdx++;
          setBodyCharInLine(charIdx);
        } else {
          lineIdx++;
          charIdx = 0;
          setBodyLines(lineIdx);
          setBodyCharInLine(0);
          if (lineIdx >= now.lines.length) {
            clearInterval(tick);
            setPhase("done");
          }
        }
      }, 6);
      return () => clearInterval(tick);
    }
  }, [phase]);

  const renderPrompt = promptText.slice(0, promptTyped);

  // build body text
  const bodyText = (() => {
    if (phase === "done" || reduced) return now.lines.join("\n");
    const completed = now.lines.slice(0, bodyLines).join("\n");
    const partial = now.lines[bodyLines] ?? "";
    const head = completed ? completed + "\n" : "";
    return head + partial.slice(0, bodyCharInLine);
  })();

  const showPromptCursor =
    phase === "prompt-blink" ||
    (phase === "prompt-typing" && promptTyped < promptText.length);
  const showBodyCursor = phase === "body-stream" || phase === "prompt-typing";

  return (
    <div className="relative">
      <div className="absolute -top-6 left-0 section-index">
        {renderPrompt}
        {showPromptCursor ? <span className="blink-cursor" /> : null}
      </div>
      <pre ref={ref} className="terminal">
        {bodyText}
        {showBodyCursor ? <span className="blink-cursor" /> : null}
      </pre>
    </div>
  );
}
