import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();

    console.error("[client-error-report]", {
      scope: payload?.scope ?? "unknown",
      message: payload?.message ?? "Unknown client error",
      digest: payload?.digest ?? null,
      path: payload?.path ?? null,
      timestamp: payload?.timestamp ?? null,
      userAgent: payload?.userAgent ?? null,
      stack: payload?.stack ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
