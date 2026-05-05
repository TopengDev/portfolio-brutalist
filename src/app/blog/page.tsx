import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes from the workshop. Field reports on Pulse, Capacitor, native bridges, infrastructure, and the long tail of shipping software in production.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing — Christopher Indrawan",
    description: "Notes from the workshop.",
    url: "/blog",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "TopengDev — Writing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing — Christopher Indrawan",
    description: "Notes from the workshop.",
    images: ["/og-default.png"],
  },
};

function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const published = posts.filter((p) => !p.draft);
  const drafting = posts.filter((p) => p.draft);

  return (
    <main className="relative min-h-[100dvh] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b border-[color:var(--color-line)] pb-6">
          <Link
            href="/"
            className="link font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper-dim)]"
          >
            ← BACK TO INDEX
          </Link>
          <span className="section-index">
            {published.length} published · {drafting.length} drafting
          </span>
        </div>

        <header className="mb-16">
          <div className="section-index mb-3">— Writing</div>
          <h1
            className="font-[family-name:var(--font-display)] font-medium tracking-tight leading-[0.95] text-5xl md:text-7xl text-[color:var(--color-paper)]"
            style={{ textWrap: "balance" }}
          >
            Notes from the workshop.
          </h1>
        </header>

        {published.length === 0 ? (
          <p className="font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)]">
            No published posts yet.
          </p>
        ) : (
          <ol className="border-t border-b border-[color:var(--color-line)] divide-y divide-[color:var(--color-line)]">
            {published.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-8 group"
                >
                  <div className="col-span-12 md:col-span-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em] text-[color:var(--color-signal)]">
                    {fmtDate(p.date)}
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl leading-tight tracking-tight text-[color:var(--color-paper)] group-hover:text-[color:var(--color-signal)] transition-colors duration-150">
                      {p.title}
                    </h2>
                    <p className="mt-2 font-[family-name:var(--font-mono)] text-[12px] md:text-[13px] text-[color:var(--color-paper-dim)] max-w-[64ch]">
                      {p.excerpt}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:text-right">
                    {p.tags.length > 0 ? (
                      <span className="section-index">
                        {p.tags.map((t) => `#${t}`).join(" ")}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}

        {drafting.length > 0 ? (
          <section className="mt-16">
            <div className="section-index mb-4">— Drafts in progress</div>
            <ul className="border-t border-[color:var(--color-line)] divide-y divide-[color:var(--color-line)]">
              {drafting.map((p) => (
                <li
                  key={p.slug}
                  className="grid grid-cols-12 gap-4 md:gap-8 py-5 cursor-default"
                >
                  <div className="col-span-12 md:col-span-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em] text-[color:var(--color-paper-dim)]">
                    DRAFT
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl leading-tight tracking-tight text-[color:var(--color-paper-dim)]">
                      {p.title}
                    </h3>
                    <p className="mt-1 font-[family-name:var(--font-mono)] text-[12px] text-[color:var(--color-paper-dim)]">
                      {p.excerpt}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
