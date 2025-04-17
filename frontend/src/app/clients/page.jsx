import AddNewButton from "@/components/add-new-button";
import ClientsCard from "@/components/clients-card";
import PageHeader from "@/components/page-header";
import PagePagination from "@/components/page-pagination";
import { getClients } from "@/lib/api";
import Link from "next/link";

export default async function ClientsPage({ searchParams }) {
   const query = await searchParams;
   const page = query?.page ?? 1;
   const limit = query?.limit ?? 12;
   const { data: clients, pagination } = await getClients(page, limit);

   return (
      <>
         <PageHeader name="Clients">
            <Link href="/new/clients">
               <AddNewButton>Add New Client</AddNewButton>
            </Link>
         </PageHeader>

         <section className="m-8 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 flex-1">
            {clients.map((cl) => {
               return <ClientsCard key={cl.id} client={cl} />;
            })}
         </section>

         <PagePagination
            baseUrl="/clients"
            limit={limit}
            {...pagination}
         />
      </>
   );
}
