import DealForm from "@/components/deal-form";
import PageHeader from "@/components/page-header";
import { addDeals, getSalesReps } from "@/lib/api";
import { Suspense } from "react";

export default async function NewDeals() {
   const reps = getSalesReps();
   return (
      <>
         <PageHeader name="New Deal" />

         <section className="flex flex-1 m-8 justify-center">
            <Suspense fallback={<>Loading..</>}>
               <DealForm submitFunc={addDeals} reps={reps} />
            </Suspense>
         </section>
      </>
   );
}
