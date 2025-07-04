import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../lib/_mongodb"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const { movieId, page = 1, limit = 10, sortBy = "date", sortOrder = -1 } = request.query

  if (!movieId) {
    return response.status(400).json({ error: "movieId is required" })
  }

  const pipeline = [
    {
      $match: {
        movie_id: new ObjectId(movieId),
      },
    },
    {
      $sort: {
        [sortBy]: parseInt(sortOrder),
      },
    },
    {
      $skip: (parseInt(page) - 1) * parseInt(limit),
    },
    {
      $limit: parseInt(limit),
    },
  ]

  try {
    const data = await database.collection("comments").aggregate(pipeline).toArray()
    return response.json(data)
  } catch (e) {
    console.error(e)
    return response.status(500).json({ error: "Internal server error" })
  }
}
