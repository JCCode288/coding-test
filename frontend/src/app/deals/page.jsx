import { getDeals } from "@/lib/api";

export default async function DealsPage() {
   const deals = await getDeals();

   return (
      <div>
         {deals.map((dl) => {
            return (
               <div key={dl.id}>
                  {dl.reps.name} - {dl.client} - {dl.value}
               </div>
            );
         })}
      </div>
   );
}
