import { getDealsById } from "@/lib/api";

export default async function DealDetail({ params }) {
   const { id } = await params;
   const { data: deal } = await getDealsById(id);

   return <>Deal Detail: {JSON.stringify(deal)}</>;
}
