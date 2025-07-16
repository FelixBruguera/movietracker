import { useQuery } from "@tanstack/react-query"
import PaginationWrap from "./PaginationWrap"
import { useRouter } from "next/router"
import Review from "./Review"
import SortOrderToggle from "./SortOrderToggle"
import SelectSortBy from "./SelectSortBy"
import ReviewForm from "./ReviewForm"
import { authClient } from "@/lib/auth-client.ts"
import ReviewsSkeleton from "./ReviewsSkeleton"
import ErrorMessage from "./ErrorMessage"
import reviewsInfo from "@/lib/reviews.json"
import AverageRating from "./AverageRating"
import TotalReviews from "./TotalReviews"

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

  const sortOptions = reviewsInfo.sortOptions
  const ratingScale = reviewsInfo.ratingScale

  if (isLoading) {
    return <ReviewsSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const sortBy = router.query.sortBy || "date"
  const averageRating =
    data.info.averageRating && Math.ceil(data.info.averageRating)
  const totalReviews = data.info.totalReviews

  return (
    <div id="reviews">
      <div className="flex justify-between items-center my-8 lg:my-5">
        <div className="flex items-center gap-3 w-9/10">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          {totalReviews > 0 && <TotalReviews total={totalReviews} />}
          {averageRating && (
            <AverageRating
              rating={averageRating}
              color={ratingScale[averageRating]}
            />
          )}
        </div>
        <SelectSortBy
          value={sortBy}
          selectedValue={sortOptions[sortBy]}
          title="Sort Reviews"
          options={sortOptions}
        />
        <SortOrderToggle />
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
                totalPages={data.info.totalPages}
                scrollTarget="reviews"
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
