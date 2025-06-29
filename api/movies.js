import { connectToDatabase } from "./_mongodb.js"
import moviesPipeline from "./_moviesPipeline.js"

export default async function GET(request, response) {
    const { database } = await connectToDatabase()
    const pipeline = moviesPipeline(request.query)
    const data = await database.collection('movies').aggregate(pipeline).toArray()
    return response.json(await data)
}