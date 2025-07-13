import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../lib/_mongodb"
import reviewsPipeline from "../../lib/_reviewsPipeline"
import { auth } from "@/lib/auth.ts"
import { headers } from "next/headers"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).send()
    } else {
      const id = request.query.id
      const { rating, text } = request.body
      const query = await database.collection("comments").findOneAndUpdate(
        {
          user_id: ObjectId.createFromHexString(session.user.id),
          movie_id: ObjectId.createFromHexString(id),
        },
        {
          $set: {
            rating: rating,
            text: text,
          },
          $setOnInsert: {
            date: new Date(),
          },
        },
        { upsert: true, returnNewDocument: true },
      )
      try {
        return response.status(201).json(query)
      } catch {
        return response.status(500)
      }
    }
  } else {
    try {
      const data = await database
        .collection("comments")
        .aggregate(reviewsPipeline(request.query, session?.user?.id))
        .toArray()
      return response.json(data)
    } catch (e) {
      console.error(e)
      return response.status(500).json({ error: "Internal server error" })
    }
  }
}
