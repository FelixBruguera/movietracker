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
  test.describe("diary", () => {
    test.describe.configure({ mode: "serial" })
    test.beforeEach(async ({ page }) => {
      await expect(page.getByText("testuser")).toBeVisible()
    })
    test("Adding a log", async ({ page }) => {
      await page.getByLabel("Add a new log").click()
      await page.getByRole("textbox").fill("Horsemen")
      await page.getByText("The Four Horsemen of the Apocalypse").click()
      await page.getByText("Save").click()
      await expect(page.getByText("Succesfully added")).toBeVisible()
    })
    test("Editing a log", async ({ page }) => {
      await page.getByAltText("The Four Horsemen of the Apocalypse").click()
      await page.getByLabel("Manage your logs").click()
      await page.locator("[type='date']").fill("2000-01-01")
      await page.getByRole("button", { name: "Save" }).click()
      await expect(page.getByText("Succesfully updated")).toBeVisible()
    })
    test("Deleting a log", async ({ page }) => {
      await page.getByAltText("The Four Horsemen of the Apocalypse").click()
      await page.getByLabel("Manage your logs").click()
      await page.getByLabel("Delete").click()
      await page.getByRole("button", { name: "Delete" }).click()
      await expect(page.getByText("Succesfully deleted")).toBeVisible()
      await expect(page.getByText("2000-01-01")).toHaveCount(0)
      await expect(page.getByText("No logs")).toBeVisible()
    })
  })
})
