import { cn } from "@/utils/shadcn";
import { Button } from "./ui/button";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronsUpDown } from "lucide-react";

export default function ComboboxLoading() {
   return (
      <FormItem>
         <FormLabel>Skills</FormLabel>
         <Popover>
            <PopoverTrigger asChild>
               <FormControl>
                  <Button
                     variant="outline"
                     role="combobox"
                     className={cn(
                        "w-[200px] justify-between",
                        "text-muted-foreground"
                     )}
                     disabled={true}
                  >
                     Loading...
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
               Loading...
            </PopoverContent>
         </Popover>
      </FormItem>
   );
}
