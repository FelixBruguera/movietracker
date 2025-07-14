import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "./Pagination"
import { useRouter } from "next/router"
import Review from "./Review"
import SortOrderToggle from "./SortOrderToggle"
import { ArrowDownUp } from "lucide-react"
import SelectSortBy from "./SelectSortBy"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ReviewForm from "./ReviewForm"
import { authClient } from "@/lib/auth-client.ts"

export default function Reviews() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const currentUser = session?.user?.id

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", router.query, currentUser],
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
  const ratingScale = {
    1: "bg-red-400",
    2: "bg-red-300",
    3: "bg-red-200",
    4: "bg-yellow-200",
    5: "bg-yellow-300",
    6: "bg-green-100",
    7: "bg-green-200",
    8: "bg-green-300",
    9: "bg-green-400",
    10: "bg-green-500",
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
  const averageRating =
    data.info.averageRating && Math.ceil(data.info.averageRating)

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <div className="flex items-center gap-3 w-9/10">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          {averageRating && (
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center justify-center">
                  <p
                    className={`px-3 py-1 ${ratingScale[averageRating]} dark:text-black font-bold rounded-lg`}
                  >
                    {averageRating}
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>Average rating</TooltipContent>
            </Tooltip>
          )}
        </div>
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
      <ReviewForm
        previousReview={data.currentUserReview}
        currentUser={currentUser}
      />
      {data.reviews?.length > 0 ? (
        <>
          <ul className="space-y-4">
            {data.reviews.map((review) => (
              <Review data={review} color={ratingScale[review.rating]} />
            ))}
          </ul>
          <div className="mt-4">
            {data.info.totalPages > 1 && (
              <PaginationWrap
                router={router}
                totalPages={data.info.totalPages}
                pageQueryParam="reviewPage"
              />
            )}
          </div>
        </>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )
}
