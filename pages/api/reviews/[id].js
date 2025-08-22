import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import { auth } from "@/lib/auth.ts"
import { reviewSchema } from "pages/api/reviews/index"

export default async function handler(request, response) {
  const { mongoClient, database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return response.status(401).send()
  }
  if (request.method === "PATCH") {
    const schema = reviewSchema.omit({ movie_id: true })
    const id = ObjectId.createFromHexString(request.query.id)
    const userId = ObjectId.createFromHexString(session.user.id)
    const { text, rating } = schema.parse(request.body)
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
      const check = await database.collection("comments").deleteOne(
        {
          _id: ObjectId.createFromHexString(id),
          user_id: user_id,
        },
        { session: mongoSession },
      )
      if (check.deletedCount !== 1) {
        return response.status(404).send()
      }
      await database
        .collection("user")
        .findOneAndUpdate(
          { _id: user_id },
          { $inc: { reviews: -1 } },
          { session: mongoSession },
        )
      await mongoSession.commitTransaction()
      return response.status(204).json()
    } catch {
      return response.status(404).send()
    } finally {
      await mongoSession.endSession()
    }
  }
}
