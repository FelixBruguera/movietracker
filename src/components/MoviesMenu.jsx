import { useRouter } from "next/router"
import MoviesMenuItem from "./MoviesMenuItem"
import MoviesFilters from "./MoviesFilters"
import filtersData from "lib/filters.json"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import { useState } from "react"

const MoviesMenu = () => {
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState(false)
  const handleGenre = (newValue) => {
    if (router.query.genres === newValue) {
      const { genres, ...newQuery } = router.query
      router.push({ query: { ...newQuery, page: 1 } })
    } else {
      router.push({ query: { ...router.query, genres: newValue, page: 1 } })
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
    setFilterOpen(false)
  }
  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center w-full px-9 mx-auto">
      <ul className="hidden lg:flex w-full lg:w-7/10 flex-wrap items-center justify-center gap-1 lg:gap-0 lg:justify-between">
        {genres.map((genre) => (
          <li key={genre}>
            <MoviesMenuItem
              title={genre}
              onClick={handleGenre}
              isActive={router.query.genres === genre}
            />
          </li>
        ))}
      </ul>
      <div className="flex items-start justify-end gap-12 w-full lg:w-3/10">
        <MoviesFilters
          handleFilter={handleFilter}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <div className="flex items-center justify-end gap-2">
          <SelectSortBy
            value={sort}
            selectedValue={ranges[sort]}
            title="Sort Movies"
            options={ranges}
          />
          <SortOrderToggle />
        </div>
      </div>
    </div>
  )
}

export default MoviesMenu
