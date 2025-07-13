import { describe, test, expect } from "vitest"

describe("the sign-up endpoint", () => {
  describe("with invalid inputs", () => {
    test("returns 400 and the correct message when a field is missing", async () => {
      const newUser = { username: "Test", password: "Testing" }
      const response = await fetch(
        "http://localhost:3000/api/auth/sign-up/email",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        },
      )
      console.log(response)
      expect(response.status).toBe(400)
      const responseMessage = await response.json()
      expect(responseMessage.message).toBe("Invalid email")
    })
    test("returns 400 and the correct message when the password is too short", async () => {
      const newUser = {
        username: "test",
        email: "Test@test.com",
        password: "t",
      }
      const response = await fetch(
        "http://localhost:3000/api/auth/sign-up/email",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(400)
      const responseMessage = await response.json()
      expect(responseMessage.message).toBe("Password too short")
    })
    test("returns 400 and the correct message when the username is too short", async () => {
      const newUser = {
        username: "t",
        email: "Test@test.com",
        password: "testingpassword",
      }
      const response = await fetch(
        "http://localhost:3000/api/auth/sign-up/email",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(422)
      const responseMessage = await response.json()
      expect(responseMessage.message).toBe("username is too short")
    })
    test("returns 422 when the username already exists", async () => {
      const newUser = {
        username: "jaqen",
        email: "duplicated@user.com",
        password: "testingpassword",
      }
      const response = await fetch(
        "http://localhost:3000/api/auth/sign-up/email",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(422)
      const responseMessage = await response.json()
      expect(responseMessage.message).toBe(
        "username is already taken. please try another.",
      )
    })
    test("returns 422 when the email already exists", async () => {
      const newUser = {
        username: "newuser",
        email: "tom_wlaschiha@gameofthron.es",
        password: "testingpassword",
      }
      const response = await fetch(
        "http://localhost:3000/api/auth/sign-up/email",
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" },
        },
      )
      expect(response.status).toBe(422)
      const responseMessage = await response.json()
      expect(responseMessage.message).toBe("User already exists")
    })
  })
})
