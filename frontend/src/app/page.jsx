import AddNewButton from "@/components/add-new-button";
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
            <Link href="/new/reps">
               <AddNewButton>Add New Representative</AddNewButton>
            </Link>
         </PageHeader>
         <section className="m-8 flex-1">
            <div className="sm:grid sm:grid-cols-2 xl:grid-cols-3 sm:grid-flow-row flex flex-col gap-4">
               {reps.map((rep) => (
                  <RepsCard key={rep.id} reps={rep} />
               ))}
            </div>
         </section>
      </>
   );
}
