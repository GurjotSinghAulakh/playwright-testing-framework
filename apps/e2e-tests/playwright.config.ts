import { defineConfig } from "@playwright/test";

import { getEnv } from "@repo/config";

const env = getEnv();

export default defineConfig({
  testDir: "./tests",
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: env.BASE_URL
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" }
    }
  ]
});
