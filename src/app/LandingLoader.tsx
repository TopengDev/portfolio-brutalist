"use client";

import dynamic from "next/dynamic";

const Landing = dynamic(() => import("./Landing"), { ssr: false });

export default function LandingLoader() {
  return <Landing />;
}
