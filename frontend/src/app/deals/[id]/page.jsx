import DealsDetail from "@/components/deals-detail";
import { getDealsById } from "@/lib/api";
import { Suspense } from "react";

export default async function DealDetail({ params }) {
   const id = (await params).id;
   if (isNaN(+id)) return null;

   const { data: deal } = await getDealsById(id);

   return (
      <section className="flex-1 m-8">
         <Suspense fallback={<>Loading</>}>
            <DealsDetail deal={deal} />
         </Suspense>
      </section>
   );
}
