import DealForm from "@/components/deals-form";
import { editDeals, getDealsById } from "@/lib/api";
import { Suspense } from "react";

export default async function EditDeals({ params }) {
   const { id } = await params;
   const { data: deal } = await getDealsById(id);

   return (
      <section className="flex-1 m-8 justify-center">
         <Suspense fallback={<>Loading</>}>
            <DealForm deal={deal} submitFunc={editDeals} />
         </Suspense>
      </section>
   );
}
