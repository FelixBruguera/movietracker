import { Clapperboard } from "lucide-react"
import NavLink from "./NavLink"
import Link from "next/link"
import { useRouter } from "next/router"
import { ModeToggle } from "@/components/ui/mode-toggle"
import UserDropdown from "./UserDropdown"

const Header = () => {
  const router = useRouter()

  return (
    <nav className="flex items-center justify-around h-20 p-2 mb-2">
      <Link
        href={"/"}
        className="flex items-center gap-1 text-xl font-bold w-fit"
      >
        <Clapperboard />
        Movie Tracker
      </Link>
      <div className="flex items-center justify-evenly w-6/10">
        <NavLink href={"/"} title="Movies" isActive={router.pathname === "/"} />
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
      <div className="flex items-center justify-evenly w-2/10">
        <ModeToggle />
        <UserDropdown router={router} />
      </div>
    </nav>
  )
}

export default Header
