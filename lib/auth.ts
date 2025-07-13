import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { connectToDatabase } from "./_mongodb"
import { username } from "better-auth/plugins"

const client = await connectToDatabase()

export const auth = betterAuth({
  database: mongodbAdapter(client?.database),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
})
