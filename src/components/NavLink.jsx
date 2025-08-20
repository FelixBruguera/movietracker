import Link from "next/link"
import { Button } from "@/components/ui/button"

const NavLink = ({ href, title, isActive }) => {
  return (
    <Button
      asChild
      variant="outline"
      className={`border-1 border-border lg:dark:border-transparent lg:border-transparent text-base lg:text-lg bg-transparent text-black dark:text-white transition-all hover:text-white hover:bg-accent dark:hover:bg-accent dark:hover:border-gray-800 ${isActive ? "bg-accent text-white dark:bg-accent" : null}`}
    >
      <Link href={href}>{title}</Link>
    </Button>
  )
}

export default NavLink
