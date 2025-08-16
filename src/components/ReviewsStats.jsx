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
      <StatsList title="Rated higher than IMDB">
        <ul className="flex flex-wrap gap-2 items-center justify-evenly">
          {data.higherThanIMDB.map(movie => {
            return (
              <li key={movie._id} className="group">
              <Poster src={movie.poster} alt={movie.title} size="small" />
                <Separator className="bg-zinc-400 dark:bg-stone-600 my-2 group-hover:bg-blue-700 dark:group-hover:bg-blue-700 transition-colors" />
                <div className="flex items-center justify-center gap-1">
                    <p className="font-bold">{movie.rating}</p>
                    <p>vs</p>
                    <p >{movie.imdbRating}</p>
                    <p className=" font-bold text-green-600"> (+{movie.ratingVsImdb.toFixed(2)})</p>
                </div>
            </li>
            )
          })}
        </ul>
      </StatsList>
    </div>
  )
}

export default ReviewsStats
