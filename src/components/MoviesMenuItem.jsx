import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const MoviesMenuItem = ({ title, onClick }) => {
  const { query } = useRouter()
  return (
    <Button
      onClick={() => onClick(title)}
      variant="ghost"
      className={`text-xs lg:text-sm border-1 border-gray-400 dark:border-gray-700 hover:bg-red-800 hover:text-white dark:hover:bg-red-800 hover:cursor-pointer transition-all
            ${query.genres === title ? "bg-red-800 text-white dark:hover:bg-stone-800" : null}`}
    >
      {title}
    </Button>
  )
}

export default MoviesMenuItem
