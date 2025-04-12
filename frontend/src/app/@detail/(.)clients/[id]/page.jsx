import Modal from "@/components/modal";
import { getRepsById } from "@/lib/api";

export default async function RepsDetail({ params }) {
   const { id } = await params;
   const { data: rep } = await getRepsById(id);

   return (
      <Modal title="Representative Detail">
         Reps detail {JSON.stringify(rep)}
      </Modal>
   );
}
