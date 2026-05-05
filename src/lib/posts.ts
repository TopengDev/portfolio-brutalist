import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export type Post = PostMeta & {
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    body: content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  return files
    .map((f) => {
      const { body: _body, ...meta } = readPostFile(f);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const c of candidates) {
    const p = path.join(POSTS_DIR, c);
    if (fs.existsSync(p)) return readPostFile(c);
  }
  return null;
}

export function getPublishedPosts(): PostMeta[] {
  return getAllPosts().filter((p) => !p.draft);
}

export function getDraftPosts(): PostMeta[] {
  return getAllPosts().filter((p) => p.draft);
}
