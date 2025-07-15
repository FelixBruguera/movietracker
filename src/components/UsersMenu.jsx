import { useRouter } from "next/router"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"

const UsersMenu = () => {
  const router = useRouter()
  const sortOptions = { reviews: "Reviews", date: "Join Date" }
  const sort = router.query.sortBy || "reviews"
  return (
    <div className="flex items-center w-full">
      <span aria-hidden={true} className="w-7/10"></span>
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

export default UsersMenu
