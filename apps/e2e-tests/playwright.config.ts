import { defineConfig } from "@playwright/test";

import { getEnv } from "@repo/config";

const env = getEnv();
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000
  },
  retries: isCI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: env.BASE_URL,
    trace: isCI ? "on-first-retry" : "off"
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" }
    }
  ]
});
