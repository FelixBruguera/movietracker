import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../../lib/_mongodb"
import reviewsPipeline from "../../../lib/_reviewsPipeline"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).send()
    } else {
      const { text, movie_id } = request.body
      const rating = parseInt(request.body.rating)
      if (isNaN(rating) || rating < 1 || rating > 10) {
        return response.status(400).json({ error: "Rating must be 1-10" });
      }
      if (typeof text !== "string" || text.length > 5000) {
        return response.status(400).json({ error: "Invalid comment" });
      }
      try {
        await database.collection("comments").findOneAndUpdate(
          {
            user_id: ObjectId.createFromHexString(session.user.id),
            movie_id: ObjectId.createFromHexString(movie_id),
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
          { upsert: true },
        )
        return response.status(201).send()
      } catch {
        return response.status(500).send()
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
      return response.status(500).json({ error: "Internal server error" })
    }
  }
}
