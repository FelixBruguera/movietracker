import { describe, test, expect, assert } from "vitest"

describe("the movies endpoint", () => {
  describe("with invalid requests", () => {
    test("it doesnt apply filters on unallowed fields", async () => {
      const response = await fetch(
        "http://localhost:3000/api/movies?awards.nominations_min=900&awards.nominations_max=100",
      )
      expect(response.status).toBe(200)
      const data = await response.json()
      expect(data[0].movies).toHaveLength(5)
    })
    test("it doesn't sort by unallowed fields", async () => {
      const response = await fetch(
        "http://localhost:3000/api/movies?sortBy=imdb.id&sortOrder=-1",
      )
      expect(response.status).toBe(404)
    })
  })
})
