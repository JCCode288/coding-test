import ClientsDetail from "@/components/clients-detail";
import { getClientsById } from "@/lib/api";

export default async function ClientDetail({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;

   const { data: client } = await getClientsById(id);

   return (
      <section className="flex-1 m-8">
         <ClientsDetail client={client} />
      </section>
   );
}
