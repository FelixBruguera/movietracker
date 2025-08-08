import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import listsPipeline from "lib/_listsPipeline"
import { auth } from "@/lib/auth.ts"
import followingPipeline from "lib/_followingPipeline"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).send()
    } else {
      const { name, description } = request.body
      if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        name.length > 80 ||
        description.length > 400
      ) {
        return response.status(400).json({ error: "Invalid content" })
      }
      const isPrivate = request.body.isPrivate === true ? true : false
      try {
        await database.collection("lists").insertOne({
          user_id: ObjectId.createFromHexString(session.user.id),
          name: name,
          description: description,
          isPrivate: isPrivate,
          movies: 0,
          followers: 0,
          createdAt: new Date(),
        })
        return response.status(201).send()
      } catch {
        return response.status(500).send()
      }
    }
  } else {
    try {
      let data
      if (request.query.filter === "following") {
        data = await database
          .collection("lists_followers")
          .aggregate(followingPipeline(request.query, session?.user.id))
          .toArray()
      } else {
        data = await database
          .collection("lists")
          .aggregate(listsPipeline(request.query, session?.user.id))
          .toArray()
      }
      return response.json(data)
    } catch (e) {
      return response.status(404).send()
    }
  }
}
