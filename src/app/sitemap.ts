import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { getPublishedPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl;
  const now = new Date();
  const posts = getPublishedPosts();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
