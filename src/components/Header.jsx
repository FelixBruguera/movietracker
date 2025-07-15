import { Clapperboard } from "lucide-react"
import NavLink from "./NavLink"
import Link from "next/link"
import { useRouter } from "next/router"
import { ModeToggle } from "@/components/ui/mode-toggle"
import UserDropdown from "./UserDropdown"

const Header = () => {
  const router = useRouter()

  return (
    <nav className="flex flex-col lg:flex-row items-center justify-around h-30 lg:h-20 p-2 mb-2">
      <Link
        href={"/"}
        className="flex items-center gap-1 text-2xl font-bold w-fit"
      >
        <Clapperboard className="size-8" />
        Movie Tracker
      </Link>
      <div className="flex items-center justify-between w-full lg:w-8/10">
        <div className="flex items-center justify-evenly w-7/10">
          <NavLink
            href={"/"}
            title="Movies"
            isActive={router.pathname === "/"}
          />
          <NavLink
            href={"/lists"}
            title="Lists"
            isActive={router.pathname === "/lists"}
          />
          <NavLink
            href={"/users"}
            title="Users"
            isActive={router.pathname === "/users"}
          />
        </div>
        <div className="flex items-center justify-evenly w-3/10">
          <ModeToggle />
          <UserDropdown />
        </div>
      </div>
    </nav>
  )
}

export default Header
