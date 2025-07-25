import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import MovieSearchItem from "./MovieSearchItem"
import MovieSearchSkeleton from "./MovieSearchSkeleton"

const MovieSearch = ({ setSelected }) => {
  const [search, setSearch] = useState("")
  const { data, isLoading, isError } = useDebounce(search)
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
      <Label htmlFor="movie" className="text-stone-600 dark:text-stone-300">
        Movie
      </Label>
      <Input
        type="text"
        id="movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="h-100 w-full flex flex-col gap-3 mt-2">
        {isLoading && <MovieSearchSkeleton />}
        {isError && <li>Something went wrong</li>}
        {data.length > 0
          ? data.map((movie) => (
              <MovieSearchItem movie={movie} setSelected={setSelected} />
            ))
          : !isLoading && search.length > 2 && <li>No Results</li>}
      </ul>
    </form>
  )
}

export default MovieSearch
