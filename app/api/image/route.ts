import { NextResponse } from "next/server";
import { getRanks } from "@/lib/rank";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const user = searchParams.get("user") || "guest";
  const country = searchParams.get("country") || "pakistan";

  const r = await getRanks(user, country);

  const svg = `
  <svg width="820" height="360" viewBox="0 0 820 360" xmlns="http://www.w3.org/2000/svg">
    
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0f0f0f"/>
        <stop offset="100%" stop-color="#2b2b2b"/>
      </linearGradient>

      <filter id="glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="820" height="360" rx="20" fill="url(#bg)" />

    <!-- Avatar -->
    <circle cx="80" cy="90" r="45" fill="#333" />
    <image 
      href="https://github.com/${user}.png" 
      x="35" y="45" width="90" height="90"
      clip-path="circle(45px at 80 90)"
    />

    <!-- Username -->
    <text x="150" y="80" fill="white" font-size="30" font-family="Arial" font-weight="bold">
      ${user}
    </text>

    <text x="150" y="110" fill="#aaa" font-size="18">
      ${r.country} • Committers Ranking
    </text>

    <!-- Cards -->
    <g filter="url(#glow)">
      <rect x="40" y="160" width="230" height="120" rx="14" fill="#1f1f1f"/>
      <rect x="295" y="160" width="230" height="120" rx="14" fill="#1f1f1f"/>
      <rect x="550" y="160" width="230" height="120" rx="14" fill="#1f1f1f"/>
    </g>

    <!-- All -->
    <text x="70" y="200" fill="#aaa" font-size="16">All Time</text>
    <text x="70" y="240" fill="white" font-size="34">
      #${r.allCount ?? "N/A"}
    </text>

    <!-- Public -->
    <text x="325" y="200" fill="#aaa" font-size="16">Public</text>
    <text x="325" y="240" fill="white" font-size="34">
      #${r.publicCount ?? "N/A"}
    </text>

    <!-- Private -->
    <text x="580" y="200" fill="#aaa" font-size="16">Private</text>
    <text x="580" y="240" fill="white" font-size="34">
      #${r.privateCount ?? "N/A"}
    </text>

    <!-- Footer -->
    <text x="40" y="330" fill="#666" font-size="14">
      Powered by committers.top
    </text>

  </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}