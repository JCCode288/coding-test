import Modal from "@/components/modal";
import { getDealsById } from "@/lib/api";

export default async function DealDetail({ params }) {
   const { id } = await params;
   const { data: deal } = await getDealsById(id);

   return (
      <Modal title="Deal Detail">Deal detail {JSON.stringify(deal)}</Modal>
   );
}
