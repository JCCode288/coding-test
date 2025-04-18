import * as rc from "randomcolor";
import { formatCurrency } from "@/utils/currency";

export function dealChartParser(deals) {
   const recap = {
      total_valuation: 0,
   };

   const status = new Set();

   for (const deal of deals) {
      recap.total_valuation += deal.value;
      status.add(deal.status);

      if (!recap[deal.status])
         recap[deal.status] = {
            count: 0,
            valuation: 0,
         };

      recap[deal.status].count++;
      recap[deal.status].valuation += deal.value;
   }

   const status_chart = [];
   const colors = rc({
      hue: "green",
      count: status.size,
   });

   const chart_config = {
      valuation: {
         label: "Valuation",
      },
   };

   let i = 0;
   let maxCount = -Infinity;
   let maxIdx = 0;

   status.forEach((stats) => {
      const color = colors[i];

      status_chart.push({
         status: stats,
         valuation: recap[stats].valuation,
         count: recap[stats].count,
         fill: color,
      });

      if (recap[stats].count > maxCount) {
         maxCount = recap[stats].count;
         maxIdx = status_chart.length - 1;
      }

      chart_config[stats] = {
         label: stats,
      };
      i++;
   });

   return {
      data: status_chart,
      config: chart_config,
      tag: "Total Valuation",
      tag_val: `$ ${formatCurrency(recap.total_valuation)}`,
      data_key: "count",
      name_key: "status",
      active_idx: maxIdx,
   };
}
