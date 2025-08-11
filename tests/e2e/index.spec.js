import { test, expect } from "@playwright/test"

test.describe("the index route", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })
  test.describe("sorting", () => {
    test("sorting by release year", async ({ page }) => {
      await page.getByText("IMDB Rating").click()
      await page.getByText("Release Year").click()
      const posters = page.getByRole("img")
      await expect(posters.first()).toHaveAttribute("alt", "The Ace of Hearts")
    })
    test("changing the sort order", async ({ page }) => {
      await page.getByTitle("Descending Order").click()
      const posters = page.getByRole("img")
      await expect(posters.first()).toHaveAttribute(
        "alt",
        "In the Land of the Head Hunters",
      )
    })
  })
  test.describe("filtering", () => {
    test("by genre", async ({ page }) => {
      await page.getByText("Crime").click()
      const posters = page.getByRole("img")
      await expect(posters).toHaveCount(1)
      await expect(posters.first()).toHaveAttribute("alt", "The Ace of Hearts")
    })
    test("by language", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.getByTitle("Language").click()
      await page.getByLabel("English").click()
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(2)
      await expect(page.getByAltText("Foolish Wives")).toBeVisible()
      await expect(
        page.getByAltText("In the Land of the Head Hunters"),
      ).toBeVisible()
    })
    test("by date", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[value="1896"]').fill("1924")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(1)
      await expect(page.getByAltText("The Ace of Hearts")).toBeVisible()
    })
    test("by rating", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="imdb.rating_min"]').fill("7")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(3)
      await expect(page.getByAltText("Foolish Wives")).toBeVisible()
      await expect(page.getByAltText("The Ace of Hearts")).toBeVisible()
      await expect(
        page.getByAltText("The Four Horsemen of the Apocalypse"),
      ).toBeVisible()
    })
    test("by runtime", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="runtime_min"]').fill("100")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(2)
      await expect(page.getByAltText("Foolish Wives")).toBeVisible()
      await expect(
        page.getByAltText("The Four Horsemen of the Apocalypse"),
      ).toBeVisible()
    })
    test("with a search query", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="search"]').fill("wives")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(1)
      await expect(page.getByAltText("Foolish Wives")).toBeVisible()
    })
    test("with an actor query", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="cast"]').fill("Pomeroy Cannon")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(1)
      await expect(
        page.getByAltText("The Four Horsemen of the Apocalypse"),
      ).toBeVisible()
    })
    test("with a director query", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="directors"]').fill("Curtis")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(1)
      await expect(
        page.getByAltText("In the Land of the Head Hunters"),
      ).toBeVisible()
    })
    test("combining multiple fields", async ({ page }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="directors"]').fill("Bryant")
      await page.locator('input[name="cast"]').fill("Mitchell Lewis")
      await page.locator('input[name="released_min"]').fill("1923")
      await page.locator('input[name="released_max"]').fill("1924")
      await page.locator('input[name="imdb.rating_min"]').fill("6")
      await page.locator('input[name="imdb.rating_max"]').fill("7")
      await page.getByText("Submit").click()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).toHaveCount(1)
      await expect(page.getByAltText("Salomè")).toBeVisible()
    })
    test("displays the correct messages for empty responses", async ({
      page,
    }) => {
      await page.getByText("Filters").click()
      await page.locator('input[name="released_min"]').fill("2016")
      await page.getByText("Submit").click()
      await expect(page.getByText("No Results found")).toBeVisible()
      const posters = page.getByRole("listitem").getByRole("img")
      await expect(posters).not.toBeVisible()
    })
  })
})
