"use client";

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
import ChartPie from "./chart-pie";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export default function ClientsDetail({ client }) {
   return (
      <section className="flex-1">
         <Card className="p-4">
            <CardTitle>{client.name}</CardTitle>
            <CardDescription>{client.contact}</CardDescription>
            <CardDescription>{client.industry}</CardDescription>
            <CardContent className="gap-2 flex flex-col">
               {client.chart && (
                  <ChartPie
                     title="Performance"
                     desc="Representative Deals performance"
                     chartData={client.chart}
                  />
               )}

               <Accordion type="single" collapsible>
                  {client.deals && (
                     <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-medium text-gray-800">
                           Latest Deal
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-2">
                           {client.deals.map((dl) => (
                              <Card key={dl.id} className="p-4">
                                 <CardTitle className="flex gap-2 items-center">
                                    <h3>{dl.client}</h3>
                                    <Link href={"/deals/" + dl.id}>
                                       <DealBadge status={dl.status} />
                                    </Link>
                                 </CardTitle>
                                 <CardContent className="flex flex-row justify-between">
                                    <div className="flex w-fit gap-2 items-center mb-2">
                                       <h4 className="text-sm">
                                          Valuation
                                       </h4>
                                       <h5 className="text-md">
                                          <strong className="flex gap-1">
                                             <span>$</span>
                                             {formatCurrency(dl.value)}
                                          </strong>
                                       </h5>
                                    </div>
                                    <div>
                                       <Link href={"/deals/" + dl.id}>
                                          <Button
                                             variant="ghost"
                                             className="cursor-pointer"
                                          >
                                             Check Deal <ArrowRight />
                                          </Button>
                                       </Link>
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
                  )}

                  <AccordionItem value="item-2">
                     <AccordionTrigger className="text-lg font-medium text-gray-800">
                        Representative
                     </AccordionTrigger>
                     <AccordionContent className="flex flex-col gap-2">
                        {client.reps && (
                           <Card className="p-4">
                              <CardTitle className="flex gap-2 items-center">
                                 <h3>{client.reps.name}</h3>
                              </CardTitle>
                              <CardContent>
                                 <div className="flex w-fit gap-1 items-center mb-2">
                                    <h4 className="text-md">
                                       {client.reps.role}
                                    </h4>
                                 </div>
                                 <div className="flex w-fit gap-1 items-center mb-2">
                                    <h4 className="text-md">
                                       {client.reps.region}
                                    </h4>
                                 </div>
                                 <div className="flex w-fit items-center mb-2">
                                    <p className="flex-1 text-xs text-end">
                                       Joined at{" "}
                                       {formatDate(client.reps.created_at)}
                                    </p>
                                 </div>
                              </CardContent>
                              <CardFooter className="w-full justify-end">
                                 <Link href={"/reps/" + client.reps.id}>
                                    <Button
                                       className="cursor-pointer"
                                       variant="ghost"
                                    >
                                       Check out {client.reps.name}
                                       <ArrowRight />
                                    </Button>
                                 </Link>
                              </CardFooter>
                           </Card>
                        )}
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
            </CardContent>
         </Card>
      </section>
   );
}
