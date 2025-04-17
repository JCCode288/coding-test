"use client";

import { useContext } from "react";
import { ModalContext } from "./modal";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import DealBadge from "./deals-badge";

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
               <div>
                  {reps.deals.map((dl) => (
                     <div>
                        <div>{dl.client}</div>
                        <div>{dl.value}</div>
                        <div>
                           <DealBadge status={dl.status} />
                        </div>
                     </div>
                  ))}
               </div>
               <div>
                  {reps.clients.map((cl) => (
                     <div>
                        <div>{cl.name}</div>
                        <div>{cl.industry}</div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>
      </section>
   );
}
