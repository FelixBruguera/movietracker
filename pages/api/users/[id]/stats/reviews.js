import { connectToDatabase } from "lib/_mongodb"
import reviewsStatsPipeline from "lib/_reviewsStatsPipeline"
import { z } from "zod"
import { baseSchema } from "pages/api/movies/index"
import { ObjectId } from "mongodb"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const schema = baseSchema.extend({
    id: z.custom((id) => ObjectId.isValid(id)),
  })
  const query = schema.parse(request.query)
  try {
    const data = await database
      .collection("comments")
      .aggregate(reviewsStatsPipeline(query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404).send()
  }
}
