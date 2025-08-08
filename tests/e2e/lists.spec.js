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
  test.describe("lists", () => {
    test.describe.configure({ mode: "serial" })
    test.beforeEach(async ({ page }) => {
      await expect(page.getByText("testuser")).toBeVisible()
    })
    test("Private lists are only visible to the creator", async ({ page }) => {
      await page.getByText("Lists").click()
      await expect(page.getByText("Seeded List")).not.toBeVisible()
    })
    test("The buttons for list options are not visible in another user's list", async ({
      page,
    }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Public List" }).click()
      await expect(page.getByLabel("Delete")).not.toBeVisible()
      await expect(page.getByLabel("Update your list")).not.toBeVisible()
      await expect(page.getByLabel("Add a movie")).not.toBeVisible()
      await page
        .getByAltText("The Four Horsemen of the Apocalypse")
        .click({ button: "right" })
      await expect(page.getByText("Remove")).not.toBeVisible()
    })
    test("Following a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Public List" }).click()
      await page.getByLabel("Follow list").click()
      await expect(page.getByText("Succesfully followed")).toBeVisible()
      await expect(page.getByLabel("Followers")).toHaveText("1")
    })
    test("Unfollowing a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Public List" }).click()
      await page.getByLabel("Unfollow list").click()
      await expect(page.getByText("Succesfully unfollowed")).toBeVisible()
      await expect(page.getByLabel("Followers")).toHaveText("0")
    })
    test("Creating a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByLabel("Create a new list").click()
      await page.getByLabel("Name").fill("Test list")
      await page.getByLabel("Description").fill("Just a test list")
      await page.getByText("Save").click()
      await expect(page.getByText("Succesfully Added")).toBeVisible()
      await expect(page.getByRole("link", { name: "Test List" })).toBeVisible()
    })
    test("Editing a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Test List" }).click()
      await page.getByLabel("Update your list").click()
      await page.getByLabel("Name").fill("Deleting soon")
      await page.getByText("Save").click()
      await expect(page.getByText("Succesfully Updated")).toBeVisible()
      await expect(
        page.getByRole("heading", { name: "Deleting soon", exact: "true" }),
      ).toBeVisible()
    })
    test("Adding a movie to a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Deleting soon" }).click()
      await page.getByLabel("Add a movie").click()
      await page.getByRole("textbox", { name: "Movie" }).fill("Foolish")
      await page.getByText("Foolish wives").click()
      await page.getByRole("button", { name: "Add", exact: true }).click()
      await expect(page.getByText("Succesfully Added")).toBeVisible()
      await expect(page.getByAltText("Foolish Wives")).toBeVisible()
      await expect(page.getByLabel("Total Movies")).toHaveText("1")
    })
    test("Adding a duplicated movie returns the correct error", async ({
      page,
    }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Deleting soon" }).click()
      await page.getByLabel("Add a movie").click()
      await page.getByRole("textbox", { name: "Movie" }).fill("Foolish")
      await page.getByText("Foolish wives").click()
      await page.getByRole("button", { name: "Add", exact: true }).click()
      await expect(page.getByText("Duplicated movie")).toBeVisible()
      await expect(page.getByLabel("Total Movies")).toHaveText("1")
    })
    test("Removing a movie from a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Deleting soon" }).click()
      await page.getByAltText("Foolish wives").click({ button: "right" })
      await page.getByText("Remove").click()
      await page.getByText("Delete").click()
      await expect(page.getByText("Succesfully Removed")).toBeVisible()
      await expect(page.getByAltText("Foolish Wives")).not.toBeVisible()
      await expect(page.getByLabel("Total Movies")).not.toBeVisible()
    })
    test("Deleting a list", async ({ page }) => {
      await page.getByText("Lists").click()
      await page.getByRole("link", { name: "Deleting soon" }).click()
      await page.getByLabel("Delete").click()
      await page.getByRole("button", { name: "Delete" }).click()
      await expect(page.getByText("Succesfully Deleted")).toBeVisible()
      await expect(
        page.getByRole("link", { name: "Deleting soon" }),
      ).not.toBeVisible()
    })
  })
})
test.describe("As a visitor", () => {
  test("The buttons for list options are not visible", async ({ page }) => {
    await page.goto("/")
    await page.getByText("Lists").click()
    await page.getByRole("link", { name: "Public List" }).click()
    await expect(page.getByLabel("Delete")).not.toBeVisible()
    await expect(page.getByLabel("Update your list")).not.toBeVisible()
    await expect(page.getByLabel("Add a movie")).not.toBeVisible()
    await expect(page.getByLabel("Follow List")).not.toBeVisible()
    await page
      .getByAltText("The Four Horsemen of the Apocalypse")
      .click({ button: "right" })
    await expect(page.getByText("Remove")).not.toBeVisible()
  })
})
