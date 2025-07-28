import { describe, test, expect, assert, beforeAll } from "vitest"

describe("the lists endpoint", async () => {
  let cookie = null
  beforeAll(async () => {
    await fetch("http://localhost:3000/api/auth/sign-in/username", {
      method: "POST",
      body: JSON.stringify({ username: "testuser", password: "testuser" }),
      headers: { "Content-Type": "application/json" },
    }).then((response) => (cookie = response.headers.getSetCookie()))
  })
  describe("with invalid requests", () => {
    test("it only allows the creator of a list to delete it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/lists/6887585795c1bd3a57ef8b13",
        {
          method: "DELETE",
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
    test("it only allows the creator of a list to update it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/lists/6887585795c1bd3a57ef8b13",
        {
          method: "PATCH",
          body: JSON.stringify({
            name: "New name",
            description: "New description",
          }),
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
    test("it only allows the creator of a list to add movies to it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/lists/6887585795c1bd3a57ef8b13",
        {
          method: "POST",
          body: JSON.stringify({ movie_id: "685bd17544ae5742f06ad52b" }),
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
    test("it only allows the creator of a list to delete movies from it", async () => {
      const response = await fetch(
        "http://localhost:3000/api/lists/6887585795c1bd3a57ef8b13/685bd15944ae5742f06ad529",
        {
          method: "DELETE",
          headers: { Cookie: cookie, "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(404)
    })
  })
})
