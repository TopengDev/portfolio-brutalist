"use client";

import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Now } from "@/components/Now";
import { Uses } from "@/components/Uses";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CursorDot } from "@/components/CursorDot";
import { GridOverlay } from "@/components/GridOverlay";

const MARQUEE_ITEMS = [
  "BUILDER",
  "SHIPS WHAT HE BUILDS",
  "NEXT.JS",
  "KOTLIN",
  "POSTGRES",
  "POS",
  "MULTI-TENANT",
  "CAPACITOR",
  "RAW TCP :9100",
  "#2DDCC7",
  "JAKARTA · ID",
  "HIRE THE BUILDER NOT THE DECK",
];

export default function Landing() {
  return (
    <main className="relative min-h-[100dvh] bg-[color:var(--color-ink)] text-[color:var(--color-paper)]">
      <CursorDot />
      <GridOverlay />
      <TopBar />
      <Hero />
      <Marquee items={MARQUEE_ITEMS} />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Services />
      <Now />
      <Uses />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
