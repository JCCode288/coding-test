import ClientsForm from "@/components/clients-form";
import PageHeader from "@/components/page-header";
import { addClients } from "@/lib/api";
import { Suspense } from "react";

export default function NewClients() {
   return (
      <>
         <PageHeader name="New Client" />
         <section className="flex flex-1 m-8 justify-center">
            <Suspense fallback={<>Loading..</>}>
               <ClientsForm submitFunc={addClients} />
            </Suspense>
         </section>
      </>
   );
}
