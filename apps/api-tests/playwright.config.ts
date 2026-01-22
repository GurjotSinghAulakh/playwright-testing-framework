import { defineConfig } from "@playwright/test";

import { getEnv } from "@repo/config";

const env = getEnv();

export default defineConfig({
  testDir: "./tests",
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: env.API_BASE_URL
  }
});
