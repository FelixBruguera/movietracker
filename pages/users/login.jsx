import { Button } from "@/components/ui/button"
import AuthInput from "../../src/components/AuthInput"
import Link from "next/link"
import { authClient } from "@/lib/auth-client.ts"
import { toast } from "sonner"
import AuthForm from "../../src/components/AuthForm"
import { useRouter } from "next/router"

const Login = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  if (session) { 
    router.push('/')
    toast('Already signed in')
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    await authClient.signIn.username({
      username: e.target.user.value,
      password: e.target.password.value,
    }, {
        onSuccess: () => router.push('/'),    
        onError: (response) => toast(response.error.message)
    })
  }

  return (
    <AuthForm title='Login' onSubmit={onSubmit}>
        <AuthInput type="text" name="user" labelText='Username'/>
        <AuthInput
          type="password"
          name="password"
          labelText='Password'
        />
        <div className="flex items-center justify-evenly">
          <Button type="submit">
            Send
          </Button>
          <Button asChild>
            <Link href="/users/signup">Sign up</Link>
          </Button>
        </div>
      </AuthForm>
  )
}

export default Login