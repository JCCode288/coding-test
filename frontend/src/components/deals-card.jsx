import { useEffect, useState } from "react";
import { Card, CardAction, CardDescription, CardTitle } from "./ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getDealsById } from "@/lib/api";

export default function DealsCard({ id }) {
   const [loading, setLoading] = useState(() => false);
   const [dealClient, setDealClient] = useState(() => null);

   const loadDealClient = async (id) => {
      setLoading(() => true);
      try {
         const { data: deal } = await getDealsById(id);

         setDealClient(() => deal?.client_joined);
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
      }
   };

   useEffect(() => {
      loadDealClient(id);

      return () => {
         setDealClient(() => null);
      };
   }, [id]);

   return (
      <Card className="px-4 py-2 gap-1">
         {loading && <>Loading</>}
         {!!dealClient && !loading && (
            <>
               <CardTitle>{dealClient.name}</CardTitle>
               <CardDescription className="flex flex-col flex-1 justify-between gap-2">
                  <h4>{dealClient.contact}</h4>
                  <h4 className="text-xs">{dealClient.industry}</h4>
               </CardDescription>
               <Link href={"/clients/" + dealClient.id}>
                  <CardAction>
                     <ArrowRight className="float-end" />
                  </CardAction>
               </Link>
            </>
         )}
         {!loading && !dealClient && (
            <div>Client is not yet registered</div>
         )}
      </Card>
   );
}
