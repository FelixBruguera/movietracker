import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../../lib/_mongodb"
import reviewsPipeline from "../../../lib/_reviewsPipeline"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (request.method === 'DELETE') {
    if (!session) {
      return response.status(401).send()
    } else {
      const id = request.query.id
      const query = await database.collection("comments").deleteOne(
          {
            _id: ObjectId.createFromHexString(id),
            user_id: ObjectId.createFromHexString(session.user.id),
          })
      if (query.deletedCount === 1) {
        return response.status(204).json()
      } else {
        return response.status(404).send()
      }
    }
  }
}
