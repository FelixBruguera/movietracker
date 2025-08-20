import Poster from "./Poster"
import Link from "next/link"
import { memo } from "react"

const ListMovie = memo(({ movie }) => {
  return (
    <li key={movie._id} className="group">
      <Link href={`/movies/${movie._id}`} className="text-center">
        <Poster src={movie.poster} alt={movie.title} size="base" />
      </Link>
    </li>
  )
})

export default ListMovie
