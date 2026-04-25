import { NextRequest, NextResponse } from "next/server";
import { getStats } from "@/lib/db";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");
  const statsPassword = process.env.STATS_PASSWORD;

  if (!statsPassword || password !== statsPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
