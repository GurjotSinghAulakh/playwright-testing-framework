import { test, expect } from "@repo/fixtures";

test("homepage shows Example Domain heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Example Domain" })
  ).toBeVisible();
});
