import { connectToDatabase } from "../../../lib/_mongodb"
import userReviewsPipeline from "../../../lib/_userReviewsPipeline"
import userDiaryPipeline from "../../../lib/_userDiaryPipeline"
import userListsPipeline from "../../../lib/_userListsPipeline"

export default async function GET(request, response) {
  const tabConfig = {
    reviews: {
      collection: "comments",
      pipeline: userReviewsPipeline,
    },
    diary: {
      collection: "diary",
      pipeline: userDiaryPipeline,
    },
    lists: {
      collection: "lists",
      pipeline: userListsPipeline,
    },
  }
  const { database } = await connectToDatabase()
  const { tab } = request.query
  let pipelineOptions = tabConfig[tab]
  if (!pipelineOptions) {
    pipelineOptions = tabConfig.reviews
  }
  try {
    const data = await database
      .collection(pipelineOptions.collection)
      .aggregate(pipelineOptions.pipeline(request.query))
      .toArray()
    return response.json(data)
  } catch {
    return response.status(404)
  }
}
