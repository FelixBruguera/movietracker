import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = { useUnifiedTopology: true, useNewUrlParser: true, }
let mongoClient = null
let database = null

if (!uri) { throw new Error('Please add your Mongo URI to .env.local') }

console.log(uri)

export async function connectToDatabase() {
    try { 
        if (mongoClient && database) {
            console.log('reusing connection')
            return { mongoClient, database }
        } 
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect()
                global._mongoClient = mongoClient
            } 
            else { 
                mongoClient = global._mongoClient
            } 
        } 
        else {
            mongoClient = await (new MongoClient(uri, options)).connect()
        }
        if (process.env.ENVIROMENT === 'TEST') {
            database = await mongoClient.db('test_flix')
            console.log('connected in test')
        }
        else {
            database = await mongoClient.db('sample_mflix')
            console.log('connected')
        }
        return { mongoClient, database }
    } 
    catch (e) {
         console.error(e)
        } 
    }