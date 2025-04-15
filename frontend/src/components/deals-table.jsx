"use client";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableFooter,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { DealStatus } from "@/utils/constants/deal.status";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import { useMemo } from "react";
import DealBadge from "./deals-badge";
import DealsClient from "./deals-client";
import Link from "next/link";

export default function DealsTable({ deals }) {
   const totalWon = useMemo(() =>
      deals?.reduce((prev, curr) => {
         if (curr?.status === DealStatus.WON) prev += curr?.value;
         return prev;
      }, 0)
   );

   return (
      <Table>
         {/* Bottom Caption */}
         <TableCaption>List of recent deals.</TableCaption>
         {/* Bottom Caption */}

         {/* Table Header */}
         <TableHeader>
            <TableRow>
               <TableHead>Representative</TableHead>
               <TableHead>Status</TableHead>
               <TableHead>Client Name</TableHead>
               <TableHead>Last Update</TableHead>
               <TableHead className="text-right">Value</TableHead>
            </TableRow>
         </TableHeader>
         {/* Table Header */}

         {/* Table Body */}
         <TableBody>
            {deals?.map((dl) => (
               <TableRow key={dl?.id}>
                  <TableCell className="font-medium">
                     <Link href={"/reps/" + dl?.reps?.id}>
                        {dl?.reps?.name}
                     </Link>
                  </TableCell>
                  <TableCell>
                     <Link href={"/deals/" + dl.id}>
                        <DealBadge status={dl?.status} />
                     </Link>
                  </TableCell>
                  <TableCell>
                     <DealsClient id={dl?.id}>{dl?.client}</DealsClient>
                  </TableCell>
                  <TableCell>{formatDate(dl?.updated_at)}</TableCell>
                  <TableCell className="flex flex-1 justify-between">
                     <span>$</span>
                     <p className="text-right">
                        {formatCurrency(dl?.value)}
                     </p>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
         {/* Table Body */}

         {/* Table Footer */}
         <TableFooter>
            <TableRow>
               <TableCell colSpan={4}>Total Won</TableCell>
               <TableCell className="flex flex-1 justify-between">
                  <span>$</span>
                  <p className="text-right">{formatCurrency(totalWon)}</p>
               </TableCell>
            </TableRow>
         </TableFooter>
         {/* Table Footer */}
      </Table>
   );
}
