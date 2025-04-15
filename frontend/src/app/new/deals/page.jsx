import DealForm from "@/components/deal-form";
import { addDeals, getSalesReps } from "@/lib/api";
import { Suspense } from "react";

export default async function NewDeals() {
   const reps = getSalesReps();
   return (
      <section className="flex flex-1 m-8 justify-center">
         <Suspense fallback={<>Loading..</>}>
            <DealForm submitFunc={addDeals} reps={reps} />
         </Suspense>
      </section>
   );
}
