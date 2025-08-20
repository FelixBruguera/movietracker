import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  LineChart,
  ComposedChart,
} from "recharts"
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

const LogsByYear = ({ data }) => {
  return (
    <ChartHeading title="Movies watched per year">
      <ResponsiveContainer height={450} width="95%">
        <ComposedChart accessibilityLayer data={data}>
          <CartesianGrid
            vertical={false}
            stroke="#a9aaab"
            strokeOpacity="50%"
          />
          {data.length > 1 ? (
            <Area dataKey="total" radius={5} fill="var(--chart-main)" />
          ) : (
            <Bar
              dataKey="total"
              radius={5}
              fill="var(--chart-main)"
              activeBar={{ fill: "var(--chart-accent" }}
            />
          )}
          <XAxis
            className="text-xs lg:text-sm"
            dataKey="_id"
            tickLine={false}
            tickMargin={5}
          />
          <YAxis tickLine={false} className="text-xs lg:text-sm" />
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartHeading>
  )
}

export default LogsByYear
