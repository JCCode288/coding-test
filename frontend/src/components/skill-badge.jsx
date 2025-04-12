import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function SkillBadge({ skill }) {
   return (
      <Link href={"/skills/" + `${skill.id}`}>
         <Badge
            variant="outline"
            className="border-green-600 bg-green-600 bg-opacity-30 text-green-950 cursor-pointer active:bg-opacity-50"
         >
            {skill.name}
         </Badge>
      </Link>
   );
}
