import PageHeader from "@/components/page-header";
import RepsCard from "@/components/reps-card";
import { getSalesReps } from "@/lib/api";

export default async function HomePage({}) {
   const { data: reps } = await getSalesReps();

   return (
      <>
         <PageHeader name="Representatives" />
         <section className="m-8">
            <div className="flex flex-col gap-4 flex-wrap">
               {reps.map((rep) => (
                  <RepsCard key={rep.id} reps={rep} />
               ))}
            </div>
         </section>
      </>
   );
}
