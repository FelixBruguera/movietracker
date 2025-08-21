import { connectToDatabase } from "lib/_mongodb.js"
import moviesPipeline from "lib/_moviesPipeline.js"
import { z } from "zod"

export const baseSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  sortOrder: z
    .literal(["-1", "1"])
    .default(-1)
    .pipe(z.transform((num) => parseInt(num))),
})

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const schema = baseSchema.extend({
    search: z.string().max(100).optional(),
    cast: z.string().max(50).optional(),
    directors: z.string().max(50).optional(),
    genres: z.string().max(20).optional(),
    languages: z.string().max(20).optional(),
    type: z
      .literal(["Movie", "Series", "All"])
      .transform((type) => type.toLowerCase())
      .optional(),
    "imdb.rating_min": z.coerce.number().min(1).max(10).optional(),
    "imdb.rating_max": z.coerce.number().min(1).max(10).optional(),
    runtime_min: z.coerce.number().min(1).max(1256).optional(),
    runtime_max: z.coerce.number().min(1).max(1256).optional(),
    released_min: z.coerce.number().min(1896).max(2016).optional(),
    released_max: z.coerce.number().min(1896).max(2016).optional(),
    sortBy: z
      .enum(["imdb.rating", "released", "runtime"])
      .default("imdb.rating"),
  })
  try {
    const query = schema.parse(request.query)
    const data = await database
      .collection("movies")
      .aggregate(moviesPipeline(query))
      .toArray()
    return response.json(data)
  } catch (error) {
    console.log(error)
    return response.status(404).send()
  }
}
