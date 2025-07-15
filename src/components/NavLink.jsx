import Link from "next/link"
import { Button } from "@/components/ui/button"

const NavLink = ({ href, title, isActive }) => {
  return (
    <Button
      asChild
      variant="outline"
      className={`border-1 text-md lg:text-lg bg-transparent text-black dark:text-white transition-all hover:text-white hover:bg-red-800 dark:hover:bg-red-800 dark:hover:border-gray-800 ${isActive ? "bg-red-800 text-white dark:bg-red-800" : null}`}
    >
      <Link href={href}>{title}</Link>
    </Button>
  )
}

export default NavLink
