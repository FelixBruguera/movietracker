import { describe, test, expect } from "vitest"

describe("the create endpoint", () => {
  describe("with invalid inputs", () => {
    test("returns 400 and the correct message when a field is missing", async () => {
      const newUser = { username: "Test", password: "Testing" }
      const response = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      })
      console.log(response)
      expect(response.status).toBe(400)
      expect(await response.json()).toBe(
        "Name, Username and Password are required.",
      )
    })
    test("returns 400 and the correct message when the password is too short", async () => {
      const newUser = { username: "Test", name: "Tester", password: "t" }
      const response = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      })
      expect(response.status).toBe(400)
      expect(await response.json()).toBe(
        "Password is shorter than the minimum allowed length (3)",
      )
    })
    test("returns 500 when the username already exists", async () => {
      const newUser = {
        username: "jaqen",
        name: "Duplicated",
        password: "test",
      }
      const response = await fetch("http://localhost:3000/api/users/create", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      })
      expect(response.status).toBe(500)
    })
  })
})
