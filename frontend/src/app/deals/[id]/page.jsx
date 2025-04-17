import DealBadge from "@/components/deals-badge";
import { Button } from "@/components/ui/button";
import { getDealsById } from "@/lib/api";
import { formatCurrency } from "@/utils/currency";
import { formatDate } from "@/utils/date";
import Link from "next/link";

export default async function DealDetailPage({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;

   const { data: deal } = await getDealsById(id);

   return (
      <section className="flex-1 m-8">
         <div>
            <h1>Deal Detail</h1>
            <div>
               <h4>Deal Client</h4>
               <h3>{deal.client}</h3>
            </div>
            <div>
               <h4>Deal Value</h4>
               <h3 className="flex gap-1">
                  <span>$</span>
                  {formatCurrency(deal.value)}
               </h3>
            </div>
            <div>
               <h4>Deal Status</h4>
               <DealBadge status={deal.status} />
            </div>
            <div>
               <h4>Last Update</h4>
               <h3>{formatDate(deal.update_at)}</h3>
            </div>
            <div>
               <h4>Started At</h4>
               <h3>{formatDate(deal.created_at)}</h3>
            </div>
            <div>
               <div>
                  <h4>Client Name</h4>
                  <h3>{deal.client}</h3>
               </div>
               {deal.client_joined && (
                  <Link href={"/clients/" + deal.client_joined.id}>
                     <div>
                        <h4>Client Industry</h4>
                        <h3>{deal.client_joined.industry}</h3>
                     </div>
                     <div>
                        <h4>Client Contact</h4>
                        <h3>{deal.client_joined.contact}</h3>
                     </div>
                     <div>
                        <h4>Joined at</h4>
                        <h3>
                           {formatDate(deal.client_joined.created_at)}
                        </h3>
                     </div>
                  </Link>
               )}
               {!deal.client_joined && (
                  <div>
                     No futher detail about client because client is not
                     yet joined
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
