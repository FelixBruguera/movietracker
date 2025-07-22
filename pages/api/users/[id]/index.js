import { connectToDatabase } from "lib/_mongodb"
import userReviewsPipeline from "lib/_userReviewsPipeline"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  try {
    const data = await database
      .collection("comments")
      .aggregate(userReviewsPipeline(request.query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404)
  }
}
