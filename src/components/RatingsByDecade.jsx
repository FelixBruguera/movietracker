import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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

const RatingsByDecade = ({ data }) => {
  return (
    <ChartHeading title="Average rating by decade">
      <ChartContainer config={{}} className="h-100 mx-auto w-full lg:w-2/4">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid
            vertical={false}
            stroke="#a9aaab"
            strokeOpacity="50%"
          />
          <Bar
            dataKey="averageRating"
            radius={5}
            fill="var(--chart-main)"
            activeBar={{ fill: "var(--chart-accent" }}
          />
          <XAxis dataKey="_id" tickLine={false} tickMargin={5} style={{ fontSize: "14px"}} />
          <YAxis tickLine={false} domain={[0, 10]} tickCount={10} style={{ fontSize: "16px"}} />
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
        </BarChart>
      </ChartContainer>
    </ChartHeading>
  )
}

export default RatingsByDecade
