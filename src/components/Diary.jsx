import DiaryRow from "./DiaryRow"
import ListHeading from "./ListHeading"
import ListHeadingTitle from "./ListHeadingTitle"
import PaginationWrap from "./PaginationWrap"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import Total from "./Total"

const Diary = ({ data, sortKey }) => {
  const sortOptions = { monthly: "Monthly", yearly: "Yearly" }
  const sortBy = sortKey === "yearly" ? "yearly" : "monthly"
  return (
    <div>
      <ListHeading>
        <ListHeadingTitle title="Diary Logs">
          <Total total={data.info.total} label="Total logs" />
        </ListHeadingTitle>
        <SelectSortBy
          value={sortBy}
          selectedValue={sortOptions[sortBy]}
          title="Group logs"
          options={sortOptions}
        />
        <SortOrderToggle />
      </ListHeading>
      {data.movies?.length > 0 ? (
        <>
          <ul className="flex flex-col gap-5 justify-end w-full">
            {data.movies.map((row) => (
              <DiaryRow data={row} group={sortBy} />
            ))}
          </ul>
          <div className="mt-4">
            {data.info.totalPages > 1 && (
              <PaginationWrap totalPages={data.info.totalPages} />
            )}
          </div>
        </>
      ) : (
        <p>No logs yet.</p>
      )}
    </div>
  )
}

export default Diary
