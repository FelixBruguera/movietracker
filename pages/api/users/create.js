import bcrypt from "bcrypt"
import { connectToDatabase } from "../../../lib/_mongodb"

export default async function handler(request, response) {
  if (request.method === "POST") {
    const { username, name, password } = request.body
    if (!password || !username || !name) {
      return response
        .status(400)
        .json("Name, Username and Password are required.")
    }
    if (password.length < 3) {
      return response
        .status(400)
        .json("Password is shorter than the minimum allowed length (3)")
    }
    const { database } = await connectToDatabase()
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = {
      username: username,
      name: name,
      passwordHash: passwordHash,
    }
    const result = await database.collection("users").insertOne(newUser)
    if (result.insertedId) {
      response.status(201).send()
    } else {
      response.status(500).send()
    }
  }
}
