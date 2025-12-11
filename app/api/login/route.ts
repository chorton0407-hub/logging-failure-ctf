import { NextRequest, NextResponse } from "next/server";
import { logSecurityEvent, logDebug } from "../../../lib/logger";

let failedAttempts = 0;

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

  if (failedAttempts > 10) {
    logSecurityEvent(
      "Possible brute-force login attack detected",
      {
        username,
        ip: req.headers.get("x-forwarded-for") || "unknown",
        failedAttempts,
      },
      { alert: true }
    );
    logDebug("Brute-force likely, but manual follow-up is required.");
  }

  return NextResponse.json({
    success: false,
    message: "Invalid credentials. Access denied.",
  });
}