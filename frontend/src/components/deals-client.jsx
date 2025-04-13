"use client";

import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { useState } from "react";
import { Button } from "./ui/button";
import DealsCard from "./deals-card";

export default function DealsClient({ id, children }) {
   const [active, setActive] = useState(() => false);

   return (
      <HoverCard onOpenChange={(open) => setActive(() => open)}>
         <HoverCardTrigger>
            <Button variant="ghost" className="">
               {children}
            </Button>
         </HoverCardTrigger>
         <HoverCardContent>
            {active && <DealsCard id={id} />}
         </HoverCardContent>
      </HoverCard>
   );
}
