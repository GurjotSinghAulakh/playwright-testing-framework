import { test, expect } from "@repo/fixtures";

test("GET /posts/1 returns expected data", async ({ api }) => {
  const response = await api.get("/posts/1");

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.id).toBe(1);
  expect(data.userId).toBeTruthy();
});
