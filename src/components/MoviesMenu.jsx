import { useRouter } from "next/router"
import MoviesMenuItem from "./MoviesMenuItem"
import MoviesFilters from "./MoviesFilters"
import filtersData from "../../lib/filters.json"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"

const MoviesMenu = () => {
  const router = useRouter()
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
  return (
    <div className="flex flex-col gap-3 lg:gap-0 lg:flex-row items-center w-9/10 mx-auto">
      <ul className="w-full lg:w-7/10 flex flex-wrap items-center justify-center gap-1 lg:gap-0 lg:justify-between">
        {genres.map((genre) => (
          <li key={genre}>
            <MoviesMenuItem title={genre} onClick={handleGenre} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-evenly w-full lg:w-3/10">
        <MoviesFilters handleFilter={handleFilter} />
        <SelectSortBy
          value={sort}
          selectedValue={ranges[sort]}
          title="Sort Movies"
          options={ranges}
        />
        <SortOrderToggle />
      </div>
    </div>
  )
}

export default MoviesMenu
