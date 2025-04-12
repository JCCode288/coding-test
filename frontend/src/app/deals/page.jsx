import PageHeader from "@/components/page-header";
import { getDeals } from "@/lib/api";

export default async function DealsPage() {
   const { data: deals } = await getDeals();

   return (
      <>
         <PageHeader name="Deals" />

         <section className="m-8 flex-1">
            {deals.map((dl) => {
               return (
                  <div key={dl.id}>
                     {dl.reps.name} - {dl.client} - {dl.value}
                  </div>
               );
            })}
         </section>
      </>
   );
}
