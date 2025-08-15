import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ErrorMessage from "./ErrorMessage"
import axios from "axios"
import RatingsByDecade from "./RatingsByDecade"
import RatingVerticalBarChart from "./RatingVerticalBarChart"
import StatsSkeleton from "./StatsSkeleton"

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
    return <StatsSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  return (
    <div>
      <RatingsByDecade data={data.byDecade} />
      <RatingVerticalBarChart
        data={data.byGenre}
        title="Best rated genres (Min. 2 movies)"
      />
      <RatingVerticalBarChart
        data={data.byDirectors}
        title="Best rated directors (Min. 2 movies)"
      />
    </div>
  )
}

export default ReviewsStats
