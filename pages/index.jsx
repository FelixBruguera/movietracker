import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import PaginationWrap from "../src/components/PaginationWrap"
import { useRouter } from "next/router"
import MoviesMenu from "../src/components/MoviesMenu"
import MoviesSkeleton from "../src/components/MoviesSkeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Star } from "lucide-react"
import Poster from "../src/components/Poster"
import ErrorMessage from "../src/components/ErrorMessage"

export default function Index() {
  const router = useRouter()
  const page = router.query.page || 1
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", router.query],
    queryFn: () =>
      fetch(`/api/movies?${new URLSearchParams(router.query)}`).then((res) =>
        res.json(),
      ),
  })

  if (isLoading) {
    return (
      <div className="flex flex-col justify-between">
        <MoviesMenu />
        <MoviesSkeleton />
      </div>
    )
  }

  if (isError) {
    return <ErrorMessage />
  }
  const movies = data[0].movies
  const totalPages = data[0].info.totalPages

  return (
    <div className="flex flex-col justify-between">
      <MoviesMenu />
      <ul
        className="p-5 flex flex-wrap justify-center items-center gap-2 gap-y-0"
        aria-label="movies"
      >
        {movies.length === 0 ? (
          <li className="h-100">
            <h1 className="font-bold text-lg">No results found</h1>
          </li>
        ) : (
          movies.map((movie) => (
            <Tooltip>
              <li key={movie._id} className="h-63 lg:h-90 w-42 lg:w-60">
                <TooltipTrigger>
                  <Link href={`/movies/${movie._id}`} className="text-center">
                    <Poster src={movie.poster} alt={movie.title} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent className="flex flex-col items-center justify-center">
                  <p>{movie.title}</p>
                  <p>
                    {movie.released && new Date(movie.released).getFullYear()}
                  </p>
                  <div className="flex items-center">
                    <p>{movie.imdb.rating}</p>
                    <Star color="goldenrod" fill="goldenrod" size={12} />
                  </div>
                </TooltipContent>
              </li>
            </Tooltip>
          ))
        )}
      </ul>
      <PaginationWrap router={router} totalPages={totalPages} />
    </div>
  )
}
