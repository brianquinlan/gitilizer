import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Most tests start their own PGlite database, which takes a second or two when several test files run at
    // once on a small CI runner; the default 5 s then fails tests that are merely waiting their turn.
    testTimeout: 20_000,
  },
});
