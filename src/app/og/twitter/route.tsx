import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

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

export async function GET() {
  const monoBold = loadFont("JetBrainsMono-ExtraBold.ttf");
  const monoRegular = loadFont("JetBrainsMono-Regular.ttf");
  const monoMedium = loadFont("JetBrainsMono-Medium.ttf");

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
          padding: "72px 88px",
          position: "relative",
        }}
      >
        {/* 12-col dashed grid */}
        <div style={{ position: "absolute", inset: 0, display: "flex", paddingLeft: 88, paddingRight: 88 }}>
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} style={{ flex: 1, borderLeft: `1px dashed rgba(255,68,0,0.18)`, height: "100%" }} />
          ))}
        </div>

        {/* registration ticks */}
        {[
          { top: 36, left: 36 },
          { top: 36, right: 36 },
          { bottom: 36, left: 36 },
          { bottom: 36, right: 36 },
        ].map((pos, i) => (
          <div key={i} style={{ position: "absolute", ...pos, width: 16, height: 16, display: "flex" }}>
            <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", backgroundColor: PAPER_DIM, display: "flex" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, backgroundColor: PAPER_DIM, display: "flex" }} />
          </div>
        ))}

        {/* top meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 14,
            borderBottom: `1px solid ${LINE_STRONG}`,
            fontSize: 18,
            letterSpacing: 4,
            color: PAPER_DIM,
            fontFamily: "JBM-MED",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 12, height: 12, backgroundColor: SIGNAL, display: "flex" }} />
            <span>FILE / 01</span>
          </span>
          <span style={{ display: "flex" }}>JKT · UTC+7</span>
        </div>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 60, flexGrow: 1 }}>
          <span style={{ fontSize: 22, letterSpacing: 4, color: PAPER_DIM, fontFamily: "JBM-MED", marginBottom: 26, display: "flex" }}>
            — CHRISTOPHER INDRAWAN
          </span>
          <div
            style={{
              fontFamily: "JBM",
              fontSize: 188,
              lineHeight: 0.92,
              letterSpacing: -8,
              color: PAPER,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>TOPENG<span style={{ color: SIGNAL }}>/</span></span>
            <span style={{ display: "flex" }}>DEV.</span>
          </div>

          <div
            style={{
              marginTop: 56,
              fontSize: 36,
              lineHeight: 1.25,
              color: PAPER,
              fontFamily: "JBM-REG",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>Multi-tenant SaaS,</span>
            <span style={{ display: "flex" }}>native shells,</span>
            <span style={{ display: "flex" }}>autonomous bots —</span>
            <span style={{ display: "flex", color: SIGNAL, marginTop: 14 }}>
              one VPS. autonomous.
            </span>
          </div>
        </div>

        {/* bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 18,
            borderTop: `1px solid ${LINE_STRONG}`,
            fontSize: 18,
            letterSpacing: 4,
            color: PAPER_DIM,
            fontFamily: "JBM-MED",
          }}
        >
          <span style={{ display: "flex" }}>NEXT · KOTLIN · POSTGRES</span>
          <span style={{ color: SIGNAL, display: "flex" }}>OPEN TO WORK</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 1200,
      fonts: [
        { name: "JBM", data: monoBold, style: "normal", weight: 800 },
        { name: "JBM-MED", data: monoMedium, style: "normal", weight: 500 },
        { name: "JBM-REG", data: monoRegular, style: "normal", weight: 400 },
      ],
    },
  );
}
