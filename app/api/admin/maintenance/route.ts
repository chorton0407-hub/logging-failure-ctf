import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent } from "../../../../lib/logger";

const FLAG = "FLAG{logging_and_alerting_failure}";
const MAGIC_SECRET = "server-restart-override-2025";

export async function GET() {

  return NextResponse.json({
    status: "ok",
    message:
      "Maintenance API endpoint. This is not a normal user page. Try POST with special parameters.",
    hint: "mode=emergency, X-Debug-Override header, and a 'secret' field may be interesting...",
  });
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode");
  const debugOverride = req.headers.get("x-debug-override") || "0";
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (mode === "emergency" && debugOverride === "1") {
    const body = await req.json().catch(() => ({}));
    const secret = (body as any).secret;

    logSecurityEvent("Maintenance override requested", {
      ip,
      mode,
      debugOverride,
      hasSecret: Boolean(secret),
    });

    if (secret === MAGIC_SECRET) {
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