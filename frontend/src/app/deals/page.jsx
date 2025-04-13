import AddNewButton from "@/components/add-new-button";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getDeals } from "@/lib/api";
import Link from "next/link";

export default async function DealsPage() {
   const { data: deals } = await getDeals();

   return (
      <>
         <PageHeader name="Deals">
            <Link href="/new/deals">
               <AddNewButton>Add New Deal</AddNewButton>
            </Link>
         </PageHeader>

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
