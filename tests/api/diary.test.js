import { describe, test, expect, assert, beforeAll } from "vitest"

describe("the diary endpoint", async () => {
  let cookie = null
  beforeAll(async () => {
    await fetch("http://localhost:3000/api/auth/sign-in/username", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password: "testuser" }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => (cookie = response.headers.getSetCookie()))
  })
  describe("with invalid requests", () => {
    test("it only allows the creator of a log to delete it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/diary/6880fa0f3701d7937a3df5dc",
        {
          method: "DELETE",
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
    test("it only allows the creator of a log to update it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/diary/6880fa0f3701d7937a3df5dc",
        {
          method: "PATCH",
          body: JSON.stringify({ date: "1970-01-01" }),
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
  })
})
