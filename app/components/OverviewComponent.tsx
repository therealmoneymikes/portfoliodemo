import styles from "../config/styles";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@radix-ui/themes";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
} from "../components/ui/chart";

//It doesn't preserve the original shape of the object as the satisfies keyword does.
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: styles.indigoFull,
  },
  mobile: {
    label: "Mobile",
    color: styles.indigoTailwind,
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "August", desktop: 412, mobile: 410 },
  { month: "September", desktop: 124, mobile: 104 },
  { month: "October", desktop: 241, mobile: 401 },
  { month: "November", desktop: 229, mobile: 400 },
  { month: "December", desktop: 290, mobile: 391 },
];

const OverviewComponent = () => {
  const [showMobile, setShowMobile] = useState<boolean | null>(null);
  return (
    <motion.div className="flex flex-col  border border-gray-800 max-h-full max-w-full">
      <motion.div className="flex flex-row items-center justify-between">
        <motion.h1 className="text-white p-3 text-2xl mx-3">Overview</motion.h1>
        {/* Button Div */}
        <motion.div className="flex flex-row space-x-2 items-center mr-3">
          <Button
            className="hover:cursor-pointer"
            onClick={() => {
              if (showMobile === false || showMobile === null) {
                setShowMobile(true);
              } else {
                setShowMobile(false);
              }
            }}
          >
            {showMobile ? "View Desktop" : "View Mobile"}
          </Button>
          <Button
            className="hover:cursor-pointer"
            color="blue"
            variant="classic"
            onClick={() => setShowMobile(null)}
          >
            View All
          </Button>
        </motion.div>
      </motion.div>

      <motion.div className="flex flex-row items-center">
        <ChartContainer config={chartConfig} className="min-h-[100px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              contentStyle={{
                backgroundColor: "transparent",
                border: "1px solid black",
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            {(!showMobile || showMobile === null) && (
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
            )}
            {(showMobile || showMobile === null) && (
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={6} />
            )}
          </BarChart>
        </ChartContainer>
      </motion.div>
    </motion.div>
  );
};

export default OverviewComponent;
