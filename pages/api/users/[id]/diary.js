import { connectToDatabase } from "lib/_mongodb.js"
import userDiaryPipeline from "lib/_userDiaryPipeline"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  try {
    const data = await database
      .collection("user")
      .aggregate(userDiaryPipeline(request.query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404)
  }
}
