import { ObjectId } from "mongodb"
import { connectToDatabase } from "../../lib/_mongodb"
import reviewsPipeline from "../../lib/reviewsPipeline"

export default async function handler(request, response) {
  const { database } = await connectToDatabase()

  try {
    const data = await database.collection("comments").aggregate(reviewsPipeline(request.query)).toArray()
    return response.json(data)
  } catch (e) {
    console.error(e)
    return response.status(500).json({ error: "Internal server error" })
  }
}
