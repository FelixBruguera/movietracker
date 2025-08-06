import ListHeading from "./ListHeading"
import ListHeadingTitle from "./ListHeadingTitle"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import Total from "./Total"
import ListCard from "src/components/ListCard"
import PaginationWrap from "src/components/PaginationWrap"

const ProfileListsContent = ({ data }) => {
  const sortOptions = { date: "Creation date" }
  const sort = "date"
  const lists = data.lists
  return (
    <div>
      <ListHeading>
        <ListHeadingTitle title="Public lists">
          <Total total={data.info.total} label="Total Public lists" />
        </ListHeadingTitle>
        <SelectSortBy
          value={sort}
          selectedValue={sortOptions[sort]}
          title="Sort Lists"
          options={sortOptions}
        />
        <SortOrderToggle />
      </ListHeading>
      <ul
        className="flex flex-wrap w-full items-center justify-start gap-5"
        aria-label="lists"
      >
        {lists?.map((list) => (
          <ListCard key={list._id} list={list} />
        ))}
      </ul>
      <div className="mt-4">
        {data.info.totalPages > 1 && (
          <PaginationWrap totalPages={data.info.totalPages} />
        )}
      </div>
    </div>
  )
}

export default ProfileListsContent
