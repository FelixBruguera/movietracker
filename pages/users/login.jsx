import { Button } from "@/components/ui/button"
import AuthInput from "src/components/AuthInput"
import Link from "next/link"
import { authClient } from "@/lib/auth-client.ts"
import { toast } from "sonner"
import AuthForm from "src/components/AuthForm"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Login = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  if (session) {
    router.push("/")
    toast("Already signed in")
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    await authClient.signIn.username(
      {
        username: e.target.user.value,
        password: e.target.password.value,
      },
      {
        onRequest: () => toast("Signing you in..."),
        onError: (response) => toast(response.error.message),
      },
    )
  }
  useEffect(
    () => {
      authClient.revokeOtherSessions()
    },
    [session])

  return (
    <AuthForm title="Login" onSubmit={onSubmit}>
      <AuthInput
        type="text"
        name="user"
        id="username"
        labelText="Username"
        minLength="3"
      />
      <AuthInput
        type="password"
        name="password"
        id="password"
        labelText="Password"
        minLength="8"
      />
      <div className="flex items-center justify-evenly">
        <Button type="submit">Send</Button>
        <Button asChild>
          <Link href="/users/signup">Sign up</Link>
        </Button>
      </div>
    </AuthForm>
  )
}

export default Login
