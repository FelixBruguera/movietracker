import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../../lib/_mongodb"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return response.status(401).send()
  }
  if (request.method === "POST") {
    const { date, movie_id } = request.body
    const query = await database.collection("diary").insertOne({
      user_id: ObjectId.createFromHexString(session.user.id),
      movie_id: ObjectId.createFromHexString(movie_id),
      date: new Date(`${date} 0:00:00:000Z`),
    })
    if (query.insertedId) {
      return response.status(201).json(query)
    } else {
      return response.status(500).send()
    }
  } else {
    const movieId = request.query.movie_id
    try {
      const query = await database
        .collection("diary")
        .find({
          user_id: ObjectId.createFromHexString(session.user.id),
          movie_id: ObjectId.createFromHexString(movieId),
        })
        .toArray()
      return response.json(query)
    } catch {
      return response.status(500).send()
    }
  }
}
