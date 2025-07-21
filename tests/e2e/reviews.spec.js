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
  test.describe("reviews", () => {
    test.describe.configure({ mode: "serial" })
    test.beforeEach(async ({ page }) => {
      await expect(page.getByText("testuser")).toBeVisible()
    })
    test("Creating a review", async ({ page }) => {
      await page.getByAltText("Foolish Wives").click()
      await page.getByRole("textbox").fill("Great movie")
      await page.getByRole("combobox", { name: "Your Rating" }).click()
      await page.getByLabel("9").click()
      await page.getByText("Save").click()
      await expect(page.getByText("Succesfully added")).toBeVisible()
      await expect(page.getByText("Your review")).toBeVisible()
    })
    test("Editing a review", async ({ page }) => {
      await page.getByAltText("Foolish Wives").click()
      await page.getByLabel("Edit your review").click()
      await page.getByRole("textbox").fill("Not that great")
      await page.getByRole("combobox", { name: "Your Rating" }).click()
      await page.getByLabel("2").click()
      await page.getByText("Save").click()
      await expect(page.getByText("Succesfully added")).toBeVisible()
      await expect(page.getByText("Your review")).toBeVisible()
      await expect(page.getByText("Not that great")).toHaveCount(2)
    })
    test("Deleting a review", async ({ page }) => {
      await page.getByAltText("Foolish Wives").click()
      await page.getByLabel("Delete your review").click()
      await page.getByText("Delete").click()
      await expect(page.getByText("Succesfully deleted")).toBeVisible()
      await expect(page.getByText("Your review")).toHaveCount(0)
      await expect(page.getByText("Not that great")).toHaveCount(0)
    })
  })
})
