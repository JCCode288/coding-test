import { StatusColor } from "@/utils/constants/deal.status";
import { Badge } from "./ui/badge";

export default function DealBadge({ status }) {
   const className =
      StatusColor[status] +
      " bg-opacity-30 active:bg-opacity-50 hover:bg-opacity-70";

   return (
      <Badge variant="outline" className={className}>
         {status}
      </Badge>
   );
}
