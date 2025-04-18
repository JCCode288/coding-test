"use client";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import DealBadge from "./deals-badge";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function DealsDetail({ deal }) {
   return (
      <Card className="p-8">
         <CardTitle>
            <h3>{deal.client}</h3>
         </CardTitle>
         <div className="grid grid-rows-3 grid-flow-col gap-2 items-center">
            <CardDescription>
               <h4>Deal Value</h4>
               <h3 className="flex gap-1">
                  <span>$</span>
                  {formatCurrency(deal.value)}
               </h3>
            </CardDescription>
            <CardDescription>
               <h4>Deal Status</h4>
               <DealBadge status={deal.status} />
            </CardDescription>
            <CardDescription>
               <h4>Started At</h4>
               <h3>{formatDate(deal.created_at)}</h3>
            </CardDescription>
            <CardDescription>
               <h4>Last Update</h4>
               <h3>{formatDate(deal.update_at)}</h3>
            </CardDescription>
         </div>

         <div className="flex flex-1 flex-col justify-between gap-2">
            {/* Representative Section */}
            <section className="flex-1">
               <Card className="flex h-full w-full flex-row flex-wrap gap-4 p-4">
                  <div className="flex-col">
                     <CardDescription>
                        <h4>Representative Name</h4>
                     </CardDescription>
                     <CardContent>
                        <h3>{deal.reps.name}</h3>
                     </CardContent>
                  </div>
                  <div className="flex-col">
                     <CardDescription>
                        <h4>Representative Role</h4>
                     </CardDescription>
                     <CardContent>
                        <h3>{deal.reps.role}</h3>
                     </CardContent>
                  </div>
                  <div className="flex-col">
                     <CardDescription>
                        <h4>Representative Region</h4>
                     </CardDescription>
                     <CardContent>
                        <h3>{deal.reps.region}</h3>
                     </CardContent>
                  </div>
                  <div className="flex-col">
                     <CardDescription>
                        <h4>Representative Joined</h4>
                     </CardDescription>
                     <CardContent>
                        <h3>{formatDate(deal.reps.created_at)}</h3>
                     </CardContent>
                  </div>
                  <div className="flex w-full justify-start items-center">
                     <Button variant="ghost">
                        <Link
                           className="flex gap-1"
                           href={"/reps/" + deal.reps.id}
                        >
                           <ArrowLeft />
                           <span>See Representative</span>
                        </Link>
                     </Button>
                  </div>
               </Card>
            </section>
            {/* Representative Section */}

            {/* Client Section */}
            <section className="flex-1">
               {deal.client_joined && (
                  <Card className="flex h-full w-full flex-row flex-wrap gap-2 p-4">
                     <div className="flex-col">
                        <CardDescription>
                           <h4>Client Industry</h4>
                        </CardDescription>
                        <CardContent>
                           <h3>{deal.client_joined.industry}</h3>
                        </CardContent>
                     </div>
                     <div className="flex-col">
                        <CardDescription>
                           <h4>Client Contact</h4>
                        </CardDescription>
                        <CardContent>
                           <h3>{deal.client_joined.contact}</h3>
                        </CardContent>
                     </div>
                     <div className="flex-col">
                        <CardDescription>
                           <h4>Client Joined</h4>
                        </CardDescription>
                        <CardContent>
                           <h3>
                              {formatDate(deal.client_joined.created_at)}
                           </h3>
                        </CardContent>
                     </div>
                     <div className="flex-col">
                        <CardDescription>
                           <h4>Joined at</h4>
                        </CardDescription>
                        <CardContent>
                           <h3>
                              {formatDate(deal.client_joined.created_at)}
                           </h3>
                        </CardContent>
                     </div>
                     <div className="flex w-full justify-end items-center">
                        <Button variant="ghost">
                           <Link
                              className="flex gap-1"
                              href={"/clients/" + deal.client_joined.id}
                           >
                              <span>See Client</span>
                              <ArrowRight />
                           </Link>
                        </Button>
                     </div>
                  </Card>
               )}
               {!deal.client_joined && (
                  <Card>
                     <CardContent>
                        No futher detail about client because client is not
                        yet joined
                     </CardContent>
                  </Card>
               )}
            </section>
            {/* Client Section */}
         </div>
      </Card>
   );
}
