import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { mongoClient, database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return response.status(401).send()
  }
  if (request.method === "PATCH") {
    const id = ObjectId.createFromHexString(request.query.id)
    const userId = ObjectId.createFromHexString(session.user.id)
    const text = request.body.text
    const rating = parseInt(request.body.rating)
    if (isNaN(rating) || rating < 1 || rating > 10) {
      return response.status(400).json({ error: "Rating must be 1-10" })
    }
    if (typeof text !== "string" || text.length > 5000) {
      return response.status(400).json({ error: "Invalid comment" })
    }
    const query = await database.collection("comments").updateOne(
      {
        _id: id,
        user_id: userId,
      },
      {
        $set: {
          text: text,
          rating: rating,
        },
      },
    )
    if (query.modifiedCount === 1) {
      return response.status(200).json()
    } else {
      return response.status(404).send()
    }
  }
  if (request.method === "DELETE") {
    const mongoSession = mongoClient.startSession()
    try {
      mongoSession.startTransaction()
      const id = request.query.id
      const user_id = ObjectId.createFromHexString(session.user.id)
      const check = await database.collection("comments").deleteOne({
        _id: ObjectId.createFromHexString(id),
        user_id: user_id,
      })
      if (check.deletedCount !== 1) {
        return response.status(404).send()
      }
      await database
        .collection("user")
        .findOneAndUpdate({ _id: user_id }, { $inc: { reviews: -1 } })
      return response.status(204).json()
    } catch {
      return response.status(404).send()
    } finally {
      await mongoSession.endSession()
    }
  }
}
