import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import listsPipeline from "lib/_listsPipeline"
import { auth } from "@/lib/auth.ts"
import followingPipeline from "lib/_followingPipeline"
import { z } from "zod"
import { baseSchema } from "pages/api/movies/index"

export const listSchema = z.object({
  name: z.string().min(5).max(80),
  description: z.string().min(5).max(400),
  isPrivate: z.boolean(),
})

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).send()
    } else {
      const { name, description, isPrivate } = listSchema.parse(request.body)
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
    const schema = baseSchema.extend({
      sortBy: z.enum(["date", "followers", "movies"]).default("movies"),
      filter: z.enum(["user", "following"]).optional(),
      search: z.string().max(100).optional(),
    })
    try {
      let data
      const query = schema.parse(request.query)
      const userId = session?.user.id
      if (request.query.filter === "following") {
        data = await database
          .collection("lists_followers")
          .aggregate(followingPipeline(query, userId))
          .toArray()
      } else {
        data = await database
          .collection("lists")
          .aggregate(listsPipeline(query, userId))
          .toArray()
      }
      return response.json(data)
    } catch (e) {
      return response.status(404).send()
    }
  }
}
