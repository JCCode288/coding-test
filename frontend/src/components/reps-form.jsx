"use client";

import getDefaults from "@/utils/zod.default";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "./ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
   Command,
   CommandEmpty,
   CommandInput,
   CommandItem,
   CommandList,
   CommandGroup,
} from "./ui/command";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import SkillCombobox from "./skill-combobox";

const repsSchema = z.object({
   name: z.string().nonempty("name cannot be empty").min(1).default(""),
   region: z
      .string()
      .nonempty("region cannot be empty")
      .min(1)
      .default(""),
   role: z.string().nonempty("role cannot be empty").min(1).default(""),
   skills: z.optional(z.array(z.number())).default([]),
});

export default function RepsForm({ submitFunc, reps }) {
   const router = useRouter();
   const form = useForm({
      resolver: zodResolver(repsSchema),
      defaultValues: reps ?? getDefaults(repsSchema),
   });

   const handleSubmit = async (values) => {
      try {
         await submitFunc(values);
         router.push("/");
      } catch (err) {
         console.log("error when submitting", err);
      }
   };

   return (
      <div className="flex-1 block max-w-xl my-4">
         <Form {...form}>
            <form
               className="flex flex-col border rounded-lg p-4 gap-4"
               onSubmit={form.handleSubmit(handleSubmit)}
            >
               <legend className="flex flex-1 justify-center  font-semibold text-xl">
                  Add New Representative
               </legend>

               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Representative Name</FormLabel>
                        <FormControl>
                           <Input placeholder="reps name" {...field} />
                        </FormControl>
                        <FormDescription>
                           This is representative public display name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Representative Role</FormLabel>
                        <FormControl>
                           <Input placeholder="reps role" {...field} />
                        </FormControl>
                        <FormDescription>
                           This is representative role.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Representative Region</FormLabel>
                        <FormControl>
                           <Input placeholder="reps region" {...field} />
                        </FormControl>
                        <FormDescription>
                           This is representative region.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <SkillCombobox form={form} />

               <Button type="submit" variant="outline">
                  Submit
               </Button>
            </form>
         </Form>
      </div>
   );
}
