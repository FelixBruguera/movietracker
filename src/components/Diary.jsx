import { useRouter } from "next/router"
import DiaryRow from "./DiaryRow"
import ListHeading from "./ListHeading"
import ListHeadingTitle from "./ListHeadingTitle"
import PaginationWrap from "./PaginationWrap"
import SelectSortBy from "./SelectSortBy"
import SortOrderToggle from "./SortOrderToggle"
import Total from "./Total"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ErrorMessage from "./ErrorMessage"
import DiarySkeleton from "./DiarySkeleton"

const Diary = () => {
  const router = useRouter()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["diary", router.query],
    queryFn: () =>
      axios
        .get(`/api/users/${id}/diary?${new URLSearchParams(otherParams)}`)
        .then((response) => response.data[0]),
  })
  if (isLoading) {
    return <DiarySkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const sortOptions = { monthly: "Monthly", yearly: "Yearly" }
  const sortBy = router.query.sortBy || "monthly"
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
          <ul className="flex flex-col gap-5 justify-end w-full max-w-500 mx-auto">
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
