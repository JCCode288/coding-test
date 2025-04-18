import DealsDetail from "@/components/deals-detail";
import PageHeader from "@/components/page-header";
import { getDealsById } from "@/lib/api";
import { Suspense } from "react";

export default async function DealDetail({ params }) {
   const id = (await params).id;

   if (isNaN(+id)) return null;

   const { data: deal } = await getDealsById(id);

   return (
      <>
         <PageHeader name="Deal Detail" />

         <section className="flex-1 m-8">
            <Suspense fallback={<>Loading</>}>
               <DealsDetail deal={deal} />
            </Suspense>
         </section>
      </>
   );
}
