import Poster from "./Poster"
import { Separator } from "@/components/ui/separator"

const MostWatchedMovie = ({ movie }) => {
    return (
        <li key={movie._id} className="group">
            <Poster src={movie.poster} alt={movie.title} />
            <Separator className="bg-zinc-400 dark:bg-stone-600 my-2 group-hover:bg-blue-700 dark:group-hover:bg-blue-700 transition-colors" />
            <div className="flex items-center justify-center gap-1 text-lg">
                <p className="font-bold">{movie.total}</p>
                <p>Times</p>
            </div>
        </li>
    )
}

export default MostWatchedMovie