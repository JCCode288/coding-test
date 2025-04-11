import { getClients } from "@/lib/api";

export default async function ClientsPage() {
   const clients = await getClients();

   return (
      <div>
         {clients.map((cl) => {
            return (
               <div key={cl.id}>
                  {cl.name} - {cl.reps.name}
               </div>
            );
         })}
      </div>
   );
}
