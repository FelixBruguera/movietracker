import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { authClient } from "@/lib/auth-client.ts"
import { Button } from "@/components/ui/button"
import { ChevronDown, User, LogOut } from "lucide-react"

const UserDropdown = () => {
  const { data: session } = authClient.useSession()
  const logout = async () => await authClient.signOut()
  if (!session) {
    return (
      <Button asChild>
        <Link href="/users/login">Login</Link>
      </Button>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-fit max-w-50 overflow-clip whitespace-nowrap flex items-center gap-3 border-1 
            hover:bg-gray-100 hover:dark:bg-stone-900 rounded-lg p-2 hover:cursor-pointer transition-all"
      >
        {session.user.username}
        <ChevronDown size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <User />
          <Link href={`/users/${session.user.id}`}>Profile</Link>
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
