import Link from "next/link"
import { Button } from "@/components/ui/button"

const NavLink = ({ href, title, isActive }) => {
  return (
    <Button
      asChild
      variant="outline"
      className={`border-1 border-zinc-300 dark:border-stone-700 lg:dark:border-transparent lg:border-transparent text-base lg:text-lg bg-transparent text-black dark:text-white transition-all hover:text-white hover:bg-red-800 dark:hover:bg-red-800 dark:hover:border-gray-800 ${isActive ? "bg-red-800 text-white dark:bg-red-800" : null}`}
    >
      <Link href={href}>{title}</Link>
    </Button>
  )
}

export default NavLink
