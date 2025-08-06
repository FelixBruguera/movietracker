import { Button } from "@/components/ui/button"
import Link from "next/link"

const ProfileTab = ({ title, href, currentPath }) => {
  const isCurrentRoute = currentPath.includes(title.toLowerCase())
  const defaultRouteCheck = title === "Reviews" && currentPath === "/users/[id]"
  return (
    <li>
      <Link href={href}>
        <Button
          asChild
          variant="ghost"
          className={`p-4 hover:cursor-pointer hover:text-white hover:bg-red-800 dark:hover:bg-red-800 transition-all
                ${(isCurrentRoute || defaultRouteCheck) && "bg-red-800 text-white"}`}
        >
          <h3 className="font-bold text-sm lg:text-base">{title}</h3>
        </Button>
      </Link>
    </li>
  )
}

export default ProfileTab
