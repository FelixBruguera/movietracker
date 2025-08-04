import { useRouter } from "next/router"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import ListDialog from "./ListDialog"
import MoviesMenuItem from "./MoviesMenuItem"
import { authClient } from "@/lib/auth-client.ts"

const ListsMenu = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const sortOptions = {
    followers: "Followers",
    date: "Creation date",
    movies: "Movies",
  }
  const sort = router.query.sortBy || "movies"
  const filters = { "Your lists": "user", Following: "following" }
  const handleFilter = (newValue) => {
    const value = filters[newValue]
    if (router.query.filter === value) {
      const { filter, ...newQuery } = router.query
      router.push({ query: { ...newQuery, page: 1 } })
    } else {
      router.push({ query: { ...router.query, filter: value, page: 1 } })
    }
  }
  return (
    <div className="flex items-center w-full px-9">
      <div className="lg:w-8/10">
        <ul className="hidden lg:flex w-fit items-center justify-center gap-5 lg:justify-between">
          {Object.keys(filters).map((filter) => (
            <li key={filter}>
              <MoviesMenuItem
                title={filter}
                onClick={handleFilter}
                isActive={router.query.filter === filters[filter]}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="w-1/10 flex items-center justify-end">
        {session && <ListDialog />}
      </div>
      <div className="flex items-center justify-end w-full lg:w-fit">
        <SelectSortBy
          value={sort}
          selectedValue={sortOptions[sort]}
          title="Sort Movies"
          options={sortOptions}
        />
        <SortOrderToggle />
      </div>
    </div>
  )
}

export default ListsMenu
