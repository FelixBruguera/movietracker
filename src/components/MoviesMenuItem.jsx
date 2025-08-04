import { Button } from "@/components/ui/button"

const MoviesMenuItem = ({ title, onClick, isActive }) => {
  return (
    <Button
      onClick={() => onClick(title)}
      variant="ghost"
      className={`text-xs lg:text-sm border-1 border-stone-300 dark:border-stone-700 hover:bg-red-800 hover:text-white dark:hover:bg-red-800 hover:cursor-pointer transition-all
            ${isActive && "bg-red-800 text-white dark:hover:bg-stone-800"}`}
    >
      {title}
    </Button>
  )
}

export default MoviesMenuItem
