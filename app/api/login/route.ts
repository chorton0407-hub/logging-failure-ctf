import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent, logDebug } from "../../../lib/logger";

let failedAttempts = 0; // In-memory, resets when function cold starts

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  failedAttempts++;

  logSecurityEvent("Failed login attempt", {
    username,
    ip: req.headers.get("x-forwarded-for") || "unknown",
    failedAttempts,
  });

  // Intentionally no alert after many failures
  if (failedAttempts > 10) {
    logDebug("Brute-force likely, but no alert is sent.");
  }

  return NextResponse.json({
    success: false,
    message: "Invalid credentials. Access denied.",
  });
}