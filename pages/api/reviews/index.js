import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import reviewsPipeline from "lib/_reviewsPipeline"
import { auth } from "@/lib/auth.ts"
import { baseSchema } from "../movies"
import { z } from "zod"

export const reviewSchema = z.object({
  text: z.string().min(3).max(400),
  rating: z.coerce.number().min(1).max(10),
  movie_id: z.custom((id) => ObjectId.isValid(id)),
})
export default async function handler(request, response) {
  const { mongoClient, database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === "POST") {
    if (!session) {
      return response.status(401).send()
    } else {
      const mongoSession = mongoClient.startSession()
      const { rating, text, movie_id } = reviewSchema.parse(request.body)
      const userId = ObjectId.createFromHexString(session.user.id)
      try {
        mongoSession.startTransaction()
        await database.collection("comments").insertOne({
          user_id: userId,
          movie_id: ObjectId.createFromHexString(movie_id),
          rating: rating,
          text: text,
          date: new Date(),
        })
        await database.collection("user").findOneAndUpdate(
          {
            _id: userId,
          },
          {
            $inc: { reviews: 1 },
          },
        )
        await mongoSession.commitTransaction()
        return response.status(201).send()
      } catch (error) {
        console.log(error)
        return response.status(500).send()
      } finally {
        await mongoSession.endSession()
      }
    }
  } else {
    const schema = baseSchema.extend({
      sortBy: z.literal(["rating", "date"]).default("date"),
      id: z.custom((id) => ObjectId.isValid(id)),
    })
    const query = schema.parse(request.query)
    try {
      const data = await database
        .collection("comments")
        .aggregate(reviewsPipeline(query, session?.user?.id))
        .toArray()
      return response.json(data)
    } catch (error) {
      console.log(error)
      return response.status(404)
    }
  }
}
