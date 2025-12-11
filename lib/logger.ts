export function logSecurityEvent(message: string, details?: any) {
  console.log("[SECURITY EVENT]", message, details ?? "");
}
export function logDebug(message: string, details?: any) {
  console.log("[DEBUG]", message, details ?? "");
}