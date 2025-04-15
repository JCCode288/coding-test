import AddNewButton from "@/components/add-new-button";
import PageHeader from "@/components/page-header";
import PagePagination from "@/components/page-pagination";
import { getClients } from "@/lib/api";
import Link from "next/link";

export default async function ClientsPage({ searchParams }) {
   const query = await searchParams;
   const page = query?.page ?? 1;
   const limit = query?.limit ?? 10;
   const { data: clients, pagination } = await getClients(page, limit);

   return (
      <>
         <PageHeader name="Clients">
            <Link href="/new/clients">
               <AddNewButton>Add New Client</AddNewButton>
            </Link>
         </PageHeader>

         <section className="m-8 flex-1">
            {clients.map((cl) => {
               return (
                  <div key={cl.id}>
                     {cl.name} - {cl.reps.name}
                  </div>
               );
            })}
         </section>

         <PagePagination baseUrl="/clients" {...pagination} />
      </>
   );
}
