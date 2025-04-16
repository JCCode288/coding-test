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
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import RepsCombobox from "./reps-combobox";

const clientSchema = z.object({
   name: z.string().nonempty("name cannot be empty").min(1).default(""),
   contact: z.string().nonempty("contact cannot be empty").default(""),
   industry: z.string().nonempty("industry cannot be empty").default(""),
   reps_id: z.number().nonnegative("invalid representative"),
});

export default function ClientsForm({ client, submitFunc }) {
   const router = useRouter();
   const form = useForm({
      resolver: zodResolver(clientSchema),
      defaultValues: client ?? getDefaults(clientSchema),
   });

   const handleSubmit = async (values) => {
      try {
         if (client) await submitFunc(client.id, values);
         else await submitFunc(values);

         router.push("/clients");
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
                  {client ? "Edit Client Data" : "Add New Client"}
               </legend>

               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Client Name</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Client name (e.g Acme Inc)"
                              {...field}
                           />
                        </FormControl>
                        <FormDescription>
                           This is Client name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Client Industry</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Client Industry (e.g Fishery)"
                              {...field}
                           />
                        </FormControl>
                        <FormDescription>
                           This is Respective Client Industry.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Client Contact</FormLabel>

                        <FormControl>
                           <Input
                              placeholder="Client Contact Email (e.g john@acme.co.id)"
                              {...field}
                           />
                        </FormControl>

                        <FormDescription>
                           This is Respective Client Contact Email.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <RepsCombobox form={form} />

               <Button type="submit" variant="outline">
                  Submit
               </Button>
            </form>
         </Form>
      </div>
   );
}
