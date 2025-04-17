"use client";

import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardTrigger } from "./ui/hover-card";
import { useState } from "react";
import SkillsDetail from "./skill-detail";

export function SkillBadge({ skill, repsId }) {
   const [isOpen, setIsOpen] = useState(() => false);
   const handleOpen = (open) => {
      setIsOpen(() => open);
   };

   return (
      <HoverCard openDelay={500} onOpenChange={handleOpen}>
         <Badge
            variant="outline"
            className="border-green-600 bg-green-600 bg-opacity-30 text-green-950 active:bg-opacity-50 hover:bg-opacity-70"
         >
            <HoverCardTrigger>{skill.name}</HoverCardTrigger>
         </Badge>
         {isOpen && <SkillsDetail repsId={repsId} id={skill.id} />}
      </HoverCard>
   );
}
