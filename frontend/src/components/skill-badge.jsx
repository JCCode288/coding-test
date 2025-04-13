"use client";

import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { useEffect, useState } from "react";
import SkillsDetail from "./skill-detail";

export function SkillBadge({ skill, repsId }) {
   const [isOpen, setIsOpen] = useState(() => false);
   const handleOpen = (open) => {
      setIsOpen(() => open);
   };

   return (
      <HoverCard openDelay={800} onOpenChange={handleOpen}>
         <HoverCardTrigger>
            <Badge
               variant="outline"
               className="border-green-600 bg-green-600 bg-opacity-30 text-green-950 cursor-pointer active:bg-opacity-50"
            >
               {skill.name}
            </Badge>
         </HoverCardTrigger>
         {isOpen && <SkillsDetail repsId={repsId} id={skill.id} />}
      </HoverCard>
   );
}
