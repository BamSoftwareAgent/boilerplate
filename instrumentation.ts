export async function register() {
  // Validate all required server env vars at boot so a misconfigured
  // deploy fails at startup rather than at runtime.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./lib/env.server");
  }
}
