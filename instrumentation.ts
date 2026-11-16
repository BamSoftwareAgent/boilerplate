export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV === "production") {
    await import("./lib/env.server");
  } else {
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
