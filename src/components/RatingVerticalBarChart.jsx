import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import ChartHeading from "./ChartHeading"
import { RatingCustomTooltip } from "./RatingsByDecade"

const RatingVerticalBarChart = ({ data, title }) => {
  if (data.length < 1) {
    return null
  }
  return (
    <ChartHeading title={title}>
      <ResponsiveContainer width="90%" height={500}>
        <BarChart accessibilityLayer data={data} layout="vertical">
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="#a9aaab"
            strokeOpacity="50%"
          />
          <Bar
            dataKey="averageRating"
            radius={5}
            fill="var(--chart-main)"
            activeBar={{ fill: "var(--chart-accent" }}
          />
          <XAxis
            tickLine={false}
            tickMargin={5}
            dataKey="averageRating"
            type="number"
            domain={[0, 10]}
            tickCount={10}
            className="text-xs lg:text-sm"
          />
          <YAxis
            width={100}
            dataKey="_id"
            type="category"
            tickLine={false}
            className="text-xs lg:text-sm"
          />
          <ChartTooltip cursor={false} content={<RatingCustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </ChartHeading>
  )
}

export default RatingVerticalBarChart
