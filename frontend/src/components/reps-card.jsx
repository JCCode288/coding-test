"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { SkillBadge } from "./skill-badge";
import { Button } from "./ui/button";
import Link from "next/link";

export default function RepsCard({ reps }) {
   return (
      <Card className="max-w-md min-h-1/3">
         <CardHeader>
            <CardTitle>{reps.name}</CardTitle>
            <CardDescription>
               {reps.region} - {reps.role}
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="flex flex-wrap flex-1 gap-1">
               {reps.skills.map((sk) => {
                  return <SkillBadge skill={sk} key={sk.id} />;
               })}
            </div>
         </CardContent>
         <CardFooter>
            <Link href={"/reps/" + reps.id}>
               <Button variant="outline">Detail</Button>
            </Link>
         </CardFooter>
      </Card>
   );
}
