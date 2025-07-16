import reviewsInfo from "@/lib/reviews.json"
import AverageRating from "./AverageRating"
import ProfileReview from "./ProfileReview"
import SortOrderToggle from "./SortOrderToggle"
import SelectSortBy from "./SelectSortBy"
import PaginationWrap from "./PaginationWrap"
import TotalReviews from "./TotalReviews"

const ProfileReviews = ({ data, params }) => {
  const sortOptions = reviewsInfo.sortOptions
  const ratingScale = reviewsInfo.ratingScale
  const sortBy = params.sortBy || "date"
  const averageRating =
    data.info.averageRating && Math.ceil(data.info.averageRating)

  return (
    <div>
      <div className="flex justify-between items-center my-8 lg:my-5">
        <div className="flex items-center gap-3 w-9/10">
          <h2 className="text-3xl font-semibold">Reviews</h2>
          <TotalReviews total={data.info.totalReviews} />
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
      {data.reviews?.length > 0 ? (
        <>
          <ul className="space-y-4">
            {data.reviews.map((review) => (
              <ProfileReview data={review} color={ratingScale[review.rating]} />
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
