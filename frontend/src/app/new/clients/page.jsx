import ClientsForm from "@/components/clients-form";
import { addClients } from "@/lib/api";
import { Suspense } from "react";

export default function NewClients() {
   return (
      <section className="flex flex-1 m-8 justify-center">
         <Suspense fallback={<>Loading..</>}>
            <ClientsForm submitFunc={addClients} />
         </Suspense>
      </section>
   );
}
