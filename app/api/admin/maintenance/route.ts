import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent } from "../../../../lib/logger";

export async function GET(req: NextRequest) {
  return NextResponse.json({
    status: "ok",
    message: "Maintenance API endpoint (CTF hint).",
    hint: "Try POST with ?mode=emergency, header X-Debug-Override: 1, and JSON { secret: '...' }",
  });
}
const FLAG = "FLAG{logging_and_alerting_failure}";
const MAGIC_SECRET = "server-restart-override-2025";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode");
  const debugOverride = req.headers.get("x-debug-override") || "0";
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (mode !== "emergency" || debugOverride !== "1") {
    logSecurityEvent("Unauthorized maintenance access", {
      ip,
      mode,
      debugOverride,
    });

    return NextResponse.json(
      {
        status: "forbidden",
        message: "Maintenance endpoint restricted.",
      },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({} as any));
  const secret = (body as any).secret;


  if (secret !== MAGIC_SECRET) {
    logSecurityEvent("Invalid maintenance secret provided", {
      ip,
      mode,
      debugOverride,

    });

    return NextResponse.json({
      status: "error",
      message: "Invalid maintenance secret.",
    });
  }


  return NextResponse.json({
    status: "ok",
    message: "Emergency override accepted.",
    flag: FLAG,
  });
}