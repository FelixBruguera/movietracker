import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const MoviesMenuItem = ({ title, onClick }) => {
  const { query } = useRouter()
  return (
    <Button
      onClick={() => onClick(title)}
      variant="ghost"
      className={`border-1 border-gray-700 dark:hover:bg-red-800 hover:cursor-pointer transition-all
            ${query.genres === title ? "dark:bg-red-800 dark:hover:bg-stone-800" : null}`}
    >
      {title}
    </Button>
  )
}

export default MoviesMenuItem
