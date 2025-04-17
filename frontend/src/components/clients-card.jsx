"use client";

import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function ClientsCard({ client }) {
   return (
      <Card className="flex flex-col flex-1 max-w-md max-h-56">
         <CardHeader className="flex-1">
            <CardTitle>{client.name}</CardTitle>
            <CardDescription>
               <h4 className="font-light">{client.contact}</h4>
               <h5 className="font-light text-xs">{client.industry}</h5>
            </CardDescription>
         </CardHeader>

         <CardFooter className="shrink-0 justify-end">
            <Link href={"/clients/" + client.id}>
               <Button variant="outline">Detail</Button>
            </Link>
         </CardFooter>
      </Card>
   );
}
