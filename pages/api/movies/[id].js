import { connectToDatabase } from "lib/_mongodb.js"
import pipeline from "lib/_moviePipeline.js"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()
  const { id } = request.query
  const options = { ...request.query, movie_id: id }

  try {
    const data = await database
      .collection("movies")
      .aggregate(pipeline(options))
      .next()
    return response.json(data)
  } catch (e) {
    console.error(e)
    return response.status(404).json({ error: "Movie not found" })
  }
}
