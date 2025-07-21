import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../../lib/_mongodb"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return response.status(401).send()
  } else if (request.method === "PATCH") {
    const id = request.query.id
    const date = request.body.date
    const query = await database.collection("diary").updateOne(
      {
        _id: ObjectId.createFromHexString(id),
        user_id: ObjectId.createFromHexString(session.user.id),
      },
      {
        $set: {
          date: new Date(`${date} 0:00:00:000Z`),
        },
      },
    )
    if (query.modifiedCount === 1) {
      return response.status(200).send()
    } else {
      return response.status(404).send()
    }
  } else if (request.method === "DELETE") {
    const id = request.query.id
    const query = await database.collection("diary").deleteOne({
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
