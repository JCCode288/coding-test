import PageHeader from "@/components/page-header";
import RepsCard from "@/components/reps-card";
import { Button } from "@/components/ui/button";
import { getSalesReps } from "@/lib/api";
import Link from "next/link";

export default async function HomePage({}) {
   const { data: reps } = await getSalesReps();

   return (
      <>
         <PageHeader name="Representatives">
            <Link href="/reps/new">
               <Button variant="outline" className="border-slate-300">
                  Add New Representative
               </Button>
            </Link>
         </PageHeader>
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
