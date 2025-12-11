export type LogLevel = "debug" | "info" | "warn" | "error" | "security";

type LogEvent = {
  level: LogLevel;
  message: string;
  details?: any;
  timestamp: string;
};


const events: LogEvent[] = [];

const alerts: LogEvent[] = [];

function pushEvent(event: LogEvent) {
  events.push(event);
  if (events.length > 100) events.shift();
}

// Public functions

export function logSecurityEvent(
  message: string,
  details?: any,
  options?: { alert?: boolean }
) {
  const event: LogEvent = {
    level: "security",
    message,
    details,
    timestamp: new Date().toISOString(),
  };

  console.log("[SECURITY EVENT]", message, details ?? "");
  pushEvent(event);


  if (options?.alert) {
    alerts.push(event);
    if (alerts.length > 100) alerts.shift();
    console.log("[SECURITY ALERT]", message);
  }
}

export function logDebug(message: string, details?: any) {
  const event: LogEvent = {
    level: "debug",
    message,
    details,
    timestamp: new Date().toISOString(),
  };
  console.log("[DEBUG]", message, details ?? "");
  pushEvent(event);
}

export function getRecentEvents() {
  return events;
}

export function getAlerts() {
  return alerts;
}