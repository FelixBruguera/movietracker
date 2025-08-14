import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ReviewsSkeleton from "./ReviewsSkeleton"
import ErrorMessage from "./ErrorMessage"
import axios from "axios"
import RatingsByDecade from "./RatingsByDecade"
import VerticalBarChart from "./VerticalBarChart"


const ReviewsStats = () => {
  const router = useRouter()
  const { id, ...otherParams } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviewsStats", router.query],
    queryFn: () =>
      axios
        .get(`/api/users/${id}/stats/reviews`)
        .then((response) => response.data[0]),
  })
  if (isLoading) {
    return <ReviewsSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <div>
        <RatingsByDecade data={data.byDecade} />
        <VerticalBarChart data={data.byGenre} title="Top rated genres (Min. 2 movies)"/>
        <VerticalBarChart data={data.byDirectors} title="Top rated directors (Min. 2 movies)"/>
    </div>
  )
}

export default ReviewsStats