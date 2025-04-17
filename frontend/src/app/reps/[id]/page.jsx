import PageHeader from "@/components/page-header";
import RepsDetailCard from "@/components/reps-detail";
import { getRepsById } from "@/lib/api";

export default async function RepsDetail({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;

   const { data: rep } = await getRepsById(id);

   return (
      <>
         <PageHeader name="Representative Detail" />

         <section className="flex m-8">
            <RepsDetailCard reps={rep} />;
         </section>
      </>
   );
}
