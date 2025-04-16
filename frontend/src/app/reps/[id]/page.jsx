import { Button } from "@/components/ui/button";
import { getRepsById } from "@/lib/api";
import Link from "next/link";

export default async function RepsDetail({ params }) {
   const { id } = await params;
   if (isNaN(+id)) return null;

   const { data: rep } = await getRepsById(id);

   return (
      <div className="flex-1">
         Reps Detail {JSON.stringify(rep)}
         <Link href={"/reps/" + id + "/edit"}>
            <Button>Edit</Button>
         </Link>
      </div>
   );
}
