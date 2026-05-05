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
const LINE = "rgba(250,250,250,0.16)";

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
          padding: "48px 64px",
          position: "relative",
        }}
      >
        {/* 12-col dashed grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            paddingLeft: 64,
            paddingRight: 64,
          }}
        >
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderLeft: `1px dashed rgba(255,68,0,0.18)`,
                height: "100%",
              }}
            />
          ))}
        </div>

        {/* registration ticks */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 14,
              height: 14,
              display: "flex",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: "50%", width: 1, height: "100%", backgroundColor: PAPER_DIM, display: "flex" }} />
            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, backgroundColor: PAPER_DIM, display: "flex" }} />
          </div>
        ))}

        {/* top meta strip */}
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
            <span>FILE / 01 · TOPENG/DEV</span>
          </span>
          <span style={{ display: "flex" }}>JKT · UTC+7</span>
        </div>

        {/* title block */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36, flexGrow: 1 }}>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              color: PAPER_DIM,
              fontFamily: "JBM-MED",
              marginBottom: 18,
              display: "flex",
            }}
          >
            — CHRISTOPHER INDRAWAN
          </span>
          <div
            style={{
              fontFamily: "JBM",
              fontSize: 124,
              lineHeight: 1.0,
              letterSpacing: -4,
              color: PAPER,
              display: "flex",
            }}
          >
            TOPENG<span style={{ color: SIGNAL }}>/</span>DEV
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 30,
              lineHeight: 1.3,
              color: PAPER,
              fontFamily: "JBM-REG",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ display: "flex" }}>Multi-tenant SaaS, native shells, autonomous bots —</span>
            <span style={{ display: "flex", color: SIGNAL, marginTop: 6 }}>
              all running on one VPS, reliably &amp; autonomously.
            </span>
          </div>
        </div>

        {/* bottom strip */}
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
          <span style={{ display: "flex" }}>NEXT.JS · KOTLIN · POSTGRES · GO · RUST</span>
          <span style={{ color: SIGNAL, display: "flex" }}>OPEN TO WORK</span>
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
