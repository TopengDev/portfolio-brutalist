"use client";

import Link from "next/link";
import { SectionShell } from "./SectionShell";
import { Reveal } from "./Reveal";
import type { PostMeta } from "@/lib/posts";

function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export function Writing({ posts }: { posts: PostMeta[] }) {
  const published = posts.filter((p) => !p.draft);
  const drafting = posts.filter((p) => p.draft);

  const title = published.length
    ? "Notes from the workshop."
    : "Nothing published yet. Here are the drafts.";

  return (
    <SectionShell
      id="writing"
      index="009"
      total="011"
      kicker="Writing"
      title={title}
      rightMeta={`${published.length} published · ${drafting.length} drafting`}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-8">
        <Reveal as="div" dir="right" delay={0.04} className="col-span-12 md:col-span-3">
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)] leading-[1.6] max-w-[28ch]">
            Writing is on the schedule. Shipping always wins. When a post goes up it lives here.
          </p>
        </Reveal>
        <ol className="col-span-12 md:col-span-9 divide-y divide-[color:var(--color-line)] border-t border-b border-[color:var(--color-line)]">
          {posts.length === 0 ? (
            <li className="py-5 font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)]">
              No posts yet.
            </li>
          ) : (
            posts.map((p, i) => (
              <PostRow key={p.slug} post={p} index={i} />
            ))
          )}
        </ol>
        {published.length > 0 ? (
          <div className="col-span-12 md:col-start-4 md:col-span-9 mt-2">
            <Link
              href="/blog"
              className="link font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-signal)]"
            >
              VIEW ALL POSTS →
            </Link>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

function PostRow({ post, index }: { post: PostMeta; index: number }) {
  const idx = `${post.draft ? "DRAFT" : "POST"}.${String(index + 1).padStart(2, "0")}`;
  const status = post.draft ? "drafting" : fmtDate(post.date);

  const inner = (
    <>
      <div className="col-span-12 md:col-span-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em] text-[color:var(--color-signal)]">
        {idx}
      </div>
      <div className="col-span-12 md:col-span-7" data-hover>
        <h3
          className={`font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight tracking-tight ${
            post.draft
              ? "text-[color:var(--color-paper-dim)]"
              : "text-[color:var(--color-paper)] group-hover:text-[color:var(--color-signal)]"
          } transition-colors duration-150`}
        >
          {post.title}
        </h3>
        <p className="mt-1 font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)]">
          {post.excerpt}
        </p>
      </div>
      <div className="col-span-12 md:col-span-3 md:text-right">
        <span className="section-index">[{status}]</span>
      </div>
    </>
  );

  const className =
    "grid grid-cols-12 gap-3 md:gap-6 py-5 group " +
    (post.draft ? "cursor-default" : "");

  if (post.draft) {
    return (
      <Reveal as="li" dir="right" delay={0.08 + index * 0.09} duration={0.38} className={className}>
        {inner}
      </Reveal>
    );
  }

  return (
    <Reveal as="li" dir="right" delay={0.08 + index * 0.09} duration={0.38} className={className}>
      <Link href={`/blog/${post.slug}`} className="contents">
        {inner}
      </Link>
    </Reveal>
  );
}
