import Modal from "@/components/modal";
import { getClientsById } from "@/lib/api";

export default async function ClientDetail({ params }) {
   const { id } = await params;
   const { data: client } = await getClientsById(id);

   return (
      <Modal title="Client Detail">
         Client detail {JSON.stringify(client)}
      </Modal>
   );
}
