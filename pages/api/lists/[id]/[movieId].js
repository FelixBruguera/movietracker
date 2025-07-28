import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { mongoClient, database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === "DELETE") {
    if (!session) {
      return response.status(401).send()
    } else {
      const listId = ObjectId.createFromHexString(request.query.id)
      const movieId = ObjectId.createFromHexString(request.query.movieId)
      const user_id = ObjectId.createFromHexString(session.user.id)
      const mongoSession = mongoClient.startSession()
      try {
        mongoSession.startTransaction()
        const check = await database
          .collection("lists")
          .findOne({ _id: listId, user_id: user_id })
        if (check) {
          const result = await database
            .collection("lists_movies")
            .deleteOne({ list_id: listId, movie_id: movieId })
          await mongoSession.commitTransaction()
          if (result.deletedCount === 1) {
            return response.status(204).send()
          }
        } else {
          return response.status(404).send()
        }
      } catch {
        return response.status(404).send()
      } finally {
        await mongoSession.endSession()
      }
    }
  }
}
