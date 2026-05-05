import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TopengDev — Christopher Indrawan",
    short_name: "TopengDev",
    description:
      "Multi-tenant SaaS, native shells, autonomous bots — all running on one VPS reliably & autonomously.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#FF4400",
    icons: [
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
