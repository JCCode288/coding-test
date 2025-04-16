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
      <Card className="max-w-md max-h-42">
         <CardHeader>
            <CardTitle>{client.name}</CardTitle>
            <CardDescription>
               <h4 className="font-light">{client.contact}</h4>
               <h5 className="font-light text-xs">{client.industry}</h5>
            </CardDescription>
         </CardHeader>

         <CardFooter className="justify-end">
            <Link href={"/clients/" + client.id}>
               <Button variant="outline">Detail</Button>
            </Link>
         </CardFooter>
      </Card>
   );
}
