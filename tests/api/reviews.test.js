import { describe, test, expect, assert, beforeAll } from "vitest"

describe("the reviews endpoint", async () => {
  let cookie = null
  beforeAll(async () => {
    await fetch("http://localhost:3000/api/auth/sign-in/username", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password: "testuser" }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => (cookie = response.headers.getSetCookie()))
  })
  describe("with invalid requests", () => {
    test("it only allows valid ratings", async () => {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        body: JSON.stringify({ text: "testing", rating: "15" }),
        headers: { Cookie: cookie, "Content-Type": "application/json" },
      })
      expect(response.status).toBe(500)
    })
    test("it only allows strings in the text field", async () => {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        body: JSON.stringify({ text: { $in: [""] }, rating: "5" }),
        headers: { Cookie: cookie, "Content-Type": "application/json" },
      })
      expect(response.status).toBe(500)
    })
    test("it only allows the creator of a review to delete it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/reviews/5a9427648b0beebeb6957a21",
        {
          method: "DELETE",
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
      const userAfter = await fetch(
        "http://localhost:3000/api/users/59b99dc7cfa9a34dcd7885dd/reviews",
      ).then((data) => data.json())
      expect(userAfter[0].info.totalReviews).toEqual(1)
      expect(userAfter[0].reviews).toHaveLength(1)
    })
    test("it only allows the creator of a review to update it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/reviews/5a9427648b0beebeb6957a21",
        {
          method: "PATCH",
          body: JSON.stringify({ text: "testing", rating: "5" }),
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
  })
})
