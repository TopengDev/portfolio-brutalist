"use client";

import dynamic from "next/dynamic";
import type { PostMeta } from "@/lib/posts";

const Landing = dynamic(() => import("./Landing"), { ssr: false });

export default function LandingLoader({ posts }: { posts: PostMeta[] }) {
  return <Landing posts={posts} />;
}
