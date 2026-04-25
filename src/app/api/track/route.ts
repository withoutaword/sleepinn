import { NextRequest, NextResponse } from "next/server";
import { recordPageView } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const userAgent = request.headers.get("user-agent") || "";
    await recordPageView(ip, path, userAgent);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
