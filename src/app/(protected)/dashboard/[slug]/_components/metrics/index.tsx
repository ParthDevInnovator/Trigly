'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

type Props = {}

import { useQueryAutomations } from '@/hooks/user-queries'

const chartConfig = {
  desktop: {
    label: 'desktop',
    color: 'hsl(var(--chart-1))',
  },
}

const Chart = (props: Props) => {
  const { data } = useQueryAutomations()

  // Generate dynamic chart data based on automation creation items or interactions (we will just plot something based on their automations)
  const chartData = [
    { month: 'January', desktop: 0 },
    { month: 'February', desktop: 0 },
    { month: 'March', desktop: 0 },
    { month: 'April', desktop: 0 },
    { month: 'May', desktop: 0 },
    { month: 'June', desktop: 0 },
  ]

  if (data?.data) {
    chartData[5].desktop = data.data.reduce((acc, curr) => acc + (curr.listener?.dmCount || 0) + (curr.listener?.commentCount || 0), 0)
  }
  return (
    <Card className="border-none p-0">
      <CardContent className="p-0">
        <ResponsiveContainer
          height={300}
          width={'100%'}
        >
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default Chart