import { useRouter } from "next/router"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"

const UsersMenu = () => {
  const router = useRouter()
  const sortOptions = { reviews: "Reviews", date: "Join Date" }
  const sort = router.query.sortBy || "reviews"
  return (
    <div className="flex items-center w-full">
      <div className="flex items-center justify-end w-full lg:w-full px-5">
        <SelectSortBy
          value={sort}
          selectedValue={sortOptions[sort]}
          title="Sort Users"
          options={sortOptions}
        />
        <SortOrderToggle />
      </div>
    </div>
  )
}

export default UsersMenu
