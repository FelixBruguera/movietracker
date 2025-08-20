import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ErrorMessage from "./ErrorMessage"
import axios from "axios"
import RatingsByDecade from "./RatingsByDecade"
import RatingVerticalBarChart from "./RatingVerticalBarChart"
import StatsSkeleton from "./StatsSkeleton"
import StatsList from "./StatsList"
import Poster from "./Poster"
import { Separator } from "@/components/ui/separator"
import RatingDifference from "./RatingDifference"

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
      {data.higherThanIMDB.length > 0 && (
        <StatsList title="Rated higher than IMDB">
          {data.higherThanIMDB.map((movie) => (
            <RatingDifference movie={movie} isRatedHigher={true} />
          ))}
        </StatsList>
      )}
      {data.lowerThanIMDB.length > 0 && (
        <StatsList title="Rated lower than IMDB">
          {data.lowerThanIMDB.map((movie) => (
            <RatingDifference movie={movie} isRatedHigher={false} />
          ))}
        </StatsList>
      )}
    </div>
  )
}

export default ReviewsStats
