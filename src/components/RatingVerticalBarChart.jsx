import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import ChartHeading from "./ChartHeading"
import TooltipItem from "./TooltipItem"
import TooltipWrapper from "./TooltipWrapper"

const CustomTooltip = ({ active, payload, label }) => {
  const isVisible = active && payload && payload.length
  return (
    <TooltipWrapper isVisible={isVisible} label={label}>
      <TooltipItem
        title="Average Rating"
        value={payload[0]?.payload.averageRating.toFixed(2)}
      />
      <TooltipItem title="Movies" value={payload[0]?.payload.total} />
    </TooltipWrapper>
  )
}

const RatingVerticalBarChart = ({ data, title }) => {
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
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </ChartHeading>
  )
}

export default RatingVerticalBarChart
