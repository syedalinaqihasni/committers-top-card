import { NextResponse } from "next/server";
import { getRanks } from "@/lib/rank";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const user = searchParams.get("user") || "";
  const country = searchParams.get("country") || "pakistan";

  const r = await getRanks(user, country);

  const svg = `
  <svg width="420" height="180" viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
    
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1f1f1f"/>
        <stop offset="100%" stop-color="#2a2a2a"/>
      </linearGradient>
    </defs>

    <rect width="420" height="180" rx="16" fill="url(#bg)" />

    <!-- Avatar -->
    <circle cx="60" cy="60" r="30" fill="#444"/>
    <image href="https://github.com/${user}.png" x="30" y="30" width="60" height="60" clip-path="circle(30px at 60 60)" />

    <!-- Username -->
    <text x="110" y="55" fill="white" font-size="20" font-family="Arial">
      ${user}
    </text>

    <text x="110" y="80" fill="#aaa" font-size="14">
      ${r.country}
    </text>

    <!-- Cards -->
    <text x="30" y="120" fill="white" font-size="14">All: #${r.allCount ?? "N/A"}</text>
    <text x="150" y="120" fill="white" font-size="14">Public: #${r.publicCount ?? "N/A"}</text>
    <text x="300" y="120" fill="white" font-size="14">Private: #${r.privateCount ?? "N/A"}</text>

    <!-- Footer -->
    <text x="30" y="160" fill="#777" font-size="12">
      Committers.top Badge
    </text>

  </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache",
    },
  });
}