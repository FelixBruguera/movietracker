import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { authClient } from "@/lib/auth-client.ts"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  User,
  LogIn,
  LogOut,
  UserIcon,
  SquareUser,
  CircleUserRound,
  CircleUser,
} from "lucide-react"

const UserDropdown = () => {
  const { data: session } = authClient.useSession()
  const logout = async () => await authClient.signOut()
  if (!session) {
    return (
      <Button asChild ariaLabel="Login">
        <Link href="/users/login">
          <LogIn />
          <p className="hidden lg:block">Login</p>
        </Link>
      </Button>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-fit lg:max-w-50 border-stone-700 lg:border-transparent overflow-clip whitespace-nowrap flex items-center gap-3 border-1 
            hover:bg-gray-100 hover:dark:bg-stone-900 rounded-lg p-2 hover:cursor-pointer transition-all"
      >
        <User size={20} />
        <p className="hidden lg:block">{session.user.username}</p>
        <ChevronDown size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={`/users/${session.user.id}`}
            className="flex items-center gap-2"
          >
            <CircleUserRound />
            <p>Profile</p>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>
          <LogOut />
          <p className="hover:cursor-pointer">Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
