import AddNewButton from "@/components/add-new-button";
import PageHeader from "@/components/page-header";
import { getClients } from "@/lib/api";
import Link from "next/link";

export default async function ClientsPage() {
   const { data: clients } = await getClients();

   return (
      <>
         <PageHeader name="Clients">
            <Link href="/new/clients">
               <AddNewButton>Add New Client</AddNewButton>
            </Link>
         </PageHeader>

         <section className="m-8 flex-1">
            {clients.map((cl) => {
               console.log(cl);
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
