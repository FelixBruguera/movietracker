import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "./Pagination"
import { useRouter } from "next/router"
import Review from "./Review"
import SortOrderToggle from "./SortOrderToggle"
import { ArrowDownUp } from "lucide-react"
import SelectSortBy from "./SelectSortBy"

export default function Reviews() {
  const router = useRouter()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", router.query],
    queryFn: () =>
      fetch(`/api/reviews?${new URLSearchParams(router.query)}`)
        .then((res) => res.json())
        .then((data) => data[0]),
  })

  const sortOptions = { date: "Date", rating: "Rating" }
  const handleSort = (e) => {
    router.push({ query: { ...router.query, sortBy: e, page: 1 } }, "", {
      scroll: false,
    })
  }
  const handleSortOrder = () => {
    const newValue = router.query.sortOrder === "1" ? -1 : 1
    router.push(
      { query: { ...router.query, sortOrder: newValue, page: 1 } },
      "",
      { scroll: false },
    )
  }
  if (isLoading) {
    return (
      <div className="flex flex-col justify-between">
        <p>Loading...</p>
      </div>
    )
  }

  if (isError) {
    return <span>Error loading movie details.</span>
  }
  const sortBy = router.query.sortBy || "date"

  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl font-semibold w-9/10">Reviews</h2>
        <SelectSortBy
          value={sortBy}
          selectedValue={sortOptions[sortBy]}
          onValueChange={(e) => handleSort(e)}
          title="Sort Reviews"
          options={sortOptions}
        />
        <SortOrderToggle
          isAscending={router.query.sortOrder === "1"}
          onClick={handleSortOrder}
        />
      </div>

      {data.reviews && data.reviews.length > 0 ? (
        <ul className="space-y-4">
          {data.reviews.map((review) => (
            <Review data={review} />
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}

      <div className="mt-4">
        <PaginationWrap
          router={router}
          totalPages={data.info.totalPages}
          pageQueryParam="reviewPage"
        />
      </div>
    </div>
  )
}
