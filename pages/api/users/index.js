import { connectToDatabase } from "../../../lib/_mongodb"
import usersPipeline from "../../../lib/_usersPipeline"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const pipeline = usersPipeline(request.query)
  try {
    const data = await database.collection("user").aggregate(pipeline).toArray()
    return response.json(await data)
  } catch {
    return response.status(404)
  }
}
