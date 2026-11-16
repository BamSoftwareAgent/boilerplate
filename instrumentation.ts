export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  if (process.env.NODE_ENV === "production") {
    // In production, missing env vars must fail fast at boot.
    await import("./lib/env.server");
  } else {
    // In development, warn so the server still starts without a .env.local.
    try {
      await import("./lib/env.server");
    } catch (err) {
      console.warn(
        "\n⚠  Missing environment variables — copy .env.example to .env.local and fill in your values.\n",
        err instanceof Error ? err.message : err,
        "\n",
      );
    }
  }
}
