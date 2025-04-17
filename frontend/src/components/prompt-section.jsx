"use client";

import { promptAI } from "@/lib/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import getDefaults from "@/utils/zod.default";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
} from "./ui/form";
import { Button } from "./ui/button";
import { marked } from "marked";
import {
   Collapsible,
   CollapsibleContent,
   CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Separator } from "./ui/separator";

const promptSchema = z.object({
   question: z.string().nonempty("question anything!").default(""),
});

export default function PromptSection() {
   const [open, setOpen] = useState(false);

   const [answer, setAnswer] = useState("");
   const form = useForm({
      resolver: zodResolver(promptSchema),
      defaultValues: getDefaults(promptSchema),
   });

   const handleAskQuestion = async ({ question }) => {
      try {
         const aiAnswer = await promptAI(question);
         setAnswer(() => marked.parse(aiAnswer));
         console.log(answer);
         form.setValue("question", "");
      } catch (error) {
         console.error("Error in AI request:", error);
      }
   };

   return (
      <section className="ml-1 sm:sticky sm:bottom-0 sm:right-0 bg-inherit p-4 border border-slate-900 rounded-lg">
         <Collapsible open={open} onOpenChange={setOpen}>
            <div className="flex w-full justify-between items-center">
               <div className="mb-1">Ask AI</div>
               <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                     <ChevronsUpDown className="h-4 w-4" />
                     <span className="sr-only">Toggle</span>
                  </Button>
               </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
               <div className={"mt-2 mb-8" + (!answer ? " hidden" : "")}>
                  <strong className="text-lg mb-1">AI Response:</strong>
                  <Separator
                     orientation="vertical"
                     className="mr-2 my-1 h-[1px] bg-slate-300"
                  />
                  <div className="overflow-auto max-h-[50dvh]">
                     <div dangerouslySetInnerHTML={{ __html: answer }} />
                  </div>
               </div>
               <Form
                  {...form}
                  className="flex border gap-2 border-slate-800 p-2 rounded-lg"
               >
                  <form
                     autoComplete="off"
                     onSubmit={form.handleSubmit(handleAskQuestion)}
                  >
                     <FormField
                        control={form.control}
                        name="question"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <Input
                                    placeholder="Ask a question!"
                                    {...field}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                     <Button
                        variant="outline"
                        className="mt-2 float-end cursor-pointer"
                        type="submit"
                     >
                        Ask
                     </Button>
                  </form>
               </Form>
            </CollapsibleContent>
         </Collapsible>
      </section>
   );
}
