"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown, PlusIcon } from "lucide-react";
import {
   Command,
   CommandEmpty,
   CommandInput,
   CommandItem,
   CommandList,
   CommandGroup,
} from "./ui/command";
import { getSalesReps } from "@/lib/api";
import { Button } from "./ui/button";
import { cn } from "@/utils/shadcn";
import Link from "next/link";

export default function RepsCombobox({ form }) {
   const [reps, setReps] = useState(() => []);
   const [loading, setLoading] = useState(() => false);
   const [searchReps, setSearchReps] = useState(() => "");
   const [page, setPage] = useState(() => 1);
   const [totalPage, setTotalPage] = useState(() => 1);
   const noNextPage = useMemo(
      () => page + 1 > totalPage,
      [page, totalPage]
   );

   const fetchReps = async () => {
      setLoading(() => true);
      try {
         const { data, pagination } = await getSalesReps(page, 1000); // mock only implement proper search later

         setReps(() => data);
         setTotalPage(() => pagination.total_page);
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
      }
   };

   const handleNextPage = async () => {
      if (noNextPage) return;

      setLoading(() => true);
      try {
         const { data, pagination } = await getSalesReps(page + 1, 2);

         setReps((prev) => [...prev, ...data]);
         setPage(() => pagination.current_page);
         setTotalPage(() => pagination.total_page);
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
      }
   };

   useEffect(() => {
      fetchReps();
   }, []);

   return (
      <FormField
         control={form.control}
         name="reps_id"
         render={({ field }) => {
            return (
               <FormItem className="flex flex-col">
                  <FormLabel>Sales Representatives</FormLabel>
                  <Popover>
                     <PopoverTrigger asChild>
                        <FormControl>
                           <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                 "w-full justify-between text-wrap break-words",
                                 !field.value && "text-muted-foreground"
                              )}
                           >
                              {field.value
                                 ? reps.find((el) => el.id === field.value)
                                      ?.name
                                 : "Select Representative"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                           </Button>
                        </FormControl>
                     </PopoverTrigger>
                     <PopoverContent className="w-full p-0">
                        <Command>
                           <CommandInput
                              value={searchReps}
                              onValueChange={setSearchReps}
                              placeholder="Search Representative..."
                           />
                           <CommandList>
                              {loading && (
                                 <CommandGroup>
                                    <CommandItem>
                                       Loading Representative
                                    </CommandItem>
                                 </CommandGroup>
                              )}
                              {!loading && (
                                 <>
                                    <CommandEmpty>
                                       <Link href="/new/reps">
                                          <Button
                                             className="text-wrap break-all"
                                             variant="ghost"
                                          >
                                             <PlusIcon /> {searchReps}{" "}
                                             Representative
                                          </Button>
                                       </Link>
                                    </CommandEmpty>
                                    <CommandGroup>
                                       {reps.map((rep) => (
                                          <CommandItem
                                             value={rep.id}
                                             key={rep.id}
                                             onSelect={() => {
                                                console.log(rep.id);
                                                form.setValue(
                                                   "reps_id",
                                                   rep.id
                                                );
                                             }}
                                          >
                                             {rep.name}
                                             <Check
                                                className={cn(
                                                   "ml-auto",
                                                   field.value === rep.id
                                                      ? "opacity-100"
                                                      : "opacity-0"
                                                )}
                                             />
                                          </CommandItem>
                                       ))}
                                       <CommandItem>
                                          <Button
                                             className="w-full"
                                             variant="outline"
                                             onClick={handleNextPage}
                                             disabled={noNextPage}
                                          >
                                             More
                                          </Button>
                                       </CommandItem>
                                    </CommandGroup>
                                 </>
                              )}
                           </CommandList>
                        </Command>
                     </PopoverContent>
                  </Popover>
                  <FormDescription>
                     All Available Representatives.
                  </FormDescription>
                  <FormMessage />
               </FormItem>
            );
         }}
      />
   );
}
