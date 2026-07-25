export function reportActivity(event: "login" | "register") {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {
    // Best-effort only — never block the auth flow on this.
  });
}
