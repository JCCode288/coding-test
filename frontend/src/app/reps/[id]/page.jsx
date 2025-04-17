import RepsDetailCard from "@/components/reps-detail";
import { getRepsById } from "@/lib/api";

export default async function RepsDetail({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;

   const { data: rep } = await getRepsById(id);

   return <RepsDetailCard reps={rep} />;
}
