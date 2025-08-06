import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { mongoClient, database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return response.status(401).send()
  }
  if (request.method === "POST") {
    const list_id = ObjectId.createFromHexString(request.query.id)
    const user_id = ObjectId.createFromHexString(session.user.id)
    const mongoSession = mongoClient.startSession()
    try {
      mongoSession.startTransaction()
      const check = await database
        .collection("lists")
        .findOneAndUpdate(
          { _id: list_id },
          { $inc: { followers: 1 } },
          { session: mongoSession },
        )
      if (!check) {
        return response.status(404).send()
      }
      await database
        .collection("lists_followers")
        .insertOne(
          { list_id: list_id, user_id: user_id },
          { session: mongoSession },
        )
      await mongoSession.commitTransaction()
      return response.status(201).send()
    } catch {
      return response.status(404).send()
    } finally {
      await mongoSession.endSession()
    }
  } else if (request.method === "DELETE") {
    const list_id = ObjectId.createFromHexString(request.query.id)
    const user_id = ObjectId.createFromHexString(session.user.id)
    const mongoSession = mongoClient.startSession()
    try {
      mongoSession.startTransaction()
      const check = await database
        .collection("lists_followers")
        .deleteOne(
          { list_id: list_id, user_id: user_id },
          { session: mongoSession },
        )
      if (check.deletedCount !== 1) {
        return response.status(404).send()
      }
      await database
        .collection("lists")
        .findOneAndUpdate(
          { _id: list_id },
          { $inc: { followers: -1 } },
          { session: mongoSession },
        )
      await mongoSession.commitTransaction()
      return response.status(204).send()
    } catch {
      return response.status(404).send()
    } finally {
      await mongoSession.endSession()
    }
  }
}
