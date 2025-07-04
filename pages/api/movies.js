import { connectToDatabase } from "../../lib/_mongodb.js"
import moviesPipeline from "../../lib/_moviesPipeline.js"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const pipeline = moviesPipeline(request.query)
  try {
    const data = await database
      .collection("movies")
      .aggregate(pipeline)
      .toArray()
    return response.json(await data)
  } catch {
    return response.status(404)
  }
}
