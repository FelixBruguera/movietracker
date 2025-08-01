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
  const filters = ["Your lists", "Following"]
  const handleFilter = (newValue) => {
    if (router.query.filter === newValue) {
      const { genres, ...newQuery } = router.query
      router.push({ query: { ...newQuery, page: 1 } })
    } else {
      router.push({ query: { ...router.query, filter: newValue, page: 1 } })
    }
  }
  return (
    <div className="flex items-center w-full px-9">
      <div className="lg:w-8/10">
        <ul className="hidden lg:flex w-fit items-center justify-center gap-5 lg:justify-between">
          {filters.map((genre) => (
            <li key={genre}>
              <MoviesMenuItem title={genre} onClick={handleFilter} />
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
