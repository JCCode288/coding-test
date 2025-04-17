"use client";

import { useContext } from "react";
import { ModalContext } from "./modal";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardTitle,
} from "./ui/card";
import DealBadge from "./deals-badge";
import { formatCurrency } from "@/utils/currency";
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { formatDate } from "@/utils/date";

export default function RepsDetailCard({ reps }) {
   const { setIsOpen } = useContext(ModalContext);

   const handleClose = () => {
      if (setIsOpen) setIsOpen(() => false);
   };

   return (
      <section className="flex-1">
         <Card className="p-4">
            <CardTitle>{reps.name}</CardTitle>
            <CardDescription>
               {reps.role} - {reps.region}
            </CardDescription>
            <CardContent className="gap-2 flex flex-col">
               <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                     <AccordionTrigger className="text-lg font-medium text-gray-800">
                        Latest Deal
                     </AccordionTrigger>
                     <AccordionContent className="flex flex-col gap-2">
                        {reps.deals.map((dl) => (
                           <Card className="p-4">
                              <CardTitle className="flex gap-2 items-center">
                                 <h3>{dl.client}</h3>
                                 <Link href={"/deals/" + dl.id}>
                                    <DealBadge status={dl.status} />
                                 </Link>
                              </CardTitle>
                              <CardContent>
                                 <div className="flex w-fit gap-2 items-center mb-2">
                                    <h4 className="text-sm">Valuation</h4>
                                    <h5 className="text-md">
                                       <strong className="flex gap-1">
                                          <span>$</span>
                                          {formatCurrency(dl.value)}
                                       </strong>
                                    </h5>
                                 </div>
                              </CardContent>
                              <CardFooter>
                                 <p className="flex-1 text-xs text-end">
                                    Last Update at{" "}
                                    {formatDate(dl.updated_date)}
                                 </p>
                              </CardFooter>
                           </Card>
                        ))}
                     </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                     <AccordionTrigger className="text-lg font-medium text-gray-800">
                        Current Clients
                     </AccordionTrigger>
                     <AccordionContent className="flex flex-col gap-2">
                        {reps.clients.map((cl) => (
                           <Card className="p-4">
                              <CardTitle className="flex gap-2 items-center">
                                 <Link href={"/clients/" + cl.id}>
                                    <h3>{cl.name}</h3>
                                 </Link>
                              </CardTitle>
                              <CardContent>
                                 <div className="flex w-fit gap-2 items-center mb-2">
                                    <h4 className="text-md">
                                       {cl.industry}
                                    </h4>
                                    <h5 className="text-sm">Industry</h5>
                                 </div>
                              </CardContent>
                              <CardFooter>
                                 <p className="flex-1 text-xs text-end">
                                    Last Update at{" "}
                                    {formatDate(cl.updated_date)}
                                 </p>
                              </CardFooter>
                           </Card>
                        ))}
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </CardContent>
         </Card>
      </section>
   );
}
