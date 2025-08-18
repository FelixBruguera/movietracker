import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ErrorMessage from "./ErrorMessage"
import axios from "axios"
import DiaryVerticalBarChart from "./DiaryVerticalBarChart"
import StatsSkeleton from "./StatsSkeleton"
import LogsByYear from "./LogsByYear"
import StatsList from "./StatsList"
import MonthlyTopItem from "./MonthlyTopItem"
import MostWatchedMovie from "./MostWatchedMovie"

const DiaryStats = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["diaryStats", router.query],
    queryFn: () =>
      axios
        .get(`/api/users/${id}/stats/diary`)
        .then((response) => response.data[0]),
  })
  if (isLoading) {
    return <StatsSkeleton />
  }

  if (isError) {
    return <ErrorMessage />
  }
  const monthlyMax = data.monthly[0]?.total
  return (
    <div>
      <LogsByYear data={data.yearly} />
      {monthlyMax && (
        <StatsList title="Most movies watched in a month" width="wide">
          {data.monthly.map((item) => (
            <MonthlyTopItem data={item} max={monthlyMax} />
          ))}
        </StatsList>
      )}
      {data.byMovie.length > 0 && (
        <StatsList title="Most watched movies" width="wide">
          {data.byMovie.map((item) => (
            <MostWatchedMovie movie={item} />
          ))}
        </StatsList>
      )}
      <DiaryVerticalBarChart data={data.byGenre} title="Most watched genres" />
      <DiaryVerticalBarChart
        data={data.byDirector}
        title="Most watched directors"
      />
      <DiaryVerticalBarChart data={data.byCast} title="Most watched actors" />
    </div>
  )
}

export default DiaryStats
