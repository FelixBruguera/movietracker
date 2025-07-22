import { connectToDatabase } from "lib/_mongodb"
import userListsPipeline from "lib/_userListsPipeline"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  try {
    const data = await database
      .collection("lists")
      .aggregate(userListsPipeline(request.query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404)
  }
}
