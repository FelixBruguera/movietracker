import reviewsInfo from "@/lib/reviews.json"
import AverageRating from "./AverageRating"
import ProfileReview from "./ProfileReview"
import SortOrderToggle from "./SortOrderToggle"
import SelectSortBy from "./SelectSortBy"
import PaginationWrap from "./PaginationWrap"
import Total from "./Total"
import ListHeading from "./ListHeading"
import ListHeadingTitle from "./ListHeadingTitle"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ErrorMessage from "./ErrorMessage"
import axios from "axios"
import ReviewsSkeleton from "./ReviewsSkeleton"

const ProfileReviews = () => {
  const router = useRouter()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userReviews", router.query],
    queryFn: () =>
      axios
        .get(`/api/users/${id}/reviews?${new URLSearchParams(otherParams)}`)
        .then((response) => response.data[0]),
  })
  if (isLoading) {
    return <ReviewsSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const sortOptions = reviewsInfo.sortOptions
  const ratingScale = reviewsInfo.ratingScale
  const sortBy = router.query.sortBy || "date"
  const averageRating =
    data.info.averageRating && Math.ceil(data.info.averageRating)

  return (
    <div>
      <ListHeading>
        <ListHeadingTitle title="Reviews">
          <Total total={data.info.totalReviews} label="Total Reviews" />
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
      {data.reviews?.length > 0 ? (
        <>
          <ul className="space-y-4">
            {data.reviews.map((review) => (
              <ProfileReview
                key={review._id}
                data={review}
                color={ratingScale[review.rating]}
              />
            ))}
          </ul>
          <div className="mt-4">
            {data.info.totalPages > 1 && (
              <PaginationWrap totalPages={data.info.totalPages} />
            )}
          </div>
        </>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )
}

export default ProfileReviews
