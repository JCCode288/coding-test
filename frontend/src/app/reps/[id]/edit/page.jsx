import RepsForm from "@/components/reps-form";
import { getRepsById } from "@/lib/api";

export default async function EditPage({ params }) {
   const { id } = await params;
   const { data: rep } = await getRepsById(id);

   const handleEdit = (values) => {
      // handle form body here
   };

   return (
      <section className="flex flex-1 m-8 justify-center">
         <Suspense fallback={<>Loading..</>}>
            <RepsForm reps={rep} submitFunc={handleEdit} />
         </Suspense>
      </section>
   );
}
