"use client";

import { Pie, PieChart, Sector, Cell } from "recharts";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   ChartContainer,
   ChartLegend,
   ChartLegendContent,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";

export default function ChartPie({ chartData, title, desc, footerDesc }) {
   console.log(chartData);
   const { data, config, tag, tag_val, data_key, name_key, active_idx } =
      chartData;

   return (
      <Card className="flex flex-col">
         <CardHeader className="items-center pb-0">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{desc}</CardDescription>
         </CardHeader>
         <CardContent className="flex-1 pb-0">
            <ChartContainer
               config={config}
               className="mx-auto aspect-square max-h-52"
            >
               <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Pie
                     data={data}
                     dataKey={data_key}
                     nameKey={name_key}
                     innerRadius={35}
                     strokeWidth={5}
                     activeIndex={active_idx}
                     activeShape={({ outerRadius = 0, ...props }) => (
                        <Sector
                           {...props}
                           outerRadius={outerRadius + 10}
                        />
                     )}
                  ></Pie>
               </PieChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
               {tag} {tag_val}
            </div>
            <div className="leading-none text-muted-foreground">
               {footerDesc}
            </div>
         </CardFooter>
      </Card>
   );
}
