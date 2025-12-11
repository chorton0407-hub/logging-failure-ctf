import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent } from "../../../../lib/logger";

const FLAG = "FLAG{logging_and_alerting_failure}";
// Intentionally hard-coded, another bad practice

const MAGIC_SECRET = "server-restart-override-2025"; // Could be hinted at somewhere

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode");
  const debugOverride = req.headers.get("x-debug-override") || "0";
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  // In a real app, this should not exist, or should be strongly authenticated.
  if (mode === "emergency" && debugOverride === "1") {
    const body = await req.json().catch(() => ({}));
    const secret = body.secret;

    // Bad logging: only console, no central alert, no rate limit.
    logSecurityEvent("Maintenance override requested", {
      ip,
      mode,
      debugOverride,
      hasSecret: Boolean(secret),
    });

    if (secret === MAGIC_SECRET) {
      // The vulnerable path: returns the flag silently.
      return NextResponse.json({
        status: "ok",
        message: "Emergency override accepted.",
        flag: FLAG,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Invalid maintenance secret.",
      });
    }
  }

  return NextResponse.json(
    {
      status: "forbidden",
      message: "Maintenance endpoint restricted.",
    },
    { status: 403 }
  );
}