"use client";

import { useCallback, useEffect, useState } from "react";
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
import { addSkill, getSkills } from "@/lib/api";
import ComboboxLoading from "./combobox-loading";
import { Button } from "./ui/button";
import { cn } from "@/utils/shadcn";

export default function SkillCombobox({ form }) {
   const [skills, setSkills] = useState(() => []);
   const [loading, setLoading] = useState(() => false);
   const [searchSkill, setSearchSkill] = useState(() => "");

   const fetchSkills = async () => {
      setLoading(() => true);
      try {
         const { data } = await getSkills();

         setSkills(() => data);
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
      }
   };

   useEffect(() => {
      fetchSkills();
   }, []);

   const addNewSkill = useCallback(async () => {
      if (!searchSkill) return;
      setLoading(() => true);
      try {
         const { data } = await addSkill(searchSkill);

         setSkills((prev) => [...prev, data]);
         setSearchSkill(() => "");
         setLoading(() => false);
      } catch (err) {
         setLoading(() => false);
         console.log("Failed to add skill");
         console.error(err);
      }
   }, [searchSkill, form]);

   return (
      <FormField
         control={form.control}
         name="skills"
         render={({ field }) => {
            if (loading) return <ComboboxLoading />;

            return (
               <FormItem className="flex flex-col">
                  <FormLabel>Skills</FormLabel>
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
                              {field.value?.length
                                 ? skills
                                      .reduce((prev, curr) => {
                                         if (prev.length > 3) return prev;

                                         if (prev.length === 3) {
                                            prev.push("...");
                                            return prev;
                                         }

                                         if (field.value.includes(curr.id))
                                            prev.push(curr.name);

                                         return prev;
                                      }, [])
                                      .join(", ")
                                 : "Select skill"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                           </Button>
                        </FormControl>
                     </PopoverTrigger>
                     <PopoverContent className="w-full p-0">
                        <Command>
                           <CommandInput
                              value={searchSkill}
                              onValueChange={setSearchSkill}
                              placeholder="Search Skill..."
                           />
                           <CommandList>
                              <CommandEmpty>
                                 <Button
                                    className="text-wrap break-all"
                                    variant="ghost"
                                    onClick={addNewSkill}
                                 >
                                    <PlusIcon /> {searchSkill} Skill
                                 </Button>
                              </CommandEmpty>
                              <CommandGroup>
                                 {skills.map((skill) => (
                                    <CommandItem
                                       value={skill.id}
                                       key={skill.id}
                                       onSelect={() => {
                                          form.setValue("skills", [
                                             ...field.value,
                                             skill.id,
                                          ]);
                                       }}
                                    >
                                       {skill.name}
                                       <Check
                                          className={cn(
                                             "ml-auto",
                                             field.value?.includes(
                                                skill.id
                                             )
                                                ? "opacity-100"
                                                : "opacity-0"
                                          )}
                                       />
                                    </CommandItem>
                                 ))}
                              </CommandGroup>
                           </CommandList>
                        </Command>
                     </PopoverContent>
                  </Popover>
                  <FormDescription>
                     All Available Representatives skill.
                  </FormDescription>
                  <FormMessage />
               </FormItem>
            );
         }}
      />
   );
}
