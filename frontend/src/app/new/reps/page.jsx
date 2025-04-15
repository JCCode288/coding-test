import RepsForm from "@/components/reps-form";
import { addSalesReps } from "@/lib/api";
import { Suspense } from "react";

export default async function NewReps() {
   return (
      <section className="flex flex-1 m-8 justify-center">
         <Suspense fallback={<>Loading..</>}>
            <RepsForm submitFunc={addSalesReps} />
         </Suspense>
      </section>
   );
}
