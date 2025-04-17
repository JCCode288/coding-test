import { Button } from "@/components/ui/button";
import { getDealsById } from "@/lib/api";
import Link from "next/link";

export default async function DealDetailPage({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;

   const { data: deal } = await getDealsById(id);

   return (
      <section className="flex-1">
         Deal Detail: {JSON.stringify(deal)}
      </section>
   );
}
