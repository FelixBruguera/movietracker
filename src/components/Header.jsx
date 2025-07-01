import { Clapperboard } from "lucide-react"
import NavLink from "./NavLink"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const Header = () => {
    const router = useRouter()
    return (
        <nav className="flex items-center justify-around h-15 p-2 mb-2">
            <Link href={'/'} className="flex items-center gap-1 text-xl font-bold">
            <Clapperboard />
            Movie Tracker</Link>
            <div className="flex items-center justify-evenly w-6/10">
                <NavLink href={'/'} title='Movies' isActive={router.pathname === '/'}/>
                <NavLink href={'/lists'} title='Lists' isActive={router.pathname === '/lists'}/>
                <NavLink href={'/users'} title='Users' isActive={router.pathname === '/users'}/>
            </div>
            <Button>Logout</Button>
        </nav>
    )
}

export default Header