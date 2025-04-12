import { getClientsById } from "@/lib/api";

export default async function ClientDetail({ params }) {
   const { id } = await params;

   const { data: client } = await getClientsById(id);

   return <>Client Detail: {JSON.stringify(client)}</>;
}
