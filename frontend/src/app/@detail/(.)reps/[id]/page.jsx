import Modal from "@/components/modal";
import { getRepsById } from "@/lib/api";

export default async function RepsDetail({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;
   const { data: rep } = await getRepsById(id);

   return (
      <Modal title="Representative Detail">
         <p className="text-wrap">Reps detail {JSON.stringify(rep)}</p>
      </Modal>
   );
}
