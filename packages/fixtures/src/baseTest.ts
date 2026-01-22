import { test as base, expect, type APIRequestContext } from "@playwright/test";

import { getEnv } from "@repo/config";

type Fixtures = {
  baseUrl: string;
  apiBaseUrl: string;
  api: APIRequestContext;
};

const env = getEnv();

export const test = base.extend<Fixtures>({
  baseUrl: async ({}, use) => {
    await use(env.BASE_URL);
  },
  apiBaseUrl: async ({}, use) => {
    await use(env.API_BASE_URL);
  },
  api: async ({ request }, use) => {
    // request fixture already handles baseURL via playwright config
    // we just expose it as 'api' for convenience
    await use(request);
  }
});

export { expect };
