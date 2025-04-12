import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function PageHeader({ name, children }) {
   return (
      <header className="flex h-16 shrink-0 items-center gap-2 border-b sticky top-0 bg-inherit justify-between">
         <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <h1>{name}</h1>
            <Separator orientation="vertical" className="mr-2 h-4" />
         </div>
         <div className="px-3">{children}</div>
      </header>
   );
}
