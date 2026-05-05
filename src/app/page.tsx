import LandingLoader from "./LandingLoader";
import { getAllPosts } from "@/lib/posts";

export default function Page() {
  const posts = getAllPosts();
  return <LandingLoader posts={posts} />;
}
