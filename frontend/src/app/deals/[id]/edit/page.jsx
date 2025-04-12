import { getDealsById } from "@/lib/api";

export default async function EditDeals({ params }) {
   const { id } = await params;
   const { data: deal } = await getDealsById(id);

   return (
      <section className="flex-1">
         Edit Deal: {JSON.stringify(deal)}
      </section>
   );
}
