import { connectToDatabase } from "lib/_mongodb"
import { ObjectId } from "mongodb"

export default async function GET(request, response) {
  const { database } = await connectToDatabase()
  const { id } = request.query
  try {
    const data = await database
      .collection("user")
      .aggregate([
        {
          $match: {
            _id: ObjectId.createFromHexString(id),
          },
        },
        {
          $project: {
            username: 1,
            image: 1,
          },
        },
      ])
      .toArray()
    return response.json(data)
  } catch (e) {
    console.log(e)
    return response.status(404).send()
  }
}
