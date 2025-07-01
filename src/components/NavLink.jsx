import Link from "next/link"
import { Button } from "@/components/ui/button"

const NavLink = ({ href, title, isActive }) => {
    return (
        <Button asChild variant='outline' 
        className={`border-1 dark:border-stone-700 text-md p-4 dark:hover:bg-red-900 dark:hover:border-gray-800 ${isActive ? 'dark:bg-stone-700' : null}`}>
            <Link href={href}>{title}</Link>
        </Button>
    )
}

export default NavLink