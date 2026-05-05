import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { profile } from "@/content/profile";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const ogUrl = `/blog/${post.slug}/og`;
  const url = `/blog/${post.slug}`;
  const isoDate = post.date ? new Date(post.date).toISOString() : undefined;
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      siteName: "TopengDev",
      publishedTime: isoDate,
      modifiedTime: isoDate,
      authors: [profile.full],
      tags: post.tags,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogUrl],
      creator: "@topengdev",
    },
  };
}

function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const isoDate = post.date ? new Date(post.date).toISOString() : undefined;
  const url = `${profile.siteUrl}/blog/${post.slug}`;
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: isoDate,
    dateModified: isoDate,
    keywords: post.tags.join(", "),
    inLanguage: "en",
    url,
    image: [`${profile.siteUrl}/blog/${post.slug}/og`],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: profile.full,
      url: profile.siteUrl,
      sameAs: [profile.githubUrl, profile.linkedinUrl],
    },
    publisher: {
      "@type": "Person",
      name: profile.full,
      url: profile.siteUrl,
    },
  };

  return (
    <main className="relative min-h-[100dvh] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <div className="mx-auto max-w-[860px] px-6 md:px-10 py-16 md:py-24">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b border-[color:var(--color-line)] pb-6">
          <Link
            href="/blog"
            className="link font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper-dim)]"
          >
            ← ALL POSTS
          </Link>
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em] text-[color:var(--color-signal)]">
            {fmtDate(post.date)}
          </span>
        </div>

        <header className="mb-12">
          <h1
            className="font-[family-name:var(--font-display)] font-medium tracking-tight leading-[1.02] text-4xl md:text-6xl text-[color:var(--color-paper)]"
            style={{ textWrap: "balance" }}
          >
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="mt-6 font-[family-name:var(--font-mono)] text-[13px] md:text-[14px] text-[color:var(--color-paper-dim)] max-w-[64ch]">
              {post.excerpt}
            </p>
          ) : null}
          {post.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
              {post.tags.map((t) => (
                <span key={t} className="section-index">
                  #{t}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <article className="prose-brutalist">
          <MDXRemote source={post.body} />
        </article>

        <footer className="mt-16 border-t border-[color:var(--color-line)] pt-6">
          <Link
            href="/blog"
            className="link font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-paper-dim)]"
          >
            ← ALL POSTS
          </Link>
        </footer>
      </div>
    </main>
  );
}
