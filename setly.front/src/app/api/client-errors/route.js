import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 48_000;
const MAX_STRING = 4_000;

function truncate(str, max) {
  if (typeof str !== "string") return null;
  if (str.length <= max) return str;
  return `${str.slice(0, max)}…`;
}

export async function POST(request) {
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false }, { status: 413 });
    }
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    if (payload !== null && typeof payload !== "object") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    console.error("[client-error-report]", {
      scope: truncate(String(payload?.scope ?? "unknown"), 120),
      message: truncate(String(payload?.message ?? "Unknown client error"), MAX_STRING),
      digest: truncate(payload?.digest != null ? String(payload.digest) : null, 128),
      path: truncate(payload?.path != null ? String(payload.path) : null, 512),
      timestamp: payload?.timestamp ?? null,
      userAgent: truncate(payload?.userAgent != null ? String(payload.userAgent) : null, 512),
      stack: truncate(payload?.stack != null ? String(payload.stack) : null, MAX_STRING),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
