import Poster from "./Poster"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const MostWatchedMovie = ({ movie }) => {
  return (
    <li key={movie._id} className="group">
      <Link href={`/movies/${movie._id}`}>
        <Poster src={movie.poster} alt={movie.title} />
        <Separator className="bg-zinc-400 dark:bg-muted my-2 group-hover:bg-blue-700 dark:group-hover:bg-blue-700 transition-colors" />
        <div className="flex items-center justify-center gap-1 text-lg">
          <p className="font-bold">{movie.total}</p>
          <p>Times</p>
        </div>
      </Link>
    </li>
  )
}

export default MostWatchedMovie
