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

const DiaryVerticalBarChart = ({ data, title }) => {
  return (
    <ChartHeading title={title}>
      <ChartContainer config={{}} className="h-120 mx-auto w-full lg:w-3/5">
        <BarChart accessibilityLayer data={data} layout="vertical">
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="#a9aaab"
            strokeOpacity="50%"
          />
          <Bar
            dataKey="total"
            radius={3}
            fill="var(--chart-main)"
            activeBar={{ fill: "var(--chart-accent" }}
          />
          <XAxis
            tickLine={false}
            tickMargin={5}
            dataKey="total"
            type="number"
            domain={[0, "dataMax"]}
            style={{ fontSize: "14px"}}
          />
          <YAxis width={120} dataKey="_id" type="category" tickLine={false} style={{ fontSize: "16px"}} />
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
        </BarChart>
      </ChartContainer>
    </ChartHeading>
  )
}

export default DiaryVerticalBarChart
