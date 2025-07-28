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
      expect(response.status).toBe(400)
    })
    test("it only allows strings in the text field", async () => {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        body: JSON.stringify({ text: { $in: [""] }, rating: "5" }),
        headers: { Cookie: cookie, "Content-Type": "application/json" },
      })
      expect(response.status).toBe(400)
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
    })
  })
})
