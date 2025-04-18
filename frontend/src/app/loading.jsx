import AddNewButton from "@/components/add-new-button";
import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function Loading() {
   return (
      <>
         <PageHeader name="Representatives">
            <Link href="/new/reps">
               <AddNewButton>Add New Representative</AddNewButton>
            </Link>
         </PageHeader>

         <section className="m-8 flex-1">
            <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 sm:grid-flow-row gap-4">
               {Array.from({ length: 12 }, (_, i) => (
                  <Skeleton
                     key={i}
                     className="w-md min-h-1/3 bg-gray-500"
                  />
               ))}
            </div>
         </section>

         <div className="flex w-full justify-center">
            <Skeleton className="shrink-0 mb-4 w-16" />
         </div>
      </>
   );
}
