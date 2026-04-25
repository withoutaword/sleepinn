import { NextRequest, NextResponse } from "next/server";
import { recordClick } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { buttonType } = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    await recordClick(buttonType, ip);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
