import { connectToDatabase } from "./_mongodb.js"
import moviesPipeline from "./_moviesPieline.js"

export default async function GET(request, response) {
    const { database } = await connectToDatabase()
    const host = request.headers.host
    const params = new URL(host + request.url).searchParams
    const pipeline = moviesPipeline(params)
    const data = await database.collection('movies').aggregate(pipeline).toArray()
    return response.json(await data)
}