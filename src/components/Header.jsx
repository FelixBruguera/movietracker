import {
  CircleQuestionMark,
  Clapperboard,
  Film,
  MoveIcon,
  TableOfContents,
  Users,
} from "lucide-react"
import NavLink from "./NavLink"
import Link from "next/link"
import { useRouter } from "next/router"
import { ModeToggle } from "@/components/ui/mode-toggle"
import UserDropdown from "./UserDropdown"
import DialogWrapper from "./DialogWrapper"
import { authClient } from "@/lib/auth-client.ts"
import NewLog from "./NewLog"

const Header = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  return (
    <nav className="flex flex-col lg:flex-row items-center justify-around h-30 lg:h-20 p-2 mb-2 w-dvw lg:w-full">
      <Link
        href={"/"}
        className="flex items-center gap-1 text-2xl font-bold w-fit"
      >
        <Clapperboard className="!size-8" />
        Movie Tracker
      </Link>
      <div className="flex gap-0 items-center justify-between w-full lg:w-8/10">
        <div className="flex items-center justify-evenly w-full">
          <NavLink
            href={"/"}
            title="Movies"
            icon={<Film />}
            isActive={router.pathname === "/"}
          />
          <NavLink
            href={"/lists"}
            title="Lists"
            icon={<TableOfContents />}
            isActive={router.pathname === "/lists"}
          />
          <NavLink
            href={"/users"}
            title="Users"
            icon={<Users />}
            isActive={router.pathname === "/users"}
          />
        </div>
        <div className="flex items-center lg:justify-between justify-evenly w-8/10 lg:w-3/10">
          {session && (
            <DialogWrapper title="New Log" label="Add a new log">
              <NewLog />
            </DialogWrapper>
          )}
          <ModeToggle />
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}

export default Header
