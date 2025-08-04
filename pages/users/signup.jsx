import { authClient } from "@/lib/auth-client.ts"
import AuthInput from "src/components/AuthInput"
import { Button } from "@/components/ui/button"
import AuthForm from "src/components/AuthForm"
import { toast } from "sonner"
import { useRouter } from "next/router"

export default function SignUp() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  if (session) {
    router.push("/")
    toast("Already signed in")
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = e.target
    await authClient.signUp.email(
      {
        username: data.username.value,
        password: data.password.value,
        email: data.email.value,
        image: `https://www.gravatar.com/avatar/${data.username.value}?d=identicon&s=200&r=pg`,
        reviews: 0,
      },
      {
        onError: (response) => toast(response.error.message),
      },
    )
  }
  return (
    <AuthForm title="Sign up" onSubmit={onSubmit}>
      <AuthInput
        type="text"
        name="username"
        labelText="Username"
        minLength="3"
      />
      <AuthInput type="text" name="email" labelText="Email" />
      <AuthInput
        type="password"
        name="password"
        labelText="Password"
        minLength="8"
      />
      <Button type="submit">Send</Button>
    </AuthForm>
  )
}
