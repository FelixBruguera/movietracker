import { Button } from "@/components/ui/button"
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
} from "lucide-react"
import { useRouter } from "next/router"
import MoviesMenuItem from "./MoviesMenuItem"
import MoviesFilters from "./MoviesFilters"
import filtersData from "../../lib/filters.json"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"

const MoviesMenu = () => {
  const router = useRouter()
  const handleSort = (newValue) => {
    router.push({ query: { ...router.query, sortBy: newValue } })
  }
  const handleSortOrder = () => {
    const newValue = router.query.sortOrder === "1" ? -1 : 1
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
  const ranges = filtersData.ranges
  const sort = router.query.sortBy || "imdb.rating"
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
  const isAscending = router.query.sortOrder === "1"
  return (
    <div className="flex items-center w-9/10 mx-auto">
      <ul className="w-7/10 flex items-center justify-between">
        {genres.map((genre) => (
          <li key={genre}>
            <MoviesMenuItem title={genre} onClick={handleGenre} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-evenly w-3/10">
        <MoviesFilters handleFilter={handleFilter} />
        <SelectSortBy
          value={sort}
          selectedValue={ranges[sort]}
          onValueChange={(e) => handleSort(e)}
          title="Sort Movies"
          options={ranges}
        />
        <SortOrderToggle isAscending={isAscending} onClick={handleSortOrder} />
      </div>
    </div>
  )
}

export default MoviesMenu
