import { connectToDatabase } from "lib/_mongodb"
import userListsPipeline from "lib/_userListsPipeline"
import { z } from "zod"
import { baseSchema } from "pages/api/movies/index"
import { ObjectId } from "mongodb"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const schema = baseSchema.extend({
    id: z.custom((id) => ObjectId.isValid(id)),
    sortBy: z.literal("createdAt").default("createdAt"),
  })
  const query = schema.parse(request.query)
  try {
    const data = await database
      .collection("user")
      .aggregate(userListsPipeline(query))
      .toArray()
    return response.json(data)
  } catch (e) {
    console.log(e)
    return response.status(404)
  }
}
