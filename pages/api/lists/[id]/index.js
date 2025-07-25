import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb.js"
import pipeline from "lib/_listPipeline.js"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
    const { database } = await connectToDatabase()
    const session = await auth.api.getSession({ headers: request.headers })

    if (request.method === "POST") {
        if (!session) {
            return response.status(401).send()
        }
        const id = request.query.id
        const movie_id = request.body.movie_id
        try {
            const query = await database.collection("lists_movies").insertOne(
                {
                    movie_id: ObjectId.createFromHexString(movie_id),
                    list_id: ObjectId.createFromHexString(id),
                    createdAt: new Date()
                },
            )
            if (query.insertedId) {
                return response.status(200).send()
            }
        } catch (error) {
            if (error.code === 11000) { 
                return response.status(422).json({"error": "Duplicated movie"})
            }
            else {
                return response.status(500).send() 
            }
        }
    }
    else {
        try {
            const data = await database
            .collection("lists")
            .aggregate(pipeline(request.query, session?.user.id))
            .next()
            if (data.list) {
                return response.json(data)
            }
            else {
                return response.status(404).send()
            }
        } catch (e) {
            return response.status(404).send()
        }
    }
}
