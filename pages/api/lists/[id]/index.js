import { ObjectId } from "mongodb"
import { connectToDatabase } from "lib/_mongodb.js"
import pipeline from "lib/_listPipeline.js"
import { auth } from "@/lib/auth.ts"

export default async function handler(request, response) {
  const { mongoClient, database } = await connectToDatabase()
  const session = await auth.api.getSession({ headers: request.headers })

  if (request.method === "PATCH") {
    if (!session) {
      return response.status(401).send()
    }
    const id = request.query.id
    const { name, description } = request.body
    if (
      typeof name !== "string" ||
      typeof description !== "string" ||
      name.length > 80 ||
      description.length > 400
    ) {
      return response.status(400).json({ error: "Invalid content" })
    }
    const isPrivate = request.body.isPrivate === true ? true : false
    try {
      const query = await database.collection("lists").updateOne(
        {
          _id: ObjectId.createFromHexString(id),
          user_id: ObjectId.createFromHexString(session.user.id),
        },
        {
          $set: {
            name: name,
            description: description,
            isPrivate: isPrivate,
          },
        },
      )
      if (query.modifiedCount === 1) {
        return response.status(200).send()
      }
    } catch (error) {
      return response.status(500).send()
    }
  }

  if (request.method === "POST") {
    if (!session) {
      return response.status(401).send()
    }
    const list_id = ObjectId.createFromHexString(request.query.id)
    const movie_id = ObjectId.createFromHexString(request.body.movie_id)
    const user_id = ObjectId.createFromHexString(session.user.id)
    const mongoSession = mongoClient.startSession()
    try {
      mongoSession.startTransaction()
      const check = await database
        .collection("lists")
        .findOne({ _id: list_id, user_id: user_id })
      if (check) {
        const result = await database.collection("lists_movies").insertOne({
          movie_id: movie_id,
          list_id: list_id,
          createdAt: new Date(),
        })
        await mongoSession.commitTransaction()
        if (result.insertedId) {
          return response.status(200).send()
        }
      }
    } catch (error) {
      if (error.code === 11000) {
        return response.status(422).json({ error: "Duplicated movie" })
      } else {
        return response.status(404).send()
      }
    } finally {
      await mongoSession.endSession()
    }
  }
  if (request.method === "DELETE") {
    if (!session) {
      return response.status(401).send()
    } else {
      const id = request.query.id
      const query = await database.collection("lists").deleteOne({
        _id: ObjectId.createFromHexString(id),
        user_id: ObjectId.createFromHexString(session.user.id),
      })
      if (query.deletedCount === 1) {
        return response.status(204).json()
      } else {
        return response.status(404).send()
      }
    }
  } else {
    try {
      const data = await database
        .collection("lists")
        .aggregate(pipeline(request.query, session?.user.id))
        .next()
      if (data.list) {
        return response.json(data)
      } else {
        return response.status(404).send()
      }
    } catch (e) {
      return response.status(404).send()
    }
  }
}
