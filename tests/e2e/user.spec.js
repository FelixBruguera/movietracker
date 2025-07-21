import { test, expect } from "@playwright/test"

test.describe("as a logged in user", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/users/login")
    const existingSession = await page
      .getByText("Already signed in")
      .isVisible()
    if (!existingSession) {
      await page.getByLabel("Username").fill("testuser")
      await page.getByLabel("Password").fill("testuser")
      await page.getByText("Send").click()
    }
  })
  test("The header shows the username", async ({ page }) => {
    await expect(page.getByText("testuser")).toBeVisible()
  })
})
