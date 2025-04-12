import PageHeader from "@/components/page-header";
import { getClients } from "@/lib/api";

export default async function ClientsPage() {
   const { data: clients } = await getClients();

   return (
      <>
         <PageHeader name="Clients" />

         <section className="m-8">
            {clients.map((cl) => {
               return (
                  <div key={cl.id}>
                     {cl.name} - {cl.reps.name}
                  </div>
               );
            })}
         </section>
      </>
   );
}
