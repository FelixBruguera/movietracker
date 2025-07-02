import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react"
import { useRouter } from "next/router"
import MoviesMenuItem from "./MoviesMenuItem"
import MoviesFilters from "./MoviesFilters"

const MoviesMenu = () => {
  const router = useRouter()
  const sort = router.query.sortBy || "imdb.rating"
  const handleSort = (newValue) => {
    router.push({ query: { ...router.query, sortBy: newValue } })
  }
  const handleSortOrder = () => {
    const newValue = router.query.sortOrder === "-1" ? 1 : -1
    router.push({ query: { ...router.query, sortOrder: newValue } })
  }
  const handleGenre = (newValue) => {
    if (router.query.genres === newValue) {
      const { genres, ...newQuery } = router.query
      router.push({ query: newQuery })
    } else {
      router.push({ query: { ...router.query, genres: newValue } })
    }
  }
  const ratings = {
    year: "Release  year",
    "imdb.rating": "IMDB Rating",
    metacritic: "Metacritic",
    "tomatoes.critic.rating": "Rotten Tomatoes rating",
    "awards.wins": "Awards won",
    runtime: "Runtime",
  }
  const genres = [
    "Drama",
    "Comedy",
    "Action",
    "Crime",
    "Romance",
    "Western",
    "Documentary",
    "Animation",
  ]
  const handleFilter = (data) => {
    router.push({ query: { ...router.query, ...data, page: 1 } })
  }
  return (
    <div className="flex items-center w-9/10 m-auto">
      <ul className="w-7/10 flex items-center justify-between">
        {genres.map((genre) => (
          <li key={genre}>
            <MoviesMenuItem title={genre} onClick={handleGenre} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-evenly w-3/10">
        <MoviesFilters handleFilter={handleFilter} />
        <Select value={sort} onValueChange={(e) => handleSort(e)}>
          <SelectTrigger
            className="border-1 dark:border-gray-700 dark:bg-stone-900"
            title="Sort by"
          >
            <SelectValue placeholder="IMDB Rating">
              <ArrowDownUp />
              {ratings[sort]}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(ratings).map(([key, value]) => (
              <SelectItem value={key}>{value}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          title={
            router.query.sortOrder === "-1"
              ? "Descending order"
              : "Ascending order"
          }
          onClick={() => handleSortOrder()}
          className="bg-trasnparent border-1 dark:border-gray-700 hover:dark:bg-red-800 hover:cursor-pointer"
        >
          {router.query.sortOrder === "-1" ? (
            <ArrowDownWideNarrow color="white" />
          ) : (
            <ArrowUpWideNarrow color="white" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default MoviesMenu
