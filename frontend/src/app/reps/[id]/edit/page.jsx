import { getRepsById } from "@/lib/api";

export default async function EditPage({ params }) {
   const { id } = await params;
   const { data: rep } = await getRepsById(id);

   return <div className="flex-1">Edit Rep: {JSON.stringify(rep)}</div>;
}
