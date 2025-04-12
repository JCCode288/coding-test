import PageHeader from "@/components/page-header";
import RepsCard from "@/components/reps-card";
import { getSalesReps } from "@/lib/api";

export default async function HomePage({}) {
   const { data: reps } = await getSalesReps();

   return (
      <>
         <PageHeader name="Representatives" />
         <section className="m-8 flex-1">
            <div className="grid grid-cols-2 gap-4 grid-flow-row">
               {reps.map((rep) => (
                  <RepsCard key={rep.id} reps={rep} />
               ))}
            </div>
         </section>
      </>
   );
}
