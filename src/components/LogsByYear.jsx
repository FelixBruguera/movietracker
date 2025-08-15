import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import ChartHeading from "./ChartHeading"
import TooltipItem from "./TooltipItem"
import TooltipWrapper from "./TooltipWrapper"

const CustomTooltip = ({ active, payload, label }) => {
  const isVisible = active && payload && payload.length
  return (
    <TooltipWrapper isVisible={isVisible} label={label}>
      <TooltipItem title="Movies" value={payload[0]?.payload.total} />
    </TooltipWrapper>
  )
}

const RatingsByDecade = ({ data }) => {
  return (
    <ChartHeading title="Movies watched by year">
      <ChartContainer config={{}} className="h-100 mx-auto w-3/4">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid
            vertical={false}
            stroke="#a9aaab"
            strokeOpacity="50%"
          />
          <Bar
            dataKey="total"
            radius={5}
            fill="var(--chart-main)"
            activeBar={{ fill: "var(--chart-accent" }}
          />
          <XAxis dataKey="_id" tickLine={false} tickMargin={5} />
          <YAxis tickLine={false} />
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
        </BarChart>
      </ChartContainer>
    </ChartHeading>
  )
}

export default RatingsByDecade
