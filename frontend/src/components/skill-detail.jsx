"use client";

import { HoverCardContent } from "@/components/ui/hover-card";
import { getSkillById } from "@/lib/api";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";

export default function SkillsDetail({ id, repsId }) {
   const [skill, setSkill] = useState(() => null);
   const [loading, setLoading] = useState(() => false);

   const loadSkill = async (id) => {
      try {
         if (!id) return;
         setLoading(() => true);
         const { data: skillData } = await getSkillById(id);

         setSkill(() => skillData);
         setLoading(() => false);
      } catch (error) {
         setLoading(() => false);
      }
   };

   useEffect(() => {
      loadSkill(id);

      return () => {
         setSkill(null);
      };
   }, [id]);

   const otherReps = useMemo(
      () => skill?.reps.filter((r) => r.id !== repsId),
      [skill?.reps]
   );

   return (
      <>
         <HoverCardContent className="min-w-64">
            {loading && <>Loading</>}
            {!otherReps?.length && !loading && (
               <div>No other representatives has this skill</div>
            )}
            {!!otherReps?.length && (
               <div className="flex flex-col gap-1">
                  {otherReps.map((rep) => {
                     return (
                        <Link key={rep.id} href={"/reps/" + rep.id}>
                           <Card className="hover:bg-gray-100 active:bg-gray-200">
                              <CardTitle className="px-2">
                                 <h3>{rep.name}</h3>
                              </CardTitle>
                              <CardDescription className="px-2">
                                 <p className="text-sm font-light">
                                    {rep.role} - {rep.region}
                                 </p>
                              </CardDescription>
                           </Card>
                        </Link>
                     );
                  })}
               </div>
            )}
         </HoverCardContent>
      </>
   );
}
