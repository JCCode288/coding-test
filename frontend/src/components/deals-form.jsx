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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { DealStatus } from "@/utils/constants/deal.status";
import RepsCombobox from "./reps-combobox";

const dealSchema = z.object({
   client: z
      .string()
      .nonempty("client cannot be empty")
      .min(1)
      .default(""),
   value: z.number().min(1, "value cannot be empty").default(""),
   status: z
      .enum(Object.values(DealStatus), {
         message: `wrong status. it can only be ${DealStatus.WON}, ${DealStatus.PROGRESS}, or ${DealStatus.LOSE}`,
      })
      .default(DealStatus.PROGRESS),
   reps_id: z.number().nonnegative("invalid representative"),
});

export default function DealForm({ submitFunc, deal, reps }) {
   const router = useRouter();
   const form = useForm({
      resolver: zodResolver(dealSchema),
      defaultValues: deal ?? getDefaults(dealSchema),
   });

   const handleValue = (e) => {
      const value = +e.target?.value;
      if (isNaN(value)) return;

      return form.setValue("value", value);
   };

   const handleSubmit = async (values) => {
      try {
         if (deal) await submitFunc(deal.id, values);
         else await submitFunc(values);

         router.push("/deals");
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
                  {deal ? "Edit Deal" : "Add New Deal"}
               </legend>

               <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Deal Client</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Deal client name (e.g Acme Inc)"
                              {...field}
                           />
                        </FormControl>
                        <FormDescription>
                           This is Deal Client name.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Deal Value</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Deal valuation (e.g 10000)"
                              {...field}
                              value={form.getValues().value}
                              onChange={handleValue}
                           />
                        </FormControl>
                        <FormDescription>
                           This is Value of this Deal.
                        </FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Deal Status</FormLabel>
                        <Select
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                        >
                           <FormControl>
                              <SelectTrigger>
                                 <SelectValue
                                    placeholder='Current deal status (e.g "In Progress")'
                                    {...field}
                                 />
                              </SelectTrigger>
                           </FormControl>
                           <SelectContent className="flex w-full">
                              {Object.values(DealStatus).map((st, idx) => (
                                 <SelectItem key={`st-${idx}`} value={st}>
                                    {st}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <FormDescription>
                           This is current deal status.
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
