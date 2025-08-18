import Link from "next/link"
import Poster from "./Poster"
import { Separator } from "@/components/ui/separator"

const RatingDifference = ({ movie, isRatedHigher }) => {
  const config = isRatedHigher
    ? { color: "text-green-600", symbol: "+" }
    : { color: "text-red-600", symbol: "" }
  return (
    <li key={movie._id} className="group">
      <Link href={`/movies/${movie._id}`}>
        <Poster src={movie.poster} alt={movie.title} size="small" />
        <Separator className="bg-zinc-400 dark:bg-muted my-2 group-hover:bg-blue-700 dark:group-hover:bg-blue-700 transition-colors" />
        <div className="flex items-center justify-center gap-1">
          <p className="font-bold">{movie.rating}</p>
          <p>vs</p>
          <p>{movie.imdbRating}</p>
          <p className={`font-bold ${config.color}`}>
            {" "}
            ({config.symbol}
            {movie.ratingVsImdb.toFixed(2)})
          </p>
        </div>
      </Link>
    </li>
  )
}

export default RatingDifference
