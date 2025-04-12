import { getRepsById } from "@/lib/api";

export default async function RepsDetail({ params }) {
   const { id } = await params;

   const { data: rep } = await getRepsById(id);

   return <>Reps Detail {JSON.stringify(rep)}</>;
}
