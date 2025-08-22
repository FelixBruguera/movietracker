import { connectToDatabase } from "lib/_mongodb"
import usersPipeline from "lib/_usersPipeline"
import { z } from "zod"
import { baseSchema } from "pages/api/movies/index"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const schema = baseSchema.extend({
    sortBy: z
      .enum(["date", "reviews"])
      .default("reviews")
      .transform((sort) => (sort === "date" ? "createdAt" : "reviews")),
  })
  const query = schema.parse(request.query)
  try {
    const data = await database
      .collection("user")
      .aggregate(usersPipeline(query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404)
  }
}
