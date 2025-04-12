import { getRepsById } from "@/lib/api";

export default async function RepsDetail({ params }) {
   const { id } = await params;

   const { data: rep } = await getRepsById(id);

   return <div className="flex-1">Reps Detail {JSON.stringify(rep)}</div>;
}
