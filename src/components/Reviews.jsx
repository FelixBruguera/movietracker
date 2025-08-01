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
import Total from "./Total"
import ListHeadingTitle from "./ListHeadingTitle"
import ListHeading from "./ListHeading"
import UserReview from "./UserReview"

export default function Reviews() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const currentUser = session?.user

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", router.query, currentUser?.id],
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
  const userReview = data.currentUserReview

  return (
    <div id="reviews" className="max-w-400 mx-auto">
      {userReview && (
        <UserReview
          data={userReview}
          color={ratingScale[userReview.rating]}
          currentUser={currentUser}
          query={router.query}
        />
      )}
      <ListHeading>
        <ListHeadingTitle title="Reviews">
          <Total total={totalReviews} label="Total Reviews" />
          {averageRating && (
            <AverageRating
              rating={averageRating}
              color={ratingScale[averageRating]}
            />
          )}
        </ListHeadingTitle>
        <SelectSortBy
          value={sortBy}
          selectedValue={sortOptions[sortBy]}
          title="Sort Reviews"
          options={sortOptions}
        />
        <SortOrderToggle />
      </ListHeading>
      {!userReview && session && (
        <ReviewForm
          previousReview={data.currentUserReview}
          currentUser={currentUser}
        />
      )}
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
