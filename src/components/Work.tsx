"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { projects, type Project } from "@/content/projects";
import { SectionShell } from "./SectionShell";
import { PinnedPulse } from "./PinnedPulse";
import { useOnScreen } from "@/lib/useOnScreen";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// exclude Pulse (001) from the table — it gets the pinned scrollytelling treatment
const tableProjects = projects.filter((p) => p.index !== "001");

export function Work() {
  return (
    <>
      <PinnedPulse />

      <SectionShell
        id="work"
        index="003"
        total="011"
        kicker="Selected work · cont'd"
        title="Everything else I built and shipped."
        rightMeta={`${projects.length} projects indexed · 001 pinned above`}
      >
        {/* Table of contents */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 border-t border-b border-[color:var(--color-line)]">
          <div className="col-span-12 md:col-span-3 py-3 px-2 border-r border-[color:var(--color-line)]">
            <span className="section-index">— Index</span>
          </div>
          <div className="col-span-12 md:col-span-9 py-3">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em]">
              {projects.map((p) => (
                <li key={p.index}>
                  <a href={`#p-${p.index}`} className="link">
                    <span className="text-[color:var(--color-signal)]">{p.index}</span>
                    <span className="mx-2">·</span>
                    {p.title}
                    {p.index === "001" ? (
                      <span className="ml-2 text-[color:var(--color-paper-dim)]">[pinned]</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project rows — stagger + wipe via useOnScreen (reliable on Android + Playwright) */}
        <div>
          {tableProjects.map((p, i) => (
            <ProjectRow key={p.index} project={p} staggerIndex={i} />
          ))}
        </div>
      </SectionShell>
    </>
  );
}

function ProjectRow({ project, staggerIndex }: { project: Project; staggerIndex: number }) {
  const ref = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(ref, 0.92);
  const reduced = usePrefersReducedMotion();
  const active = reduced || onScreen;

  const delay = staggerIndex * 0.06;

  return (
    <motion.article
      ref={ref}
      id={`p-${project.index}`}
      className="grid grid-cols-12 gap-4 md:gap-8 border-b border-[color:var(--color-line)] py-10 md:py-14 group"
      initial={false}
      animate={{
        x: active ? 0 : "-4%",
        clipPath: active ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
      }}
      transition={{ duration: reduced ? 0 : 0.36, ease: "linear", delay: reduced ? 0 : delay }}
    >
      <div className="col-span-12 md:col-span-2">
        <div className="font-[family-name:var(--font-display)] text-6xl md:text-7xl font-semibold tracking-tight text-[color:var(--color-paper)] group-hover:text-[color:var(--color-signal)] transition-colors duration-150">
          {project.index}
        </div>
        <div className="mt-2 section-index">[{project.status.toUpperCase()}]</div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] text-[color:var(--color-paper)]">
          {project.title}
        </h3>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[13px] text-[color:var(--color-paper)] max-w-[56ch]">
          {project.summary}
        </p>
        <motion.ul
          className="mt-4 space-y-1.5"
          initial={false}
          animate={{
            clipPath: active ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          }}
          transition={{
            duration: reduced ? 0 : 0.32,
            ease: "linear",
            delay: reduced ? 0 : delay + 0.18,
          }}
        >
          {project.bullets.map((b) => (
            <li
              key={b}
              className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)] pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-[color:var(--color-signal)]"
            >
              {b}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="col-span-12 md:col-span-4 overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
        <table className="brutalist min-w-[480px] md:min-w-0">
          <tbody>
            <tr>
              <th scope="row">Year</th>
              <td>{project.year}</td>
            </tr>
            <tr>
              <th scope="row">Role</th>
              <td>{project.role}</td>
            </tr>
            <tr>
              <th scope="row">Stack</th>
              <td>
                <div className="flex flex-wrap gap-y-1">
                  {project.stack.map((s, i) => (
                    <span key={s}>
                      {i > 0 && (
                        <span className="mx-2 text-[color:var(--color-line-strong)]">·</span>
                      )}
                      {s}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">Link</th>
              <td>
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-accent"
                  >
                    {project.url.replace(/^https?:\/\//, "")}
                    <span className="ml-2 text-[color:var(--color-signal)]">↗</span>
                  </a>
                ) : (
                  <span className="text-[color:var(--color-paper-dim)]">—</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.article>
  );
}
