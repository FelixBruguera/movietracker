import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import Remove from "./Remove"
import { Trash } from "lucide-react"
import Poster from "./Poster"
import Link from "next/link"
import { memo } from "react"

const ListMovieWithContext = memo(({ listName, movie, mutation }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li key={movie._id} className="group">
          <Link href={`/movies/${movie._id}`} className="text-center">
            <Poster src={movie.poster} alt={movie.title} />
          </Link>
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem asChild>
          <Remove
            title={`Removing ${movie.title} from ${listName}`}
            mutation={() => mutation.mutate(movie._id)}
            className="w-full dark:hover:bg-stone-900 hover:cursor-pointer"
          >
            <div className="flex items-center text-sm dark:text-stone-300 gap-2">
              <Trash />
              Remove
            </div>
          </Remove>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
})

export default ListMovieWithContext
