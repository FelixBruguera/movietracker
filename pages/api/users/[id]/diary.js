import { connectToDatabase } from "lib/_mongodb.js"
import userDiaryPipeline from "lib/_userDiaryPipeline"
import { z } from "zod"
import { baseSchema } from "pages/api/movies/index"
import { ObjectId } from "mongodb"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const schema = baseSchema.extend({
    id: z.custom((id) => ObjectId.isValid(id)),
    sortBy: z
      .enum(["yearly", "monthly"])
      .default("monthly")
      .transform((sort) => (sort === "yearly" ? "$year" : ["$year", "$month"])),
  })
  const query = schema.parse(request.query)
  try {
    const data = await database
      .collection("user")
      .aggregate(userDiaryPipeline(query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404)
  }
}
