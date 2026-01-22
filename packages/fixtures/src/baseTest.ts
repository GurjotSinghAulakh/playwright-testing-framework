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
  api: async ({ request, apiBaseUrl }, use) => {
    const apiContext = await request.newContext({ baseURL: apiBaseUrl });

    await use(apiContext);
    await apiContext.dispose();
  }
});

export { expect };
