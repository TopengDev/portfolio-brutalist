import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { getPostBySlug } from "@/lib/posts";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const revalidate = false;

const INK = "#000000";
const PAPER = "#FAFAFA";
const PAPER_DIM = "#A8A8A8";
const SIGNAL = "#FF4400";
const LINE_STRONG = "rgba(250,250,250,0.35)";

function loadFont(file: string) {
  return fs.readFileSync(path.join(process.cwd(), "public", "fonts", file));
}

function fmtDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/posts");
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const monoBold = loadFont("JetBrainsMono-ExtraBold.ttf");
  const monoRegular = loadFont("JetBrainsMono-Regular.ttf");
  const monoMedium = loadFont("JetBrainsMono-Medium.ttf");

  const title = post?.title ?? slug.replace(/-/g, " ");
  const excerpt = post?.excerpt ?? "";
  const date = post ? fmtDate(post.date) : "";
  const tags = post?.tags ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: INK,
          color: PAPER,
          fontFamily: "JBM",
          padding: "48px 64px",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", paddingLeft: 64, paddingRight: 64 }}>
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} style={{ flex: 1, borderLeft: `1px dashed rgba(255,68,0,0.18)`, height: "100%" }} />
          ))}
        </div>

        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", ...pos, width: 14, height: 14, display: "flex" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", backgroundColor: PAPER_DIM, display: "flex" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, backgroundColor: PAPER_DIM, display: "flex" }} />
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 12,
            borderBottom: `1px solid ${LINE_STRONG}`,
            fontSize: 16,
            letterSpacing: 4,
            color: PAPER_DIM,
            fontFamily: "JBM-MED",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 10, height: 10, backgroundColor: SIGNAL, display: "flex" }} />
            <span>NOTES / WORKSHOP · TOPENG/DEV</span>
          </span>
          <span style={{ display: "flex" }}>{date || "—"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 28, flexGrow: 1 }}>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              color: PAPER_DIM,
              fontFamily: "JBM-MED",
              marginBottom: 14,
              display: "flex",
            }}
          >
            — CHRISTOPHER INDRAWAN
          </span>
          <div
            style={{
              fontFamily: "JBM",
              fontSize: title.length > 50 ? 60 : title.length > 30 ? 76 : 92,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: PAPER,
              display: "flex",
              maxWidth: 1060,
            }}
          >
            {title}
          </div>

          {excerpt ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 24,
                lineHeight: 1.35,
                color: PAPER_DIM,
                fontFamily: "JBM-REG",
                display: "flex",
                maxWidth: 1060,
              }}
            >
              {excerpt}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 16,
            borderTop: `1px solid ${LINE_STRONG}`,
            fontSize: 16,
            letterSpacing: 4,
            color: PAPER_DIM,
            fontFamily: "JBM-MED",
          }}
        >
          <span style={{ display: "flex" }}>
            {tags.length ? `#${tags.slice(0, 3).join(" · #")}` : "TOPENGDEV.COM/BLOG"}
          </span>
          <span style={{ color: SIGNAL, display: "flex" }}>READ ON →</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "JBM", data: monoBold, style: "normal", weight: 800 },
        { name: "JBM-MED", data: monoMedium, style: "normal", weight: 500 },
        { name: "JBM-REG", data: monoRegular, style: "normal", weight: 400 },
      ],
    },
  );
}
