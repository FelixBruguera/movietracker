import { useRouter } from "next/router"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import ListDialog from "./ListDialog"
import MoviesMenuItem from "./MoviesMenuItem"
import { authClient } from "@/lib/auth-client.ts"

const ListsMenu = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const sortOptions = { followers: "Followers", date: "Creation date" }
  const sort = router.query.sortBy || "date"
  const filters = ['Your lists', 'Following']
const handleFilter = (newValue) => {
    if (router.query.filter === newValue) {
      const { genres, ...newQuery } = router.query
      router.push({ query: {...newQuery, page: 1 } })
    } else {
      router.push({ query: { ...router.query, filter: newValue, page: 1 } })
    }
  }
  return (
    <div className="flex items-center w-full">
      <div aria-hidden={true} className="w-6/10">
        <ul className="hidden lg:flex w-full lg:w-fit flex-wrap items-center justify-center gap-5 lg:justify-between">
            {filters.map((genre) => (
            <li key={genre}>
                <MoviesMenuItem title={genre} onClick={handleFilter} />
            </li>
            ))}
        </ul>
      </div>
      <div className="w-1/10 flex items-center justify-end">
      { session && <ListDialog /> }
      </div>
      <div className="flex items-center justify-evenly w-full lg:w-3/10">
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
